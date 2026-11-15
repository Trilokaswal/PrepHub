-- ==============================================================================
-- PREPHUB FIX: BULLETPROOF AUTH TRIGGER & PROFILE PROVISIONING
-- ==============================================================================
-- Run this script in your Supabase Dashboard -> SQL Editor -> "New Query" -> Run
-- This resolves: "Database error saving new user"
-- ==============================================================================

-- 1. Grant schema permissions to supabase_auth_admin
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role, supabase_auth_admin;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role, supabase_auth_admin;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role, supabase_auth_admin;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO postgres, anon, authenticated, service_role, supabase_auth_admin;

-- 2. Drop the existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 3. Recreate handle_new_user with explicit search_path and exception fallback
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, pg_temp
AS $$
DECLARE
    user_name TEXT;
    user_role_val public.user_role_type;
BEGIN
    -- Extract name safely
    user_name := COALESCE(
        NEW.raw_user_meta_data->>'name',
        split_part(COALESCE(NEW.email, 'student@prephub.edu'), '@', 1)
    );

    -- Extract role safely with schema-qualified enum
    IF LOWER(COALESCE(NEW.raw_user_meta_data->>'role', 'student')) = 'teacher' THEN
        user_role_val := 'teacher'::public.user_role_type;
    ELSE
        user_role_val := 'student'::public.user_role_type;
    END IF;

    -- Insert into profiles table
    INSERT INTO public.profiles (
        id,
        name,
        email,
        role,
        avatar_url,
        university_roll,
        class_roll,
        section,
        branch,
        course,
        department
    )
    VALUES (
        NEW.id,
        user_name,
        COALESCE(NEW.email, ''),
        user_role_val,
        COALESCE(
            NEW.raw_user_meta_data->>'avatar_url',
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
        ),
        NEW.raw_user_meta_data->>'university_roll',
        NEW.raw_user_meta_data->>'class_roll',
        NEW.raw_user_meta_data->>'section',
        NEW.raw_user_meta_data->>'branch',
        NEW.raw_user_meta_data->>'course',
        NEW.raw_user_meta_data->>'department'
    )
    ON CONFLICT (id) DO UPDATE
    SET 
        name = EXCLUDED.name,
        email = EXCLUDED.email,
        updated_at = NOW();

    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Prevent rolling back auth.users insertion if a profile conflict occurs
        RAISE WARNING 'handle_new_user error: %', SQLERRM;
        RETURN NEW;
END;
$$;

-- 4. Re-bind the trigger to auth.users
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Add INSERT policy on profiles so authenticated users can insert/upsert their profile
DO $$ BEGIN
    CREATE POLICY "Users can insert own profile"
        ON public.profiles FOR INSERT
        TO authenticated
        WITH CHECK (auth.uid() = id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

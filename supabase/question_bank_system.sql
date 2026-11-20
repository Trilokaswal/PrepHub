-- ==============================================================================
-- PREPHUB QUESTION BANK & RANDOM MOCK TEST ENGINE: SUPABASE PRODUCTION SQL
-- ==============================================================================
-- Run this script in your Supabase Dashboard -> SQL Editor -> "New Query" -> Run
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Ensure question_type_enum exists
DO $$ BEGIN
    CREATE TYPE question_type_enum AS ENUM ('single_choice', 'multiple_choice', 'numerical', 'subjective');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. ADMIN ALLOWLIST TABLE
CREATE TABLE IF NOT EXISTS public.admin_allowlist (
    email TEXT PRIMARY KEY,
    role TEXT NOT NULL DEFAULT 'superadmin',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed the authorized administrator Gmail (strictly enforced)
INSERT INTO public.admin_allowlist (email, role)
VALUES ('trilokaswal260506@gmail.com', 'superadmin')
ON CONFLICT (email) DO NOTHING;

-- 3. SERVER-SIDE ADMIN VERIFICATION FUNCTION
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public, auth, pg_temp
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.admin_allowlist al
        WHERE LOWER(al.email) = LOWER(COALESCE(auth.jwt() ->> 'email', ''))
    );
$$;

-- 4. QUESTION BANK TABLE
CREATE TABLE IF NOT EXISTS public.question_bank (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    statement TEXT NOT NULL,
    subject TEXT NOT NULL,
    topic TEXT NOT NULL DEFAULT 'General',
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    type question_type_enum NOT NULL DEFAULT 'single_choice',
    options JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of { id, text, isCorrect, explanation }
    correct_answer TEXT,
    explanation TEXT,
    marks NUMERIC(5,2) NOT NULL DEFAULT 4.0,
    negative_marks NUMERIC(5,2) NOT NULL DEFAULT 1.0,
    image_url TEXT,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_question_bank_subject_topic ON public.question_bank(subject, topic);
CREATE INDEX IF NOT EXISTS idx_question_bank_difficulty ON public.question_bank(difficulty);
CREATE INDEX IF NOT EXISTS idx_question_bank_type ON public.question_bank(type);
CREATE INDEX IF NOT EXISTS idx_question_bank_created_at ON public.question_bank(created_at DESC);

-- 5. ACTIVE / GENERATED MOCK TESTS TABLE
CREATE TABLE IF NOT EXISTS public.active_mock_tests (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    topic TEXT,
    difficulty TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL DEFAULT 15,
    marks_per_question NUMERIC(5,2) NOT NULL DEFAULT 4.0,
    negative_marks NUMERIC(5,2) NOT NULL DEFAULT 1.0,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    question_ids JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of question UUIDs
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_active_mock_tests_user ON public.active_mock_tests(user_id, created_at DESC);

-- 6. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.admin_allowlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.active_mock_tests ENABLE ROW LEVEL SECURITY;

-- Admin allowlist: only admins can view or modify
DROP POLICY IF EXISTS "Admin allowlist read" ON public.admin_allowlist;
CREATE POLICY "Admin allowlist read"
    ON public.admin_allowlist FOR SELECT
    TO authenticated
    USING (public.is_admin());

-- Question Bank: Strictly restricted to verified admins.
-- Students CANNOT select, insert, update, or delete from question_bank directly.
DROP POLICY IF EXISTS "Admin view question bank" ON public.question_bank;
CREATE POLICY "Admin view question bank"
    ON public.question_bank FOR SELECT
    TO authenticated
    USING (public.is_admin());

DROP POLICY IF EXISTS "Admin insert question bank" ON public.question_bank;
CREATE POLICY "Admin insert question bank"
    ON public.question_bank FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin update question bank" ON public.question_bank;
CREATE POLICY "Admin update question bank"
    ON public.question_bank FOR UPDATE
    TO authenticated
    USING (public.is_admin());

DROP POLICY IF EXISTS "Admin delete question bank" ON public.question_bank;
CREATE POLICY "Admin delete question bank"
    ON public.question_bank FOR DELETE
    TO authenticated
    USING (public.is_admin());

-- Active Mock Tests: Authenticated students can view and create their own generated tests
DROP POLICY IF EXISTS "Users can view own active tests" ON public.active_mock_tests;
CREATE POLICY "Users can view own active tests"
    ON public.active_mock_tests FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id OR public.is_admin());

DROP POLICY IF EXISTS "Users can insert own active tests" ON public.active_mock_tests;
CREATE POLICY "Users can insert own active tests"
    ON public.active_mock_tests FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- 7. SECURE SERVER-SIDE RPC: RANDOM MOCK TEST QUESTION GENERATOR
-- Returns masked questions (without correct answers or explanations) to active test takers
CREATE OR REPLACE FUNCTION public.get_random_exam_questions(
    p_subject TEXT,
    p_topic TEXT DEFAULT NULL,
    p_difficulty TEXT DEFAULT NULL,
    p_limit INT DEFAULT 10
)
RETURNS TABLE (
    id UUID,
    statement TEXT,
    subject TEXT,
    topic TEXT,
    difficulty TEXT,
    type question_type_enum,
    options JSONB,
    marks NUMERIC(5,2),
    negative_marks NUMERIC(5,2),
    image_url TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, pg_temp
AS $$
BEGIN
    RETURN QUERY
    WITH eligible_questions AS (
        SELECT q.id, q.statement, q.subject, q.topic, q.difficulty, q.type, q.options, q.marks, q.negative_marks, q.image_url
        FROM public.question_bank q
        WHERE (p_subject IS NULL OR LOWER(q.subject) = LOWER(p_subject))
          AND (p_topic IS NULL OR p_topic = '' OR p_topic = 'all' OR LOWER(q.topic) = LOWER(p_topic))
          AND (p_difficulty IS NULL OR p_difficulty = '' OR LOWER(p_difficulty) = 'mixed' OR LOWER(q.difficulty) = LOWER(p_difficulty))
        ORDER BY random()
        LIMIT p_limit
    )
    SELECT 
        eq.id,
        eq.statement,
        eq.subject,
        eq.topic,
        eq.difficulty,
        eq.type,
        -- Mask correct answers inside options JSONB
        (
            SELECT jsonb_agg(
                jsonb_build_object(
                    'id', opt->>'id',
                    'text', opt->>'text',
                    'isCorrect', false
                )
            )
            FROM jsonb_array_elements(eq.options) opt
        ) AS options,
        eq.marks,
        eq.negative_marks,
        eq.image_url
    FROM eligible_questions eq;
END;
$$;

-- Allow authenticated students to call get_random_exam_questions
GRANT EXECUTE ON FUNCTION public.get_random_exam_questions TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.is_admin TO authenticated, anon;

-- Schema permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO postgres, anon, authenticated, service_role;

-- 8. STORAGE BUCKET FOR QUESTION ASSETS / DIAGRAMS
INSERT INTO storage.buckets (id, name, public)
VALUES ('question-assets', 'question-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public view question assets" ON storage.objects;
CREATE POLICY "Public view question assets"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'question-assets');

DROP POLICY IF EXISTS "Admin upload question assets" ON storage.objects;
CREATE POLICY "Admin upload question assets"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'question-assets' AND public.is_admin());

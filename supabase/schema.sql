-- ==============================================================================
-- PREPHUB SUPABASE POSTGRESQL PRODUCTION DATABASE SCHEMA
-- ==============================================================================
-- Run this script in your Supabase Dashboard -> SQL Editor -> "New Query"
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS & DOMAINS
DO $$ BEGIN
    CREATE TYPE user_role_type AS ENUM ('student', 'teacher');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE question_type_enum AS ENUM ('single_choice', 'multiple_choice', 'numerical', 'subjective');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. USER PROFILES TABLE (Linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    role user_role_type NOT NULL DEFAULT 'student',
    university_roll TEXT,
    class_roll TEXT,
    section TEXT,
    branch TEXT,
    course TEXT,
    department TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. AUTOMATIC PROFILE PROVISIONING TRIGGER (On auth.users sign-up)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, name, email, role, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        NEW.email,
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role_type, 'student'),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80')
    )
    ON CONFLICT (id) DO UPDATE
    SET name = EXCLUDED.name,
        email = EXCLUDED.email;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. MOCK TESTS TABLE
CREATE TABLE IF NOT EXISTS public.mock_tests (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    course TEXT NOT NULL,
    branch TEXT NOT NULL,
    semester INTEGER NOT NULL,
    duration_minutes INTEGER NOT NULL DEFAULT 15,
    total_marks INTEGER NOT NULL DEFAULT 40,
    passing_marks INTEGER NOT NULL DEFAULT 16,
    difficulty TEXT NOT NULL DEFAULT 'Intermediate',
    status TEXT NOT NULL DEFAULT 'published',
    category TEXT NOT NULL DEFAULT 'subject',
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS public.questions (
    id TEXT PRIMARY KEY,
    test_id TEXT NOT NULL REFERENCES public.mock_tests(id) ON DELETE CASCADE,
    order_index INTEGER NOT NULL,
    statement TEXT NOT NULL,
    type question_type_enum NOT NULL DEFAULT 'single_choice',
    marks INTEGER NOT NULL DEFAULT 4,
    negative_marks NUMERIC(4,2) NOT NULL DEFAULT 1.00,
    topic TEXT,
    explanation TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. QUESTION OPTIONS TABLE
CREATE TABLE IF NOT EXISTS public.question_options (
    id TEXT PRIMARY KEY,
    question_id TEXT NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    order_index INTEGER NOT NULL
);

-- 8. STUDENT EXAM ATTEMPTS TABLE (Scorecard Archive)
CREATE TABLE IF NOT EXISTS public.student_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_id TEXT NOT NULL REFERENCES public.mock_tests(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    test_title TEXT NOT NULL,
    subject TEXT NOT NULL,
    score INTEGER NOT NULL,
    total_marks INTEGER NOT NULL,
    percentage NUMERIC(5,2) NOT NULL,
    accuracy NUMERIC(5,2) NOT NULL,
    time_taken_seconds INTEGER NOT NULL,
    passed BOOLEAN NOT NULL DEFAULT FALSE,
    answers JSONB NOT NULL DEFAULT '{}'::jsonb,
    review_data JSONB NOT NULL DEFAULT '[]'::jsonb,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. BOOKMARKED / SAVED QUESTIONS VAULT
CREATE TABLE IF NOT EXISTS public.saved_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    test_id TEXT NOT NULL REFERENCES public.mock_tests(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    saved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, question_id)
);

-- ==============================================================================
-- 10. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_questions ENABLE ROW LEVEL SECURITY;

-- Profiles: Anyone authenticated can read their own profile, users can update their own profile
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id);

-- Mock Tests: Authenticated users can view published mock tests
CREATE POLICY "Authenticated users can view published tests"
    ON public.mock_tests FOR SELECT
    TO authenticated
    USING (status = 'published');

CREATE POLICY "Teachers can insert mock tests"
    ON public.mock_tests FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'teacher'
        )
    );

-- Questions & Options: Authenticated users can view questions for available tests
CREATE POLICY "Authenticated users can view questions"
    ON public.questions FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.mock_tests
            WHERE id = questions.test_id AND status = 'published'
        )
    );

CREATE POLICY "Authenticated users can view options"
    ON public.question_options FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.questions
            WHERE id = question_options.question_id
        )
    );

-- Student Attempts: Students can view and insert their own attempts
CREATE POLICY "Students can view own attempts"
    ON public.student_attempts FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Students can insert own attempts"
    ON public.student_attempts FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Saved Questions: Students can manage their own saved questions vault
CREATE POLICY "Students can view own saved questions"
    ON public.saved_questions FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Students can insert own saved questions"
    ON public.saved_questions FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Students can delete own saved questions"
    ON public.saved_questions FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- ==============================================================================
-- 11. INDEXES FOR HIGH QUERY PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_mock_tests_course_branch ON public.mock_tests(course, branch, semester);
CREATE INDEX IF NOT EXISTS idx_questions_test_id ON public.questions(test_id, order_index);
CREATE INDEX IF NOT EXISTS idx_options_question_id ON public.question_options(question_id, order_index);
CREATE INDEX IF NOT EXISTS idx_student_attempts_user_id ON public.student_attempts(user_id, completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_saved_questions_user_id ON public.saved_questions(user_id, saved_at DESC);

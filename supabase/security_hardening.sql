-- ==============================================================================
-- PREPHUB SECURITY HARDENING: BACKEND & DATABASE DEFENSE (PRODUCTION)
-- ==============================================================================
-- Run this in your Supabase Dashboard -> SQL Editor -> "New Query" -> Run
-- ==============================================================================

-- 1. PREVENT DIRECT PRIVILEGE ESCALATION ON USER ROLES
-- A student should NEVER be able to update their own role to 'teacher' via client API calls
CREATE OR REPLACE FUNCTION public.prevent_profile_role_escalation()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, pg_temp
AS $$
BEGIN
    -- Only service_role or admin triggers may alter user role
    IF NEW.role <> OLD.role THEN
        IF COALESCE(current_setting('request.jwt.claim.role', true), '') <> 'service_role' THEN
            RAISE EXCEPTION 'Privilege Escalation Blocked: Role changes require verified faculty authorization.';
        END IF;
    END IF;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_prevent_role_escalation ON public.profiles;
CREATE TRIGGER trg_prevent_role_escalation
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.prevent_profile_role_escalation();

-- 2. ZERO-TRUST EXAM ARCHITECTURE: STUDENT EXAM VIEW
-- Exposes active exam questions and options with is_correct and explanation omitted
CREATE OR REPLACE VIEW public.student_active_exam_questions AS
SELECT 
    q.id AS question_id,
    q.test_id,
    q.order_index AS question_order,
    q.statement,
    q.type,
    q.marks,
    q.negative_marks,
    q.topic,
    opt.id AS option_id,
    opt.text AS option_text,
    opt.order_index AS option_order
FROM public.questions q
JOIN public.question_options opt ON opt.question_id = q.id
WHERE EXISTS (
    SELECT 1 FROM public.mock_tests t
    WHERE t.id = q.test_id AND t.status = 'published'
);

GRANT SELECT ON public.student_active_exam_questions TO authenticated;

-- 3. AUDIT & TIGHTEN RLS ON ATTEMPTS
-- Ensure past attempts are immutable: once submitted, neither students nor callers can alter scores
DROP POLICY IF EXISTS "Students cannot update past attempts" ON public.student_attempts;
CREATE POLICY "Students cannot update past attempts"
    ON public.student_attempts FOR UPDATE
    TO authenticated
    USING (false);

-- 4. PERFORMANCE & TAMPER INDEXES
CREATE INDEX IF NOT EXISTS idx_student_attempts_composite 
    ON public.student_attempts(user_id, test_id, completed_at DESC);

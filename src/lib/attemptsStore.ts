import { StudentAttempt, SubjectiveAnswerSubmission } from '@/types';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { authStore } from '@/lib/authStore';

const ATTEMPTS_STORAGE_KEY = 'prephub_student_attempts';

export const initialAttempts: StudentAttempt[] = [];

export function getStoredAttempts(): StudentAttempt[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ATTEMPTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Filter out any legacy seeded demo attempts (e.g. att-101..att-106 or student.prephub.edu)
      const clean = parsed.filter(
        (a) =>
          a &&
          !String(a.id || '').startsWith('att-10') &&
          !String(a.studentEmail || '').endsWith('@student.prephub.edu')
      );
      if (clean.length !== parsed.length) {
        localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(clean));
      }
      return clean;
    }
    return [];
  } catch (err) {
    console.error('Failed to load attempts from localStorage:', err);
    return [];
  }
}

export function saveStoredAttempts(attempts: StudentAttempt[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(attempts));
    window.dispatchEvent(new Event('prephub-attempts-update'));
  } catch (err) {
    console.error('Failed to save attempts to localStorage:', err);
  }
}

export function evaluateSubjectiveAnswer(
  attemptId: string,
  questionId: string,
  awardedMarks: number,
  teacherFeedback: string
): boolean {
  const attempts = getStoredAttempts();
  const attemptIndex = attempts.findIndex((a) => a.id === attemptId);
  if (attemptIndex === -1) return false;

  const attempt = attempts[attemptIndex];
  if (!attempt.subjectiveAnswers) return false;

  const answerIndex = attempt.subjectiveAnswers.findIndex((a) => a.questionId === questionId);
  if (answerIndex === -1) return false;

  const currentAnswer = attempt.subjectiveAnswers[answerIndex];
  const oldAwarded = currentAnswer.awardedMarks || 0;

  const updatedSubjectiveAnswers = [...attempt.subjectiveAnswers];
  updatedSubjectiveAnswers[answerIndex] = {
    ...currentAnswer,
    awardedMarks,
    teacherFeedback,
    isEvaluated: true,
  };

  const allEvaluated = updatedSubjectiveAnswers.every((a) => a.isEvaluated);
  const markDelta = awardedMarks - oldAwarded;
  const newScore = Math.min(attempt.totalMarks, Math.max(0, attempt.score + markDelta));
  const newPercentage = parseFloat(((newScore / attempt.totalMarks) * 100).toFixed(1));

  attempts[attemptIndex] = {
    ...attempt,
    score: newScore,
    percentage: newPercentage,
    status: allEvaluated ? 'graded' : 'pending_evaluation',
    subjectiveAnswers: updatedSubjectiveAnswers,
  };

  saveStoredAttempts(attempts);
  return true;
}

export function addStudentAttempt(attempt: StudentAttempt): void {
  const user = authStore.getCurrentUser();
  const attemptWithUser: StudentAttempt = {
    ...attempt,
    studentName: user?.name || attempt.studentName,
    studentEmail: user?.email || attempt.studentEmail,
    studentRoll: user?.universityRoll || attempt.studentRoll,
    userId: user?.id,
  };
  const attempts = getStoredAttempts();
  const updated = [attemptWithUser, ...attempts];
  saveStoredAttempts(updated);

  if (typeof window !== 'undefined' && isSupabaseConfigured()) {
    if (user && user.id) {
      try {
        const supabase = createClient();
        void supabase.from('student_attempts').insert({
          user_id: user.id,
          test_id: attempt.testId,
          test_title: attempt.testTitle,
          subject: attempt.subject,
          score: attempt.score,
          total_marks: attempt.totalMarks,
          percentage: attempt.percentage,
          accuracy: attempt.percentage,
          time_taken_seconds: 600,
          passed: attempt.percentage >= 40,
          completed_at: attempt.submittedAt || new Date().toISOString(),
        });
      } catch (err) {
        console.warn('Failed to save attempt to Supabase:', err);
      }
    }
  }
}

export async function syncAttemptsFromSupabase(userId: string): Promise<StudentAttempt[]> {
  if (typeof window === 'undefined' || !isSupabaseConfigured() || !userId) {
    return getStoredAttempts();
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('student_attempts')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return getStoredAttempts();
    }

    const remoteAttempts: StudentAttempt[] = data.map((row: any) => ({
      id: row.id,
      testId: row.test_id,
      testTitle: row.test_title || 'Mock Assessment',
      subject: row.subject || 'General Assessment',
      studentName: row.student_name || 'Student',
      studentRoll: row.student_roll || '',
      studentEmail: row.student_email || '',
      submittedAt: row.completed_at,
      score: row.score,
      totalMarks: row.total_marks,
      percentage: row.percentage,
      status: 'graded',
      userId: row.user_id,
    }));

    const local = getStoredAttempts();
    const combined = [...remoteAttempts];
    local.forEach((loc) => {
      if (
        !combined.some(
          (rem) =>
            rem.id === loc.id ||
            (rem.testId === loc.testId && rem.submittedAt === loc.submittedAt)
        )
      ) {
        combined.push(loc);
      }
    });

    saveStoredAttempts(combined);
    return combined;
  } catch (err) {
    console.warn('Failed to sync attempts from Supabase:', err);
    return getStoredAttempts();
  }
}

export function subscribeToAttempts(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = () => callback();
  window.addEventListener('prephub-attempts-update', handler);
  window.addEventListener('storage', (e) => {
    if (e.key === ATTEMPTS_STORAGE_KEY) {
      callback();
    }
  });
  return () => {
    window.removeEventListener('prephub-attempts-update', handler);
  };
}

import { StudentAttempt, SubjectiveAnswerSubmission } from '@/types';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { authStore } from '@/lib/authStore';

const ATTEMPTS_STORAGE_KEY = 'prephub_student_attempts';

export const initialAttempts: StudentAttempt[] = [
  {
    id: 'att-101',
    testId: 'test-001',
    testTitle: 'Physics Mid-Term: Mechanics & Thermodynamics',
    subject: 'Physics',
    studentName: 'Alex Rivera',
    studentRoll: 'PHY-2026-042',
    studentEmail: 'alex.rivera@student.prephub.edu',
    submittedAt: '2026-10-18T14:15:00Z',
    score: 84,
    totalMarks: 100,
    percentage: 84.0,
    status: 'graded',
  },
  {
    id: 'att-102',
    testId: 'test-002',
    testTitle: 'Organic Chemistry: Hydrocarbons & Functional Groups',
    subject: 'Chemistry',
    studentName: 'Elena Rostova',
    studentRoll: 'CHM-2026-019',
    studentEmail: 'elena.rostova@student.prephub.edu',
    submittedAt: '2026-10-19T09:30:00Z',
    score: 68,
    totalMarks: 80,
    percentage: 85.0,
    status: 'pending_evaluation',
    subjectiveAnswers: [
      {
        questionId: 'q-chem-subj-1',
        questionOrder: 1,
        questionStatement:
          'Explain the step-by-step reaction mechanism of base-catalyzed aldol condensation between two acetaldehyde molecules, including enolate ion formation, nucleophilic addition, and dehydration.',
        maxMarks: 10,
        rubricGuidelines:
          'Full marks (10): Explicitly states hydroxide abstraction of alpha-hydrogen, resonance-stabilized enolate attack on carbonyl carbon, alkoxide protonation, and E1cB dehydration to form crotonaldehyde.',
        studentAnswerText:
          'In the first step, hydroxide base removes an alpha-hydrogen from acetaldehyde, generating a nucleophilic enolate ion. The enolate attacks the carbonyl carbon of a second acetaldehyde molecule to yield an alkoxide intermediate. Proton transfer from water gives 3-hydroxybutanal (aldol). Finally, upon mild heating, loss of water via E1cB gives the conjugated alpha,beta-unsaturated aldehyde, crotonaldehyde.',
        isEvaluated: false,
      },
    ],
  },
  {
    id: 'att-103',
    testId: 'test-003',
    testTitle: 'Advanced Calculus & Differential Equations',
    subject: 'Mathematics',
    studentName: 'Marcus Chen',
    studentRoll: 'MTH-2026-108',
    studentEmail: 'marcus.chen@student.prephub.edu',
    submittedAt: '2026-10-17T11:45:00Z',
    score: 92,
    totalMarks: 100,
    percentage: 92.0,
    status: 'graded',
  },
  {
    id: 'att-104',
    testId: 'test-004',
    testTitle: 'Cellular Biology: Genetics & Protein Synthesis',
    subject: 'Biology',
    studentName: 'Sophia Patel',
    studentRoll: 'BIO-2026-055',
    studentEmail: 'sophia.patel@student.prephub.edu',
    submittedAt: '2026-10-16T16:20:00Z',
    score: 76,
    totalMarks: 100,
    percentage: 76.0,
    status: 'graded',
  },
  {
    id: 'att-105',
    testId: 'test-006',
    testTitle: 'Modern World History: 20th Century Conflicts',
    subject: 'History',
    studentName: 'Jordan Taylor',
    studentRoll: 'HIS-2026-033',
    studentEmail: 'jordan.taylor@student.prephub.edu',
    submittedAt: '2026-10-18T10:10:00Z',
    score: 55,
    totalMarks: 70,
    percentage: 78.5,
    status: 'pending_evaluation',
    subjectiveAnswers: [
      {
        questionId: 'q-his-subj-1',
        questionOrder: 1,
        questionStatement:
          'Analyze three primary geopolitical and economic consequences of the Treaty of Versailles (1919) that contributed to diplomatic destabilization in interwar Europe.',
        maxMarks: 10,
        rubricGuidelines:
          'Evaluation Criteria: 1) War guilt clause and punitive reparations; 2) Territorial concessions/Polish Corridor/Rhineland demilitarization; 3) Creation of fragile successor states and German revanchism.',
        studentAnswerText:
          '1) The severe economic reparations demanded under Article 231 contributed directly to hyperinflation in Weimar Germany during the 1920s. 2) Border redistributions separated German-speaking populations (such as the Polish Corridor and Danzig), fostering resentment. 3) The dissolution of the Austro-Hungarian Empire created small, economically vulnerable nation-states lacking defensive alliances.',
        isEvaluated: false,
      },
    ],
  },
  {
    id: 'att-106',
    testId: 'test-001',
    testTitle: 'Physics Mid-Term: Mechanics & Thermodynamics',
    subject: 'Physics',
    studentName: 'David Kim',
    studentRoll: 'PHY-2026-089',
    studentEmail: 'david.kim@student.prephub.edu',
    submittedAt: '2026-10-18T15:00:00Z',
    score: 58,
    totalMarks: 100,
    percentage: 58.0,
    status: 'graded',
  },
];

export function getStoredAttempts(): StudentAttempt[] {
  if (typeof window === 'undefined') return initialAttempts;
  try {
    const raw = localStorage.getItem(ATTEMPTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(initialAttempts));
      return initialAttempts;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return initialAttempts;
  } catch (err) {
    console.error('Failed to load attempts from localStorage:', err);
    return initialAttempts;
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
  const attempts = getStoredAttempts();
  const updated = [attempt, ...attempts];
  saveStoredAttempts(updated);

  if (typeof window !== 'undefined' && isSupabaseConfigured()) {
    const user = authStore.getCurrentUser();
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

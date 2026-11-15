import { Question } from '@/types';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { authStore } from '@/lib/authStore';

export interface SavedQuestionItem {
  id: string;
  testId: string;
  testTitle: string;
  subject: string;
  statement: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  studentSelectedText: string;
  correctAnswerText: string;
  isCorrect: boolean;
  explanation: string;
  flaggedAt: string;
}

const STORAGE_KEY = 'prephub_saved_questions';
const EVENT_NAME = 'prephub_saved_questions_change';

const INITIAL_SAVED_QUESTIONS: SavedQuestionItem[] = [
  {
    id: 'sq-01',
    testId: 'btech-cse-s1-subj1-t1',
    testTitle: 'Engineering Mathematics I - Mock Test 1',
    subject: 'Engineering Mathematics',
    statement: 'If matrix $A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$, what are the eigenvalues $\\lambda_1, \\lambda_2$ of $A$?',
    options: [
      { id: 'A', text: '$\\lambda = 1, 3$', isCorrect: true },
      { id: 'B', text: '$\\lambda = 2, 2$', isCorrect: false },
      { id: 'C', text: '$\\lambda = -1, 3$', isCorrect: false },
      { id: 'D', text: '$\\lambda = 0, 4$', isCorrect: false },
    ],
    studentSelectedText: '$\\lambda = 2, 2$',
    correctAnswerText: '$\\lambda = 1, 3$',
    isCorrect: false,
    explanation: 'The characteristic polynomial is $\\det(A - \\lambda I) = (2 - \\lambda)^2 - 1 = \\lambda^2 - 4\\lambda + 3 = 0$. Factoring yields $(\\lambda - 1)(\\lambda - 3) = 0$, hence $\\lambda = 1, 3$.',
    flaggedAt: '2026-11-12T14:22:00Z',
  },
  {
    id: 'sq-02',
    testId: 'btech-cse-s1-subj2-t1',
    testTitle: 'Programming in C - Mock Test 1',
    subject: 'Programming in C',
    statement: 'What is the output of `printf("%d", sizeof(char*));` on a standard 64-bit operating system architecture?',
    options: [
      { id: 'A', text: '1 byte', isCorrect: false },
      { id: 'B', text: '4 bytes', isCorrect: false },
      { id: 'C', text: '8 bytes', isCorrect: true },
      { id: 'D', text: 'Implementation defined / compiler error', isCorrect: false },
    ],
    studentSelectedText: '1 byte',
    correctAnswerText: '8 bytes',
    isCorrect: false,
    explanation: 'On a 64-bit architecture, every pointer address requires 64 bits (8 bytes) of storage regardless of the type it points to. `sizeof(char)` is 1, but `sizeof(char*)` is 8.',
    flaggedAt: '2026-11-13T10:45:00Z',
  },
  {
    id: 'sq-03',
    testId: 'btech-cse-s1-subj3-t1',
    testTitle: 'Engineering Physics - Mock Test 1',
    statement: 'In Fraunhofer single-slit diffraction, if the slit width is $a$ and wavelength is $\\lambda$, the condition for the $m^{\\text{th}}$ minimum intensity is given by:',
    subject: 'Engineering Physics',
    options: [
      { id: 'A', text: '$a \\sin\\theta = m\\lambda$ (where $m = \\pm 1, \\pm 2, \\dots$)', isCorrect: true },
      { id: 'B', text: '$a \\sin\\theta = (2m + 1)\\frac{\\lambda}{2}$', isCorrect: false },
      { id: 'C', text: '$a \\cos\\theta = m\\lambda$', isCorrect: false },
      { id: 'D', text: '$2a \\sin\\theta = m\\lambda$', isCorrect: false },
    ],
    studentSelectedText: '$a \\sin\\theta = m\\lambda$ (where $m = \\pm 1, \\pm 2, \\dots$)',
    correctAnswerText: '$a \\sin\\theta = m\\lambda$ (where $m = \\pm 1, \\pm 2, \\dots$)',
    isCorrect: true,
    explanation: 'Destructive interference occurs when the path difference between light rays originating from opposite edges of the slit equals an integer multiple of wavelengths: $a \\sin\\theta = m\\lambda$ ($m \\neq 0$).',
    flaggedAt: '2026-11-14T16:10:00Z',
  },
  {
    id: 'sq-04',
    testId: 'btech-cse-s1-subj1-t2',
    testTitle: 'Engineering Mathematics I - Mock Test 2',
    subject: 'Engineering Mathematics',
    statement: 'Compute the gradient $\\nabla f$ of the scalar field $f(x, y, z) = x^2 y + y z^3$ at point $P(1, 2, -1)$:',
    options: [
      { id: 'A', text: '$\\langle 4, 0, -6 \\rangle$', isCorrect: true },
      { id: 'B', text: '$\\langle 2, 1, 3 \\rangle$', isCorrect: false },
      { id: 'C', text: '$\\langle 4, 1, 6 \\rangle$', isCorrect: false },
      { id: 'D', text: '$\\langle 2, 0, -6 \\rangle$', isCorrect: false },
    ],
    studentSelectedText: '$\\langle 4, 0, -6 \\rangle$',
    correctAnswerText: '$\\langle 4, 0, -6 \\rangle$',
    isCorrect: true,
    explanation: '$\\nabla f = \\langle 2xy, x^2 + z^3, 3yz^2 \\rangle$. Evaluating at $(1, 2, -1)$: $\\partial f/\\partial x = 2(1)(2) = 4$; $\\partial f/\\partial y = 1^2 + (-1)^3 = 0$; $\\partial f/\\partial z = 3(2)(-1)^2 = 6$. Hence $\\nabla f = \\langle 4, 0, 6 \\rangle$.',
    flaggedAt: '2026-11-14T19:30:00Z',
  },
];

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export const savedQuestionsStore = {
  getQuestions(): SavedQuestionItem[] {
    if (!isBrowser()) return INITIAL_SAVED_QUESTIONS;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAVED_QUESTIONS));
        return INITIAL_SAVED_QUESTIONS;
      }
      return JSON.parse(raw);
    } catch {
      return INITIAL_SAVED_QUESTIONS;
    }
  },

  addQuestion(item: SavedQuestionItem): void {
    if (!isBrowser()) return;
    const current = this.getQuestions();
    if (current.some((q) => q.id === item.id)) return;
    const updated = [item, ...current];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event(EVENT_NAME));

      if (isSupabaseConfigured()) {
        const user = authStore.getCurrentUser();
        if (user && user.id) {
          try {
            const supabase = createClient();
            void supabase.from('saved_questions').insert({
              user_id: user.id,
              question_id: item.id,
              test_id: item.testId,
              subject: item.subject,
            });
          } catch (err) {
            console.warn('Failed to sync saved question to Supabase:', err);
          }
        }
      }
    } catch (err) {
      console.warn('Failed to save flagged question:', err);
    }
  },

  removeQuestion(id: string): void {
    if (!isBrowser()) return;
    const current = this.getQuestions();
    const updated = current.filter((q) => q.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event(EVENT_NAME));

      if (isSupabaseConfigured()) {
        const user = authStore.getCurrentUser();
        if (user && user.id) {
          try {
            const supabase = createClient();
            void supabase.from('saved_questions').delete().eq('user_id', user.id).eq('question_id', id);
          } catch (err) {
            console.warn('Failed to remove saved question from Supabase:', err);
          }
        }
      }
    } catch (err) {
      console.warn('Failed to remove flagged question:', err);
    }
  },

  subscribe(callback: () => void): () => void {
    if (!isBrowser()) return () => {};
    const handler = () => callback();
    window.addEventListener(EVENT_NAME, handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener(EVENT_NAME, handler);
      window.removeEventListener('storage', handler);
    };
  },
};

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
  userId?: string;
}

const STORAGE_KEY = 'prephub_saved_questions';
const EVENT_NAME = 'prephub_saved_questions_change';

const INITIAL_SAVED_QUESTIONS: SavedQuestionItem[] = [];

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export const savedQuestionsStore = {
  getQuestions(): SavedQuestionItem[] {
    if (!isBrowser()) return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        return [];
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // Automatically purge legacy seeded questions ('sq-01', 'sq-02', 'sq-03', 'sq-04')
        const clean = parsed.filter(
          (q) =>
            q &&
            !['sq-01', 'sq-02', 'sq-03', 'sq-04'].includes(q.id) &&
            !String(q.testId || '').startsWith('btech-cse-s1')
        );
        if (clean.length !== parsed.length) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
        }

        const user = authStore.getCurrentUser();
        if (user && user.id) {
          return clean.filter((q) => !q.userId || q.userId === user.id);
        }
        return clean;
      }
      return [];
    } catch {
      return [];
    }
  },

  addQuestion(item: SavedQuestionItem): void {
    if (!isBrowser()) return;
    const user = authStore.getCurrentUser();
    const itemWithUser: SavedQuestionItem = {
      ...item,
      userId: user?.id || item.userId,
    };
    const current = this.getQuestions();
    if (current.some((q) => q.id === item.id)) return;
    const updated = [itemWithUser, ...current];
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

import { TeacherSettings } from '@/types';
import { subjectOptions } from '@/data/mockData';

const SETTINGS_STORAGE_KEY = 'prephub_teacher_settings';

export const defaultSettings: TeacherSettings = {
  institutionName: 'PrepHub Academic Institute',
  department: 'Sciences & Applied Mathematics',
  academicTerm: 'Fall Semester 2026',
  defaultDurationMinutes: 60,
  defaultQuestionMarks: 2,
  defaultPassingPercentage: 60,
  defaultNegativeMarking: true,
  defaultNegativeMarksPenalty: 0.5,
  defaultShuffleQuestions: false,
  defaultShuffleOptions: false,
  autoPublishResults: false,
  subjects: subjectOptions.filter((s) => s !== 'All Subjects'),
};

export function getStoredSettings(): TeacherSettings {
  if (typeof window === 'undefined') return defaultSettings;
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(defaultSettings));
      return defaultSettings;
    }
    const parsed = JSON.parse(raw);
    return {
      ...defaultSettings,
      ...parsed,
      subjects: Array.isArray(parsed.subjects) && parsed.subjects.length > 0 ? parsed.subjects : defaultSettings.subjects,
    };
  } catch (err) {
    console.error('Failed to load teacher settings from localStorage:', err);
    return defaultSettings;
  }
}

export function saveStoredSettings(settings: TeacherSettings): boolean {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    window.dispatchEvent(new Event('prephub-settings-update'));
    return true;
  } catch (err) {
    console.error('Failed to save teacher settings to localStorage:', err);
    return false;
  }
}

export function resetSettingsToDefault(): TeacherSettings {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(SETTINGS_STORAGE_KEY);
      window.dispatchEvent(new Event('prephub-settings-update'));
    } catch (err) {
      console.error('Failed to reset settings:', err);
    }
  }
  return defaultSettings;
}

export function subscribeToSettings(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = () => callback();
  window.addEventListener('prephub-settings-update', handler);
  window.addEventListener('storage', (e) => {
    if (e.key === SETTINGS_STORAGE_KEY) {
      callback();
    }
  });
  return () => {
    window.removeEventListener('prephub-settings-update', handler);
  };
}

import { TeacherNotification } from '@/types';

const NOTIFICATIONS_STORAGE_KEY = 'prephub_teacher_notifications';

export const initialNotifications: TeacherNotification[] = [
  {
    id: 'notif-001',
    title: '12 New Submissions Recorded',
    description: 'Physics Mid-Term: Mechanics & Thermodynamics attempts reached 142 submissions.',
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35 mins ago
    isRead: false,
    type: 'submission',
    actionLink: '/teacher/attempts',
  },
  {
    id: 'notif-002',
    title: 'Subjective Answers Await Evaluation',
    description: 'Organic Chemistry & World History have 2 candidate submissions requiring manual grading.',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    isRead: false,
    type: 'grading',
    actionLink: '/teacher/grading',
  },
  {
    id: 'notif-003',
    title: 'Scheduled Test Countdown Active',
    description: 'Advanced Calculus & Differential Equations launches on October 24 at 09:00 AM UTC.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    isRead: false,
    type: 'reminder',
    actionLink: '/teacher',
  },
  {
    id: 'notif-004',
    title: 'System Autosave Synced',
    description: 'Local mock test state synced across local storage cache.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    isRead: true,
    type: 'system',
    actionLink: '/teacher',
  },
];

export function getStoredNotifications(): TeacherNotification[] {
  if (typeof window === 'undefined') return initialNotifications;
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(initialNotifications));
      return initialNotifications;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return initialNotifications;
  } catch (err) {
    console.error('Failed to load notifications from localStorage:', err);
    return initialNotifications;
  }
}

export function saveNotifications(notifications: TeacherNotification[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
    window.dispatchEvent(new Event('prephub-notifications-update'));
  } catch (err) {
    console.error('Failed to save notifications to localStorage:', err);
  }
}

export function markNotificationAsRead(id: string): TeacherNotification[] {
  const current = getStoredNotifications();
  const updated = current.map((n) => (n.id === id ? { ...n, isRead: true } : n));
  saveNotifications(updated);
  return updated;
}

export function markAllNotificationsAsRead(): TeacherNotification[] {
  const current = getStoredNotifications();
  const updated = current.map((n) => ({ ...n, isRead: true }));
  saveNotifications(updated);
  return updated;
}

export function subscribeToNotifications(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = () => callback();
  window.addEventListener('prephub-notifications-update', handler);
  window.addEventListener('storage', (e) => {
    if (e.key === NOTIFICATIONS_STORAGE_KEY) {
      callback();
    }
  });
  return () => {
    window.removeEventListener('prephub-notifications-update', handler);
  };
}

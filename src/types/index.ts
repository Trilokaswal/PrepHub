export type TestStatus = 'published' | 'scheduled' | 'draft' | 'pending_review';

export interface MockTest {
  id: string;
  title: string;
  subject: string;
  questionCount: number;
  durationMinutes: number;
  totalAttempts: number;
  averageScore?: number;
  status: TestStatus;
  scheduledDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StatMetric {
  value: number;
  change: string;
  isPositive: boolean;
  period: string;
}

export interface TeacherDashboardStats {
  totalTests: StatMetric;
  upcomingTests: StatMetric;
  totalAttempts: StatMetric;
  pendingReview: StatMetric;
}

export interface TeacherProfile {
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  department: string;
}

export interface NavItem {
  label: string;
  href: string;
  iconName: 'layout-dashboard' | 'file-text' | 'users' | 'check-square' | 'bar-chart' | 'settings';
  badge?: string;
  isImplemented?: boolean;
}

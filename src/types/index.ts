export type TestStatus = 'published' | 'scheduled' | 'draft' | 'pending_review';

export type QuestionType =
  | 'single_choice'
  | 'multiple_choice'
  | 'numerical'
  | 'subjective';

export interface McqOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface Question {
  id: string;
  testId: string;
  order: number;
  type: QuestionType;
  statement: string;
  explanation?: string;
  marks: number;
  negativeMarks?: number;
  // MCQ specific
  options?: McqOption[];
  // Numerical specific
  expectedNumericAnswer?: number;
  numericTolerance?: number;
  unit?: string;
  // Subjective specific
  subjectiveGuidelines?: string;
  wordLimit?: number;
  sampleAnswer?: string;
  // Image / asset attachment
  imageUrl?: string;
  imageAlt?: string;
  createdAt: string;
  updatedAt: string;
}

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
  totalMarks?: number;
  instructions?: string;
  questions?: Question[];
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

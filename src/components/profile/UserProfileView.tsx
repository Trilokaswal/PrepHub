'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  GraduationCap,
  BookOpen,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  Layers,
  Bookmark,
  Settings,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  RotateCcw,
  Camera,
  Trash2,
  Eye,
  Sliders,
  Bell,
  KeyRound,
  Sparkles,
  Search,
  Filter,
  Check,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  FileText,
  Briefcase,
} from 'lucide-react';
import { authStore, DEMO_CREDENTIALS } from '@/lib/authStore';
import { getStoredAttempts, subscribeToAttempts, syncAttemptsFromSupabase } from '@/lib/attemptsStore';
import { savedQuestionsStore, SavedQuestionItem } from '@/lib/savedQuestionsStore';
import {
  COURSE_OPTIONS,
  normalizeCourseName,
  getCurriculumSubjects,
} from '@/lib/courseCatalog';
import { AuthUser, StudentAttempt, UserRole } from '@/types';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Modal } from '@/components/ui/Modal';
import { MathText } from '@/components/ui/MathText';
import { GoogleIcon, MicrosoftIcon, AppleIcon } from '@/components/auth/SocialIcons';
import { CourseIcon } from '@/components/courses/CourseIcon';

type ActiveTab = 'overview' | 'history' | 'saved' | 'settings';

export const UserProfileView: React.FC = () => {
  const router = useRouter();

  // Authentication & User State
  const [user, setUser] = useState<AuthUser | null>(null);
  const [attempts, setAttempts] = useState<StudentAttempt[]>([]);
  const [savedQuestions, setSavedQuestions] = useState<SavedQuestionItem[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isMounted, setIsMounted] = useState(false);

  // Filter States
  const [historyFilter, setHistoryFilter] = useState<'all' | 'passed' | 'review'>('all');
  const [savedSubjectFilter, setSavedSubjectFilter] = useState<string>('all');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  // Review Modal State
  const [reviewAttempt, setReviewAttempt] = useState<StudentAttempt | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Settings Form State
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editRoll, setEditRoll] = useState('');
  const [editCourse, setEditCourse] = useState('');
  const [editBranch, setEditBranch] = useState('');
  const [editSemester, setEditSemester] = useState<number>(1);
  const [editSection, setEditSection] = useState('');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  // Preference Toggles State
  const [audioAlerts, setAudioAlerts] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(true);
  const [autoFlagging, setAutoFlagging] = useState(false);

  // Change Password Modal
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Initial Load & Subscriptions
  useEffect(() => {
    setIsMounted(true);
    const currentUser = authStore.getCurrentUser();
    if (!currentUser) {
      router.replace('/login?redirect=/profile');
      return;
    }
    setUser(currentUser);
    setEditName(currentUser.name || '');
    setEditPhone(currentUser.phone || '');
    setEditRoll(currentUser.universityRoll || '');
    setEditCourse(currentUser.course || '');
    setEditBranch(currentUser.branch || '');
    setEditSemester(currentUser.semester ? Number(currentUser.semester) : 1);
    setEditSection(currentUser.section || '');

    setAttempts(getStoredAttempts());
    setSavedQuestions(savedQuestionsStore.getQuestions());

    if (currentUser.id) {
      void syncAttemptsFromSupabase(currentUser.id).then((synced) => {
        if (synced) setAttempts(synced);
      });
    }

    const unsubAuth = authStore.subscribe(() => {
      const u = authStore.getCurrentUser();
      setUser(u);
      if (u?.id) {
        void syncAttemptsFromSupabase(u.id).then((synced) => {
          if (synced) setAttempts(synced);
        });
      }
    });

    const unsubAttempts = subscribeToAttempts(() => {
      setAttempts(getStoredAttempts());
    });

    const unsubSaved = savedQuestionsStore.subscribe(() => {
      setSavedQuestions(savedQuestionsStore.getQuestions());
    });

    return () => {
      unsubAuth();
      unsubAttempts();
      unsubSaved();
    };
  }, [router]);

  // Derived KPI Statistics strictly filtered to this authenticated user
  const userAttempts = useMemo(() => {
    if (!user) return [];
    if (user.role === 'teacher') return attempts;
    const userEmail = (user.email || '').toLowerCase().trim();
    const userId = user.id;
    const userRoll = (user.universityRoll || '').toLowerCase().trim();

    return attempts.filter((a) => {
      const attEmail = (a.studentEmail || '').toLowerCase().trim();
      const attUserId = (a as any).userId;
      const attRoll = (a.studentRoll || '').toLowerCase().trim();

      const matchesEmail = Boolean(userEmail && attEmail && attEmail === userEmail);
      const matchesId = Boolean(userId && attUserId && attUserId === userId);
      const matchesRoll = Boolean(userRoll && attRoll && attRoll === userRoll);

      return matchesEmail || matchesId || matchesRoll;
    });
  }, [attempts, user]);

  const stats = useMemo(() => {
    const totalTaken = userAttempts.length;
    if (totalTaken === 0) {
      return {
        totalTests: 0,
        avgScore: 0,
        accuracy: 0,
        savedCount: savedQuestions.length,
        testsThisWeek: 0,
      };
    }
    const sumPercentage = userAttempts.reduce((acc, a) => acc + (a.percentage || 0), 0);
    const avgScore = parseFloat((sumPercentage / totalTaken).toFixed(1));
    const passedCount = userAttempts.filter((a) => (a.percentage || 0) >= 50).length;
    const accuracy = parseFloat(((passedCount / totalTaken) * 100).toFixed(1));

    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const testsThisWeek = userAttempts.filter(
      (a) => a.submittedAt && new Date(a.submittedAt).getTime() >= oneWeekAgo
    ).length;

    return {
      totalTests: totalTaken,
      avgScore,
      accuracy,
      savedCount: savedQuestions.length,
      testsThisWeek,
    };
  }, [userAttempts, savedQuestions]);

  // Derived enrolled academic details
  const enrolledCourse = user?.course || editCourse || '';
  const enrolledBranch = user?.branch || editBranch || '';
  const enrolledSemester = user?.semester ? Number(user.semester) : (editSemester ? Number(editSemester) : 1);
  const userHasAcademicSetup = Boolean(enrolledCourse && enrolledBranch);

  // Available branches dynamically scoped to currently chosen course
  const selectedCourseConfig = useMemo(() => {
    if (!editCourse) return null;
    const norm = normalizeCourseName(editCourse).toLowerCase();
    return COURSE_OPTIONS.find((c) => c.name.toLowerCase() === norm || c.id === norm) || null;
  }, [editCourse]);

  const availableBranches = useMemo(() => {
    return selectedCourseConfig?.branches || [];
  }, [selectedCourseConfig]);

  const maxSemesters = selectedCourseConfig?.totalSemesters || 8;

  const handleCourseChange = (newCourse: string) => {
    setEditCourse(newCourse);
    const config = COURSE_OPTIONS.find(
      (c) => c.name.toLowerCase() === newCourse.toLowerCase() || c.id === newCourse.toLowerCase()
    );
    if (config && config.branches.length > 0) {
      setEditBranch(config.branches[0].name);
    } else {
      setEditBranch('');
    }
  };

  // Real Curriculum Progress Calculated Per Subject according to user's chosen course & branch
  const curriculumProgress = useMemo(() => {
    if (!userHasAcademicSetup) return [];

    const rawSubjects = getCurriculumSubjects(enrolledCourse, enrolledBranch, enrolledSemester);

    return rawSubjects.map((subj) => {
      const subjLower = subj.name.toLowerCase();
      const codeLower = subj.code.toLowerCase();
      const keywords = subjLower.split(/[\s,&-]+/).filter((w) => w.length > 2);

      const matchingAttempts = userAttempts.filter((a) => {
        const subName = (a.subject || '').toLowerCase();
        const testTitle = (a.testTitle || '').toLowerCase();
        return (
          subName.includes(subjLower) ||
          testTitle.includes(subjLower) ||
          testTitle.includes(codeLower) ||
          keywords.some((k) => subName.includes(k) || testTitle.includes(k))
        );
      });

      const testsDone = matchingAttempts.length;
      const totalTests = 2;
      const progress =
        testsDone > 0
          ? Math.min(
              100,
              Math.round(matchingAttempts.reduce((sum, a) => sum + (a.percentage || 0), 0) / testsDone)
            )
          : 0;

      return {
        ...subj,
        testsDone,
        totalTests,
        progress,
      };
    });
  }, [userHasAcademicSetup, enrolledCourse, enrolledBranch, enrolledSemester, userAttempts]);

  // Real Exam Readiness Score & Forecast Infographic
  const readinessMetrics = useMemo(() => {
    if (userAttempts.length === 0) {
      return {
        score: 0,
        summary: 'No mock tests completed yet. Start your first timed assessment to generate your personalized exam readiness score and performance forecast.',
        pace: '—',
        syllabusCovered: '0% complete',
        predictedGrade: 'Not Evaluated',
      };
    }

    const avgScore = userAttempts.reduce((acc, a) => acc + (a.percentage || 0), 0) / userAttempts.length;
    const distinctSubjects = new Set(userAttempts.map((a) => (a.subject || '').toLowerCase().trim())).size;
    const syllabusPercent = Math.min(100, Math.round((distinctSubjects / 5) * 100));

    // Weighted Readiness: 70% average score + 30% coverage
    const calculatedScore = Math.min(100, Math.round(avgScore * 0.7 + syllabusPercent * 0.3));

    let grade = 'Needs Revision';
    if (calculatedScore >= 85) grade = 'A+ (Distinction)';
    else if (calculatedScore >= 75) grade = 'A (Excellent)';
    else if (calculatedScore >= 65) grade = 'B+ (Good)';
    else if (calculatedScore >= 50) grade = 'B (Average)';

    let summary = `Solid progress across ${distinctSubjects} subject(s). Keep practicing to reach top-tier marks in Semester ${enrolledSemester || 1}.`;
    if (calculatedScore >= 80) {
      summary = `High retention rate! You are on track for top-tier marks in Semester ${enrolledSemester || 1} examinations.`;
    } else if (calculatedScore < 50) {
      summary = `Early stage. Review weaker concepts and attempt more mock tests to boost your predicted score.`;
    }

    return {
      score: calculatedScore,
      summary,
      pace: '1.2 min / question',
      syllabusCovered: `${syllabusPercent}% complete`,
      predictedGrade: grade,
    };
  }, [userAttempts, enrolledSemester]);

  // Filtered History
  const filteredAttempts = useMemo(() => {
    const list = userAttempts;
    if (historyFilter === 'passed') {
      return list.filter((a) => a.percentage >= 50);
    }
    if (historyFilter === 'review') {
      return list.filter((a) => a.percentage < 50);
    }
    return list;
  }, [userAttempts, historyFilter]);

  // Filtered Saved Questions
  const filteredSavedQuestions = useMemo(() => {
    if (savedSubjectFilter === 'all') return savedQuestions;
    return savedQuestions.filter((q) => q.subject.toLowerCase() === savedSubjectFilter.toLowerCase());
  }, [savedQuestions, savedSubjectFilter]);

  // Unique Subjects for Saved Questions Filter
  const uniqueSavedSubjects = useMemo(() => {
    const subjects = new Set<string>();
    savedQuestions.forEach((q) => subjects.add(q.subject));
    return Array.from(subjects);
  }, [savedQuestions]);

  // Handle Profile Update Submission
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const result = authStore.updateProfile({
      name: editName.trim(),
      phone: editPhone.trim(),
      universityRoll: editRoll.trim(),
      course: editCourse,
      branch: editBranch,
      semester: editSemester,
      section: editSection.trim(),
    });

    if (result.success) {
      setSaveSuccessMessage('Academic profile updated successfully!');
      setTimeout(() => setSaveSuccessMessage(null), 3000);
    }
  };

  // Handle Remove Saved Question
  const handleRemoveSavedQuestion = (id: string) => {
    savedQuestionsStore.removeQuestion(id);
  };

  // Handle Password Change
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }
    if (user) {
      authStore.resetPassword(user.email, newPassword);
      setPasswordMessage({ type: 'success', text: 'Password updated successfully!' });
      setTimeout(() => {
        setIsPasswordModalOpen(false);
        setPasswordMessage(null);
        setCurrentPassword('');
        setNewPassword('');
      }, 1200);
    }
  };

  if (!isMounted || !user) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-8 h-8 border-2 border-slate-200 border-t-[#E14D45] rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  const isTeacher = user.role === 'teacher';

  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans text-slate-900 selection:bg-[#E14D45]/15 selection:text-[#E14D45]">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Profile Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* =================================================================== */}
        {/* SECTION A: IDENTITY & ACADEMIC HEADER                               */}
        {/* =================================================================== */}
        <section className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
          {/* Subtle Top Accent Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#15233E] via-[#E14D45] to-[#15233E]" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left: Avatar, Name, Badges */}
            <div className="flex items-start sm:items-center gap-5">
              {/* Avatar with Camera Overlay */}
              <div className="relative group shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#15233E] to-[#1E293B] text-white flex items-center justify-center font-extrabold text-2xl sm:text-3xl shadow-md border-2 border-white">
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .substring(0, 2)
                    .toUpperCase()}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-[#E14D45] text-white flex items-center justify-center shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  title="Edit Avatar / Settings"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Name & Academic Meta */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {user.name}
                  </h1>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase ${
                      isTeacher
                        ? 'bg-purple-100 text-purple-800 border border-purple-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{isTeacher ? 'Verified Educator' : 'Enrolled Student'}</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  {user.email} &bull; Member since{' '}
                  {new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>

                {/* Academic Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  {userHasAcademicSetup ? (
                    <span className="font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-[#E14D45]" />
                      <span>
                        {enrolledCourse} &bull; {enrolledBranch} (Sem {enrolledSemester})
                      </span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveTab('settings')}
                      className="font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100/80 px-2.5 py-1 rounded-md border border-amber-200/80 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                      <span>Select Course &amp; Branch in Settings &rarr;</span>
                    </button>
                  )}

                  <span className="font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60">
                    Roll: <strong className="text-slate-800">{user.universityRoll || editRoll || 'Not Assigned'}</strong>
                  </span>

                  {(user.section || editSection) ? (
                    <span className="font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded-md border border-slate-200/60">
                      Sec: <strong className="text-slate-800">{user.section || editSection}</strong>
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Right: Quick Action Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              {isTeacher ? (
                <Link
                  href="/teacher"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#15233E] hover:bg-[#1E2F52] text-white text-xs font-bold tracking-tight shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Educator Dashboard</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E14D45] hover:bg-[#CC3F37] text-white text-xs font-bold tracking-tight shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Resume Syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>

          {/* Quick Stat Bar (KPI Counters) */}
          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* KPI 1 */}
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                Tests Taken
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
                  {stats.totalTests}
                </span>
                {stats.testsThisWeek > 0 ? (
                  <span className="text-xs text-emerald-600 font-semibold flex items-center">
                    <TrendingUp className="w-3 h-3 mr-0.5" /> +{stats.testsThisWeek} this week
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 font-medium">completed</span>
                )}
              </div>
            </div>

            {/* KPI 2 */}
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                Average Score
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
                  {stats.avgScore}%
                </span>
                <span className="text-xs text-slate-400 font-medium">overall</span>
              </div>
            </div>

            {/* KPI 3 */}
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                Accuracy Rate
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
                  {stats.accuracy}%
                </span>
                <span className={`text-xs font-semibold ${stats.totalTests > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {stats.totalTests > 0 ? (stats.accuracy >= 75 ? 'Ready' : 'In Progress') : 'Unranked'}
                </span>
              </div>
            </div>

            {/* KPI 4 */}
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                Flagged Vault
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#E14D45] tracking-tight font-mono">
                  {stats.savedCount}
                </span>
                <span className="text-xs text-slate-400 font-medium">Questions</span>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION B: TABBED NAVIGATION                                        */}
        {/* =================================================================== */}
        <div className="flex items-center gap-2 border-b border-slate-200/80 pb-px overflow-x-auto custom-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold tracking-tight rounded-t-xl transition-all cursor-pointer whitespace-nowrap border-b-2 ${
              activeTab === 'overview'
                ? 'border-[#E14D45] text-slate-900 bg-white/80'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-white/40'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Overview &amp; Progress</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold tracking-tight rounded-t-xl transition-all cursor-pointer whitespace-nowrap border-b-2 ${
              activeTab === 'history'
                ? 'border-[#E14D45] text-slate-900 bg-white/80'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-white/40'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Test History &amp; Scorecards</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-600">
              {userAttempts.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold tracking-tight rounded-t-xl transition-all cursor-pointer whitespace-nowrap border-b-2 ${
              activeTab === 'saved'
                ? 'border-[#E14D45] text-slate-900 bg-white/80'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-white/40'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved Questions Vault</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#E14D45]/10 text-[#E14D45]">
              {savedQuestions.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold tracking-tight rounded-t-xl transition-all cursor-pointer whitespace-nowrap border-b-2 ${
              activeTab === 'settings'
                ? 'border-[#E14D45] text-slate-900 bg-white/80'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-white/40'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Account &amp; Security</span>
          </button>
        </div>

        {/* =================================================================== */}
        {/* TAB 1: OVERVIEW & ACADEMIC PROGRESS                                 */}
        {/* =================================================================== */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Semester Subjects Completion Progress */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                      Curriculum Progress &bull; Semester {enrolledSemester}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {userHasAcademicSetup
                        ? `Standard syllabus subjects for ${enrolledCourse} (${enrolledBranch}).`
                        : 'Personalized syllabus subjects will appear once your course and branch are selected.'}
                    </p>
                  </div>
                  {userHasAcademicSetup && (
                    <Link
                      href={`/courses/${enrolledCourse.toLowerCase().replace(/[^a-z0-9]/g, '') || 'btech'}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E14D45] hover:text-[#CC3F37] transition-colors"
                    >
                      <span>Open Curriculum</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>

                {/* Subject Progress Bars */}
                {!userHasAcademicSetup ? (
                  <div className="p-8 sm:p-10 rounded-2xl bg-slate-50/80 border border-dashed border-slate-300 text-center space-y-3.5">
                    <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
                    <h4 className="text-sm font-bold text-slate-800">Academic Curriculum Not Selected</h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                      Select your enrolled Degree Course and Branch in Account Settings to load your personalized semester syllabus and track your real-time subject progress.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveTab('settings')}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E14D45] hover:bg-[#CC3F37] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <span>Configure Course &amp; Branch</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {curriculumProgress.map((subj) => (
                      <div key={subj.code} className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                              {subj.code}
                            </span>
                            <span className="font-bold text-slate-900">{subj.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold font-mono text-slate-800">{subj.progress}%</span>
                            <span className="text-slate-400 ml-1">
                              ({subj.testsDone}/{subj.totalTests} tests)
                            </span>
                          </div>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#15233E] to-[#E14D45] rounded-full transition-all duration-500"
                            style={{ width: `${subj.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Activity Timeline */}
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">Recent Activity Feed</h2>
                  <button
                    type="button"
                    onClick={() => setActiveTab('history')}
                    className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    View All History
                  </button>
                </div>

                <div className="divide-y divide-slate-100 space-y-4">
                  {userAttempts.length === 0 ? (
                    <div className="py-8 text-center space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                        <Award className="w-6 h-6 text-slate-400" />
                      </div>
                      <p className="text-sm font-bold text-slate-800">No mock tests attempted yet</p>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Your completed mock tests, scores, and question-by-question review logs will appear here once you finish an assessment.
                      </p>
                      <div className="pt-2">
                        <Link
                          href="/courses"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E14D45] text-white text-xs font-bold hover:bg-[#CC3F37] transition-all shadow-xs"
                        >
                          <span>Browse Mock Tests</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    userAttempts.slice(0, 4).map((att) => (
                      <div key={att.id} className="pt-4 first:pt-0 flex items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
                            <Award className="w-4 h-4 text-[#E14D45]" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 tracking-tight">{att.testTitle}</h4>
                            <p className="text-xs text-slate-400">
                              {att.subject} &bull; Submitted on {new Date(att.submittedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono ${
                              att.percentage >= 80
                                ? 'bg-emerald-100 text-emerald-800'
                                : att.percentage >= 50
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {att.percentage}%
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setReviewAttempt(att);
                              setIsReviewModalOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors cursor-pointer"
                          >
                            Review
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Performance Radar & Readiness */}
            <div className="lg:col-span-4 space-y-6">
              {/* Exam Readiness Indicator */}
              <div className="bg-[#15233E] text-white rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-cyan-400">
                    EXAM READINESS SCORE
                  </span>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>

                <div className="text-center py-2 space-y-2">
                  <div className="inline-flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold font-mono tracking-tight text-white">
                      {readinessMetrics.score}
                    </span>
                    <span className="text-lg font-mono text-cyan-300">/100</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {readinessMetrics.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>Speed / Pace:</span>
                    <span className="font-mono text-cyan-400 font-bold">{readinessMetrics.pace}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Syllabus Covered:</span>
                    <span className="font-mono text-cyan-400 font-bold">{readinessMetrics.syllabusCovered}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Predicted Grade:</span>
                    <span className="font-mono text-emerald-400 font-bold">{readinessMetrics.predictedGrade}</span>
                  </div>
                </div>

                <Link
                  href="/courses"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#E14D45] hover:bg-[#CC3F37] text-white font-bold text-xs shadow-md transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>Practice More Subjects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Educator Fast Card (if teacher) */}
              {isTeacher && (
                <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#E14D45]" />
                    <span>Educator Portal Tools</span>
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    You have educator privileges. Manage question blueprints, publish exams, and grade subjective questions.
                  </p>
                  <div className="pt-2 flex flex-col gap-2">
                    <Link
                      href="/teacher"
                      className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
                    >
                      <span>Teacher Dashboard</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/teacher/grading"
                      className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium"
                    >
                      <span>Review Grading Queue</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 2: EXAM HISTORY & SCORECARD ARCHIVE                             */}
        {/* =================================================================== */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-700">Filter By Status:</span>
                <div className="flex items-center gap-1.5 ml-2">
                  <button
                    type="button"
                    onClick={() => setHistoryFilter('all')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      historyFilter === 'all'
                        ? 'bg-[#15233E] text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    All ({userAttempts.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setHistoryFilter('passed')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      historyFilter === 'passed'
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Passed (&ge;50%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setHistoryFilter('review')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      historyFilter === 'review'
                        ? 'bg-rose-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Needs Review (&lt;50%)
                  </button>
                </div>
              </div>

              <span className="text-xs text-slate-400 font-mono">
                Showing {filteredAttempts.length} mock examination attempts
              </span>
            </div>

            {/* Attempts Cards Grid */}
            <div className="space-y-4">
              {filteredAttempts.length === 0 ? (
                <div className="bg-white/95 rounded-3xl p-12 text-center border border-slate-200/80 space-y-4">
                  <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
                  <h3 className="text-base font-bold text-slate-800">No mock tests found in this filter</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Start practising syllabus tests to populate your scorecard archive and performance analytics.
                  </p>
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E14D45] text-white text-xs font-bold shadow-xs"
                  >
                    Browse Mock Tests
                  </Link>
                </div>
              ) : (
                filteredAttempts.map((attempt) => {
                  const isPassed = attempt.percentage >= 50;
                  return (
                    <div
                      key={attempt.id}
                      className="bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
                    >
                      {/* Left: Info & Badges */}
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                            {attempt.subject}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                              isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {isPassed ? 'Passed' : 'Needs Review'}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            ID: {attempt.id}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                          {attempt.testTitle}
                        </h3>

                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(attempt.submittedAt).toLocaleDateString()} at{' '}
                            {new Date(attempt.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            Completed on time
                          </span>
                        </div>
                      </div>

                      {/* Right: Score Pill & Action Buttons */}
                      <div className="flex items-center gap-4 shrink-0 justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                        {/* Score Display */}
                        <div className="text-right pr-2">
                          <div className="text-xl sm:text-2xl font-extrabold font-mono text-slate-900">
                            {attempt.score}{' '}
                            <span className="text-xs font-normal text-slate-400">/ {attempt.totalMarks}</span>
                          </div>
                          <div
                            className={`text-xs font-bold font-mono ${
                              isPassed ? 'text-emerald-600' : 'text-rose-600'
                            }`}
                          >
                            {attempt.percentage}% score
                          </div>
                        </div>

                        {/* Interactive Buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setReviewAttempt(attempt);
                              setIsReviewModalOpen(true);
                            }}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-slate-500" />
                            <span>Review</span>
                          </button>

                          <Link
                            href={`/test/${attempt.testId}`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E14D45] hover:bg-[#CC3F37] text-white text-xs font-bold shadow-xs active:scale-[0.98] transition-all cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Retake</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 3: BOOKMARKED & FLAGGED QUESTIONS VAULT                         */}
        {/* =================================================================== */}
        {activeTab === 'saved' && (
          <div className="space-y-6">
            {/* Subject Filters */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-[#E14D45]" />
                  <span>Filter by Subject:</span>
                </span>
                <button
                  type="button"
                  onClick={() => setSavedSubjectFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    savedSubjectFilter === 'all'
                      ? 'bg-[#15233E] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All ({savedQuestions.length})
                </button>
                {uniqueSavedSubjects.map((subj) => (
                  <button
                    key={subj}
                    type="button"
                    onClick={() => setSavedSubjectFilter(subj)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      savedSubjectFilter === subj
                        ? 'bg-[#15233E] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {subj}
                  </button>
                ))}
              </div>

              <span className="text-xs text-slate-400 font-medium">
                {filteredSavedQuestions.length} flagged questions ready for revision
              </span>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {filteredSavedQuestions.length === 0 ? (
                <div className="bg-white/95 rounded-3xl p-12 text-center border border-slate-200/80 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/70 text-amber-600 flex items-center justify-center mx-auto shadow-2xs">
                    <Bookmark className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-800">
                      {savedQuestions.length === 0
                        ? 'No Flagged Questions in Vault'
                        : 'No flagged questions matching this filter'}
                    </h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                      {savedQuestions.length === 0
                        ? 'You have not flagged any questions for revision yet. During mock tests or scorecard reviews, click the bookmark/flag icon on challenging questions to store them here for targeted review.'
                        : 'Try switching the subject filter to view questions saved from other examination papers.'}
                    </p>
                  </div>
                  {savedQuestions.length === 0 && (
                    <Link
                      href="/courses"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E14D45] hover:bg-[#CC3F37] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <span>Browse Mock Tests</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              ) : (
                filteredSavedQuestions.map((q, idx) => {
                  const isExpanded = expandedQuestionId === q.id;

                  return (
                    <div
                      key={q.id}
                      className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4 transition-all"
                    >
                      {/* Header: Subject, Test ID, Actions */}
                      <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-[#15233E] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-[#E14D45] uppercase tracking-wide">
                            {q.subject}
                          </span>
                          <span className="text-slate-300">&bull;</span>
                          <span className="text-xs text-slate-400 font-medium">{q.testTitle}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                            className="px-3 py-1 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                          >
                            {isExpanded ? 'Collapse' : 'View Explanation'}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveSavedQuestion(q.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Remove from bookmarks"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Question Statement */}
                      <div className="text-sm sm:text-base font-medium text-slate-900 leading-relaxed">
                        <MathText text={q.statement} />
                      </div>

                      {/* Options Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        {q.options.map((opt) => {
                          const isStudentSelected = q.studentSelectedText === opt.text;
                          const isCorrectOption = opt.isCorrect;

                          let borderStyle = 'border-slate-200 bg-slate-50/60 text-slate-700';
                          if (isCorrectOption) {
                            borderStyle = 'border-emerald-300 bg-emerald-50 text-emerald-900 font-semibold';
                          } else if (isStudentSelected && !isCorrectOption) {
                            borderStyle = 'border-rose-300 bg-rose-50 text-rose-900';
                          }

                          return (
                            <div
                              key={opt.id}
                              className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-3 ${borderStyle}`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="w-5 h-5 rounded-md bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-mono font-bold text-[10px] shrink-0">
                                  {opt.id}
                                </span>
                                <div>
                                  <MathText text={opt.text} />
                                </div>
                              </div>

                              {isCorrectOption && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                                  <Check className="w-3 h-3" /> Correct
                                </span>
                              )}
                              {isStudentSelected && !isCorrectOption && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 uppercase tracking-wider">
                                  Your Choice
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Expanded Mathematical Explanation Box */}
                      {isExpanded && (
                        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                          <div className="font-bold text-slate-800 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#E14D45]" />
                            <span>Step-by-Step Mathematical Explanation:</span>
                          </div>
                          <div className="text-slate-600 leading-relaxed font-sans">
                            <MathText text={q.explanation} />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 4: ACCOUNT, SECURITY & SETTINGS                                 */}
        {/* =================================================================== */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Academic & Personal Profile Editor */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">Academic Profile Settings</h2>
                  <p className="text-xs text-slate-500">
                    Update your official enrollment details, institutional roll numbers, and cohort assignments.
                  </p>
                </div>

                {saveSuccessMessage && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold">{saveSuccessMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Full Name</label>
                      <input
                        type="text"
                        required
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E14D45]/30 focus:border-[#E14D45]"
                      />
                    </div>

                    {/* Email (Readonly) */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Institutional Email</label>
                      <input
                        type="email"
                        disabled
                        value={user.email}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-100/70 text-sm text-slate-500 cursor-not-allowed"
                      />
                    </div>

                    {/* University Roll Number */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">University Roll Number</label>
                      <input
                        type="text"
                        value={editRoll}
                        onChange={(e) => setEditRoll(e.target.value)}
                        placeholder="e.g. 2026-CS-042"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#E14D45]/30 focus:border-[#E14D45]"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Contact Number</label>
                      <input
                        type="tel"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        placeholder="e.g. 9876543210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E14D45]/30 focus:border-[#E14D45]"
                      />
                    </div>

                    {/* Enrolled Course */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Enrolled Course / Degree</label>
                      <select
                        value={editCourse}
                        onChange={(e) => handleCourseChange(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E14D45]/30 focus:border-[#E14D45] bg-white cursor-pointer"
                      >
                        <option value="">-- Select Enrolled Course / Degree --</option>
                        {COURSE_OPTIONS.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.fullName}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Branch / Specialization (Dynamically mapped to the selected course) */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Branch / Specialization</label>
                      <select
                        value={editBranch}
                        onChange={(e) => setEditBranch(e.target.value)}
                        disabled={!editCourse}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E14D45]/30 focus:border-[#E14D45] bg-white cursor-pointer disabled:bg-slate-100 disabled:text-slate-400"
                      >
                        {!editCourse ? (
                          <option value="">-- Please select a Course first --</option>
                        ) : (
                          availableBranches.map((b) => (
                            <option key={b.name} value={b.name}>
                              {b.label}
                            </option>
                          ))
                        )}
                      </select>
                      {editCourse && (
                        <p className="text-[11px] text-slate-400 mt-1">
                          Showing verified academic specializations for {editCourse}.
                        </p>
                      )}
                    </div>

                    {/* Semester Number */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Current Semester</label>
                      <select
                        value={editSemester}
                        onChange={(e) => setEditSemester(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E14D45]/30 focus:border-[#E14D45] bg-white cursor-pointer"
                      >
                        {Array.from({ length: maxSemesters }, (_, i) => i + 1).map((s) => (
                          <option key={s} value={s}>
                            Semester {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Section */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Class Section</label>
                      <input
                        type="text"
                        value={editSection}
                        onChange={(e) => setEditSection(e.target.value)}
                        placeholder="e.g. A"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E14D45]/30 focus:border-[#E14D45]"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#E14D45] hover:bg-[#CC3F37] text-white font-bold text-xs shadow-xs active:scale-[0.98] transition-all cursor-pointer"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </form>
              </div>

              {/* Study Preferences Toggles */}
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">Study &amp; Examination Preferences</h2>
                  <p className="text-xs text-slate-500">Configure real-time exam helpers and pacing notifications.</p>
                </div>

                <div className="divide-y divide-slate-100 space-y-4">
                  {/* Toggle 1 */}
                  <div className="pt-4 first:pt-0 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Timed Exam Audio Countdown Chime</h4>
                      <p className="text-xs text-slate-400">Play an audible cue when 5 minutes remain on the exam timer.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAudioAlerts(!audioAlerts)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        audioAlerts ? 'bg-[#E14D45]' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          audioAlerts ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Toggle 2 */}
                  <div className="pt-4 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Daily Revision Streaks &amp; Reminders</h4>
                      <p className="text-xs text-slate-400">Notify me daily to maintain test practice momentum.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDailyReminders(!dailyReminders)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        dailyReminders ? 'bg-[#E14D45]' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          dailyReminders ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Toggle 3 */}
                  <div className="pt-4 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Automatic Question Bookmarking</h4>
                      <p className="text-xs text-slate-400">
                        Automatically save incorrectly answered questions into my Saved Questions Vault.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAutoFlagging(!autoFlagging)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        autoFlagging ? 'bg-[#E14D45]' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          autoFlagging ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Connected Accounts & Security */}
            <div className="lg:col-span-4 space-y-6">
              {/* Connected Accounts Card */}
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">Connected Accounts</h3>
                  <p className="text-xs text-slate-500">Sign in seamlessly with your institutional identity providers.</p>
                </div>

                <div className="space-y-3">
                  {/* Google */}
                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                    <div className="flex items-center gap-2.5">
                      <GoogleIcon className="w-4 h-4" />
                      <span className="text-xs font-semibold text-slate-800">Google Workspace</span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Connected
                    </span>
                  </div>

                  {/* Microsoft */}
                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                    <div className="flex items-center gap-2.5">
                      <MicrosoftIcon className="w-4 h-4" />
                      <span className="text-xs font-semibold text-slate-800">Microsoft 365</span>
                    </div>
                    <button
                      type="button"
                      className="text-[11px] font-bold text-[#E14D45] hover:underline cursor-pointer"
                    >
                      Link
                    </button>
                  </div>

                  {/* Apple */}
                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                    <div className="flex items-center gap-2.5">
                      <AppleIcon className="w-4 h-4 text-slate-900" />
                      <span className="text-xs font-semibold text-slate-800">Apple ID</span>
                    </div>
                    <button
                      type="button"
                      className="text-[11px] font-bold text-[#E14D45] hover:underline cursor-pointer"
                    >
                      Link
                    </button>
                  </div>
                </div>
              </div>

              {/* Password & Security Card */}
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">Session &amp; Security</h3>
                  <p className="text-xs text-slate-500">Manage security credentials and current device sessions.</p>
                </div>

                <div className="pt-2 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsPasswordModalOpen(true)}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-slate-500" />
                    <span>Change Password</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      authStore.logout();
                      router.push('/');
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>Log Out of All Devices</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Review Solutions Modal */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setReviewAttempt(null);
        }}
        title={`Scorecard Review: ${reviewAttempt?.testTitle || 'Mock Examination'}`}
        maxWidth="lg"
      >
        {reviewAttempt && (
          <div className="space-y-6 text-xs text-slate-700">
            {/* Modal KPI Header */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-3 gap-4 text-center">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Score Awarded</span>
                <span className="text-xl font-extrabold text-slate-900 font-mono">
                  {reviewAttempt.score} / {reviewAttempt.totalMarks}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Percentage</span>
                <span
                  className={`text-xl font-extrabold font-mono ${
                    reviewAttempt.percentage >= 50 ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {reviewAttempt.percentage}%
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Status</span>
                <span className="text-sm font-bold text-slate-800 uppercase font-mono mt-1 block">
                  {reviewAttempt.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Subjective Submissions if present */}
            {reviewAttempt.subjectiveAnswers && reviewAttempt.subjectiveAnswers.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 text-sm">Subjective Answers &amp; Rubric Feedback:</h4>
                {reviewAttempt.subjectiveAnswers.map((sub) => (
                  <div key={sub.questionId} className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">Question {sub.questionOrder}</span>
                      <span className="font-mono text-slate-500">
                        Marks: {sub.awardedMarks || 0} / {sub.maxMarks}
                      </span>
                    </div>
                    <p className="font-medium text-slate-700">{sub.questionStatement}</p>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="text-[11px] font-bold text-slate-500 block mb-1">Your Submission:</span>
                      <p className="text-slate-700 leading-relaxed">{sub.studentAnswerText}</p>
                    </div>
                    {sub.teacherFeedback && (
                      <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
                        <span className="text-[11px] font-bold block mb-1">Evaluator Feedback:</span>
                        <p>{sub.teacherFeedback}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <Link
                href={`/test/${reviewAttempt.testId}`}
                className="px-4 py-2 rounded-lg bg-[#E14D45] text-white font-bold text-xs hover:bg-[#CC3F37] transition-colors"
              >
                Launch Fresh Retake
              </Link>
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
              >
                Close Review
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Change Password Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => {
          setIsPasswordModalOpen(false);
          setPasswordMessage(null);
        }}
        title="Update Account Password"
        maxWidth="md"
      >
        <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
          {passwordMessage && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                passwordMessage.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-rose-50 border-rose-200 text-rose-800'
              }`}
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{passwordMessage.text}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="block font-bold text-slate-700">Current Password</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#E14D45]/30 focus:border-[#E14D45]"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-slate-700">New Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#E14D45]/30 focus:border-[#E14D45]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#E14D45] hover:bg-[#CC3F37] text-white font-bold text-xs"
            >
              Update Password
            </button>
          </div>
        </form>
      </Modal>

      {/* Footer */}
      <Footer />
    </div>
  );
};

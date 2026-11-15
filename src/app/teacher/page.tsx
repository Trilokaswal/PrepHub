'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Calendar,
  Clock,
  Plus,
  Download,
  AlertCircle,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentTestsTable } from '@/components/dashboard/RecentTestsTable';
import { CreateTestModal } from '@/components/dashboard/CreateTestModal';
import { ExportModal } from '@/components/dashboard/ExportModal';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import {
  mockTeacherProfile,
  initialMockTests,
} from '@/data/mockData';
import { MockTest, AuthUser } from '@/types';
import { authStore } from '@/lib/authStore';
import {
  getStoredTests,
  deleteStoredTest,
  resetStoredTestsToDefault,
  subscribeToTestStore,
} from '@/lib/testStore';

export default function TeacherDashboardPage() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [tests, setTests] = useState<MockTest[]>(initialMockTests);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [demoNotice, setDemoNotice] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
  }>({
    isOpen: false,
    title: '',
    message: '',
  });

  // Client-side synchronization with local test store and auth store
  useEffect(() => {
    setTests(getStoredTests());
    setCurrentUser(authStore.getCurrentUser());

    const unsubTest = subscribeToTestStore(() => {
      setTests(getStoredTests());
    });

    const unsubAuth = authStore.subscribe(() => {
      setCurrentUser(authStore.getCurrentUser());
    });

    return () => {
      unsubTest();
      unsubAuth();
    };
  }, []);

  // Calculate live dynamic counts based on local test state
  const totalTestsCount = tests.length;
  const liveTestsCount = tests.filter((t) => t.status === 'published').length;
  const scheduledTestsCount = tests.filter((t) => t.status === 'scheduled').length;
  const pendingReviewCount = tests.filter((t) => t.status === 'pending_review').length;

  const teacherName = currentUser?.name || mockTeacherProfile.name;
  const teacherDepartment = currentUser?.department || mockTeacherProfile.department;
  const isStudentSession = currentUser?.role === 'student';

  const handleTestCreated = (newTest: MockTest) => {
    setTests((prev) => [newTest, ...prev.filter((t) => t.id !== newTest.id)]);
  };

  const handleDeleteTest = (id: string) => {
    deleteStoredTest(id);
    setTests((prev) => prev.filter((t) => t.id !== id));
  };

  const handleResetSampleData = () => {
    const reset = resetStoredTestsToDefault();
    setTests(reset);
  };

  const handleExportClick = () => {
    setIsExportModalOpen(true);
  };

  // Deny access to students, protecting teacher data
  if (isStudentSession) {
    return (
      <div className="max-w-lg mx-auto py-12 px-4 text-center space-y-6">
        <div className="w-14 h-14 bg-amber-50 border border-amber-200 text-amber-700 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Educator Access Restricted
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            You are currently signed in with a candidate account: <strong>{currentUser?.name}</strong>.
            The Teacher Workspace and exam creation tools are reserved exclusively for verified faculty.
          </p>
        </div>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/student"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#4F46E5] text-white font-semibold text-sm hover:bg-[#4338CA] transition-colors shadow-xs"
          >
            <span>Open Student Portal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/teacher/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <span>Sign in as Educator</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">

        {/* Welcome Header & Primary Actions */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              Welcome back, {teacherName.split(' ')[0]}
            </h1>
            <p className="text-sm text-slate-500 max-w-2xl">
              Manage your mock examinations, review student attempt metrics, and evaluate pending grading queues for {teacherDepartment}.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="md"
              leftIcon={<Download className="w-4 h-4" strokeWidth={1.75} />}
              onClick={handleExportClick}
            >
              Export
            </Button>
            <Button
              variant="primary"
              size="md"
              leftIcon={<Plus className="w-4 h-4" strokeWidth={1.75} />}
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create New Test
            </Button>
          </div>
        </div>

        {/* 4 Compact Stat Cards */}
        <section aria-label="Performance Statistics">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            <StatCard
              title="Total Tests"
              value={totalTestsCount}
              subtitle={`${totalTestsCount} ${totalTestsCount === 1 ? 'test' : 'tests'} in catalog`}
              icon={<FileText className="w-5 h-5" strokeWidth={1.75} />}
              iconBgColor="bg-indigo-50 text-[#4F46E5] border border-indigo-100"
            />
            <StatCard
              title="Live Tests"
              value={liveTestsCount}
              subtitle={`${liveTestsCount} ${liveTestsCount === 1 ? 'test' : 'tests'} accepting attempts`}
              icon={<CheckCircle2 className="w-5 h-5" strokeWidth={1.75} />}
              iconBgColor="bg-emerald-50 text-emerald-600 border border-emerald-100"
            />
            <StatCard
              title="Scheduled Tests"
              value={scheduledTestsCount}
              subtitle={`${scheduledTestsCount} ${scheduledTestsCount === 1 ? 'test' : 'tests'} upcoming`}
              icon={<Calendar className="w-5 h-5" strokeWidth={1.75} />}
              iconBgColor="bg-sky-50 text-sky-600 border border-sky-100"
            />
            <StatCard
              title="Needs Grading"
              value={pendingReviewCount}
              subtitle={`${pendingReviewCount} ${pendingReviewCount === 1 ? 'submission' : 'submissions'} to evaluate`}
              icon={<Clock className="w-5 h-5" strokeWidth={1.75} />}
              iconBgColor="bg-amber-50 text-amber-600 border border-amber-100"
            />
          </div>
        </section>

        {/* Actionable Notice for Grading Queue */}
        {pendingReviewCount > 0 && (
          <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/80 border border-amber-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-amber-950">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-amber-100 text-amber-700 shrink-0">
                <AlertCircle className="w-5 h-5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="font-semibold text-slate-900">
                  {pendingReviewCount} {pendingReviewCount === 1 ? 'test submission requires' : 'test submissions require'} manual grading
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Subjective answers in Organic Chemistry & Modern World History await evaluation.
                </p>
              </div>
            </div>
            <Link
              href="/teacher/grading"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-amber-300 text-amber-800 hover:bg-amber-100/50 transition-colors shadow-2xs self-start sm:self-auto shrink-0"
            >
              <span>Open Grading Queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Recent Tests Section */}
        <section aria-label="Recent Tests Section" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 tracking-tight">
                Recent Mock Tests
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Live filtering and status management across your test catalog.
              </p>
            </div>
            {tests.length !== initialMockTests.length && (
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<RotateCcw className="w-3.5 h-3.5" strokeWidth={1.75} />}
                onClick={handleResetSampleData}
                className="text-xs text-slate-500 hover:text-slate-800 self-start sm:self-auto"
              >
                Reset to default sample tests
              </Button>
            )}
          </div>

          {/* Interactive Tests Table */}
          <RecentTestsTable
            tests={tests}
            onDeleteTest={handleDeleteTest}
            onShowNotice={(title, message) =>
              setDemoNotice({ isOpen: true, title, message })
            }
          />
        </section>
      </div>

      {/* Create Test Modal */}
      <CreateTestModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onTestCreated={handleTestCreated}
      />

      {/* Export Catalog Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        tests={tests}
      />

      {/* Demo Action Modal */}
      <Modal
        isOpen={demoNotice.isOpen}
        onClose={() => setDemoNotice((prev) => ({ ...prev, isOpen: false }))}
        title={demoNotice.title}
        maxWidth="md"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
            {demoNotice.message}
          </p>
          <div className="pt-2 flex justify-end">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setDemoNotice((prev) => ({ ...prev, isOpen: false }))}
            >
              Got It
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

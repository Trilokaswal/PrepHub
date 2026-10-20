'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText,
  Calendar,
  Clock,
  Plus,
  Download,
  AlertCircle,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentTestsTable } from '@/components/dashboard/RecentTestsTable';
import { CreateTestModal } from '@/components/dashboard/CreateTestModal';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import {
  mockTeacherProfile,
  initialMockTests,
} from '@/data/mockData';
import { MockTest } from '@/types';
import {
  getStoredTests,
  deleteStoredTest,
  resetStoredTestsToDefault,
  subscribeToTestStore,
} from '@/lib/testStore';

export default function TeacherDashboardPage() {
  const [tests, setTests] = useState<MockTest[]>(initialMockTests);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [demoNotice, setDemoNotice] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
  }>({
    isOpen: false,
    title: '',
    message: '',
  });

  // Client-side synchronization with local test store
  useEffect(() => {
    setTests(getStoredTests());
    const unsubscribe = subscribeToTestStore(() => {
      setTests(getStoredTests());
    });
    return () => unsubscribe();
  }, []);

  // Calculate live dynamic counts based on local test state
  const totalTestsCount = tests.length;
  const liveTestsCount = tests.filter((t) => t.status === 'published').length;
  const scheduledTestsCount = tests.filter((t) => t.status === 'scheduled').length;
  const pendingReviewCount = tests.filter((t) => t.status === 'pending_review').length;

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
    setDemoNotice({
      isOpen: true,
      title: 'Export Test Analytics (Demo)',
      message:
        'The export functionality generates CSV and PDF report summaries in production. In this local mock phase, exports are simulated.',
    });
  };

  return (
    <>
      <div className="space-y-6">
        {/* Welcome Header & Primary Actions */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              Welcome back, {mockTeacherProfile.name.split(' ')[0]}
            </h1>
            <p className="text-sm text-slate-500 max-w-2xl">
              Manage your mock examinations, review student attempt metrics, and evaluate pending grading queues for {mockTeacherProfile.department}.
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
            <Button
              variant="outline"
              size="sm"
              className="bg-white border-amber-300 text-amber-800 hover:bg-amber-100/50 self-start sm:self-auto shrink-0 font-medium"
              onClick={() =>
                setDemoNotice({
                  isOpen: true,
                  title: 'Grading Queue (Demo)',
                  message:
                    'The grading interface lets instructors score subjective short-answer and essay questions with custom rubrics. This will be integrated with the backend submission queue.',
                })
              }
            >
              Open Grading Queue
            </Button>
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

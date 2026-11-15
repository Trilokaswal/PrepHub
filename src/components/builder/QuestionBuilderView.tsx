'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Settings,
  Save,
  Send,
  Eye,
  Edit3,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Clock,
  Award,
  Layers,
  Lock,
  Trash2,
  Plus,
} from 'lucide-react';
import { MockTest, Question, QuestionType, ExamSettings } from '@/types';
import {
  getStoredTestById,
  getStoredTests,
  saveStoredTest,
  deleteStoredTest,
  createDefaultQuestion,
  getDefaultExamSettings,
  generateUniqueId,
} from '@/lib/testStore';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { formatDateTime } from '@/lib/formatters';
import { QuestionNavigator } from '@/components/builder/QuestionNavigator';
import { QuestionEditor } from '@/components/builder/QuestionEditor';
import { StudentPreview } from '@/components/builder/StudentPreview';
import { ExamPublishModal } from '@/components/builder/ExamPublishModal';
import { validateTestForPublish, ValidationError } from '@/components/builder/PublishValidationModal';
import { CreateTestModal } from '@/components/dashboard/CreateTestModal';

export function QuestionBuilderView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const testIdParam = searchParams.get('testId');

  const [test, setTest] = useState<MockTest | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeQuestionId, setActiveQuestionId] = useState<string>('');
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isPublishConfirmOpen, setIsPublishConfirmOpen] = useState(false);
  const [publishValidationErrors, setPublishValidationErrors] = useState<ValidationError[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Load test from storage or fallback
  useEffect(() => {
    const allTests = getStoredTests();
    let currentTest: MockTest | null = null;

    if (testIdParam) {
      currentTest = getStoredTestById(testIdParam);
    }

    if (!currentTest && allTests.length > 0) {
      currentTest = allTests[0];
    }

    if (currentTest) {
      setTest(currentTest);
      const qList = currentTest.questions || [];
      setQuestions(qList);
      if (qList.length > 0) {
        setActiveQuestionId(qList[0].id);
      }
    } else {
      setTest(null);
      setQuestions([]);
      setActiveQuestionId('');
    }
    setIsInitialLoading(false);
  }, [testIdParam]);

  // Show transient toast
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Add Question
  const handleAddQuestion = (type: QuestionType) => {
    if (!test) return;
    const nextOrder = questions.length + 1;
    const newQ = createDefaultQuestion(test.id, nextOrder, type);
    const updatedList = [...questions, newQ];
    setQuestions(updatedList);
    setActiveQuestionId(newQ.id);

    // Save state
    const result = saveStoredTest({
      ...test,
      questions: updatedList,
      questionCount: updatedList.length,
    });
    if (result.success) {
      showToast(`Added Question ${nextOrder} (${type.replace('_', ' ')})`);
    } else {
      showToast(result.error || 'Failed to save added question.', 'error');
    }
  };

  // Update Question
  const handleUpdateQuestion = (updated: Question) => {
    if (!test) return;
    const updatedList = questions.map((q) => (q.id === updated.id ? updated : q));
    setQuestions(updatedList);

    // Update in-memory test representation
    setTest((prev) => (prev ? { ...prev, questions: updatedList } : prev));
  };

  // Duplicate Question
  const handleDuplicateQuestion = (id: string) => {
    if (!test) return;
    const targetIdx = questions.findIndex((q) => q.id === id);
    if (targetIdx === -1) return;

    const source = questions[targetIdx];
    const newId = generateUniqueId('q');
    const cloned: Question = {
      ...source,
      id: newId,
      order: targetIdx + 2,
      statement: `${source.statement} (Copy)`,
      options: source.options?.map((opt, i) => ({
        ...opt,
        id: `${newId}-opt-${i + 1}`,
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedList = [...questions];
    updatedList.splice(targetIdx + 1, 0, cloned);
    const reordered = updatedList.map((q, idx) => ({ ...q, order: idx + 1 }));
    setQuestions(reordered);
    setActiveQuestionId(newId);

    const result = saveStoredTest({
      ...test,
      questions: reordered,
      questionCount: reordered.length,
    });
    if (result.success) {
      showToast(`Question duplicated as Q${targetIdx + 2}`);
    } else {
      showToast(result.error || 'Failed to save duplicated question.', 'error');
    }
  };

  // Delete Question
  const handleDeleteQuestion = (id: string) => {
    if (!test) return;
    const remaining = questions.filter((q) => q.id !== id);
    const reordered = remaining.map((q, idx) => ({ ...q, order: idx + 1 }));
    setQuestions(reordered);

    if (activeQuestionId === id) {
      if (reordered.length > 0) {
        setActiveQuestionId(reordered[0].id);
      } else {
        setActiveQuestionId('');
      }
    }

    const result = saveStoredTest({
      ...test,
      questions: reordered,
      questionCount: reordered.length,
    });
    if (result.success) {
      showToast('Question deleted');
    } else {
      showToast(result.error || 'Failed to update test after deletion.', 'error');
    }
  };

  // Move Question (Reorder)
  const handleMoveQuestion = (index: number, direction: 'up' | 'down') => {
    if (!test) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= questions.length) return;

    const updated = [...questions];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    const reordered = updated.map((q, idx) => ({ ...q, order: idx + 1 }));
    setQuestions(reordered);

    const result = saveStoredTest({
      ...test,
      questions: reordered,
    });
    if (!result.success) {
      showToast(result.error || 'Failed to persist question reordering.', 'error');
    }
  };

  // Save Draft Action
  const handleSaveDraft = () => {
    if (!test) return;
    const result = saveStoredTest({
      ...test,
      questions,
      questionCount: questions.length,
      totalMarks: questions.reduce((sum, q) => sum + (q.marks || 0), 0),
    });
    if (result.success) {
      showToast('Draft saved successfully to local session');
    } else {
      showToast(result.error || 'Failed to save draft to storage.', 'error');
    }
  };

  // Confirm Publish Action (from ExamPublishModal)
  const handleConfirmPublish = (newSettings: ExamSettings, targetStatus: 'published' | 'scheduled') => {
    if (!test) return;
    const updatedTest: MockTest = {
      ...test,
      status: targetStatus,
      durationMinutes: newSettings.durationMinutes,
      scheduledDate: newSettings.scheduleType === 'scheduled' ? newSettings.startDate : undefined,
      settings: newSettings,
      questions,
      questionCount: questions.length,
      totalMarks: questions.reduce((sum, q) => sum + (q.marks || 0), 0),
      instructions: newSettings.instructions || test.instructions,
    };
    const result = saveStoredTest(updatedTest);
    if (result.success) {
      setTest(updatedTest);
      showToast(
        targetStatus === 'scheduled'
          ? 'Exam scheduled successfully and locked.'
          : 'Exam is now live! Students can access and submit attempts.'
      );
    } else {
      showToast(result.error || 'Failed to update exam status.', 'error');
    }
  };

  // Save Settings as Draft (from ExamPublishModal)
  const handleSaveDraftSettings = (newSettings: ExamSettings) => {
    if (!test) return;
    const updatedTest: MockTest = {
      ...test,
      durationMinutes: newSettings.durationMinutes,
      scheduledDate: newSettings.scheduleType === 'scheduled' ? newSettings.startDate : undefined,
      settings: newSettings,
      questions,
      instructions: newSettings.instructions || test.instructions,
    };
    const result = saveStoredTest(updatedTest);
    if (result.success) {
      setTest(updatedTest);
      showToast('Exam settings saved to draft.');
    } else {
      showToast(result.error || 'Failed to save exam settings.', 'error');
    }
  };

  // Direct Publish Action from Bottom Banner with Confirmation
  const handleDirectPublish = () => {
    if (!test) return;
    const currentSettings = test.settings || getDefaultExamSettings(test);
    const targetStatus: 'published' | 'scheduled' =
      currentSettings.scheduleType === 'scheduled' && currentSettings.startDate
        ? 'scheduled'
        : 'published';

    handleConfirmPublish(currentSettings, targetStatus);
    setIsPublishConfirmOpen(false);
  };

  // Delete Exam Action
  const handleDeleteExam = async () => {
    if (!test || isDeleting) return;
    setIsDeleting(true);
    try {
      const result = deleteStoredTest(test.id);
      if (!result.success) {
        throw new Error(result.error || 'Exam could not be deleted from storage');
      }
      const remaining = getStoredTests();
      if (remaining.some((t) => t.id === test.id)) {
        throw new Error('Exam could not be deleted from storage');
      }
      setIsDeleteModalOpen(false);
      router.push('/teacher');
    } catch (err) {
      setIsDeleting(false);
      showToast('Failed to delete exam. The exam was retained.', 'error');
    }
  };

  const handleTestCreatedFromEmptyState = (newTest: MockTest) => {
    setTest(newTest);
    const qList = newTest.questions || [];
    setQuestions(qList);
    if (qList.length > 0) {
      setActiveQuestionId(qList[0].id);
    }
    router.push(`/teacher/builder?testId=${newTest.id}`);
  };

  if (isInitialLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-center space-y-3">
        <div className="animate-spin h-7 w-7 border-2 border-indigo-600 border-t-transparent rounded-full" />
        <p className="text-sm font-medium text-slate-700">Loading Question Builder...</p>
      </div>
    );
  }

  if (!test) {
    return (
      <>
        <div className="py-16 max-w-lg mx-auto text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-[#4F46E5] flex items-center justify-center mx-auto shadow-xs">
            <Layers className="w-7 h-7" strokeWidth={1.75} />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              No Examination Found
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {testIdParam
                ? `The requested test with ID "${testIdParam}" was not found or has been removed.`
                : 'There are no active mock tests in your catalog to edit in the question builder.'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="md"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create New Exam
            </Button>
            <Link
              href="/teacher"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Dashboard</span>
            </Link>
          </div>
        </div>

        <CreateTestModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onTestCreated={handleTestCreatedFromEmptyState}
        />
      </>
    );
  }

  const activeQuestion = questions.find((q) => q.id === activeQuestionId) || questions[0];
  const activeIndex = questions.findIndex((q) => q.id === activeQuestionId);
  const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 0), 0);

  const getStatusBadge = () => {
    switch (test.status) {
      case 'published':
        return <Badge variant="success" withDot>Live & Published</Badge>;
      case 'scheduled':
        return <Badge variant="info" withDot>Scheduled</Badge>;
      case 'pending_review':
        return <Badge variant="warning" withDot>Pending Review</Badge>;
      case 'ended':
        return <Badge variant="danger" withDot>Ended</Badge>;
      case 'results_released':
        return <Badge variant="indigo" withDot>Results Released</Badge>;
      default:
        return <Badge variant="neutral" withDot>Draft</Badge>;
    }
  };

  const getBannerStatusText = () => {
    switch (test.status) {
      case 'published':
        return {
          title: 'Exam is currently Live & Published.',
          description: test.settings?.hasDeadline && test.settings?.deadlineDate
            ? `Active for candidates. Final submission cutoff: ${formatDateTime(test.settings.deadlineDate)}.`
            : 'Questions and answer keys are protected from silent edits while candidates can take the test.',
        };
      case 'scheduled':
        return {
          title: test.settings?.startDate
            ? `Exam is Scheduled for ${formatDateTime(test.settings.startDate)}.`
            : 'Exam is currently Scheduled.',
          description: test.settings?.hasDeadline && test.settings?.deadlineDate
            ? `Protected from edits. Cutoff deadline: ${formatDateTime(test.settings.deadlineDate)}.`
            : 'Questions and answer keys are protected from silent edits while candidates wait for exam launch.',
        };
      case 'ended':
        return {
          title: 'Exam has Ended.',
          description: 'Submissions are closed. Review exam configuration and answer key visibility.',
        };
      case 'results_released':
        return {
          title: 'Exam Results are Released.',
          description: 'Scores and answers are accessible to candidates according to your release scope.',
        };
      case 'pending_review':
        return {
          title: 'Exam is Pending Review.',
          description: 'Subjective question responses require manual evaluation before publishing final scorecards.',
        };
      default:
        return {
          title: 'Exam is currently in Draft.',
          description: 'Questions and exam settings can be edited freely before scheduling or publishing live.',
        };
    }
  };

  const bannerText = getBannerStatusText();

  return (
    <div className="space-y-5">
      {/* Top Breadcrumb & Controls Bar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between pb-4 border-b border-slate-200/90">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              href="/teacher"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>
            <span className="text-slate-300">•</span>
            {getStatusBadge()}
            <span className="text-xs font-medium text-slate-500 px-2 py-0.5 rounded bg-slate-100 border border-slate-200/60">
              {test.subject}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
              {test.title}
            </h1>
          </div>
        </div>

        {/* Action Controls & Mode Switch */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Mode Switcher */}
          <div className="inline-flex items-center p-1 rounded-lg bg-slate-200/70 text-xs">
            <button
              type="button"
              onClick={() => setMode('edit')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                mode === 'edit'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Question Editor</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('preview')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                mode === 'preview'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Student Preview</span>
            </button>
          </div>

          {/* Save Draft Button */}
          <Button
            variant="outline"
            size="md"
            leftIcon={<Save className="w-4 h-4" strokeWidth={1.75} />}
            onClick={handleSaveDraft}
          >
            Save Draft
          </Button>

          {/* Delete Exam Button */}
          <Button
            variant="outline"
            size="md"
            leftIcon={<Trash2 className="w-4 h-4 text-rose-500" strokeWidth={1.75} />}
            className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700 focus-visible:ring-rose-500"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete Exam
          </Button>
        </div>
      </div>

      {/* Exam Status & Configuration Banner */}
      <div className="p-3.5 rounded-xl bg-indigo-50/80 border border-indigo-200 text-xs text-indigo-950 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <Lock className="w-4 h-4 text-indigo-600 shrink-0" />
          <div>
            <p className="font-semibold text-indigo-900">
              {bannerText.title}
            </p>
            <p className="text-slate-600 mt-0.5">
              {bannerText.description}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            size="md"
            leftIcon={<Settings className="w-4 h-4" strokeWidth={1.75} />}
            onClick={() => setIsPublishModalOpen(true)}
          >
            Configure Exam Settings
          </Button>
          <Button
            variant="primary"
            size="md"
            leftIcon={<Send className="w-4 h-4" strokeWidth={1.75} />}
            onClick={() => {
              setPublishValidationErrors(validateTestForPublish(questions));
              setIsPublishConfirmOpen(true);
            }}
          >
            Publish Test
          </Button>
        </div>
      </div>

      {/* Summary KPI Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-lg bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-50 text-[#4F46E5]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-500 block">Total Questions</span>
            <span className="text-base font-semibold text-slate-900 tabular-nums">
              {questions.length}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-500 block">Total Marks</span>
            <span className="text-base font-semibold text-slate-900 tabular-nums">
              {totalMarks} pts
            </span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-500 block">Duration</span>
            <span className="text-base font-semibold text-slate-900 tabular-nums">
              {test.settings?.durationMinutes || test.durationMinutes} min
            </span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-100 text-slate-600">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-500 block">Status</span>
            <span className="text-sm font-semibold text-slate-900 capitalize">
              {test.status.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>

      {/* Main Workspace (Editor or Student Preview) */}
      {mode === 'edit' ? (
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* Left Column: Question Navigator */}
          <QuestionNavigator
            questions={questions}
            activeQuestionId={activeQuestionId}
            onSelectQuestion={(id) => setActiveQuestionId(id)}
            onAddQuestion={handleAddQuestion}
            onMoveQuestion={handleMoveQuestion}
            totalDurationMinutes={test.settings?.durationMinutes || test.durationMinutes}
            targetQuestionCount={test.targetQuestionCount}
          />

          {/* Center Column: Question Editor */}
          {activeQuestion ? (
            <QuestionEditor
              key={activeQuestion.id}
              question={activeQuestion}
              questionNumber={activeIndex >= 0 ? activeIndex + 1 : 1}
              totalQuestions={questions.length}
              onUpdateQuestion={handleUpdateQuestion}
              onDuplicateQuestion={handleDuplicateQuestion}
              onDeleteQuestion={handleDeleteQuestion}
            />
          ) : (
            <div className="flex-1 p-12 bg-white rounded-xl border border-slate-200 text-center space-y-3">
              <p className="text-sm font-medium text-slate-700">
                No question selected.
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleAddQuestion('single_choice')}
              >
                Add Your First Question
              </Button>
            </div>
          )}
        </div>
      ) : (
        /* Full width Student Preview */
        <StudentPreview
          test={test}
          questions={questions}
          onExitPreview={() => setMode('edit')}
        />
      )}

      {/* Examination Configuration & Publishing Modal */}
      <ExamPublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        test={test}
        questions={questions}
        onConfirmPublish={handleConfirmPublish}
        onSaveDraftSettings={handleSaveDraftSettings}
        onJumpToQuestion={(id) => {
          setActiveQuestionId(id);
          setMode('edit');
        }}
      />

      {/* Publish Test Confirmation Modal */}
      <Modal
        isOpen={isPublishConfirmOpen}
        onClose={() => setIsPublishConfirmOpen(false)}
        title={
          publishValidationErrors.length > 0
            ? 'Cannot Publish: Incomplete Questions'
            : test.status === 'published'
            ? 'Update Published Exam?'
            : test.settings?.scheduleType === 'scheduled' && test.settings?.startDate
            ? 'Confirm Exam Schedule?'
            : 'Publish Test Live?'
        }
        description={
          publishValidationErrors.length > 0
            ? 'Please address the following question validation errors before publishing.'
            : test.status === 'published'
            ? 'This exam is currently live. Confirming will update the live exam definitions.'
            : test.settings?.scheduleType === 'scheduled' && test.settings?.startDate
            ? 'This exam will be scheduled according to your configured timetable.'
            : 'This exam will immediately become active and accessible to enrolled candidates.'
        }
        maxWidth="md"
      >
        <div className="space-y-4">
          {publishValidationErrors.length > 0 ? (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-rose-950">
                    {publishValidationErrors.length} validation {publishValidationErrors.length === 1 ? 'issue' : 'issues'} found
                  </p>
                  <p className="text-rose-800 mt-0.5 leading-relaxed">
                    All questions require complete statements, valid answer keys, and appropriate scoring rules.
                  </p>
                </div>
              </div>

              <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                {publishValidationErrors.map((err, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-white text-xs hover:border-indigo-300 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0" />
                      <span className="text-slate-700 truncate">{err.message}</span>
                    </div>
                    {err.questionId && (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveQuestionId(err.questionId);
                          setMode('edit');
                          setIsPublishConfirmOpen(false);
                        }}
                        className="text-xs font-medium text-[#4F46E5] hover:text-[#4338CA] shrink-0 inline-flex items-center gap-1"
                      >
                        <span>Fix</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <Button variant="outline" size="sm" onClick={() => setIsPublishConfirmOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-emerald-950">
                    Validation Passed ({questions.length} questions, {totalMarks} pts)
                  </p>
                  <p className="text-emerald-800 mt-0.5 leading-relaxed">
                    All question definitions, answer keys, and scoring criteria are complete and verified.
                  </p>
                </div>
              </div>

              {/* Status & Schedule Summary Box */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Current Status:</span>
                  <span className="font-semibold text-slate-800 capitalize">
                    {test.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Target State:</span>
                  <span className="font-semibold text-indigo-700">
                    {test.settings?.scheduleType === 'scheduled' && test.settings?.startDate
                      ? 'Scheduled Exam'
                      : 'Live & Published'}
                  </span>
                </div>
                {test.settings?.scheduleType === 'scheduled' && test.settings?.startDate ? (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Scheduled Start:</span>
                    <span className="font-medium text-slate-800">
                      {formatDateTime(test.settings.startDate)}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Availability:</span>
                    <span className="font-medium text-slate-800">Immediate access upon publish</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Duration:</span>
                  <span className="font-medium text-slate-800">
                    {test.settings?.durationMinutes || test.durationMinutes} minutes
                  </span>
                </div>
                {test.settings?.hasDeadline && test.settings?.deadlineDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Cutoff Deadline:</span>
                    <span className="font-medium text-slate-800">
                      {formatDateTime(test.settings.deadlineDate)}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <Button variant="outline" size="sm" onClick={() => setIsPublishConfirmOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Send className="w-3.5 h-3.5" />}
                  onClick={handleDirectPublish}
                >
                  {test.settings?.scheduleType === 'scheduled' && test.settings?.startDate
                    ? 'Confirm & Schedule Exam'
                    : test.status === 'published'
                    ? 'Confirm & Update Live Exam'
                    : 'Confirm & Publish Live'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Delete Exam Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          if (!isDeleting) setIsDeleteModalOpen(false);
        }}
        title="Delete this exam?"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">
            Are you sure you want to delete &quot;{test.title}&quot;? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2.5 pt-2">
            <Button
              variant="outline"
              size="sm"
              disabled={isDeleting}
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              isLoading={isDeleting}
              disabled={isDeleting}
              onClick={handleDeleteExam}
            >
              Delete Exam
            </Button>
          </div>
        </div>
      </Modal>

      {/* Toast Notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg text-white text-xs font-medium shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 ${
            toast.type === 'error' ? 'bg-rose-900 border border-rose-700' : 'bg-slate-900'
          }`}
        >
          {toast.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Settings,
  Save,
  Send,
  Eye,
  Edit3,
  CheckCircle2,
  Clock,
  Award,
  Layers,
} from 'lucide-react';
import { MockTest, Question, QuestionType } from '@/types';
import {
  getStoredTestById,
  getStoredTests,
  saveStoredTest,
  createDefaultQuestion,
} from '@/lib/testStore';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { QuestionNavigator } from '@/components/builder/QuestionNavigator';
import { QuestionEditor } from '@/components/builder/QuestionEditor';
import { StudentPreview } from '@/components/builder/StudentPreview';
import { TestSettingsModal } from '@/components/builder/TestSettingsModal';
import { PublishValidationModal } from '@/components/builder/PublishValidationModal';

function QuestionBuilderContent() {
  const searchParams = useSearchParams();
  const testIdParam = searchParams.get('testId');

  const [test, setTest] = useState<MockTest | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeQuestionId, setActiveQuestionId] = useState<string>('');
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
    }
  }, [testIdParam]);

  // Show transient toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
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
    saveStoredTest({
      ...test,
      questions: updatedList,
      questionCount: updatedList.length,
    });
    showToast(`Added Question ${nextOrder} (${type.replace('_', ' ')})`);
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
    const newId = `q-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 5)}`;
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
    // Re-index orders
    const reordered = updatedList.map((q, idx) => ({ ...q, order: idx + 1 }));
    setQuestions(reordered);
    setActiveQuestionId(newId);

    saveStoredTest({
      ...test,
      questions: reordered,
      questionCount: reordered.length,
    });
    showToast(`Question duplicated as Q${targetIdx + 2}`);
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

    saveStoredTest({
      ...test,
      questions: reordered,
      questionCount: reordered.length,
    });
    showToast('Question deleted');
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

    saveStoredTest({
      ...test,
      questions: reordered,
    });
  };

  // Save Draft Action
  const handleSaveDraft = () => {
    if (!test) return;
    saveStoredTest({
      ...test,
      questions,
      questionCount: questions.length,
      totalMarks: questions.reduce((sum, q) => sum + (q.marks || 0), 0),
    });
    showToast('Draft saved successfully to local session');
  };

  // Confirm Publish Action
  const handleConfirmPublish = () => {
    if (!test) return;
    const updatedTest: MockTest = {
      ...test,
      status: 'published',
      questions,
      questionCount: questions.length,
      totalMarks: questions.reduce((sum, q) => sum + (q.marks || 0), 0),
    };
    saveStoredTest(updatedTest);
    setTest(updatedTest);
    showToast('Test published successfully! Now live for students.');
  };

  // Settings Save
  const handleSaveSettings = (fields: Partial<MockTest>) => {
    if (!test) return;
    const updatedTest: MockTest = {
      ...test,
      ...fields,
      questions,
    };
    saveStoredTest(updatedTest);
    setTest(updatedTest);
    showToast('Test settings updated');
  };

  if (!test) {
    return (
      <div className="py-16 text-center space-y-3">
        <p className="text-sm font-medium text-slate-700">Loading Question Builder...</p>
        <Link href="/teacher" className="text-xs text-indigo-600 hover:underline">
          Return to Teacher Dashboard
        </Link>
      </div>
    );
  }

  const activeQuestion = questions.find((q) => q.id === activeQuestionId) || questions[0];
  const activeIndex = questions.findIndex((q) => q.id === activeQuestionId);
  const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 0), 0);

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
            <Badge
              variant={
                test.status === 'published'
                  ? 'success'
                  : test.status === 'scheduled'
                  ? 'info'
                  : 'neutral'
              }
              withDot
            >
              {test.status}
            </Badge>
            <span className="text-xs font-medium text-slate-500 px-2 py-0.5 rounded bg-slate-100 border border-slate-200/60">
              {test.subject}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
              {test.title}
            </h1>
            <button
              type="button"
              onClick={() => setIsSettingsOpen(true)}
              className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Edit test title and settings"
              aria-label="Edit test title and settings"
            >
              <Settings className="w-4 h-4" strokeWidth={1.75} />
            </button>
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

          {/* Publish Button */}
          <Button
            variant="primary"
            size="md"
            leftIcon={<Send className="w-4 h-4" strokeWidth={1.75} />}
            onClick={() => setIsPublishModalOpen(true)}
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
              {test.durationMinutes} min
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
            totalDurationMinutes={test.durationMinutes}
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

      {/* Modals */}
      <TestSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        test={test}
        onSaveSettings={handleSaveSettings}
      />

      <PublishValidationModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        questions={questions}
        onConfirmPublish={handleConfirmPublish}
        onJumpToQuestion={(id) => {
          setActiveQuestionId(id);
          setMode('edit');
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-medium shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function QuestionBuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center text-xs text-slate-400">
          Loading Question Builder...
        </div>
      }
    >
      <QuestionBuilderContent />
    </Suspense>
  );
}

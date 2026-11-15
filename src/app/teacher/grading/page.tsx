'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  ChevronRight,
  User,
  AlertCircle,
  FileText,
  Save,
  MessageSquare,
  Sparkles,
  Info,
} from 'lucide-react';
import { StudentAttempt, SubjectiveAnswerSubmission } from '@/types';
import { getStoredAttempts, evaluateSubjectiveAnswer, subscribeToAttempts } from '@/lib/attemptsStore';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { formatDateTime } from '@/lib/formatters';

interface GradingItem {
  attemptId: string;
  studentName: string;
  studentRoll: string;
  testTitle: string;
  subject: string;
  submittedAt: string;
  question: SubjectiveAnswerSubmission;
}

export default function GradingQueuePage() {
  const [attempts, setAttempts] = useState<StudentAttempt[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'evaluated'>('pending');
  const [selectedItem, setSelectedItem] = useState<GradingItem | null>(null);
  const [awardedMarks, setAwardedMarks] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setAttempts(getStoredAttempts());
    const unsubscribe = subscribeToAttempts(() => {
      setAttempts(getStoredAttempts());
    });
    return () => unsubscribe();
  }, []);

  // Flatten all subjective questions from attempts
  const allGradingItems = useMemo(() => {
    const items: GradingItem[] = [];
    attempts.forEach((att) => {
      if (att.subjectiveAnswers && att.subjectiveAnswers.length > 0) {
        att.subjectiveAnswers.forEach((q) => {
          items.push({
            attemptId: att.id,
            studentName: att.studentName,
            studentRoll: att.studentRoll,
            testTitle: att.testTitle,
            subject: att.subject,
            submittedAt: att.submittedAt,
            question: q,
          });
        });
      }
    });
    return items;
  }, [attempts]);

  const pendingItems = allGradingItems.filter((i) => !i.question.isEvaluated);
  const evaluatedItems = allGradingItems.filter((i) => i.question.isEvaluated);
  const currentList = activeTab === 'pending' ? pendingItems : evaluatedItems;

  const handleOpenGrading = (item: GradingItem) => {
    setSelectedItem(item);
    setAwardedMarks(
      item.question.awardedMarks !== undefined ? String(item.question.awardedMarks) : ''
    );
    setFeedback(item.question.teacherFeedback || '');
    setValidationError(null);
  };

  const handleSubmitEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    const numericMarks = parseFloat(awardedMarks);
    if (isNaN(numericMarks)) {
      setValidationError('Please enter a valid numeric mark.');
      return;
    }
    if (numericMarks < 0) {
      setValidationError('Marks cannot be negative.');
      return;
    }
    if (numericMarks > selectedItem.question.maxMarks) {
      setValidationError(`Marks cannot exceed the maximum of ${selectedItem.question.maxMarks}.`);
      return;
    }

    setIsSubmitting(true);
    setValidationError(null);

    const success = evaluateSubjectiveAnswer(
      selectedItem.attemptId,
      selectedItem.question.questionId,
      numericMarks,
      feedback.trim()
    );

    if (success) {
      setToastMessage(`Evaluation recorded: ${numericMarks}/${selectedItem.question.maxMarks} marks for ${selectedItem.studentName}`);
      setSelectedItem(null);
      setTimeout(() => setToastMessage(null), 4000);
    } else {
      setValidationError('Failed to save evaluation to local storage.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link href="/teacher" className="hover:text-indigo-600 transition-colors">
              Teacher Dashboard
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-medium">Grading Queue</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
            Manual Evaluation Queue
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Review subjective essay submissions, apply scoring rubrics, and provide structured candidate feedback.
          </p>
        </div>

        {/* Prototype Transparency Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200/80 text-xs font-medium text-amber-900 self-start md:self-auto">
          <Info className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Local Evaluator State • Updates live dashboard metrics</span>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2 shadow-xs animate-in fade-in"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('pending')}
          className={`pb-3 px-3 text-sm font-semibold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'pending'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Pending Evaluation</span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-bold ${
              pendingItems.length > 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {pendingItems.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('evaluated')}
          className={`pb-3 px-3 text-sm font-semibold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'evaluated'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>Evaluated History</span>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
            {evaluatedItems.length}
          </span>
        </button>
      </div>

      {/* Submission Cards Grid */}
      <div className="grid grid-cols-1 gap-4">
        {currentList.length > 0 ? (
          currentList.map((item) => (
            <div
              key={`${item.attemptId}-${item.question.questionId}`}
              className="p-5 bg-white rounded-xl border border-slate-200/90 shadow-xs space-y-4 hover:border-slate-300 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                    {item.studentName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">{item.studentName}</h3>
                    <p className="text-xs text-slate-400">
                      Roll: {item.studentRoll} • {item.subject} • Submitted {formatDateTime(item.submittedAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                    Max Marks: {item.question.maxMarks}
                  </span>
                  {item.question.isEvaluated ? (
                    <Badge variant="success" withDot>
                      Graded ({item.question.awardedMarks}/{item.question.maxMarks})
                    </Badge>
                  ) : (
                    <Badge variant="warning" withDot>
                      Awaiting Evaluation
                    </Badge>
                  )}
                </div>
              </div>

              {/* Examination context */}
              <div className="text-xs text-slate-600">
                <span className="text-slate-400 font-medium">Test:</span>{' '}
                <strong className="text-slate-800">{item.testTitle}</strong>
              </div>

              {/* Question Statement */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
                <span className="font-semibold text-slate-700 block">Question Prompt:</span>
                <p className="text-slate-800 leading-relaxed font-medium">{item.question.questionStatement}</p>
              </div>

              {/* Student Answer Snippet */}
              <div className="p-3 bg-indigo-50/20 border border-indigo-100 rounded-lg text-xs space-y-1">
                <span className="font-semibold text-indigo-900 block">Candidate Submission:</span>
                <p className="text-slate-700 leading-relaxed italic line-clamp-3 whitespace-pre-wrap">
                  &ldquo;{item.question.studentAnswerText}&rdquo;
                </p>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-between pt-1">
                {item.question.teacherFeedback && (
                  <p className="text-xs text-slate-500 italic truncate max-w-md">
                    Feedback: {item.question.teacherFeedback}
                  </p>
                )}
                <div className="ml-auto">
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<CheckSquare className="w-4 h-4" />}
                    onClick={() => handleOpenGrading(item)}
                  >
                    {item.question.isEvaluated ? 'Review / Edit Grade' : 'Grade Submission'}
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-16 text-center bg-white rounded-xl border border-slate-200/90 p-8 space-y-3">
            <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" strokeWidth={1.75} />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              {activeTab === 'pending' ? 'All Caught Up!' : 'No Evaluated Records'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              {activeTab === 'pending'
                ? 'There are currently no pending subjective answers awaiting manual evaluation.'
                : 'Submissions you evaluate will appear here in your grading history log.'}
            </p>
            <div className="pt-2">
              <Link href="/teacher" className="text-xs text-indigo-600 hover:underline font-semibold">
                Return to Teacher Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Grading Evaluation Modal */}
      {selectedItem && (
        <Modal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={`Evaluate Response: ${selectedItem.studentName}`}
          description={`Exam: "${selectedItem.testTitle}" • Maximum Marks: ${selectedItem.question.maxMarks}`}
          maxWidth="lg"
        >
          <form onSubmit={handleSubmitEvaluation} className="space-y-4">
            {/* Question Statement */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">Question Prompt</label>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 leading-relaxed font-medium">
                {selectedItem.question.questionStatement}
              </div>
            </div>

            {/* Rubric Guidelines (if configured) */}
            {selectedItem.question.rubricGuidelines && (
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-950 space-y-1">
                <span className="font-semibold block flex items-center gap-1.5 text-amber-900">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Official Grading Rubric:
                </span>
                <p className="leading-relaxed">{selectedItem.question.rubricGuidelines}</p>
              </div>
            )}

            {/* Student Answer */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">Candidate&apos;s Submitted Answer</label>
              <div className="p-3.5 bg-indigo-50/25 border border-indigo-100 rounded-lg text-xs text-slate-800 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
                {selectedItem.question.studentAnswerText}
              </div>
            </div>

            {/* Marks Input & Validation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Marks Awarded <span className="text-rose-500">*</span>{' '}
                  <span className="text-slate-400 font-normal">(0 to {selectedItem.question.maxMarks})</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max={selectedItem.question.maxMarks}
                    required
                    value={awardedMarks}
                    onChange={(e) => {
                      setAwardedMarks(e.target.value);
                      if (validationError) setValidationError(null);
                    }}
                    placeholder={`e.g. ${selectedItem.question.maxMarks * 0.8}`}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                  <span className="absolute right-3 top-2 text-xs text-slate-400 font-medium">
                    / {selectedItem.question.maxMarks}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Candidate Status
                </label>
                <div className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
                  Candidate ID: <strong>{selectedItem.studentRoll}</strong>
                </div>
              </div>
            </div>

            {/* Teacher Feedback Textarea */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Instructor Feedback & Comments{' '}
                <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Explain the marks breakdown or provide improvement points for the student..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none"
              />
            </div>

            {/* Validation Error Banner */}
            {validationError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => setSelectedItem(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                type="submit"
                isLoading={isSubmitting}
                leftIcon={<Save className="w-3.5 h-3.5" />}
              >
                Confirm & Save Grade
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

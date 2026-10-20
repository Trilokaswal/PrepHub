'use client';

import React, { useState } from 'react';
import {
  Plus,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Hash,
  FileText,
  ListOrdered,
  CheckSquare,
  ArrowRight,
} from 'lucide-react';
import { Question, QuestionType } from '@/types';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

interface QuestionNavigatorProps {
  questions: Question[];
  activeQuestionId: string;
  onSelectQuestion: (id: string) => void;
  onAddQuestion: (type: QuestionType) => void;
  onMoveQuestion: (index: number, direction: 'up' | 'down') => void;
  totalDurationMinutes: number;
}

export const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
  questions,
  activeQuestionId,
  onSelectQuestion,
  onAddQuestion,
  onMoveQuestion,
  totalDurationMinutes,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 0), 0);

  const getTypeLabel = (type: QuestionType) => {
    switch (type) {
      case 'single_choice':
        return 'Single MCQ';
      case 'multiple_choice':
        return 'Multi-Select';
      case 'numerical':
        return 'Numerical';
      case 'subjective':
        return 'Subjective';
      default:
        return 'Question';
    }
  };

  const getTypeIcon = (type: QuestionType) => {
    switch (type) {
      case 'single_choice':
        return <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" strokeWidth={1.75} />;
      case 'multiple_choice':
        return <CheckSquare className="w-3.5 h-3.5 text-sky-600" strokeWidth={1.75} />;
      case 'numerical':
        return <Hash className="w-3.5 h-3.5 text-emerald-600" strokeWidth={1.75} />;
      case 'subjective':
        return <FileText className="w-3.5 h-3.5 text-amber-600" strokeWidth={1.75} />;
      default:
        return <HelpCircle className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.75} />;
    }
  };

  const isQuestionValid = (q: Question): boolean => {
    if (!q.statement.trim()) return false;
    if (q.marks <= 0) return false;

    if (q.type === 'single_choice') {
      const opts = q.options || [];
      if (opts.length < 2) return false;
      if (opts.some((o) => !o.text.trim())) return false;
      const correctCount = opts.filter((o) => o.isCorrect).length;
      return correctCount === 1;
    }

    if (q.type === 'multiple_choice') {
      const opts = q.options || [];
      if (opts.length < 2) return false;
      if (opts.some((o) => !o.text.trim())) return false;
      const correctCount = opts.filter((o) => o.isCorrect).length;
      return correctCount >= 1;
    }

    if (q.type === 'numerical') {
      return q.expectedNumericAnswer !== undefined && !isNaN(q.expectedNumericAnswer);
    }

    return true; // subjective is valid if statement & marks > 0
  };

  return (
    <>
      <aside
        className="w-full lg:w-72 bg-white rounded-xl border border-slate-200/90 shadow-xs flex flex-col shrink-0"
        aria-label="Question Navigator"
      >
        {/* Header */}
        <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListOrdered className="w-4 h-4 text-slate-500" strokeWidth={1.75} />
            <h2 className="text-sm font-semibold text-slate-900">
              Questions ({questions.length})
            </h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2.5 text-xs"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => setIsAddModalOpen(true)}
            title="Add a new question"
          >
            Add
          </Button>
        </div>

        {/* Questions List */}
        <div className="p-2 space-y-1.5 overflow-y-auto max-h-[60vh] lg:max-h-[calc(100vh-22rem)]">
          {questions.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400 space-y-2">
              <p>No questions added yet.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddModalOpen(true)}
              >
                Add Your First Question
              </Button>
            </div>
          ) : (
            questions.map((q, index) => {
              const isActive = q.id === activeQuestionId;
              const valid = isQuestionValid(q);

              return (
                <div
                  key={q.id}
                  onClick={() => onSelectQuestion(q.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectQuestion(q.id);
                    }
                  }}
                  className={`group flex items-center justify-between p-2.5 rounded-lg border text-left cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${
                    isActive
                      ? 'bg-indigo-50/70 border-indigo-200 text-slate-900 shadow-xs'
                      : 'bg-white border-slate-200/70 hover:bg-slate-50/80 text-slate-700'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={`Question ${index + 1}: ${getTypeLabel(q.type)}`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`h-6 w-6 rounded-md flex items-center justify-center text-xs font-semibold shrink-0 tabular-nums ${
                        isActive
                          ? 'bg-[#4F46E5] text-white'
                          : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                      }`}
                    >
                      {index + 1}
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="shrink-0">{getTypeIcon(q.type)}</span>
                        <span className="text-xs font-medium truncate">
                          {getTypeLabel(q.type)}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {q.statement ? q.statement : <em className="text-amber-600">Empty statement</em>}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    <span className="text-[11px] font-medium text-slate-500 tabular-nums">
                      +{q.marks}
                    </span>

                    {!valid ? (
                      <span
                        title="Incomplete question details"
                        className="text-amber-500"
                      >
                        <AlertCircle className="w-3.5 h-3.5" strokeWidth={1.75} />
                      </span>
                    ) : null}

                    {/* Reorder Up/Down */}
                    <div
                      className="flex flex-col ml-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => onMoveQuestion(index, 'up')}
                        className="p-0.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-20 disabled:hover:bg-transparent"
                        title="Move Question Up"
                        aria-label={`Move Question ${index + 1} Up`}
                      >
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        disabled={index === questions.length - 1}
                        onClick={() => onMoveQuestion(index, 'down')}
                        className="p-0.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-20 disabled:hover:bg-transparent"
                        title="Move Question Down"
                        aria-label={`Move Question ${index + 1} Down`}
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Add Question Button */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/60">
          <Button
            variant="secondary"
            size="sm"
            className="w-full justify-center"
            leftIcon={<Plus className="w-4 h-4" strokeWidth={1.75} />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Question
          </Button>
        </div>

        {/* Footer Info */}
        <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 rounded-b-xl">
          <span>Time: {totalDurationMinutes} min</span>
          <span>Avg: {(totalMarks / (questions.length || 1)).toFixed(1)} pts/q</span>
        </div>
      </aside>

      {/* Select Question Type Modal (Never clipped, fully scrollable) */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Question to Test"
        description="Select the question type you would like to create:"
        maxWidth="md"
      >
        <div className="space-y-2.5 py-1 max-h-[70vh] overflow-y-auto pr-1">
          {/* 1. Single-correct MCQ */}
          <button
            type="button"
            onClick={() => {
              onAddQuestion('single_choice');
              setIsAddModalOpen(false);
            }}
            className="w-full flex items-start gap-3.5 p-3.5 text-left rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
          >
            <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 shrink-0">
              <CheckCircle2 className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900 group-hover:text-indigo-700">
                  Single-correct MCQ
                </p>
                <span className="text-xs text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-medium">
                  Select <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Standard multiple choice with option radio buttons and exactly one correct answer.
              </p>
            </div>
          </button>

          {/* 2. Multiple-select MCQ */}
          <button
            type="button"
            onClick={() => {
              onAddQuestion('multiple_choice');
              setIsAddModalOpen(false);
            }}
            className="w-full flex items-start gap-3.5 p-3.5 text-left rounded-xl border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
          >
            <div className="p-2.5 rounded-lg bg-sky-50 text-sky-600 group-hover:bg-sky-100 shrink-0">
              <CheckSquare className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900 group-hover:text-sky-700">
                  Multiple-select MCQ
                </p>
                <span className="text-xs text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-medium">
                  Select <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Multiple choice with checkboxes where students must select one or more correct answers.
              </p>
            </div>
          </button>

          {/* 3. Numerical Answer */}
          <button
            type="button"
            onClick={() => {
              onAddQuestion('numerical');
              setIsAddModalOpen(false);
            }}
            className="w-full flex items-start gap-3.5 p-3.5 text-left rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
          >
            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 shrink-0">
              <Hash className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700">
                  Numerical Answer
                </p>
                <span className="text-xs text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-medium">
                  Select <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Students enter a numeric value, automatically checked with an optional tolerance range (±).
              </p>
            </div>
          </button>

          {/* 4. Subjective Long-text */}
          <button
            type="button"
            onClick={() => {
              onAddQuestion('subjective');
              setIsAddModalOpen(false);
            }}
            className="w-full flex items-start gap-3.5 p-3.5 text-left rounded-xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
          >
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-100 shrink-0">
              <FileText className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900 group-hover:text-amber-700">
                  Subjective Long-text
                </p>
                <span className="text-xs text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-medium">
                  Select <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Written essay or analytical response evaluated by the instructor with rubric guidelines.
              </p>
            </div>
          </button>
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-100 mt-2">
          <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

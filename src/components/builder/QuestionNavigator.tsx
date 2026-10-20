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
} from 'lucide-react';
import { Question, QuestionType } from '@/types';
import { Button } from '@/components/ui/Button';

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
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

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
    <aside
      className="w-full lg:w-72 bg-white rounded-xl border border-slate-200/90 shadow-xs flex flex-col overflow-hidden shrink-0"
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
        <span className="text-xs font-medium text-slate-500 tabular-nums">
          {totalMarks} total marks
        </span>
      </div>

      {/* Questions List */}
      <div className="p-2 space-y-1.5 overflow-y-auto max-h-[60vh] lg:max-h-[calc(100vh-22rem)]">
        {questions.length === 0 ? (
          <div className="p-4 text-center text-xs text-slate-400">
            No questions added yet. Click &quot;Add Question&quot; below to begin.
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

      {/* Add Question Button & Menu */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/60 relative">
        <Button
          variant="secondary"
          size="sm"
          className="w-full justify-center"
          leftIcon={<Plus className="w-4 h-4" strokeWidth={1.75} />}
          onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
          aria-expanded={isAddMenuOpen}
          aria-haspopup="menu"
        >
          Add Question
        </Button>

        {isAddMenuOpen && (
          <div
            className="absolute bottom-full left-3 right-3 mb-2 bg-white rounded-xl shadow-lg border border-slate-200 p-1.5 space-y-1 z-20"
            role="menu"
          >
            <div className="px-2 py-1 text-[11px] font-medium text-slate-400 border-b border-slate-100">
              Select Question Type
            </div>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                onAddQuestion('single_choice');
                setIsAddMenuOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-[#4F46E5] rounded-lg text-left transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" strokeWidth={1.75} />
              <div>
                <p className="leading-tight">Single-correct MCQ</p>
                <p className="text-[10px] text-slate-400 font-normal">One correct answer among options</p>
              </div>
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => {
                onAddQuestion('multiple_choice');
                setIsAddMenuOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-700 rounded-lg text-left transition-colors"
            >
              <CheckSquare className="w-4 h-4 text-sky-600 shrink-0" strokeWidth={1.75} />
              <div>
                <p className="leading-tight">Multiple-select MCQ</p>
                <p className="text-[10px] text-slate-400 font-normal">One or more correct answers</p>
              </div>
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => {
                onAddQuestion('numerical');
                setIsAddMenuOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-left transition-colors"
            >
              <Hash className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={1.75} />
              <div>
                <p className="leading-tight">Numerical Answer</p>
                <p className="text-[10px] text-slate-400 font-normal">Exact or range tolerance value</p>
              </div>
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => {
                onAddQuestion('subjective');
                setIsAddMenuOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-700 rounded-lg text-left transition-colors"
            >
              <FileText className="w-4 h-4 text-amber-600 shrink-0" strokeWidth={1.75} />
              <div>
                <p className="leading-tight">Subjective Long-text</p>
                <p className="text-[10px] text-slate-400 font-normal">Manual grading with rubric</p>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>Time: {totalDurationMinutes} min</span>
        <span>Avg: {(totalMarks / (questions.length || 1)).toFixed(1)} pts/q</span>
      </div>
    </aside>
  );
};

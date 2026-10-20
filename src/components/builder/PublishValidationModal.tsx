'use client';

import React from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Send,
  HelpCircle,
} from 'lucide-react';
import { Question } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export interface ValidationError {
  questionId: string;
  questionIndex: number;
  message: string;
}

interface PublishValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  onConfirmPublish: () => void;
  onJumpToQuestion: (id: string) => void;
}

export function validateTestForPublish(questions: Question[]): ValidationError[] {
  const errors: ValidationError[] = [];

  if (questions.length === 0) {
    errors.push({
      questionId: '',
      questionIndex: 0,
      message: 'Test must contain at least 1 question before it can be published.',
    });
    return errors;
  }

  questions.forEach((q, index) => {
    const qNum = index + 1;

    // Check statement
    if (!q.statement || !q.statement.trim()) {
      errors.push({
        questionId: q.id,
        questionIndex: index,
        message: `Question ${qNum}: Question statement is empty.`,
      });
    }

    // Check marks
    if (q.marks <= 0) {
      errors.push({
        questionId: q.id,
        questionIndex: index,
        message: `Question ${qNum}: Marks must be greater than 0.`,
      });
    }

    // Single choice MCQ
    if (q.type === 'single_choice') {
      const opts = q.options || [];
      if (opts.length < 2) {
        errors.push({
          questionId: q.id,
          questionIndex: index,
          message: `Question ${qNum} (Single MCQ): Must have at least 2 answer options.`,
        });
      }
      if (opts.some((o) => !o.text.trim())) {
        errors.push({
          questionId: q.id,
          questionIndex: index,
          message: `Question ${qNum} (Single MCQ): One or more options have empty text.`,
        });
      }
      const correctCount = opts.filter((o) => o.isCorrect).length;
      if (correctCount !== 1) {
        errors.push({
          questionId: q.id,
          questionIndex: index,
          message: `Question ${qNum} (Single MCQ): Exactly 1 correct answer option must be selected (currently ${correctCount} selected).`,
        });
      }
    }

    // Multiple choice MCQ
    if (q.type === 'multiple_choice') {
      const opts = q.options || [];
      if (opts.length < 2) {
        errors.push({
          questionId: q.id,
          questionIndex: index,
          message: `Question ${qNum} (Multi MCQ): Must have at least 2 answer options.`,
        });
      }
      if (opts.some((o) => !o.text.trim())) {
        errors.push({
          questionId: q.id,
          questionIndex: index,
          message: `Question ${qNum} (Multi MCQ): One or more options have empty text.`,
        });
      }
      const correctCount = opts.filter((o) => o.isCorrect).length;
      if (correctCount < 1) {
        errors.push({
          questionId: q.id,
          questionIndex: index,
          message: `Question ${qNum} (Multi MCQ): At least 1 correct answer option must be selected.`,
        });
      }
    }

    // Numerical
    if (q.type === 'numerical') {
      if (q.expectedNumericAnswer === undefined || isNaN(q.expectedNumericAnswer)) {
        errors.push({
          questionId: q.id,
          questionIndex: index,
          message: `Question ${qNum} (Numerical): Expected numeric answer is missing or not a valid number.`,
        });
      }
    }
  });

  return errors;
}

export const PublishValidationModal: React.FC<PublishValidationModalProps> = ({
  isOpen,
  onClose,
  questions,
  onConfirmPublish,
  onJumpToQuestion,
}) => {
  const errors = validateTestForPublish(questions);
  const isValid = errors.length === 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isValid ? 'Ready to Publish Test?' : 'Cannot Publish: Incomplete Questions'}
      description={
        isValid
          ? 'All question definitions and scoring rules have passed validation.'
          : 'Please address the following items before making this test live for students.'
      }
      maxWidth="md"
    >
      <div className="space-y-4">
        {isValid ? (
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-950">
                  Validation Successful ({questions.length} questions)
                </p>
                <p className="text-emerald-800 mt-0.5 leading-relaxed">
                  Every question includes complete statements, valid scoring criteria, and required answer definitions. Publishing will mark this test as live and accessible to students.
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1">
              <p>• Total Questions: <strong className="text-slate-800">{questions.length}</strong></p>
              <p>• Total Marks: <strong className="text-slate-800">{questions.reduce((a, b) => a + (b.marks || 0), 0)}</strong></p>
              <p>• Question Types: {Array.from(new Set(questions.map((q) => q.type))).join(', ')}</p>
            </div>

            <div className="flex justify-end gap-2.5 pt-3">
              <Button variant="outline" size="sm" onClick={onClose}>
                Back to Editor
              </Button>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Send className="w-4 h-4" />}
                onClick={() => {
                  onConfirmPublish();
                  onClose();
                }}
              >
                Confirm & Publish
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-rose-950">
                  {errors.length} validation {errors.length === 1 ? 'issue' : 'issues'} found
                </p>
                <p className="text-rose-800 mt-0.5 leading-relaxed">
                  All tests require complete question statements, at least 2 options for MCQs, and expected numerical values.
                </p>
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
              {errors.map((err, i) => (
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
                        onJumpToQuestion(err.questionId);
                        onClose();
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

            <div className="flex justify-end pt-3">
              <Button variant="outline" size="sm" onClick={onClose}>
                Close & Return to Editor
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

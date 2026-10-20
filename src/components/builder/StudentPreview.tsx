'use client';

import React, { useState } from 'react';
import {
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { Question, MockTest } from '@/types';
import { Button } from '@/components/ui/Button';

interface StudentPreviewProps {
  test: MockTest;
  questions: Question[];
  onExitPreview: () => void;
}

export const StudentPreview: React.FC<StudentPreviewProps> = ({
  test,
  questions,
  onExitPreview,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Student answers state
  // key: questionId -> value (string for single MCQ/numerical/subjective, string[] for multi MCQ)
  const [answers, setAnswers] = useState<{ [qId: string]: string | string[] }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeQuestion = questions[currentIdx];
  const totalMarks = questions.reduce((acc, q) => acc + (q.marks || 0), 0);

  // Handler for single MCQ
  const handleSelectSingle = (qId: string, optId: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: optId }));
  };

  // Handler for multiple MCQ
  const handleToggleMultiple = (qId: string, optId: string) => {
    if (isSubmitted) return;
    const current = (answers[qId] as string[]) || [];
    const updated = current.includes(optId)
      ? current.filter((id) => id !== optId)
      : [...current, optId];
    setAnswers((prev) => ({ ...prev, [qId]: updated }));
  };

  // Handler for text / numeric
  const handleTextChange = (qId: string, val: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  // Calculate score for objective questions
  const calculateResult = () => {
    let score = 0;
    let correctCount = 0;
    let wrongCount = 0;

    questions.forEach((q) => {
      const userAns = answers[q.id];
      if (!userAns) return; // unanswered

      if (q.type === 'single_choice') {
        const correctOpt = q.options?.find((o) => o.isCorrect);
        if (correctOpt && userAns === correctOpt.id) {
          score += q.marks;
          correctCount++;
        } else if (userAns) {
          score -= q.negativeMarks || 0;
          wrongCount++;
        }
      } else if (q.type === 'multiple_choice') {
        const correctIds = (q.options || []).filter((o) => o.isCorrect).map((o) => o.id);
        const userIds = (userAns as string[]) || [];
        const isMatch =
          correctIds.length === userIds.length &&
          correctIds.every((id) => userIds.includes(id));
        if (isMatch) {
          score += q.marks;
          correctCount++;
        } else if (userIds.length > 0) {
          score -= q.negativeMarks || 0;
          wrongCount++;
        }
      } else if (q.type === 'numerical') {
        const numVal = parseFloat(userAns as string);
        if (!isNaN(numVal) && q.expectedNumericAnswer !== undefined) {
          const tol = q.numericTolerance || 0;
          const min = q.expectedNumericAnswer - tol;
          const max = q.expectedNumericAnswer + tol;
          if (numVal >= min && numVal <= max) {
            score += q.marks;
            correctCount++;
          } else {
            score -= q.negativeMarks || 0;
            wrongCount++;
          }
        }
      }
      // Subjective answers are not auto-scored
    });

    return {
      score: Math.max(0, score),
      correctCount,
      wrongCount,
    };
  };

  const results = isSubmitted ? calculateResult() : null;

  return (
    <div className="flex-1 bg-white rounded-xl border border-slate-200/90 shadow-xs flex flex-col overflow-hidden">
      {/* Student Examination Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
              Student Preview Mode
            </span>
            <span className="text-xs text-slate-400">• {test.subject}</span>
          </div>
          <h2 className="text-lg font-semibold tracking-tight mt-1 text-white">
            {test.title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span className="tabular-nums font-mono">
              {test.durationMinutes}:00 min
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span className="tabular-nums font-medium">
              {totalMarks} Marks Total
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onExitPreview}
            className="bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white"
          >
            Exit Preview
          </Button>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Question Presentation Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
          {activeQuestion ? (
            <div className="space-y-6">
              {/* Question Header & Marks */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="h-7 w-7 rounded-lg bg-indigo-50 text-[#4F46E5] font-semibold text-xs flex items-center justify-center">
                    Q{currentIdx + 1}
                  </span>
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {activeQuestion.type.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                    +{activeQuestion.marks}
                  </span>
                  {activeQuestion.negativeMarks ? (
                    <span className="font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200/60">
                      -{activeQuestion.negativeMarks}
                    </span>
                  ) : null}
                </div>
              </div>

              {/* Statement */}
              <div className="text-base text-slate-900 font-normal leading-relaxed whitespace-pre-line">
                {activeQuestion.statement || <em className="text-slate-400">No question statement provided.</em>}
              </div>

              {/* Diagram / Image */}
              {activeQuestion.imageUrl && (
                <div className="p-2 rounded-lg border border-slate-200 bg-slate-50 max-w-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeQuestion.imageUrl}
                    alt={activeQuestion.imageAlt || 'Question diagram'}
                    className="max-h-60 rounded object-contain mx-auto"
                  />
                  {activeQuestion.imageAlt && (
                    <p className="text-[11px] text-slate-500 text-center mt-1">
                      {activeQuestion.imageAlt}
                    </p>
                  )}
                </div>
              )}

              {/* Question Answering Interface */}
              <div className="pt-2 space-y-3">
                {/* 1. Single Choice Radio Options */}
                {activeQuestion.type === 'single_choice' && (
                  <div className="space-y-2">
                    {(activeQuestion.options || []).map((opt, oIdx) => {
                      const letter = String.fromCharCode(65 + oIdx);
                      const isSelected = answers[activeQuestion.id] === opt.id;
                      const isCorrect = opt.isCorrect;

                      let stateStyle = 'border-slate-200 bg-white hover:bg-slate-50';
                      if (isSelected) {
                        stateStyle = 'border-indigo-600 bg-indigo-50/50 text-indigo-950 font-medium';
                      }
                      if (isSubmitted) {
                        if (isCorrect) {
                          stateStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium';
                        } else if (isSelected && !isCorrect) {
                          stateStyle = 'border-rose-400 bg-rose-50 text-rose-950';
                        }
                      }

                      return (
                        <div
                          key={opt.id}
                          onClick={() => handleSelectSingle(activeQuestion.id, opt.id)}
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${stateStyle}`}
                        >
                          <div
                            className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-indigo-600 bg-indigo-600'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                          </div>
                          <span className="text-xs font-bold text-slate-500">{letter}.</span>
                          <span className="text-sm flex-1">{opt.text}</span>

                          {isSubmitted && isCorrect && (
                            <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" /> Correct Answer
                            </span>
                          )}
                          {isSubmitted && isSelected && !isCorrect && (
                            <span className="text-xs text-rose-600 font-medium flex items-center gap-1">
                              <XCircle className="w-4 h-4" /> Selected Incorrect
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* 2. Multiple Choice Checkbox Options */}
                {activeQuestion.type === 'multiple_choice' && (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-500 italic">
                      Select all options that apply:
                    </p>
                    {(activeQuestion.options || []).map((opt, oIdx) => {
                      const letter = String.fromCharCode(65 + oIdx);
                      const selectedList = (answers[activeQuestion.id] as string[]) || [];
                      const isSelected = selectedList.includes(opt.id);
                      const isCorrect = opt.isCorrect;

                      let stateStyle = 'border-slate-200 bg-white hover:bg-slate-50';
                      if (isSelected) {
                        stateStyle = 'border-sky-600 bg-sky-50/50 text-sky-950 font-medium';
                      }
                      if (isSubmitted) {
                        if (isCorrect) {
                          stateStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium';
                        } else if (isSelected && !isCorrect) {
                          stateStyle = 'border-rose-400 bg-rose-50 text-rose-950';
                        }
                      }

                      return (
                        <div
                          key={opt.id}
                          onClick={() => handleToggleMultiple(activeQuestion.id, opt.id)}
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${stateStyle}`}
                        >
                          <div
                            className={`h-5 w-5 rounded border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-sky-600 bg-sky-600 text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                          <span className="text-xs font-bold text-slate-500">{letter}.</span>
                          <span className="text-sm flex-1">{opt.text}</span>

                          {isSubmitted && isCorrect && (
                            <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" /> Correct Answer
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* 3. Numerical Answer Input */}
                {activeQuestion.type === 'numerical' && (
                  <div className="space-y-3 max-w-sm">
                    <label
                      htmlFor={`student-ans-${activeQuestion.id}`}
                      className="block text-xs font-medium text-slate-700"
                    >
                      Enter your numerical value:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id={`student-ans-${activeQuestion.id}`}
                        type="number"
                        step="any"
                        disabled={isSubmitted}
                        value={(answers[activeQuestion.id] as string) || ''}
                        onChange={(e) => handleTextChange(activeQuestion.id, e.target.value)}
                        placeholder="e.g. 25.0"
                        className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                      {activeQuestion.unit && (
                        <span className="text-xs font-medium text-slate-600 px-2 py-1 bg-slate-100 rounded border border-slate-200">
                          {activeQuestion.unit}
                        </span>
                      )}
                    </div>

                    {isSubmitted && (
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
                        <p className="font-semibold text-slate-800">
                          Expected Value: {activeQuestion.expectedNumericAnswer}{' '}
                          {activeQuestion.numericTolerance ? `(± ${activeQuestion.numericTolerance})` : ''}{' '}
                          {activeQuestion.unit}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* 4. Subjective Long-Text Answer */}
                {activeQuestion.type === 'subjective' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <label htmlFor={`student-subj-${activeQuestion.id}`} className="font-medium">
                        Type your written response:
                      </label>
                      {activeQuestion.wordLimit && (
                        <span className="tabular-nums">
                          Word limit: {activeQuestion.wordLimit} words
                        </span>
                      )}
                    </div>
                    <textarea
                      id={`student-subj-${activeQuestion.id}`}
                      rows={5}
                      disabled={isSubmitted}
                      value={(answers[activeQuestion.id] as string) || ''}
                      onChange={(e) => handleTextChange(activeQuestion.id, e.target.value)}
                      placeholder="Type your explanation or response here..."
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 leading-relaxed font-sans"
                    />

                    {isSubmitted && (
                      <div className="p-3 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-2">
                        <div className="flex items-center gap-1.5 font-semibold">
                          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>Subjective Answer Awaiting Teacher Evaluation</span>
                        </div>
                        {activeQuestion.subjectiveGuidelines && (
                          <div>
                            <span className="font-medium text-slate-800 block">Scoring Rubric:</span>
                            <p className="text-slate-600 whitespace-pre-line mt-0.5">
                              {activeQuestion.subjectiveGuidelines}
                            </p>
                          </div>
                        )}
                        {activeQuestion.sampleAnswer && (
                          <div>
                            <span className="font-medium text-slate-800 block">Model Answer:</span>
                            <p className="text-slate-600 whitespace-pre-line mt-0.5">
                              {activeQuestion.sampleAnswer}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Post-Submission Explanation View */}
              {isSubmitted && activeQuestion.explanation && (
                <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-950 space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-indigo-900">
                    <Sparkles className="w-4 h-4 text-[#4F46E5]" />
                    <span>Solution & Explanation:</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {activeQuestion.explanation}
                  </p>
                </div>
              )}

              {/* Navigation controls between questions */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                >
                  Previous Question
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentIdx === questions.length - 1}
                  onClick={() => setCurrentIdx((i) => Math.min(questions.length - 1, i + 1))}
                >
                  Next Question
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              No questions found in this test.
            </div>
          )}
        </div>

        {/* Right: Question Palette & Score Summary */}
        <div className="w-full lg:w-72 border-t lg:border-t-0 lg:border-l border-slate-100 p-4 bg-slate-50/50 flex flex-col justify-between shrink-0">
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Question Palette
            </h3>

            {/* Grid of question numbers */}
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIdx;
                const hasAnswer =
                  answers[q.id] &&
                  (Array.isArray(answers[q.id])
                    ? (answers[q.id] as string[]).length > 0
                    : String(answers[q.id]).trim().length > 0);

                let badgeColor = 'bg-white text-slate-700 border-slate-200';
                if (hasAnswer) {
                  badgeColor = 'bg-indigo-600 text-white border-indigo-600';
                }
                if (isCurrent) {
                  badgeColor += ' ring-2 ring-indigo-400 ring-offset-1';
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-9 w-9 rounded-lg border font-semibold text-xs flex items-center justify-center transition-all ${badgeColor}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Answered progress */}
            <div className="text-xs text-slate-500 pt-2 border-t border-slate-200/80 space-y-1">
              <div className="flex justify-between">
                <span>Answered:</span>
                <span className="font-semibold text-slate-800">
                  {Object.keys(answers).filter((k) => {
                    const v = answers[k];
                    return Array.isArray(v) ? v.length > 0 : String(v).trim().length > 0;
                  }).length} / {questions.length}
                </span>
              </div>
            </div>

            {/* Result Card (When Submitted) */}
            {isSubmitted && results && (
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Test Simulation Results
                </h4>
                <div className="text-2xl font-bold text-slate-900 tabular-nums">
                  {results.score}{' '}
                  <span className="text-xs font-normal text-slate-500">/ {totalMarks} pts</span>
                </div>
                <div className="text-xs space-y-1 pt-1 border-t border-slate-100 text-slate-600">
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Correct Objective:</span>
                    <span>{results.correctCount}</span>
                  </div>
                  <div className="flex justify-between text-rose-600 font-medium">
                    <span>Incorrect Objective:</span>
                    <span>{results.wrongCount}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-200 space-y-2">
            {!isSubmitted ? (
              <Button
                variant="primary"
                size="md"
                className="w-full justify-center"
                onClick={() => setIsSubmitted(true)}
              >
                Submit & Check Answers
              </Button>
            ) : (
              <Button
                variant="outline"
                size="md"
                leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                className="w-full justify-center"
                onClick={() => {
                  setIsSubmitted(false);
                  setAnswers({});
                }}
              >
                Reset Simulation
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  AlertCircle,
  FastForward,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Question, MockTest } from '@/types';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { formatDateTime } from '@/lib/formatters';

interface StudentPreviewProps {
  test: MockTest;
  questions: Question[];
  onExitPreview: () => void;
}

export const StudentPreview: React.FC<StudentPreviewProps> = ({
  test,
  questions: rawQuestions,
  onExitPreview,
}) => {
  const settings = test.settings;
  const durationMins = settings?.durationMinutes || test.durationMinutes || 60;

  // Question & Option Shuffling (if enabled)
  const questions = useMemo(() => {
    let list = [...rawQuestions];
    if (settings?.shuffleQuestions) {
      list = [...list].sort(() => 0.5 - Math.random());
    }
    if (settings?.shuffleOptions) {
      list = list.map((q) => {
        if (q.options && q.options.length > 0) {
          return {
            ...q,
            options: [...q.options].sort(() => 0.5 - Math.random()),
          };
        }
        return q;
      });
    }
    return list;
  }, [rawQuestions, settings?.shuffleQuestions, settings?.shuffleOptions]);

  const [currentIdx, setCurrentIdx] = useState(0);

  // Student answers state
  const [answers, setAnswers] = useState<{ [qId: string]: string | string[] }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(durationMins * 60);
  const [isAutoSubmittedModal, setIsAutoSubmittedModal] = useState(false);

  const activeQuestion = questions[currentIdx];
  const totalMarks = questions.reduce((acc, q) => acc + (q.marks || 0), 0);
  const subjectiveQuestions = questions.filter((q) => q.type === 'subjective');
  const hasSubjective = subjectiveQuestions.length > 0;

  // Real-time countdown timer
  useEffect(() => {
    if (isSubmitted) return;

    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsSubmitted(true);
          setIsAutoSubmittedModal(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSubmitted]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isTimeCritical = timeLeftSeconds <= 60 && timeLeftSeconds > 0;
  const isTimeLow = timeLeftSeconds <= 300 && timeLeftSeconds > 60;

  // Fast forward helper for instructor verification
  const handleFastForwardTimer = () => {
    if (timeLeftSeconds > 45) {
      setTimeLeftSeconds(45);
    }
  };

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
      if (!userAns) return;

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
    });

    return {
      score: Math.max(0, score),
      correctCount,
      wrongCount,
    };
  };

  const results = isSubmitted ? calculateResult() : null;

  // Answer visibility permissions
  const isPracticeMode = settings?.practiceMode === true;
  const answerReleasePolicy = settings?.answerReleaseTiming || 'immediate_after_close';
  const visibilityScope = settings?.resultsVisibilityScope || 'score_answers_explanations';

  const canRevealAnswers = useMemo(() => {
    if (isPracticeMode) return true;
    if (!isSubmitted) return false;
    if (answerReleasePolicy === 'never') return false;
    if (answerReleasePolicy === 'manual') return settings?.answersReleasedManually === true;
    if (answerReleasePolicy === 'scheduled' && settings?.scheduledAnswerReleaseDate) {
      return new Date(settings.scheduledAnswerReleaseDate).getTime() <= Date.now();
    }
    return true; // immediate_after_close
  }, [isPracticeMode, isSubmitted, answerReleasePolicy, settings]);

  const canRevealExplanations = canRevealAnswers && visibilityScope === 'score_answers_explanations';

  return (
    <div className="flex-1 bg-white rounded-xl border border-slate-200/90 shadow-xs flex flex-col overflow-hidden">
      {/* Student Examination Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
              Student Examination Preview
            </span>
            <span className="text-xs text-slate-400">• {test.subject}</span>
            {settings?.isPasswordProtected && (
              <span className="inline-flex items-center gap-1 text-[11px] text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/30">
                <Lock className="w-3 h-3" /> Protected
              </span>
            )}
          </div>
          <h2 className="text-lg font-semibold tracking-tight mt-1 text-white">
            {test.title}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Active Countdown Timer */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono tabular-nums transition-colors ${
              isTimeCritical
                ? 'bg-rose-500/30 text-rose-200 border border-rose-400 animate-pulse font-bold'
                : isTimeLow
                ? 'bg-amber-500/30 text-amber-200 border border-amber-400'
                : 'bg-slate-800 text-slate-200 border border-slate-700'
            }`}
            title="Time Remaining"
          >
            <Clock className={`w-3.5 h-3.5 ${isTimeCritical ? 'text-rose-400' : 'text-indigo-400'}`} />
            <span>{formatTimer(timeLeftSeconds)}</span>
          </div>

          {/* Instructor Demo Fast-Forward Button */}
          {!isSubmitted && timeLeftSeconds > 60 && (
            <button
              type="button"
              onClick={handleFastForwardTimer}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] border border-slate-700 transition-colors"
              title="Instructor Tool: Simulate last 45 seconds to verify 1-minute warning & auto-submit"
            >
              <FastForward className="w-3 h-3 text-amber-400" />
              <span>Simulate: 45s left</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300 border border-slate-700">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span className="tabular-nums font-medium">{totalMarks} Marks</span>
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

      {/* Critical 1-Minute Warning Banner */}
      {isTimeCritical && !isSubmitted && (
        <div className="px-4 py-2.5 bg-rose-600 text-white text-xs font-medium flex items-center justify-between gap-2 shadow-sm animate-in slide-in-from-top">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-white shrink-0 animate-pulse" />
            <span>
              <strong>Final Minute Warning:</strong> Less than 60 seconds remain. Complete your answers now. When time reaches 00:00, your attempt will automatically be submitted.
            </span>
          </div>
          <span className="font-mono tabular-nums text-sm font-bold shrink-0 bg-rose-700 px-2 py-0.5 rounded">
            {timeLeftSeconds}s
          </span>
        </div>
      )}

      {/* Main Preview Workspace */}
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
                  {settings?.practiceMode && (
                    <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-medium">
                      Practice Mode
                    </span>
                  )}
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
                <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 max-w-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeQuestion.imageUrl}
                    alt={activeQuestion.imageAlt || 'Question diagram'}
                    className="max-h-60 rounded-lg object-contain mx-auto"
                  />
                  {activeQuestion.imageAlt && (
                    <p className="text-[11px] text-slate-500 text-center mt-1.5 font-medium">
                      {activeQuestion.imageAlt}
                    </p>
                  )}
                </div>
              )}

              {/* Answering Controls */}
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

                      // Only reveal correctness if authorized
                      if (canRevealAnswers) {
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

                          {canRevealAnswers && isCorrect && (
                            <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" /> Correct Answer
                            </span>
                          )}
                          {canRevealAnswers && isSelected && !isCorrect && (
                            <span className="text-xs text-rose-600 font-medium flex items-center gap-1">
                              <XCircle className="w-4 h-4" /> Incorrect
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
                      if (canRevealAnswers) {
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

                          {canRevealAnswers && isCorrect && (
                            <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" /> Correct Option
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
                        <span className="text-xs font-medium text-slate-600 px-2.5 py-1 bg-slate-100 rounded border border-slate-200">
                          {activeQuestion.unit}
                        </span>
                      )}
                    </div>

                    {canRevealAnswers && (
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
                      <div className="p-3.5 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-2">
                        <div className="flex items-center gap-1.5 font-semibold text-amber-950">
                          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>Status: Pending Teacher Evaluation</span>
                        </div>
                        <p className="text-amber-800 leading-normal">
                          Subjective answers are routed to the instructor&apos;s manual Grading Queue. Final marks will update once evaluated with rubric criteria.
                        </p>
                        {canRevealExplanations && activeQuestion.sampleAnswer && (
                          <div className="pt-2 border-t border-amber-200/60">
                            <span className="font-medium text-slate-900 block">Model Benchmark Answer:</span>
                            <p className="text-slate-700 whitespace-pre-line mt-0.5">
                              {activeQuestion.sampleAnswer}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Solution & Explanation Rationale (When Allowed) */}
              {canRevealExplanations && activeQuestion.explanation && (
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

              {/* Withheld Notice */}
              {isSubmitted && !canRevealAnswers && (
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                  <EyeOff className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>
                    Answer keys and detailed solutions are withheld for this examination as configured by the instructor.
                  </span>
                </div>
              )}

              {/* Navigation controls */}
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

            {/* Simulation Results Card */}
            {isSubmitted && results && (
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                    Attempt Summary
                  </h4>
                  {hasSubjective ? (
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-semibold">
                      Pending Evaluation
                    </span>
                  ) : (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">
                      Graded
                    </span>
                  )}
                </div>

                <div className="text-2xl font-bold text-slate-900 tabular-nums">
                  {results.score}{' '}
                  <span className="text-xs font-normal text-slate-500">
                    / {totalMarks} pts {hasSubjective ? '(Objective only)' : ''}
                  </span>
                </div>

                <div className="text-xs space-y-1 pt-1.5 border-t border-slate-100 text-slate-600">
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Objective Correct:</span>
                    <span>{results.correctCount}</span>
                  </div>
                  <div className="flex justify-between text-rose-600 font-medium">
                    <span>Objective Incorrect:</span>
                    <span>{results.wrongCount}</span>
                  </div>
                  {hasSubjective && (
                    <div className="flex justify-between text-amber-700 font-medium">
                      <span>Subjective Queue:</span>
                      <span>{subjectiveQuestions.length} questions</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Enforcement Disclaimer */}
            <div className="p-2.5 rounded-lg bg-slate-100 border border-slate-200 text-[11px] text-slate-500 leading-normal">
              Simulation environment: Timing and responses are evaluated locally in memory.
            </div>
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
                Submit Exam Attempt
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
                  setTimeLeftSeconds(durationMins * 60);
                }}
              >
                Restart Simulation
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Time Expired Modal Notice */}
      <Modal
        isOpen={isAutoSubmittedModal}
        onClose={() => setIsAutoSubmittedModal(false)}
        title="Time Limit Reached"
        description="The allocated examination duration has elapsed."
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">
            Your attempt has been finalized and automatically submitted for scoring in accordance with the exam timing policy.
          </p>
          <div className="flex justify-end pt-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsAutoSubmittedModal(false)}
            >
              View Results Summary
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

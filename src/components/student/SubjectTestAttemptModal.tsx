'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Clock,
  Layers,
  Award,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Shuffle,
  ShieldCheck,
  BookOpen,
  Filter,
  Sliders,
  HelpCircle,
  Play,
  Flame,
  X,
  Target,
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { SubjectIcon } from '@/components/courses/CourseIcon';
import { getTopicsForSubject } from '@/lib/subjectCurriculumTopics';
import { getEligibleQuestionPool, generateRandomMockTest } from '@/lib/mockTestEngine';
import { authStore } from '@/lib/authStore';
import { MockTestGenerationConfig } from '@/types';

export interface SubjectTestAttemptModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: {
    id: string;
    name: string;
    code?: string;
    description?: string;
  } | null;
  courseName?: string;
  branchName?: string;
  semesterTitle?: string;
}

export const SubjectTestAttemptModal: React.FC<SubjectTestAttemptModalProps> = ({
  isOpen,
  onClose,
  subject,
  courseName,
  branchName,
  semesterTitle,
}) => {
  const router = useRouter();

  // Test configuration state
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard' | 'Mixed'>('Mixed');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [durationMinutes, setDurationMinutes] = useState<number>(15);
  const [marksPerQuestion, setMarksPerQuestion] = useState<number>(4);
  const [negativeMarking, setNegativeMarking] = useState<boolean>(true);

  // Pool state & generating feedback
  const [availableCount, setAvailableCount] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [poolMessage, setPoolMessage] = useState<string | null>(null);
  const [poolWarning, setPoolWarning] = useState<boolean>(false);

  // Retrieve topics for this specific subject
  const availableTopics = useMemo(() => {
    if (!subject) return [];
    return getTopicsForSubject(subject.name);
  }, [subject]);

  // Reset topic to 'All' when subject changes
  useEffect(() => {
    if (isOpen) {
      setSelectedTopic('All');
      setQuestionCount(10);
      setDurationMinutes(15);
      setDifficulty('Mixed');
      setIsGenerating(false);
    }
  }, [isOpen, subject]);

  // Live pool availability check
  const updatePoolAvailability = useCallback(() => {
    if (!subject) return;

    const pool = getEligibleQuestionPool({
      subject: subject.name,
      topic: selectedTopic === 'All' ? undefined : selectedTopic,
      difficulty,
    });

    const count = pool.length;
    setAvailableCount(count);

    if (count === 0) {
      setPoolWarning(true);
      setPoolMessage(
        `No questions currently exist in the database for ${subject.name} at ${difficulty} difficulty.`
      );
    } else if (count < questionCount) {
      setPoolWarning(true);
      setPoolMessage(
        `Pool Verified: ${count} question${count !== 1 ? 's' : ''} currently available matching your settings (requested: ${questionCount}). You can generate a test with ${count} questions or adjust your settings.`
      );
    } else {
      setPoolWarning(false);
      setPoolMessage(
        `Pool Verified: ${count} questions ready in Question Bank. A unique, non-repeating sequence will be sampled for your test.`
      );
    }
  }, [subject, selectedTopic, difficulty, questionCount]);

  useEffect(() => {
    if (isOpen && subject) {
      updatePoolAvailability();
    }
  }, [isOpen, subject, updatePoolAvailability]);

  // Adjust duration on question count change
  const handleQuestionCountChange = (count: number) => {
    setQuestionCount(count);
    const suggestedDuration = Math.max(5, Math.round(count * 1.5));
    setDurationMinutes(suggestedDuration);
  };

  // Generate test and enter exam window
  const handleGenerateTest = async (forceAvailable = false) => {
    if (!subject) return;

    if (!authStore.isAuthenticated()) {
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    try {
      setIsGenerating(true);

      const config: MockTestGenerationConfig = {
        subject: subject.name,
        topic: selectedTopic === 'All' ? undefined : selectedTopic,
        difficulty,
        questionCount,
        durationMinutes,
        marksPerQuestion,
        negativeMarks: negativeMarking ? 1 : 0,
      };

      // Call mock test engine
      const result = generateRandomMockTest(config, forceAvailable);

      if (!result.success || !result.test) {
        setPoolWarning(true);
        setPoolMessage(result.message || 'Could not generate test. Please adjust settings.');
        setIsGenerating(false);
        return;
      }

      // Close modal and route to the existing PrepHub Exam Window
      onClose();
      router.push(`/test/${result.test.id}`);
    } catch (err: any) {
      setIsGenerating(false);
      setPoolWarning(true);
      setPoolMessage(err.message || 'Failed to generate mock test.');
    }
  };

  if (!subject) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Random Mock Test Generator"
      description={subject ? `Configure your test for ${subject.name}${subject.code ? ` (${subject.code})` : ''}` : undefined}
      size="2xl"
    >
      <div className="space-y-6">
        {/* Pre-selected Subject Banner — user does NOT choose subject here */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#15233E] to-[#1E2F52] text-white flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
              <SubjectIcon subjectName={subject.name} className="w-6 h-6 stroke-[1.8] text-white" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#E14D45] text-white px-2 py-0.5 rounded-sm">
                  {subject.code || 'SUBJECT'}
                </span>
                {semesterTitle && (
                  <span className="text-[10px] font-mono text-slate-300">
                    {semesterTitle}
                  </span>
                )}
                <span className="text-[10px] font-mono bg-white/10 text-slate-200 px-2 py-0.5 rounded-sm">
                  Subject Pre-Selected
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight">
                {subject.name}
              </h4>
            </div>
          </div>

          <div className="shrink-0 text-right hidden sm:block">
            <span className="text-[10px] font-mono text-slate-300 block">Status</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 justify-end">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active Question Pool
            </span>
          </div>
        </div>

        {/* Configuration Options */}
        <div className="space-y-5">
          {/* 1. Topic Selector (The core requirement: user selects topics of the subject) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                1. Select Topic / Chapter *
              </label>
              <span className="text-[11px] text-slate-400">
                {availableTopics.length} syllabus topics
              </span>
            </div>

            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E14D45]/20 focus:border-[#E14D45] transition-all cursor-pointer shadow-2xs"
            >
              <option value="All">
                🌟 All Topics (Comprehensive Full-Subject Mock Test)
              </option>
              {availableTopics.map((top) => (
                <option key={top} value={top}>
                  {top}
                </option>
              ))}
            </select>

            {/* Quick Topic Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => setSelectedTopic('All')}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  selectedTopic === 'All'
                    ? 'bg-[#15233E] text-white border-[#15233E] font-bold shadow-2xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                All Topics
              </button>
              {availableTopics.slice(0, 4).map((top) => (
                <button
                  key={top}
                  type="button"
                  onClick={() => setSelectedTopic(top)}
                  className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all cursor-pointer truncate max-w-[200px] ${
                    selectedTopic === top
                      ? 'bg-[#15233E] text-white border-[#15233E] font-bold shadow-2xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                  title={top}
                >
                  {top}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Difficulty Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
              2. Difficulty Level
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Mixed', 'Easy', 'Medium', 'Hard'] as const).map((lvl) => {
                const isSelected = difficulty === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setDifficulty(lvl)}
                    className={`py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? lvl === 'Mixed'
                          ? 'border-[#15233E] bg-[#15233E] text-white font-bold shadow-xs'
                          : lvl === 'Easy'
                          ? 'border-emerald-600 bg-emerald-600 text-white font-bold shadow-xs'
                          : lvl === 'Medium'
                          ? 'border-amber-600 bg-amber-600 text-white font-bold shadow-xs'
                          : 'border-[#E14D45] bg-[#E14D45] text-white font-bold shadow-xs'
                        : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{lvl}</div>
                    <div
                      className={`text-[10px] mt-0.5 ${
                        isSelected ? 'text-white/80' : 'text-slate-400'
                      }`}
                    >
                      {lvl === 'Mixed'
                        ? 'Balanced'
                        : lvl === 'Easy'
                        ? 'Foundational'
                        : lvl === 'Medium'
                        ? 'Exam Level'
                        : 'Advanced'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Question Count & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Number of questions */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                3. Number of Questions
              </label>
              <div className="flex gap-2">
                {[5, 10, 15, 20].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => handleQuestionCountChange(count)}
                    className={`flex-1 py-2 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                      questionCount === count
                        ? 'bg-[#15233E] border-[#15233E] text-white shadow-2xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {count} Qs
                  </button>
                ))}
              </div>
            </div>

            {/* Test duration */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                4. Test Duration
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="number"
                    min={5}
                    max={180}
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Math.max(5, parseInt(e.target.value) || 15))}
                    className="w-full px-3.5 py-2 pl-9 rounded-xl border border-slate-300 text-slate-900 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#E14D45]/20 focus:border-[#E14D45]"
                  />
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
                <span className="text-xs font-medium text-slate-500 shrink-0">Minutes</span>
              </div>
            </div>
          </div>

          {/* 4. Marking Scheme & Negative Marking */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-800 block">
                Negative Marking
              </span>
              <span className="text-[11px] text-slate-500 block">
                Deducts 1 mark for incorrect responses (+4 / -1 scheme)
              </span>
            </div>

            <button
              type="button"
              onClick={() => setNegativeMarking(!negativeMarking)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                negativeMarking ? 'bg-[#E14D45]' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  negativeMarking ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* 5. Live Pool Feedback & Warning Banner */}
          {poolMessage && (
            <div
              className={`p-3.5 rounded-2xl border text-xs leading-relaxed flex items-start gap-2.5 ${
                poolWarning
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}
            >
              {poolWarning ? (
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <span>{poolMessage}</span>
                {availableCount > 0 && availableCount < questionCount && (
                  <button
                    type="button"
                    onClick={() => handleGenerateTest(true)}
                    className="mt-2 block font-bold text-[#E14D45] hover:underline cursor-pointer"
                  >
                    Click here to generate with available {availableCount} questions &rarr;
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Buttons */}
        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isGenerating || availableCount === 0}
            onClick={() => handleGenerateTest(false)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#E14D45] hover:bg-[#CC3F37] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold tracking-tight shadow-sm active:scale-[0.98] transition-all cursor-pointer"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Assembling Questions...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Start Mock Test</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

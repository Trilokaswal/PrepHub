'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
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
  RotateCcw,
  Sliders,
  HelpCircle,
  Play,
  Flame,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { RedUnderline } from '@/components/brand/RedUnderline';
import { questionBankStore } from '@/lib/questionBankStore';
import { getEligibleQuestionPool, generateRandomMockTest } from '@/lib/mockTestEngine';
import { authStore } from '@/lib/authStore';
import { MockTestGenerationConfig } from '@/types';

export const RandomMockTestGeneratorView: React.FC = () => {
  const router = useRouter();

  // Subjects & Topics from Question Bank
  const [subjects, setSubjects] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard' | 'Mixed'>('Mixed');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [durationMinutes, setDurationMinutes] = useState<number>(15);
  const [marksPerQuestion, setMarksPerQuestion] = useState<number>(4);
  const [negativeMarking, setNegativeMarking] = useState<boolean>(true);

  // Pool availability state
  const [availableCount, setAvailableCount] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [poolMessage, setPoolMessage] = useState<string | null>(null);
  const [poolWarning, setPoolWarning] = useState<boolean>(false);

  // Initialize available subjects
  useEffect(() => {
    const avail = questionBankStore.getAvailableSubjects();
    setSubjects(avail);
    if (avail.length > 0 && !selectedSubject) {
      setSelectedSubject(avail[0]);
    }
  }, []);

  // Update topics and live pool count whenever subject/topic/difficulty changes
  const availableTopics = useMemo(() => {
    if (!selectedSubject) return [];
    return questionBankStore.getAvailableTopics(selectedSubject);
  }, [selectedSubject]);

  const updatePoolAvailability = useCallback(() => {
    if (!selectedSubject) return;

    const pool = getEligibleQuestionPool({
      subject: selectedSubject,
      topic: selectedTopic === 'All' ? undefined : selectedTopic,
      difficulty,
    });

    const count = pool.length;
    setAvailableCount(count);

    if (count === 0) {
      setPoolWarning(true);
      setPoolMessage(
        `No questions currently exist in the database for ${selectedSubject}${selectedTopic !== 'All' ? ` (${selectedTopic})` : ''} at ${difficulty} difficulty.`
      );
    } else if (count < questionCount) {
      setPoolWarning(true);
      setPoolMessage(
        `Only ${count} question${count !== 1 ? 's are' : ' is'} currently available matching your settings (requested: ${questionCount}). You can generate a test with ${count} questions or adjust your settings.`
      );
    } else {
      setPoolWarning(false);
      setPoolMessage(
        `Pool Verified: ${count} questions available. A unique, non-repeating sequence will be generated for your attempt.`
      );
    }
  }, [selectedSubject, selectedTopic, difficulty, questionCount]);

  useEffect(() => {
    updatePoolAvailability();
  }, [updatePoolAvailability]);

  // Adjust duration automatically based on question count (1.5 mins per question)
  const handleQuestionCountChange = (count: number) => {
    setQuestionCount(count);
    const suggestedDuration = Math.max(5, Math.round(count * 1.5));
    setDurationMinutes(suggestedDuration);
  };

  // Generation Handler
  const handleGenerateTest = async (forceAvailable = false) => {
    if (!authStore.isAuthenticated()) {
      router.push(`/login?redirect=${encodeURIComponent('/tests/generator')}`);
      return;
    }

    if (!selectedSubject) return;

    try {
      setIsGenerating(true);

      const config: MockTestGenerationConfig = {
        subject: selectedSubject,
        topic: selectedTopic === 'All' ? undefined : selectedTopic,
        difficulty,
        questionCount,
        durationMinutes,
        marksPerQuestion,
        negativeMarks: negativeMarking ? 1 : 0,
      };

      // Call client/server engine
      const result = generateRandomMockTest(config, forceAvailable);

      if (!result.success || !result.test) {
        setPoolWarning(true);
        setPoolMessage(result.message || 'Could not generate test. Please adjust settings.');
        setIsGenerating(false);
        return;
      }

      // Route immediately into the existing PrepHub Exam Window
      router.push(`/test/${result.test.id}`);
    } catch (err: any) {
      setIsGenerating(false);
      setPoolWarning(true);
      setPoolMessage(err.message || 'Failed to generate mock test.');
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans text-slate-900 selection:bg-[#E14D45]/15 selection:text-[#E14D45]">
      <Navbar activeTab="mock-tests" />

      <main className="flex-1 pb-16">
        {/* Breadcrumb & Intro Header */}
        <section className="pt-8 sm:pt-12 pb-10 border-b border-slate-200/60 bg-white/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <Link href="/" className="hover:text-slate-700 transition-colors">
                Home
              </Link>
              <span>&gt;</span>
              <Link href="/courses" className="hover:text-slate-700 transition-colors">
                Mock Tests
              </Link>
              <span>&gt;</span>
              <span className="text-slate-700 font-semibold">Random Test Generator</span>
            </nav>

            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-[#E14D45] uppercase">
                <span className="w-1.5 h-1.5 bg-[#E14D45] rounded-xs" />
                <span>DYNAMIC EXAM ENGINE</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Generate a Random{' '}
                <span className="relative inline-block">
                  Mock Test
                  <RedUnderline />
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl">
                Configure your subject, chapter focus, and difficulty level. Our server-side engine randomly
                samples from the verified Question Bank, shuffles options, and launches a fresh, unique assessment
                every attempt.
              </p>
            </div>
          </div>
        </section>

        {/* Generator Form Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-8">
              {/* 1. Subject Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                    1. Choose Subject *
                  </label>
                  <span className="text-xs text-slate-400 font-medium">
                    {subjects.length} Subjects in Database
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {subjects.map((subj) => {
                    const isSelected = selectedSubject === subj;
                    return (
                      <button
                        key={subj}
                        type="button"
                        onClick={() => {
                          setSelectedSubject(subj);
                          setSelectedTopic('All');
                        }}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#E14D45] bg-[#E14D45]/5 ring-1 ring-[#E14D45]/30 text-slate-900 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700 hover:bg-slate-50/50'
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-bold block truncate">{subj}</span>
                        <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                          Verified Questions
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Topic / Chapter Focus (Optional) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                  2. Chapter / Topic Focus (Optional)
                </label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full text-xs font-semibold rounded-xl border border-slate-200 px-4 py-3 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#E14D45]/30 focus:border-[#E14D45]"
                >
                  <option value="All">All Topics &bull; Comprehensive Syllabus Mix</option>
                  {availableTopics.map((top) => (
                    <option key={top} value={top}>
                      {top}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Difficulty Level */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                  3. Difficulty Level
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(
                    [
                      { id: 'Mixed', label: 'Mixed', desc: 'Balanced distribution' },
                      { id: 'Easy', label: 'Easy', desc: 'Core fundamentals' },
                      { id: 'Medium', label: 'Medium', desc: 'Standard exam level' },
                      { id: 'Hard', label: 'Hard', desc: 'Advanced problem solving' },
                    ] as const
                  ).map((diff) => {
                    const isSelected = difficulty === diff.id;
                    return (
                      <button
                        key={diff.id}
                        type="button"
                        onClick={() => setDifficulty(diff.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#15233E] bg-[#15233E] text-white shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700 hover:bg-slate-50/50'
                        }`}
                      >
                        <span className="text-xs font-bold block">{diff.label}</span>
                        <span
                          className={`text-[10px] block mt-0.5 ${
                            isSelected ? 'text-slate-300' : 'text-slate-400'
                          }`}
                        >
                          {diff.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Number of Questions & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {/* Question count */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                      4. Question Count
                    </label>
                    <span className="text-xs font-bold text-[#E14D45] font-mono">
                      {questionCount} Questions
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[5, 10, 15, 20, 25, 30].map((cnt) => (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => handleQuestionCountChange(cnt)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                          questionCount === cnt
                            ? 'bg-[#E14D45] text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {cnt} Qs
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                      5. Time Limit
                    </label>
                    <span className="text-xs font-bold text-slate-800 font-mono">
                      {durationMinutes} Minutes
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="5"
                      max="120"
                      step="5"
                      value={durationMinutes}
                      onChange={(e) => setDurationMinutes(Number(e.target.value))}
                      className="flex-1 accent-[#E14D45] cursor-pointer"
                    />
                    <span className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                      {durationMinutes}m
                    </span>
                  </div>
                </div>
              </div>

              {/* 5. Exam Marking Rules */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                <span className="text-xs font-bold text-slate-700 font-mono uppercase tracking-wider block">
                  Scoring Configuration
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Marks Per Question</span>
                      <span className="text-[11px] text-slate-500">Standard engineering marks</span>
                    </div>
                    <select
                      value={marksPerQuestion}
                      onChange={(e) => setMarksPerQuestion(Number(e.target.value))}
                      className="text-xs font-bold rounded-lg border border-slate-300 px-2.5 py-1.5 bg-white text-slate-800"
                    >
                      <option value={1}>1 Mark</option>
                      <option value={2}>2 Marks</option>
                      <option value={4}>4 Marks (Official)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Negative Marking</span>
                      <span className="text-[11px] text-slate-500">Deducts 1 mark for wrong answers</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNegativeMarking((prev) => !prev)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                        negativeMarking ? 'bg-[#E14D45]' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          negativeMarking ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Pool Status Banner */}
              {poolMessage && (
                <div
                  className={`p-4 rounded-2xl border text-xs flex items-start gap-3 ${
                    poolWarning
                      ? 'bg-amber-50 border-amber-200 text-amber-900'
                      : 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                  }`}
                >
                  {poolWarning ? (
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1 flex-1">
                    <span className="font-semibold block">{poolMessage}</span>
                    {poolWarning && availableCount > 0 && availableCount < questionCount && (
                      <button
                        type="button"
                        onClick={() => handleGenerateTest(true)}
                        className="inline-flex items-center gap-1.5 font-bold text-[#E14D45] hover:underline pt-1 cursor-pointer"
                      >
                        <span>Generate Test with {availableCount} Questions &rarr;</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Primary CTA Button */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-xs text-slate-500 block">Estimated Test Specs:</span>
                  <span className="text-xs font-mono font-bold text-slate-900">
                    {Math.min(availableCount, questionCount)} Questions &bull; {durationMinutes} Mins &bull; Total {Math.min(availableCount, questionCount) * marksPerQuestion} Marks
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleGenerateTest(false)}
                  disabled={isGenerating || availableCount === 0}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#E14D45] hover:bg-[#CC3F37] active:scale-[0.98] text-white text-sm font-bold tracking-tight shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Generating Unique Assessment...</span>
                    </>
                  ) : (
                    <>
                      <Shuffle className="w-4 h-4" />
                      <span>Generate &amp; Launch Mock Test</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

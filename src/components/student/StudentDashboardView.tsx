'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  Award,
  ArrowRight,
  FileText,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  PlayCircle,
  BarChart2,
  Search,
  Filter,
  RotateCcw,
  Sparkles,
  Layers,
  GraduationCap,
} from 'lucide-react';
import { authStore, DEMO_STUDENT } from '@/lib/authStore';
import { getStoredTests, subscribeToTestStore } from '@/lib/testStore';
import { getStoredAttempts, subscribeToAttempts } from '@/lib/attemptsStore';
import { MockTest, StudentAttempt, AuthUser, TestCategory, EngineeringYear } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export const StudentDashboardView: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => authStore.getCurrentUser());
  const [tests, setTests] = useState<MockTest[]>([]);
  const [attempts, setAttempts] = useState<StudentAttempt[]>([]);
  const [selectedAttempt, setSelectedAttempt] = useState<StudentAttempt | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTests(getStoredTests());
    setAttempts(getStoredAttempts());
    setCurrentUser(authStore.getCurrentUser());

    const unsubTests = subscribeToTestStore(() => {
      setTests(getStoredTests());
    });
    const unsubAttempts = subscribeToAttempts(() => {
      setAttempts(getStoredAttempts());
    });
    const unsubAuth = authStore.subscribe(() => {
      setCurrentUser(authStore.getCurrentUser());
    });

    return () => {
      unsubTests();
      unsubAttempts();
      unsubAuth();
    };
  }, []);

  const studentName = currentUser?.name || DEMO_STUDENT.name;
  const studentEmail = currentUser?.email?.toLowerCase() || DEMO_STUDENT.email.toLowerCase();

  // Show all developer-seeded mock tests
  const catalogTests = tests.length > 0 ? tests : getStoredTests();

  // Filter attempts belonging to this student (or demo attempts if matches name/email)
  const studentAttempts = attempts.filter((att) => {
    if (!currentUser) return true;
    return (
      att.studentEmail.toLowerCase() === studentEmail ||
      att.studentName.toLowerCase() === studentName.toLowerCase() ||
      (currentUser.universityRoll && att.studentRoll === currentUser.universityRoll) ||
      att.studentName === 'Alex Rivera' // Show demo attempt for demonstration
    );
  });

  const completedCount = studentAttempts.length;
  const gradedAttempts = studentAttempts.filter((a) => a.status === 'graded');
  const avgScore =
    gradedAttempts.length > 0
      ? (
          gradedAttempts.reduce((sum, a) => sum + a.percentage, 0) /
          gradedAttempts.length
        ).toFixed(1)
      : '0.0';

  // Multi-tier & filtering states
  const [selectedTier, setSelectedTier] = useState<'all' | 'topic' | 'subject' | 'full'>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('All Subjects');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Tier counts across entire catalog
  const topicCount = catalogTests.filter((t) => t.testCategory === 'topic').length;
  const subjectCount = catalogTests.filter(
    (t) => t.testCategory === 'subject' || (!t.testCategory && !t.subjectsIncluded)
  ).length;
  const fullCount = catalogTests.filter((t) => t.testCategory === 'full').length;

  // Year counts across entire catalog
  const year1Count = catalogTests.filter((t) => t.targetYear === '1st Year').length;
  const year2Count = catalogTests.filter((t) => t.targetYear === '2nd Year').length;
  const year3Count = catalogTests.filter((t) => t.targetYear === '3rd Year').length;
  const year4Count = catalogTests.filter((t) => t.targetYear === '4th Year').length;

  // Dynamically extract available subjects for the secondary dropdown
  const availableSubjects = useMemo(() => {
    const set = new Set<string>();
    catalogTests.forEach((t) => {
      if (t.subjectsIncluded && t.subjectsIncluded.length > 0) {
        t.subjectsIncluded.forEach((s) => set.add(s));
      } else if (t.subject) {
        set.add(t.subject);
      }
    });
    return ['All Subjects', ...Array.from(set).sort()];
  }, [catalogTests]);

  // Filtered test catalog
  const filteredCatalogTests = useMemo(() => {
    return catalogTests.filter((test) => {
      // 1. Tier Category Filter
      if (selectedTier === 'topic' && test.testCategory !== 'topic') return false;
      if (selectedTier === 'subject') {
        const isSubj = test.testCategory === 'subject' || (!test.testCategory && !test.subjectsIncluded);
        if (!isSubj) return false;
      }
      if (selectedTier === 'full' && test.testCategory !== 'full') return false;

      // 2. Engineering Year Filter
      if (selectedYear !== 'all' && test.targetYear !== selectedYear) return false;

      // 3. Subject Filter
      if (selectedSubject !== 'All Subjects') {
        const matchSubject =
          test.subject.toLowerCase() === selectedSubject.toLowerCase() ||
          test.subjectsIncluded?.some((s) => s.toLowerCase() === selectedSubject.toLowerCase());
        if (!matchSubject) return false;
      }

      // 4. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = test.title.toLowerCase().includes(q);
        const matchSubj = test.subject.toLowerCase().includes(q);
        const matchTopic = test.topicName?.toLowerCase().includes(q);
        const matchIncluded = test.subjectsIncluded?.some((s) => s.toLowerCase().includes(q));
        if (!matchTitle && !matchSubj && !matchTopic && !matchIncluded) return false;
      }

      return true;
    });
  }, [catalogTests, selectedTier, selectedYear, selectedSubject, searchQuery]);

  const hasActiveFilters =
    selectedTier !== 'all' ||
    selectedYear !== 'all' ||
    selectedSubject !== 'All Subjects' ||
    searchQuery.trim().length > 0;

  const handleResetFilters = () => {
    setSelectedTier('all');
    setSelectedYear('all');
    setSelectedSubject('All Subjects');
    setSearchQuery('');
  };

  if (!isMounted) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-20 bg-slate-200/70 rounded-2xl" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="h-28 bg-slate-200/70 rounded-xl" />
          <div className="h-28 bg-slate-200/70 rounded-xl" />
          <div className="h-28 bg-slate-200/70 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50/80 border border-indigo-200/60 text-[11px] font-mono text-indigo-700 font-semibold mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
            <span>
              {currentUser?.universityRoll ? `Roll: ${currentUser.universityRoll} • ` : ''}
              {currentUser?.course && currentUser?.branch
                ? `${currentUser.course} (${currentUser.branch})`
                : 'Student Assessment Portal'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Welcome back, {studentName.split(' ')[0]}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Take scheduled mock tests, practice under timed conditions, and inspect instant scorecards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="#mock-tests-catalog"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-[#4F46E5] active:scale-[0.99] transition-all shadow-2xs"
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>Browse Mock Tests</span>
          </Link>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <section aria-label="Student Overview Stats">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: Available Tests */}
          <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200/80 shadow-card flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                Mock Tests Catalog
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-slate-900 mt-1 tabular-nums">
                {catalogTests.length}
              </h3>
              <p className="text-[11px] font-mono text-indigo-600 font-medium mt-1">
                Active examination papers
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200/60 shadow-2xs">
              <BookOpen className="w-5 h-5" strokeWidth={1.75} />
            </div>
          </div>

          {/* Card 2: Completed Tests */}
          <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200/80 shadow-card flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                Completed Tests
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-slate-900 mt-1 tabular-nums">
                {completedCount}
              </h3>
              <p className="text-[11px] font-mono text-emerald-600 font-medium mt-1">
                Submitted attempts
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-700 flex items-center justify-center border border-emerald-500/20 shadow-2xs">
              <CheckCircle2 className="w-5 h-5" strokeWidth={1.75} />
            </div>
          </div>

          {/* Card 3: Average Performance */}
          <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200/80 shadow-card flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                Average Score
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-slate-900 mt-1 tabular-nums">
                {avgScore}%
              </h3>
              <p className="text-[11px] font-mono text-slate-500 font-medium mt-1">
                Across {gradedAttempts.length} evaluated tests
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center border border-amber-500/20 shadow-2xs">
              <Award className="w-5 h-5" strokeWidth={1.75} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: Multi-Tiered Mock Test Catalog */}
      <section id="mock-tests-catalog" className="space-y-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Mock Test Catalog
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/70">
                3-Tier System
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Practice topic-focused drills, comprehensive subject exams, or full multi-subject mock simulations.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-[11px] font-mono font-medium text-slate-500 bg-white border border-slate-200/80 px-2.5 py-1 rounded-md shadow-2xs">
              Showing <strong className="text-slate-900 font-bold">{filteredCatalogTests.length}</strong> of{' '}
              {catalogTests.length} Papers
            </span>
          </div>
        </div>

        {/* 1. Linear-Style Segmented Tier Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100/90 border border-slate-200/80 shadow-2xs">
          <button
            type="button"
            onClick={() => setSelectedTier('all')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedTier === 'all'
                ? 'bg-white text-slate-900 shadow-2xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <span>All Tests</span>
            <span
              className={`px-1.5 py-0.2 rounded-md font-mono text-[10px] ${
                selectedTier === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-200/80 text-slate-600'
              }`}
            >
              {catalogTests.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTier('topic')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedTier === 'topic'
                ? 'bg-white text-amber-900 shadow-2xs border border-amber-200/80 ring-1 ring-amber-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <span>Topic-Wise</span>
            <span
              className={`px-1.5 py-0.2 rounded-md font-mono text-[10px] ${
                selectedTier === 'topic' ? 'bg-amber-600 text-white' : 'bg-slate-200/80 text-slate-600'
              }`}
            >
              {topicCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTier('subject')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedTier === 'subject'
                ? 'bg-white text-indigo-900 shadow-2xs border border-indigo-200/80 ring-1 ring-indigo-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <span>Subject-Wise</span>
            <span
              className={`px-1.5 py-0.2 rounded-md font-mono text-[10px] ${
                selectedTier === 'subject' ? 'bg-indigo-600 text-white' : 'bg-slate-200/80 text-slate-600'
              }`}
            >
              {subjectCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTier('full')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedTier === 'full'
                ? 'bg-white text-purple-900 shadow-2xs border border-purple-200/80 ring-1 ring-purple-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <span>Full-Length Mocks</span>
            <span
              className={`px-1.5 py-0.2 rounded-md font-mono text-[10px] ${
                selectedTier === 'full' ? 'bg-purple-600 text-white' : 'bg-slate-200/80 text-slate-600'
              }`}
            >
              {fullCount}
            </span>
          </button>
        </div>

        {/* 2. Secondary Filtering Row: Engineering Year + Subject + Search */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-3 sm:p-4 shadow-card flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Engineering Year Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
              <span>Year:</span>
            </span>

            {[
              { id: 'all', label: 'All Years' },
              { id: '1st Year', label: `1st Year (${year1Count})` },
              { id: '2nd Year', label: `2nd Year (${year2Count})` },
              { id: '3rd Year', label: `3rd Year (${year3Count})` },
              { id: '4th Year', label: `4th Year (${year4Count})` },
            ].map((yr) => {
              const isActive = selectedYear === yr.id;
              return (
                <button
                  key={yr.id}
                  type="button"
                  onClick={() => setSelectedYear(yr.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600'
                  }`}
                >
                  {yr.label}
                </button>
              );
            })}
          </div>

          {/* Subject Dropdown & Keyword Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Subject Select */}
            <div className="relative min-w-[150px]">
              <select
                aria-label="Filter tests by subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-lg px-2.5 py-1.5 pr-8 transition-colors focus:outline-hidden focus:ring-1 focus:ring-indigo-500 cursor-pointer"
              >
                {availableSubjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[200px] flex-1 sm:flex-initial">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search papers or units..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs text-slate-900 placeholder:text-slate-400 bg-slate-50 border border-slate-200/80 rounded-lg pl-8 pr-2.5 py-1.5 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>

            {/* Clear Filters CTA */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100/80 border border-rose-200/60 transition-colors cursor-pointer shrink-0"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* 3. Grid of Tiered Exam Papers */}
        {filteredCatalogTests.length === 0 ? (
          <div className="p-10 text-center bg-white border border-slate-200/80 rounded-xl shadow-card space-y-3">
            <Layers className="w-8 h-8 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-800">No Mock Tests Match Your Filters</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              We couldn&apos;t find any examination papers matching your selected tier, year, or search query.
            </p>
            {hasActiveFilters && (
              <Button variant="secondary" size="sm" onClick={handleResetFilters}>
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                <span>Reset Filters</span>
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCatalogTests.map((test) => {
              const prevAttempt = studentAttempts.find((att) => att.testId === test.id);
              const isCompleted = Boolean(prevAttempt);
              const totalQ = test.questions?.length || test.questionCount || test.targetQuestionCount || 10;
              const testMarks =
                test.totalMarks ||
                (test.questions && test.questions.length > 0
                  ? test.questions.reduce((sum, q) => sum + (q.marks || 4), 0)
                  : totalQ * 4);

              const category = test.testCategory || 'subject';
              const isTopic = category === 'topic';
              const isFull = category === 'full';

              return (
                <div
                  key={test.id}
                  className="bg-white border border-slate-200/80 hover:border-indigo-400 rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all duration-150 flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    {/* Card Top Row: Category Pill + Year Pill + Difficulty */}
                    <div className="flex items-center justify-between gap-1.5 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        {/* Category Badge */}
                        {isTopic && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-700 border border-amber-500/20">
                            Topic Drill
                          </span>
                        )}
                        {isFull && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wider bg-purple-500/10 text-purple-700 border border-purple-500/20">
                            Grand Mock
                          </span>
                        )}
                        {!isTopic && !isFull && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                            Subject Paper
                          </span>
                        )}

                        {/* Year Badge */}
                        {test.targetYear && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium text-slate-600 bg-slate-100 border border-slate-200/70">
                            {test.targetYear}
                          </span>
                        )}
                      </div>

                      {/* Difficulty Badge */}
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold ${
                          test.difficulty === 'Advanced'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200/60'
                            : test.difficulty === 'Beginner'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                            : 'bg-sky-50 text-sky-700 border border-sky-200/60'
                        }`}
                      >
                        {test.difficulty || 'Intermediate'}
                      </span>
                    </div>

                    {/* Paper Title */}
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 tracking-tight group-hover:text-indigo-600 transition-colors">
                        {test.title}
                      </h3>
                      {test.instructor && (
                        <p className="text-[11px] font-mono text-slate-400 mt-1">
                          Faculty: {test.instructor}
                        </p>
                      )}
                    </div>

                    {/* Syllabus / Sub-Topic Scope Note */}
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-[11px] font-mono">
                      {isTopic && test.topicName && (
                        <div className="flex items-center gap-1.5 text-slate-600 truncate">
                          <span className="text-[10px] font-bold uppercase text-amber-700">Topic:</span>
                          <span className="truncate font-medium">{test.topicName}</span>
                        </div>
                      )}
                      {isFull && test.subjectsIncluded && (
                        <div className="flex items-center gap-1 text-slate-600 flex-wrap">
                          <span className="text-[10px] font-bold uppercase text-purple-700 mr-0.5">Syllabus:</span>
                          {test.subjectsIncluded.map((s, idx) => (
                            <span key={s} className="inline-flex items-center">
                              <span className="text-slate-800 font-semibold">{s}</span>
                              {idx < (test.subjectsIncluded?.length || 0) - 1 && (
                                <span className="text-slate-300 mx-1">&bull;</span>
                              )}
                            </span>
                          ))}
                        </div>
                      )}
                      {!isTopic && !isFull && (
                        <div className="flex items-center gap-1.5 text-slate-600 truncate">
                          <span className="text-[10px] font-bold uppercase text-indigo-700">Course:</span>
                          <span className="truncate font-medium">{test.subject} (Full Syllabus)</span>
                        </div>
                      )}
                    </div>

                    {/* 3-Column Specifications Grid */}
                    <div className="grid grid-cols-3 gap-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100 font-mono text-[11px]">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Questions</span>
                        <span className="font-bold text-slate-800 mt-0.5">{totalQ} Qs</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Duration</span>
                        <span className="font-bold text-slate-800 mt-0.5">{test.durationMinutes} Mins</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Marks</span>
                        <span className="font-bold text-slate-800 mt-0.5">{testMarks} Marks</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-2">
                    <Link
                      href={`/student/exam/${test.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900 group-hover:bg-[#4F46E5] text-white text-xs font-semibold transition-all shadow-2xs active:scale-[0.99]"
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Retake Test (Last: {prevAttempt?.percentage}%)</span>
                        </>
                      ) : (
                        <>
                          <span>Start Mock Test</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </>
                      )}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* SECTION 2: Completed Tests & Past Results */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Completed Tests &amp; Past Results
            </h2>
            <p className="text-xs text-slate-500">
              Review your submission history, scores, and evaluation feedback.
            </p>
          </div>
          <span className="text-[11px] font-mono font-medium text-slate-500 bg-white border border-slate-200/80 px-2.5 py-1 rounded-md shadow-2xs">
            {studentAttempts.length} Submissions
          </span>
        </div>

        {studentAttempts.length === 0 ? (
          <div className="p-8 text-center bg-white border border-slate-200/80 rounded-xl shadow-card space-y-2">
            <CheckCircle2 className="w-7 h-7 text-slate-300 mx-auto" />
            <h4 className="text-sm font-semibold text-slate-800">No Submissions Recorded Yet</h4>
            <p className="text-xs text-slate-500">
              Take an available test above to view your score reports and evaluation rubrics here.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200/80 rounded-xl shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-sans">
                <thead>
                  <tr className="border-b border-slate-200/80 bg-slate-50/70 text-slate-500 font-mono text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-4 font-semibold">Test Title &amp; Tier</th>
                    <th className="py-3 px-4 font-semibold">Subject</th>
                    <th className="py-3 px-4 font-semibold">Submitted Date</th>
                    <th className="py-3 px-4 font-semibold">Score</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {studentAttempts.map((attempt) => (
                    <tr key={attempt.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 max-w-xs">
                        <div className="font-bold text-slate-900 truncate tracking-tight">
                          {attempt.testTitle}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5 text-[10px] font-mono text-slate-500">
                          {attempt.testCategory && (
                            <span className="capitalize font-semibold text-indigo-600">
                              {attempt.testCategory === 'topic'
                                ? 'Topic'
                                : attempt.testCategory === 'full'
                                ? 'Full Mock'
                                : 'Subject'}
                            </span>
                          )}
                          {attempt.targetYear && (
                            <>
                              <span>&bull;</span>
                              <span>{attempt.targetYear}</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200/60">
                          {attempt.subject}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500 font-mono text-[11px] tabular-nums">
                        {new Date(attempt.submittedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 font-mono text-xs tabular-nums">
                          <span className="font-bold text-slate-900">{attempt.percentage}%</span>
                          <span className="text-slate-400 font-normal">
                            ({attempt.score}/{attempt.totalMarks})
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {attempt.status === 'graded' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Graded</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-amber-700 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                            <Clock className="w-3 h-3" />
                            <span>Pending Review</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedAttempt(attempt)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100 border border-slate-200 shadow-2xs active:scale-[0.99] transition-all cursor-pointer"
                        >
                          <span>View Report</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Score Report Modal */}
      {selectedAttempt && (
        <Modal
          isOpen={!!selectedAttempt}
          onClose={() => setSelectedAttempt(null)}
          title="Exam Performance Report"
          description={selectedAttempt.testTitle}
          maxWidth="lg"
        >
          <div className="space-y-4">
            {/* Score Summary Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Final Attained Score</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-slate-900">{selectedAttempt.percentage}%</span>
                  <span className="text-xs text-slate-500 font-medium">
                    ({selectedAttempt.score} out of {selectedAttempt.totalMarks} marks)
                  </span>
                </div>
              </div>
              <div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    selectedAttempt.status === 'graded'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {selectedAttempt.status === 'graded' ? 'Evaluation Complete' : 'Subjective Review Pending'}
                </span>
              </div>
            </div>

            {/* Subjective Submissions Review if any */}
            {selectedAttempt.subjectiveAnswers && selectedAttempt.subjectiveAnswers.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Subjective Answers & Teacher Evaluation
                </h4>
                {selectedAttempt.subjectiveAnswers.map((sub, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-slate-900">
                        Q{sub.questionOrder}. {sub.questionStatement}
                      </span>
                      <span className="font-semibold text-slate-700 shrink-0">
                        {sub.isEvaluated ? `${sub.awardedMarks}/${sub.maxMarks} Marks` : `Max: ${sub.maxMarks} Marks`}
                      </span>
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-lg text-slate-700 italic border border-slate-100 whitespace-pre-wrap">
                      &ldquo;{sub.studentAnswerText}&rdquo;
                    </div>

                    {sub.teacherFeedback && (
                      <div className="p-2.5 bg-indigo-50/50 border border-indigo-100 rounded-lg text-indigo-950 space-y-1">
                        <span className="font-semibold block text-[11px] text-[#4F46E5]">Instructor Feedback:</span>
                        <p>{sub.teacherFeedback}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setSelectedAttempt(null)}>
                Close Report
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

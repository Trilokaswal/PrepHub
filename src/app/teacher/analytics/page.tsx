'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight,
  Filter,
  FileText,
  ExternalLink,
  Info,
} from 'lucide-react';
import { MockTest, StudentAttempt } from '@/types';
import { getStoredTests, subscribeToTestStore } from '@/lib/testStore';
import { getStoredAttempts, subscribeToAttempts } from '@/lib/attemptsStore';
import { StatCard } from '@/components/dashboard/StatCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function PerformanceAnalyticsPage() {
  const [tests, setTests] = useState<MockTest[]>([]);
  const [attempts, setAttempts] = useState<StudentAttempt[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [timeRange, setTimeRange] = useState<string>('all');

  useEffect(() => {
    setTests(getStoredTests());
    setAttempts(getStoredAttempts());

    const unsubTests = subscribeToTestStore(() => setTests(getStoredTests()));
    const unsubAttempts = subscribeToAttempts(() => setAttempts(getStoredAttempts()));

    return () => {
      unsubTests();
      unsubAttempts();
    };
  }, []);

  // Available subjects
  const availableSubjects = useMemo(() => {
    const list = Array.from(new Set(tests.map((t) => t.subject)));
    return ['All', ...list];
  }, [tests]);

  // Filtered dataset
  const filteredTests = useMemo(() => {
    if (selectedSubject === 'All') return tests;
    return tests.filter((t) => t.subject === selectedSubject);
  }, [tests, selectedSubject]);

  const filteredAttempts = useMemo(() => {
    if (selectedSubject === 'All') return attempts;
    return attempts.filter((a) => a.subject === selectedSubject);
  }, [attempts, selectedSubject]);

  // Aggregate Metrics
  const totalAttemptsCount = useMemo(() => {
    const fromTests = filteredTests.reduce((sum, t) => sum + (t.totalAttempts || 0), 0);
    return Math.max(fromTests, filteredAttempts.length);
  }, [filteredTests, filteredAttempts]);

  const overallAvgScore = useMemo(() => {
    if (filteredAttempts.length === 0) {
      if (filteredTests.length === 0) return 0;
      const testsWithAvg = filteredTests.filter((t) => t.averageScore !== undefined);
      if (testsWithAvg.length === 0) return 0;
      const total = testsWithAvg.reduce((sum, t) => sum + (t.averageScore || 0), 0);
      return parseFloat((total / testsWithAvg.length).toFixed(1));
    }
    const total = filteredAttempts.reduce((sum, a) => sum + a.percentage, 0);
    return parseFloat((total / filteredAttempts.length).toFixed(1));
  }, [filteredAttempts, filteredTests]);

  const passRate = useMemo(() => {
    if (filteredAttempts.length === 0) return 78.4; // Sample benchmark
    const passed = filteredAttempts.filter((a) => a.percentage >= 60).length;
    return parseFloat(((passed / filteredAttempts.length) * 100).toFixed(1));
  }, [filteredAttempts]);

  // Score distribution bands (<40%, 40-59%, 60-79%, 80-100%)
  const scoreDistribution = useMemo(() => {
    const bands = {
      remediation: 0, // < 40%
      pass: 0,        // 40 - 59%
      proficient: 0,  // 60 - 79%
      distinction: 0, // 80 - 100%
    };

    if (filteredAttempts.length > 0) {
      filteredAttempts.forEach((a) => {
        if (a.percentage >= 80) bands.distinction++;
        else if (a.percentage >= 60) bands.proficient++;
        else if (a.percentage >= 40) bands.pass++;
        else bands.remediation++;
      });
    } else {
      bands.distinction = 35;
      bands.proficient = 45;
      bands.pass = 15;
      bands.remediation = 5;
    }

    const total = Object.values(bands).reduce((sum, v) => sum + v, 0);
    return {
      bands,
      percentages: {
        remediation: Math.round((bands.remediation / total) * 100),
        pass: Math.round((bands.pass / total) * 100),
        proficient: Math.round((bands.proficient / total) * 100),
        distinction: Math.round((bands.distinction / total) * 100),
      },
    };
  }, [filteredAttempts]);

  // Subject-wise performance summary
  const subjectPerformance = useMemo(() => {
    const map: Record<string, { count: number; totalScore: number; attempts: number }> = {};
    tests.forEach((t) => {
      if (!map[t.subject]) {
        map[t.subject] = { count: 0, totalScore: 0, attempts: 0 };
      }
      map[t.subject].count++;
      map[t.subject].totalScore += t.averageScore || 75;
      map[t.subject].attempts += t.totalAttempts || 0;
    });

    return Object.entries(map).map(([subject, data]) => ({
      subject,
      avgScore: parseFloat((data.totalScore / data.count).toFixed(1)),
      testCount: data.count,
      attempts: data.attempts,
    }));
  }, [tests]);

  return (
    <div className="space-y-6">
      {/* Top Heading & Breadcrumb */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link href="/teacher" className="hover:text-indigo-600 transition-colors">
              Teacher Dashboard
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-medium">Performance Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
            Performance & Cohort Analytics
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Evaluate cohort achievement distributions, subject proficiency trends, and individual examination metrics.
          </p>
        </div>

        {/* Prototype Transparency Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-xs font-medium text-indigo-900 self-start md:self-auto">
          <Info className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>Derived from Local Exam State & Verification Samples</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-xl border border-slate-200/90 bg-white shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="font-medium text-slate-700">Analytics Filters:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm">
          {/* Subject Filter */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            aria-label="Filter analytics by subject"
          >
            {availableSubjects.map((s) => (
              <option key={s} value={s}>
                Subject: {s}
              </option>
            ))}
          </select>

          {/* Time Range */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            aria-label="Filter analytics by time range"
          >
            <option value="all">Timeframe: All-Time History</option>
            <option value="term">Timeframe: Current Term (Fall 2026)</option>
            <option value="month">Timeframe: Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall Submissions"
          value={totalAttemptsCount}
          subtitle={`Across ${filteredTests.length} ${filteredTests.length === 1 ? 'exam' : 'exams'}`}
          icon={<Users className="w-5 h-5 text-indigo-600" />}
          iconBgColor="bg-indigo-50 border border-indigo-100"
        />
        <StatCard
          title="Cohort Average"
          value={`${overallAvgScore}%`}
          subtitle="Mean candidate percentage"
          icon={<Award className="w-5 h-5 text-emerald-600" />}
          iconBgColor="bg-emerald-50 border border-emerald-100"
        />
        <StatCard
          title="Passing Rate"
          value={`${passRate}%`}
          subtitle="Candidates scoring ≥ 60%"
          icon={<TrendingUp className="w-5 h-5 text-sky-600" />}
          iconBgColor="bg-sky-50 border border-sky-100"
        />
        <StatCard
          title="Catalog Exams"
          value={filteredTests.length}
          subtitle={`${filteredTests.filter((t) => t.status === 'published').length} active for students`}
          icon={<FileText className="w-5 h-5 text-amber-600" />}
          iconBgColor="bg-amber-50 border border-amber-100"
        />
      </div>

      {/* Two Column Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Distribution Chart */}
        <div className="p-5 bg-white rounded-xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">Score Band Distribution</h3>
              <p className="text-xs text-slate-500">Student count broken down by performance tier</p>
            </div>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
              {scoreDistribution.percentages.distinction + scoreDistribution.percentages.proficient}% Proficient+
            </span>
          </div>

          {/* SVG & HTML Bar Visualization */}
          <div className="space-y-3 pt-2">
            {/* Distinction (80-100%) */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-emerald-800 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Distinction (80%–100%)
                </span>
                <span className="text-slate-600 font-semibold">
                  {scoreDistribution.percentages.distinction}% ({scoreDistribution.bands.distinction} candidates)
                </span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${scoreDistribution.percentages.distinction}%` }}
                />
              </div>
            </div>

            {/* Proficient (60-79%) */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-indigo-800 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-indigo-500" />
                  Proficient (60%–79%)
                </span>
                <span className="text-slate-600 font-semibold">
                  {scoreDistribution.percentages.proficient}% ({scoreDistribution.bands.proficient} candidates)
                </span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${scoreDistribution.percentages.proficient}%` }}
                />
              </div>
            </div>

            {/* Passing (40-59%) */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-amber-800 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  Passing (40%–59%)
                </span>
                <span className="text-slate-600 font-semibold">
                  {scoreDistribution.percentages.pass}% ({scoreDistribution.bands.pass} candidates)
                </span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${scoreDistribution.percentages.pass}%` }}
                />
              </div>
            </div>

            {/* Remediation (<40%) */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-rose-800 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  Needs Remediation (&lt;40%)
                </span>
                <span className="text-slate-600 font-semibold">
                  {scoreDistribution.percentages.remediation}% ({scoreDistribution.bands.remediation} candidates)
                </span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full transition-all duration-500"
                  style={{ width: `${scoreDistribution.percentages.remediation}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Subject-Wise Mastery Comparison */}
        <div className="p-5 bg-white rounded-xl border border-slate-200/90 shadow-xs space-y-4">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">Subject Performance Breakdown</h3>
            <p className="text-xs text-slate-500">Average score across major departmental curricula</p>
          </div>

          <div className="space-y-3.5 pt-1">
            {subjectPerformance.slice(0, 5).map((sp) => (
              <div key={sp.subject} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-800">{sp.subject}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400">{sp.testCount} tests</span>
                    <span className="font-bold text-slate-900">{sp.avgScore}%</span>
                  </div>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      sp.avgScore >= 80
                        ? 'bg-emerald-500'
                        : sp.avgScore >= 65
                        ? 'bg-[#4F46E5]'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${Math.min(100, sp.avgScore)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Examination Performance Table */}
      <div className="p-5 bg-white rounded-xl border border-slate-200/90 shadow-xs space-y-4">
        <div>
          <h3 className="font-semibold text-slate-900 text-sm">Test-Level Examination Metrics</h3>
          <p className="text-xs text-slate-500">Itemized statistical summary for individual assessments</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold">
                <th className="py-2.5 px-3">Test Title</th>
                <th className="py-2.5 px-3">Subject</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-center">Attempts</th>
                <th className="py-2.5 px-3 text-center">Average Score</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTests.map((test) => (
                <tr key={test.id} className="hover:bg-slate-50/75 transition-colors">
                  <td className="py-3 px-3 font-medium text-slate-900 max-w-sm truncate">
                    {test.title}
                  </td>
                  <td className="py-3 px-3 text-slate-600">{test.subject}</td>
                  <td className="py-3 px-3 text-center">
                    <span className="capitalize font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {test.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-semibold text-slate-800">
                    {test.totalAttempts || 0}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="font-bold text-slate-900">
                      {test.averageScore ? `${test.averageScore.toFixed(1)}%` : 'N/A'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Link
                      href={`/teacher/builder?testId=${test.id}`}
                      className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1"
                    >
                      <span>Builder</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Award,
  ChevronRight,
  Eye,
  ArrowRight,
  Info,
  Calendar,
  AlertCircle,
  X,
  RefreshCw,
} from 'lucide-react';
import { StudentAttempt } from '@/types';
import { getStoredAttempts, subscribeToAttempts } from '@/lib/attemptsStore';
import { StatCard } from '@/components/dashboard/StatCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { formatDateTime } from '@/lib/formatters';

export default function StudentAttemptsPage() {
  const [attempts, setAttempts] = useState<StudentAttempt[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'graded' | 'pending_evaluation'>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'score_high' | 'score_low' | 'name'>('latest');
  const [selectedAttempt, setSelectedAttempt] = useState<StudentAttempt | null>(null);

  useEffect(() => {
    setAttempts(getStoredAttempts());
    const unsubscribe = subscribeToAttempts(() => {
      setAttempts(getStoredAttempts());
    });
    return () => unsubscribe();
  }, []);

  // Subject options derived from attempts
  const subjectList = useMemo(() => {
    const subs = Array.from(new Set(attempts.map((a) => a.subject)));
    return ['All', ...subs];
  }, [attempts]);

  // Filtered & sorted attempts
  const filteredAttempts = useMemo(() => {
    let result = attempts.filter((att) => {
      const matchesSearch =
        att.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        att.studentRoll.toLowerCase().includes(searchQuery.toLowerCase()) ||
        att.testTitle.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSubject = selectedSubject === 'All' || att.subject === selectedSubject;
      const matchesStatus = selectedStatus === 'all' || att.status === selectedStatus;

      return matchesSearch && matchesSubject && matchesStatus;
    });

    result.sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      }
      if (sortBy === 'score_high') {
        return b.percentage - a.percentage;
      }
      if (sortBy === 'score_low') {
        return a.percentage - b.percentage;
      }
      if (sortBy === 'name') {
        return a.studentName.localeCompare(b.studentName);
      }
      return 0;
    });

    return result;
  }, [attempts, searchQuery, selectedSubject, selectedStatus, sortBy]);

  // Aggregate stats
  const totalCount = attempts.length;
  const gradedCount = attempts.filter((a) => a.status === 'graded').length;
  const pendingCount = attempts.filter((a) => a.status === 'pending_evaluation').length;
  const avgScore = totalCount > 0
    ? (attempts.reduce((sum, a) => sum + a.percentage, 0) / totalCount).toFixed(1)
    : '0';

  const getPercentageColor = (pct: number) => {
    if (pct >= 80) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (pct >= 60) return 'text-indigo-700 bg-indigo-50 border-indigo-200';
    if (pct >= 40) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-rose-700 bg-rose-50 border-rose-200';
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Heading */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link href="/teacher" className="hover:text-indigo-600 transition-colors">
              Teacher Dashboard
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-medium">Student Attempts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
            Student Examination Attempts
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Monitor submitted candidate attempts, review score breakdowns, and track grading completion.
          </p>
        </div>

        {/* Prototype Transparency Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200/80 text-xs font-medium text-amber-900 self-start md:self-auto">
          <Info className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Demonstration Data • Student Examination API integration pending</span>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Submissions"
          value={totalCount}
          subtitle={`${totalCount} verified student records`}
          icon={<Users className="w-5 h-5 text-indigo-600" />}
          iconBgColor="bg-indigo-50 border border-indigo-100"
        />
        <StatCard
          title="Evaluated & Graded"
          value={gradedCount}
          subtitle={`${gradedCount} results released`}
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          iconBgColor="bg-emerald-50 border border-emerald-100"
        />
        <StatCard
          title="Pending Evaluation"
          value={pendingCount}
          subtitle={`${pendingCount} subjective responses`}
          icon={<Clock className="w-5 h-5 text-amber-600" />}
          iconBgColor="bg-amber-50 border border-amber-100"
        />
        <StatCard
          title="Average Score"
          value={`${avgScore}%`}
          subtitle="Cohort average performance"
          icon={<Award className="w-5 h-5 text-sky-600" />}
          iconBgColor="bg-sky-50 border border-sky-100"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl border border-slate-200/90 bg-white shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name, roll number, or exam title..."
              className="w-full pl-9 pr-8 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm">
            {/* Subject Filter */}
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              aria-label="Filter by subject"
            >
              {subjectList.map((s) => (
                <option key={s} value={s}>
                  Subject: {s}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              aria-label="Filter by status"
            >
              <option value="all">Status: All</option>
              <option value="graded">Status: Graded</option>
              <option value="pending_evaluation">Status: Pending Review</option>
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              aria-label="Sort by"
            >
              <option value="latest">Sort: Latest Submission</option>
              <option value="score_high">Sort: Score (Highest First)</option>
              <option value="score_low">Sort: Score (Lowest First)</option>
              <option value="name">Sort: Student Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Active Filter Clear indicator */}
        {(searchQuery || selectedSubject !== 'All' || selectedStatus !== 'all') && (
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
            <span>Showing {filteredAttempts.length} of {attempts.length} student attempts</span>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedSubject('All');
                setSelectedStatus('all');
              }}
              className="text-[#4F46E5] hover:underline font-medium flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-medium text-slate-500">
                <th className="py-3 px-4 sm:px-6">Candidate</th>
                <th className="py-3 px-4">Examination</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Submitted At</th>
                <th className="py-3 px-4 text-center">Score</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 sm:px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredAttempts.length > 0 ? (
                filteredAttempts.map((att) => (
                  <tr key={att.id} className="hover:bg-slate-50/75 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="font-medium text-slate-900">{att.studentName}</div>
                      <div className="text-xs text-slate-400">Roll: {att.studentRoll}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800 max-w-xs truncate" title={att.testTitle}>
                        {att.testTitle}
                      </div>
                      <div className="text-xs text-slate-400">ID: {att.testId}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/70">
                        {att.subject}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">
                      {formatDateTime(att.submittedAt)}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${getPercentageColor(
                          att.percentage
                        )}`}
                      >
                        {att.score}/{att.totalMarks} ({att.percentage}%)
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {att.status === 'graded' ? (
                        <Badge variant="success" withDot>
                          Graded
                        </Badge>
                      ) : (
                        <Badge variant="warning" withDot>
                          Needs Review
                        </Badge>
                      )}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Eye className="w-3.5 h-3.5 text-indigo-600" />}
                        onClick={() => setSelectedAttempt(att)}
                      >
                        Inspect
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 text-sm">
                    No student attempts match your selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-3">
        {filteredAttempts.length > 0 ? (
          filteredAttempts.map((att) => (
            <div
              key={att.id}
              className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">{att.studentName}</h3>
                  <p className="text-xs text-slate-400">Roll: {att.studentRoll}</p>
                </div>
                {att.status === 'graded' ? (
                  <Badge variant="success" withDot>
                    Graded
                  </Badge>
                ) : (
                  <Badge variant="warning" withDot>
                    Needs Review
                  </Badge>
                )}
              </div>

              <div className="text-xs text-slate-600 border-t border-slate-100 pt-2 space-y-1">
                <div>
                  <span className="text-slate-400 font-medium mr-1.5">Exam:</span>
                  <span className="font-medium text-slate-800">{att.testTitle}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>
                    <span className="text-slate-400 font-medium mr-1.5">Score:</span>
                    <strong className="text-slate-800">{att.score}/{att.totalMarks} ({att.percentage}%)</strong>
                  </span>
                  <span className="text-slate-400">{formatDateTime(att.submittedAt)}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Eye className="w-3.5 h-3.5 text-indigo-600" />}
                  onClick={() => setSelectedAttempt(att)}
                >
                  Inspect Attempt
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 bg-white rounded-xl border border-slate-200 text-center text-slate-400 text-sm">
            No student attempts found.
          </div>
        )}
      </div>

      {/* Inspect Attempt Modal */}
      {selectedAttempt && (
        <Modal
          isOpen={!!selectedAttempt}
          onClose={() => setSelectedAttempt(null)}
          title={`Attempt Review: ${selectedAttempt.studentName}`}
          description={`Submitted for "${selectedAttempt.testTitle}" on ${formatDateTime(selectedAttempt.submittedAt)}`}
          maxWidth="lg"
        >
          <div className="space-y-4">
            {/* Candidate & Score Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <span className="text-slate-400 block mb-0.5">Student Roll</span>
                <span className="font-semibold text-slate-800">{selectedAttempt.studentRoll}</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <span className="text-slate-400 block mb-0.5">Subject</span>
                <span className="font-semibold text-slate-800">{selectedAttempt.subject}</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <span className="text-slate-400 block mb-0.5">Score Awarded</span>
                <span className="font-semibold text-slate-800">{selectedAttempt.score} / {selectedAttempt.totalMarks}</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <span className="text-slate-400 block mb-0.5">Percentage</span>
                <span className="font-semibold text-slate-800">{selectedAttempt.percentage}%</span>
              </div>
            </div>

            {/* Subjective Submissions / Evaluation info */}
            {selectedAttempt.subjectiveAnswers && selectedAttempt.subjectiveAnswers.length > 0 ? (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Subjective / Essay Responses
                </h4>
                {selectedAttempt.subjectiveAnswers.map((sub, idx) => (
                  <div
                    key={sub.questionId}
                    className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-900">
                        Question #{idx + 1} ({sub.maxMarks} Marks)
                      </span>
                      {sub.isEvaluated ? (
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-200">
                          Marks: {sub.awardedMarks} / {sub.maxMarks}
                        </span>
                      ) : (
                        <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full font-medium border border-amber-200">
                          Awaiting Evaluation
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-700 font-medium bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      {sub.questionStatement}
                    </p>

                    <div>
                      <span className="text-[11px] font-medium text-slate-400 block mb-1">
                        Candidate Answer:
                      </span>
                      <p className="text-xs text-slate-800 bg-indigo-50/20 p-2.5 rounded-lg border border-indigo-100 leading-relaxed whitespace-pre-wrap">
                        {sub.studentAnswerText}
                      </p>
                    </div>

                    {sub.teacherFeedback && (
                      <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        <strong className="text-slate-700">Evaluator Feedback:</strong> {sub.teacherFeedback}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-200">
                All questions in this test were objective (Multiple Choice / Numerical) and were automatically evaluated by the PrepHub grading engine.
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              {selectedAttempt.status === 'pending_evaluation' ? (
                <Link
                  href="/teacher/grading"
                  className="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  <span>Open in Grading Queue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <div />
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedAttempt(null)}
              >
                Close Review
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

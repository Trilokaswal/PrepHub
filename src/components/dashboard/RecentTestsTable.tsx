'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Clock,
  Eye,
  Edit2,
  Trash2,
  AlertCircle,
  RefreshCw,
  Share2,
  Check,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { MockTest, TestStatus } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { subjectOptions } from '@/data/mockData';
import { formatDate, formatDateTime, formatNumber } from '@/lib/formatters';
import { saveStoredTest } from '@/lib/testStore';

interface RecentTestsTableProps {
  tests: MockTest[];
  onDeleteTest?: (id: string) => void;
  onShowNotice?: (title: string, message: string) => void;
}

export const RecentTestsTable: React.FC<RecentTestsTableProps> = ({
  tests,
  onDeleteTest,
  onShowNotice,
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('All Subjects');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'attempts' | 'title'>('newest');

  // Test inspection modal
  const [selectedTest, setSelectedTest] = useState<MockTest | null>(null);
  const [testToDelete, setTestToDelete] = useState<MockTest | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Status mapping to Badge variants and labels
  const getStatusBadge = (status: TestStatus) => {
    switch (status) {
      case 'published':
        return (
          <Badge variant="success" withDot>
            Published
          </Badge>
        );
      case 'scheduled':
        return (
          <Badge variant="info" withDot>
            Scheduled
          </Badge>
        );
      case 'pending_review':
        return (
          <Badge variant="warning" withDot>
            Pending Review
          </Badge>
        );
      case 'ended':
        return (
          <Badge variant="danger" withDot>
            Ended
          </Badge>
        );
      case 'results_released':
        return (
          <Badge variant="indigo" withDot>
            Results Released
          </Badge>
        );
      case 'draft':
        return (
          <Badge variant="neutral" withDot>
            Draft
          </Badge>
        );
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  // Filter & Search Logic
  const filteredTests = useMemo(() => {
    return tests
      .filter((test) => {
        const matchesSearch =
          test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          test.subject.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
          selectedStatus === 'all' ? true : test.status === selectedStatus;

        const matchesSubject =
          selectedSubject === 'All Subjects'
            ? true
            : test.subject === selectedSubject;

        return matchesSearch && matchesStatus && matchesSubject;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === 'oldest') {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        if (sortBy === 'attempts') {
          return b.totalAttempts - a.totalAttempts;
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [tests, searchQuery, selectedStatus, selectedSubject, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedStatus('all');
    setSelectedSubject('All Subjects');
  };

  const handleEditClick = (test: MockTest) => {
    router.push(`/teacher/builder?testId=${test.id}`);
  };

  const confirmDelete = () => {
    if (testToDelete && onDeleteTest) {
      onDeleteTest(testToDelete.id);
      setTestToDelete(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls: Search bar + Status filters + Subject selector */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" strokeWidth={1.75} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by test title or subject..."
            className="w-full pl-10 pr-12 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-shadow"
            aria-label="Search tests"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 hover:text-slate-700 p-1 rounded"
              aria-label="Clear search query"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Subject Filter */}
          <div className="flex items-center">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="text-xs sm:text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              aria-label="Filter by subject"
            >
              {subjectOptions.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs sm:text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              aria-label="Filter by status"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
              <option value="pending_review">Pending Review</option>
              <option value="ended">Ended</option>
              <option value="results_released">Results Released</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {/* Sort Control */}
          <div className="flex items-center">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as 'newest' | 'oldest' | 'attempts' | 'title')
              }
              className="text-xs sm:text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              aria-label="Sort tests by"
            >
              <option value="newest">Sort: Newest</option>
              <option value="oldest">Sort: Oldest</option>
              <option value="attempts">Sort: Most Attempts</option>
              <option value="title">Sort: Title (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count & Active Filter Tags */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong className="text-slate-800">{filteredTests.length}</strong> of{' '}
          <strong className="text-slate-800">{tests.length}</strong> tests
        </span>
        {(searchQuery || selectedStatus !== 'all' || selectedSubject !== 'All Subjects') && (
          <button
            onClick={handleClearFilters}
            className="text-[#4F46E5] hover:text-[#4338CA] font-medium flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            Reset all filters
          </button>
        )}
      </div>

      {/* Desktop / Tablet Table View */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-medium text-slate-500">
                <th scope="col" className="py-3 px-4 sm:px-6">
                  Test Details
                </th>
                <th scope="col" className="py-3 px-4">
                  Subject
                </th>
                <th scope="col" className="py-3 px-4 text-center">
                  Questions
                </th>
                <th scope="col" className="py-3 px-4 text-center">
                  Duration
                </th>
                <th scope="col" className="py-3 px-4">
                  Status
                </th>
                <th scope="col" className="py-3 px-4 text-center">
                  Attempts
                </th>
                <th scope="col" className="py-3 px-4 sm:px-6 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredTests.length > 0 ? (
                filteredTests.map((test) => (
                  <tr
                    key={test.id}
                    className="hover:bg-slate-50/75 transition-colors group"
                  >
                    {/* Test Title & ID */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="font-medium text-slate-900 group-hover:text-[#4F46E5] transition-colors">
                        {test.title}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                        <span>ID: {test.id}</span>
                        {test.scheduledDate && (
                          <span className="text-sky-700 font-medium">
                            • Starts {formatDate(test.scheduledDate)}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Subject */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/60">
                        {test.subject}
                      </span>
                    </td>

                    {/* Question Count */}
                    <td className="py-3.5 px-4 text-center text-slate-700 tabular-nums">
                      {test.questionCount}
                    </td>

                    {/* Duration */}
                    <td className="py-3.5 px-4 text-center text-slate-700">
                      <span className="inline-flex items-center gap-1 text-xs text-slate-600 tabular-nums">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={1.75} />
                        {test.durationMinutes} min
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getStatusBadge(test.status)}
                    </td>

                    {/* Attempts & Avg */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="font-medium text-slate-800 tabular-nums">
                        {formatNumber(test.totalAttempts)}
                      </div>
                      {test.averageScore !== undefined && (
                        <div className="text-xs text-slate-500 tabular-nums">
                          avg {test.averageScore}%
                        </div>
                      )}
                    </td>

                    {/* Action buttons */}
                    <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedTest(test)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#4F46E5] hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 transition-colors"
                          title="View test details"
                          aria-label={`View details for ${test.title}`}
                        >
                          <Eye className="w-4 h-4" strokeWidth={1.75} />
                        </button>
                        <button
                          onClick={() => handleEditClick(test)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 transition-colors"
                          title="Edit test (demo)"
                          aria-label={`Edit ${test.title}`}
                        >
                          <Edit2 className="w-4 h-4" strokeWidth={1.75} />
                        </button>
                        {onDeleteTest && (
                          <button
                            onClick={() => setTestToDelete(test)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 transition-colors"
                            title="Remove test"
                            aria-label={`Delete ${test.title}`}
                          >
                            <Trash2 className="w-4 h-4" strokeWidth={1.75} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="p-2.5 bg-slate-100 rounded-lg text-slate-400">
                        <Search className="w-5 h-5" strokeWidth={1.75} />
                      </div>
                      <p className="text-sm font-medium text-slate-800">
                        No tests match your filter criteria
                      </p>
                      <p className="text-xs text-slate-500 max-w-sm">
                        Try clearing your search query or changing the status and subject filters.
                      </p>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleClearFilters}
                        className="mt-2"
                      >
                        Reset filters
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card List View (Responsive alternative to wide table) */}
      <div className="md:hidden space-y-3">
        {filteredTests.length > 0 ? (
          filteredTests.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h4 className="font-medium text-slate-900 text-sm leading-snug">
                    {test.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">ID: {test.id}</p>
                </div>
                {getStatusBadge(test.status)}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100 text-slate-600">
                <div>
                  <span className="text-slate-400 block text-xs">
                    Subject
                  </span>
                  <span className="font-medium text-slate-800">{test.subject}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">
                    Duration
                  </span>
                  <span className="font-medium text-slate-800 tabular-nums">
                    {test.durationMinutes} min ({test.questionCount} Qs)
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">
                    Attempts
                  </span>
                  <span className="font-medium text-slate-800 tabular-nums">
                    {formatNumber(test.totalAttempts)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">
                    Avg Score
                  </span>
                  <span className="font-medium text-slate-800 tabular-nums">
                    {test.averageScore !== undefined ? `${test.averageScore}%` : 'N/A'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Eye className="w-3.5 h-3.5" strokeWidth={1.75} />}
                  onClick={() => setSelectedTest(test)}
                >
                  View Details
                </Button>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEditClick(test)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                    aria-label={`Edit ${test.title}`}
                    title="Edit test"
                  >
                    <Edit2 className="w-4 h-4" strokeWidth={1.75} />
                  </button>
                  {onDeleteTest && (
                    <button
                      onClick={() => setTestToDelete(test)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                      aria-label={`Delete ${test.title}`}
                      title="Delete test"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={1.75} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl border border-slate-200/90 p-8 text-center space-y-3">
            <Search className="w-6 h-6 text-slate-400 mx-auto" strokeWidth={1.5} />
            <p className="text-sm font-medium text-slate-800">
              No matching tests found
            </p>
            <Button variant="secondary" size="sm" onClick={handleClearFilters}>
              Reset filters
            </Button>
          </div>
        )}
      </div>

      {/* Test Detail View Modal */}
      <Modal
        isOpen={!!selectedTest}
        onClose={() => setSelectedTest(null)}
        title={selectedTest?.title || 'Test Details'}
        description={`Subject: ${selectedTest?.subject || ''}`}
        maxWidth="lg"
      >
        {selectedTest && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-xs font-medium text-slate-500">
                Current Status
              </span>
              <div className="flex items-center gap-2">
                {getStatusBadge(selectedTest.status)}
              </div>
            </div>

            {/* Core Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <div className="p-3 rounded-lg border border-slate-100 bg-white">
                <span className="text-xs text-slate-400 block">Total Questions</span>
                <span className="text-base font-semibold text-slate-800 tabular-nums">
                  {selectedTest.questionCount}
                </span>
              </div>
              <div className="p-3 rounded-lg border border-slate-100 bg-white">
                <span className="text-xs text-slate-400 block">Time Limit</span>
                <span className="text-base font-semibold text-slate-800 tabular-nums">
                  {selectedTest.durationMinutes} min
                </span>
              </div>
              <div className="p-3 rounded-lg border border-slate-100 bg-white">
                <span className="text-xs text-slate-400 block">Student Attempts</span>
                <span className="text-base font-semibold text-slate-800 tabular-nums">
                  {selectedTest.totalAttempts}
                </span>
              </div>
              <div className="p-3 rounded-lg border border-slate-100 bg-white">
                <span className="text-xs text-slate-400 block">Average Score</span>
                <span className="text-base font-semibold text-slate-800 tabular-nums">
                  {selectedTest.averageScore !== undefined
                    ? `${selectedTest.averageScore}%`
                    : 'N/A (No attempts)'}
                </span>
              </div>
              <div className="p-3 rounded-lg border border-slate-100 bg-white col-span-2 sm:col-span-2">
                <span className="text-xs text-slate-400 block">Created Timestamp</span>
                <span className="text-xs font-medium text-slate-700">
                  {formatDateTime(selectedTest.createdAt)}
                </span>
              </div>
            </div>

            {/* Configured Exam Settings Breakdown */}
            {selectedTest.settings && (
              <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                    Exam Schedule & Policy
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    Cohort: {selectedTest.settings.sectionOrCourse || 'All Enrolled'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200/60">
                    <span className="text-slate-400 block">Schedule Availability</span>
                    <span className="font-medium text-slate-800">
                      {selectedTest.settings.scheduleType === 'immediate'
                        ? 'Available Immediately upon publish'
                        : selectedTest.settings.startDate
                        ? `Starts: ${formatDateTime(selectedTest.settings.startDate)}`
                        : 'Scheduled Start'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-slate-200/60">
                    <span className="text-slate-400 block">Submission Deadline</span>
                    <span className="font-medium text-slate-800">
                      {selectedTest.settings.hasDeadline && selectedTest.settings.deadlineDate
                        ? formatDateTime(selectedTest.settings.deadlineDate)
                        : 'No hard cutoff (duration-only)'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-slate-200/60">
                    <span className="text-slate-400 block">Answer Key Visibility</span>
                    <span className="font-medium text-slate-800">
                      {selectedTest.settings.practiceMode
                        ? 'Practice Mode (Instant Feedback)'
                        : selectedTest.settings.answerReleaseTiming === 'never'
                        ? 'Never Visible'
                        : selectedTest.settings.answerReleaseTiming === 'scheduled'
                        ? 'Scheduled Release Date'
                        : selectedTest.settings.answerReleaseTiming === 'manual'
                        ? 'Manual Instructor Release'
                        : 'Immediately after exam closes'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-slate-200/60">
                    <span className="text-slate-400 block">Results Release Scope</span>
                    <span className="font-medium text-slate-800">
                      {selectedTest.settings.resultsVisibilityScope === 'score_only'
                        ? 'Total Score Only'
                        : selectedTest.settings.resultsVisibilityScope === 'score_answers'
                        ? 'Score + Correct Answers'
                        : 'Full Scores, Answers & Explanations'}
                    </span>
                  </div>
                </div>

                {/* Shareable Link Box */}
                <div className="pt-1">
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                    <span className="font-medium">Direct Candidate Link:</span>
                    {selectedTest.settings.isPasswordProtected && (
                      <span className="text-amber-700 font-medium inline-flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Passcode Protected
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={selectedTest.settings.shareableLink || `https://prephub.edu/exam/${selectedTest.id}`}
                      className="flex-1 text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-600 font-mono select-all focus:outline-none"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const link = selectedTest.settings?.shareableLink || `https://prephub.edu/exam/${selectedTest.id}`;
                        navigator.clipboard?.writeText(link);
                        setCopiedLink(true);
                        setTimeout(() => setCopiedLink(false), 2000);
                      }}
                      leftIcon={copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                    >
                      {copiedLink ? 'Copied' : 'Copy'}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Manual Results Release Callout */}
            {selectedTest.status !== 'results_released' && selectedTest.status !== 'draft' && (
              <div className="p-3 rounded-lg bg-indigo-50/70 border border-indigo-200/80 flex items-center justify-between gap-3 text-xs text-indigo-900">
                <div>
                  <p className="font-semibold text-indigo-950">
                    Release Results to Students
                  </p>
                  <p className="text-indigo-700 mt-0.5">
                    Make scores and answers immediately visible to all candidate portfolios.
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  className="shrink-0 text-xs"
                  onClick={() => {
                    const updated: MockTest = {
                      ...selectedTest,
                      status: 'results_released',
                    };
                    saveStoredTest(updated);
                    setSelectedTest(updated);
                    if (onShowNotice) {
                      onShowNotice(
                        'Results Released',
                        `Official results and scorecards have been published for "${selectedTest.title}". Students can now view their attempt analysis.`
                      );
                    }
                  }}
                >
                  Release Results
                </Button>
              </div>
            )}

            {selectedTest.status === 'results_released' && (
              <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-2 text-xs text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Results Released:</strong> Candidate scores, answer choices, and performance analyses are active and visible.
                </span>
              </div>
            )}

            <div className="flex justify-end gap-2.5 pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedTest(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Edit2 className="w-3.5 h-3.5" />}
                onClick={() => {
                  const id = selectedTest.id;
                  setSelectedTest(null);
                  router.push(`/teacher/builder?testId=${id}`);
                }}
              >
                Open in Question Builder
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!testToDelete}
        onClose={() => setTestToDelete(null)}
        title="Remove Test from Session?"
        description="This removes the test from your local state for the current session."
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Are you sure you want to remove{' '}
            <strong className="text-slate-900">{testToDelete?.title}</strong>?
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTestToDelete(null)}
            >
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={confirmDelete}>
              Confirm Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

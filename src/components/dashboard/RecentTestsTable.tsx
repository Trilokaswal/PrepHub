'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Clock,
  Eye,
  Edit2,
  Trash2,
  RefreshCw,
  Share2,
  Check,
  ShieldCheck,
  CheckCircle2,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  X,
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

const PAGE_SIZE = 6;

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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Row action overflow menu state
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

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

  // Reset to page 1 whenever filters, search, or sorting change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStatus, selectedSubject, sortBy]);

  // Close overflow menu on outside click or Escape
  useEffect(() => {
    if (!openMenuId) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-overflow-menu]')) {
        setOpenMenuId(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openMenuId]);

  // Filter & Search Logic
  const filteredTests = useMemo(() => {
    return tests
      .filter((test) => {
        const matchesSearch =
          test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          test.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          test.id.toLowerCase().includes(searchQuery.toLowerCase());

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

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredTests.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const paginatedTests = filteredTests.slice(startIndex, startIndex + PAGE_SIZE);

  const isFiltered =
    Boolean(searchQuery) ||
    selectedStatus !== 'all' ||
    selectedSubject !== 'All Subjects';

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedStatus('all');
    setSelectedSubject('All Subjects');
    setSortBy('newest');
    setCurrentPage(1);
  };

  const handleEditClick = (test: MockTest) => {
    router.push(`/teacher/builder?testId=${test.id}`);
  };

  const handleCopyLink = (test: MockTest) => {
    const link = test.settings?.shareableLink || `https://prephub.edu/exam/${test.id}`;
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(link);
      if (onShowNotice) {
        onShowNotice(
          'Exam Link Copied',
          `Shareable direct candidate link copied to clipboard:\n${link}`
        );
      }
    }
  };

  const confirmDelete = () => {
    if (testToDelete && onDeleteTest) {
      onDeleteTest(testToDelete.id);
      setTestToDelete(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls: Search bar (prominent) + Filter & Sort Controls */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Search Input (Expands to take primary visual space) */}
        <div className="relative flex-1 min-w-[240px]">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
            strokeWidth={1.75}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by test title, subject, or ID..."
            className="w-full pl-10 pr-12 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-shadow shadow-2xs"
            aria-label="Search tests"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 hover:text-slate-700 p-1 rounded"
              aria-label="Clear search query"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter & Sort Controls Group */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Subject Filter */}
          <div className="flex items-center">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="text-xs sm:text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-2xs"
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
              className="text-xs sm:text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-2xs"
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
              className="text-xs sm:text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-2xs"
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

      {/* Results Count & Active Filter Reset Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 px-0.5">
        <div className="flex items-center gap-2">
          <span>
            {filteredTests.length === 0 ? (
              <span>No exams match selected criteria</span>
            ) : (
              <span>
                Showing{' '}
                <strong className="text-slate-800">
                  {startIndex + 1}–{Math.min(startIndex + PAGE_SIZE, filteredTests.length)}
                </strong>{' '}
                of <strong className="text-slate-800">{filteredTests.length}</strong>{' '}
                {isFiltered ? 'matching exams' : 'exams'}
                {isFiltered && (
                  <span className="text-slate-400 ml-1">
                    (filtered from {tests.length} total)
                  </span>
                )}
              </span>
            )}
          </span>
        </div>

        {isFiltered && (
          <button
            onClick={handleClearFilters}
            className="text-[#4F46E5] hover:text-[#4338CA] font-medium flex items-center gap-1 transition-colors"
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
                <th scope="col" className="py-3 px-4 sm:px-6 w-2/5 min-w-[220px]">
                  Test Details
                </th>
                <th scope="col" className="py-3 px-4 w-[12%]">
                  Subject
                </th>
                <th scope="col" className="py-3 px-4 text-center w-[10%]">
                  Questions
                </th>
                <th scope="col" className="py-3 px-4 text-center w-[12%]">
                  Duration
                </th>
                <th scope="col" className="py-3 px-4 w-[12%]">
                  Status
                </th>
                <th scope="col" className="py-3 px-4 text-center w-[12%]">
                  Attempts
                </th>
                <th scope="col" className="py-3 px-4 sm:px-6 text-right w-[14%] whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {paginatedTests.length > 0 ? (
                paginatedTests.map((test) => (
                  <tr
                    key={test.id}
                    className="hover:bg-slate-50/75 transition-colors group"
                  >
                    {/* Test Title & ID (Clickable to Edit) */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <button
                        type="button"
                        onClick={() => handleEditClick(test)}
                        className="font-medium text-slate-900 group-hover:text-[#4F46E5] text-left transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded"
                        title={`Edit ${test.title}`}
                      >
                        {test.title}
                      </button>
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

                    {/* Refined Row Actions */}
                    <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Primary Action: Edit */}
                        <Button
                          variant="outline"
                          size="sm"
                          leftIcon={<Edit2 className="w-3.5 h-3.5 text-indigo-600" strokeWidth={1.75} />}
                          className="hover:border-indigo-300 hover:text-indigo-700 h-7 text-xs px-2.5"
                          onClick={() => handleEditClick(test)}
                        >
                          Edit
                        </Button>

                        {/* Secondary Actions: Accessible Dropdown */}
                        <div className="relative" data-overflow-menu>
                          <button
                            type="button"
                            onClick={() =>
                              setOpenMenuId((prev) => (prev === test.id ? null : test.id))
                            }
                            className={`p-1.5 rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${
                              openMenuId === test.id
                                ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                                : 'border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                            }`}
                            aria-label={`More actions for ${test.title}`}
                            aria-haspopup="menu"
                            aria-expanded={openMenuId === test.id}
                            title="More actions"
                          >
                            <MoreVertical className="w-3.5 h-3.5" strokeWidth={1.75} />
                          </button>

                          {openMenuId === test.id && (
                            <div
                              role="menu"
                              className="absolute right-0 top-full mt-1 w-44 rounded-xl bg-white border border-slate-200/90 shadow-lg py-1.5 z-40 text-xs animate-in fade-in zoom-in-95 duration-100"
                            >
                              <button
                                role="menuitem"
                                type="button"
                                onClick={() => {
                                  setOpenMenuId(null);
                                  setSelectedTest(test);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-1.5 text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors text-left"
                              >
                                <Eye className="w-3.5 h-3.5 text-slate-400" />
                                <span>View Test Details</span>
                              </button>

                              <button
                                role="menuitem"
                                type="button"
                                onClick={() => {
                                  setOpenMenuId(null);
                                  handleCopyLink(test);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-1.5 text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors text-left"
                              >
                                <Share2 className="w-3.5 h-3.5 text-slate-400" />
                                <span>Copy Exam Link</span>
                              </button>

                              <div className="my-1 border-t border-slate-100" />

                              {onDeleteTest && (
                                <button
                                  role="menuitem"
                                  type="button"
                                  onClick={() => {
                                    setOpenMenuId(null);
                                    setTestToDelete(test);
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-1.5 text-rose-600 hover:bg-rose-50 transition-colors text-left font-medium"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                                  <span>Delete Test</span>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
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

        {/* Pagination Bar (Desktop) */}
        {filteredTests.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-3 bg-white border-t border-slate-200 text-xs text-slate-500">
            <div>
              Showing <span className="font-semibold text-slate-800">{startIndex + 1}</span> to{' '}
              <span className="font-semibold text-slate-800">
                {Math.min(startIndex + PAGE_SIZE, filteredTests.length)}
              </span>{' '}
              of <span className="font-semibold text-slate-800">{filteredTests.length}</span> exams
            </div>

            <div className="flex items-center gap-1.5 self-center sm:self-auto">
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs px-2.5"
                disabled={safePage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                leftIcon={<ChevronLeft className="w-3.5 h-3.5" />}
              >
                Previous
              </Button>

              <div className="flex items-center gap-1 px-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`h-7 w-7 rounded-md font-medium text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${
                      p === safePage
                        ? 'bg-[#4F46E5] text-white font-semibold'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                    aria-label={`Go to page ${p}`}
                    aria-current={p === safePage ? 'page' : undefined}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs px-2.5"
                disabled={safePage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Card List View */}
      <div className="md:hidden space-y-3">
        {paginatedTests.length > 0 ? (
          paginatedTests.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <button
                    type="button"
                    onClick={() => handleEditClick(test)}
                    className="font-medium text-slate-900 text-sm leading-snug text-left hover:text-[#4F46E5] transition-colors"
                  >
                    {test.title}
                  </button>
                  <p className="text-xs text-slate-400 mt-0.5">ID: {test.id}</p>
                </div>
                {getStatusBadge(test.status)}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100 text-slate-600">
                <div>
                  <span className="text-slate-400 block text-xs">Subject</span>
                  <span className="font-medium text-slate-800">{test.subject}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Duration</span>
                  <span className="font-medium text-slate-800 tabular-nums">
                    {test.durationMinutes} min ({test.questionCount} Qs)
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Attempts</span>
                  <span className="font-medium text-slate-800 tabular-nums">
                    {formatNumber(test.totalAttempts)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Avg Score</span>
                  <span className="font-medium text-slate-800 tabular-nums">
                    {test.averageScore !== undefined ? `${test.averageScore}%` : 'N/A'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Edit2 className="w-3.5 h-3.5 text-indigo-600" />}
                    onClick={() => handleEditClick(test)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={<Eye className="w-3.5 h-3.5" />}
                    onClick={() => setSelectedTest(test)}
                  >
                    Details
                  </Button>
                </div>

                {onDeleteTest && (
                  <button
                    onClick={() => setTestToDelete(test)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    aria-label={`Delete ${test.title}`}
                    title="Delete test"
                  >
                    <Trash2 className="w-4 h-4" strokeWidth={1.75} />
                  </button>
                )}
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

        {/* Mobile Pagination Controls */}
        {filteredTests.length > PAGE_SIZE && (
          <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200/90 text-xs text-slate-600">
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs px-2.5"
              disabled={safePage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              leftIcon={<ChevronLeft className="w-3.5 h-3.5" />}
            >
              Prev
            </Button>
            <span>
              Page <strong className="text-slate-900">{safePage}</strong> of{' '}
              <strong className="text-slate-900">{totalPages}</strong>
            </span>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs px-2.5"
              disabled={safePage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
            >
              Next
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

'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Plus,
  UploadCloud,
  Search,
  Filter,
  Trash2,
  Edit,
  CheckCircle2,
  AlertTriangle,
  Lock,
  ShieldAlert,
  ArrowRight,
  LogOut,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
  HelpCircle,
  FileText,
  Database,
  Layers,
  Check,
  X,
  ExternalLink,
} from 'lucide-react';
import { authStore } from '@/lib/authStore';
import { BankQuestion, AuthUser } from '@/types';
import { questionBankStore, isAuthorizedAdmin, AUTHORIZED_ADMIN_GMAIL } from '@/lib/questionBankStore';
import { ParsedQuestionCandidate } from '@/lib/questionParser';
import { MathText } from '@/components/ui/MathText';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { RedUnderline } from '@/components/brand/RedUnderline';
import { QuestionEditorModal } from './QuestionEditorModal';
import { QuestionImportModal } from './QuestionImportModal';
import { GoogleIcon } from '@/components/auth/SocialIcons';

export const QuestionBankAdminView: React.FC = () => {
  const router = useRouter();

  // Auth state
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isServerAdmin, setIsServerAdmin] = useState<boolean | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState<boolean>(true);

  // Question data state
  const [questions, setQuestions] = useState<BankQuestion[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Search & filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  // Modals state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<BankQuestion | null>(null);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showNotification = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  }, []);

  // Fetch admin verification and questions
  useEffect(() => {
    const user = authStore.getCurrentUser();
    setCurrentUser(user);

    // Call server-side verification endpoint
    fetch('/api/admin/auth')
      .then((res) => res.json())
      .then((data) => {
        setIsServerAdmin(Boolean(data.isAdmin));
        setIsAuthChecking(false);
      })
      .catch(() => {
        // Fallback to client-side check if offline
        const clientAdmin = isAuthorizedAdmin(user?.email);
        setIsServerAdmin(clientAdmin);
        setIsAuthChecking(false);
      });

    // Load initial bank questions
    setQuestions(questionBankStore.getQuestions());

    const unsubBank = questionBankStore ? () => {} : () => {};
    const unsubAuth = authStore.subscribe(() => {
      const u = authStore.getCurrentUser();
      setCurrentUser(u);
      setIsServerAdmin(isAuthorizedAdmin(u?.email));
    });

    return () => {
      unsubBank();
      unsubAuth();
    };
  }, []);

  // Refresh questions list
  const refreshQuestions = useCallback(() => {
    setQuestions(
      questionBankStore.getQuestions({
        subject: selectedSubject,
        topic: selectedTopic,
        difficulty: selectedDifficulty,
        type: selectedType,
        search: searchQuery,
      })
    );
  }, [selectedSubject, selectedTopic, selectedDifficulty, selectedType, searchQuery]);

  useEffect(() => {
    refreshQuestions();
  }, [refreshQuestions]);

  // Derived subjects and topics
  const availableSubjects = useMemo(() => {
    return questionBankStore.getAvailableSubjects();
  }, [questions]);

  const availableTopics = useMemo(() => {
    return questionBankStore.getAvailableTopics(selectedSubject);
  }, [questions, selectedSubject]);

  const stats = useMemo(() => {
    return questionBankStore.getStats();
  }, [questions]);

  // Handle Google OAuth Login for Admin
  const handleAdminGoogleLogin = async () => {
    try {
      await authStore.loginWithOAuth('google', '/admin/question-bank');
    } catch (err: any) {
      showNotification(err.message || 'OAuth initialization failed', 'error');
    }
  };

  // Add / Edit save handler
  const handleSaveQuestion = async (
    questionData: Omit<BankQuestion, 'id' | 'createdAt' | 'updatedAt'>,
    id?: string
  ) => {
    if (id) {
      // Update
      const ok = questionBankStore.updateQuestion(id, questionData);
      if (ok) {
        showNotification('Question updated successfully.');
        refreshQuestions();
      } else {
        throw new Error('Could not find question to update.');
      }
    } else {
      // Create
      questionBankStore.addQuestion(questionData);
      showNotification('New question added to bank successfully.');
      refreshQuestions();
    }
  };

  // Bulk import confirmed handler
  const handleImportConfirmed = async (parsedCandidates: ParsedQuestionCandidate[]) => {
    const toAdd = parsedCandidates.map((c) => ({
      statement: c.statement,
      subject: c.subject,
      topic: c.topic || 'General',
      difficulty: c.difficulty,
      type: c.type,
      options: c.options,
      correctAnswer: c.correctAnswer,
      explanation: c.explanation,
      marks: c.marks,
      negativeMarks: c.negativeMarks,
      imageUrl: c.imageUrl,
    }));

    const result = questionBankStore.bulkAddQuestions(toAdd);
    showNotification(
      `Successfully imported ${result.addedCount} questions (${result.duplicateCount} duplicates skipped).`
    );
    refreshQuestions();
  };

  // Delete single question
  const handleDeleteQuestion = (id: string) => {
    questionBankStore.deleteQuestion(id);
    setSelectedIds((prev) => prev.filter((item) => item !== id));
    showNotification('Question deleted.');
    setDeleteConfirmId(null);
    refreshQuestions();
  };

  // Bulk delete selected
  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    const count = questionBankStore.bulkDeleteQuestions(selectedIds);
    setSelectedIds([]);
    setIsBulkDeleteModalOpen(false);
    showNotification(`Deleted ${count} questions.`);
    refreshQuestions();
  };

  // Bulk update difficulty
  const handleBulkDifficultyChange = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    if (selectedIds.length === 0) return;
    const count = questionBankStore.bulkUpdateDifficulty(selectedIds, difficulty);
    showNotification(`Updated difficulty to ${difficulty} for ${count} questions.`);
    refreshQuestions();
  };

  // Multi-select helpers
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleSelectAll = () => {
    if (selectedIds.length === questions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(questions.map((q) => q.id));
    }
  };

  // =========================================================================
  // ACCESS DENIED & ADMIN AUTH SCREENS (Strict Requirement 1 & 2)
  // =========================================================================
  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#E14D45] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono font-medium text-slate-500">
            Verifying Administrator Credentials...
          </span>
        </div>
      </div>
    );
  }

  // If user is not authorized admin:
  const isAuthorized = isServerAdmin === true || isAuthorizedAdmin(currentUser?.email);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col font-sans text-slate-900">
        <Navbar />

        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xl space-y-6 text-center">
            {/* Shield Icon */}
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-[#E14D45] border border-rose-100 flex items-center justify-center mx-auto shadow-xs">
              <ShieldAlert className="w-8 h-8 stroke-[1.8]" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#E14D45] uppercase block">
                ADMIN-ONLY RESTRICTION
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Administrator Access Required
              </h1>
              <p className="text-xs text-slate-500 leading-relaxed">
                The Question Bank management panel is strictly restricted to the authorized university administrator.
                Students and unauthenticated users cannot view questions, answers, or explanations.
              </p>
            </div>

            {/* Account Status Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-left text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-mono text-[11px]">Authorized Gmail:</span>
                <span className="font-mono font-bold text-slate-800">{AUTHORIZED_ADMIN_GMAIL}</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200/60 pt-2">
                <span className="text-slate-400 font-mono text-[11px]">Current Status:</span>
                <span className="font-semibold text-rose-600">
                  {currentUser ? `Signed in as ${currentUser.email}` : 'Not Signed In'}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleAdminGoogleLogin}
                className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-[#15233E] hover:bg-[#1E2F52] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <GoogleIcon className="w-4 h-4" />
                <span>Sign in with Administrator Google Account</span>
              </button>

              <div className="flex items-center justify-center gap-3 pt-1">
                {currentUser && (
                  <button
                    type="button"
                    onClick={() => {
                      authStore.logout();
                      router.push('/login');
                    }}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Switch Account</span>
                  </button>
                )}

                <Link
                  href="/"
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  <span>Return to Home</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // =========================================================================
  // AUTHORIZED ADMINISTRATOR CONSOLE
  // =========================================================================
  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans text-slate-900 selection:bg-[#E14D45]/15 selection:text-[#E14D45]">
      <Navbar />

      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-lg border text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 ${
            notification.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-800'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}
        >
          {notification.type === 'error' ? (
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      <main className="flex-1 pb-16">
        {/* Header Section */}
        <section className="pt-8 sm:pt-10 pb-8 border-b border-slate-200/60 bg-white/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <Link href="/" className="hover:text-slate-700 transition-colors">
                Home
              </Link>
              <span>&gt;</span>
              <span className="text-slate-700 font-semibold">Question Bank Management</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-[#E14D45] uppercase">
                  <span className="w-1.5 h-1.5 bg-[#E14D45] rounded-xs" />
                  <span>ADMINISTRATOR CONSOLE &bull; {AUTHORIZED_ADMIN_GMAIL}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Question Bank &amp;{' '}
                  <span className="relative inline-block">
                    Mock Test Engine
                    <RedUnderline />
                  </span>
                </h1>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl">
                  Centralized repository of verified questions with automated parser &amp; random exam generation engine.
                  Bulk import DOCX, PDF, CSV, JSON, TXT &amp; Markdown documents with interactive formula preview.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsImportOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-[#E14D45] text-slate-800 text-xs font-bold shadow-xs hover:shadow-card-hover transition-all cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4 text-[#E14D45]" />
                  <span>Upload &amp; Bulk Import</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditingQuestion(null);
                    setIsEditorOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E14D45] hover:bg-[#CC3F37] text-white text-xs font-bold shadow-xs active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Question Manually</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <span className="text-[11px] text-slate-400 font-medium block">Total Questions</span>
                <span className="text-2xl font-extrabold font-mono text-slate-900">{stats.totalCount}</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <span className="text-[11px] text-slate-400 font-medium block">Subjects Covered</span>
                <span className="text-2xl font-extrabold font-mono text-slate-900">
                  {Object.keys(stats.subjectCounts).length}
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <span className="text-[11px] text-slate-400 font-medium block">Easy / Medium / Hard</span>
                <div className="flex items-center gap-2 text-xs font-mono font-bold mt-1">
                  <span className="text-emerald-700">{stats.difficultyCounts.Easy}E</span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="text-amber-700">{stats.difficultyCounts.Medium}M</span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="text-rose-700">{stats.difficultyCounts.Hard}H</span>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
                <span className="text-[11px] text-slate-400 font-medium block">Test Engine Link</span>
                <Link
                  href="/tests/generator"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#E14D45] hover:underline"
                >
                  <span>Launch Random Generator</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Question Management Workspace */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                {/* Search Bar */}
                <div className="md:col-span-5 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by question text, formulas, or explanation..."
                    className="w-full text-xs font-medium pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E14D45]/30 focus:border-[#E14D45] focus:bg-white transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Subject dropdown */}
                <div className="md:col-span-2">
                  <select
                    value={selectedSubject}
                    onChange={(e) => {
                      setSelectedSubject(e.target.value);
                      setSelectedTopic('All');
                    }}
                    className="w-full text-xs font-semibold rounded-xl border border-slate-200 px-3 py-2.5 bg-white text-slate-700"
                  >
                    <option value="All">All Subjects</option>
                    {availableSubjects.map((s) => (
                      <option key={s} value={s}>
                        {s} ({stats.subjectCounts[s] || 0})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Topic dropdown */}
                <div className="md:col-span-2">
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="w-full text-xs font-semibold rounded-xl border border-slate-200 px-3 py-2.5 bg-white text-slate-700"
                  >
                    <option value="All">All Topics</option>
                    {availableTopics.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty dropdown */}
                <div className="md:col-span-1.5">
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full text-xs font-semibold rounded-xl border border-slate-200 px-3 py-2.5 bg-white text-slate-700"
                  >
                    <option value="All">All Levels</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                {/* Type dropdown */}
                <div className="md:col-span-1.5">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full text-xs font-semibold rounded-xl border border-slate-200 px-3 py-2.5 bg-white text-slate-700"
                  >
                    <option value="All">All Types</option>
                    <option value="single_choice">Single Choice</option>
                    <option value="multiple_choice">Multiple Choice</option>
                    <option value="numerical">Numerical</option>
                    <option value="subjective">Subjective</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bulk Action Bar (Visible when questions selected) */}
            {selectedIds.length > 0 && (
              <div className="p-3 rounded-xl bg-[#15233E] text-white flex flex-wrap items-center justify-between gap-3 shadow-md animate-in fade-in duration-200">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold bg-[#E14D45] px-2.5 py-0.5 rounded-md">
                    {selectedIds.length} Selected
                  </span>
                  <span className="text-xs text-slate-300">of {questions.length} questions</span>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        handleBulkDifficultyChange(e.target.value as any);
                        e.target.value = '';
                      }
                    }}
                    className="text-xs bg-[#1E2F52] border border-slate-600 rounded-lg px-2.5 py-1.5 text-white"
                  >
                    <option value="">Change Difficulty...</option>
                    <option value="Easy">Set to Easy</option>
                    <option value="Medium">Set to Medium</option>
                    <option value="Hard">Set to Hard</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => setIsBulkDeleteModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Selected</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedIds([])}
                    className="text-xs text-slate-400 hover:text-white px-2 py-1 transition-colors"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            )}

            {/* Questions Table / List */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              {/* Table header row */}
              <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={questions.length > 0 && selectedIds.length === questions.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded-sm text-[#E14D45] focus:ring-[#E14D45] cursor-pointer"
                  />
                  <span className="text-xs font-bold text-slate-700 font-mono uppercase tracking-wider">
                    Questions ({questions.length})
                  </span>
                </div>

                <span className="text-xs text-slate-400">
                  Showing {questions.length} matching question{questions.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Empty state */}
              {questions.length === 0 ? (
                <div className="p-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Database className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900">No questions found</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      No questions match the current search filters. You can reset filters or upload new
                      questions from files.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedSubject('All');
                      setSelectedTopic('All');
                      setSelectedDifficulty('All');
                      setSelectedType('All');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {questions.map((q, qIndex) => {
                    const isSelected = selectedIds.includes(q.id);
                    const isExpanded = expandedId === q.id;

                    return (
                      <div
                        key={q.id}
                        className={`p-5 transition-all ${
                          isSelected ? 'bg-rose-50/20' : 'hover:bg-slate-50/50'
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          {/* Checkbox */}
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleSelect(q.id)}
                            className="w-4 h-4 mt-1 rounded-sm text-[#E14D45] focus:ring-[#E14D45] cursor-pointer"
                          />

                          {/* Main question card body */}
                          <div className="flex-1 space-y-3">
                            {/* Badges row */}
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-xs font-bold text-slate-400">
                                #{qIndex + 1}
                              </span>

                              <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-md">
                                {q.subject}
                              </span>

                              <span className="text-xs text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
                                {q.topic}
                              </span>

                              <span
                                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                                  q.difficulty === 'Easy'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : q.difficulty === 'Hard'
                                    ? 'bg-rose-100 text-rose-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {q.difficulty}
                              </span>

                              <span className="text-[10px] font-mono uppercase text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
                                {q.type.replace('_', ' ')}
                              </span>

                              <span className="text-[10px] font-mono text-slate-500">
                                {q.marks} pts &bull; -{q.negativeMarks} neg
                              </span>
                            </div>

                            {/* Question Statement with KaTeX rendering */}
                            <div className="text-sm font-medium text-slate-900 leading-relaxed">
                              <MathText text={q.statement} />
                            </div>

                            {/* Options Preview for MCQs */}
                            {q.options && q.options.length > 0 && (
                              <div className="space-y-2 pt-1">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {q.options.map((opt, oIdx) => (
                                    <div
                                      key={opt.id || oIdx}
                                      className={`flex items-center gap-2.5 p-2 rounded-lg text-xs border ${
                                        opt.isCorrect
                                          ? 'border-emerald-300 bg-emerald-50/60 text-emerald-950 font-bold'
                                          : 'border-slate-200 bg-white text-slate-700'
                                      }`}
                                    >
                                      <span
                                        className={`w-5 h-5 rounded-md flex items-center justify-center font-mono text-[11px] font-bold shrink-0 ${
                                          opt.isCorrect
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-slate-100 text-slate-500'
                                        }`}
                                      >
                                        {String.fromCharCode(65 + oIdx)}
                                      </span>
                                      <span className="flex-1 truncate">
                                        <MathText text={opt.text} />
                                      </span>
                                      {opt.isCorrect && (
                                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Detailed explanation (expandable or inline) */}
                            {q.explanation && (
                              <div className="pt-1">
                                <button
                                  type="button"
                                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                                  className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                                >
                                  <span>{isExpanded ? 'Hide Solution' : 'View Explanation'}</span>
                                  {isExpanded ? (
                                    <ChevronUp className="w-3 h-3" />
                                  ) : (
                                    <ChevronDown className="w-3 h-3" />
                                  )}
                                </button>

                                {isExpanded && (
                                  <div className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed animate-in fade-in">
                                    <span className="font-bold text-slate-900 font-mono text-[11px] block mb-1">
                                      SOLUTION &bull; EXPLANATION:
                                    </span>
                                    <MathText text={q.explanation} />
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Row Actions: Edit, Delete */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingQuestion(q);
                                setIsEditorOpen(true);
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                              title="Edit question"
                            >
                              <Edit className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(q.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete question"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Modals */}
      <QuestionEditorModal
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingQuestion(null);
        }}
        questionToEdit={editingQuestion}
        onSave={handleSaveQuestion}
        existingSubjects={availableSubjects}
      />

      <QuestionImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImportConfirmed={handleImportConfirmed}
        existingSubjects={availableSubjects}
      />

      {/* Single Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        title="Delete Question"
        size="sm"
      >
        <div className="space-y-4 pt-2">
          <p className="text-xs text-slate-600">
            Are you sure you want to permanently delete this question from the Question Bank? This action
            cannot be undone.
          </p>
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => deleteConfirmId && handleDeleteQuestion(deleteConfirmId)}
            >
              Delete Question
            </Button>
          </div>
        </div>
      </Modal>

      {/* Bulk Delete Confirmation Modal */}
      <Modal
        isOpen={isBulkDeleteModalOpen}
        onClose={() => setIsBulkDeleteModalOpen(false)}
        title="Delete Selected Questions"
        size="sm"
      >
        <div className="space-y-4 pt-2">
          <p className="text-xs text-slate-600">
            Are you sure you want to permanently delete{' '}
            <span className="font-bold text-slate-900">{selectedIds.length}</span> selected questions from
            the Question Bank?
          </p>
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setIsBulkDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleBulkDelete}>
              Delete {selectedIds.length} Questions
            </Button>
          </div>
        </div>
      </Modal>

      <Footer />
    </div>
  );
};

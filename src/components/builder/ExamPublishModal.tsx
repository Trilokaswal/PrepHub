'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Shield,
  Eye,
  Award,
  AlertCircle,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  Send,
  Save,
  HelpCircle,
  Shuffle,
  FileText,
} from 'lucide-react';
import { MockTest, Question, ExamSettings, ScheduleType, AnswerReleaseTiming, ResultsReleaseTiming, ResultVisibilityScope } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { getDefaultExamSettings } from '@/lib/testStore';
import { formatDate, formatDateTime, toLocalDatetimeString, fromLocalDatetimeString } from '@/lib/formatters';
import { validateTestForPublish, ValidationError } from './PublishValidationModal';

interface ExamPublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  test: MockTest;
  questions: Question[];
  onConfirmPublish: (settings: ExamSettings, targetStatus: 'published' | 'scheduled') => void;
  onSaveDraftSettings: (settings: ExamSettings) => void;
  onJumpToQuestion: (id: string) => void;
}

export const ExamPublishModal: React.FC<ExamPublishModalProps> = ({
  isOpen,
  onClose,
  test,
  questions,
  onConfirmPublish,
  onSaveDraftSettings,
  onJumpToQuestion,
}) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'access' | 'results' | 'review'>('schedule');
  const [copiedLink, setCopiedLink] = useState(false);

  // Settings state initialized with test's existing settings or defaults
  const [settings, setSettings] = useState<ExamSettings>(() => {
    return test.settings || getDefaultExamSettings(test);
  });

  // Re-sync on modal open
  useEffect(() => {
    if (isOpen) {
      setSettings(test.settings || getDefaultExamSettings(test));
      setActiveTab('schedule');
    }
  }, [isOpen, test]);

  // Validation
  const validationErrors: ValidationError[] = validateTestForPublish(questions);
  const isQuestionsValid = validationErrors.length === 0;

  // Custom schedule timing validation
  const scheduleValidationErrors: string[] = [];
  if (settings.durationMinutes <= 0) {
    scheduleValidationErrors.push('Duration must be greater than 0 minutes.');
  }
  if (settings.scheduleType === 'scheduled' && !settings.startDate) {
    scheduleValidationErrors.push('Please specify a valid start date and time for the scheduled exam.');
  }
  if (settings.hasDeadline && settings.deadlineDate) {
    const startMs = settings.scheduleType === 'scheduled' && settings.startDate
      ? new Date(settings.startDate).getTime()
      : Date.now();
    const deadlineMs = new Date(settings.deadlineDate).getTime();
    if (deadlineMs <= startMs) {
      scheduleValidationErrors.push('Final submission deadline must be strictly after the exam start time.');
    }
  }

  const isScheduleValid = scheduleValidationErrors.length === 0;
  const canPublish = isQuestionsValid && isScheduleValid;

  const updateSetting = <K extends keyof ExamSettings>(key: K, value: ExamSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleCopyLink = () => {
    const link = settings.shareableLink || `https://prephub.edu/exam/${test.id}`;
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(link);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleFinalPublish = () => {
    if (!canPublish) return;
    const targetStatus = settings.scheduleType === 'scheduled' ? 'scheduled' : 'published';
    onConfirmPublish(settings, targetStatus);
    onClose();
  };

  const handleSaveDraft = () => {
    onSaveDraftSettings(settings);
    onClose();
  };

  const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 0), 0);
  const hasSubjective = questions.some((q) => q.type === 'subjective');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Exam Configuration & Publishing"
      description="Configure scheduling, access restrictions, answer visibility, and results release policy."
      maxWidth="lg"
    >
      <div className="space-y-5">
        {/* Step Tabs Navigation */}
        <div className="flex border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('schedule')}
            className={`flex items-center gap-2 py-2.5 px-3.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'schedule'
                ? 'border-[#4F46E5] text-[#4F46E5]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>A. Schedule & Duration</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('access')}
            className={`flex items-center gap-2 py-2.5 px-3.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'access'
                ? 'border-[#4F46E5] text-[#4F46E5]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>B. Access & Answers</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('results')}
            className={`flex items-center gap-2 py-2.5 px-3.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'results'
                ? 'border-[#4F46E5] text-[#4F46E5]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>C. Results & Grading</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('review')}
            className={`flex items-center gap-2 py-2.5 px-3.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'review'
                ? 'border-[#4F46E5] text-[#4F46E5]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Review & Confirm</span>
          </button>
        </div>

        {/* ================= SECTION A: SCHEDULE & DURATION ================= */}
        {activeTab === 'schedule' && (
          <div className="space-y-5 py-1">
            {/* Time Limit */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-800">
                Exam Time Limit (per-student duration) <span className="text-rose-500">*</span>
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {[15, 30, 45, 60, 90, 120].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => updateSetting('durationMinutes', mins)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      settings.durationMinutes === mins
                        ? 'bg-indigo-50 border-[#4F46E5] text-[#4F46E5] font-semibold'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {mins} min
                  </button>
                ))}
                <div className="flex items-center gap-1.5 text-xs ml-1">
                  <span className="text-slate-400">Custom:</span>
                  <input
                    type="number"
                    min="5"
                    max="360"
                    value={settings.durationMinutes}
                    onChange={(e) => updateSetting('durationMinutes', parseInt(e.target.value, 10) || 5)}
                    className="w-20 px-2 py-1 bg-white border border-slate-300 rounded-md text-xs font-semibold text-slate-800 text-center focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                  <span className="text-slate-500">min</span>
                </div>
              </div>
            </div>

            {/* Start Date & Time */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <label className="block text-xs font-medium text-slate-800">
                Exam Availability & Start Time <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                  settings.scheduleType === 'immediate'
                    ? 'bg-indigo-50/50 border-indigo-300 ring-1 ring-indigo-200'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}>
                  <input
                    type="radio"
                    name="scheduleType"
                    checked={settings.scheduleType === 'immediate'}
                    onChange={() => updateSetting('scheduleType', 'immediate')}
                    className="mt-0.5 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <p className="text-xs font-semibold text-slate-900">Make Available Immediately</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
                      Students can access and launch this exam as soon as it is published.
                    </p>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                  settings.scheduleType === 'scheduled'
                    ? 'bg-indigo-50/50 border-indigo-300 ring-1 ring-indigo-200'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}>
                  <input
                    type="radio"
                    name="scheduleType"
                    checked={settings.scheduleType === 'scheduled'}
                    onChange={() => updateSetting('scheduleType', 'scheduled')}
                    className="mt-0.5 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <p className="text-xs font-semibold text-slate-900">Schedule for Future Date</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
                      Exam is locked until the scheduled start time arrives.
                    </p>
                  </div>
                </label>
              </div>

              {settings.scheduleType === 'scheduled' && (
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="exam-start-date" className="block text-xs font-medium text-slate-700">
                      Scheduled Start Date & Time
                    </label>
                    {settings.startDate && (
                      <span className="text-[11px] font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                        {formatDateTime(settings.startDate)}
                      </span>
                    )}
                  </div>
                  <input
                    id="exam-start-date"
                    type="datetime-local"
                    value={toLocalDatetimeString(settings.startDate)}
                    onChange={(e) => updateSetting('startDate', fromLocalDatetimeString(e.target.value))}
                    className="w-full sm:w-72 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                  <p className="text-[11px] text-slate-500">
                    Students will see a &quot;Scheduled&quot; countdown banner until this time.
                  </p>
                </div>
              )}
            </div>

            {/* Final Submission Deadline */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-800">Final Submission Deadline</p>
                  <p className="text-[11px] text-slate-500">
                    Optional cutoff date and time after which no further attempts or submissions will be accepted.
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="has-deadline-toggle"
                  checked={settings.hasDeadline}
                  onChange={(e) => updateSetting('hasDeadline', e.target.checked)}
                  className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
              </div>

              {settings.hasDeadline && (
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="exam-deadline-date" className="block text-xs font-medium text-slate-700">
                      Submission Cutoff Date & Time
                    </label>
                    {settings.deadlineDate && (
                      <span className="text-[11px] font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                        {formatDateTime(settings.deadlineDate)}
                      </span>
                    )}
                  </div>
                  <input
                    id="exam-deadline-date"
                    type="datetime-local"
                    value={toLocalDatetimeString(settings.deadlineDate)}
                    onChange={(e) => updateSetting('deadlineDate', fromLocalDatetimeString(e.target.value))}
                    className="w-full sm:w-72 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                  <div className="p-2.5 rounded bg-sky-50 border border-sky-100 text-xs text-sky-800 flex items-start gap-2">
                    <Clock className="w-4 h-4 shrink-0 text-sky-600 mt-0.5" />
                    <span>
                      <strong>Timing Rule:</strong> A student&apos;s deadline is the earlier of their individual start time + {settings.durationMinutes} minutes and this final exam cutoff.
                    </span>
                  </div>
                </div>
              )}
            </div>

            {scheduleValidationErrors.length > 0 && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-1">
                {scheduleValidationErrors.map((err, i) => (
                  <p key={i}>• {err}</p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= SECTION B: ACCESS & ANSWER VISIBILITY ================= */}
        {activeTab === 'access' && (
          <div className="space-y-5 py-1">
            {/* Cohort & Shareable Link */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="intended-cohort" className="block text-xs font-medium text-slate-800 mb-1">
                  Intended Class / Cohort
                </label>
                <input
                  id="intended-cohort"
                  type="text"
                  value={settings.sectionOrCourse || ''}
                  onChange={(e) => updateSetting('sectionOrCourse', e.target.value)}
                  placeholder="e.g. STEM Honors - Section 01"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-800 mb-1">
                  Shareable Examination Link
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    readOnly
                    value={settings.shareableLink || `https://prephub.edu/exam/${test.id}`}
                    className="flex-1 px-3 py-1.5 text-xs bg-slate-100 border border-slate-200 rounded-lg text-slate-600 font-mono select-all"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-2.5 text-xs"
                    onClick={handleCopyLink}
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </Button>
                </div>
              </div>
            </div>

            {/* Access Password & Max Attempts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-800">Passcode Protection</span>
                  <input
                    type="checkbox"
                    id="password-toggle"
                    checked={settings.isPasswordProtected}
                    onChange={(e) => updateSetting('isPasswordProtected', e.target.checked)}
                    className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                {settings.isPasswordProtected ? (
                  <input
                    type="text"
                    value={settings.accessPassword || ''}
                    onChange={(e) => updateSetting('accessPassword', e.target.value)}
                    placeholder="Enter exam entry passcode (e.g. EXAM-42)"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 font-mono"
                  />
                ) : (
                  <p className="text-[11px] text-slate-500">
                    Anyone with the exam link can launch an attempt without a password.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="max-attempts-select" className="block text-xs font-medium text-slate-800">
                  Allowed Student Attempts
                </label>
                <select
                  id="max-attempts-select"
                  value={settings.maxAttempts}
                  onChange={(e) => updateSetting('maxAttempts', parseInt(e.target.value, 10))}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  <option value={1}>1 Attempt (Strict Examination)</option>
                  <option value={2}>2 Attempts</option>
                  <option value={3}>3 Attempts</option>
                  <option value={999}>Unlimited (Practice Mode)</option>
                </select>
              </div>
            </div>

            {/* Shuffling Options */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <p className="text-xs font-medium text-slate-800">Question & Choice Randomization</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.shuffleQuestions}
                    onChange={(e) => updateSetting('shuffleQuestions', e.target.checked)}
                    className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="text-xs">
                    <span className="font-medium text-slate-800">Shuffle Question Sequence</span>
                    <p className="text-[10px] text-slate-400">Randomizes question order per student</p>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.shuffleOptions}
                    onChange={(e) => updateSetting('shuffleOptions', e.target.checked)}
                    className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="text-xs">
                    <span className="font-medium text-slate-800">Shuffle MCQ Answer Choices</span>
                    <p className="text-[10px] text-slate-400">Randomizes options A, B, C, D</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Answer Visibility Policy */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <label className="block text-xs font-medium text-slate-800">
                Correct Answer Keys & Solution Visibility
              </label>

              {/* Practice Mode Toggle */}
              <label className="flex items-start gap-2.5 p-2.5 rounded-lg border border-slate-200 bg-slate-50/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.practiceMode}
                  onChange={(e) => updateSetting('practiceMode', e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <div className="text-xs">
                  <span className="font-semibold text-slate-800">Enable Practice Feedback Mode</span>
                  <p className="text-slate-500 mt-0.5 leading-normal">
                    When enabled, students can check correct answers immediately during the exam. (Disabled by default for formal examinations).
                  </p>
                </div>
              </label>

              {/* Release Timing */}
              <div className="space-y-1.5 pt-1">
                <p className="text-xs font-medium text-slate-700">When should answer keys become viewable to students?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label className={`p-2.5 rounded-lg border cursor-pointer ${
                    settings.answerReleaseTiming === 'immediate_after_close'
                      ? 'bg-indigo-50/60 border-indigo-300 font-medium'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}>
                    <input
                      type="radio"
                      name="answerReleaseTiming"
                      checked={settings.answerReleaseTiming === 'immediate_after_close'}
                      onChange={() => updateSetting('answerReleaseTiming', 'immediate_after_close')}
                      className="mr-2 text-indigo-600"
                    />
                    Immediately after exam closes (Default)
                  </label>

                  <label className={`p-2.5 rounded-lg border cursor-pointer ${
                    settings.answerReleaseTiming === 'scheduled'
                      ? 'bg-indigo-50/60 border-indigo-300 font-medium'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}>
                    <input
                      type="radio"
                      name="answerReleaseTiming"
                      checked={settings.answerReleaseTiming === 'scheduled'}
                      onChange={() => updateSetting('answerReleaseTiming', 'scheduled')}
                      className="mr-2 text-indigo-600"
                    />
                    At a scheduled date & time
                  </label>

                  <label className={`p-2.5 rounded-lg border cursor-pointer ${
                    settings.answerReleaseTiming === 'manual'
                      ? 'bg-indigo-50/60 border-indigo-300 font-medium'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}>
                    <input
                      type="radio"
                      name="answerReleaseTiming"
                      checked={settings.answerReleaseTiming === 'manual'}
                      onChange={() => updateSetting('answerReleaseTiming', 'manual')}
                      className="mr-2 text-indigo-600"
                    />
                    Release manually by teacher
                  </label>

                  <label className={`p-2.5 rounded-lg border cursor-pointer ${
                    settings.answerReleaseTiming === 'never'
                      ? 'bg-indigo-50/60 border-indigo-300 font-medium'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}>
                    <input
                      type="radio"
                      name="answerReleaseTiming"
                      checked={settings.answerReleaseTiming === 'never'}
                      onChange={() => updateSetting('answerReleaseTiming', 'never')}
                      className="mr-2 text-indigo-600"
                    />
                    Never show correct answers
                  </label>
                </div>

                {settings.answerReleaseTiming === 'scheduled' && (
                  <div className="pt-2">
                    <input
                      type="datetime-local"
                      value={toLocalDatetimeString(settings.scheduledAnswerReleaseDate)}
                      onChange={(e) => updateSetting('scheduledAnswerReleaseDate', fromLocalDatetimeString(e.target.value))}
                      className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= SECTION C: RESULTS & GRADING ================= */}
        {activeTab === 'results' && (
          <div className="space-y-5 py-1">
            {/* Results Release Schedule */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-800">
                Results Release Schedule
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <label className={`p-3 rounded-xl border cursor-pointer ${
                  settings.resultsReleaseTiming === 'immediate_after_close'
                    ? 'bg-indigo-50/60 border-indigo-300 font-medium'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}>
                  <input
                    type="radio"
                    name="resultsReleaseTiming"
                    checked={settings.resultsReleaseTiming === 'immediate_after_close'}
                    onChange={() => updateSetting('resultsReleaseTiming', 'immediate_after_close')}
                    className="mr-2 text-indigo-600"
                  />
                  <span>When Exam Closes (Default)</span>
                </label>

                <label className={`p-3 rounded-xl border cursor-pointer ${
                  settings.resultsReleaseTiming === 'scheduled'
                    ? 'bg-indigo-50/60 border-indigo-300 font-medium'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}>
                  <input
                    type="radio"
                    name="resultsReleaseTiming"
                    checked={settings.resultsReleaseTiming === 'scheduled'}
                    onChange={() => updateSetting('resultsReleaseTiming', 'scheduled')}
                    className="mr-2 text-indigo-600"
                  />
                  <span>On Scheduled Date</span>
                </label>

                <label className={`p-3 rounded-xl border cursor-pointer ${
                  settings.resultsReleaseTiming === 'manual'
                    ? 'bg-indigo-50/60 border-indigo-300 font-medium'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}>
                  <input
                    type="radio"
                    name="resultsReleaseTiming"
                    checked={settings.resultsReleaseTiming === 'manual'}
                    onChange={() => updateSetting('resultsReleaseTiming', 'manual')}
                    className="mr-2 text-indigo-600"
                  />
                  <span>Release Manually</span>
                </label>
              </div>

              {settings.resultsReleaseTiming === 'scheduled' && (
                <div className="pt-2">
                  <input
                    type="datetime-local"
                    value={toLocalDatetimeString(settings.scheduledResultsDate)}
                    onChange={(e) => updateSetting('scheduledResultsDate', fromLocalDatetimeString(e.target.value))}
                    className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              )}
            </div>

            {/* Student Result Visibility Scope */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <label className="block text-xs font-medium text-slate-800">
                What Students See After Results Release
              </label>
              <div className="space-y-2 text-xs">
                <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer ${
                  settings.resultsVisibilityScope === 'score_only'
                    ? 'bg-indigo-50/60 border-indigo-300'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}>
                  <input
                    type="radio"
                    name="resultsVisibilityScope"
                    checked={settings.resultsVisibilityScope === 'score_only'}
                    onChange={() => updateSetting('resultsVisibilityScope', 'score_only')}
                    className="mt-0.5 text-indigo-600"
                  />
                  <div>
                    <span className="font-semibold text-slate-900">Total Score & Percentage Only</span>
                    <p className="text-slate-500 mt-0.5">Students see their overall mark, but questions and answers remain hidden.</p>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer ${
                  settings.resultsVisibilityScope === 'score_answers'
                    ? 'bg-indigo-50/60 border-indigo-300'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}>
                  <input
                    type="radio"
                    name="resultsVisibilityScope"
                    checked={settings.resultsVisibilityScope === 'score_answers'}
                    onChange={() => updateSetting('resultsVisibilityScope', 'score_answers')}
                    className="mt-0.5 text-indigo-600"
                  />
                  <div>
                    <span className="font-semibold text-slate-900">Score + Designated Correct Answers</span>
                    <p className="text-slate-500 mt-0.5">Students see questions and which options were correct, but without step-by-step explanations.</p>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer ${
                  settings.resultsVisibilityScope === 'score_answers_explanations'
                    ? 'bg-indigo-50/60 border-indigo-300'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}>
                  <input
                    type="radio"
                    name="resultsVisibilityScope"
                    checked={settings.resultsVisibilityScope === 'score_answers_explanations'}
                    onChange={() => updateSetting('resultsVisibilityScope', 'score_answers_explanations')}
                    className="mt-0.5 text-indigo-600"
                  />
                  <div>
                    <span className="font-semibold text-slate-900">Score + Correct Answers + Full Explanations (Default)</span>
                    <p className="text-slate-500 mt-0.5">Comprehensive pedagogical review with solutions and rationale.</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Subjective Manual Grading Notice */}
            {hasSubjective && (
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Subjective Evaluation Policy</span>
                </div>
                <p className="text-amber-800 leading-relaxed">
                  This test includes subjective questions. Student attempts will initially show as <strong>Pending Evaluation</strong> with objective scores only, until you manually evaluate subjective answers in the Grading Queue.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 4: REVIEW & CONFIRM ================= */}
        {activeTab === 'review' && (
          <div className="space-y-4 py-1">
            {/* Validation Banner */}
            {!canPublish ? (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-rose-950">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Publication Requirements Incomplete</span>
                </div>
                {validationErrors.length > 0 && (
                  <div>
                    <p className="font-medium">Question Requirements ({validationErrors.length}):</p>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      {validationErrors.map((err, i) => (
                        <li key={i} className="text-rose-800">
                          {err.message}{' '}
                          {err.questionId && (
                            <button
                              type="button"
                              onClick={() => {
                                onJumpToQuestion(err.questionId);
                                onClose();
                              }}
                              className="text-[#4F46E5] underline ml-1 font-medium"
                            >
                              Jump to Question
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {scheduleValidationErrors.length > 0 && (
                  <div>
                    <p className="font-medium">Schedule Requirements:</p>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      {scheduleValidationErrors.map((err, i) => (
                        <li key={i} className="text-rose-800">{err}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-semibold text-emerald-950">All Validation Checks Passed</p>
                  <p className="text-emerald-800 mt-0.5">
                    {questions.length} questions ({totalMarks} marks) verified. All answer keys and timing configurations are valid.
                  </p>
                </div>
              </div>
            )}

            {/* Summary Grid */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3 text-xs">
              <h4 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
                Exam Configuration Summary
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200/70 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Availability & Timing</span>
                  <p className="font-medium text-slate-900">
                    {settings.scheduleType === 'immediate'
                      ? 'Live Immediately on Confirm'
                      : `Scheduled: ${settings.startDate ? formatDateTime(settings.startDate) : 'Not specified'}`}
                  </p>
                  <p className="text-slate-500">
                    Duration: <strong className="text-slate-800">{settings.durationMinutes} min</strong> per student
                  </p>
                  {settings.hasDeadline && settings.deadlineDate && (
                    <p className="text-slate-500">
                      Final Cutoff: {formatDateTime(settings.deadlineDate)}
                    </p>
                  )}
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-slate-200/70 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Access & Security</span>
                  <p className="font-medium text-slate-900">
                    Cohort: {settings.sectionOrCourse || 'General Cohort'}
                  </p>
                  <p className="text-slate-500">
                    Passcode: {settings.isPasswordProtected ? `Required (${settings.accessPassword})` : 'None (Open link)'}
                  </p>
                  <p className="text-slate-500">
                    Attempts: {settings.maxAttempts === 999 ? 'Unlimited' : `${settings.maxAttempts} Attempt`}
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-slate-200/70 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Answer Key Visibility</span>
                  <p className="font-medium text-slate-900 capitalize">
                    {settings.answerReleaseTiming.replace(/_/g, ' ')}
                  </p>
                  <p className="text-slate-500">
                    During Exam: {settings.practiceMode ? 'Practice Feedback ON' : 'Strictly Hidden'}
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-slate-200/70 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Results Release</span>
                  <p className="font-medium text-slate-900 capitalize">
                    {settings.resultsReleaseTiming.replace(/_/g, ' ')}
                  </p>
                  <p className="text-slate-500 capitalize">
                    Scope: {settings.resultsVisibilityScope.replace(/_/g, ' ')}
                  </p>
                </div>
              </div>

              {/* Safety Lock Notice */}
              <div className="p-3 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong>Integrity Safeguard:</strong> Confirming publication locks critical timing, question statements, and answer keys while the exam is live. Safe edits to student instructions remain open.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer Controls */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Save className="w-3.5 h-3.5" />}
              onClick={handleSaveDraft}
              title="Save settings into test without publishing"
            >
              Save Settings as Draft
            </Button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {activeTab !== 'review' ? (
              <Button
                variant="primary"
                size="sm"
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                onClick={() => {
                  if (activeTab === 'schedule') setActiveTab('access');
                  else if (activeTab === 'access') setActiveTab('results');
                  else if (activeTab === 'results') setActiveTab('review');
                }}
              >
                Next Section
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                disabled={!canPublish}
                leftIcon={<Send className="w-4 h-4" />}
                onClick={handleFinalPublish}
              >
                {settings.scheduleType === 'scheduled' ? 'Confirm & Schedule Exam' : 'Confirm & Publish Live'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

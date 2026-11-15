'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Settings,
  Building2,
  Sliders,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Plus,
  Trash2,
  Save,
  ChevronRight,
  Info,
  ShieldAlert,
} from 'lucide-react';
import { TeacherSettings } from '@/types';
import {
  getStoredSettings,
  saveStoredSettings,
  resetSettingsToDefault,
  defaultSettings,
  subscribeToSettings,
} from '@/lib/settingsStore';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

export default function TeacherSettingsPage() {
  const [settings, setSettings] = useState<TeacherSettings>(defaultSettings);
  const [newSubject, setNewSubject] = useState('');
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setSettings(getStoredSettings());
    const unsubscribe = subscribeToSettings(() => {
      setSettings(getStoredSettings());
    });
    return () => unsubscribe();
  }, []);

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newSubject.trim();
    if (!trimmed) return;
    if (settings.subjects.includes(trimmed)) {
      setToastMessage({ type: 'error', text: `Subject "${trimmed}" already exists.` });
      return;
    }
    const updated = {
      ...settings,
      subjects: [...settings.subjects, trimmed],
    };
    setSettings(updated);
    setNewSubject('');
    saveStoredSettings(updated);
    setToastMessage({ type: 'success', text: `Added "${trimmed}" to active subject catalogue.` });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRemoveSubject = (sub: string) => {
    if (settings.subjects.length <= 1) {
      setToastMessage({ type: 'error', text: 'You must maintain at least one active subject.' });
      return;
    }
    const updated = {
      ...settings,
      subjects: settings.subjects.filter((s) => s !== sub),
    };
    setSettings(updated);
    saveStoredSettings(updated);
    setToastMessage({ type: 'success', text: `Removed "${sub}" from subject catalogue.` });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!settings.institutionName.trim()) {
      newErrors.institutionName = 'Institution name cannot be blank.';
    }
    if (settings.defaultDurationMinutes < 5 || settings.defaultDurationMinutes > 360) {
      newErrors.defaultDurationMinutes = 'Default duration must be between 5 and 360 minutes.';
    }
    if (settings.defaultQuestionMarks < 0.5 || settings.defaultQuestionMarks > 100) {
      newErrors.defaultQuestionMarks = 'Question marks must be between 0.5 and 100.';
    }
    if (settings.defaultPassingPercentage < 10 || settings.defaultPassingPercentage > 100) {
      newErrors.defaultPassingPercentage = 'Passing score must be between 10% and 100%.';
    }
    if (settings.defaultNegativeMarking && settings.defaultNegativeMarksPenalty < 0) {
      newErrors.defaultNegativeMarksPenalty = 'Penalty marks cannot be negative.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setToastMessage({ type: 'error', text: 'Please resolve form validation errors below.' });
      return;
    }

    setErrors({});
    const success = saveStoredSettings(settings);
    if (success) {
      setToastMessage({ type: 'success', text: 'Instructor preferences saved to local browser storage.' });
    } else {
      setToastMessage({ type: 'error', text: 'Failed to write settings to local storage.' });
    }
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleConfirmReset = () => {
    const fresh = resetSettingsToDefault();
    setSettings(fresh);
    setIsResetModalOpen(false);
    setToastMessage({ type: 'success', text: 'Preferences successfully reset to system defaults.' });
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Heading & Breadcrumb */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link href="/teacher" className="hover:text-indigo-600 transition-colors">
              Teacher Dashboard
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-medium">Settings & Rubrics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
            Teacher Preferences & Defaults
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Configure institutional profiles, examination defaults, grading policies, and custom subject catalogues.
          </p>
        </div>

        {/* Prototype Transparency Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-xs font-medium text-indigo-900 self-start md:self-auto">
          <Info className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>Local Storage Persistence • Multi-Device Cloud Sync Pending</span>
        </div>
      </div>

      {/* Toast Feedback */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className={`p-3.5 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 shadow-xs animate-in fade-in ${
            toastMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Institutional Affiliation */}
        <div className="p-5 bg-white rounded-xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <Building2 className="w-5 h-5 text-indigo-600" />
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Institutional Profile</h2>
              <p className="text-xs text-slate-500">Academic affiliation displayed on candidate examinations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Institution Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={settings.institutionName}
                onChange={(e) => setSettings({ ...settings, institutionName: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              {errors.institutionName && (
                <p className="text-xs text-rose-600 mt-1">{errors.institutionName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Department
              </label>
              <input
                type="text"
                value={settings.department}
                onChange={(e) => setSettings({ ...settings, department: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Active Academic Term / Semester
              </label>
              <input
                type="text"
                value={settings.academicTerm}
                onChange={(e) => setSettings({ ...settings, academicTerm: e.target.value })}
                placeholder="e.g. Fall Semester 2026"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Exam Authoring Defaults */}
        <div className="p-5 bg-white rounded-xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <Sliders className="w-5 h-5 text-indigo-600" />
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Examination Authoring Defaults</h2>
              <p className="text-xs text-slate-500">Preset values applied automatically when creating new mock exams</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Default Duration (Minutes)
              </label>
              <input
                type="number"
                min="5"
                max="360"
                value={settings.defaultDurationMinutes}
                onChange={(e) =>
                  setSettings({ ...settings, defaultDurationMinutes: parseInt(e.target.value) || 60 })
                }
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              {errors.defaultDurationMinutes && (
                <p className="text-xs text-rose-600 mt-1">{errors.defaultDurationMinutes}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Default Marks per Question
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="100"
                value={settings.defaultQuestionMarks}
                onChange={(e) =>
                  setSettings({ ...settings, defaultQuestionMarks: parseFloat(e.target.value) || 2 })
                }
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              {errors.defaultQuestionMarks && (
                <p className="text-xs text-rose-600 mt-1">{errors.defaultQuestionMarks}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Default Passing Score (%)
              </label>
              <input
                type="number"
                min="10"
                max="100"
                value={settings.defaultPassingPercentage}
                onChange={(e) =>
                  setSettings({ ...settings, defaultPassingPercentage: parseInt(e.target.value) || 60 })
                }
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              {errors.defaultPassingPercentage && (
                <p className="text-xs text-rose-600 mt-1">{errors.defaultPassingPercentage}</p>
              )}
            </div>
          </div>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <label className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100/75 transition-colors">
              <input
                type="checkbox"
                checked={settings.defaultShuffleQuestions}
                onChange={(e) =>
                  setSettings({ ...settings, defaultShuffleQuestions: e.target.checked })
                }
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
              />
              <span className="font-medium text-slate-800">
                Shuffle questions by default for test-takers
              </span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100/75 transition-colors">
              <input
                type="checkbox"
                checked={settings.defaultShuffleOptions}
                onChange={(e) =>
                  setSettings({ ...settings, defaultShuffleOptions: e.target.checked })
                }
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
              />
              <span className="font-medium text-slate-800">
                Randomize MCQ answer options order
              </span>
            </label>
          </div>
        </div>

        {/* Section 3: Evaluation & Negative Marking */}
        <div className="p-5 bg-white rounded-xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <ShieldAlert className="w-5 h-5 text-indigo-600" />
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Grading & Negative Marking Policy</h2>
              <p className="text-xs text-slate-500">Configure penalty weights for incorrect objective responses</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <input
                id="neg-marking"
                type="checkbox"
                checked={settings.defaultNegativeMarking}
                onChange={(e) =>
                  setSettings({ ...settings, defaultNegativeMarking: e.target.checked })
                }
                className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
              />
              <div>
                <label htmlFor="neg-marking" className="text-sm font-medium text-slate-900 cursor-pointer">
                  Enable Negative Marking by Default
                </label>
                <p className="text-xs text-slate-500 mt-0.5">
                  Deduct penalty marks for wrong answers on competitive exam formats (e.g. JEE, NEET, GRE).
                </p>
              </div>
            </div>

            {settings.defaultNegativeMarking && (
              <div className="max-w-xs pl-7">
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Default Penalty Deduction per Incorrect Answer
                </label>
                <input
                  type="number"
                  step="0.25"
                  min="0"
                  max="5"
                  value={settings.defaultNegativeMarksPenalty}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      defaultNegativeMarksPenalty: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                {errors.defaultNegativeMarksPenalty && (
                  <p className="text-xs text-rose-600 mt-1">{errors.defaultNegativeMarksPenalty}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Subject Catalog Management */}
        <div className="p-5 bg-white rounded-xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <Building2 className="w-5 h-5 text-indigo-600" />
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Active Subject Catalogue</h2>
              <p className="text-xs text-slate-500">Manage the academic subjects available when creating assessments</p>
            </div>
          </div>

          {/* Add Subject Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder="Enter new subject name (e.g. Astrophysics, Microeconomics)..."
              className="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <Button
              variant="outline"
              size="md"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={handleAddSubject}
              disabled={!newSubject.trim()}
            >
              Add Subject
            </Button>
          </div>

          {/* Subject Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            {settings.subjects.map((sub) => (
              <span
                key={sub}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-xs font-medium text-slate-800 border border-slate-200"
              >
                <span>{sub}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSubject(sub)}
                  className="text-slate-400 hover:text-rose-600 p-0.5 rounded transition-colors"
                  aria-label={`Remove subject ${sub}`}
                  title={`Remove ${sub}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Form Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Button
            variant="outline"
            size="md"
            type="button"
            className="text-rose-700 hover:bg-rose-50 border-rose-200"
            leftIcon={<RotateCcw className="w-4 h-4" />}
            onClick={() => setIsResetModalOpen(true)}
          >
            Reset to Defaults
          </Button>

          <div className="flex items-center gap-2.5">
            <Button
              variant="primary"
              size="md"
              type="submit"
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save Instructor Preferences
            </Button>
          </div>
        </div>
      </form>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Reset Preferences to Defaults?"
        description="This will restore all default exam durations, pass percentages, and system subjects."
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">
            Are you sure you want to reset your customized teacher preferences? Any custom subjects or duration rules will be returned to initial installation defaults.
          </p>

          <div className="flex justify-end gap-2.5 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsResetModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleConfirmReset}
            >
              Reset to Defaults
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

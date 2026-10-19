'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { MockTest, TestStatus } from '@/types';
import { subjectOptions } from '@/data/mockData';
import { BookOpen, Clock, HelpCircle, Layers, CheckCircle } from 'lucide-react';

interface CreateTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTestCreated: (test: MockTest) => void;
}

export const CreateTestModal: React.FC<CreateTestModalProps> = ({
  isOpen,
  onClose,
  onTestCreated,
}) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState(subjectOptions[1] || 'Physics');
  const [questionCount, setQuestionCount] = useState<number>(30);
  const [durationMinutes, setDurationMinutes] = useState<number>(60);
  const [status, setStatus] = useState<TestStatus>('draft');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Test title is required';
    }
    if (questionCount < 1 || questionCount > 200) {
      newErrors.questionCount = 'Question count must be between 1 and 200';
    }
    if (durationMinutes < 5 || durationMinutes > 360) {
      newErrors.durationMinutes = 'Duration must be between 5 and 360 minutes';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newTest: MockTest = {
      id: `test-${Date.now().toString().slice(-4)}`,
      title: title.trim(),
      subject,
      questionCount,
      durationMinutes,
      totalAttempts: 0,
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onTestCreated(newTest);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      setTitle('');
      setQuestionCount(30);
      setDurationMinutes(60);
      setStatus('draft');
      setErrors({});
      onClose();
    }, 1200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Mock Test"
      description="Create a test definition in local memory for this teacher dashboard."
      maxWidth="lg"
    >
      {isSuccess ? (
        <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
          <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">
            Mock Test Created Successfully!
          </h3>
          <p className="text-sm text-slate-500 max-w-sm">
            Added to your in-memory test list. Note: this session persists only in local memory until backend integration is added.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Test Title */}
          <div>
            <label
              htmlFor="test-title"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
            >
              Test Title *
            </label>
            <input
              id="test-title"
              type="text"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
              }}
              placeholder="e.g. AP Chemistry: Equilibrium & Kinetics Practice"
              className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                errors.title ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
              }`}
            />
            {errors.title && (
              <p className="text-xs text-rose-600 mt-1">{errors.title}</p>
            )}
          </div>

          {/* Subject & Status Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="test-subject"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
              >
                Subject *
              </label>
              <select
                id="test-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                {subjectOptions
                  .filter((s) => s !== 'All Subjects')
                  .map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="test-status"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
              >
                Initial Status
              </label>
              <select
                id="test-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as TestStatus)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                <option value="draft">Draft (Unpublished)</option>
                <option value="scheduled">Scheduled</option>
                <option value="published">Published (Live)</option>
              </select>
            </div>
          </div>

          {/* Questions & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="test-questions"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
              >
                Question Count *
              </label>
              <div className="relative">
                <input
                  id="test-questions"
                  type="number"
                  min="1"
                  max="200"
                  value={questionCount}
                  onChange={(e) =>
                    setQuestionCount(parseInt(e.target.value, 10) || 0)
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400">
                  questions
                </span>
              </div>
              {errors.questionCount && (
                <p className="text-xs text-rose-600 mt-1">{errors.questionCount}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="test-duration"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
              >
                Duration (Minutes) *
              </label>
              <div className="relative">
                <input
                  id="test-duration"
                  type="number"
                  min="5"
                  max="360"
                  value={durationMinutes}
                  onChange={(e) =>
                    setDurationMinutes(parseInt(e.target.value, 10) || 0)
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400">
                  minutes
                </span>
              </div>
              {errors.durationMinutes && (
                <p className="text-xs text-rose-600 mt-1">
                  {errors.durationMinutes}
                </p>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Test
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

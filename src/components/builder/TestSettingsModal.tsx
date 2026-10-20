'use client';

import React, { useState, useEffect } from 'react';
import { MockTest } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { subjectOptions } from '@/data/mockData';

interface TestSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  test: MockTest;
  onSaveSettings: (updatedFields: Partial<MockTest>) => void;
}

export const TestSettingsModal: React.FC<TestSettingsModalProps> = ({
  isOpen,
  onClose,
  test,
  onSaveSettings,
}) => {
  const [title, setTitle] = useState(test.title);
  const [subject, setSubject] = useState(test.subject);
  const [durationMinutes, setDurationMinutes] = useState(test.durationMinutes);
  const [instructions, setInstructions] = useState(test.instructions || '');

  useEffect(() => {
    if (isOpen) {
      setTitle(test.title);
      setSubject(test.subject);
      setDurationMinutes(test.durationMinutes);
      setInstructions(test.instructions || '');
    }
  }, [isOpen, test]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings({
      title: title.trim() || test.title,
      subject,
      durationMinutes: Math.max(5, durationMinutes),
      instructions: instructions.trim() || undefined,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Examination Settings"
      description="Update test metadata, allowed duration, and candidate instructions."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Test Title */}
        <div>
          <label htmlFor="edit-test-title" className="block text-xs font-medium text-slate-700 mb-1">
            Test Title <span className="text-rose-500">*</span>
          </label>
          <input
            id="edit-test-title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        {/* Subject & Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="edit-test-subject" className="block text-xs font-medium text-slate-700 mb-1">
              Subject
            </label>
            <select
              id="edit-test-subject"
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
            <label htmlFor="edit-test-duration" className="block text-xs font-medium text-slate-700 mb-1">
              Duration (Minutes)
            </label>
            <input
              id="edit-test-duration"
              type="number"
              min="5"
              max="360"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(parseInt(e.target.value, 10) || 60)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>

        {/* Candidate Instructions */}
        <div>
          <label htmlFor="edit-test-instructions" className="block text-xs font-medium text-slate-700 mb-1">
            Candidate Instructions (Optional)
          </label>
          <textarea
            id="edit-test-instructions"
            rows={3}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="e.g. Non-programmable scientific calculators are permitted. Read all questions carefully."
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 font-sans"
          />
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <Button variant="outline" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit">
            Save Settings
          </Button>
        </div>
      </form>
    </Modal>
  );
};

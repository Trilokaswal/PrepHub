'use client';

import React from 'react';
import { X, GraduationCap } from 'lucide-react';
import { StudentAuthCard, StudentAuthTab } from './StudentAuthCard';

interface StudentAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: StudentAuthTab;
}

export const StudentAuthModal: React.FC<StudentAuthModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'signin',
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden transform transition-all p-6 sm:p-7 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close student authentication modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Auth Content */}
        <StudentAuthCard
          initialTab={defaultTab}
          isModal={true}
          onSuccessRedirect={onClose}
        />
      </div>
    </div>
  );
};

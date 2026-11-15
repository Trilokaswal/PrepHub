'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LayoutDashboard, LogIn, BookOpen, ShieldCheck } from 'lucide-react';
import { authStore } from '@/lib/authStore';
import { AuthUser } from '@/types';

interface LandingNavAuthProps {
  onOpenStudentModal?: () => void;
}

export const LandingNavAuth: React.FC<LandingNavAuthProps> = ({ onOpenStudentModal }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setCurrentUser(authStore.getCurrentUser());
    const unsubscribe = authStore.subscribe(() => {
      setCurrentUser(authStore.getCurrentUser());
    });
    return () => unsubscribe();
  }, []);

  if (!isMounted) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/student/login"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <span>Student Login</span>
        </Link>
        <Link
          href="/teacher/login"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-2xs"
        >
          <span>Teacher Login</span>
        </Link>
      </div>
    );
  }

  if (currentUser) {
    return (
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>Signed in as <strong className="text-slate-800">{currentUser.name}</strong> ({currentUser.role})</span>
        </span>
        <Link
          href={currentUser.role === 'student' ? '/student' : '/teacher'}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-[#4F46E5] text-white hover:bg-[#4338CA] transition-colors shadow-xs"
        >
          <LayoutDashboard className="w-4 h-4" strokeWidth={1.75} />
          <span>{currentUser.role === 'student' ? 'Student Portal' : 'Teacher Dashboard'}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {onOpenStudentModal ? (
        <button
          type="button"
          onClick={onOpenStudentModal}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 text-slate-500" strokeWidth={1.75} />
          <span>Student Login</span>
        </button>
      ) : (
        <Link
          href="/student/login"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5 text-slate-500" strokeWidth={1.75} />
          <span>Student Login</span>
        </Link>
      )}
      <Link
        href="/teacher/login"
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-2xs"
      >
        <ShieldCheck className="w-3.5 h-3.5 text-slate-300" strokeWidth={1.75} />
        <span>Teacher Login</span>
      </Link>
    </div>
  );
};

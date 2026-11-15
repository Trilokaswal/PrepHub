'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { StudentHeader } from './StudentHeader';

interface StudentShellProps {
  children: React.ReactNode;
}

export const StudentShell: React.FC<StudentShellProps> = ({ children }) => {
  const pathname = usePathname();
  const isExamRoute = pathname?.includes('/student/exam/');
  const isLoginPage = pathname === '/student/login';

  // If inside an active exam or on the login page, render clean full-width layout without dashboard header and padding
  if (isExamRoute || isLoginPage) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 flex flex-col font-sans text-slate-900 antialiased selection:bg-indigo-100 selection:text-indigo-900">
        {children}
      </div>
    );
  }

  // Regular Student Portal Dashboard view
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <StudentHeader />
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import Link from 'next/link';
import { StudentAuthCard } from './StudentAuthCard';
import { PrepHubLogo } from '@/components/brand/PrepHubLogo';

export const StudentLoginPageView: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 flex flex-col justify-between font-sans">
      {/* Top Header */}
      <header className="px-6 py-4 max-w-6xl mx-auto w-full flex items-center justify-between">
        <PrepHubLogo href="/" tagline="CANDIDATE PORTAL" size="md" />

        {/* Student Portal Badge */}
        <span className="text-xs font-semibold text-[#4F46E5] bg-indigo-50 border border-indigo-200/80 px-3 py-1 rounded-full">
          Candidate Portal
        </span>
      </header>

      {/* Main Centered Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6">
        <div className="max-w-lg w-full bg-white border border-slate-200/90 rounded-2xl shadow-sm p-6 sm:p-8">
          <StudentAuthCard isModal={false} />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-400">
        PrepHub Academic Assessment &bull; Secure Student &amp; Candidate Portal
      </footer>
    </div>
  );
};

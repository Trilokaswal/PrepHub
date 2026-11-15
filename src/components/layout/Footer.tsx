'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PrepHubLogo } from '@/components/brand/PrepHubLogo';
import { authStore } from '@/lib/authStore';

export const Footer: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(authStore.isAuthenticated());
    const unsub = authStore.subscribe(() => {
      setIsLoggedIn(authStore.isAuthenticated());
    });
    return () => unsub();
  }, []);

  // Helper: if authenticated, go directly to target; if not, redirect to login
  const getAuthLink = (targetPath: string) => {
    if (isLoggedIn) return targetPath;
    return `/login?redirect=${encodeURIComponent(targetPath)}`;
  };

  return (
    <footer className="bg-[#111A2E] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Left Brand Col */}
          <div className="lg:col-span-1 space-y-4">
            <PrepHubLogo isLight={true} />
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              A focused, distraction-free mock test platform. Practice with realistic, timed exams
              and get instant, question-by-question feedback.
            </p>
          </div>

          {/* Subjects Col */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono font-bold tracking-wider uppercase text-slate-200 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#E14D45] rounded-xs" />
              <span>SUBJECTS</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href={getAuthLink('/courses/btech')} className="hover:text-white transition-colors">
                  Mathematics
                </Link>
              </li>
              <li>
                <Link href={getAuthLink('/courses/btech')} className="hover:text-white transition-colors">
                  Science
                </Link>
              </li>
              <li>
                <Link href={getAuthLink('/courses/bca')} className="hover:text-white transition-colors">
                  English
                </Link>
              </li>
              <li>
                <Link href={getAuthLink('/courses/btech')} className="hover:text-white transition-colors">
                  Programming
                </Link>
              </li>
              <li>
                <Link href={getAuthLink('/courses/bba')} className="hover:text-white transition-colors">
                  Business Studies
                </Link>
              </li>
              <li>
                <Link href={getAuthLink('/courses/ba')} className="hover:text-white transition-colors">
                  General Knowledge
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses Col */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono font-bold tracking-wider uppercase text-slate-200 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#E14D45] rounded-xs" />
              <span>COURSES</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href={getAuthLink('/courses/btech')} className="hover:text-white transition-colors">
                  B.Tech
                </Link>
              </li>
              <li>
                <Link href={getAuthLink('/courses/bca')} className="hover:text-white transition-colors">
                  BCA
                </Link>
              </li>
              <li>
                <Link href={getAuthLink('/courses/bba')} className="hover:text-white transition-colors">
                  BBA
                </Link>
              </li>
              <li>
                <Link href={getAuthLink('/courses/ba')} className="hover:text-white transition-colors">
                  BA
                </Link>
              </li>
              <li>
                <Link href={getAuthLink('/courses/bsc')} className="hover:text-white transition-colors">
                  BSc
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore Col */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono font-bold tracking-wider uppercase text-slate-200 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#E14D45] rounded-xs" />
              <span>EXPLORE</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href={getAuthLink('/courses')} className="hover:text-white transition-colors">
                  Mock tests
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Ready When You Are Col (Start a test button removed) */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono font-bold tracking-wider uppercase text-slate-200 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#E14D45] rounded-xs" />
              <span>READY WHEN YOU ARE</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pick a subject, start a timed test, and review your answers the moment you finish.
            </p>
            <div className="pt-2 text-[11px] font-mono text-slate-500">
              Official university semester mock examinations and automated diagnostic review arena.
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <span>&copy; 2026 PrepHub</span>
          <span>Built for focus. Designed for results.</span>
          <Link href="/privacy" className="hover:text-slate-400 transition-colors">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

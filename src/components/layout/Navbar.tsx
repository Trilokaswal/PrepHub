'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogIn, LogOut, User } from 'lucide-react';
import { PrepHubLogo } from '@/components/brand/PrepHubLogo';
import { authStore } from '@/lib/authStore';
import { AuthUser } from '@/types';

interface NavbarProps {
  activeTab?: 'home' | 'mock-tests' | 'about';
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const isHome = activeTab ? activeTab === 'home' : pathname === '/';
  const isMockTests = activeTab
    ? activeTab === 'mock-tests'
    : pathname.startsWith('/courses') || pathname.startsWith('/tests') || pathname.startsWith('/student');
  const isAbout = activeTab ? activeTab === 'about' : pathname === '/about';
  const isPrivacy = pathname === '/privacy';

  useEffect(() => {
    setIsMounted(true);
    setCurrentUser(authStore.getCurrentUser());
    const unsubscribe = authStore.subscribe(() => {
      setCurrentUser(authStore.getCurrentUser());
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    authStore.logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: PrepHub Logo */}
        <div className="shrink-0">
          <PrepHubLogo />
        </div>

        {/* Center: Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`relative py-5 text-xs font-semibold tracking-tight transition-colors ${
              isHome ? 'text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Home
            {isHome && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E14D45] rounded-full" />
            )}
          </Link>

          {/* Mock tests link: ONLY visible to authenticated users on platform pages (never on Home or About) */}
          {currentUser && !isHome && !isAbout && (
            <Link
              href="/courses"
              className={`relative py-5 text-xs font-semibold tracking-tight transition-colors ${
                isMockTests ? 'text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Mock tests
              {isMockTests && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E14D45] rounded-full" />
              )}
            </Link>
          )}

          <Link
            href="/about"
            className={`relative py-5 text-xs font-semibold tracking-tight transition-colors ${
              isAbout ? 'text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            About
            {isAbout && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E14D45] rounded-full" />
            )}
          </Link>
        </nav>

        {/* Right Action Area */}
        <div className="flex items-center gap-2.5">
          {/* On public pages (Home, About, Privacy), never show Profile or Logout — strictly display the Log in button */}
          {isMounted && currentUser && !isHome && !isAbout && !isPrivacy ? (
            <div className="flex items-center gap-2">
              <Link
                href="/profile"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-800 text-xs font-semibold border border-slate-200/90 shadow-2xs transition-all hover:border-[#E14D45]/40"
                title="View User Profile & Dashboard"
              >
                <User className="w-3.5 h-3.5 text-[#E14D45]" />
                <span className="hidden sm:inline">{currentUser.name.split(' ')[0]}</span>
                <span className="sm:hidden">Profile</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-medium transition-colors cursor-pointer"
                title="Log out of PrepHub"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log out</span>
              </button>
            </div>
          ) : (
            /* On the first page or when logged out: strictly display the Log in button */
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 rounded-lg bg-[#E14D45] hover:bg-[#CC3F37] active:scale-[0.98] text-white text-xs font-bold tracking-tight shadow-xs transition-all cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log in</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

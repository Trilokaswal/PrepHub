'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  GraduationCap,
  BookOpen,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Loader2,
  User,
  ExternalLink,
} from 'lucide-react';
import { authStore, DEMO_CREDENTIALS } from '@/lib/authStore';
import { UserRole } from '@/types';
import { PrepHubLogo } from '@/components/brand/PrepHubLogo';

interface PortalLoginViewProps {
  portalRole: UserRole;
}

export const PortalLoginView: React.FC<PortalLoginViewProps> = ({ portalRole }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [roleMismatch, setRoleMismatch] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // If already authenticated with the correct role, redirect immediately
    const session = authStore.getSession();
    if (session.isAuthenticated && session.user?.role === portalRole) {
      router.replace(portalRole === 'teacher' ? '/teacher' : '/student');
    }
  }, [portalRole, router]);

  const handleFillDemo = () => {
    if (portalRole === 'teacher') {
      setEmail(DEMO_CREDENTIALS.teacher.email);
      setPassword(DEMO_CREDENTIALS.teacher.password);
    } else {
      setEmail(DEMO_CREDENTIALS.student.email);
      setPassword(DEMO_CREDENTIALS.student.password);
    }
    setErrorMessage(null);
    setRoleMismatch(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setRoleMismatch(false);
    setSuccessMessage(null);
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 350));

    const result = authStore.login(email, password, portalRole);

    if (!result.success) {
      setIsLoading(false);
      setErrorMessage(result.error || 'Authentication failed. Please verify your credentials.');
      if (result.roleMismatch) {
        setRoleMismatch(true);
      }
      return;
    }

    setSuccessMessage(`Welcome back, ${result.user?.name}! Loading ${portalRole === 'teacher' ? 'Educator Dashboard' : 'Student Portal'}...`);
    setIsLoading(false);

    setTimeout(() => {
      const destination =
        redirectTarget && redirectTarget.startsWith(`/${portalRole}`)
          ? redirectTarget
          : portalRole === 'teacher'
          ? '/teacher'
          : '/student';
      router.push(destination);
    }, 600);
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Loader2 className="w-8 h-8 text-[#4F46E5] animate-spin" />
      </div>
    );
  }

  const isTeacher = portalRole === 'teacher';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 flex flex-col justify-between font-sans">
      {/* Top Bar with Brand Link */}
      <header className="px-6 py-4 max-w-7xl mx-auto w-full flex items-center justify-between">
        <PrepHubLogo href="/" tagline={isTeacher ? 'TEACHER PORTAL' : 'STUDENT PORTAL'} size="md" />

        {/* Portal switcher link */}
        <Link
          href={isTeacher ? '/student/login' : '/teacher/login'}
          className="text-xs sm:text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5"
        >
          <span>{isTeacher ? 'Switch to Student Portal' : 'Switch to Teacher Portal'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </header>

      {/* Main Login Card Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6">
        <div className="max-w-md w-full bg-white border border-slate-200/90 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
          {/* Header & Role Badge */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200/80 text-[#4F46E5]">
              {isTeacher ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Faculty &amp; Educator Access</span>
                </>
              ) : (
                <>
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Candidate &amp; Student Access</span>
                </>
              )}
            </div>

            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {isTeacher ? 'Educator Sign In' : 'Student Portal Login'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
              {isTeacher
                ? 'Sign in with your instructor account to manage assessments and evaluate cohorts.'
                : 'Sign in with your student credentials to take mock exams and review performance.'}
            </p>
          </div>

          {/* One-Click Demo Preset Banner */}
          <div className="p-3 bg-slate-50 border border-slate-200/90 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600">Quick Demo Account:</span>
              <span className="text-[11px] text-slate-400">Pre-configured</span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-white hover:bg-indigo-50/60 active:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-semibold shadow-2xs transition-all cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>
                {isTeacher
                  ? 'Fill Demo Teacher (Dr. Sarah Jenkins)'
                  : 'Fill Demo Student'}
              </span>
            </button>
          </div>

          {/* Success Banner */}
          {successMessage && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-xs text-emerald-800 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl space-y-2 text-xs text-rose-800 animate-in fade-in">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
              {roleMismatch && (
                <div className="pt-1.5 border-t border-rose-200/60 flex items-center justify-end">
                  <Link
                    href={isTeacher ? '/student/login' : '/teacher/login'}
                    className="inline-flex items-center gap-1 font-bold text-rose-900 hover:underline"
                  >
                    <span>Open {isTeacher ? 'Student Portal' : 'Teacher Portal'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5 text-left">
              <label
                htmlFor="portal-email"
                className="block text-xs font-semibold text-slate-700 tracking-wide"
              >
                Institutional Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="portal-email"
                  type="email"
                  required
                  placeholder={isTeacher ? 'faculty@prephub.edu' : 'student@prephub.edu'}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage(null);
                    setRoleMismatch(false);
                  }}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="portal-password"
                  className="block text-xs font-semibold text-slate-700 tracking-wide"
                >
                  Password
                </label>
                <span className="text-[11px] text-slate-400">Demo: password123</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="portal-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage(null);
                    setRoleMismatch(false);
                  }}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50/50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-[#4F46E5] focus:ring-[#4F46E5]"
                />
                <span>Remember session</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] text-white font-semibold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In as {isTeacher ? 'Teacher' : 'Student'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Institutional Provisioning Notice for Teachers */}
          {isTeacher && (
            <div className="p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl text-[11px] text-amber-800 leading-relaxed text-left flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Educator accounts must be verified through institutional onboarding. If you are
                registering a new faculty account, you will need an official authorization key.
              </span>
            </div>
          )}

          {/* Bottom Links: Create Account & Alternative Portal */}
          <div className="pt-4 border-t border-slate-100 text-center space-y-2 text-xs">
            <p className="text-slate-500">
              Don&apos;t have an account?{' '}
              <Link
                href={`/register?role=${portalRole}`}
                className="font-semibold text-[#4F46E5] hover:underline"
              >
                Create an account
              </Link>
            </p>
            <p className="text-slate-400">
              {isTeacher ? (
                <>
                  Are you a student taking a test?{' '}
                  <Link href="/student/login" className="font-semibold text-slate-700 hover:underline">
                    Go to Student Portal
                  </Link>
                </>
              ) : (
                <>
                  Are you an educator or instructor?{' '}
                  <Link href="/teacher/login" className="font-semibold text-slate-700 hover:underline">
                    Go to Teacher Portal
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-400">
        PrepHub Academic Assessment &bull; Secure Role-Based Authentication
      </footer>
    </div>
  );
};

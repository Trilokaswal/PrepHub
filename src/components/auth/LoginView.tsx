'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { authStore, DEMO_CREDENTIALS } from '@/lib/authStore';
import { rateLimiter, sanitizeInput } from '@/lib/security/rateLimiter';
import { UserRole, AuthUser } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { PrepHubLogo } from '@/components/brand/PrepHubLogo';
import { LoginReceptionIllustration } from './LoginReceptionIllustration';
import { GoogleIcon, MicrosoftIcon, AppleIcon } from './SocialIcons';

export const LoginView: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/courses';
  const initialRole = (searchParams.get('role') as UserRole) || 'student';

  const [role, setRole] = useState<UserRole>(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeUser, setActiveUser] = useState<AuthUser | null>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  // Forward mouse wheel scrolling from the stable left side to the right scrollable login card
  const handleLeftWheel = (e: React.WheelEvent) => {
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollTop += e.deltaY;
    }
  };

  useEffect(() => {
    setIsMounted(true);
    setActiveUser(authStore.getCurrentUser());
    const unsubscribe = authStore.subscribe(() => {
      setActiveUser(authStore.getCurrentUser());
    });
    return () => unsubscribe();
  }, []);

  // Check if current email input is valid format
  const isEmailValid = Boolean(email && email.includes('@') && email.includes('.'));

  // Quick Demo Account Autofill
  const handleFillDemo = useCallback((selectedRole: UserRole) => {
    setRole(selectedRole);
    if (selectedRole === 'teacher') {
      setEmail(DEMO_CREDENTIALS.teacher.email);
      setPassword(DEMO_CREDENTIALS.teacher.password);
    } else {
      setEmail(DEMO_CREDENTIALS.student.email);
      setPassword(DEMO_CREDENTIALS.student.password);
    }
    setErrorMessage(null);
  }, []);

  // Standard Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const sanitizedEmail = sanitizeInput(email).toLowerCase();
    const lockout = rateLimiter.isLockedOut(sanitizedEmail);
    if (lockout.locked) {
      setErrorMessage(`Too many failed attempts. Please wait ${lockout.remainingSeconds}s before trying again.`);
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 350));

    const result = authStore.isSupabaseActive()
      ? await authStore.loginWithSupabase(sanitizedEmail, password, role)
      : authStore.login(sanitizedEmail, password, role);

    if (!result.success) {
      const lockStatus = rateLimiter.recordFailedAttempt(sanitizedEmail);
      if (lockStatus.locked) {
        setErrorMessage(`Too many failed attempts. Login temporarily locked for ${lockStatus.remainingSeconds}s.`);
      } else {
        setErrorMessage(result.error || 'Authentication failed. Please verify your credentials.');
      }
      setIsLoading(false);
      return;
    }

    rateLimiter.resetAttempts(sanitizedEmail);
    setSuccessMessage(`Welcome back, ${result.user?.name}!`);
    setIsLoading(false);

    setTimeout(() => {
      if (result.user?.role === 'teacher') {
        router.push('/teacher');
      } else {
        router.push(redirectTarget);
      }
    }, 500);
  };

  // Direct 1-Click Social Sign-In (Google, Microsoft, Apple)
  const handleSocialLogin = async (provider: 'Google' | 'Microsoft' | 'Apple') => {
    setErrorMessage(null);
    setSocialLoading(provider);

    if (authStore.isSupabaseActive()) {
      const oauthProvider = provider === 'Google' ? 'google' : provider === 'Microsoft' ? 'azure' : 'apple';
      const result = await authStore.loginWithOAuth(oauthProvider);
      if (!result.success) {
        setErrorMessage(result.error || `Failed to authenticate with ${provider}.`);
        setSocialLoading(null);
      }
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 400));

    // Choose target account based on provider
    const targetEmail =
      provider === 'Microsoft'
        ? DEMO_CREDENTIALS.teacher.email
        : DEMO_CREDENTIALS.student.email;

    const result = authStore.login(targetEmail, 'password123');

    if (!result.success) {
      setErrorMessage(`Failed to authenticate with ${provider}.`);
      setSocialLoading(null);
      return;
    }

    setSuccessMessage(`Signed in with ${provider}! Redirecting...`);
    setSocialLoading(null);

    setTimeout(() => {
      if (result.user?.role === 'teacher') {
        router.push('/teacher');
      } else {
        router.push(redirectTarget);
      }
    }, 450);
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Loader2 className="w-8 h-8 text-[#E14D45] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:h-screen lg:max-h-screen bg-transparent flex flex-col font-sans text-slate-900 selection:bg-[#E14D45]/15 selection:text-[#E14D45] lg:overflow-hidden">
      {/* Top Navigation Bar with Logo */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between shrink-0 z-20">
        <PrepHubLogo />

        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
          <span>Need help?</span>
          <Link
            href="/about"
            className="font-medium text-[#E14D45] hover:text-[#CC3F37] underline underline-offset-4"
          >
            About PrepHub
          </Link>
        </div>
      </header>

      {/* Main Split Screen Content */}
      <main className="flex-1 min-h-0 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-3 sm:pb-4 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 overflow-hidden">
        {/* ============================================================== */}
        {/* LEFT COLUMN: Reception Desk Illustration (Stable & Enlarged)   */}
        {/* ============================================================== */}
        <div
          onWheel={handleLeftWheel}
          className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center space-y-6 shrink-0 h-full select-none pr-2 xl:pr-6"
        >
          <div className="w-full max-w-[540px] xl:max-w-[620px] drop-shadow-sm transition-transform duration-300 hover:scale-[1.01]">
            <LoginReceptionIllustration className="w-full" />
          </div>

          <div className="text-center space-y-1.5 max-w-md">
            <p className="text-xs font-bold tracking-wider text-slate-700 uppercase">
              Welcome to PrepHub Platform
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Official examination arena, syllabus mock tests, and timed assessment system.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: Independently Scrollable Log In Panel            */}
        {/* ============================================================== */}
        <div
          ref={rightPanelRef}
          className="w-full lg:w-1/2 h-full max-h-full overflow-y-auto overflow-x-hidden py-3 lg:py-6 px-1 sm:px-3 flex flex-col items-center justify-start [scrollbar-width:thin] [scrollbar-color:rgba(148,163,184,0.45)_transparent] hover:[scrollbar-color:rgba(148,163,184,0.75)_transparent]"
        >
          <div className="w-full max-w-lg space-y-5 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-9 border border-slate-200/80 shadow-xl shadow-slate-900/5 my-auto">
            {/* Header: Welcome Back :) + Subtitle with Bell emoji */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Welcome Back :)
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                To keep connected with us please login with your personal information by email address
                and password <span aria-hidden="true">🔔</span>
              </p>
            </div>

            {/* Active Session Notice (Shown if user is already signed in, without forcing auto-redirect) */}
            {activeUser && (
              <div className="p-3 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-amber-900 text-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate">
                    Signed in as <strong className="font-semibold">{activeUser.name}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={activeUser.role === 'teacher' ? '/teacher' : '/courses'}
                    className="font-bold text-[#E14D45] hover:text-[#CC3F37] underline text-[11px]"
                  >
                    Continue to {activeUser.role === 'teacher' ? 'Teacher Portal' : 'Courses'} &rarr;
                  </Link>
                  <span className="text-slate-300">|</span>
                  <button
                    type="button"
                    onClick={() => {
                      authStore.logout();
                      setActiveUser(null);
                    }}
                    className="text-slate-500 hover:text-slate-800 text-[11px] underline cursor-pointer"
                  >
                    Log out
                  </button>
                </div>
              </div>
            )}

            {/* Quick Demo Fill Pill Helper */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px]">
              <span className="font-semibold text-slate-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E14D45]" />
                <span>Quick Demo:</span>
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleFillDemo('student')}
                  className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold hover:border-[#E14D45] hover:text-[#E14D45] transition-colors cursor-pointer"
                >
                  Student (Alex)
                </button>
                <button
                  type="button"
                  onClick={() => handleFillDemo('teacher')}
                  className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold hover:border-slate-800 transition-colors cursor-pointer"
                >
                  Educator
                </button>
              </div>
            </div>

            {/* Feedback Alerts */}
            {errorMessage && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="leading-relaxed">{errorMessage}</div>
              </div>
            )}

            {successMessage && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <div className="font-medium">{successMessage}</div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Boxed Input Container for Email & Password */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 divide-y divide-slate-200/80 overflow-hidden shadow-2xs">
                {/* 1. Email Address Field */}
                <div className="p-3 sm:p-4 space-y-1 bg-white focus-within:bg-white transition-colors">
                  <label
                    htmlFor="email-address"
                    className="block text-[11px] font-medium text-slate-400 select-none"
                  >
                    Email Address
                  </label>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-slate-400 shrink-0" strokeWidth={1.5} />
                    <input
                      id="email-address"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Justin@ghostlamp.io"
                      className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-800 placeholder:text-slate-300 focus:outline-none"
                    />
                    {isEmailValid && (
                      <CheckCircle2
                        className="w-5 h-5 text-emerald-500 shrink-0"
                        strokeWidth={2.25}
                        aria-label="Valid email format"
                      />
                    )}
                  </div>
                </div>

                {/* 2. Password Field */}
                <div className="p-3 sm:p-4 space-y-1 bg-white focus-within:bg-white transition-colors">
                  <label
                    htmlFor="login-password"
                    className="block text-[11px] font-medium text-slate-400 select-none"
                  >
                    Password
                  </label>
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-slate-400 shrink-0" strokeWidth={1.5} />
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-800 placeholder:text-slate-300 focus:outline-none tracking-widest"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-slate-600 focus:outline-none shrink-0 cursor-pointer"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" strokeWidth={1.75} />
                      ) : (
                        <Eye className="w-4 h-4" strokeWidth={1.75} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Remember Me & Forget Password Row */}
              <div className="flex items-center justify-between text-xs pt-1 select-none">
                <button
                  type="button"
                  onClick={() => setRememberMe(!rememberMe)}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                      rememberMe ? 'bg-emerald-500 text-white' : 'border border-slate-300 bg-white'
                    }`}
                  >
                    {rememberMe && (
                      <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 stroke-white stroke-[2.5]">
                        <polyline points="3 8 6.5 11.5 13 5" />
                      </svg>
                    )}
                  </div>
                  <span className="font-medium text-slate-700">Remember Me</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="font-medium text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  Forget Password?
                </button>
              </div>

              {/* Action Buttons: Login Now + Create Account */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
                {/* Primary Button: Login Now (Pill styled with PrepHub theme) */}
                <button
                  type="submit"
                  disabled={isLoading || Boolean(socialLoading)}
                  className="w-full sm:w-auto sm:flex-1 py-3 px-8 rounded-full bg-[#E14D45] hover:bg-[#CC3F37] active:scale-[0.98] text-white font-bold text-sm shadow-md shadow-[#E14D45]/20 transition-all disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <span>Login Now</span>
                  )}
                </button>

                {/* Secondary Button: Create Account (Pill styled) */}
                <Link
                  href="/register"
                  className="w-full sm:w-auto sm:flex-1 py-3 px-8 rounded-full bg-white hover:bg-slate-50 active:scale-[0.98] text-slate-700 hover:text-slate-900 border border-slate-200/90 font-bold text-sm text-center shadow-2xs transition-all cursor-pointer"
                >
                  Create Account
                </Link>
              </div>
            </form>

            {/* Social Log In Section: Google, Microsoft, Apple */}
            <div className="space-y-4 pt-2">
              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-200/80 w-full" />
                <span className="bg-white px-3 text-xs text-slate-400 font-medium whitespace-nowrap">
                  Or you can join with
                </span>
                <div className="border-t border-slate-200/80 w-full" />
              </div>

              <div className="flex items-center justify-center gap-4">
                {/* 1. Google Button */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  disabled={Boolean(socialLoading) || isLoading}
                  className="w-12 h-12 rounded-full border border-slate-200/90 bg-white hover:bg-slate-50 shadow-xs flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
                  title="Direct Log In with Google"
                >
                  {socialLoading === 'Google' ? (
                    <Loader2 className="w-5 h-5 text-slate-500 animate-spin" />
                  ) : (
                    <GoogleIcon className="w-5 h-5" />
                  )}
                </button>

                {/* 2. Microsoft Button */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Microsoft')}
                  disabled={Boolean(socialLoading) || isLoading}
                  className="w-12 h-12 rounded-full border border-slate-200/90 bg-white hover:bg-slate-50 shadow-xs flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
                  title="Direct Log In with Microsoft"
                >
                  {socialLoading === 'Microsoft' ? (
                    <Loader2 className="w-5 h-5 text-slate-500 animate-spin" />
                  ) : (
                    <MicrosoftIcon className="w-5 h-5" />
                  )}
                </button>

                {/* 3. Apple Button */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Apple')}
                  disabled={Boolean(socialLoading) || isLoading}
                  className="w-12 h-12 rounded-full border border-slate-200/90 bg-white hover:bg-slate-50 shadow-xs flex items-center justify-center text-slate-900 transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
                  title="Direct Log In with Apple"
                >
                  {socialLoading === 'Apple' ? (
                    <Loader2 className="w-5 h-5 text-slate-500 animate-spin" />
                  ) : (
                    <AppleIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Clean Copyright Footnote inside the scrollable login column */}
          <div className="py-2.5 text-center text-xs text-slate-400 select-none shrink-0">
            &copy; 2026 PrepHub Platform &bull; Secure Authentication Portal
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
        title="Password Recovery Notice"
        maxWidth="md"
      >
        <div className="space-y-4 text-xs text-slate-600">
          <p className="leading-relaxed">
            In this local frontend prototype, accounts are stored in your browser session.
          </p>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
            <span className="font-semibold text-slate-800 block">Default Demo Passwords:</span>
            <p className="font-mono text-slate-700">password123</p>
            <p className="text-[11px] text-slate-500">
              Valid for <span className="font-medium text-slate-700">alex.rivera@prephub.edu</span> (Student) and{' '}
              <span className="font-medium text-slate-700">sarah.jenkins@prephub.edu</span> (Educator).
            </p>
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => setShowForgotModal(false)}
              className="px-4 py-2 rounded-lg bg-[#E14D45] text-white font-medium text-xs hover:bg-[#CC3F37] transition-colors"
            >
              Understood
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

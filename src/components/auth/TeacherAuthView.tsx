'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  GraduationCap,
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  User,
  Building,
  KeyRound,
  Sparkles,
} from 'lucide-react';
import { authStore, DEMO_CREDENTIALS, AUTHORIZED_FACULTY_KEYS } from '@/lib/authStore';
import { PrepHubLogo } from '@/components/brand/PrepHubLogo';

export const TeacherAuthView: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect');

  // Active tab: 'signin' | 'register'
  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');

  // Sign In form fields
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register form fields
  const [regName, setRegName] = useState('');
  const [regDept, setRegDept] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regFacultyKey, setRegFacultyKey] = useState('FACULTY-2026');

  // State indicators
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [roleMismatch, setRoleMismatch] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // If already authenticated as teacher, redirect immediately
    const session = authStore.getSession();
    if (session.isAuthenticated && session.user?.role === 'teacher') {
      router.replace('/teacher');
    }
  }, [router]);

  // Demo fill helper
  const handleFillDemo = () => {
    setSignInEmail(DEMO_CREDENTIALS.teacher.email);
    setSignInPassword(DEMO_CREDENTIALS.teacher.password);
    setErrorMessage(null);
    setRoleMismatch(false);
  };

  // Sign In handler
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setRoleMismatch(false);
    setSuccessMessage(null);
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 350));

    const result = authStore.login(signInEmail, signInPassword, 'teacher');

    if (!result.success) {
      setIsLoading(false);
      setErrorMessage(result.error || 'Authentication failed. Please check your credentials.');
      if (result.roleMismatch) {
        setRoleMismatch(true);
      }
      return;
    }

    setSuccessMessage(`Welcome back, ${result.user?.name}! Loading Teacher Dashboard...`);
    setIsLoading(false);

    setTimeout(() => {
      const destination =
        redirectTarget && redirectTarget.startsWith('/teacher')
          ? redirectTarget
          : '/teacher';
      router.push(destination);
    }, 500);
  };

  // Registration handler
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setRoleMismatch(false);
    setSuccessMessage(null);

    const trimmedName = regName.trim();
    const trimmedDept = regDept.trim();
    const trimmedEmail = regEmail.trim();
    const trimmedPassword = regPassword.trim();
    const trimmedKey = regFacultyKey.trim();

    if (!trimmedName) {
      setErrorMessage('Full name is required.');
      return;
    }
    if (!trimmedDept) {
      setErrorMessage('Department / Faculty discipline is required.');
      return;
    }
    if (!trimmedEmail || !trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setErrorMessage('Please enter a valid institutional email address.');
      return;
    }
    if (trimmedPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    if (!trimmedKey) {
      setErrorMessage('Faculty Authorization Key is required (e.g., FACULTY-2026).');
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    const result = authStore.register({
      name: trimmedName,
      department: trimmedDept,
      email: trimmedEmail,
      password: trimmedPassword,
      role: 'teacher',
      facultyKey: trimmedKey,
    });

    if (!result.success) {
      setIsLoading(false);
      setErrorMessage(result.error || 'Registration failed.');
      return;
    }

    setSuccessMessage(`Account created successfully! Welcome, ${result.user?.name}. Redirecting to Teacher Dashboard...`);
    setIsLoading(false);

    setTimeout(() => {
      router.push('/teacher');
    }, 600);
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Loader2 className="w-8 h-8 text-[#4F46E5] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 flex flex-col justify-between font-sans">
      {/* Top Header */}
      <header className="px-6 py-4 max-w-6xl mx-auto w-full flex items-center justify-between">
        <PrepHubLogo href="/" tagline="FACULTY PORTAL" size="md" />

        {/* Switcher to Student Portal */}
        <Link
          href="/student/login"
          className="text-xs sm:text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 transition-colors"
        >
          <span>Switch to Student Portal</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6">
        <div className="max-w-md w-full bg-white border border-slate-200/90 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
          {/* Header Badge & Title */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200/80 text-[#4F46E5]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Faculty &amp; Educator Access</span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Teacher Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
              Sign in to manage mock exams, construct questions, and evaluate student submissions.
            </p>
          </div>

          {/* Toggle Pills: Sign In vs Create Account */}
          <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200/80">
            <button
              type="button"
              onClick={() => {
                setActiveTab('signin');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'signin'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Create New Account
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl space-y-2 text-xs text-rose-800 animate-in fade-in">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{errorMessage}</span>
              </div>
              {roleMismatch && (
                <div className="pt-1.5 border-t border-rose-200/60 flex items-center justify-end">
                  <Link
                    href="/student/login"
                    className="inline-flex items-center gap-1 font-bold text-rose-900 hover:underline"
                  >
                    <span>Open Student Portal</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-xs text-emerald-800 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 1: SIGN IN                                            */}
          {/* ========================================================= */}
          {activeTab === 'signin' && (
            <div className="space-y-4">
              {/* Demo Account Button */}
              <div className="p-3 bg-slate-50 border border-slate-200/90 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">Quick Demo Faculty:</span>
                  <span className="text-[11px] text-slate-400">Pre-configured</span>
                </div>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-white hover:bg-indigo-50/60 active:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Fill Demo Teacher (Dr. Sarah Jenkins)</span>
                </button>
              </div>

              <form onSubmit={handleSignIn} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-1.5 text-left">
                  <label
                    htmlFor="teacher-signin-email"
                    className="block text-xs font-semibold text-slate-700 tracking-wide"
                  >
                    Institutional Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="teacher-signin-email"
                      type="email"
                      required
                      placeholder="faculty@prephub.edu"
                      value={signInEmail}
                      onChange={(e) => {
                        setSignInEmail(e.target.value);
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
                      htmlFor="teacher-signin-password"
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
                      id="teacher-signin-password"
                      type={showSignInPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••••••"
                      value={signInPassword}
                      onChange={(e) => {
                        setSignInPassword(e.target.value);
                        setErrorMessage(null);
                        setRoleMismatch(false);
                      }}
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50/50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignInPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                      aria-label={showSignInPassword ? 'Hide password' : 'Show password'}
                    >
                      {showSignInPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-semibold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying Credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In as Teacher</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: CREATE FACULTY ACCOUNT                             */}
          {/* ========================================================= */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5 text-left">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Sarah Jenkins"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2 bg-slate-50/50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Department */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Department / Faculty Discipline <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Building className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sciences & Applied Mathematics"
                    value={regDept}
                    onChange={(e) => setRegDept(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2 bg-slate-50/50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Institutional Email */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Institutional Email <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="sarah.jenkins@prephub.edu"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2 bg-slate-50/50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Password <span className="text-rose-500">*</span> (min 6 chars)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 bg-slate-50/50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                  >
                    {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Faculty Authorization Key */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-700">
                    Faculty Passkey <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setRegFacultyKey('FACULTY-2026')}
                    className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                  >
                    Use: FACULTY-2026
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="FACULTY-2026"
                    value={regFacultyKey}
                    onChange={(e) => setRegFacultyKey(e.target.value.toUpperCase())}
                    className="w-full pl-10 pr-3.5 py-2 bg-slate-50/50 border border-slate-300 rounded-xl text-sm uppercase text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all font-mono"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-2.5 px-4 bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] text-white font-semibold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Faculty Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Faculty Account &amp; Enter</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Switch to Student Portal Notice */}
          <div className="pt-4 border-t border-slate-100 text-center space-y-1.5 text-xs text-slate-500">
            <p>
              Are you a student preparing for examinations?{' '}
              <Link href="/student/login" className="font-semibold text-indigo-600 hover:underline">
                Go to Student Portal
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-400">
        PrepHub Academic Assessment &bull; Secure Faculty &amp; Educator Portal
      </footer>
    </div>
  );
};

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  BookOpen,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  Hash,
  School,
  Layers,
  Sparkles,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  UserCheck,
} from 'lucide-react';
import { authStore, DEMO_CREDENTIALS } from '@/lib/authStore';

export type StudentAuthTab = 'signin' | 'register' | 'guest';

interface StudentAuthCardProps {
  initialTab?: StudentAuthTab;
  onSuccessRedirect?: () => void;
  isModal?: boolean;
}

export const StudentAuthCard: React.FC<StudentAuthCardProps> = ({
  initialTab = 'signin',
  onSuccessRedirect,
  isModal = false,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect');

  const [activeTab, setActiveTab] = useState<StudentAuthTab>(initialTab);

  // Tab 1: Sign In fields
  const [identifier, setIdentifier] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Tab 2: Create Account fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regUniRoll, setRegUniRoll] = useState('');
  const [regClassRoll, setRegClassRoll] = useState('');
  const [regSection, setRegSection] = useState('');
  const [regBranch, setRegBranch] = useState('');
  const [regCourse, setRegCourse] = useState('');

  // Tab 3: Guest fields (all 6 mandatory!)
  const [guestName, setGuestName] = useState('');
  const [guestUniRoll, setGuestUniRoll] = useState('');
  const [guestClassRoll, setGuestClassRoll] = useState('');
  const [guestSection, setGuestSection] = useState('');
  const [guestBranch, setGuestBranch] = useState('');
  const [guestCourse, setGuestCourse] = useState('');

  // Shared state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Demo fill helper
  const handleFillDemoStudent = () => {
    setIdentifier(DEMO_CREDENTIALS.student.email);
    setSignInPassword(DEMO_CREDENTIALS.student.password);
    setErrorMessage(null);
  };

  const handleFinishAuth = (destination = '/student') => {
    if (onSuccessRedirect) {
      onSuccessRedirect();
    }
    const finalDest =
      redirectTarget && redirectTarget.startsWith('/student')
        ? redirectTarget
        : destination;
    router.push(finalDest);
  };

  // 1. Submit Sign In
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 350));

    const result = authStore.login(identifier, signInPassword, 'student');

    if (!result.success) {
      setIsLoading(false);
      setErrorMessage(result.error || 'Invalid credentials.');
      return;
    }

    setSuccessMessage(`Welcome back, ${result.user?.name}! Loading Student Portal...`);
    setIsLoading(false);

    setTimeout(() => {
      handleFinishAuth('/student');
    }, 500);
  };

  // 2. Submit Register (Option B)
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const name = regName.trim();
    const email = regEmail.trim();
    const password = regPassword.trim();
    const uniRoll = regUniRoll.trim();
    const classRoll = regClassRoll.trim();
    const section = regSection.trim();
    const branch = regBranch.trim();
    const course = regCourse.trim();

    // Validation
    if (!name) return setErrorMessage('Full Name is required.');
    if (!email || !email.includes('@')) return setErrorMessage('Valid Email Address is required.');
    if (password.length < 6) return setErrorMessage('Password must be at least 6 characters.');
    if (!uniRoll) return setErrorMessage('University Roll Number is required.');
    if (!classRoll) return setErrorMessage('Class Roll Number is required.');
    if (!section) return setErrorMessage('Section is required.');
    if (!branch) return setErrorMessage('Branch is required.');
    if (!course) return setErrorMessage('Course is required.');

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    const result = authStore.register({
      name,
      email,
      password,
      role: 'student',
      universityRoll: uniRoll,
      classRoll,
      section,
      branch,
      course,
      gradeOrTarget: `${course} • ${branch}`,
      department: branch,
    });

    if (!result.success) {
      setIsLoading(false);
      setErrorMessage(result.error || 'Failed to create student account.');
      return;
    }

    setSuccessMessage(`Account created! Welcome, ${result.user?.name}. Entering Student Portal...`);
    setIsLoading(false);

    setTimeout(() => {
      handleFinishAuth('/student');
    }, 500);
  };

  // 3. Submit Guest (Option C)
  const handleGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const name = guestName.trim();
    const uniRoll = guestUniRoll.trim();
    const classRoll = guestClassRoll.trim();
    const section = guestSection.trim();
    const branch = guestBranch.trim();
    const course = guestCourse.trim();

    // All 6 mandatory fields
    if (!name) return setErrorMessage('Full Name is mandatory.');
    if (!uniRoll) return setErrorMessage('University Roll Number is mandatory.');
    if (!classRoll) return setErrorMessage('Class Roll Number is mandatory.');
    if (!section) return setErrorMessage('Section is mandatory.');
    if (!branch) return setErrorMessage('Branch is mandatory.');
    if (!course) return setErrorMessage('Course is mandatory.');

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 350));

    const result = authStore.loginAsGuest({
      name,
      universityRoll: uniRoll,
      classRoll,
      section,
      branch,
      course,
    });

    if (!result.success) {
      setIsLoading(false);
      setErrorMessage(result.error || 'Unable to start guest candidate session.');
      return;
    }

    setSuccessMessage(`Welcome, ${result.user?.name}! Loading Candidate Portal...`);
    setIsLoading(false);

    setTimeout(() => {
      handleFinishAuth('/student');
    }, 500);
  };

  return (
    <div className="w-full text-slate-800">
      {/* Role Badge & Header */}
      <div className="text-center space-y-1.5 mb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200/80 text-[#4F46E5]">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Candidate &amp; Student Portal</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Student Portal
        </h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Sign in, create an account, or enter directly as guest with your academic details.
        </p>
      </div>

      {/* Mode Navigation Tabs (3 Options) */}
      <div className="grid grid-cols-3 rounded-xl bg-slate-100 p-1 border border-slate-200/80 mb-5">
        <button
          type="button"
          onClick={() => {
            setActiveTab('signin');
            setErrorMessage(null);
            setSuccessMessage(null);
          }}
          className={`py-2 px-1 text-center text-xs font-semibold rounded-lg transition-all cursor-pointer truncate ${
            activeTab === 'signin'
              ? 'bg-white text-indigo-700 shadow-2xs font-bold'
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
          className={`py-2 px-1 text-center text-xs font-semibold rounded-lg transition-all cursor-pointer truncate ${
            activeTab === 'register'
              ? 'bg-white text-indigo-700 shadow-2xs font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          New Account
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('guest');
            setErrorMessage(null);
            setSuccessMessage(null);
          }}
          className={`py-2 px-1 text-center text-xs font-semibold rounded-lg transition-all cursor-pointer truncate ${
            activeTab === 'guest'
              ? 'bg-white text-indigo-700 shadow-2xs font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Guest Access
        </button>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{errorMessage}</span>
        </div>
      )}

      {/* Success Banner */}
      {successMessage && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* =================================================================== */}
      {/* OPTION A: SIGN IN (EMAIL OR PHONE + PASSWORD)                       */}
      {/* =================================================================== */}
      {activeTab === 'signin' && (
        <div className="space-y-4">
          <form onSubmit={handleSignIn} className="space-y-3.5 text-left">
            {/* Email or Phone */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Email or Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="alex.rivera@prephub.edu or 9876543210"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <span className="text-[11px] text-slate-400">Demo: password123</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showSignInPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50/50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowSignInPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                >
                  {showSignInPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center text-xs text-slate-600 pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-[#4F46E5] focus:ring-[#4F46E5]"
                />
                <span>Remember session on this device</span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] text-white font-semibold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Student Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* =================================================================== */}
      {/* OPTION B: CREATE NEW STUDENT ACCOUNT                                */}
      {/* =================================================================== */}
      {activeTab === 'register' && (
        <form onSubmit={handleRegister} className="space-y-3 text-left">
          {/* Row 1: Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Full Name"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50/50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="student@prephub.edu"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50/50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Row 2: Password */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">
              Password <span className="text-rose-500">*</span> (min 6 chars)
            </label>
            <div className="relative">
              <input
                type={showRegPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="w-full pl-3 pr-10 py-2 bg-slate-50/50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowRegPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
              >
                {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Row 3: University Roll & Class Roll */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                University Roll No <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 2026-CS-042"
                value={regUniRoll}
                onChange={(e) => setRegUniRoll(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50/50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Class Roll No <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 42"
                value={regClassRoll}
                onChange={(e) => setRegClassRoll(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50/50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Row 4: Course, Branch & Section */}
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Course <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. B.Tech"
                value={regCourse}
                onChange={(e) => setRegCourse(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50/50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Branch <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. CSE"
                value={regBranch}
                onChange={(e) => setRegBranch(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50/50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Section <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. A"
                value={regSection}
                onChange={(e) => setRegSection(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50/50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all"
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
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Create Student Account &amp; Enter</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}

      {/* =================================================================== */}
      {/* OPTION C: GUEST ACCESS (MANDATORY ACADEMIC IDENTIFIERS)             */}
      {/* =================================================================== */}
      {activeTab === 'guest' && (
        <form onSubmit={handleGuest} className="space-y-3.5 text-left">
          {/* Guest Description Pill */}
          <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-900 leading-relaxed flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Quick Candidate Entry:</strong> No password required. Simply enter your university details to access mock tests immediately.
            </span>
          </div>

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
                placeholder="e.g. Jordan Taylor"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* University Roll & Class Roll */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                University Roll No <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 2026-CS-108"
                value={guestUniRoll}
                onChange={(e) => setGuestUniRoll(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50/50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Class Roll No <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 15"
                value={guestClassRoll}
                onChange={(e) => setGuestClassRoll(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50/50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Course, Branch & Section */}
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Course <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. B.Tech"
                value={guestCourse}
                onChange={(e) => setGuestCourse(e.target.value)}
                className="w-full px-2.5 py-2.5 bg-slate-50/50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Branch <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. ECE"
                value={guestBranch}
                onChange={(e) => setGuestBranch(e.target.value)}
                className="w-full px-2.5 py-2.5 bg-slate-50/50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Section <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. B"
                value={guestSection}
                onChange={(e) => setGuestSection(e.target.value)}
                className="w-full px-2.5 py-2.5 bg-slate-50/50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Entering Candidate Portal...</span>
              </>
            ) : (
              <>
                <UserCheck className="w-4 h-4" />
                <span>Enter as Student Candidate</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}


    </div>
  );
};

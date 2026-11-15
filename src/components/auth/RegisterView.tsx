'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  GraduationCap,
  BookOpen,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  KeyRound,
  ShieldCheck,
} from 'lucide-react';
import { authStore } from '@/lib/authStore';
import { UserRole } from '@/types';
import { PrepHubLogo } from '@/components/brand/PrepHubLogo';

export const RegisterView: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get('role') as UserRole) || 'student';

  const [role, setRole] = useState<UserRole>(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [facultyKey, setFacultyKey] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!trimmedEmail || !trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password should be at least 8 characters.');
      return;
    }

    if (role === 'teacher' && !facultyKey.trim()) {
      setErrorMessage('Faculty Authorization Key is required for educator accounts.');
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 350));

    const registrationPayload = {
      name: trimmedName,
      email: trimmedEmail,
      password: password.trim(),
      role,
      department: role === 'teacher' ? 'Faculty Department' : undefined,
      gradeOrTarget: role === 'student' ? 'General Curriculum' : undefined,
      facultyKey: role === 'teacher' ? facultyKey.trim() : undefined,
    };

    const result = authStore.isSupabaseActive()
      ? await authStore.registerWithSupabase(registrationPayload)
      : authStore.register(registrationPayload);

    if (!result.success) {
      setErrorMessage(result.error || 'Failed to create account.');
      setIsLoading(false);
      return;
    }

    setSuccessMessage(`Account created! Welcome, ${result.user?.name}. Redirecting...`);
    setIsLoading(false);

    setTimeout(() => {
      if (role === 'teacher') {
        router.push('/teacher');
      } else {
        router.push('/courses');
      }
    }, 700);
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Loader2 className="w-8 h-8 text-[#E14D45] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent flex flex-col justify-between font-sans">
      {/* Top Navbar */}
      <header className="px-6 py-4 max-w-7xl mx-auto w-full flex items-center justify-between">
        <PrepHubLogo />

        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
          <span>Already have an account?</span>
          <Link
            href="/login"
            className="font-medium text-[#E14D45] hover:text-[#CC3F37] underline underline-offset-4"
          >
            Sign in
          </Link>
        </div>
      </header>

      {/* Main Registration Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-900/5 p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="space-y-1 text-center">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-slate-500">
              Get started with PrepHub in seconds.
            </p>
          </div>

          {/* Simple Role Selector */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200/60">
            <button
              type="button"
              onClick={() => {
                setRole('student');
                setErrorMessage(null);
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                role === 'student'
                  ? 'bg-white text-[#4F46E5] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" strokeWidth={1.75} />
              <span>Student Candidate</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setRole('teacher');
                setErrorMessage(null);
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                role === 'teacher'
                  ? 'bg-white text-[#4F46E5] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" strokeWidth={1.75} />
              <span>Faculty Educator</span>
            </button>
          </div>

          {/* Feedback Alerts */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <div className="font-medium">{successMessage}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5 text-left">
              <label
                htmlFor="reg-name"
                className="block text-xs font-semibold text-slate-700"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="reg-name"
                  type="text"
                  required
                  placeholder={role === 'teacher' ? 'Dr. Sarah Jenkins' : 'Alex Rivera'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5 text-left">
              <label
                htmlFor="reg-email"
                className="block text-xs font-semibold text-slate-700"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="reg-email"
                  type="email"
                  required
                  placeholder="you@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5 text-left">
              <label
                htmlFor="reg-password"
                className="block text-xs font-semibold text-slate-700"
              >
                Password (min 8 characters)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all"
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

            {/* Faculty Key for Teacher Role */}
            {role === 'teacher' && (
              <div className="space-y-1.5 text-left animate-in fade-in">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="reg-faculty-key"
                    className="block text-xs font-semibold text-indigo-900 flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#4F46E5]" />
                    <span>Faculty Authorization Key</span>
                  </label>
                  <span className="text-[11px] text-indigo-600 font-mono">Key: FACULTY-2026</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4 text-indigo-500" />
                  </div>
                  <input
                    id="reg-faculty-key"
                    type="text"
                    required
                    placeholder="Enter institutional authorization key"
                    value={facultyKey}
                    onChange={(e) => setFacultyKey(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-indigo-50/40 border border-indigo-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all font-mono"
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Required to prevent unauthorized role escalation. Authorized faculty key is
                  provided by institution admin.
                </p>
              </div>
            )}

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-[#E14D45] hover:bg-[#CC3F37] active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create {role === 'teacher' ? 'Educator' : 'Student'} Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Switch to login */}
          <div className="pt-2 text-center text-xs text-slate-500">
            By creating an account, you agree to the PrepHub Terms of Service and Honor Code.
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-400">
        PrepHub &bull; Independent Student and Teacher Access
      </footer>
    </div>
  );
};

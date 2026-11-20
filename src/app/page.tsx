import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Clock,
  Sparkles,
  Award,
  Layers,
  Database,
  Lock,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { RedUnderline } from '@/components/brand/RedUnderline';
import { HeroInteractiveCard } from '@/components/home/HeroInteractiveCard';

export default function HomePage() {
  return (
    <div
      className="min-h-screen bg-transparent flex flex-col font-sans text-slate-900 selection:bg-[#E14D45]/15 selection:text-[#E14D45]"
      suppressHydrationWarning
    >
      {/* Top Navbar — Contains the ONLY visible "Log in" button on the main page */}
      <Navbar activeTab="home" />

      {/* Main Content */}
      <main className="flex-1">
        {/* ================================================================= */}
        {/* 1. HERO SECTION (Screenshots Page 1)                               */}
        {/* ================================================================= */}
        <section className="pt-12 sm:pt-16 pb-16 sm:pb-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Heading, Subtext, CTAs, Stats */}
              <div className="lg:col-span-7 space-y-8">
                <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-extrabold text-slate-900 tracking-tight leading-[1.08]">
                  Practice with{' '}
                  <span className="relative inline-block text-slate-900">
                    purpose.
                    <RedUnderline />
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-500 max-w-xl leading-relaxed">
                  A distraction-free exam arena with countdown timers, clear question navigation,
                  and instant scoring. Choose your course and semester, then turn revision into real,
                  measurable readiness.
                </p>

                {/* CTAs — Single primary action directing students to courses/subjects; no redundant Log In button */}
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#E14D45] hover:bg-[#CC3F37] text-white text-xs sm:text-sm font-bold tracking-tight shadow-xs active:scale-[0.99] transition-all cursor-pointer"
                  >
                    <span>Start Practising</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="#how-it-works"
                    className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 transition-colors"
                  >
                    How it works
                  </a>
                </div>

                {/* Stats Row */}
                <div className="pt-8 border-t border-slate-100 grid grid-cols-3 gap-6 max-w-md">
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 tracking-tight block">
                      15
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium block mt-0.5">
                      Mock tests
                    </span>
                  </div>

                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 tracking-tight block">
                      81
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium block mt-0.5">
                      Practice questions
                    </span>
                  </div>

                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight block">
                      Instant
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium block mt-0.5">
                      Scoring &amp; review
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Hero Exam Card */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <HeroInteractiveCard />
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 2. SECTION 01 / WHAT YOU GET (Screenshots Page 2)                  */}
        {/* ================================================================= */}
        <section id="features" className="py-20 border-t border-slate-200/60 bg-white/75 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-7 space-y-2">
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#E14D45] uppercase block">
                  01 / WHAT YOU GET
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Everything you need to{' '}
                  <span className="relative inline-block">
                    test, track, and improve.
                    <RedUnderline />
                  </span>
                </h2>
              </div>

              <div className="lg:col-span-5 lg:pl-6">
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  A complete practice loop &mdash; from the first question to the final review &mdash;
                  designed to close the gap between studying and performing.
                </p>
              </div>
            </div>

            {/* 4 Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs hover:shadow-card-hover transition-all duration-200 space-y-4">
                <div className="w-10 h-10 rounded-full bg-rose-50 text-[#E14D45] flex items-center justify-center">
                  <Clock className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Realistic exam simulation
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Countdown timers, question navigation, and live status tracking &mdash; answered,
                  unanswered, and flagged &mdash; just like the real thing.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs hover:shadow-card-hover transition-all duration-200 space-y-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Targeted practice
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Choose mock tests by subject and level, so you focus on the exact topics you need
                  to master next.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs hover:shadow-card-hover transition-all duration-200 space-y-4">
                <div className="w-10 h-10 rounded-full bg-rose-50 text-[#E14D45] flex items-center justify-center">
                  <Award className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Instant evaluation
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Get your score, performance breakdown, and a question-by-question review the
                  moment you submit.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs hover:shadow-card-hover transition-all duration-200 space-y-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                  <Layers className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Focus-driven design
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  A minimal, clutter-free interface built for long study sessions without cognitive
                  overload.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 3. SECTION 02 / HOW IT WORKS (Screenshots Page 3)                  */}
        {/* ================================================================= */}
        <section id="how-it-works" className="py-20 bg-white/80 backdrop-blur-md border-t border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Header */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#E14D45] uppercase block">
                02 / HOW IT WORKS
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Three steps from{' '}
                <span className="relative inline-block">
                  revision to readiness.
                  <RedUnderline />
                </span>
              </h2>
            </div>

            {/* 3 Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="space-y-4">
                <div className="text-3xl font-black font-mono text-[#E14D45] tracking-tight">
                  01
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  Choose your course &amp; semester
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Pick your course, then your semester, so you only see the mock tests built for
                  students like you &mdash; not everyone else&apos;s.
                </p>
              </div>

              {/* Step 2 */}
              <div className="space-y-4">
                <div className="text-3xl font-black font-mono text-[#E14D45] tracking-tight">
                  02
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  Take it under exam conditions
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  A countdown timer keeps you honest. Answer, skip, or flag questions, and jump
                  between them with the navigator.
                </p>
              </div>

              {/* Step 3 */}
              <div className="space-y-4">
                <div className="text-3xl font-black font-mono text-[#E14D45] tracking-tight">
                  03
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  Review and improve
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Submit to get an instant score and a full question-by-question breakdown with
                  explanations for every answer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 4. CALL TO ACTION BANNER / THIS BLUE BAR                           */}
        {/* (Replaces Admin Question Bank option into this Blue Bar)           */}
        {/* ================================================================= */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#15233E] rounded-3xl p-8 sm:p-14 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 border border-slate-800">
              {/* Left Side: Question Bank & Management Description */}
              <div className="space-y-4 max-w-xl">
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-[#E14D45] uppercase">
                  <Database className="w-3.5 h-3.5 text-[#E14D45]" />
                  <span>ADMINISTRATION &amp; QUESTION BANK</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Manage the central{' '}
                  <span className="relative inline-block text-white">
                    Question Bank.
                    <RedUnderline />
                  </span>
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Upload DOCX, PDF, CSV, JSON, TXT &amp; Markdown documents, preview questions with KaTeX
                  formulas, assign chapters, and curate the question pools powering the randomized mock test engine.
                </p>
              </div>

              {/* Right Side: Admin Question Bank CTA Button */}
              <div className="shrink-0 flex flex-col items-start md:items-end gap-2">
                <Link
                  href="/admin/question-bank"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#E14D45] hover:bg-[#CC3F37] text-white text-xs sm:text-sm font-bold tracking-tight shadow-md active:scale-[0.99] transition-all cursor-pointer group"
                >
                  <Database className="w-4 h-4 text-white" />
                  <span>Admin Question Bank</span>
                  <span className="text-[9px] font-mono font-bold bg-white/20 text-white px-1.5 py-0.5 rounded uppercase">
                    Admin
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                  <Lock className="w-3 h-3 text-[#E14D45]" />
                  <span>Restricted to trilokaswal260506@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

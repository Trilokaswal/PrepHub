import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { RedUnderline } from '@/components/brand/RedUnderline';
import { Target, Zap, Clock, ShieldCheck, BookOpen, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'About PrepHub — What We Are All About',
  description:
    'Learn about PrepHub: our mission, educational philosophy, and how we help university students turn revision into real, measurable readiness.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans text-slate-900 selection:bg-[#E14D45]/15 selection:text-[#E14D45]">
      {/* Top Navigation */}
      <Navbar activeTab="about" />

      {/* Main Content */}
      <main className="flex-1">
        {/* ================================================================= */}
        {/* 1. HERO SECTION: What PrepHub is all about                        */}
        {/* ================================================================= */}
        <section className="pt-14 sm:pt-20 pb-16 sm:pb-20 border-b border-slate-200/60 bg-white/70 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E14D45]/10 border border-[#E14D45]/20 text-[11px] font-mono font-bold tracking-widest text-[#E14D45] uppercase">
              <span className="w-1.5 h-1.5 bg-[#E14D45] rounded-full" />
              <span>ABOUT PREPHUB</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              What our platform is{' '}
              <span className="relative inline-block text-slate-900">
                all about.
                <RedUnderline />
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              PrepHub is a purpose-built educational preparation platform created to eliminate the
              anxiety, guesswork, and uncertainty of university examinations.
            </p>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 2. THE STORY & MISSION                                            */}
        {/* ================================================================= */}
        <section className="py-16 sm:py-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#E14D45] uppercase block">
                  OUR PURPOSE
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  Bridging the gap between study sessions and exam-day performance.
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Most students spend weeks reading textbooks and lecture notes, only to freeze when
                  faced with the pressure of a real exam clock and unfamiliar question patterns.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  PrepHub changes that. We believe true readiness doesn&apos;t come from passive
                  re-reading &mdash; it comes from active, realistic practice under authentic
                  conditions.
                </p>
              </div>

              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 space-y-5">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#E14D45]/10 text-[#E14D45] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    01
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Curriculum-First Structure</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Organized hierarchically by course, branch, and semester so every question directly reflects your syllabus.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#15233E]/10 text-[#15233E] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    02
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Distraction-Free Environment</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Zero advertisements, no social feeds, and no cognitive clutter &mdash; purely focused on deep practice.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    03
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Instant Diagnostic Clarity</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Instant evaluation paired with step-by-step mathematical explanations for continuous improvement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 3. FOUR CORE PILLARS                                              */}
        {/* ================================================================= */}
        <section className="py-20 bg-transparent">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#E14D45] uppercase block">
                WHAT POWERS PREPHUB
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Designed for serious academic readiness.
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Every feature across our platform was built around one guiding metric: student retention and measurable exam confidence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="p-8 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/80 shadow-xs space-y-4">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#E14D45] flex items-center justify-center">
                  <Target className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Syllabus-Aligned Precision
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Every test blueprint is indexed to official university framework standards across B.Tech, BCA, BBA, BA, and BSc programs.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-8 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/80 shadow-xs space-y-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Clock className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Authentic Timed Arena
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Real-time countdown clocks, flag-for-review tools, and instant question navigation to train test pacing and stamina.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-8 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/80 shadow-xs space-y-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#15233E] flex items-center justify-center">
                  <Zap className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Instant Explanations
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Never leave a test guessing why an answer was wrong. Every question features full mathematical formulas and clear justifications.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

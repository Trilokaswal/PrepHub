import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { RedUnderline } from '@/components/brand/RedUnderline';
import { ShieldCheck, Lock, EyeOff, FileText, Database, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | PrepHub Platform',
  description:
    'Read the official PrepHub Privacy Policy. Learn how we safeguard student assessment records, university credentials, and academic evaluation data.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans text-slate-900 selection:bg-[#E14D45]/15 selection:text-[#E14D45]">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pb-20">
        {/* Header Hero */}
        <section className="pt-14 sm:pt-20 pb-16 sm:pb-20 border-b border-slate-200/60 bg-white/70 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E14D45]/10 border border-[#E14D45]/20 text-[11px] font-mono font-bold tracking-widest text-[#E14D45] uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E14D45]" />
              <span>LEGAL &amp; ACADEMIC INTEGRITY</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Privacy Policy &amp;{' '}
              <span className="relative inline-block text-slate-900">
                Data Protection.
                <RedUnderline />
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              PrepHub is committed to safeguarding student evaluation data, assessment records,
              and institutional credentials. We operate on a strict, education-first privacy model.
            </p>

            <div className="text-xs font-mono text-slate-400">
              Last updated: Academic Year 2026 &bull; Version 2.4
            </div>
          </div>
        </section>

        {/* Policy Body */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 space-y-12">
          {/* Key Commitments Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-xs space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Zero Commercial Ads</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We never display third-party advertisements or sell student profiles to external advertisers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-xs space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Lock className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Encrypted Credentials</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Authentication sessions and academic credentials are guarded with strict role-based access tokens.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-xs space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#E14D45] flex items-center justify-center">
                <EyeOff className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Student Ownership</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your past scores, bookmarked questions, and revision history belong solely to you.
              </p>
            </div>
          </div>

          {/* Detailed Policy Articles */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm space-y-10 text-slate-700 text-sm leading-relaxed">
            {/* Article 1 */}
            <article className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#E14D45]" />
                <span>1. Academic Information We Collect</span>
              </h2>
              <p>
                To provide authentic, semester-aligned mock test preparation, PrepHub collects minimal,
                purpose-specific student information:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm text-slate-600">
                <li>
                  <strong className="text-slate-800">Student Profile Identifiers:</strong> Name, institutional roll number, registered university email, academic program (e.g., B.Tech, BCA, BBA, BA, BSc), engineering branch, and current semester.
                </li>
                <li>
                  <strong className="text-slate-800">Assessment &amp; Performance Data:</strong> Selected options, numerical responses, flags, time taken per question, overall scores, and submission timestamps.
                </li>
                <li>
                  <strong className="text-slate-800">Session State:</strong> Secure local tokens used strictly to maintain exam countdown continuity in case of browser refresh.
                </li>
              </ul>
            </article>

            {/* Article 2 */}
            <article className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#E14D45]" />
                <span>2. How Your Assessment Data Is Used</span>
              </h2>
              <p>
                All student data collected is utilized solely to deliver the PrepHub educational service:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm text-slate-600">
                <li>Instant automatic grading, percentage calculation, and diagnostic review delivery.</li>
                <li>Maintaining personal scorecard history in your Student Dashboard so you can track semester progress.</li>
                <li>Generating personal bookmark archives for questions flagged during timed examinations.</li>
                <li>Providing course educators with de-identified cohort analytics to improve curriculum pacing.</li>
              </ul>
            </article>

            {/* Article 3 */}
            <article className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#E14D45]" />
                <span>3. Examination Access &amp; Mandatory Authentication</span>
              </h2>
              <p>
                In alignment with university academic integrity requirements, <strong>all mock tests, curriculum question banks, and examination runners are strictly protected</strong>. Unauthenticated visitors are prohibited from taking assessments or accessing question pools without signing in to a verified student or educator account.
              </p>
            </article>

            {/* Article 4 */}
            <article className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#E14D45]" />
                <span>4. Data Retention &amp; Student Control</span>
              </h2>
              <p>
                You retain complete control over your academic data on PrepHub. From your Profile Settings,
                you may update your university identification details, clear past mock test scorecards,
                or remove saved questions at any time.
              </p>
            </article>

            {/* Article 5 */}
            <article className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#E14D45]" />
                <span>5. Contact &amp; Grievance Redressal</span>
              </h2>
              <p>
                If you have questions regarding this Privacy Policy, your test records, or institutional compliance,
                contact the PrepHub Academic Secretariat at:
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700 space-y-1">
                <div>Email: privacy@prephub.edu</div>
                <div>Campus: Academic Block C &bull; Directorate of Examination Systems</div>
              </div>
            </article>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

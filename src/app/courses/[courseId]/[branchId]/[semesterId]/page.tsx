import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Shuffle,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { RedUnderline } from '@/components/brand/RedUnderline';
import { getCourseById, getBranchById, getSemesterById } from '@/data/coursesData';
import { CourseIcon } from '@/components/courses/CourseIcon';
import { SubjectListWithTestGenerator } from '@/components/student/SubjectListWithTestGenerator';

interface SemesterSubjectsPageProps {
  params: Promise<{
    courseId: string;
    branchId: string;
    semesterId: string;
  }>;
}

export default async function SemesterSubjectsPage({ params }: SemesterSubjectsPageProps) {
  const { courseId, branchId, semesterId } = await params;
  const course = getCourseById(courseId);

  if (!course) {
    notFound();
  }

  const branch = getBranchById(courseId, branchId);
  if (!branch) {
    notFound();
  }

  const semester = getSemesterById(courseId, branchId, semesterId);
  if (!semester) {
    notFound();
  }

  const subjects = (semester.subjects || []).map((s) => ({
    id: s.id,
    name: s.name,
    code: s.code,
    description: s.description,
  }));

  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans text-slate-900 selection:bg-[#E14D45]/15 selection:text-[#E14D45]">
      {/* Top Navbar */}
      <Navbar activeTab="mock-tests" />

      {/* Main Container */}
      <main className="flex-1 pb-16">
        {/* Breadcrumb & Intro Header */}
        <section className="pt-8 sm:pt-12 pb-10 border-b border-slate-200/60 bg-white/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 flex-wrap">
              <Link href="/" className="hover:text-slate-700 transition-colors">
                Home
              </Link>
              <span>&gt;</span>
              <Link href="/courses#choose-course-section" className="hover:text-slate-700 transition-colors">
                Courses
              </Link>
              <span>&gt;</span>
              <Link href={`/courses/${course.id}`} className="hover:text-slate-700 transition-colors">
                {course.name}
              </Link>
              <span>&gt;</span>
              <Link href={`/courses/${course.id}/${branch.id}`} className="hover:text-slate-700 transition-colors">
                {branch.code}
              </Link>
              <span>&gt;</span>
              <span className="text-slate-700 font-semibold">{semester.title}</span>
            </nav>

            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-[#E14D45] uppercase">
                <CourseIcon courseId={course.id} className="w-3.5 h-3.5 stroke-[2]" />
                <span>
                  {course.name} &bull; {branch.name} &bull; {semester.title}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {semester.title} Subjects &amp; Mock Tests
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl">
                All subjects taught in {semester.title} of {branch.name}. Select any subject to launch a custom
                mock examination generated from the Question Bank with topic filters, countdown timer, and instant scoring.
              </p>

              {/* Highlights pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                  {subjects.length} Subjects
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E14D45]/10 text-[#E14D45] text-xs font-semibold font-mono">
                  <Shuffle className="w-3.5 h-3.5 text-[#E14D45]" />
                  Dynamic Question Bank Engine
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Randomized Questions &bull; Instant Scoring
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04 / SUBJECTS & MOCK TESTS */}
        <section className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {/* Sub-header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-7 space-y-2">
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#E14D45] uppercase block">
                  04 / SUBJECTS &amp; MOCK TESTS
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Choose a subject and{' '}
                  <span className="relative inline-block">
                    attempt your test
                    <RedUnderline />
                  </span>
                </h2>
              </div>

              <div className="lg:col-span-5 lg:pl-6">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Click Attempt Test on any subject to configure chapters, difficulty, and question count.
                  Questions are randomly sampled on demand from the Question Bank.
                </p>
              </div>
            </div>

            {/* Subjects List with Integrated Test Generator */}
            <SubjectListWithTestGenerator
              subjects={subjects}
              courseName={course.name}
              branchName={branch.name}
              semesterTitle={semester.title}
            />
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#15233E] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-3 max-w-xl">
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-[#E14D45] uppercase">
                  <span className="w-1.5 h-1.5 bg-[#E14D45] rounded-xs" />
                  <span>READY TO TEST YOUR READINESS?</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  Stop revising blindly.{' '}
                  <span className="relative inline-block text-white">
                    Start practising.
                    <RedUnderline />
                  </span>
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Take a timed mock exam now, analyze your score instantly, and uncover the exact questions you need to review.
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <Link
                  href={`/courses/${course.id}/${branch.id}`}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-slate-600 hover:bg-white/10 text-white text-xs font-bold tracking-tight transition-all"
                >
                  <span>Switch semester</span>
                </Link>

                <Link
                  href="/courses#choose-course-section"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#E14D45] hover:bg-[#CC3F37] text-white text-xs font-bold tracking-tight shadow-xs active:scale-[0.99] transition-all cursor-pointer"
                >
                  <span>Choose your course</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

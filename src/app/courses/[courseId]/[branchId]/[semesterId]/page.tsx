import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  Clock,
  BookOpen,
  Layers,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Award,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { RedUnderline } from '@/components/brand/RedUnderline';
import { getCourseById, getBranchById, getSemesterById } from '@/data/coursesData';
import { CourseIcon, SubjectIcon } from '@/components/courses/CourseIcon';

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

  const subjects = semester.subjects || [];
  const totalMockTests = subjects.reduce((sum, s) => sum + (s.tests?.length || 0), 0);

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
                All subjects taught in {semester.title} of {branch.name}. Each subject contains official
                timed mock tests with 10 questions each, designed to test fundamental understanding and exam readiness.
              </p>

              {/* Highlights pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                  {subjects.length} Subjects
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E14D45]/10 text-[#E14D45] text-xs font-semibold font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-[#E14D45]" />
                  {totalMockTests} Mock Tests Available
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  10 Questions Each &bull; Instant Scoring
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04 / SUBJECTS & MOCK TESTS */}
        <section className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
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
                  Select any mock test below to launch the examination runner with a live countdown timer,
                  question navigator, and immediate performance review.
                </p>
              </div>
            </div>

            {/* Subjects List */}
            <div className="space-y-8">
              {subjects.map((subject, sIdx) => (
                <div
                  key={subject.id}
                  className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6"
                >
                  {/* Subject Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                    <div className="flex items-start sm:items-center gap-4">
                      {/* Subject Icon in square shape with non-sharp corners */}
                      <div className="w-14 h-14 rounded-xl bg-[#15233E] text-white flex items-center justify-center shadow-xs shrink-0">
                        <SubjectIcon subjectName={subject.name} className="w-7 h-7 stroke-[1.8]" />
                      </div>

                      <div className="space-y-1 max-w-2xl">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                            {subject.code || `SUBJ-${sIdx + 1}`}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                            {subject.name}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {subject.description}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2 text-xs font-mono font-bold text-[#E14D45] bg-[#E14D45]/10 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                      <span>{subject.tests.length} Practice Tests</span>
                    </div>
                  </div>

                  {/* Mock Tests Cards for this Subject */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {subject.tests.map((test, tIdx) => (
                      <div
                        key={test.id}
                        className="rounded-2xl p-5 border border-slate-200 bg-[#FAFAFA]/70 hover:bg-white hover:border-slate-300 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between space-y-4 group"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                test.level === 'Beginner'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : test.level === 'Advanced'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {test.level}
                            </span>

                            <span className="text-xs font-mono font-bold text-slate-500 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              {test.durationMinutes} mins
                            </span>
                          </div>

                          <h4 className="text-base font-bold text-slate-900 tracking-tight group-hover:text-[#E14D45] transition-colors leading-snug">
                            {test.title}
                          </h4>

                          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                            {test.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-200/70 flex items-center justify-between">
                          <span className="text-xs font-mono font-medium text-slate-600 flex items-center gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                            <span>{test.questionCount} Questions</span>
                          </span>

                          <Link
                            href={`/test/${test.id}`}
                            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold tracking-tight shadow-xs transition-all active:scale-[0.98] ${
                              tIdx === 0
                                ? 'bg-[#E14D45] hover:bg-[#CC3F37] text-white'
                                : 'bg-[#15233E] hover:bg-[#1E2F52] text-white'
                            }`}
                          >
                            <span>Attempt Test</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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

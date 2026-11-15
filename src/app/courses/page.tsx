import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Layers, BookOpen } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { RedUnderline } from '@/components/brand/RedUnderline';
import { COURSES_DATA } from '@/data/coursesData';
import { CourseIcon } from '@/components/courses/CourseIcon';

export default function CoursesPage() {
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
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <Link href="/" className="hover:text-slate-700 transition-colors">
                Home
              </Link>
              <span>&gt;</span>
              <span className="text-slate-700 font-semibold">Choose course</span>
            </nav>

            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-[#E14D45] uppercase">
                <span className="w-1.5 h-1.5 bg-[#E14D45] rounded-xs" />
                <span>CHOOSE COURSE</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Find tests for your course and semester.
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl">
                Every student is different. Pick your course, then your semester, and we&apos;ll show
                only the subjects and mock tests that apply to you.
              </p>
            </div>
          </div>
        </section>

        {/* Section 01 / CHOOSE YOUR COURSE */}
        <section id="choose-course-section" className="py-14 scroll-mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {/* Sub-header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-7 space-y-2">
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#E14D45] uppercase block">
                  01 / CHOOSE YOUR COURSE
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Which course are{' '}
                  <span className="relative inline-block">
                    you studying?
                    <RedUnderline />
                  </span>
                </h2>
              </div>

              <div className="lg:col-span-5 lg:pl-6">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Select your degree to proceed to your branch, semester curriculum, and timed mock tests.
                </p>
              </div>
            </div>

            {/* Courses Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {COURSES_DATA.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-card-hover hover:border-slate-300 transition-all duration-200 flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-4">
                    {/* Course Icon: square shape with non-sharp corners, placed first */}
                    <div className="w-14 h-14 rounded-xl bg-[#15233E] text-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 group-hover:bg-[#1E2F52] transition-all">
                      <CourseIcon courseId={course.id} className="w-7 h-7 stroke-[1.8]" />
                    </div>

                    {/* Course Name written below it */}
                    <div className="space-y-1">
                      <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        {course.name}
                      </h3>
                      <div className="text-xl font-bold text-[#E14D45] tracking-tight">
                        {course.totalSemesters} Semesters
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-[#E14D45] transition-colors">
                      <span>Select course</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner (Screenshot Page 8) */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#15233E] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-3 max-w-xl">
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-[#E14D45] uppercase">
                  <span className="w-1.5 h-1.5 bg-[#E14D45] rounded-xs" />
                  <span>YOUR NEXT TEST IS WAITING</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  Stop revising blindly.{' '}
                  <span className="relative inline-block text-white">
                    Start practising.
                    <RedUnderline />
                  </span>
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Pick your course and semester, run a timed mock, and see exactly where you stand
                  &mdash; in minutes, not weeks.
                </p>
              </div>

              <div className="shrink-0">
                <a
                  href="#choose-course-section"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#E14D45] hover:bg-[#CC3F37] text-white text-xs font-bold tracking-tight shadow-xs active:scale-[0.99] transition-all cursor-pointer"
                >
                  <span>Choose your course</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

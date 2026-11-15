import React from 'react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ArrowRight, Layers, BookOpen } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { RedUnderline } from '@/components/brand/RedUnderline';
import { getCourseById, getBranchById } from '@/data/coursesData';
import { CourseIcon } from '@/components/courses/CourseIcon';

interface BranchSemesterPageProps {
  params: Promise<{
    courseId: string;
    branchId: string;
  }>;
}

export default async function BranchSemesterPage({ params }: BranchSemesterPageProps) {
  const { courseId, branchId } = await params;
  const course = getCourseById(courseId);

  if (!course) {
    notFound();
  }

  // Handle legacy route format: /courses/:courseId/semester-X
  if (branchId.toLowerCase().startsWith('semester-')) {
    const defaultBranch = course.branches[0]?.id || 'cse';
    redirect(`/courses/${courseId}/${defaultBranch}/${branchId}`);
  }

  const branch = getBranchById(courseId, branchId);
  if (!branch) {
    notFound();
  }

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
              <Link href="/courses#choose-course-section" className="hover:text-slate-700 transition-colors">
                Courses
              </Link>
              <span>&gt;</span>
              <Link href={`/courses/${course.id}`} className="hover:text-slate-700 transition-colors">
                {course.name}
              </Link>
              <span>&gt;</span>
              <span className="text-slate-700 font-semibold">{branch.name}</span>
            </nav>

            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-[#E14D45] uppercase">
                <CourseIcon courseId={course.id} className="w-3.5 h-3.5 stroke-[2]" />
                <span>
                  {course.name} &bull; {branch.code} &bull; SEMESTERS
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Which semester are you in?
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl">
                Select your current semester for {branch.name} to explore all taught subjects and timed
                practice mock tests.
              </p>
            </div>
          </div>
        </section>

        {/* Section 03 / CHOOSE YOUR SEMESTER */}
        <section className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {/* Sub-header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-7 space-y-2">
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#E14D45] uppercase block">
                  03 / CHOOSE YOUR SEMESTER
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Select your{' '}
                  <span className="relative inline-block">
                    semester
                    <RedUnderline />
                  </span>
                </h2>
              </div>

              <div className="lg:col-span-5 lg:pl-6">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Every semester contains the core curriculum subjects with at least two full mock tests each.
                </p>
              </div>
            </div>

            {/* Semester Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {branch.semesters.map((sem) => {
                const totalSubjects = sem.subjects?.length || 0;

                return (
                  <Link
                    key={sem.id}
                    href={`/courses/${course.id}/${branch.id}/${sem.id}`}
                    className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-card-hover hover:border-slate-300 transition-all duration-200 flex flex-col justify-between space-y-6 group"
                  >
                    <div className="space-y-4">
                      {/* Semester Icon: Number of Semester as the Icon in square with non-sharp corners */}
                      <div className="w-14 h-14 rounded-xl bg-[#15233E] text-white flex items-center justify-center shadow-xs shrink-0 font-mono font-extrabold text-2xl tracking-tight group-hover:scale-105 group-hover:bg-[#1E2F52] transition-all">
                        {sem.number}
                      </div>

                      {/* Semester Name with increased font size and Orangish subjects count */}
                      <div className="space-y-1">
                        <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight group-hover:text-[#E14D45] transition-colors">
                          {sem.title}
                        </h3>
                        <div className="text-xl font-bold text-[#E14D45] tracking-tight">
                          {totalSubjects} Subjects
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-[#E14D45] transition-colors">
                        <span>Select semester</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                );
              })}
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
                  <span>LOOKING FOR ANOTHER COURSE OR BRANCH?</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  Stop revising blindly.{' '}
                  <span className="relative inline-block text-white">
                    Start practising.
                    <RedUnderline />
                  </span>
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Switch your branch or course to find tests matching your exact curriculum.
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <Link
                  href={`/courses/${course.id}`}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-slate-600 hover:bg-white/10 text-white text-xs font-bold tracking-tight transition-all"
                >
                  <span>Switch branch</span>
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

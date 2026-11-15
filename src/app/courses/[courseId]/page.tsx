import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { RedUnderline } from '@/components/brand/RedUnderline';
import { COURSES_DATA } from '@/data/coursesData';
import { CourseIcon, BranchIcon } from '@/components/courses/CourseIcon';

interface CoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { courseId } = await params;
  const course = COURSES_DATA.find((c) => c.id.toLowerCase() === courseId.toLowerCase());

  if (!course) {
    notFound();
  }

  const branches = course.branches || [];

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
              <span className="text-slate-700 font-semibold">{course.name}</span>
            </nav>

            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-[#E14D45] uppercase">
                <CourseIcon courseId={course.id} className="w-3.5 h-3.5 stroke-[2]" />
                <span>{course.name} &bull; BRANCH SELECTION</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Which branch are you studying?
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl">
                Choose your discipline or specialization under {course.name} to view the corresponding semester
                curriculum, subjects, and mock examinations.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02 / CHOOSE YOUR BRANCH */}
        <section className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {/* Sub-header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-7 space-y-2">
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#E14D45] uppercase block">
                  02 / CHOOSE YOUR BRANCH
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Select your{' '}
                  <span className="relative inline-block">
                    branch or stream
                    <RedUnderline />
                  </span>
                </h2>
              </div>

              <div className="lg:col-span-5 lg:pl-6">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Curricula and mock tests are aligned to official university semester frameworks for each branch.
                </p>
              </div>
            </div>

            {/* Branch Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {branches.map((branch) => (
                <Link
                  key={branch.id}
                  href={`/courses/${course.id}/${branch.id}`}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-card-hover hover:border-slate-300 transition-all duration-200 flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-4">
                    {/* Branch Icon & Semesters Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-xl bg-[#15233E] text-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 group-hover:bg-[#1E2F52] transition-all">
                        <BranchIcon branchId={branch.id} className="w-7 h-7 stroke-[1.8]" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                          {branch.code.split('-')[0] || branch.code}
                        </span>
                        <span className="text-xs font-mono font-bold text-[#E14D45] bg-[#E14D45]/10 px-2.5 py-1 rounded-full">
                          {branch.totalSemesters} Semesters
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-[#E14D45] transition-colors">
                        {branch.name}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {branch.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-[#E14D45] transition-colors">
                      <span>Select branch</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
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
                  <span>LOOKING FOR ANOTHER COURSE?</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  Explore other degrees.{' '}
                  <span className="relative inline-block text-white">
                    Start practising.
                    <RedUnderline />
                  </span>
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Switch your course at any time to find tests matching your exact syllabus.
                </p>
              </div>

              <div className="shrink-0">
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

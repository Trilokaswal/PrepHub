import Link from 'next/link';
import {
  GraduationCap,
  ArrowRight,
  LayoutDashboard,
  CheckCircle2,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-xs px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-bold text-slate-900">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#4F46E5] text-white shadow-xs">
              <GraduationCap className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              Prep<span className="text-[#4F46E5]">Hub</span>
            </span>
          </div>

          <Link
            href="/teacher"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg bg-[#4F46E5] text-white hover:bg-[#4338CA] transition-colors shadow-xs"
          >
            <span>Teacher Dashboard</span>
            <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/70 text-xs font-medium text-[#4F46E5]">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" aria-hidden="true" />
            <span>Frontend Foundation & Teacher Dashboard Phase</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Next-Generation <span className="text-[#4F46E5]">Mock Test</span> Management for Educators
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Welcome to the PrepHub prototype. Explore the responsive Teacher Dashboard with live in-memory test creation, search, status filters, and statistical overviews.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/teacher"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm sm:text-base font-medium rounded-lg bg-[#4F46E5] text-white hover:bg-[#4338CA] active:bg-[#3730A3] transition-colors shadow-xs group"
            >
              <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.75} />
              <span>Launch Teacher Dashboard</span>
              <ArrowRight className="w-4 h-4 ml-1" strokeWidth={1.75} />
            </Link>
          </div>

          {/* Key Feature Highlights */}
          <div className="pt-8 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-lg bg-white border border-slate-200/90 shadow-xs space-y-1.5">
              <div className="flex items-center gap-2 text-slate-900 font-medium text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={1.75} />
                <span>Responsive Design</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Fixed sidebar for desktop, collapsible drawer for mobile, and adaptable table/card views.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-slate-200/90 shadow-xs space-y-1.5">
              <div className="flex items-center gap-2 text-slate-900 font-medium text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={1.75} />
                <span>Local Filter & Search</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Instant search and multi-status filtering working on static typed sample data.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-slate-200/90 shadow-xs space-y-1.5">
              <div className="flex items-center gap-2 text-slate-900 font-medium text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={1.75} />
                <span>Honest Controls</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Clear notices distinguishing implemented features from planned backend integrations.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 border-t border-slate-200 bg-white text-center text-xs text-slate-500">
        PrepHub Mock Test Platform • Next.js App Router • Tailwind CSS • TypeScript
      </footer>
    </div>
  );
}

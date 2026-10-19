import Link from 'next/link';
import {
  GraduationCap,
  ArrowRight,
  LayoutDashboard,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-bold text-slate-900">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4F46E5] text-white shadow-md shadow-indigo-200">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              Prep<span className="text-[#4F46E5]">Hub</span>
            </span>
          </div>

          <Link
            href="/teacher"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-[#4F46E5] text-white hover:bg-[#4338CA] transition-colors shadow-sm shadow-indigo-200"
          >
            <span>Teacher Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-xs font-semibold text-[#4F46E5]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Frontend Foundation & Teacher Dashboard Phase</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Next-Generation <span className="text-[#4F46E5]">Mock Test</span> Management for Educators
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Welcome to the PrepHub prototype. Explore the responsive Teacher Dashboard with live in-memory test creation, search, status filters, and statistical overviews.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/teacher"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold rounded-xl bg-[#4F46E5] text-white hover:bg-[#4338CA] active:bg-[#3730A3] transition-all shadow-md shadow-indigo-200 group"
            >
              <LayoutDashboard className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Launch Teacher Dashboard</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Key Feature Highlights */}
          <div className="pt-8 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1.5">
              <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Responsive Design</span>
              </div>
              <p className="text-xs text-slate-500">
                Fixed sidebar for desktop, collapsible drawer for mobile, and adaptable table/card views.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1.5">
              <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Local Filter & Search</span>
              </div>
              <p className="text-xs text-slate-500">
                Instant search and multi-status filtering working on static typed sample data.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1.5">
              <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Honest Controls</span>
              </div>
              <p className="text-xs text-slate-500">
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

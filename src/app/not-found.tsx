import Link from 'next/link';
import { ArrowLeft, FileQuestion } from 'lucide-react';

export const metadata = {
  title: 'Page Not Found - PrepHub',
  description: 'The requested page could not be found.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200/90 p-8 shadow-xs space-y-4">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-[#4F46E5] flex items-center justify-center mx-auto">
          <FileQuestion className="w-6 h-6" strokeWidth={1.75} />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Page Not Found
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
            The page you are looking for does not exist or is currently in development.
          </p>
        </div>
        <div className="pt-2 flex justify-center">
          <Link
            href="/teacher"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-[#4F46E5] text-white hover:bg-[#4338CA] transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
            <span>Return to Teacher Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

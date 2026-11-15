import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { StudentLoginPageView } from '@/components/auth/StudentLoginPageView';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Student Portal Access | PrepHub',
  description: 'Candidate sign in, account registration, and guest access for PrepHub online mock exams.',
};

export default function StudentLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <Loader2 className="w-8 h-8 text-[#4F46E5] animate-spin" />
        </div>
      }
    >
      <StudentLoginPageView />
    </Suspense>
  );
}

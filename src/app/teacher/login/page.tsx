import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { TeacherAuthView } from '@/components/auth/TeacherAuthView';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Teacher Portal Access | PrepHub',
  description: 'Educator and faculty sign in for PrepHub exam creation and grading queues.',
};

export default function TeacherLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <Loader2 className="w-8 h-8 text-[#4F46E5] animate-spin" />
        </div>
      }
    >
      <TeacherAuthView />
    </Suspense>
  );
}

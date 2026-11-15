import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { StudentExamRunner } from '@/components/student/StudentExamRunner';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mock Examination Runner | PrepHub',
  description: 'Timed assessment testing interface for students.',
};

type Params = Promise<{ testId: string }>;

export default async function ExamPage({ params }: { params: Params }) {
  const { testId } = await params;

  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center p-8">
          <Loader2 className="w-8 h-8 text-[#4F46E5] animate-spin" />
        </div>
      }
    >
      <StudentExamRunner testId={testId} />
    </Suspense>
  );
}

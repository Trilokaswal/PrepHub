import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { StudentExamRunner } from '@/components/student/StudentExamRunner';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mock Examination Runner | PrepHub',
  description: 'A distraction-free, timed exam arena with instant scoring and question review.',
};

type Params = Promise<{ testId: string }>;

export default async function DirectExamPage({ params }: { params: Params }) {
  const { testId } = await params;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center p-8">
          <Loader2 className="w-8 h-8 text-[#E14D45] animate-spin" />
        </div>
      }
    >
      <StudentExamRunner testId={testId} />
    </Suspense>
  );
}

import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { RandomMockTestGeneratorView } from '@/components/student/RandomMockTestGeneratorView';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Random Mock Test Generator | PrepHub',
  description: 'Generate authentic randomized mock exams from our verified academic question bank with countdown timers and instant scoring.',
};

export default function RandomMockTestGeneratorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-transparent flex items-center justify-center p-8">
          <Loader2 className="w-8 h-8 text-[#E14D45] animate-spin" />
        </div>
      }
    >
      <RandomMockTestGeneratorView />
    </Suspense>
  );
}

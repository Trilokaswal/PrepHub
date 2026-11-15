import React, { Suspense } from 'react';
import { QuestionBuilderView } from '@/components/builder/QuestionBuilderView';

export const metadata = {
  title: 'Question Builder - PrepHub',
  description: 'Author and manage questions, options, and grading settings.',
};

export default function QuestionBuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="py-16 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-2"></div>
          <p className="text-xs text-slate-500">Loading Question Builder...</p>
        </div>
      }
    >
      <QuestionBuilderView />
    </Suspense>
  );
}

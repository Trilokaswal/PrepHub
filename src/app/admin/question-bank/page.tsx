import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { QuestionBankAdminView } from '@/components/admin/QuestionBankAdminView';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Question Bank & Mock Test Engine | PrepHub Admin',
  description: 'Administrator management panel for question bank, bulk imports, and random test configuration.',
};

export default function QuestionBankAdminPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
          <Loader2 className="w-8 h-8 text-[#E14D45] animate-spin" />
        </div>
      }
    >
      <QuestionBankAdminView />
    </Suspense>
  );
}

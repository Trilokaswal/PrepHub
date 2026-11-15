import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { RegisterView } from '@/components/auth/RegisterView';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Create Account | PrepHub',
  description: 'Join PrepHub as an educator to design mock tests or as a candidate to take assessments.',
};

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <Loader2 className="w-8 h-8 text-[#4F46E5] animate-spin" />
        </div>
      }
    >
      <RegisterView />
    </Suspense>
  );
}

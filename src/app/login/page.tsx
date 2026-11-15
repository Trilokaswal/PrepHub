import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { LoginView } from '@/components/auth/LoginView';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sign In | PrepHub',
  description: 'Sign in to access your PrepHub mock test management workspace or candidate exam portal.',
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <Loader2 className="w-8 h-8 text-[#4F46E5] animate-spin" />
        </div>
      }
    >
      <LoginView />
    </Suspense>
  );
}

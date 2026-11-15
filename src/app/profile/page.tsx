import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { UserProfileView } from '@/components/profile/UserProfileView';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Profile & Academic Dashboard | PrepHub',
  description: 'View your enrolled curriculum progress, past mock test scorecards, bookmarked questions, and account settings.',
};

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-transparent flex items-center justify-center p-8">
          <Loader2 className="w-8 h-8 text-[#E14D45] animate-spin" />
        </div>
      }
    >
      <UserProfileView />
    </Suspense>
  );
}

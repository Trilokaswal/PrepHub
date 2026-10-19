import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export const metadata = {
  title: 'Teacher Dashboard - PrepHub',
  description: 'Manage mock tests, monitor student attempts, and review grading queues.',
};

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

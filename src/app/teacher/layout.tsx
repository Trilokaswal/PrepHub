import React from 'react';
import { TeacherLayoutWrapper } from '@/components/layout/TeacherLayoutWrapper';

export const metadata = {
  title: 'Teacher Dashboard - PrepHub',
  description: 'Manage mock tests, monitor student attempts, and review grading queues.',
};

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TeacherLayoutWrapper>{children}</TeacherLayoutWrapper>;
}

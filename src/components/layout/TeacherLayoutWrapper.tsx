'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { DashboardLayout } from './DashboardLayout';

interface TeacherLayoutWrapperProps {
  children: React.ReactNode;
}

export const TeacherLayoutWrapper: React.FC<TeacherLayoutWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === '/teacher/login';

  // Completely bypass DashboardLayout (sidebar, header, padding) when on the login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

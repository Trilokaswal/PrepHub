'use client';

import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { mockTeacherProfile } from '@/data/mockData';

interface HeaderProps {
  onMenuToggle: () => void;
  onShowNotice?: (title: string, message: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, onShowNotice }) => {

  const handleNotificationClick = () => {
    if (onShowNotice) {
      onShowNotice(
        'Teacher Notifications (Demo)',
        'You have 3 demo notifications:\n• 12 new submissions for Physics Mid-Term\n• Organic Chemistry grading queue threshold reached\n• Reminder: Advanced Calculus scheduled test launches Oct 24.'
      );
    }
  };

  const handleProfileClick = () => {
    if (onShowNotice) {
      onShowNotice(
        'Teacher Profile (Static Data)',
        `Signed in as ${mockTeacherProfile.name} (${mockTeacherProfile.email}). Department: ${mockTeacherProfile.department}. User authentication and backend sessions will be connected in future iterations.`
      );
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 w-full items-center justify-between border-b border-slate-200/90 bg-white px-4 sm:px-6 lg:px-8 shadow-xs">
      {/* Left: Mobile hamburger & Context breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="inline-flex md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
          aria-label="Open mobile navigation"
        >
          <Menu className="h-5 w-5" strokeWidth={1.75} />
        </button>

        <div className="flex items-center gap-2">
          <Badge variant="indigo" className="hidden sm:inline-flex">
            Teacher Workspace
          </Badge>
          <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            Static Mock Mode
          </span>
        </div>
      </div>

      {/* Right: Actions, Notification, Profile */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button
          type="button"
          onClick={handleNotificationClick}
          className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
          aria-label="View notifications (3 unread)"
          title="View notifications (3 unread)"
        >
          <Bell className="h-5 w-5" strokeWidth={1.75} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#4F46E5] ring-2 ring-white" aria-hidden="true" />
        </button>

        {/* Divider */}
        <div className="h-5 w-px bg-slate-200" aria-hidden="true" />

        {/* User Profile Pill */}
        <button
          type="button"
          onClick={handleProfileClick}
          className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 text-left"
          aria-label={`Open profile info for ${mockTeacherProfile.name}`}
          title={`Signed in as ${mockTeacherProfile.name}`}
        >
          <Avatar
            src={mockTeacherProfile.avatarUrl}
            alt={mockTeacherProfile.name}
            name={mockTeacherProfile.name}
            size="sm"
          />
          <div className="hidden lg:block text-xs text-left pr-2">
            <p className="font-medium text-slate-900 leading-tight">
              {mockTeacherProfile.name}
            </p>
            <p className="text-slate-500 text-xs leading-tight mt-0.5">
              {mockTeacherProfile.role}
            </p>
          </div>
        </button>
      </div>
    </header>
  );
};

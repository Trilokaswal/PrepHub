'use client';

import React, { useState } from 'react';
import { Menu, Bell, Search, Info, HelpCircle } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { mockTeacherProfile } from '@/data/mockData';

interface HeaderProps {
  onMenuToggle: () => void;
  onShowNotice?: (title: string, message: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, onShowNotice }) => {
  const [searchFocused, setSearchFocused] = useState(false);

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
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200/90 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      {/* Left: Mobile hamburger & Context breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="inline-flex md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 focus-visible:ring-2 focus-visible:ring-indigo-600"
          aria-label="Open mobile navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <Badge variant="indigo" className="hidden sm:inline-flex">
            Teacher Workspace
          </Badge>
          <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
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
          className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-600"
          aria-label="View notifications (3 unread)"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4F46E5] opacity-75 motion-reduce:hidden" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4F46E5]" />
          </span>
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200" aria-hidden="true" />

        {/* User Profile Pill */}
        <button
          type="button"
          onClick={handleProfileClick}
          className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-600 text-left"
          aria-label={`Open profile info for ${mockTeacherProfile.name}`}
        >
          <Avatar
            src={mockTeacherProfile.avatarUrl}
            alt={mockTeacherProfile.name}
            name={mockTeacherProfile.name}
            size="sm"
          />
          <div className="hidden lg:block text-xs text-left pr-2">
            <p className="font-semibold text-slate-800 leading-tight">
              {mockTeacherProfile.name}
            </p>
            <p className="text-slate-500 text-[11px] leading-tight">
              {mockTeacherProfile.role}
            </p>
          </div>
        </button>
      </div>
    </header>
  );
};

'use client';

import React from 'react';
import { Menu } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { NotificationPopover } from './NotificationPopover';
import { ProfileDropdown } from './ProfileDropdown';

interface HeaderProps {
  onMenuToggle: () => void;
  onShowNotice?: (title: string, message: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
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
        {/* Interactive Notification Popover */}
        <NotificationPopover />

        {/* Divider */}
        <div className="h-5 w-px bg-slate-200" aria-hidden="true" />

        {/* Interactive User Profile Dropdown */}
        <ProfileDropdown />
      </div>
    </header>
  );
};


'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Users,
  CheckSquare,
  BarChart3,
  Settings,
  GraduationCap,
  X,
  Info,
} from 'lucide-react';
import { navigationItems, mockTeacherProfile } from '@/data/mockData';
import { Avatar } from '@/components/ui/Avatar';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  onShowNotice?: (title: string, message: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  mobileOpen,
  setMobileOpen,
  onShowNotice,
}) => {
  const pathname = usePathname();

  const getNavIcon = (iconName: string) => {
    const props = { className: 'w-5 h-5 shrink-0', strokeWidth: 1.75 };
    switch (iconName) {
      case 'layout-dashboard':
        return <LayoutDashboard {...props} />;
      case 'file-text':
        return <FileText {...props} />;
      case 'users':
        return <Users {...props} />;
      case 'check-square':
        return <CheckSquare {...props} />;
      case 'bar-chart':
        return <BarChart3 {...props} />;
      case 'settings':
        return <Settings {...props} />;
      default:
        return <LayoutDashboard {...props} />;
    }
  };

  const handleNavClick = (
    e: React.MouseEvent,
    item: (typeof navigationItems)[0]
  ) => {
    if (!item.isImplemented) {
      e.preventDefault();
      if (onShowNotice) {
        onShowNotice(
          `${item.label} (Demo Mode)`,
          `The "${item.label}" section is part of the planned roadmap. In this frontend foundation phase, only the Teacher Dashboard (/teacher) is active with local static mock data.`
        );
      }
    }
    setMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex h-full flex-col bg-white">
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-5 border-b border-slate-100">
        <Link
          href="/teacher"
          className="flex items-center gap-2.5 font-medium text-slate-900 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-lg p-1"
          onClick={() => setMobileOpen(false)}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#4F46E5] text-white group-hover:bg-[#4338CA] transition-colors shadow-xs">
            <GraduationCap className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div className="flex flex-col">
            <span className="text-base leading-tight tracking-tight font-semibold text-slate-900">
              Prep<span className="text-[#4F46E5]">Hub</span>
            </span>
            <span className="text-xs font-medium text-slate-500">
              Teacher Portal
            </span>
          </div>
        </Link>
        <button
          onClick={() => setMobileOpen(false)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
          aria-label="Close navigation sidebar"
        >
          <X className="w-5 h-5" strokeWidth={1.75} />
        </button>
      </div>

      {/* Main Navigation */}
      <nav
        aria-label="Sidebar Navigation"
        className="flex-1 space-y-1 px-3 py-4 overflow-y-auto"
      >
        <div className="px-3 pb-2 text-xs font-medium text-slate-400">
          Navigation
        </div>
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const itemClasses = `w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${
            isActive
              ? 'bg-indigo-50 text-[#4F46E5]'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`;

          const content = (
            <>
              <div className="flex items-center gap-3">
                <span
                  className={
                    isActive ? 'text-[#4F46E5]' : 'text-slate-400 group-hover:text-slate-600'
                  }
                >
                  {getNavIcon(item.iconName)}
                </span>
                <span>{item.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      isActive
                        ? 'bg-indigo-100 text-[#4F46E5]'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {!item.isImplemented && (
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    Demo
                  </span>
                )}
              </div>
            </>
          );

          if (!item.isImplemented) {
            return (
              <button
                key={item.label}
                type="button"
                onClick={(e) => handleNavClick(e, item)}
                className={itemClasses}
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={itemClasses}
              aria-current={isActive ? 'page' : undefined}
            >
              {content}
            </Link>
          );
        })}
      </nav>

      {/* Demo Notice Banner */}
      <div className="p-3.5 mx-3 mb-3 rounded-lg bg-slate-50 border border-slate-200/80">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" strokeWidth={1.75} />
          <div className="text-xs">
            <p className="font-medium text-slate-800">Static Mock Environment</p>
            <p className="text-slate-500 mt-0.5 leading-relaxed">
              No backend database connected. Mock tests and statistics represent local typed data.
            </p>
          </div>
        </div>
      </div>

      {/* Teacher Profile Footer */}
      <div className="p-3.5 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <Avatar
            src={mockTeacherProfile.avatarUrl}
            alt={mockTeacherProfile.name}
            name={mockTeacherProfile.name}
            size="md"
            showOnlineStatus
            isOnline
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">
              {mockTeacherProfile.name}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {mockTeacherProfile.department}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Left Sidebar */}
      <aside
        className="hidden md:fixed md:inset-y-0 md:left-0 md:z-40 md:flex md:w-64 md:flex-col border-r border-slate-200/90 shadow-xs"
        aria-label="Desktop Sidebar"
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop and Sidebar */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden bg-slate-900/40 backdrop-blur-xs transition-opacity"
          aria-modal="true"
          role="dialog"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="fixed inset-y-0 left-0 z-50 w-72 max-w-[80vw] bg-white shadow-xl transform transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

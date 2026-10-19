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
  Sparkles,
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
    const props = { className: 'w-5 h-5 shrink-0' };
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
      <div className="flex h-16 items-center justify-between px-6 border-b border-slate-100">
        <Link
          href="/teacher"
          className="flex items-center gap-2.5 font-bold text-slate-900 group"
          onClick={() => setMobileOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4F46E5] text-white shadow-md shadow-indigo-200 group-hover:bg-[#4338CA] transition-colors">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg leading-tight tracking-tight font-extrabold text-slate-900">
              Prep<span className="text-[#4F46E5]">Hub</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
              Teacher Portal
            </span>
          </div>
        </Link>
        <button
          onClick={() => setMobileOpen(false)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 md:hidden focus-visible:ring-2 focus-visible:ring-indigo-600"
          aria-label="Close navigation sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Navigation */}
      <nav
        aria-label="Sidebar Navigation"
        className="flex-1 space-y-1.5 px-3 py-4 overflow-y-auto"
      >
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Main Menu
        </div>
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#EEF2FF] text-[#4F46E5] font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
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
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      isActive
                        ? 'bg-indigo-200/70 text-[#4F46E5]'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {!item.isImplemented && (
                  <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                    Demo
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Demo Notice Banner */}
      <div className="p-4 mx-3 mb-3 rounded-xl bg-gradient-to-br from-indigo-50/80 to-slate-50 border border-indigo-100/80">
        <div className="flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-[#4F46E5] mt-0.5 shrink-0" />
          <div className="text-xs">
            <p className="font-semibold text-slate-800">Static Mock Environment</p>
            <p className="text-slate-500 mt-0.5 leading-relaxed">
              No backend or DB connected. All tests and stats are local sample data.
            </p>
          </div>
        </div>
      </div>

      {/* Teacher Profile Footer */}
      <div className="p-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar
            src={mockTeacherProfile.avatarUrl}
            alt={mockTeacherProfile.name}
            name={mockTeacherProfile.name}
            size="md"
            showOnlineStatus
            isOnline
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">
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
        className="hidden md:fixed md:inset-y-0 md:left-0 md:z-30 md:flex md:w-64 md:flex-col border-r border-slate-200/90 shadow-sm"
        aria-label="Desktop Sidebar"
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop and Sidebar */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden bg-slate-900/40 backdrop-blur-sm transition-opacity"
          aria-modal="true"
          role="dialog"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="fixed inset-y-0 left-0 z-50 w-72 max-w-[80vw] bg-white shadow-2xl transform transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

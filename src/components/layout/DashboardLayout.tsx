'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [noticeModal, setNoticeModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
  }>({
    isOpen: false,
    title: '',
    message: '',
  });

  const handleShowNotice = (title: string, message: string) => {
    setNoticeModal({
      isOpen: true,
      title,
      message,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#4F46E5] focus:text-white focus:rounded-lg focus:shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
      >
        Skip to main content
      </a>

      {/* Sidebar (Desktop fixed + Mobile drawer) */}
      <Sidebar
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
        onShowNotice={handleShowNotice}
      />

      {/* Main Content Area (Offset by sidebar width on desktop) */}
      <div className="flex flex-1 flex-col md:pl-64">
        <Header
          onMenuToggle={() => setMobileMenuOpen(true)}
          onShowNotice={handleShowNotice}
        />

        <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

        {/* Global Honest Footer */}
        <footer className="py-3 px-6 border-t border-slate-200/80 bg-white text-center text-xs text-slate-500">
          <p>
            PrepHub Examination Platform • <span className="font-medium text-slate-700">Frontend Foundation Phase</span> (Local Static Mock Data • No Database Connected)
          </p>
        </footer>
      </div>

      {/* Honest Demo Notification Modal */}
      <Modal
        isOpen={noticeModal.isOpen}
        onClose={() => setNoticeModal((prev) => ({ ...prev, isOpen: false }))}
        title={noticeModal.title}
        maxWidth="md"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">
            {noticeModal.message}
          </p>
          <div className="pt-2 flex justify-end">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setNoticeModal((prev) => ({ ...prev, isOpen: false }))}
            >
              Understood
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

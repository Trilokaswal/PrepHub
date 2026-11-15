'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { PrepHubMark } from '@/components/brand/PrepHubLogo';

/**
 * PageTransitionLoader
 *
 * Provides a responsive, professional loading screen during route transitions
 * and page switching across PrepHub:
 * 1. Top slim animated progress bar (instant feedback upon clicking any link).
 * 2. Full-screen backdrop loader if transition duration exceeds 140ms.
 * 3. Reactive to Next.js route change (pathname / searchParams), popstate, and programmatic events.
 * 4. Automatic failsafe timeout (auto-dismiss after 7 seconds if navigation is aborted).
 */
export const PageTransitionLoader: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [progress, setProgress] = useState(0);

  const prevPathRef = useRef(pathname);
  const prevSearchRef = useRef(searchParams?.toString());
  const backdropTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const failsafeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const stopLoading = useCallback(() => {
    if (backdropTimerRef.current) clearTimeout(backdropTimerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (failsafeTimeoutRef.current) clearTimeout(failsafeTimeoutRef.current);

    setProgress(100);

    // Short delay to let progress bar reach 100% before fading out
    setTimeout(() => {
      setIsLoading(false);
      setShowBackdrop(false);
      setTimeout(() => setProgress(0), 200);
    }, 150);
  }, []);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setProgress(15);

    // If navigation takes longer than 140ms, display the full-screen backdrop loader
    if (backdropTimerRef.current) clearTimeout(backdropTimerRef.current);
    backdropTimerRef.current = setTimeout(() => {
      setShowBackdrop(true);
    }, 140);

    // Increment progress bar smoothly up to 88%
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 88) {
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
          return 88;
        }
        const delta = Math.max(1, Math.floor((90 - prev) / 6));
        return prev + delta;
      });
    }, 100);

    // Failsafe auto-dismiss after 7 seconds in case navigation was cancelled
    if (failsafeTimeoutRef.current) clearTimeout(failsafeTimeoutRef.current);
    failsafeTimeoutRef.current = setTimeout(() => {
      stopLoading();
    }, 7000);
  }, [stopLoading]);

  // Listen to Next.js pathname and search parameter changes (indicates navigation completed)
  useEffect(() => {
    const currentSearch = searchParams?.toString();
    const hasPathChanged = pathname !== prevPathRef.current;
    const hasSearchChanged = currentSearch !== prevSearchRef.current;

    if (hasPathChanged || hasSearchChanged) {
      prevPathRef.current = pathname;
      prevSearchRef.current = currentSearch;
      stopLoading();
    }
  }, [pathname, searchParams, stopLoading]);

  // Global click interceptor for internal links
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Find nearest anchor tag
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a') as HTMLAnchorElement | null;

      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Ignore non-navigation links (hash anchors, new tabs, mailto, tel, downloads, external)
      if (
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        anchor.target === '_blank' ||
        anchor.hasAttribute('download') ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // Check if it's an internal destination
      try {
        const url = new URL(href, window.location.href);
        const isSameOrigin = url.origin === window.location.origin;
        const isCurrentUrl =
          url.pathname === window.location.pathname && url.search === window.location.search;

        if (isSameOrigin && !isCurrentUrl) {
          startLoading();
        }
      } catch {
        // In case href is invalid or relative
        if (href.startsWith('/') && href !== window.location.pathname) {
          startLoading();
        }
      }
    };

    // Listen to browser forward/back buttons
    const handlePopState = () => {
      startLoading();
    };

    // Listen to custom programmatic transition events (e.g. from router.push)
    const handleCustomStart = () => {
      startLoading();
    };
    const handleCustomStop = () => {
      stopLoading();
    };

    document.addEventListener('click', handleDocumentClick, { capture: true });
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('prephub-start-loading', handleCustomStart);
    window.addEventListener('prephub-stop-loading', handleCustomStop);

    return () => {
      document.removeEventListener('click', handleDocumentClick, { capture: true });
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('prephub-start-loading', handleCustomStart);
      window.removeEventListener('prephub-stop-loading', handleCustomStop);
      if (backdropTimerRef.current) clearTimeout(backdropTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (failsafeTimeoutRef.current) clearTimeout(failsafeTimeoutRef.current);
    };
  }, [startLoading, stopLoading]);

  if (!isLoading && progress === 0) return null;

  return (
    <>
      {/* 1. Top Slim Animated Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 z-[9999] pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-[#15233E] via-[#E14D45] to-[#FF7066] shadow-[0_0_10px_rgba(225,77,69,0.7)] transition-all duration-200 ease-out"
          style={{
            width: `${progress}%`,
            opacity: isLoading ? 1 : 0,
          }}
        />
      </div>

      {/* 2. Full-Screen Elegant Backdrop Loader (Appears if page switch duration > 140ms) */}
      {showBackdrop && (
        <div
          role="status"
          aria-live="polite"
          aria-label="Loading page content"
          className="fixed inset-0 z-[9990] flex items-center justify-center bg-slate-900/25 backdrop-blur-[6px] animate-in fade-in duration-200"
        >
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-2xl shadow-slate-950/15 flex flex-col items-center text-center space-y-4 max-w-xs mx-4 scale-100 animate-in zoom-in-95 duration-200">
            {/* Animated Logo Mark with Rotating Halo */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 -m-2 rounded-2xl border-2 border-dashed border-[#E14D45]/40 animate-spin" style={{ animationDuration: '6s' }} />
              <PrepHubMark size="lg" />
            </div>

            {/* Label and Subtext */}
            <div className="space-y-1">
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                Switching Workspace
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Preparing examination environment...
              </p>
            </div>

            {/* Micro Progress Bar */}
            <div className="w-36 h-1.5 rounded-full bg-slate-100 overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-[#15233E] to-[#E14D45] rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

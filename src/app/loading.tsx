import React from 'react';
import { PrepHubMark } from '@/components/brand/PrepHubLogo';

/**
 * Root Loading Screen for PrepHub (Next.js 15 App Router)
 *
 * Automatically rendered by Next.js React Suspense boundaries whenever
 * navigating between pages, prefetching chunks, or streaming server components.
 */
export default function RootLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page content"
      className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center select-none"
    >
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl shadow-slate-900/5 flex flex-col items-center space-y-5 max-w-sm w-full mx-auto animate-in fade-in zoom-in-95 duration-300">
        {/* Animated Brand Emblem */}
        <div className="relative flex items-center justify-center">
          <div
            className="absolute inset-0 -m-2.5 rounded-2xl border-2 border-dashed border-[#E14D45]/40 animate-spin"
            style={{ animationDuration: '7s' }}
          />
          <PrepHubMark size="lg" />
        </div>

        {/* Text Details */}
        <div className="space-y-1.5">
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
            Loading PrepHub Workspace
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Syncing syllabus, tests, and assessment telemetry...
          </p>
        </div>

        {/* Pulsing Indeterminate Loading Bar */}
        <div className="w-44 h-1.5 rounded-full bg-slate-100 overflow-hidden relative">
          <div className="h-full w-1/2 bg-gradient-to-r from-[#15233E] via-[#E14D45] to-[#15233E] rounded-full animate-[shimmer_1.4s_infinite_linear]" />
        </div>
      </div>
    </div>
  );
}

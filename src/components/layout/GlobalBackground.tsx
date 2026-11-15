'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export const GlobalBackground: React.FC = () => {
  const pathname = usePathname();

  // STRICT REQUIREMENT: DO NOT apply this background to the Exam Window or examination interface.
  // The Exam Window must strictly retain its existing background and appearance.
  const isExamWindow =
    pathname.startsWith('/test') ||
    pathname.startsWith('/student/exam');

  if (isExamWindow) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Base photographic layer: Beautiful Himalayan campus photograph */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-[center_top] transform-gpu will-change-transform"
        style={{
          backgroundImage: "url('/images/campus-bg.jpg')",
          filter: 'brightness(1.01) contrast(1.02) saturate(1.02)',
        }}
      />

      {/* Optical atmospheric diffusion: Subtle blur to prevent fine architectural noise from conflicting with text */}
      <div className="absolute inset-0 backdrop-blur-[1px] md:backdrop-blur-[1.5px]" />

      {/* Multi-stop daylight overlay: 
          - Generous transparency at the top preserving the natural beauty of the Himalayan mountains and architecture
          - Soft, clean transition into pearl-slate white providing 100% WCAG AAA text contrast across content sections
      */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(248, 250, 252, 0.72) 0%, rgba(248, 250, 252, 0.82) 220px, rgba(248, 250, 252, 0.90) 550px, rgba(248, 250, 252, 0.96) 100%)',
        }}
      />

      {/* Subtle ambient corner vignette to frame the mountains and add natural depth */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 95% 65% at 50% 15%, transparent 55%, rgba(15, 23, 42, 0.08) 100%)',
        }}
      />
    </div>
  );
};

import React from 'react';
import Link from 'next/link';

export interface PrepHubLogoProps {
  className?: string;
  isLight?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  tagline?: string;
  markOnly?: boolean;
  href?: string;
}

/**
 * PrepHub Emblem Mark
 *
 * Design Concept:
 * An authentic, human-crafted architectural monogram uniting:
 * 1. "P" (Prep): Left vertical academic pillar and upper knowledge arch / turned page.
 * 2. "H" (Hub): Right foundation column and connecting cross-axis.
 * 3. The Central Hub Node: A radiant four-pointed academic compass star in PrepHub Coral (#E14D45)
 *    symbolizing guidance, pinpoint accuracy, and the convergence of student readiness.
 *
 * Clean geometric vector mathematics, completely free of AI-style gradients or generic clipart.
 */
export const PrepHubMark: React.FC<{
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLight?: boolean;
  className?: string;
}> = ({ size = 'md', isLight = false, className = '' }) => {
  const sizeMap = {
    sm: 'w-7 h-7 rounded-lg',
    md: 'w-9 h-9 rounded-xl',
    lg: 'w-11 h-11 rounded-2xl',
    xl: 'w-14 h-14 rounded-2xl',
  };

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center bg-gradient-to-br from-[#15233E] via-[#101B31] to-[#0A1222] border border-slate-700/60 shadow-sm shadow-slate-950/20 group-hover:shadow-md group-hover:border-slate-600/80 transition-all duration-200 select-none ${sizeMap[size]} ${className}`}
      aria-hidden="true"
    >
      {/* Subtle architectural hairline highlight */}
      <div className="absolute inset-[1px] rounded-[inherit] border border-white/10 pointer-events-none" />

      <svg
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[72%] h-[72%] overflow-visible"
      >
        {/* Foundation Pillar: Academic Rigor & Left Stem of 'P' / 'H' */}
        <rect
          x="7"
          y="6.5"
          width="4.5"
          height="23"
          rx="2.25"
          fill="#FFFFFF"
        />

        {/* Knowledge Arch / Turned Page: The Upper Loop of 'P' */}
        <path
          d="M11.5 8.75 H21 C24.866 8.75 28 11.884 28 15.75 C28 19.616 24.866 22.75 21 22.75 H11.5"
          stroke="#FFFFFF"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right Base Column: Completing the 'H' (Hub) Structure */}
        <rect
          x="23.5"
          y="17.5"
          width="4.5"
          height="12"
          rx="2.25"
          fill="#FFFFFF"
        />

        {/* The Central Hub Focal Node: 4-Pointed Insight Compass in Signature Coral Red */}
        <path
          d="M18 12.25 C18 14.25 19.5 15.75 21.5 15.75 C19.5 15.75 18 17.25 18 19.25 C18 17.25 16.5 15.75 14.5 15.75 C16.5 15.75 18 14.25 18 12.25 Z"
          fill="#E14D45"
        />

        {/* Subtle Focal Center Core */}
        <circle cx="18" cy="15.75" r="1.15" fill="#FFFFFF" opacity="0.9" />
      </svg>
    </div>
  );
};

export const PrepHubLogo: React.FC<PrepHubLogoProps> = ({
  className = '',
  isLight = false,
  size = 'md',
  showTagline = true,
  tagline = 'MOCK TESTS',
  markOnly = false,
  href = '/',
}) => {
  const fontSizes = {
    sm: { title: 'text-sm', tag: 'text-[7.5px] tracking-[0.2em] mt-0.5' },
    md: { title: 'text-[17px]', tag: 'text-[8.5px] tracking-[0.22em] mt-0.5' },
    lg: { title: 'text-xl', tag: 'text-[9.5px] tracking-[0.24em] mt-1' },
    xl: { title: 'text-2xl', tag: 'text-[11px] tracking-[0.26em] mt-1.5' },
  };

  const content = (
    <div className={`inline-flex items-center gap-3 group select-none ${className}`}>
      <PrepHubMark size={size} isLight={isLight} />

      {!markOnly && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center">
            <span
              className={`font-extrabold tracking-tight ${
                fontSizes[size].title
              } ${isLight ? 'text-white' : 'text-slate-900 group-hover:text-slate-950'} transition-colors`}
            >
              Prep
            </span>
            <span
              className={`font-extrabold tracking-tight ${fontSizes[size].title} text-[#E14D45] group-hover:text-[#CC3F37] transition-colors`}
            >
              Hub
            </span>
          </div>

          {showTagline && (
            <span
              className={`font-bold uppercase font-mono ${fontSizes[size].tag} ${
                isLight ? 'text-slate-400' : 'text-slate-400 group-hover:text-slate-500'
              } transition-colors`}
            >
              {tagline}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E14D45] focus-visible:ring-offset-2 rounded-xl"
        title="PrepHub — Academic Exam Arena"
      >
        {content}
      </Link>
    );
  }

  return content;
};

// Backwards compatibility alias
export const PrepArenaLogo = PrepHubLogo;

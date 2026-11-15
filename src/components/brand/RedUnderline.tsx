import React from 'react';

interface RedUnderlineProps {
  className?: string;
  width?: string | number;
}

export const RedUnderline: React.FC<RedUnderlineProps> = ({ className = '', width = '100%' }) => {
  return (
    <svg
      viewBox="0 0 240 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute left-0 -bottom-2 w-full h-[10px] pointer-events-none ${className}`}
      preserveAspectRatio="none"
    >
      <path
        d="M3 14C55 5 185 4 237 13"
        stroke="#E14D45"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 15C85 8.5 170 7.5 220 14"
        stroke="#E14D45"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
};

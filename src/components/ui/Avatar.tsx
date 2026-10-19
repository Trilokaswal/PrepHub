'use client';

import React, { useState } from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showOnlineStatus?: boolean;
  isOnline?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  showOnlineStatus = false,
  isOnline = true,
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  const getInitials = (text?: string): string => {
    if (!text) return 'U';
    const parts = text.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return text.slice(0, 2).toUpperCase();
  };

  const sizeStyles = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-14 w-14 text-lg',
  };

  const statusDotSizes = {
    sm: 'h-2 w-2 ring-1',
    md: 'h-2.5 w-2.5 ring-2',
    lg: 'h-3 w-3 ring-2',
    xl: 'h-3.5 w-3.5 ring-2',
  };

  return (
    <div
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full font-medium select-none ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {src && !hasError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="h-full w-full rounded-full object-cover ring-1 ring-slate-200"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center rounded-full bg-indigo-100 text-[#4F46E5] font-semibold ring-1 ring-indigo-200"
          aria-label={alt}
        >
          {getInitials(name || alt)}
        </div>
      )}

      {showOnlineStatus && (
        <span
          className={`absolute bottom-0 right-0 rounded-full ring-white ${
            isOnline ? 'bg-emerald-500' : 'bg-slate-400'
          } ${statusDotSizes[size]}`}
          title={isOnline ? 'Active' : 'Offline'}
          aria-label={isOnline ? 'Active' : 'Offline'}
        />
      )}
    </div>
  );
};

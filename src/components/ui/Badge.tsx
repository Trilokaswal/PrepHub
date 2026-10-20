import React from 'react';

export type BadgeVariant =
  | 'indigo'
  | 'success'
  | 'warning'
  | 'info'
  | 'neutral'
  | 'danger';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  withDot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  withDot = false,
  className = '',
  ...props
}) => {
  const variantStyles: Record<BadgeVariant, { container: string; dot: string }> = {
    indigo: {
      container: 'bg-[#EEF2FF] text-[#4F46E5] border border-indigo-200/70',
      dot: 'bg-[#4F46E5]',
    },
    success: {
      container: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
      dot: 'bg-emerald-500',
    },
    warning: {
      container: 'bg-amber-50 text-amber-700 border border-amber-200/80',
      dot: 'bg-amber-500',
    },
    info: {
      container: 'bg-sky-50 text-sky-700 border border-sky-200/80',
      dot: 'bg-sky-500',
    },
    neutral: {
      container: 'bg-slate-100 text-slate-700 border border-slate-200',
      dot: 'bg-slate-400',
    },
    danger: {
      container: 'bg-rose-50 text-rose-700 border border-rose-200/80',
      dot: 'bg-rose-500',
    },
  };

  const style = variantStyles[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${style.container} ${className}`}
      {...props}
    >
      {withDot && (
        <span
          className={`h-1.5 w-1.5 rounded-full shrink-0 ${style.dot}`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
};

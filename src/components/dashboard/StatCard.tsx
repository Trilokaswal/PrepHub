import React from 'react';
import { Card } from '@/components/ui/Card';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  isPositive?: boolean;
  period?: string;
  icon: React.ReactNode;
  iconBgColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  change,
  isPositive,
  period,
  icon,
  iconBgColor = 'bg-[#EEF2FF] text-[#4F46E5] border border-indigo-100',
}) => {
  return (
    <Card hoverable className="p-4 sm:p-5 transition-colors h-full flex flex-col justify-between">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-slate-500 truncate">
            {title}
          </p>
          <p className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight tabular-nums">
            {value}
          </p>
        </div>
        <div className={`p-2.5 rounded-lg shrink-0 ${iconBgColor}`}>
          {icon}
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        {change ? (
          <>
            <span
              className={`inline-flex items-center gap-1 font-medium ${
                isPositive === true
                  ? 'text-emerald-700'
                  : isPositive === false
                  ? 'text-amber-700'
                  : 'text-slate-500'
              }`}
            >
              {isPositive === true && <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />}
              {isPositive === false && <ArrowDownRight className="w-3.5 h-3.5" strokeWidth={1.75} />}
              {isPositive === undefined && <Minus className="w-3.5 h-3.5" strokeWidth={1.75} />}
              <span>{change}</span>
            </span>
            {period && <span className="text-slate-400 truncate ml-2">{period}</span>}
          </>
        ) : (
          <span className="text-slate-500 truncate">{subtitle || 'Active in catalog'}</span>
        )}
      </div>
    </Card>
  );
};

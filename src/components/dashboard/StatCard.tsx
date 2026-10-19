import React from 'react';
import { Card } from '@/components/ui/Card';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  isPositive?: boolean;
  period: string;
  icon: React.ReactNode;
  iconBgColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive,
  period,
  icon,
  iconBgColor = 'bg-[#EEF2FF] text-[#4F46E5]',
}) => {
  return (
    <Card hoverable className="p-5 sm:p-6 transition-all">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-xl shrink-0 ${iconBgColor}`}>
          {icon}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span
          className={`inline-flex items-center gap-1 font-semibold ${
            isPositive === true
              ? 'text-emerald-600'
              : isPositive === false
              ? 'text-amber-600'
              : 'text-slate-500'
          }`}
        >
          {isPositive === true && <ArrowUpRight className="w-3.5 h-3.5" />}
          {isPositive === false && <ArrowDownRight className="w-3.5 h-3.5" />}
          {isPositive === undefined && <Minus className="w-3.5 h-3.5" />}
          {change}
        </span>
        <span className="text-slate-400 font-medium truncate ml-2">
          {period}
        </span>
      </div>
    </Card>
  );
};

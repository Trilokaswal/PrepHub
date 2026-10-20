'use client';

import React from 'react';
import { Sigma } from 'lucide-react';

interface MathSymbolBarProps {
  onInsert: (symbol: string) => void;
  className?: string;
}

const COMMON_SYMBOLS = [
  { label: '±', val: '±', title: 'Plus-minus' },
  { label: 'π', val: 'π', title: 'Pi' },
  { label: 'θ', val: 'θ', title: 'Theta' },
  { label: 'λ', val: 'λ', title: 'Lambda' },
  { label: 'μ', val: 'μ', title: 'Micro / Mu' },
  { label: 'Δ', val: 'Δ', title: 'Delta' },
  { label: 'Ω', val: 'Ω', title: 'Ohm / Omega' },
  { label: '√', val: '√', title: 'Square root' },
  { label: '∫', val: '∫', title: 'Integral' },
  { label: '≈', val: '≈', title: 'Approximately equal' },
  { label: '≠', val: '≠', title: 'Not equal' },
  { label: '≤', val: '≤', title: 'Less than or equal' },
  { label: '≥', val: '≥', title: 'Greater than or equal' },
  { label: 'x²', val: '²', title: 'Superscript 2' },
  { label: 'x³', val: '³', title: 'Superscript 3' },
  { label: 'x₀', val: '₀', title: 'Subscript 0' },
  { label: 'x₁', val: '₁', title: 'Subscript 1' },
  { label: 'x₂', val: '₂', title: 'Subscript 2' },
  { label: '°', val: '°', title: 'Degree' },
  { label: '→', val: '→', title: 'Right arrow' },
  { label: '⇌', val: '⇌', title: 'Equilibrium arrow' },
  { label: 'Fraction', val: '\\frac{a}{b}', title: 'LaTeX Fraction template' },
  { label: 'Subscript', val: '_{i}', title: 'LaTeX Subscript template' },
];

export const MathSymbolBar: React.FC<MathSymbolBarProps> = ({
  onInsert,
  className = '',
}) => {
  return (
    <div
      className={`flex items-center gap-1 overflow-x-auto py-1 px-2 bg-slate-50 border border-slate-200/80 rounded-lg text-xs ${className}`}
      aria-label="Mathematical and scientific symbols toolbar"
    >
      <div className="flex items-center gap-1 text-slate-400 font-medium shrink-0 mr-1 select-none">
        <Sigma className="w-3.5 h-3.5 text-[#4F46E5]" strokeWidth={1.75} />
        <span className="text-[11px] hidden sm:inline">Symbols:</span>
      </div>
      <div className="flex items-center gap-1 flex-nowrap">
        {COMMON_SYMBOLS.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => onInsert(item.val)}
            title={`Insert ${item.title}`}
            aria-label={`Insert ${item.title}`}
            className="px-1.5 py-0.5 rounded text-slate-700 hover:text-indigo-600 hover:bg-white active:bg-slate-200 font-mono text-xs border border-transparent hover:border-slate-200 transition-colors shrink-0 select-none"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

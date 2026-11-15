'use client';

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import Link from 'next/link';

export const HeroInteractiveCard: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('B');
  const [secondsLeft, setSecondsLeft] = useState<number>(462); // 07:42

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 462));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const options = [
    { id: 'A', text: '3' },
    { id: 'B', text: '4' },
    { id: 'C', text: '5' },
    { id: 'D', text: '6' },
  ];

  return (
    <div className="w-full max-w-lg mx-auto bg-[#15233E] text-white rounded-2xl p-6 sm:p-7 shadow-2xl border border-slate-700/50 relative overflow-hidden">
      {/* Top Question Tracker */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-cyan-400">
          QUESTION 03 OF 06
        </span>
      </div>

      {/* Question Statement */}
      <h3 className="text-base sm:text-lg font-bold text-white mt-4 mb-6 leading-snug tracking-tight">
        If 2x + 5 = 13, what is the value of x?
      </h3>

      {/* Options Stack */}
      <div className="space-y-3">
        {options.map((opt) => {
          const isSelected = selectedOption === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelectedOption(opt.id)}
              className={`w-full flex items-center gap-3.5 p-3 sm:p-3.5 rounded-xl border text-left text-sm font-medium transition-all cursor-pointer ${
                isSelected
                  ? 'bg-teal-500/10 border-teal-400 text-white shadow-xs'
                  : 'bg-slate-800/40 hover:bg-slate-800/70 border-slate-700/60 text-slate-300'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold font-mono shrink-0 transition-colors ${
                  isSelected ? 'bg-teal-400 text-slate-950' : 'bg-slate-700/60 text-slate-300'
                }`}
              >
                {opt.id}
              </span>
              <span className="text-sm font-semibold">{opt.text}</span>
            </button>
          );
        })}
      </div>

      {/* Card Footer Bar */}
      <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
        <span>Answered 2 &bull; Flagged 1</span>
        <div className="flex items-center gap-1.5 text-slate-300">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span className="tabular-nums font-bold">{formattedTime}</span>
        </div>
      </div>
    </div>
  );
};

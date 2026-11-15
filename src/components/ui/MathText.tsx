'use client';

import React from 'react';

interface MathTextProps {
  text: string;
  className?: string;
}

/**
 * Parses simple LaTeX math fragments like:
 * - \sqrt{\frac{G\hbar}{c^3}}
 * - \frac{a}{b}
 * - G\hbar^2 c^3
 * - $G$, $\hbar$, $c$
 * and renders them in high-quality serif math typography with stacked fractions and radicals.
 */
export const MathText: React.FC<MathTextProps> = ({ text, className = '' }) => {
  if (!text) return null;

  // Render fraction
  const renderFraction = (numerator: string, denominator: string, key: string | number) => (
    <span key={key} className="inline-flex flex-col items-center align-middle mx-1 text-[0.9em] leading-none">
      <span className="border-b border-slate-800 pb-0.5 px-1 font-serif italic text-center">
        {renderMathInner(numerator)}
      </span>
      <span className="pt-0.5 px-1 font-serif italic text-center">
        {renderMathInner(denominator)}
      </span>
    </span>
  );

  // Render square root
  const renderSqrt = (content: string, key: string | number) => (
    <span key={key} className="inline-flex items-center align-middle mx-0.5">
      <span className="text-xl leading-none font-serif select-none mr-[-1px] font-light">√</span>
      <span className="border-t border-slate-800 pt-[1px] pl-0.5 pr-1 inline-flex items-center">
        {renderMathInner(content)}
      </span>
    </span>
  );

  // Parse inner math string (handling fractions, sqrts, powers, symbols)
  const renderMathInner = (mathStr: string): React.ReactNode => {
    // 1. Check for \sqrt{\frac{A}{B}}
    const sqrtFracMatch = mathStr.match(/^\\sqrt\{\\frac\{([^}]+)\}\{([^}]+)\}\}$/);
    if (sqrtFracMatch) {
      return renderSqrt(
        renderFraction(sqrtFracMatch[1], sqrtFracMatch[2], 'sqrt-frac') as unknown as string,
        'sqrt-main'
      );
    }

    // 2. Check for \sqrt{A}
    const sqrtMatch = mathStr.match(/^\\sqrt\{([^}]+)\}$/);
    if (sqrtMatch) {
      return renderSqrt(sqrtMatch[1], 'sqrt-only');
    }

    // 3. Check for \frac{A}{B}
    const fracMatch = mathStr.match(/^\\frac\{([^}]+)\}\{([^}]+)\}$/);
    if (fracMatch) {
      return renderFraction(fracMatch[1], fracMatch[2], 'frac-only');
    }

    // 4. Tokenize symbols, superscripts, variables
    // Replace LaTeX tokens with characters
    let processed = mathStr
      .replace(/\\hbar/g, 'ℏ')
      .replace(/\\cdot/g, '·')
      .replace(/\\Delta/g, 'Δ')
      .replace(/\\gamma/g, 'γ')
      .replace(/\\theta/g, 'θ')
      .replace(/\\pi/g, 'π')
      .replace(/\\approx/g, '≈')
      .replace(/\\le/g, '≤')
      .replace(/\\ge/g, '≥')
      .replace(/\\times/g, '×');

    // Parse powers like x^2, c^3, \hbar^2
    const parts: React.ReactNode[] = [];
    const regex = /([A-Za-zℏγθπΔ])\^([0-9A-Za-z+\-]+)|([A-Za-zℏγθπΔ])_([0-9A-Za-z+\-]+)|([A-Za-zℏγθπΔ]+)|([^A-Za-zℏγθπΔ^_\s]+|\s+)/g;
    let match;
    let idx = 0;

    while ((match = regex.exec(processed)) !== null) {
      if (match[1] && match[2]) {
        // Variable with power: e.g. G^2 or c^3
        parts.push(
          <span key={idx++} className="font-serif italic inline-flex items-baseline">
            <span>{match[1]}</span>
            <sup className="text-[0.7em] font-sans font-normal ml-[1px] not-italic">{match[2]}</sup>
          </span>
        );
      } else if (match[3] && match[4]) {
        // Variable with subscript: e.g. T_H
        parts.push(
          <span key={idx++} className="font-serif italic inline-flex items-baseline">
            <span>{match[3]}</span>
            <sub className="text-[0.7em] font-sans font-normal ml-[1px] not-italic">{match[4]}</sub>
          </span>
        );
      } else if (match[5]) {
        // Plain math variable
        parts.push(
          <span key={idx++} className="font-serif italic px-[1px]">
            {match[5]}
          </span>
        );
      } else if (match[6]) {
        parts.push(<span key={idx++}>{match[6]}</span>);
      }
    }

    if (parts.length > 0) return parts;
    return <span className="font-serif italic">{processed}</span>;
  };

  // If text contains $...$ inline math delimiters, split and render math segments
  if (text.includes('$') || text.includes('\\sqrt') || text.includes('\\frac')) {
    const segments = text.split(/(\$[^$]+\$|\\sqrt\{[^}]+\}|\\frac\{[^}]+\}\{[^}]+\})/g);

    return (
      <span className={className}>
        {segments.map((seg, i) => {
          if (!seg) return null;
          if (seg.startsWith('$') && seg.endsWith('$')) {
            const mathContent = seg.slice(1, -1);
            return (
              <span key={i} className="inline-block mx-0.5">
                {renderMathInner(mathContent)}
              </span>
            );
          }
          if (seg.startsWith('\\sqrt') || seg.startsWith('\\frac')) {
            return (
              <span key={i} className="inline-block mx-0.5">
                {renderMathInner(seg)}
              </span>
            );
          }
          return <span key={i}>{seg}</span>;
        })}
      </span>
    );
  }

  // Plain text fallback
  return <span className={className}>{text}</span>;
};

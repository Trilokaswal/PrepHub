'use client';

import React, { useMemo } from 'react';
import katex from 'katex';

interface MathTextProps {
  text?: string | null;
  className?: string;
  block?: boolean;
}

interface Segment {
  type: 'text' | 'inline-math' | 'block-math';
  content: string;
}

/**
 * Safely renders a LaTeX math snippet into HTML via KaTeX.
 */
function renderKatexHtml(latex: string, displayMode: boolean): string {
  try {
    return katex.renderToString(latex.trim(), {
      displayMode,
      throwOnError: false,
      output: 'htmlAndMathml',
      strict: false,
      trust: false,
    });
  } catch (err) {
    console.warn('KaTeX rendering error for expression:', latex, err);
    return `<span class="katex-fallback font-mono text-sm text-slate-800">${escapeHtml(latex)}</span>`;
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Checks if a string without explicit $ delimiters is likely raw LaTeX.
 * (e.g. "\frac{1}{2}", "\sqrt{x}", "\int_0^1", "\begin{pmatrix}...")
 */
function isRawLatex(str: string): boolean {
  const trimmed = str.trim();
  if (trimmed.startsWith('\\') && !trimmed.includes(' ')) return true;
  return /\\(frac|sqrt|int|sum|prod|lim|infty|alpha|beta|gamma|delta|epsilon|theta|lambda|mu|pi|sigma|tau|phi|omega|partial|nabla|begin|end|times|approx|le|ge|ne|pm|cdot)\b/.test(
    trimmed
  );
}

/**
 * Splits text into alternating plain text and math segments based on:
 * - $$...$$ or \[...\] for display / block math
 * - $...$ or \(...\) for inline math
 */
function parseSegments(raw: string): Segment[] {
  const segments: Segment[] = [];
  // Regex to match $$, \[, $, and \(
  const regex = /\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\$([^\$\n]+?)\$|\\\(([\s\S]+?)\\\)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(raw)) !== null) {
    // Leading plain text before the match
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        content: raw.slice(lastIndex, match.index),
      });
    }

    if (match[1] !== undefined) {
      // $$...$$
      segments.push({ type: 'block-math', content: match[1] });
    } else if (match[2] !== undefined) {
      // \[...\]
      segments.push({ type: 'block-math', content: match[2] });
    } else if (match[3] !== undefined) {
      // $...$
      segments.push({ type: 'inline-math', content: match[3] });
    } else if (match[4] !== undefined) {
      // \(...\)
      segments.push({ type: 'inline-math', content: match[4] });
    }

    lastIndex = regex.lastIndex;
  }

  // Trailing plain text after the last match
  if (lastIndex < raw.length) {
    segments.push({
      type: 'text',
      content: raw.slice(lastIndex),
    });
  }

  return segments;
}

/**
 * Production-ready MathText component powered by KaTeX.
 * Supports:
 *  - Inline math: $E = mc^2$ or \(E = mc^2\)
 *  - Block/Display math: $$\int_0^\infty e^{-x^2} dx$$ or \[\frac{-b \pm \sqrt{b^2-4ac}}{2a}\]
 *  - Raw unquoted LaTeX formulas (e.g. \frac{a}{b})
 *  - Responsive scroll wrappers for large matrices or expressions
 */
export const MathText: React.FC<MathTextProps> = ({
  text,
  className = '',
  block = false,
}) => {
  const content = text || '';

  const { isEntirelyRawMath, rawLatexHtml, segments } = useMemo(() => {
    if (!content.trim()) {
      return { isEntirelyRawMath: false, rawLatexHtml: '', segments: [] };
    }

    const trimmed = content.trim();
    const isRaw =
      !trimmed.includes('$') &&
      !trimmed.includes('\\(') &&
      !trimmed.includes('\\[') &&
      isRawLatex(trimmed);

    if (block || isRaw) {
      return {
        isEntirelyRawMath: true,
        rawLatexHtml: renderKatexHtml(trimmed, block || trimmed.includes('\\begin')),
        segments: [],
      };
    }

    return {
      isEntirelyRawMath: false,
      rawLatexHtml: '',
      segments: parseSegments(content),
    };
  }, [content, block]);

  if (!content.trim()) return null;

  if (isEntirelyRawMath) {
    return (
      <div
        className={`katex-block-wrapper my-2 overflow-x-auto overflow-y-hidden max-w-full text-center py-1 ${className}`}
        dangerouslySetInnerHTML={{ __html: rawLatexHtml }}
      />
    );
  }

  // If no math delimiters were detected at all, render simple text
  if (segments.length === 1 && segments[0].type === 'text') {
    return <span className={className}>{content}</span>;
  }

  return (
    <span className={`katex-text-container ${className}`}>
      {segments.map((seg, idx) => {
        if (seg.type === 'text') {
          return <span key={idx}>{seg.content}</span>;
        }

        if (seg.type === 'block-math') {
          const html = renderKatexHtml(seg.content, true);
          return (
            <span
              key={idx}
              className="block my-2 overflow-x-auto overflow-y-hidden text-center py-1 select-text"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }

        // Inline math
        const html = renderKatexHtml(seg.content, false);
        return (
          <span
            key={idx}
            className="inline-math-item inline-block align-baseline mx-0.5 select-text"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      })}
    </span>
  );
};

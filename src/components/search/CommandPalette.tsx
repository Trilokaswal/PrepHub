'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  BookOpen,
  Layers,
  ArrowRight,
  Clock,
  CornerDownLeft,
  X,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { COURSES_DATA } from '@/data/coursesData';
import { getStoredTests } from '@/lib/testStore';
import { CourseIcon } from '@/components/courses/CourseIcon';

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Mock Test' | 'Course' | 'Semester';
  href: string;
  badge?: string;
  duration?: number;
  courseId?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Build searchable database
  const allItems = useMemo(() => {
    const items: SearchItem[] = [];

    // 1. Mock Tests from test store
    const storedTests = getStoredTests();
    storedTests.forEach((t) => {
      items.push({
        id: `test-${t.id}`,
        title: t.title,
        subtitle: `${t.subject} • ${t.difficulty || 'Beginner'}`,
        category: 'Mock Test',
        href: `/test/${t.id}`,
        badge: t.difficulty || 'Beginner',
        duration: t.durationMinutes || 10,
      });
    });

    // 2. Courses
    COURSES_DATA.forEach((c) => {
      items.push({
        id: `course-${c.id}`,
        title: `${c.name} — ${c.title}`,
        subtitle: `${c.totalSemesters} Semesters • ${c.totalMockTests} Mock Tests`,
        category: 'Course',
        href: `/courses/${c.id}`,
        courseId: c.id,
      });

      // 3. Semesters
      c.semesters.forEach((s) => {
        items.push({
          id: `sem-${c.id}-${s.id}`,
          title: `${c.name} &bull; ${s.title}`,
          subtitle: `Browse subjects & mock tests for ${c.name} ${s.title}`,
          category: 'Semester',
          href: `/courses/${c.id}/${s.id}`,
        });
      });
    });

    return items;
  }, []);

  // Filter items based on query
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Default recommended list: Tests first, then courses
      return allItems.slice(0, 8);
    }

    return allItems
      .filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(q);
        const subMatch = item.subtitle.toLowerCase().includes(q);
        const catMatch = item.category.toLowerCase().includes(q);
        return titleMatch || subMatch || catMatch;
      })
      .slice(0, 10);
  }, [allItems, query]);

  // Keep selected index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems.length]);

  // Keyboard navigation inside palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = filteredItems[selectedIndex];
      if (target) {
        onClose();
        router.push(target.href);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  // Scroll active item into view
  useEffect(() => {
    const activeEl = listRef.current?.children[selectedIndex] as HTMLElement | undefined;
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-start justify-center pt-20 sm:pt-28 p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-slate-100">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search mock tests, courses, semesters... (e.g. Maths, B.Tech)"
            className="w-full text-sm font-medium text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono font-semibold text-slate-500">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-50 focus:outline-none"
        >
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Search className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs font-semibold text-slate-600">No mock tests or courses found</p>
              <p className="text-[11px] text-slate-400 font-mono">
                Try searching for &quot;Mathematics&quot;, &quot;B.Tech&quot;, or &quot;Semester 1&quot;
              </p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onClose();
                    router.push(item.href);
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected ? 'bg-slate-100/90 text-slate-900' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        item.category === 'Mock Test'
                          ? 'bg-[#E14D45]/10 text-[#E14D45]'
                          : item.category === 'Course'
                          ? 'bg-[#15233E]/10 text-[#15233E]'
                          : 'bg-indigo-50 text-indigo-700'
                      }`}
                    >
                      {item.category === 'Mock Test' ? (
                        <Sparkles className="w-4 h-4" />
                      ) : item.category === 'Course' ? (
                        <CourseIcon courseId={item.courseId || ''} className="w-4 h-4" />
                      ) : (
                        <Layers className="w-4 h-4" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold truncate tracking-tight text-slate-900">
                          {item.title}
                        </span>
                        <span
                          className={`text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded shrink-0 ${
                            item.category === 'Mock Test'
                              ? 'bg-rose-50 text-[#E14D45] border border-rose-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate font-mono mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Right side badge / enter hotkey */}
                  <div className="shrink-0 pl-3 flex items-center gap-2">
                    {item.duration && (
                      <span className="text-[10px] font-mono text-slate-400 hidden sm:inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.duration}m</span>
                      </span>
                    )}

                    {isSelected ? (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono font-bold text-slate-700 shadow-2xs">
                        <span>Select</span>
                        <CornerDownLeft className="w-2.5 h-2.5" />
                      </span>
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-600 font-bold">
                ↑
              </kbd>{' '}
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-600 font-bold">
                ↓
              </kbd>{' '}
              Navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-600 font-bold">
                ↵
              </kbd>{' '}
              Open
            </span>
          </div>

          <span className="hidden sm:inline">Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};

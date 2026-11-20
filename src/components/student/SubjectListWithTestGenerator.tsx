'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  HelpCircle,
  Play,
  CheckCircle2,
  Shuffle,
  Clock,
  Layers,
} from 'lucide-react';
import { SubjectIcon } from '@/components/courses/CourseIcon';
import { SubjectTestAttemptModal } from '@/components/student/SubjectTestAttemptModal';
import { getTopicsForSubject } from '@/lib/subjectCurriculumTopics';

export interface SubjectItem {
  id: string;
  name: string;
  code?: string;
  description: string;
}

interface SubjectListWithTestGeneratorProps {
  subjects: SubjectItem[];
  courseName?: string;
  branchName?: string;
  semesterTitle?: string;
}

export const SubjectListWithTestGenerator: React.FC<SubjectListWithTestGeneratorProps> = ({
  subjects,
  courseName,
  branchName,
  semesterTitle,
}) => {
  const [activeSubject, setActiveSubject] = useState<SubjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenAttempt = (subject: SubjectItem) => {
    setActiveSubject(subject);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="space-y-6">
        {subjects.map((subject, sIdx) => {
          const topics = getTopicsForSubject(subject.name);

          return (
            <div
              key={subject.id || sIdx}
              className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
            >
              {/* Left Side: Subject Details */}
              <div className="flex items-start gap-5 max-w-3xl">
                {/* Subject Icon in square shape with rounded corners */}
                <div className="w-14 h-14 rounded-2xl bg-[#15233E] text-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 group-hover:bg-[#1E2F52] transition-all">
                  <SubjectIcon subjectName={subject.name} className="w-7 h-7 stroke-[1.8]" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                      {subject.code || `SUBJ-${sIdx + 1}`}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                      {subject.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl">
                    {subject.description}
                  </p>

                  {/* Topics Pills Preview */}
                  <div className="pt-2 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase mr-1">
                      Topics:
                    </span>
                    {topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-lg border border-slate-200/60"
                      >
                        {topic}
                      </span>
                    ))}
                    {topics.length > 3 && (
                      <span className="text-[11px] font-mono font-semibold text-[#E14D45] bg-[#E14D45]/10 px-2 py-0.5 rounded-lg">
                        +{topics.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side: Single Attempt Test Button */}
              <div className="shrink-0 flex flex-col sm:items-end gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <Shuffle className="w-3.5 h-3.5 text-[#E14D45]" />
                  <span>Randomized Mock Test</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenAttempt(subject)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#E14D45] hover:bg-[#CC3F37] text-white text-xs sm:text-sm font-bold tracking-tight shadow-sm active:scale-[0.98] transition-all cursor-pointer group-hover:shadow-md"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Attempt Test</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Test Generator Modal */}
      <SubjectTestAttemptModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        subject={activeSubject}
        courseName={courseName}
        branchName={branchName}
        semesterTitle={semesterTitle}
      />
    </>
  );
};

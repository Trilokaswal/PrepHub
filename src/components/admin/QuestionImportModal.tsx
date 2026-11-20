'use client';

import React, { useState, useRef } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { ParsedQuestionCandidate } from '@/lib/questionParser';
import { MathText } from '@/components/ui/MathText';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  FileSpreadsheet,
  FileCode,
  File,
  Check,
  RefreshCw,
} from 'lucide-react';

interface QuestionImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportConfirmed: (questions: ParsedQuestionCandidate[]) => Promise<void>;
  existingSubjects: string[];
}

export const QuestionImportModal: React.FC<QuestionImportModalProps> = ({
  isOpen,
  onClose,
  onImportConfirmed,
  existingSubjects,
}) => {
  const [step, setStep] = useState<'upload' | 'preview'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [defaultSubject, setDefaultSubject] = useState(existingSubjects[0] || 'Physics');
  const [customSubject, setCustomSubject] = useState('');
  const [defaultTopic, setDefaultTopic] = useState('General');
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  // Preview stage state
  const [candidates, setCandidates] = useState<ParsedQuestionCandidate[]>([]);
  const [batchSubject, setBatchSubject] = useState('');
  const [batchDifficulty, setBatchDifficulty] = useState<'' | 'Easy' | 'Medium' | 'Hard'>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetState = () => {
    setStep('upload');
    setSelectedFile(null);
    setCandidates([]);
    setParseError(null);
    setIsParsing(false);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    setParseError(null);
    const name = file.name.toLowerCase();
    const validExts = ['.docx', '.pdf', '.txt', '.md', '.csv', '.json'];
    const hasValidExt = validExts.some((ext) => name.endsWith(ext));

    if (!hasValidExt) {
      setParseError('Unsupported file format. Please upload DOCX, PDF, TXT, Markdown, CSV, or JSON.');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setParseError('File is too large. Maximum supported upload size is 20 MB.');
      return;
    }

    setSelectedFile(file);
  };

  const handleParseFile = async () => {
    if (!selectedFile) return;

    try {
      setIsParsing(true);
      setParseError(null);

      const finalSubject = defaultSubject === '__new__' ? customSubject.trim() || 'General' : defaultSubject;

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('defaultSubject', finalSubject);
      formData.append('defaultTopic', defaultTopic.trim() || 'General');

      const response = await fetch('/api/admin/parse', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to parse questions from file.');
      }

      if (!data.questions || data.questions.length === 0) {
        throw new Error('No questions could be extracted from this document. Please ensure questions follow standard numbering (e.g. 1. Question... A) ... B) ... Answer: A).');
      }

      setCandidates(data.questions);
      setStep('preview');
      setIsParsing(false);
    } catch (err: any) {
      setIsParsing(false);
      setParseError(err.message || 'File parsing failed.');
    }
  };

  // Preview modifications
  const handleUpdateCandidate = (index: number, updates: Partial<ParsedQuestionCandidate>) => {
    setCandidates((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...updates };
      // Re-evaluate status if options were updated
      if (updates.options) {
        const hasCorrect = updates.options.some((o) => o.isCorrect);
        if (hasCorrect && copy[index].status === 'needs_answer') {
          copy[index].status = 'ready';
          copy[index].validationMessage = undefined;
        }
      }
      return copy;
    });
  };

  const handleSetOptionCorrect = (candIndex: number, optIndex: number) => {
    setCandidates((prev) => {
      const copy = [...prev];
      const target = copy[candIndex];
      const newOpts = target.options.map((opt, i) => ({
        ...opt,
        isCorrect: i === optIndex,
      }));
      const chosenText = newOpts[optIndex]?.text || '';
      copy[candIndex] = {
        ...target,
        options: newOpts,
        correctAnswer: chosenText,
        status: 'ready',
        validationMessage: undefined,
      };
      return copy;
    });
  };

  const handleRemoveCandidate = (index: number) => {
    setCandidates((prev) => prev.filter((_, i) => i !== index));
  };

  const handleApplyBatchSubject = (subj: string) => {
    setBatchSubject(subj);
    if (!subj) return;
    setCandidates((prev) => prev.map((q) => ({ ...q, subject: subj })));
  };

  const handleApplyBatchDifficulty = (diff: 'Easy' | 'Medium' | 'Hard') => {
    setBatchDifficulty(diff);
    setCandidates((prev) => prev.map((q) => ({ ...q, difficulty: diff })));
  };

  const handleConfirmImport = async () => {
    if (candidates.length === 0) return;

    try {
      setIsSubmitting(true);
      await onImportConfirmed(candidates);
      setIsSubmitting(false);
      handleClose();
    } catch (err: any) {
      setIsSubmitting(false);
      setParseError(err.message || 'Failed to save parsed questions.');
    }
  };

  const readyCount = candidates.filter((c) => c.status === 'ready').length;
  const warningCount = candidates.length - readyCount;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={step === 'upload' ? 'Upload & Import Questions' : 'Import Preview & Verification'}
      size="2xl"
    >
      {step === 'upload' ? (
        <div className="space-y-6 pt-2">
          {/* File dropzone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-[#E14D45] rounded-2xl p-8 text-center cursor-pointer transition-all bg-slate-50/50 hover:bg-rose-50/20 group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".docx,.pdf,.txt,.md,.csv,.json"
              className="hidden"
            />
            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 text-[#E14D45] shadow-xs flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
              <UploadCloud className="w-7 h-7" />
            </div>

            {selectedFile ? (
              <div className="space-y-1">
                <span className="text-sm font-bold text-slate-900 block">{selectedFile.name}</span>
                <span className="text-xs text-slate-400 font-mono">
                  {(selectedFile.size / 1024).toFixed(1)} KB &bull; Click or drag to change file
                </span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <span className="text-sm font-bold text-slate-800 block">
                  Click to browse or drop question file here
                </span>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Supports DOCX, PDF, Markdown (.md), TXT, CSV, and JSON formats.
                </p>
                <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                  <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-mono font-semibold text-slate-600">
                    .DOCX
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-mono font-semibold text-slate-600">
                    .PDF
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-mono font-semibold text-slate-600">
                    .TXT
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-mono font-semibold text-slate-600">
                    .MD
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-mono font-semibold text-slate-600">
                    .CSV
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-mono font-semibold text-slate-600">
                    .JSON
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Default Subject & Topic Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider font-mono">
                Default Subject (Fallback)
              </label>
              <select
                value={defaultSubject}
                onChange={(e) => setDefaultSubject(e.target.value)}
                className="w-full text-xs font-medium rounded-lg border border-slate-300 px-3 py-2 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#E14D45]/30"
              >
                {existingSubjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
                <option value="__new__">+ Specify New Subject...</option>
              </select>
              {defaultSubject === '__new__' && (
                <input
                  type="text"
                  placeholder="New subject name..."
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  className="mt-2 w-full text-xs rounded-lg border border-slate-300 px-3 py-1.5"
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider font-mono">
                Default Chapter / Topic (Fallback)
              </label>
              <input
                type="text"
                placeholder="e.g. Unit 1: Thermodynamics"
                value={defaultTopic}
                onChange={(e) => setDefaultTopic(e.target.value)}
                className="w-full text-xs font-medium rounded-lg border border-slate-300 px-3 py-2 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#E14D45]/30"
              />
            </div>
          </div>

          {parseError && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{parseError}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <Button variant="outline" onClick={handleClose} disabled={isParsing}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleParseFile}
              disabled={!selectedFile || isParsing}
              className="bg-[#E14D45] hover:bg-[#CC3F37]"
            >
              {isParsing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Parsing Questions...</span>
                </>
              ) : (
                <>
                  <span>Parse &amp; Preview Questions</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* STAGE 2: IMPORT PREVIEW & VERIFICATION                                     */
        /* ========================================================================= */
        <div className="space-y-6 pt-1 max-h-[75vh] flex flex-col">
          {/* Header summary & batch toolbar */}
          <div className="shrink-0 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-xl font-extrabold text-slate-900 block">{candidates.length}</span>
                  <span className="text-[11px] text-slate-500 font-medium">Total Questions</span>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div>
                  <span className="text-xl font-extrabold text-emerald-600 block">{readyCount}</span>
                  <span className="text-[11px] text-slate-500 font-medium">Ready to Save</span>
                </div>
                {warningCount > 0 && (
                  <>
                    <div className="h-8 w-px bg-slate-200" />
                    <div>
                      <span className="text-xl font-extrabold text-amber-600 block">{warningCount}</span>
                      <span className="text-[11px] text-slate-500 font-medium">Needs Attention</span>
                    </div>
                  </>
                )}
              </div>

              {/* Quick batch modifiers */}
              <div className="flex items-center gap-2">
                <select
                  value={batchSubject}
                  onChange={(e) => handleApplyBatchSubject(e.target.value)}
                  className="text-xs rounded-lg border border-slate-300 px-2.5 py-1.5 bg-white text-slate-700"
                >
                  <option value="">Set Subject for All...</option>
                  {existingSubjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <select
                  value={batchDifficulty}
                  onChange={(e) => handleApplyBatchDifficulty(e.target.value as any)}
                  className="text-xs rounded-lg border border-slate-300 px-2.5 py-1.5 bg-white text-slate-700"
                >
                  <option value="">Set Difficulty for All...</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              Review each parsed question below. You can edit statements, change options, and click option
              letters (A, B, C, D) to assign or verify correct answers before saving.
            </p>
          </div>

          {/* Scrollable list of parsed candidates */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {candidates.map((cand, idx) => (
              <div
                key={cand.tempId || idx}
                className={`p-4 rounded-xl border transition-all ${
                  cand.status === 'ready'
                    ? 'border-slate-200 bg-white'
                    : cand.status === 'duplicate'
                    ? 'border-purple-200 bg-purple-50/30'
                    : 'border-amber-300 bg-amber-50/20 ring-1 ring-amber-300/40'
                }`}
              >
                {/* Header line: Question number, badges, remove button */}
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      Q{idx + 1}
                    </span>

                    {/* Status badge */}
                    {cand.status === 'ready' ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3" />
                        <span>Ready</span>
                      </span>
                    ) : cand.status === 'duplicate' ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                        <span>Potential Duplicate</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Select Answer</span>
                      </span>
                    )}

                    {/* Subject & Difficulty tags */}
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      {cand.subject}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        cand.difficulty === 'Easy'
                          ? 'bg-emerald-100 text-emerald-800'
                          : cand.difficulty === 'Hard'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {cand.difficulty}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveCandidate(idx)}
                    className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                    title="Remove this question from import"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Editable Statement */}
                <div className="space-y-2 mb-3">
                  <textarea
                    rows={2}
                    value={cand.statement}
                    onChange={(e) => handleUpdateCandidate(idx, { statement: e.target.value })}
                    className="w-full text-xs font-medium rounded-lg border border-slate-200 p-2 text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-[#E14D45]"
                  />
                  {/* Math text preview */}
                  {cand.statement.includes('$') && (
                    <div className="text-xs text-slate-700 bg-slate-50 p-2 rounded-lg">
                      <MathText text={cand.statement} />
                    </div>
                  )}
                </div>

                {/* Options list for MCQs */}
                {cand.options && cand.options.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                      Options &bull; Click circle to designate correct answer
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {cand.options.map((opt, oIdx) => (
                        <div
                          key={opt.id || oIdx}
                          onClick={() => handleSetOptionCorrect(idx, oIdx)}
                          className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all ${
                            opt.isCorrect
                              ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-bold'
                              : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70 text-slate-700'
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                              opt.isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="text-xs truncate">{opt.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Explanation line if available */}
                {cand.explanation && (
                  <p className="mt-2 text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded-lg">
                    <span className="font-semibold not-italic text-slate-700">Explanation: </span>
                    {cand.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="shrink-0 pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep('upload')}
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Upload</span>
            </button>

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleConfirmImport}
                disabled={isSubmitting || candidates.length === 0}
                className="bg-[#E14D45] hover:bg-[#CC3F37]"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving to Database...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm &amp; Import ({candidates.length} Questions)</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

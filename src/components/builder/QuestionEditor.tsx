'use client';

import React, { useState } from 'react';
import {
  Copy,
  Trash2,
  Plus,
  X,
  Image as ImageIcon,
  CheckCircle2,
  CheckSquare,
  Hash,
  FileText,
  AlertCircle,
  Eye,
  Edit3,
} from 'lucide-react';
import { Question, QuestionType, McqOption } from '@/types';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { MathSymbolBar } from './MathSymbolBar';

interface QuestionEditorProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onUpdateQuestion: (updated: Question) => void;
  onDuplicateQuestion: (id: string) => void;
  onDeleteQuestion: (id: string) => void;
}

export const QuestionEditor: React.FC<QuestionEditorProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onUpdateQuestion,
  onDuplicateQuestion,
  onDeleteQuestion,
}) => {
  const [statementPreview, setStatementPreview] = useState(false);
  const [showImageInput, setShowImageInput] = useState(!!question.imageUrl);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Helper to update specific fields
  const updateField = <K extends keyof Question>(key: K, value: Question[K]) => {
    onUpdateQuestion({
      ...question,
      [key]: value,
      updatedAt: new Date().toISOString(),
    });
  };

  // Insert symbol at current cursor position or append to statement
  const handleInsertSymbol = (symbol: string) => {
    updateField('statement', (question.statement || '') + symbol);
  };

  // Change Question Type (preserving statement and marks)
  const handleTypeChange = (newType: QuestionType) => {
    if (newType === question.type) return;

    const base: Question = {
      ...question,
      type: newType,
      updatedAt: new Date().toISOString(),
    };

    if (newType === 'single_choice' || newType === 'multiple_choice') {
      if (!base.options || base.options.length === 0) {
        base.options = [
          { id: `${question.id}-opt-1`, text: 'Option A', isCorrect: true },
          { id: `${question.id}-opt-2`, text: 'Option B', isCorrect: false },
          { id: `${question.id}-opt-3`, text: 'Option C', isCorrect: false },
          { id: `${question.id}-opt-4`, text: 'Option D', isCorrect: false },
        ];
      }
    }

    if (newType === 'numerical') {
      if (base.expectedNumericAnswer === undefined) {
        base.expectedNumericAnswer = 0;
        base.numericTolerance = 0;
      }
    }

    if (newType === 'subjective') {
      if (base.wordLimit === undefined) {
        base.wordLimit = 200;
        base.subjectiveGuidelines = 'Key points required for full marks...';
      }
    }

    onUpdateQuestion(base);
  };

  // Option Handlers for MCQs
  const handleAddOption = () => {
    const currentOptions = question.options || [];
    const nextLetter = String.fromCharCode(65 + currentOptions.length);
    const newOption: McqOption = {
      id: `${question.id}-opt-${Date.now().toString().slice(-4)}`,
      text: `Option ${nextLetter}`,
      isCorrect: false,
    };
    updateField('options', [...currentOptions, newOption]);
  };

  const handleUpdateOption = (index: number, text: string) => {
    const currentOptions = [...(question.options || [])];
    currentOptions[index] = { ...currentOptions[index], text };
    updateField('options', currentOptions);
  };

  const handleRemoveOption = (index: number) => {
    const currentOptions = (question.options || []).filter((_, i) => i !== index);
    // If we deleted the only correct option in single choice, set first option as correct
    if (question.type === 'single_choice' && !currentOptions.some((o) => o.isCorrect) && currentOptions.length > 0) {
      currentOptions[0].isCorrect = true;
    }
    updateField('options', currentOptions);
  };

  const handleToggleCorrectSingle = (index: number) => {
    const currentOptions = (question.options || []).map((opt, i) => ({
      ...opt,
      isCorrect: i === index,
    }));
    updateField('options', currentOptions);
  };

  const handleToggleCorrectMultiple = (index: number) => {
    const currentOptions = (question.options || []).map((opt, i) => {
      if (i === index) {
        return { ...opt, isCorrect: !opt.isCorrect };
      }
      return opt;
    });
    updateField('options', currentOptions);
  };

  return (
    <div className="flex-1 bg-white rounded-xl border border-slate-200/90 shadow-xs flex flex-col overflow-hidden">
      {/* Top Question Controls Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-50/50">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="text-base font-semibold text-slate-900 tracking-tight">
            Question {questionNumber} of {totalQuestions}
          </span>

          {/* Type Selector Tabs */}
          <div className="inline-flex items-center p-1 rounded-lg bg-slate-200/70 text-xs">
            <button
              type="button"
              onClick={() => handleTypeChange('single_choice')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors ${
                question.type === 'single_choice'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Single MCQ</span>
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('multiple_choice')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors ${
                question.type === 'multiple_choice'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Multi-Select</span>
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('numerical')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors ${
                question.type === 'numerical'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Hash className="w-3.5 h-3.5" />
              <span>Numerical</span>
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('subjective')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors ${
                question.type === 'subjective'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Subjective</span>
            </button>
          </div>
        </div>

        {/* Marks and Operations */}
        <div className="flex items-center gap-3">
          {/* Positive Marks */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <label htmlFor={`marks-${question.id}`} className="font-medium">
              Marks:
            </label>
            <input
              id={`marks-${question.id}`}
              type="number"
              min="0.5"
              step="0.5"
              value={question.marks}
              onChange={(e) => updateField('marks', Math.max(0.5, parseFloat(e.target.value) || 0))}
              className="w-16 px-2 py-1 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-800 text-center focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Negative Marks (Optional) */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <label htmlFor={`neg-marks-${question.id}`} className="font-medium text-slate-500">
              Penalty:
            </label>
            <input
              id={`neg-marks-${question.id}`}
              type="number"
              min="0"
              step="0.25"
              value={question.negativeMarks ?? 0}
              onChange={(e) => updateField('negativeMarks', Math.max(0, parseFloat(e.target.value) || 0))}
              placeholder="0"
              className="w-16 px-2 py-1 bg-white border border-slate-200 rounded-md text-xs font-medium text-rose-700 text-center focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="h-4 w-px bg-slate-200" aria-hidden="true" />

          {/* Action: Duplicate */}
          <button
            type="button"
            onClick={() => onDuplicateQuestion(question.id)}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            title="Duplicate question"
            aria-label="Duplicate question"
          >
            <Copy className="w-4 h-4" strokeWidth={1.75} />
          </button>

          {/* Action: Delete */}
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Delete question"
            aria-label="Delete question"
          >
            <Trash2 className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="p-4 sm:p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-18rem)]">
        {/* Question Statement Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor={`statement-${question.id}`}
              className="block text-xs font-medium text-slate-700"
            >
              Question Statement <span className="text-rose-500">*</span>
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowImageInput(!showImageInput)}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-indigo-600 px-2 py-0.5 rounded hover:bg-slate-100"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{showImageInput ? 'Hide Image' : 'Attach Image'}</span>
              </button>

              <button
                type="button"
                onClick={() => setStatementPreview(!statementPreview)}
                className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium px-2 py-0.5 rounded hover:bg-indigo-50"
              >
                {statementPreview ? (
                  <>
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Source</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Live Preview</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Fast Math Symbol Toolbar */}
          <MathSymbolBar onInsert={handleInsertSymbol} />

          {/* Textarea or Preview */}
          {statementPreview ? (
            <div className="min-h-[100px] p-3.5 bg-slate-50/70 border border-slate-200 rounded-lg text-sm text-slate-800 whitespace-pre-line leading-relaxed font-sans">
              {question.statement ? (
                question.statement
              ) : (
                <em className="text-slate-400">Statement preview is empty. Switch to edit mode to type question text.</em>
              )}
            </div>
          ) : (
            <textarea
              id={`statement-${question.id}`}
              rows={4}
              value={question.statement}
              onChange={(e) => updateField('statement', e.target.value)}
              placeholder="Enter your question statement here. You can insert mathematical symbols and formatted notes..."
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 leading-relaxed font-sans"
            />
          )}

          {/* Optional Image URL Input & Thumbnail */}
          {showImageInput && (
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-slate-700">
                <span>Diagram / Diagrammatic Image Reference</span>
                {question.imageUrl && (
                  <button
                    type="button"
                    onClick={() => updateField('imageUrl', undefined)}
                    className="text-rose-600 hover:text-rose-800 text-[11px]"
                  >
                    Remove Image
                  </button>
                )}
              </div>
              <input
                type="url"
                value={question.imageUrl || ''}
                onChange={(e) => updateField('imageUrl', e.target.value.trim() || undefined)}
                placeholder="https://example.com/diagram.png"
                className="w-full px-3 py-1.5 text-xs rounded border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              {question.imageUrl && (
                <div className="mt-2 flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={question.imageUrl}
                    alt={question.imageAlt || 'Question diagram preview'}
                    className="max-h-32 rounded border border-slate-200 object-contain bg-white p-1"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <input
                    type="text"
                    value={question.imageAlt || ''}
                    onChange={(e) => updateField('imageAlt', e.target.value)}
                    placeholder="Image description / Alt text..."
                    className="flex-1 px-2.5 py-1 text-xs rounded border border-slate-200 bg-white"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Question Type Specific Section */}
        <div className="pt-4 border-t border-slate-100">
          {/* ================= SINGLE CORRECT MCQ ================= */}
          {question.type === 'single_choice' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-medium text-slate-800">
                    Answer Options <span className="text-rose-500">*</span>
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Select the radio button beside the single correct answer option.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Plus className="w-3.5 h-3.5" />}
                  onClick={handleAddOption}
                >
                  Add Option
                </Button>
              </div>

              <div className="space-y-2.5">
                {(question.options || []).map((opt, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  return (
                    <div
                      key={opt.id}
                      className={`flex items-center gap-2.5 p-2 rounded-lg border transition-colors ${
                        opt.isCorrect
                          ? 'bg-emerald-50/50 border-emerald-300'
                          : 'bg-white border-slate-200/90'
                      }`}
                    >
                      {/* Radio for correct answer */}
                      <button
                        type="button"
                        onClick={() => handleToggleCorrectSingle(idx)}
                        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
                          opt.isCorrect
                            ? 'border-emerald-600 bg-emerald-600 text-white'
                            : 'border-slate-300 hover:border-slate-400 bg-white'
                        }`}
                        title={opt.isCorrect ? 'Correct Answer' : 'Mark as Correct Answer'}
                        aria-label={`Mark option ${letter} as correct`}
                      >
                        {opt.isCorrect && <div className="h-2 w-2 rounded-full bg-white" />}
                      </button>

                      {/* Option Letter Tag */}
                      <span className="font-semibold text-xs text-slate-600 w-5 text-center shrink-0">
                        {letter}.
                      </span>

                      {/* Option Text Input */}
                      <input
                        type="text"
                        value={opt.text}
                        onChange={(e) => handleUpdateOption(idx, e.target.value)}
                        placeholder={`Option ${letter} text...`}
                        className="flex-1 px-3 py-1.5 text-sm bg-transparent border-none focus:outline-none text-slate-900 placeholder:text-slate-400"
                      />

                      {/* Remove Option Button */}
                      {(question.options || []).length > 2 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveOption(idx)}
                          className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-slate-100"
                          title="Remove option"
                          aria-label={`Remove option ${letter}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= MULTIPLE SELECT MCQ ================= */}
          {question.type === 'multiple_choice' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-medium text-slate-800">
                    Answer Options <span className="text-rose-500">*</span>
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Check all checkboxes that apply for correct answers.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Plus className="w-3.5 h-3.5" />}
                  onClick={handleAddOption}
                >
                  Add Option
                </Button>
              </div>

              <div className="space-y-2.5">
                {(question.options || []).map((opt, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  return (
                    <div
                      key={opt.id}
                      className={`flex items-center gap-2.5 p-2 rounded-lg border transition-colors ${
                        opt.isCorrect
                          ? 'bg-sky-50/50 border-sky-300'
                          : 'bg-white border-slate-200/90'
                      }`}
                    >
                      {/* Checkbox for correct answer */}
                      <button
                        type="button"
                        onClick={() => handleToggleCorrectMultiple(idx)}
                        className={`h-5 w-5 rounded border flex items-center justify-center transition-colors shrink-0 ${
                          opt.isCorrect
                            ? 'border-sky-600 bg-sky-600 text-white'
                            : 'border-slate-300 hover:border-slate-400 bg-white'
                        }`}
                        title={opt.isCorrect ? 'Correct Answer' : 'Mark as Correct Answer'}
                        aria-label={`Mark option ${letter} as correct`}
                      >
                        {opt.isCorrect && <CheckSquare className="w-3.5 h-3.5" />}
                      </button>

                      {/* Option Letter Tag */}
                      <span className="font-semibold text-xs text-slate-600 w-5 text-center shrink-0">
                        {letter}.
                      </span>

                      {/* Option Text Input */}
                      <input
                        type="text"
                        value={opt.text}
                        onChange={(e) => handleUpdateOption(idx, e.target.value)}
                        placeholder={`Option ${letter} text...`}
                        className="flex-1 px-3 py-1.5 text-sm bg-transparent border-none focus:outline-none text-slate-900 placeholder:text-slate-400"
                      />

                      {/* Remove Option Button */}
                      {(question.options || []).length > 2 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveOption(idx)}
                          className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-slate-100"
                          title="Remove option"
                          aria-label={`Remove option ${letter}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="p-3 bg-sky-50/60 rounded-lg border border-sky-100 text-xs text-sky-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-sky-600 mt-0.5" strokeWidth={1.75} />
                <span>
                  Students must select all designated correct options during examination to receive full marks.
                </span>
              </div>
            </div>
          )}

          {/* ================= NUMERICAL ANSWER ================= */}
          {question.type === 'numerical' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-medium text-slate-800">
                  Numerical Answer Configuration <span className="text-rose-500">*</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  Define the expected numerical value and optional tolerance range for automated checking.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Expected Numeric Value */}
                <div>
                  <label
                    htmlFor={`expected-${question.id}`}
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Expected Answer <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id={`expected-${question.id}`}
                    type="number"
                    step="any"
                    value={question.expectedNumericAnswer ?? ''}
                    onChange={(e) =>
                      updateField('expectedNumericAnswer', parseFloat(e.target.value))
                    }
                    placeholder="e.g. 25"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                {/* Tolerance (±) */}
                <div>
                  <label
                    htmlFor={`tolerance-${question.id}`}
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Tolerance (± range)
                  </label>
                  <input
                    id={`tolerance-${question.id}`}
                    type="number"
                    min="0"
                    step="any"
                    value={question.numericTolerance ?? 0}
                    onChange={(e) =>
                      updateField('numericTolerance', Math.max(0, parseFloat(e.target.value) || 0))
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                {/* Optional Unit */}
                <div>
                  <label
                    htmlFor={`unit-${question.id}`}
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Unit (optional)
                  </label>
                  <input
                    id={`unit-${question.id}`}
                    type="text"
                    value={question.unit || ''}
                    onChange={(e) => updateField('unit', e.target.value)}
                    placeholder="e.g. m/s, Joules"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              </div>

              {question.expectedNumericAnswer !== undefined && !isNaN(question.expectedNumericAnswer) && (
                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                  Accepts student answers between{' '}
                  <strong className="font-semibold tabular-nums">
                    {(question.expectedNumericAnswer - (question.numericTolerance || 0)).toFixed(2)}
                  </strong>{' '}
                  and{' '}
                  <strong className="font-semibold tabular-nums">
                    {(question.expectedNumericAnswer + (question.numericTolerance || 0)).toFixed(2)}
                  </strong>{' '}
                  {question.unit && <span>({question.unit})</span>}
                </div>
              )}
            </div>
          )}

          {/* ================= SUBJECTIVE LONG-TEXT ================= */}
          {question.type === 'subjective' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-medium text-slate-800">
                  Subjective Question Rubric & Evaluation Criteria
                </h3>
                <p className="text-[11px] text-slate-500">
                  Subjective answers require instructor evaluation via the Grading Queue.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* Word Limit */}
                <div className="max-w-xs">
                  <label
                    htmlFor={`word-limit-${question.id}`}
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Suggested Word Limit (optional)
                  </label>
                  <input
                    id={`word-limit-${question.id}`}
                    type="number"
                    min="10"
                    step="10"
                    value={question.wordLimit || ''}
                    onChange={(e) =>
                      updateField('wordLimit', parseInt(e.target.value, 10) || undefined)
                    }
                    placeholder="e.g. 200 words"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                {/* Evaluation Rubric / Guidelines */}
                <div>
                  <label
                    htmlFor={`rubric-${question.id}`}
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Grading Rubric / Key Evaluation Points
                  </label>
                  <textarea
                    id={`rubric-${question.id}`}
                    rows={3}
                    value={question.subjectiveGuidelines || ''}
                    onChange={(e) => updateField('subjectiveGuidelines', e.target.value)}
                    placeholder="Specify key concepts and criteria required to earn full credit..."
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                {/* Model / Sample Answer */}
                <div>
                  <label
                    htmlFor={`sample-answer-${question.id}`}
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Model / Sample Answer (for instructor reference)
                  </label>
                  <textarea
                    id={`sample-answer-${question.id}`}
                    rows={3}
                    value={question.sampleAnswer || ''}
                    onChange={(e) => updateField('sampleAnswer', e.target.value)}
                    placeholder="Provide a benchmark solution for instructors and graders..."
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Explanation / Solution (All question types) */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <label
            htmlFor={`explanation-${question.id}`}
            className="block text-xs font-medium text-slate-700"
          >
            Detailed Solution & Explanation (displayed to students upon review)
          </label>
          <textarea
            id={`explanation-${question.id}`}
            rows={2}
            value={question.explanation || ''}
            onChange={(e) => updateField('explanation', e.target.value)}
            placeholder="Step-by-step reasoning, derivation, or citations..."
            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Question?"
        description={`This will permanently remove Question ${questionNumber} from this test.`}
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Are you sure you want to remove this question? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                setIsDeleteModalOpen(false);
                onDeleteQuestion(question.id);
              }}
            >
              Delete Question
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

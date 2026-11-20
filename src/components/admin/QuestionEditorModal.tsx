'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { BankQuestion, QuestionType, McqOption } from '@/types';
import { MathText } from '@/components/ui/MathText';
import { Plus, Trash2, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface QuestionEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionToEdit?: BankQuestion | null;
  onSave: (question: Omit<BankQuestion, 'id' | 'createdAt' | 'updatedAt'>, id?: string) => Promise<void>;
  existingSubjects: string[];
}

export const QuestionEditorModal: React.FC<QuestionEditorModalProps> = ({
  isOpen,
  onClose,
  questionToEdit,
  onSave,
  existingSubjects,
}) => {
  const [statement, setStatement] = useState('');
  const [subject, setSubject] = useState('Physics');
  const [customSubject, setCustomSubject] = useState('');
  const [topic, setTopic] = useState('General');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [type, setType] = useState<QuestionType>('single_choice');
  const [marks, setMarks] = useState<number>(4);
  const [negativeMarks, setNegativeMarks] = useState<number>(1);
  const [explanation, setExplanation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [options, setOptions] = useState<McqOption[]>([
    { id: 'opt-1', text: '', isCorrect: true },
    { id: 'opt-2', text: '', isCorrect: false },
    { id: 'opt-3', text: '', isCorrect: false },
    { id: 'opt-4', text: '', isCorrect: false },
  ]);
  const [correctAnswerText, setCorrectAnswerText] = useState('');

  const [showFormulaPreview, setShowFormulaPreview] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (questionToEdit) {
      setStatement(questionToEdit.statement || '');
      setSubject(questionToEdit.subject || 'Physics');
      setTopic(questionToEdit.topic || 'General');
      setDifficulty(questionToEdit.difficulty || 'Medium');
      setType(questionToEdit.type || 'single_choice');
      setMarks(questionToEdit.marks || 4);
      setNegativeMarks(questionToEdit.negativeMarks !== undefined ? questionToEdit.negativeMarks : 1);
      setExplanation(questionToEdit.explanation || '');
      setImageUrl(questionToEdit.imageUrl || '');
      setCorrectAnswerText(questionToEdit.correctAnswer || '');

      if (questionToEdit.options && questionToEdit.options.length > 0) {
        setOptions(questionToEdit.options);
      } else {
        setOptions([
          { id: 'opt-1', text: '', isCorrect: true },
          { id: 'opt-2', text: '', isCorrect: false },
        ]);
      }
    } else {
      setStatement('');
      setSubject(existingSubjects[0] || 'Physics');
      setTopic('General');
      setDifficulty('Medium');
      setType('single_choice');
      setMarks(4);
      setNegativeMarks(1);
      setExplanation('');
      setImageUrl('');
      setCorrectAnswerText('');
      setOptions([
        { id: 'opt-1', text: '', isCorrect: true },
        { id: 'opt-2', text: '', isCorrect: false },
        { id: 'opt-3', text: '', isCorrect: false },
        { id: 'opt-4', text: '', isCorrect: false },
      ]);
    }
    setError(null);
  }, [questionToEdit, isOpen, existingSubjects]);

  const handleOptionChange = (index: number, text: string) => {
    setOptions((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], text };
      return copy;
    });
  };

  const handleSetCorrectOption = (index: number) => {
    if (type === 'multiple_choice') {
      setOptions((prev) => {
        const copy = [...prev];
        copy[index] = { ...copy[index], isCorrect: !copy[index].isCorrect };
        return copy;
      });
    } else {
      setOptions((prev) =>
        prev.map((opt, i) => ({
          ...opt,
          isCorrect: i === index,
        }))
      );
    }
  };

  const handleAddOption = () => {
    if (options.length >= 6) return;
    setOptions((prev) => [
      ...prev,
      { id: `opt-${prev.length + 1}`, text: '', isCorrect: false },
    ]);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length <= 2) return;
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!statement.trim()) {
      setError('Question statement cannot be empty.');
      return;
    }

    const finalSubject = subject === '__new__' ? customSubject.trim() : subject;
    if (!finalSubject) {
      setError('Please provide a valid subject name.');
      return;
    }

    if (type === 'single_choice' || type === 'multiple_choice') {
      const filledOptions = options.filter((o) => o.text.trim().length > 0);
      if (filledOptions.length < 2) {
        setError('Please provide at least 2 non-empty options for this MCQ.');
        return;
      }
      if (!filledOptions.some((o) => o.isCorrect)) {
        setError('Please select at least one correct option.');
        return;
      }
    }

    try {
      setIsSaving(true);
      const correctOpt = options.find((o) => o.isCorrect);
      const finalCorrectAnswer =
        type === 'single_choice'
          ? correctOpt?.text || correctAnswerText
          : correctAnswerText || correctOpt?.text || '';

      await onSave(
        {
          statement: statement.trim(),
          subject: finalSubject,
          topic: topic.trim() || 'General',
          difficulty,
          type,
          options: type === 'single_choice' || type === 'multiple_choice' ? options : [],
          correctAnswer: finalCorrectAnswer,
          explanation: explanation.trim(),
          marks: Number(marks) || 4,
          negativeMarks: Number(negativeMarks) || 0,
          imageUrl: imageUrl.trim() || undefined,
        },
        questionToEdit?.id
      );
      setIsSaving(false);
      onClose();
    } catch (err: any) {
      setIsSaving(false);
      setError(err.message || 'Failed to save question.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={questionToEdit ? 'Edit Question in Bank' : 'Add New Question to Bank'}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6 pt-2">
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* 1. Subject, Topic, Difficulty row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider font-mono">
              Subject *
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full text-xs font-medium rounded-lg border border-slate-300 px-3 py-2 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#E14D45]/30 focus:border-[#E14D45]"
            >
              {existingSubjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
              <option value="__new__">+ Add New Subject...</option>
            </select>
            {subject === '__new__' && (
              <input
                type="text"
                placeholder="Enter new subject name..."
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                className="mt-2 w-full text-xs rounded-lg border border-slate-300 px-3 py-1.5"
                required
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider font-mono">
              Topic / Chapter
            </label>
            <input
              type="text"
              placeholder="e.g. Thermodynamics, AVL Trees"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full text-xs font-medium rounded-lg border border-slate-300 px-3 py-2 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#E14D45]/30 focus:border-[#E14D45]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider font-mono">
              Difficulty
            </label>
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg">
              {(['Easy', 'Medium', 'Hard'] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={`text-[11px] font-bold py-1.5 rounded-md transition-all ${
                    difficulty === d
                      ? d === 'Easy'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : d === 'Hard'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-amber-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Question Statement with KaTeX preview toggle */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
              Question Statement (KaTeX supported) *
            </label>
            <button
              type="button"
              onClick={() => setShowFormulaPreview((p) => !p)}
              className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
            >
              {showFormulaPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showFormulaPreview ? 'Hide Math Preview' : 'Show Math Preview'}</span>
            </button>
          </div>

          <textarea
            rows={4}
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            placeholder="Enter question text. You can include LaTeX math: $E = mc^2$, $\frac{1}{2}mv^2$, or $$\int_0^\infty f(x) dx$$..."
            className="w-full text-xs font-medium rounded-lg border border-slate-300 p-3 bg-white text-slate-800 font-mono focus:outline-hidden focus:ring-2 focus:ring-[#E14D45]/30 focus:border-[#E14D45] leading-relaxed"
            required
          />

          {showFormulaPreview && statement.trim() && (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Live Formula Render
              </span>
              <div className="text-xs text-slate-800 font-sans leading-relaxed">
                <MathText text={statement} />
              </div>
            </div>
          )}
        </div>

        {/* 3. Question Type & Scoring */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider font-mono">
              Question Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as QuestionType)}
              className="w-full text-xs font-medium rounded-lg border border-slate-300 px-3 py-2 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#E14D45]/30 focus:border-[#E14D45]"
            >
              <option value="single_choice">Single Choice (MCQ)</option>
              <option value="multiple_choice">Multiple Choice (Multiple Correct)</option>
              <option value="numerical">Numerical / Numeric Entry</option>
              <option value="subjective">Subjective / Descriptive</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider font-mono">
              Marks
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={marks}
              onChange={(e) => setMarks(Number(e.target.value))}
              className="w-full text-xs font-medium rounded-lg border border-slate-300 px-3 py-2 bg-white text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider font-mono">
              Negative Marks Penalty
            </label>
            <input
              type="number"
              min="0"
              step="0.25"
              max="5"
              value={negativeMarks}
              onChange={(e) => setNegativeMarks(Number(e.target.value))}
              className="w-full text-xs font-medium rounded-lg border border-slate-300 px-3 py-2 bg-white text-slate-800"
            />
          </div>
        </div>

        {/* 4. Options for MCQs */}
        {(type === 'single_choice' || type === 'multiple_choice') && (
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                Options (Click checkmark to set correct answer)
              </label>
              <button
                type="button"
                onClick={handleAddOption}
                disabled={options.length >= 6}
                className="text-xs text-[#E14D45] hover:underline flex items-center gap-1 font-semibold disabled:opacity-40"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Option</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {options.map((opt, idx) => (
                <div
                  key={opt.id || idx}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all ${
                    opt.isCorrect
                      ? 'border-emerald-500 bg-emerald-50/50 ring-1 ring-emerald-500/30'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleSetCorrectOption(idx)}
                    title={opt.isCorrect ? 'Correct option (Click to toggle)' : 'Click to mark as correct'}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-all ${
                      opt.isCorrect
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </button>

                  <input
                    type="text"
                    value={opt.text}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    placeholder={`Option ${String.fromCharCode(65 + idx)} text (Math formula like $x^2$ supported)`}
                    className="flex-1 text-xs font-medium border-0 bg-transparent text-slate-800 focus:outline-hidden focus:ring-0"
                    required
                  />

                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(idx)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                      title="Remove option"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Non-MCQ Correct Answer input */}
        {type !== 'single_choice' && type !== 'multiple_choice' && (
          <div className="space-y-1.5 pt-2 border-t border-slate-200">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
              Expected Correct Answer / Value
            </label>
            <input
              type="text"
              value={correctAnswerText}
              onChange={(e) => setCorrectAnswerText(e.target.value)}
              placeholder="e.g. 25, 4.2e-3, or sample response"
              className="w-full text-xs font-medium rounded-lg border border-slate-300 px-3 py-2 bg-white text-slate-800"
            />
          </div>
        )}

        {/* 6. Explanation */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
            Detailed Solution &amp; Explanation (Shown during post-test review)
          </label>
          <textarea
            rows={2}
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="Explain why the answer is correct and provide step-by-step working..."
            className="w-full text-xs font-medium rounded-lg border border-slate-300 p-2.5 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#E14D45]/30 focus:border-[#E14D45]"
          />
        </div>

        {/* 7. Image or Diagram URL (optional) */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
            Diagram / Image Attachment URL (Optional)
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://... (Diagram or circuit schematic)"
            className="w-full text-xs font-medium rounded-lg border border-slate-300 px-3 py-2 bg-white text-slate-800"
          />
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSaving} className="bg-[#E14D45] hover:bg-[#CC3F37]">
            {isSaving ? 'Saving to Database...' : questionToEdit ? 'Save Changes' : 'Add to Question Bank'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

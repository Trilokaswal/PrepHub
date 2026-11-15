'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { MockTest } from '@/types';
import { Download, FileSpreadsheet, FileCode, CheckCircle2, AlertCircle } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  tests: MockTest[];
  selectedTests?: MockTest[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  tests,
  selectedTests = [],
}) => {
  const [format, setFormat] = useState<'csv' | 'json'>('csv');
  const [scope, setScope] = useState<'all' | 'selected'>(
    selectedTests.length > 0 ? 'selected' : 'all'
  );
  const [isExporting, setIsExporting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const targetTests = scope === 'selected' && selectedTests.length > 0 ? selectedTests : tests;

  const escapeCsvField = (value: string | number | undefined | null): string => {
    if (value === undefined || value === null) return '""';
    const stringValue = String(value);
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n') || stringValue.includes('\r')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return `"${stringValue}"`;
  };

  const handleDownload = () => {
    if (targetTests.length === 0) {
      setStatusMessage({
        type: 'error',
        text: 'No tests available to export in the selected scope.',
      });
      return;
    }

    setIsExporting(true);
    setStatusMessage(null);

    try {
      const today = new Date().toISOString().split('T')[0];
      let blob: Blob;
      let filename: string;

      if (format === 'csv') {
        const headers = [
          'Test ID',
          'Title',
          'Subject',
          'Status',
          'Question Count',
          'Target Questions',
          'Duration (Minutes)',
          'Total Marks',
          'Total Attempts',
          'Average Score (%)',
          'Created At',
          'Updated At',
        ];

        const rows = targetTests.map((t) => [
          escapeCsvField(t.id),
          escapeCsvField(t.title),
          escapeCsvField(t.subject),
          escapeCsvField(t.status),
          escapeCsvField(t.questionCount || t.questions?.length || 0),
          escapeCsvField(t.targetQuestionCount || t.questionCount || 0),
          escapeCsvField(t.durationMinutes),
          escapeCsvField(t.totalMarks || 0),
          escapeCsvField(t.totalAttempts || 0),
          escapeCsvField(t.averageScore ? t.averageScore.toFixed(1) : 'N/A'),
          escapeCsvField(t.createdAt),
          escapeCsvField(t.updatedAt),
        ]);

        const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
        blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        filename = `prephub-tests-${today}.csv`;
      } else {
        // Sanitize test objects: exclude internal question answer keys in general catalogue export
        const sanitized = targetTests.map((t) => ({
          id: t.id,
          title: t.title,
          subject: t.subject,
          status: t.status,
          questionCount: t.questionCount || t.questions?.length || 0,
          targetQuestionCount: t.targetQuestionCount,
          durationMinutes: t.durationMinutes,
          totalMarks: t.totalMarks,
          totalAttempts: t.totalAttempts,
          averageScore: t.averageScore,
          createdAt: t.createdAt,
          updatedAt: t.updatedAt,
        }));

        const jsonContent = JSON.stringify({
          exportDate: new Date().toISOString(),
          recordCount: sanitized.length,
          catalog: sanitized,
        }, null, 2);

        blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
        filename = `prephub-tests-${today}.json`;
      }

      // Trigger browser download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setStatusMessage({
        type: 'success',
        text: `Exported ${targetTests.length} ${targetTests.length === 1 ? 'test' : 'tests'} to ${filename}.`,
      });

      setTimeout(() => {
        setIsExporting(false);
      }, 600);
    } catch (err) {
      console.error('Export error:', err);
      setStatusMessage({
        type: 'error',
        text: 'Failed to generate export file. Please try again.',
      });
      setIsExporting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Export Test Catalog"
      description="Download your mock tests as a structured data file for reporting or backups."
      maxWidth="md"
    >
      <div className="space-y-5">
        {/* Scope Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Export Scope
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setScope('all')}
              className={`p-3 rounded-lg border text-left transition-all ${
                scope === 'all'
                  ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="text-sm font-medium text-slate-900">All Tests</div>
              <div className="text-xs text-slate-500 mt-0.5">{tests.length} tests in catalog</div>
            </button>

            <button
              type="button"
              disabled={selectedTests.length === 0}
              onClick={() => setScope('selected')}
              className={`p-3 rounded-lg border text-left transition-all ${
                selectedTests.length === 0
                  ? 'opacity-50 cursor-not-allowed border-slate-200 bg-slate-50'
                  : scope === 'selected'
                  ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="text-sm font-medium text-slate-900">Selected Only</div>
              <div className="text-xs text-slate-500 mt-0.5">
                {selectedTests.length} tests selected
              </div>
            </button>
          </div>
        </div>

        {/* Format Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            File Format
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormat('csv')}
              className={`p-3 rounded-lg border text-left flex items-start gap-3 transition-all ${
                format === 'csv'
                  ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <FileSpreadsheet className={`w-5 h-5 mt-0.5 shrink-0 ${format === 'csv' ? 'text-indigo-600' : 'text-slate-400'}`} />
              <div>
                <div className="text-sm font-medium text-slate-900">CSV Spreadsheet</div>
                <div className="text-xs text-slate-500 mt-0.5">For Excel, Numbers, and Google Sheets</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFormat('json')}
              className={`p-3 rounded-lg border text-left flex items-start gap-3 transition-all ${
                format === 'json'
                  ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <FileCode className={`w-5 h-5 mt-0.5 shrink-0 ${format === 'json' ? 'text-indigo-600' : 'text-slate-400'}`} />
              <div>
                <div className="text-sm font-medium text-slate-900">JSON Data</div>
                <div className="text-xs text-slate-500 mt-0.5">For database import & custom tools</div>
              </div>
            </button>
          </div>
        </div>

        {/* Data Security Note */}
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600">
          <span className="font-medium text-slate-800">Security Guarantee:</span> Exported files only include public catalog metadata. Answer keys and private student identifiers are omitted.
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div
            className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            size="sm"
            isLoading={isExporting}
            disabled={targetTests.length === 0 || isExporting}
            leftIcon={<Download className="w-4 h-4" />}
            onClick={handleDownload}
          >
            Download {format.toUpperCase()}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

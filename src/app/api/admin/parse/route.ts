import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { AUTHORIZED_ADMIN_GMAIL, questionBankStore } from '@/lib/questionBankStore';
import {
  parseJsonQuestions,
  parseCsvQuestions,
  parseTextOrMarkdownQuestions,
  parseDocxFile,
  parsePdfFile,
  normalizeStatement,
  ParseResult,
} from '@/lib/questionParser';

async function verifyAdminSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    return false;
  }
  return user.email.toLowerCase().trim() === AUTHORIZED_ADMIN_GMAIL.toLowerCase();
}

export async function POST(request: NextRequest) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json(
      { error: 'Unauthorized. Question parsing and import is restricted to administrators.' },
      { status: 403 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const defaultSubject = (formData.get('defaultSubject') as string) || 'Physics';
    const defaultTopic = (formData.get('defaultTopic') as string) || 'General';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    const fileName = file.name.toLowerCase();
    const arrayBuffer = await file.arrayBuffer();
    let result: ParseResult;

    if (fileName.endsWith('.json')) {
      const text = Buffer.from(arrayBuffer).toString('utf-8');
      result = parseJsonQuestions(text, defaultSubject, defaultTopic);
    } else if (fileName.endsWith('.csv')) {
      const text = Buffer.from(arrayBuffer).toString('utf-8');
      result = parseCsvQuestions(text, defaultSubject, defaultTopic);
    } else if (fileName.endsWith('.docx')) {
      result = await parseDocxFile(arrayBuffer, defaultSubject, defaultTopic);
    } else if (fileName.endsWith('.pdf')) {
      result = await parsePdfFile(arrayBuffer, defaultSubject, defaultTopic);
    } else if (fileName.endsWith('.txt') || fileName.endsWith('.md')) {
      const text = Buffer.from(arrayBuffer).toString('utf-8');
      result = parseTextOrMarkdownQuestions(text, defaultSubject, defaultTopic);
    } else {
      return NextResponse.json(
        { error: 'Unsupported file format. Please upload DOCX, PDF, TXT, Markdown, CSV, or JSON.' },
        { status: 400 }
      );
    }

    // Check duplicates against existing bank questions
    const existing = questionBankStore.getQuestions();
    const existingSignatures = new Set(existing.map((q) => normalizeStatement(q.statement)));

    result.questions.forEach((q) => {
      const sig = normalizeStatement(q.statement);
      if (existingSignatures.has(sig)) {
        q.status = 'duplicate';
        q.validationMessage = 'A similar question already exists in the Question Bank.';
      }
    });

    const readyCount = result.questions.filter((q) => q.status === 'ready').length;
    result.readyCount = readyCount;
    result.warningCount = result.questions.length - readyCount;

    return NextResponse.json({
      success: true,
      ...result,
      fileName: file.name,
      fileSize: file.size,
    });
  } catch (err: any) {
    console.error('File parsing error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to parse question file.' },
      { status: 500 }
    );
  }
}

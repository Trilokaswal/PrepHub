import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { AUTHORIZED_ADMIN_GMAIL, questionBankStore } from '@/lib/questionBankStore';

async function verifyAdminSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    return { isAdmin: false, user: null };
  }

  const isAdmin = user.email.toLowerCase().trim() === AUTHORIZED_ADMIN_GMAIL.toLowerCase();
  return { isAdmin, user, supabase };
}

export async function GET(request: NextRequest) {
  const { isAdmin, user, supabase } = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json(
      { error: 'Unauthorized. Question Bank access is restricted to authorized administrators.' },
      { status: 403 }
    );
  }

  const { searchParams } = new URL(request.url);
  const subject = searchParams.get('subject') || undefined;
  const topic = searchParams.get('topic') || undefined;
  const difficulty = searchParams.get('difficulty') || undefined;
  const type = searchParams.get('type') || undefined;
  const search = searchParams.get('search') || undefined;

  try {
    // Attempt Supabase fetch
    if (supabase) {
      let query = supabase.from('question_bank').select('*');
      if (subject && subject !== 'All') query = query.ilike('subject', subject);
      if (topic && topic !== 'All') query = query.ilike('topic', topic);
      if (difficulty && difficulty !== 'All') query = query.ilike('difficulty', difficulty);
      if (type && type !== 'All') query = query.eq('type', type);
      if (search && search.trim()) {
        query = query.or(`statement.ilike.%${search}%,explanation.ilike.%${search}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        // Calculate stats
        const subjectCounts: Record<string, number> = {};
        const difficultyCounts = { Easy: 0, Medium: 0, Hard: 0 };
        data.forEach((q: any) => {
          subjectCounts[q.subject] = (subjectCounts[q.subject] || 0) + 1;
          if (q.difficulty in difficultyCounts) {
            difficultyCounts[q.difficulty as 'Easy' | 'Medium' | 'Hard']++;
          }
        });

        return NextResponse.json({
          questions: data,
          totalCount: data.length,
          stats: {
            totalCount: data.length,
            subjectCounts,
            difficultyCounts,
          },
        });
      }
    }

    // Fallback to in-memory/local store
    const questions = questionBankStore.getQuestions({ subject, topic, difficulty, type, search });
    const stats = questionBankStore.getStats();

    return NextResponse.json({
      questions,
      totalCount: questions.length,
      stats,
    });
  } catch (err: any) {
    const questions = questionBankStore.getQuestions({ subject, topic, difficulty, type, search });
    const stats = questionBankStore.getStats();
    return NextResponse.json({
      questions,
      totalCount: questions.length,
      stats,
    });
  }
}

export async function POST(request: NextRequest) {
  const { isAdmin, user, supabase } = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json(
      { error: 'Unauthorized. Modifying question bank requires verified administrator permissions.' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();

    if (body.bulk && Array.isArray(body.questions)) {
      // Bulk insert
      const results = questionBankStore.bulkAddQuestions(body.questions);

      // Attempt Supabase insert if table exists
      if (supabase) {
        try {
          const toInsert = body.questions.map((q: any) => ({
            statement: q.statement,
            subject: q.subject,
            topic: q.topic || 'General',
            difficulty: q.difficulty || 'Medium',
            type: q.type || 'single_choice',
            options: q.options || [],
            correct_answer: q.correctAnswer || null,
            explanation: q.explanation || null,
            marks: q.marks || 4,
            negative_marks: q.negativeMarks || 1,
            image_url: q.imageUrl || null,
            created_by: user?.id || null,
          }));
          await supabase.from('question_bank').insert(toInsert);
        } catch {
          // Ignore if table not yet run
        }
      }

      return NextResponse.json({
        success: true,
        addedCount: results.addedCount,
        duplicateCount: results.duplicateCount,
      });
    } else {
      // Single question insert
      const added = questionBankStore.addQuestion(body);

      if (supabase) {
        try {
          await supabase.from('question_bank').insert([
            {
              statement: body.statement,
              subject: body.subject,
              topic: body.topic || 'General',
              difficulty: body.difficulty || 'Medium',
              type: body.type || 'single_choice',
              options: body.options || [],
              correct_answer: body.correctAnswer || null,
              explanation: body.explanation || null,
              marks: body.marks || 4,
              negative_marks: body.negativeMarks || 1,
              image_url: body.imageUrl || null,
              created_by: user?.id || null,
            },
          ]);
        } catch {
          // Ignore
        }
      }

      return NextResponse.json({ success: true, question: added });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const { isAdmin, supabase } = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 403 });
  }

  try {
    const body = await request.json();

    if (body.bulkDifficulty && Array.isArray(body.ids)) {
      const updatedCount = questionBankStore.bulkUpdateDifficulty(body.ids, body.difficulty);
      if (supabase) {
        try {
          await supabase.from('question_bank').update({ difficulty: body.difficulty }).in('id', body.ids);
        } catch {}
      }
      return NextResponse.json({ success: true, updatedCount });
    }

    if (body.id) {
      questionBankStore.updateQuestion(body.id, body.updates);
      if (supabase) {
        try {
          await supabase.from('question_bank').update(body.updates).eq('id', body.id);
        } catch {}
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid update payload' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { isAdmin, supabase } = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    if (body.ids && Array.isArray(body.ids)) {
      const deletedCount = questionBankStore.bulkDeleteQuestions(body.ids);
      if (supabase) {
        try {
          await supabase.from('question_bank').delete().in('id', body.ids);
        } catch {}
      }
      return NextResponse.json({ success: true, deletedCount });
    }

    if (body.id) {
      questionBankStore.deleteQuestion(body.id);
      if (supabase) {
        try {
          await supabase.from('question_bank').delete().eq('id', body.id);
        } catch {}
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid delete request' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

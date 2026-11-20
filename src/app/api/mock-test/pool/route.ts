import { NextResponse, NextRequest } from 'next/server';
import { questionBankStore } from '@/lib/questionBankStore';
import { getEligibleQuestionPool } from '@/lib/mockTestEngine';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject') || '';
    const topic = searchParams.get('topic') || '';
    const difficulty = (searchParams.get('difficulty') || 'Mixed') as 'Easy' | 'Medium' | 'Hard' | 'Mixed';

    const subjects = questionBankStore.getAvailableSubjects();
    const topics = questionBankStore.getAvailableTopics(subject);
    const stats = questionBankStore.getStats();

    // Check specific pool if subject is provided
    let eligibleCount = 0;
    if (subject) {
      const pool = getEligibleQuestionPool({
        subject,
        topic,
        difficulty,
      });
      eligibleCount = pool.length;
    }

    return NextResponse.json({
      subjects,
      topics,
      stats,
      eligibleCount,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

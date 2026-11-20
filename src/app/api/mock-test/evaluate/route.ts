import { NextResponse, NextRequest } from 'next/server';
import { evaluateRandomMockTest } from '@/lib/mockTestEngine';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { testId, answers, studentUser } = body;

    if (!testId || !answers) {
      return NextResponse.json({ error: 'Missing testId or answers payload.' }, { status: 400 });
    }

    const scorecard = evaluateRandomMockTest(
      testId,
      answers,
      studentUser || { name: 'Student', roll: 'N/A' }
    );

    if (!scorecard) {
      return NextResponse.json(
        { error: 'Test evaluation could not be processed for this session.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, scorecard });
  } catch (err: any) {
    console.error('Test evaluation error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

import { NextResponse, NextRequest } from 'next/server';
import { generateRandomMockTest } from '@/lib/mockTestEngine';
import { MockTestGenerationConfig } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const config: MockTestGenerationConfig = {
      subject: body.subject || 'Physics',
      topic: body.topic || undefined,
      difficulty: body.difficulty || 'Mixed',
      questionCount: Number(body.questionCount) || 10,
      durationMinutes: Number(body.durationMinutes) || 15,
      marksPerQuestion: Number(body.marksPerQuestion) || 4,
      negativeMarks: body.negativeMarks !== undefined ? Number(body.negativeMarks) : 1,
    };
    const forceAvailable = Boolean(body.forceAvailable);

    const result = generateRandomMockTest(config, forceAvailable);

    if (!result.success) {
      return NextResponse.json(result, { status: 200 });
    }

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Mock test generation error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

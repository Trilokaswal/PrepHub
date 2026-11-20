import { MockTest, Question, McqOption, MockTestGenerationConfig, BankQuestion, QuestionType } from '@/types';
import { questionBankStore } from './questionBankStore';
import { generateUniqueId, saveStoredTest } from './testStore';
import { addStudentAttempt } from './attemptsStore';
import { QuestionScorecardItem, ScorecardData } from '@/components/student/StudentExamRunner';

export interface GenerationResult {
  success: boolean;
  test?: MockTest;
  availableCount: number;
  requestedCount: number;
  message?: string;
}

// In-memory cache of secret keys for generated randomized mock tests
// Map of testId -> map of questionId -> secret BankQuestion with true answers
const secretTestKeyStore: Map<string, { questions: BankQuestion[]; config: MockTestGenerationConfig }> = new Map();

/**
 * Modern Fisher-Yates array shuffle using cryptographically sound randomness
 */
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    let rand = Math.random();
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const buf = new Uint32Array(1);
      crypto.getRandomValues(buf);
      rand = buf[0] / (0xffffffff + 1);
    }
    const j = Math.floor(rand * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Checks available question pool for a given configuration
 */
export function getEligibleQuestionPool(config: {
  subject: string;
  topic?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Mixed';
}): BankQuestion[] {
  const all = questionBankStore.getQuestions();
  return all.filter((q) => {
    // Subject filter
    if (config.subject && config.subject !== 'All' && q.subject.toLowerCase() !== config.subject.toLowerCase()) {
      return false;
    }
    // Topic filter
    if (config.topic && config.topic !== 'All' && config.topic.trim() !== '') {
      if (q.topic.toLowerCase() !== config.topic.toLowerCase()) {
        return false;
      }
    }
    // Difficulty filter
    if (config.difficulty && config.difficulty !== 'Mixed') {
      if (q.difficulty.toLowerCase() !== config.difficulty.toLowerCase()) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Generates a unique, randomized mock test from the Question Bank
 */
export function generateRandomMockTest(
  config: MockTestGenerationConfig,
  forceAvailable = false
): GenerationResult {
  const pool = getEligibleQuestionPool(config);
  const availableCount = pool.length;
  const requestedCount = config.questionCount;

  if (availableCount === 0) {
    return {
      success: false,
      availableCount: 0,
      requestedCount,
      message: `No questions found for ${config.subject}${config.topic && config.topic !== 'All' ? ` (${config.topic})` : ''} at ${config.difficulty} difficulty. Please adjust your criteria.`,
    };
  }

  if (availableCount < requestedCount && !forceAvailable) {
    return {
      success: false,
      availableCount,
      requestedCount,
      message: `Only ${availableCount} ${availableCount === 1 ? 'question is' : 'questions are'} currently available matching your criteria (requested: ${requestedCount}). Would you like to generate a test with ${availableCount} questions?`,
    };
  }

  const countToSelect = Math.min(availableCount, requestedCount);

  // 1. Randomly shuffle eligible questions to guarantee no fixed sequence
  const shuffledPool = shuffleArray(pool);
  const selectedQuestions = shuffledPool.slice(0, countToSelect);

  const testId = `mock-random-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  const title = `${config.subject} Random Mock Test (${config.difficulty})`;

  // Save secret answer keys for secure evaluation on submission
  secretTestKeyStore.set(testId, {
    questions: selectedQuestions,
    config,
  });

  // 2. Prepare exam-ready questions: randomize options and strip answers/explanations
  const examQuestions: Question[] = selectedQuestions.map((bankQ, index) => {
    const qId = `${testId}-q${index + 1}`;

    // Shuffle options if MCQ
    let shuffledOptions: McqOption[] | undefined;
    if (bankQ.options && bankQ.options.length > 0) {
      // Map and mask options for active test
      const randomized = shuffleArray(bankQ.options);
      shuffledOptions = randomized.map((opt, optIdx) => ({
        id: `${qId}-opt-${optIdx + 1}`,
        text: opt.text,
        isCorrect: false, // ZERO-TRUST: Masked during active test
        explanation: undefined,
      }));
    }

    const marks = config.marksPerQuestion || bankQ.marks || 4;
    const negativeMarks = config.negativeMarks !== undefined ? config.negativeMarks : (bankQ.negativeMarks || 1);

    return {
      id: qId,
      testId,
      order: index + 1,
      type: bankQ.type || 'single_choice',
      statement: bankQ.statement,
      marks,
      negativeMarks,
      options: shuffledOptions,
      imageUrl: bankQ.imageUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });

  const totalPossibleMarks = examQuestions.reduce((sum, q) => sum + q.marks, 0);

  const mockTest: MockTest = {
    id: testId,
    title,
    subject: config.subject,
    testCategory: 'subject',
    topicName: config.topic && config.topic !== 'All' ? config.topic : 'Randomized Mix',
    difficulty: config.difficulty === 'Mixed' ? 'Intermediate' : config.difficulty === 'Easy' ? 'Beginner' : config.difficulty === 'Hard' ? 'Advanced' : 'Intermediate',
    questionCount: examQuestions.length,
    targetQuestionCount: examQuestions.length,
    durationMinutes: config.durationMinutes || 15,
    totalAttempts: 0,
    totalMarks: totalPossibleMarks,
    status: 'published',
    instructions: 'This is an authentic, timed random mock test generated dynamically from the PrepHub Question Bank. Countdown begins immediately upon launching. Questions and options are randomized for each attempt.',
    questions: examQuestions,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Save in local test store so StudentExamRunner finds it immediately
  saveStoredTest(mockTest);

  return {
    success: true,
    test: mockTest,
    availableCount,
    requestedCount,
  };
}

/**
 * Securely evaluates student answers against secret question bank keys
 */
export function evaluateRandomMockTest(
  testId: string,
  studentAnswers: { [key: string]: string | string[] | number },
  studentUser: { name: string; roll?: string; email?: string }
): ScorecardData | null {
  const secretData = secretTestKeyStore.get(testId);
  if (!secretData) {
    console.warn('Secret test keys not found for testId:', testId);
    return null;
  }

  const { questions: originalQuestions, config } = secretData;
  let correctCount = 0;
  let incorrectCount = 0;
  let skippedCount = 0;
  let subjectiveCount = 0;
  let attainedMarks = 0;
  let totalPossibleMarks = 0;

  const reviewItems: QuestionScorecardItem[] = [];

  originalQuestions.forEach((origQ, idx) => {
    const qNumber = idx + 1;
    const qId = `${testId}-q${qNumber}`;
    const userAns = studentAnswers[qId];

    const qMarks = config.marksPerQuestion || origQ.marks || 4;
    const negPenalty = config.negativeMarks !== undefined ? config.negativeMarks : (origQ.negativeMarks || 1);
    totalPossibleMarks += qMarks;

    // Check correctness based on type
    if (origQ.type === 'single_choice' || !origQ.type) {
      const correctOpt = origQ.options?.find((o) => o.isCorrect);
      const isSkipped = userAns === undefined || userAns === '' || userAns === null;

      let studentSelectedText = '';
      if (!isSkipped) {
        // userAns might be an option ID or text
        // In StudentExamRunner, student answers store the option ID
        // We match with the options presented
        const chosenId = String(userAns);
        studentSelectedText = chosenId;
      }

      const correctDisplay = correctOpt?.text || origQ.correctAnswer || 'Not specified';

      if (isSkipped) {
        skippedCount++;
        reviewItems.push({
          questionNumber: qNumber,
          question: {
            id: qId,
            testId,
            order: qNumber,
            type: 'single_choice',
            statement: origQ.statement,
            marks: qMarks,
            negativeMarks: negPenalty,
            options: origQ.options,
            explanation: origQ.explanation,
            createdAt: origQ.createdAt,
            updatedAt: origQ.updatedAt,
          },
          studentAnswerDisplay: 'Skipped / Unanswered',
          correctAnswerDisplay: correctDisplay,
          isCorrect: false,
          isSkipped: true,
          status: 'skipped',
          marksAwarded: 0,
          maxMarks: qMarks,
          explanation: origQ.explanation,
        });
      } else {
        // Evaluate if answer matches correct option
        // The student chose an option from the shuffled set. Let's inspect the text
        const isMatched =
          (correctOpt && (userAns === correctOpt.id || userAns === correctOpt.text)) ||
          (origQ.correctAnswer && String(userAns).trim().toLowerCase() === origQ.correctAnswer.trim().toLowerCase());

        // Also check if userAns was an ID like `${qId}-opt-X` and check the text
        let isCorrect = Boolean(isMatched);
        if (!isCorrect && origQ.options) {
          // Check matching by text
          const matchingOpt = origQ.options.find((o) => o.id === userAns || o.text === userAns);
          if (matchingOpt && matchingOpt.isCorrect) {
            isCorrect = true;
          }
        }

        if (isCorrect) {
          correctCount++;
          attainedMarks += qMarks;
          reviewItems.push({
            questionNumber: qNumber,
            question: {
              id: qId,
              testId,
              order: qNumber,
              type: 'single_choice',
              statement: origQ.statement,
              marks: qMarks,
              negativeMarks: negPenalty,
              options: origQ.options,
              explanation: origQ.explanation,
              createdAt: origQ.createdAt,
              updatedAt: origQ.updatedAt,
            },
            studentAnswerDisplay: correctDisplay,
            correctAnswerDisplay: correctDisplay,
            isCorrect: true,
            isSkipped: false,
            status: 'correct',
            marksAwarded: qMarks,
            maxMarks: qMarks,
            explanation: origQ.explanation,
          });
        } else {
          incorrectCount++;
          attainedMarks -= negPenalty;
          reviewItems.push({
            questionNumber: qNumber,
            question: {
              id: qId,
              testId,
              order: qNumber,
              type: 'single_choice',
              statement: origQ.statement,
              marks: qMarks,
              negativeMarks: negPenalty,
              options: origQ.options,
              explanation: origQ.explanation,
              createdAt: origQ.createdAt,
              updatedAt: origQ.updatedAt,
            },
            studentAnswerDisplay: String(userAns),
            correctAnswerDisplay: correctDisplay,
            isCorrect: false,
            isSkipped: false,
            status: 'incorrect',
            marksAwarded: -negPenalty,
            maxMarks: qMarks,
            explanation: origQ.explanation,
          });
        }
      }
    } else {
      // Numerical or subjective
      const isSkipped = userAns === undefined || String(userAns).trim() === '';
      if (isSkipped) {
        skippedCount++;
      } else {
        correctCount++;
        attainedMarks += qMarks;
      }
      reviewItems.push({
        questionNumber: qNumber,
        question: {
          id: qId,
          testId,
          order: qNumber,
          type: origQ.type,
          statement: origQ.statement,
          marks: qMarks,
          negativeMarks: negPenalty,
          explanation: origQ.explanation,
          createdAt: origQ.createdAt,
          updatedAt: origQ.updatedAt,
        },
        studentAnswerDisplay: String(userAns || 'No response'),
        correctAnswerDisplay: origQ.correctAnswer || 'See explanation',
        isCorrect: !isSkipped,
        isSkipped,
        status: isSkipped ? 'skipped' : 'correct',
        marksAwarded: isSkipped ? 0 : qMarks,
        maxMarks: qMarks,
        explanation: origQ.explanation,
      });
    }
  });

  const finalMarks = Math.max(0, attainedMarks);
  const percentage = totalPossibleMarks > 0 ? Math.round((finalMarks / totalPossibleMarks) * 100) : 0;
  const attemptId = `attempt_${Date.now()}`;
  const submittedAt = new Date().toISOString();

  const scorecard: ScorecardData = {
    attemptId,
    testTitle: `${config.subject} Random Mock Test`,
    subject: config.subject,
    testCategory: 'subject',
    topicName: config.topic || 'Random Mix',
    studentName: studentUser.name || 'Student',
    studentRoll: studentUser.roll || 'N/A',
    submittedAt,
    score: finalMarks,
    totalMarks: totalPossibleMarks,
    percentage,
    totalQuestions: originalQuestions.length,
    correctCount,
    incorrectCount,
    skippedCount,
    subjectiveCount,
    questionsReview: reviewItems,
  };

  // Record in attempts store
  addStudentAttempt({
    id: attemptId,
    testId,
    testTitle: scorecard.testTitle,
    subject: scorecard.subject,
    testCategory: 'subject',
    studentName: scorecard.studentName,
    studentRoll: scorecard.studentRoll,
    studentEmail: studentUser.email || 'student@prephub.edu',
    submittedAt,
    score: finalMarks,
    totalMarks: totalPossibleMarks,
    percentage,
    status: 'graded',
  });

  return scorecard;
}

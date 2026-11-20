'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Maximize2,
  Minimize2,
  Copy,
  Keyboard,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { getStoredTests, getStoredTestById } from '@/lib/testStore';
import { addStudentAttempt } from '@/lib/attemptsStore';
import { evaluateRandomMockTest } from '@/lib/mockTestEngine';
import { authStore, DEMO_STUDENT } from '@/lib/authStore';
import { MockTest, Question, SubjectiveAnswerSubmission, TestCategory, EngineeringYear } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { MathText } from '@/components/ui/MathText';
import { Navbar } from '@/components/layout/Navbar';

interface StudentExamRunnerProps {
  testId: string;
}

export interface QuestionScorecardItem {
  questionNumber: number;
  question: Question;
  studentAnswerDisplay: string;
  correctAnswerDisplay: string;
  isCorrect: boolean;
  isSkipped: boolean;
  status: 'correct' | 'incorrect' | 'skipped' | 'subjective';
  marksAwarded: number;
  maxMarks: number;
  explanation?: string;
  studentSelectedOptionId?: string;
}

export interface ScorecardData {
  attemptId: string;
  testTitle: string;
  subject: string;
  testCategory?: TestCategory;
  targetYear?: EngineeringYear;
  topicName?: string;
  subjectsIncluded?: string[];
  studentName: string;
  studentRoll: string;
  submittedAt: string;
  score: number;
  totalMarks: number;
  percentage: number;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  skippedCount: number;
  subjectiveCount: number;
  questionsReview: QuestionScorecardItem[];
  autoSubmitted?: boolean;
}

export const StudentExamRunner: React.FC<StudentExamRunnerProps> = ({ testId }) => {
  const router = useRouter();

  const [test, setTest] = useState<MockTest | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Exam answers & review states
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] | number }>({});
  const [visited, setVisited] = useState<{ [key: string]: boolean }>({});
  const [markedForReview, setMarkedForReview] = useState<{ [key: string]: boolean }>({});

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState<number>(10 * 60);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [isTimeUpOverlay, setIsTimeUpOverlay] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // High-craft UX state
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [navFilter, setNavFilter] = useState<'all' | 'unanswered' | 'flagged'>('all');
  const [copiedQuestionId, setCopiedQuestionId] = useState<number | null>(null);

  // Scorecard state
  const [scorecard, setScorecard] = useState<ScorecardData | null>(null);

  // Security & Anti-Cheat State
  const fullQuestionsRef = useRef<Question[]>([]);
  const [tabSwitchCount, setTabSwitchCount] = useState<number>(0);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [securityToast, setSecurityToast] = useState<string | null>(null);

  // Submission protection guard
  const hasSubmittedRef = useRef<boolean>(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger brief security warning toast
  const triggerSecurityToast = useCallback((msg: string) => {
    setSecurityToast(msg);
    setTimeout(() => setSecurityToast(null), 3000);
  }, []);

  // Initialize test data & restore target end timestamp
  useEffect(() => {
    setIsMounted(true);

    // Mandatory Authentication Guard: Cannot access any mock test without logging in
    if (!authStore.isAuthenticated()) {
      router.replace(`/login?redirect=${encodeURIComponent(`/test/${testId}`)}`);
      return;
    }

    const allTests = getStoredTests();
    const found = allTests.find((t) => t.id === testId) || getStoredTestById(testId);

    if (found) {
      setTest(found);
      const testQs = found.questions && found.questions.length > 0 ? found.questions : [];
      
      // Store complete answer key in isolated ref (Zero-Trust Exam Security)
      fullQuestionsRef.current = testQs;

      // Mask answers and explanations from running client state so inspect element reveals nothing
      const maskedQs: Question[] = testQs.map((q) => ({
        ...q,
        explanation: undefined,
        options: q.options?.map((opt) => ({
          id: opt.id,
          text: opt.text,
          isCorrect: false, // Masked during active test
          explanation: undefined,
        })),
      }));

      setQuestions(maskedQs);

      if (maskedQs.length > 0) {
        setVisited((prev) => ({ ...prev, [maskedQs[0].id]: true }));
      }

      const storageKey = `prephub_exam_end_${testId}`;
      const durationSeconds = (found.durationMinutes || 10) * 60;
      let targetEndTime: number;

      try {
        const storedEnd = localStorage.getItem(storageKey);
        if (storedEnd) {
          const parsed = parseInt(storedEnd, 10);
          if (!isNaN(parsed) && parsed > Date.now() - 86400000) {
            targetEndTime = parsed;
          } else {
            targetEndTime = Date.now() + durationSeconds * 1000;
            localStorage.setItem(storageKey, targetEndTime.toString());
          }
        } else {
          targetEndTime = Date.now() + durationSeconds * 1000;
          localStorage.setItem(storageKey, targetEndTime.toString());
        }
      } catch {
        targetEndTime = Date.now() + durationSeconds * 1000;
      }

      const initialRemaining = Math.max(0, Math.floor((targetEndTime - Date.now()) / 1000));
      setTimeLeft(initialRemaining);

      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = setInterval(() => {
        const remaining = Math.max(0, Math.floor((targetEndTime - Date.now()) / 1000));
        setTimeLeft(remaining);

        if (remaining <= 0) {
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          handleAutoSubmitRef.current();
        }
      }, 1000);
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [testId, router]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Accidental tab close / reload protection during active exam
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!scorecard && !hasSubmittedRef.current && Object.keys(answers).length > 0) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [scorecard, answers]);

  // Anti-Cheat: Tab-Switch & Window Minimization Proctor
  useEffect(() => {
    if (!isMounted || scorecard || hasSubmittedRef.current) return;

    const handleVisibilityChange = () => {
      if (document.hidden && !hasSubmittedRef.current && !scorecard) {
        setTabSwitchCount((prev) => {
          const next = prev + 1;
          if (next >= 3) {
            triggerSecurityToast('3 tab switches detected! Exam is being auto-submitted for review.');
            handleAutoSubmitRef.current();
          } else if (next === 2) {
            setWarningMessage(
              'Final Warning (2 of 3): Leaving the exam tab is strictly recorded. A 3rd tab switch will automatically submit your exam!'
            );
            setIsWarningModalOpen(true);
          } else {
            setWarningMessage(
              'Integrity Warning (1 of 3): Tab switch detected. Please stay on this tab to ensure exam validity.'
            );
            setIsWarningModalOpen(true);
          }
          return next;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isMounted, scorecard, triggerSecurityToast]);

  // Keep auto-submit ref updated with 1.5s countdown overlay
  const handleAutoSubmitRef = useRef<() => void>(() => {});
  useEffect(() => {
    handleAutoSubmitRef.current = () => {
      if (hasSubmittedRef.current || isSubmitting) return;
      setIsTimeUpOverlay(true);
      setTimeout(() => {
        handleFinalSubmit(true);
      }, 1500);
    };
  });

  // Timer Auto-Submit Watcher: triggers when timeLeft reaches 0
  useEffect(() => {
    if (
      timeLeft <= 0 &&
      isMounted &&
      !scorecard &&
      !hasSubmittedRef.current &&
      !isSubmitting &&
      questions.length > 0
    ) {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      handleAutoSubmitRef.current();
    }
  }, [timeLeft, isMounted, scorecard, isSubmitting, questions.length]);

  // Track visited questions when changing currentIndex
  useEffect(() => {
    if (questions[currentIndex]) {
      setVisited((prev) => ({
        ...prev,
        [questions[currentIndex].id]: true,
      }));
    }
  }, [currentIndex, questions]);

  // Format MM:SS or HH:MM:SS
  const formattedCountdown = useMemo(() => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [timeLeft]);

  const currentQ = questions[currentIndex];

  // Helper: check if question is answered
  const isQuestionAnswered = useCallback(
    (qId: string) => {
      const val = answers[qId];
      if (val === undefined || val === null || val === '') return false;
      if (Array.isArray(val) && val.length === 0) return false;
      return true;
    },
    [answers]
  );

  // Statistics calculation for live header & navigator
  const stats = useMemo(() => {
    let answered = 0;
    let marked = 0;
    let notVisited = 0;

    questions.forEach((q) => {
      const ans = isQuestionAnswered(q.id);
      const isMarked = Boolean(markedForReview[q.id]);
      const isVis = Boolean(visited[q.id]);

      if (isMarked) {
        marked++;
      }
      if (ans) {
        answered++;
      } else if (!isVis) {
        notVisited++;
      }
    });

    return {
      answered,
      marked,
      notVisited,
      totalAnswered: answered,
      unanswered: Math.max(0, questions.length - answered),
    };
  }, [questions, visited, markedForReview, isQuestionAnswered]);

  // Answer selection handlers
  const handleSelectOption = useCallback(
    (optId: string) => {
      if (!currentQ) return;
      setAnswers((prev) => ({
        ...prev,
        [currentQ.id]: optId,
      }));
    },
    [currentQ]
  );

  const handleToggleMultipleOption = useCallback(
    (optId: string) => {
      if (!currentQ) return;
      const current = (answers[currentQ.id] as string[]) || [];
      const updated = current.includes(optId)
        ? current.filter((id) => id !== optId)
        : [...current, optId];

      setAnswers((prev) => ({
        ...prev,
        [currentQ.id]: updated,
      }));
    },
    [answers, currentQ]
  );

  const handleNumericInput = (val: string) => {
    if (!currentQ) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: val,
    }));
  };

  const handleSubjectiveInput = (text: string) => {
    if (!currentQ) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: text,
    }));
  };

  const handleToggleReview = useCallback(() => {
    if (!currentQ) return;
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  }, [currentQ]);

  // Keyboard navigation & hotkeys: [A-D], [1-4], [Arrows], [F], [Backspace]
  useEffect(() => {
    if (scorecard || isSubmitModalOpen || !currentQ) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tagName = target?.tagName;
      if (tagName === 'INPUT' || tagName === 'TEXTAREA' || target?.isContentEditable) {
        return;
      }

      const key = e.key.toUpperCase();

      // Option hotkeys: A, B, C, D or 1, 2, 3, 4
      let optIdx = -1;
      if (key === 'A' || key === '1') optIdx = 0;
      else if (key === 'B' || key === '2') optIdx = 1;
      else if (key === 'C' || key === '3') optIdx = 2;
      else if (key === 'D' || key === '4') optIdx = 3;

      if (optIdx !== -1 && currentQ.options && currentQ.options[optIdx]) {
        e.preventDefault();
        const opt = currentQ.options[optIdx];
        if (currentQ.type === 'single_choice') {
          handleSelectOption(opt.id);
        } else if (currentQ.type === 'multiple_choice') {
          handleToggleMultipleOption(opt.id);
        }
        return;
      }

      // Clear selection: Backspace or Escape
      if (e.key === 'Backspace' || e.key === 'Escape') {
        e.preventDefault();
        setAnswers((prev) => {
          const next = { ...prev };
          delete next[currentQ.id];
          return next;
        });
        return;
      }

      // Next Question: ArrowRight or K
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1));
        return;
      }

      // Previous Question: ArrowLeft or J
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'j') {
        e.preventDefault();
        setCurrentIndex((prev) => Math.max(0, prev - 1));
        return;
      }

      // Flag for review: F or M
      if (e.key.toLowerCase() === 'f' || e.key.toLowerCase() === 'm') {
        e.preventDefault();
        handleToggleReview();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    currentQ,
    questions.length,
    scorecard,
    isSubmitModalOpen,
    handleSelectOption,
    handleToggleMultipleOption,
    handleToggleReview,
  ]);

  // Final Exam Submission Handler
  const handleFinalSubmit = useCallback(async (autoSubmitted: boolean = false) => {
    if (hasSubmittedRef.current || !test || questions.length === 0) return;
    hasSubmittedRef.current = true;
    setIsSubmitting(true);

    try {
      localStorage.removeItem(`prephub_exam_end_${testId}`);
    } catch {
      // ignore
    }

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    const currentUser = authStore.getCurrentUser() || DEMO_STUDENT;
    const studentRollDisplay = currentUser.universityRoll || currentUser.classRoll || 'NA';

    // Zero-Trust Evaluation for Dynamic Question Bank Mock Tests
    if (testId.startsWith('mock-random-')) {
      const serverScorecard = evaluateRandomMockTest(testId, answers, {
        name: currentUser.name,
        roll: studentRollDisplay,
        email: currentUser.email,
      });
      if (serverScorecard) {
        setScorecard({ ...serverScorecard, autoSubmitted });
        setIsTimeUpOverlay(false);
        setIsSubmitModalOpen(false);
        setIsSubmitting(false);
        return;
      }
    }
    let attainedMarks = 0;
    let totalPossibleMarks = 0;
    const subjectiveSubmissions: SubjectiveAnswerSubmission[] = [];
    const reviewItems: QuestionScorecardItem[] = [];
    let correctCount = 0;
    let incorrectCount = 0;
    let skippedCount = 0;
    let subjectiveCount = 0;

    const evalQuestions = fullQuestionsRef.current.length > 0 ? fullQuestionsRef.current : questions;

    evalQuestions.forEach((q, index) => {
      const qMarks = q.marks || 4;
      const negMarks = q.negativeMarks || 0;
      totalPossibleMarks += qMarks;

      const userAns = answers[q.id];

      if (q.type === 'single_choice') {
        const correctOpt = q.options?.find((o) => o.isCorrect);
        const correctText = correctOpt ? correctOpt.text : 'N/A';

        if (!userAns) {
          skippedCount++;
          reviewItems.push({
            questionNumber: index + 1,
            question: q,
            studentAnswerDisplay: 'Skipped / Unanswered',
            correctAnswerDisplay: correctText,
            isCorrect: false,
            isSkipped: true,
            status: 'skipped',
            marksAwarded: 0,
            maxMarks: qMarks,
            explanation: q.explanation || correctOpt?.explanation,
            studentSelectedOptionId: undefined,
          });
        } else {
          const chosenOpt = q.options?.find((o) => o.id === userAns);
          const studentText = chosenOpt ? chosenOpt.text : String(userAns);
          const isCorrect = Boolean(correctOpt && userAns === correctOpt.id);

          if (isCorrect) {
            correctCount++;
            attainedMarks += qMarks;
            reviewItems.push({
              questionNumber: index + 1,
              question: q,
              studentAnswerDisplay: studentText,
              correctAnswerDisplay: correctText,
              isCorrect: true,
              isSkipped: false,
              status: 'correct',
              marksAwarded: qMarks,
              maxMarks: qMarks,
              explanation: q.explanation || correctOpt?.explanation,
              studentSelectedOptionId: String(userAns),
            });
          } else {
            incorrectCount++;
            attainedMarks -= negMarks;
            reviewItems.push({
              questionNumber: index + 1,
              question: q,
              studentAnswerDisplay: studentText,
              correctAnswerDisplay: correctText,
              isCorrect: false,
              isSkipped: false,
              status: 'incorrect',
              marksAwarded: -negMarks,
              maxMarks: qMarks,
              explanation: q.explanation || correctOpt?.explanation,
              studentSelectedOptionId: String(userAns),
            });
          }
        }
      } else if (q.type === 'multiple_choice') {
        const userSelected = (userAns as string[]) || [];
        const correctOpts = (q.options || []).filter((o) => o.isCorrect);
        const correctOptIds = correctOpts.map((o) => o.id);
        const correctText = correctOpts.map((o) => o.text).join('; ');

        if (userSelected.length === 0) {
          skippedCount++;
          reviewItems.push({
            questionNumber: index + 1,
            question: q,
            studentAnswerDisplay: 'Skipped / Unanswered',
            correctAnswerDisplay: correctText,
            isCorrect: false,
            isSkipped: true,
            status: 'skipped',
            marksAwarded: 0,
            maxMarks: qMarks,
            explanation: q.explanation,
          });
        } else {
          const selectedOpts = (q.options || []).filter((o) => userSelected.includes(o.id));
          const studentText = selectedOpts.map((o) => o.text).join('; ');
          const hasWrongSelection = userSelected.some((id) => !correctOptIds.includes(id));
          const allCorrectSelected =
            correctOptIds.length > 0 &&
            correctOptIds.every((id) => userSelected.includes(id)) &&
            !hasWrongSelection;

          if (allCorrectSelected) {
            correctCount++;
            attainedMarks += qMarks;
            reviewItems.push({
              questionNumber: index + 1,
              question: q,
              studentAnswerDisplay: studentText,
              correctAnswerDisplay: correctText,
              isCorrect: true,
              isSkipped: false,
              status: 'correct',
              marksAwarded: qMarks,
              maxMarks: qMarks,
              explanation: q.explanation,
            });
          } else {
            incorrectCount++;
            if (hasWrongSelection) attainedMarks -= negMarks;
            reviewItems.push({
              questionNumber: index + 1,
              question: q,
              studentAnswerDisplay: studentText,
              correctAnswerDisplay: correctText,
              isCorrect: false,
              isSkipped: false,
              status: 'incorrect',
              marksAwarded: hasWrongSelection ? -negMarks : 0,
              maxMarks: qMarks,
              explanation: q.explanation,
            });
          }
        }
      } else if (q.type === 'numerical') {
        const expected = q.expectedNumericAnswer;
        const tol = q.numericTolerance ?? 0;
        const correctText =
          expected !== undefined
            ? `${expected}${tol > 0 ? ` (±${tol})` : ''} ${q.unit || ''}`.trim()
            : 'N/A';

        if (userAns === undefined || userAns === '') {
          skippedCount++;
          reviewItems.push({
            questionNumber: index + 1,
            question: q,
            studentAnswerDisplay: 'Skipped / Unanswered',
            correctAnswerDisplay: correctText,
            isCorrect: false,
            isSkipped: true,
            status: 'skipped',
            marksAwarded: 0,
            maxMarks: qMarks,
            explanation: q.explanation,
          });
        } else {
          const numVal = parseFloat(userAns as string);
          const studentText = `${userAns} ${q.unit || ''}`.trim();
          const isCorrect =
            !isNaN(numVal) && expected !== undefined && Math.abs(numVal - expected) <= tol;

          if (isCorrect) {
            correctCount++;
            attainedMarks += qMarks;
            reviewItems.push({
              questionNumber: index + 1,
              question: q,
              studentAnswerDisplay: studentText,
              correctAnswerDisplay: correctText,
              isCorrect: true,
              isSkipped: false,
              status: 'correct',
              marksAwarded: qMarks,
              maxMarks: qMarks,
              explanation: q.explanation,
            });
          } else {
            incorrectCount++;
            reviewItems.push({
              questionNumber: index + 1,
              question: q,
              studentAnswerDisplay: studentText,
              correctAnswerDisplay: correctText,
              isCorrect: false,
              isSkipped: false,
              status: 'incorrect',
              marksAwarded: 0,
              maxMarks: qMarks,
              explanation: q.explanation,
            });
          }
        }
      } else if (q.type === 'subjective') {
        subjectiveCount++;
        const textVal = (userAns as string) || '';
        const isAnswered = textVal.trim().length > 0;

        if (isAnswered) {
          subjectiveSubmissions.push({
            questionId: q.id,
            questionOrder: index + 1,
            questionStatement: q.statement,
            maxMarks: qMarks,
            studentAnswerText: textVal,
            isEvaluated: false,
          });
        }

        reviewItems.push({
          questionNumber: index + 1,
          question: q,
          studentAnswerDisplay: isAnswered ? textVal : 'No response provided',
          correctAnswerDisplay: 'Subjective Response — Evaluated by Faculty',
          isCorrect: false,
          isSkipped: !isAnswered,
          status: 'subjective',
          marksAwarded: 0,
          maxMarks: qMarks,
          explanation: q.explanation,
        });

        if (!isAnswered) {
          skippedCount++;
        }
      }
    });

    const finalMarks = Math.max(0, attainedMarks);
    const finalPercentage =
      totalPossibleMarks > 0 ? Math.round((finalMarks / totalPossibleMarks) * 100) : 0;

    const newAttemptId = `attempt_${Date.now()}`;
    const submittedTime = new Date().toISOString();
    const studentEmailDisplay = currentUser.email || 'student@prephub.in';

    const attemptRecord = {
      id: newAttemptId,
      testId: test.id,
      testTitle: test.title,
      subject: test.subject,
      testCategory: test.testCategory,
      targetYear: test.targetYear,
      studentName: currentUser.name,
      studentRoll: studentRollDisplay,
      studentEmail: studentEmailDisplay,
      submittedAt: submittedTime,
      score: finalMarks,
      totalMarks: totalPossibleMarks,
      percentage: finalPercentage,
      status: 'graded' as const,
      subjectiveAnswers: subjectiveSubmissions,
    };

    addStudentAttempt(attemptRecord);

    setScorecard({
      attemptId: newAttemptId,
      testTitle: test.title,
      subject: test.subject,
      testCategory: test.testCategory,
      targetYear: test.targetYear,
      topicName: test.topicName,
      subjectsIncluded: test.subjectsIncluded,
      studentName: currentUser.name,
      studentRoll: studentRollDisplay,
      submittedAt: submittedTime,
      score: finalMarks,
      totalMarks: totalPossibleMarks,
      percentage: finalPercentage,
      totalQuestions: questions.length,
      correctCount,
      incorrectCount,
      skippedCount,
      subjectiveCount,
      questionsReview: reviewItems,
      autoSubmitted,
    });

    setIsTimeUpOverlay(false);
    setIsSubmitModalOpen(false);
    setIsSubmitting(false);
  }, [answers, questions, test, testId]);

  // Retake test handler (Entire test)
  const handleRetakeTest = () => {
    // Restore all original test questions if we were in drill mode
    const allTests = getStoredTests();
    const found = allTests.find((t) => t.id === testId) || getStoredTestById(testId);
    if (found && found.questions) {
      setQuestions(found.questions);
    }

    setScorecard(null);
    setAnswers({});
    setMarkedForReview({});
    setCurrentIndex(0);
    hasSubmittedRef.current = false;
    setIsSubmitting(false);

    try {
      localStorage.removeItem(`prephub_exam_end_${testId}`);
    } catch {
      // ignore
    }

    const durationSeconds = (test?.durationMinutes || 10) * 60;
    const targetEndTime = Date.now() + durationSeconds * 1000;
    try {
      localStorage.setItem(`prephub_exam_end_${testId}`, targetEndTime.toString());
    } catch {
      // ignore
    }

    setTimeLeft(durationSeconds);
    if (questions.length > 0) {
      setVisited({ [questions[0].id]: true });
    }

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      const remaining = Math.max(0, Math.floor((targetEndTime - Date.now()) / 1000));
      setTimeLeft(remaining);

      if (remaining <= 0) {
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        handleAutoSubmitRef.current();
      }
    }, 1000);
  };

  // High-Craft UX: Drill Mistakes Only
  const handleDrillMistakes = () => {
    if (!scorecard) return;
    const incorrectItems = scorecard.questionsReview.filter((q) => q.status === 'incorrect');
    if (incorrectItems.length === 0) return;

    const drillQuestions = incorrectItems.map((item) => item.question);
    setQuestions(drillQuestions);
    setScorecard(null);
    setAnswers({});
    setMarkedForReview({});
    setCurrentIndex(0);
    hasSubmittedRef.current = false;
    setIsSubmitting(false);

    try {
      localStorage.removeItem(`prephub_exam_end_${testId}`);
    } catch {
      // ignore
    }

    // 2 minutes per incorrect question
    const durationSeconds = Math.max(180, drillQuestions.length * 120);
    const targetEndTime = Date.now() + durationSeconds * 1000;
    try {
      localStorage.setItem(`prephub_exam_end_${testId}`, targetEndTime.toString());
    } catch {
      // ignore
    }

    setTimeLeft(durationSeconds);
    if (drillQuestions.length > 0) {
      setVisited({ [drillQuestions[0].id]: true });
    }

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      const remaining = Math.max(0, Math.floor((targetEndTime - Date.now()) / 1000));
      setTimeLeft(remaining);

      if (remaining <= 0) {
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        handleAutoSubmitRef.current();
      }
    }, 1000);
  };

  // High-Craft UX: One-Click Solution Copy
  const handleCopySolution = (item: QuestionScorecardItem) => {
    const textToCopy = [
      `PrepHub — Question ${item.questionNumber}:`,
      item.question.statement,
      '',
      `Correct Answer: ${item.correctAnswerDisplay}`,
      item.explanation ? `Explanation: ${item.explanation}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopiedQuestionId(item.questionNumber);
        setTimeout(() => setCopiedQuestionId(null), 2000);
      })
      .catch(() => {});
  };

  // Loading / Auth Guard state
  if (!isMounted || !test || !authStore.isAuthenticated()) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-8 h-8 border-2 border-slate-200 border-t-[#E14D45] rounded-full animate-spin mb-4" />
        <p className="text-xs font-mono font-medium text-slate-500">Preparing examination environment...</p>
      </div>
    );
  }

  // Fallback if test has no questions
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center p-8 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-xs">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">Exam Content Not Ready</h3>
          <p className="text-xs text-slate-500">
            This examination is scheduled, but questions are still being configured.
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#E14D45] text-white text-xs font-bold"
          >
            Return to Courses
          </Link>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW B: POST-EXAM DETAILED SCORECARD (Screenshots 18, 19, 20)
  // =========================================================================
  if (scorecard) {
    const headline =
      scorecard.percentage >= 80
        ? "Outstanding performance! You're exam-ready."
        : scorecard.percentage >= 50
        ? "Good effort. Let's sharpen up."
        : "Good effort. Let's sharpen up.";

    const radius = 46;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (circumference * scorecard.percentage) / 100;

    return (
      <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900 selection:bg-[#E14D45]/15 selection:text-[#E14D45]">
        {/* Top Navbar */}
        <Navbar activeTab="mock-tests" />

        {/* Main Scorecard Content */}
        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-12 w-full space-y-12">
          {/* Header & Subtitle */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#111A2E] text-white text-[10px] font-mono font-bold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 bg-white rounded-xs" />
                <span>TEST COMPLETE</span>
              </div>
              {scorecard.autoSubmitted && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-mono font-bold tracking-wider uppercase">
                  <span>Auto-submitted — time expired</span>
                </div>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {headline}
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 font-mono">
              {scorecard.testTitle} &bull; {scorecard.subject} {scorecard.targetYear ? `&bull; ${scorecard.targetYear}` : ''}
            </p>
          </div>

          {/* Dark Navy Scorecard Hero Card (Screenshot Page 18) */}
          <section className="bg-[#15233E] rounded-3xl p-8 sm:p-10 text-white shadow-lg space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Radial Circle Meter (Left/Center) */}
              <div className="md:col-span-5 flex flex-col items-center justify-center">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 110 110">
                    <circle
                      cx="55"
                      cy="55"
                      r={radius}
                      className="text-[#203155]"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    <circle
                      cx="55"
                      cy="55"
                      r={radius}
                      className="text-[#E14D45] transition-all duration-1000 ease-out"
                      strokeWidth="8"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-4xl font-black font-mono tracking-tight text-white tabular-nums">
                      {scorecard.percentage}%
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 -mt-0.5">
                      your score
                    </span>
                  </div>
                </div>
              </div>

              {/* 3 Metric Stat Cards (Right) */}
              <div className="md:col-span-7 grid grid-cols-3 gap-3">
                {/* Correct */}
                <div className="bg-[#1C2C4E] rounded-2xl p-4 sm:p-5 text-center border border-white/5 space-y-1">
                  <div className="flex items-center justify-center gap-1 text-emerald-400 text-xs font-mono font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                    {scorecard.correctCount}
                  </div>
                  <div className="text-[11px] font-mono text-slate-300">Correct</div>
                </div>

                {/* Incorrect */}
                <div className="bg-[#1C2C4E] rounded-2xl p-4 sm:p-5 text-center border border-white/5 space-y-1">
                  <div className="flex items-center justify-center gap-1 text-[#E14D45] text-xs font-mono font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#E14D45]" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                    {scorecard.incorrectCount}
                  </div>
                  <div className="text-[11px] font-mono text-slate-300">Incorrect</div>
                </div>

                {/* Skipped */}
                <div className="bg-[#1C2C4E] rounded-2xl p-4 sm:p-5 text-center border border-white/5 space-y-1">
                  <div className="flex items-center justify-center gap-1 text-slate-400 text-xs font-mono font-bold">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                    {scorecard.skippedCount}
                  </div>
                  <div className="text-[11px] font-mono text-slate-300">Skipped</div>
                </div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleRetakeTest}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E14D45] hover:bg-[#CC3F37] text-white text-xs font-bold tracking-tight shadow-xs transition-all active:scale-[0.99] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake this test</span>
              </button>

              {/* High-Craft UX: Drill Mistakes Only button */}
              {scorecard.incorrectCount > 0 && (
                <button
                  type="button"
                  onClick={handleDrillMistakes}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold tracking-tight shadow-xs transition-all active:scale-[0.99] cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E14D45]" />
                  <span>Drill Mistakes Only ({scorecard.incorrectCount} Qs)</span>
                </button>
              )}

              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 text-white text-xs font-bold tracking-tight transition-all active:scale-[0.99] cursor-pointer"
              >
                <span>Try another test</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>

          {/* Question-By-Question Detailed Review (Screenshots 19 & 20) */}
          <section className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
                REVIEW QUESTION-BY-QUESTION
              </h2>

              {/* Number Jump Pills */}
              <div className="flex items-center gap-2 flex-wrap">
                {scorecard.questionsReview.map((item) => {
                  const isCorr = item.status === 'correct';
                  const isInc = item.status === 'incorrect';

                  let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';
                  if (isCorr) {
                    badgeStyle = 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold';
                  } else if (isInc) {
                    badgeStyle = 'bg-rose-50 text-rose-800 border-rose-300 font-bold';
                  }

                  return (
                    <a
                      key={item.questionNumber}
                      href={`#review-q-${item.questionNumber}`}
                      className={`w-9 h-9 rounded-xl border text-xs font-mono flex items-center justify-center transition-transform hover:scale-105 ${badgeStyle}`}
                    >
                      {item.questionNumber}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Vertically Stacked Review Cards */}
            <div className="space-y-6">
              {scorecard.questionsReview.map((item) => {
                const isCorrect = item.status === 'correct';
                const isIncorrect = item.status === 'incorrect';
                const isSkipped = item.status === 'skipped';

                return (
                  <div
                    key={item.questionNumber}
                    id={`review-q-${item.questionNumber}`}
                    className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-xs scroll-mt-24"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                        Question {item.questionNumber} of {scorecard.totalQuestions}
                      </span>

                      <div className="flex items-center gap-2">
                        {/* High-Craft UX: Copy Solution button */}
                        <button
                          type="button"
                          onClick={() => handleCopySolution(item)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 text-[11px] font-mono font-medium transition-colors cursor-pointer"
                          title="Copy question and step-by-step solution"
                        >
                          {copiedQuestionId === item.questionNumber ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700 font-bold">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-400" />
                              <span>Copy Solution</span>
                            </>
                          )}
                        </button>

                        {isCorrect && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold font-mono">
                            <Check className="w-3.5 h-3.5" />
                            <span>Correct</span>
                          </span>
                        )}

                        {isIncorrect && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#E14D45] text-xs font-bold font-mono">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Incorrect</span>
                          </span>
                        )}

                        {isSkipped && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold font-mono">
                            <span>Skipped</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Question Statement */}
                    <div className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                      <MathText text={item.question.statement} />
                    </div>

                    {/* Options Breakdown */}
                    {item.question.options && item.question.options.length > 0 && (
                      <div className="space-y-2.5">
                        {item.question.options.map((opt, optIdx) => {
                          const letter = String.fromCharCode(65 + optIdx);
                          const isOptionCorrect = opt.isCorrect;
                          const wasSelected = item.studentSelectedOptionId === opt.id;

                          if (wasSelected && !isOptionCorrect) {
                            return (
                              <div
                                key={opt.id}
                                className="p-3.5 rounded-xl border border-rose-300 bg-rose-50/70 flex items-center justify-between gap-3"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="w-7 h-7 rounded-lg bg-[#E14D45] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                                    {letter}
                                  </span>
                                  <div className="text-sm font-semibold text-slate-900">
                                    <MathText text={opt.text} />
                                  </div>
                                </div>
                                <span className="text-xs font-mono font-bold text-[#E14D45] shrink-0">
                                  Your answer
                                </span>
                              </div>
                            );
                          }

                          if (isOptionCorrect) {
                            return (
                              <div
                                key={opt.id}
                                className="p-3.5 rounded-xl border border-emerald-300 bg-emerald-50/70 flex items-center justify-between gap-3"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                                    {letter}
                                  </span>
                                  <div className="text-sm font-semibold text-slate-900">
                                    <MathText text={opt.text} />
                                  </div>
                                </div>
                                <span className="text-xs font-mono font-bold text-emerald-700 shrink-0 flex items-center gap-1">
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Correct answer</span>
                                </span>
                              </div>
                            );
                          }

                          return (
                            <div
                              key={opt.id}
                              className="p-3.5 rounded-xl border border-slate-200/80 bg-white flex items-center justify-between gap-3 opacity-70"
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-slate-200/60">
                                  {letter}
                                </span>
                                <div className="text-sm font-normal text-slate-700">
                                  <MathText text={opt.text} />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Explanation Box */}
                    {item.explanation && (
                      <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                          Explanation:
                        </span>
                        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                          <MathText text={item.explanation} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 flex items-center justify-between flex-wrap gap-4 border-t border-slate-200">
              <button
                type="button"
                onClick={handleRetakeTest}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E14D45] hover:bg-[#CC3F37] text-white text-xs font-bold tracking-tight shadow-xs transition-all active:scale-[0.99] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake this test</span>
              </button>

              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold tracking-tight transition-all active:scale-[0.99] cursor-pointer"
              >
                <span>Browse more mock tests</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // =========================================================================
  // VIEW A: LIVE EXAMINATION RUNNER (Screenshots 16 & 17)
  // =========================================================================
  const isCurrentMarked = Boolean(markedForReview[currentQ?.id]);

  return (
    <div
      onContextMenu={(e) => {
        if (!scorecard) {
          e.preventDefault();
          triggerSecurityToast('Right-click context menu is restricted during active examinations.');
        }
      }}
      onCopy={(e) => {
        if (!scorecard) {
          e.preventDefault();
          triggerSecurityToast('Copying exam questions is strictly prohibited.');
        }
      }}
      onCut={(e) => {
        if (!scorecard) e.preventDefault();
      }}
      className="min-h-screen bg-[#FBFBFC] flex flex-col font-sans text-slate-900 select-none selection:bg-[#E14D45]/15 selection:text-[#E14D45]"
    >
      {/* Security Toast Notification */}
      {securityToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-slate-900/90 text-white text-xs font-semibold rounded-full shadow-lg border border-slate-700 backdrop-blur-md flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>{securityToast}</span>
        </div>
      )}

      {/* Top Examination Control Bar (Exit, Title, Centered Timer, Fullscreen, Status) */}
      <section className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Exit Exam Button + (Desktop Title & Subject) */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Exit Exam Button */}
            <button
              type="button"
              onClick={() => setIsExitModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700 text-slate-600 text-xs font-mono font-semibold transition-colors cursor-pointer shrink-0"
              title="Leave Exam"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exit</span>
            </button>

            {/* Test Title & Subject (Hidden on mobile to keep bar clean) */}
            <div className="min-w-0 hidden sm:block">
              <h1 className="text-sm sm:text-base lg:text-lg font-bold text-slate-900 truncate tracking-tight">
                {test.title}
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-500 font-mono truncate">
                {test.subject} &bull; {test.difficulty || 'Beginner'}
              </p>
            </div>
          </div>

          {/* Center: Countdown Timer Pill */}
          <div className="shrink-0 flex items-center gap-2">
            <div
              className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border text-xs sm:text-sm font-mono font-bold tracking-wider tabular-nums transition-colors ${
                timeLeft < 180
                  ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                  : 'bg-slate-50 text-slate-800 border-slate-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{formattedCountdown}</span>
            </div>
          </div>

          {/* Right: Fullscreen Toggle & Status (Desktop only, spacer on mobile) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Fullscreen mode toggle */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-mono font-semibold transition-colors cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen Mode (F11)' : 'Enter Distraction-Free Fullscreen Mode'}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>Exit</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Fullscreen</span>
                </>
              )}
            </button>

            <div className="text-right shrink-0">
              <span className="text-xs font-mono font-medium text-slate-500">
                Answered{' '}
                <strong className="text-slate-900">
                  {stats.totalAnswered}/{questions.length}
                </strong>{' '}
                &bull; Flagged{' '}
                <strong className="text-slate-900">{stats.marked}</strong>
              </span>
            </div>
          </div>

          {/* Mobile Right Spacer for Centered Timer */}
          <div className="w-8 sm:hidden shrink-0" />
        </div>
      </section>

      {/* 3. Main Two-Column Exam Runner Body */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 w-full flex-1 flex flex-col lg:flex-row gap-6 lg:gap-8 items-start pb-28 sm:pb-8">
        {/* =================================================================== */}
        {/* LEFT COLUMN: ACTIVE QUESTION CARD (Page 16)                          */}
        {/* =================================================================== */}
        <section className="w-full lg:w-[72%] flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-8 flex flex-col justify-between shadow-xs sm:min-h-[520px]">
            <div>
              {/* Question Kicker: QUESTION X OF N */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#E14D45] uppercase">
                    QUESTION {currentIndex + 1} OF {questions.length}
                  </span>
                </div>

                <span className="text-[11px] font-mono font-medium text-slate-400">
                  +{currentQ.marks || 4} / -{currentQ.negativeMarks || 0} marks
                </span>
              </div>

              {/* Question Statement */}
              <div className="py-4 sm:py-6 text-lg sm:text-2xl font-bold text-slate-900 leading-snug">
                <MathText text={currentQ.statement} />
              </div>

              {/* Optional Diagram / Image */}
              {currentQ.imageUrl && (
                <div className="pb-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentQ.imageUrl}
                    alt={currentQ.imageAlt || 'Question diagram'}
                    className="max-h-64 rounded-xl border border-slate-200 object-contain mx-auto"
                  />
                </div>
              )}

              {/* Options List */}
              <div className="space-y-3">
                {/* Single Choice Options with Hotkey Pills */}
                {currentQ.type === 'single_choice' &&
                  currentQ.options?.map((opt, i) => {
                    const isSelected = answers[currentQ.id] === opt.id;
                    const letter = String.fromCharCode(65 + i);

                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectOption(opt.id)}
                        className={`group flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 min-h-[48px] rounded-xl border transition-all duration-150 cursor-pointer ${
                          isSelected
                            ? 'border-slate-900 bg-slate-50/80 shadow-xs ring-1 ring-slate-900'
                            : 'border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/40 bg-white'
                        }`}
                      >
                        {/* Letter Badge with Keyboard Hotkey Indicator */}
                        <div
                          className={`w-8 h-8 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-[#15233E] text-white'
                              : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200 border border-slate-200/60'
                          }`}
                        >
                          {letter}
                        </div>

                        {/* Option Text */}
                        <div className="text-sm sm:text-base text-slate-900 flex-1 leading-normal font-medium">
                          <MathText text={opt.text} />
                        </div>

                        {/* Hotkey hint on hover */}
                        <span className="hidden sm:inline-block text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          Press {letter}
                        </span>

                        {/* Custom Radio Indicator */}
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                            isSelected
                              ? 'border-slate-900 bg-white ring-2 ring-slate-900/10'
                              : 'border-slate-300 group-hover:border-slate-400 bg-white'
                          }`}
                        >
                          {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />}
                        </div>
                      </div>
                    );
                  })}

                {/* Multiple Choice Options */}
                {currentQ.type === 'multiple_choice' &&
                  currentQ.options?.map((opt, i) => {
                    const selectedList = (answers[currentQ.id] as string[]) || [];
                    const isSelected = selectedList.includes(opt.id);
                    const letter = String.fromCharCode(65 + i);

                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleToggleMultipleOption(opt.id)}
                        className={`group flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 min-h-[48px] rounded-xl border transition-all duration-150 cursor-pointer ${
                          isSelected
                            ? 'border-slate-900 bg-slate-50/80 shadow-xs ring-1 ring-slate-900'
                            : 'border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/40 bg-white'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-[#15233E] text-white'
                              : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200 border border-slate-200/60'
                          }`}
                        >
                          {letter}
                        </div>

                        <div className="text-sm sm:text-base text-slate-900 flex-1 leading-normal font-medium">
                          <MathText text={opt.text} />
                        </div>

                        <span className="hidden sm:inline-block text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          Press {letter}
                        </span>

                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                            isSelected
                              ? 'border-slate-900 bg-slate-900 text-white'
                              : 'border-slate-300 group-hover:border-slate-400 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                        </div>
                      </div>
                    );
                  })}

                {/* Numerical Input */}
                {currentQ.type === 'numerical' && (
                  <div className="p-5 bg-slate-50/80 border border-slate-200/80 rounded-2xl space-y-3">
                    <label className="block text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider">
                      Enter Numerical Value
                    </label>
                    <div className="flex items-center gap-3 max-w-sm">
                      <input
                        type="number"
                        step="any"
                        placeholder="e.g. 25.5"
                        value={(answers[currentQ.id] as string) || ''}
                        onChange={(e) => handleNumericInput(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-slate-900 shadow-2xs"
                      />
                      {currentQ.unit && (
                        <span className="px-3 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-700">
                          {currentQ.unit}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Subjective Input */}
                {currentQ.type === 'subjective' && (
                  <div className="p-5 bg-slate-50/80 border border-slate-200/80 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold uppercase tracking-wider text-[11px] font-mono">
                        Written Response / Derivation
                      </span>
                      {currentQ.wordLimit && (
                        <span className="font-mono text-[11px]">Word limit: ~{currentQ.wordLimit}</span>
                      )}
                    </div>
                    <textarea
                      rows={5}
                      placeholder="Type your derivation or solution here..."
                      value={(answers[currentQ.id] as string) || ''}
                      onChange={(e) => handleSubjectiveInput(e.target.value)}
                      className="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Bottom Controls: Previous, Next, Flag for review (hidden on mobile, replaced by sticky mobile bottom bar) */}
            <div className="pt-6 mt-8 border-t border-slate-100 hidden sm:flex items-center justify-between flex-wrap gap-3">
              {/* Flag for review button */}
              <button
                type="button"
                onClick={handleToggleReview}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  isCurrentMarked
                    ? 'border-amber-300 bg-amber-50 text-amber-800'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                }`}
              >
                <Bookmark
                  className={`w-3.5 h-3.5 ${
                    isCurrentMarked ? 'fill-amber-500 text-amber-500' : 'text-slate-400'
                  }`}
                />
                <span>{isCurrentMarked ? 'Flagged for review' : 'Flag for review'}</span>
                <kbd className="hidden sm:inline-block ml-1 px-1.5 py-0.2 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-500">
                  F
                </kbd>
              </button>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                  <kbd className="hidden sm:inline-block ml-0.5 px-1 py-0.2 rounded bg-slate-100 text-[10px] font-mono text-slate-500">
                    ←
                  </kbd>
                </button>

                <button
                  type="button"
                  disabled={currentIndex === questions.length - 1}
                  onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                  <kbd className="hidden sm:inline-block ml-0.5 px-1 py-0.2 rounded bg-slate-800 text-[10px] font-mono text-slate-300">
                    →
                  </kbd>
                </button>
              </div>
            </div>

            {/* High-Craft UX: Shortcuts Legend Strip (Desktop only) */}
            <div className="pt-3 mt-3 border-t border-slate-50 flex items-center justify-between text-[11px] font-mono text-slate-400 hidden sm:flex">
              <div className="flex items-center gap-1">
                <Keyboard className="w-3.5 h-3.5 text-slate-400" />
                <span>Hotkeys:</span>
              </div>
              <div className="flex items-center gap-3">
                <span>
                  <strong className="text-slate-600 font-semibold">[A-D]</strong> Select
                </span>
                <span>
                  <strong className="text-slate-600 font-semibold">[←/→]</strong> Jump
                </span>
                <span>
                  <strong className="text-slate-600 font-semibold">[F]</strong> Flag
                </span>
                <span>
                  <strong className="text-slate-600 font-semibold">[Backspace]</strong> Clear
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Collapsible Navigator Section (Mobile only: lg:hidden) */}
          <div className="w-full lg:hidden bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <button
              type="button"
              onClick={() => setIsMobileNavOpen((prev) => !prev)}
              className="w-full px-4 py-3.5 flex items-center justify-between bg-slate-50/90 hover:bg-slate-100 text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">
                  Question Navigator
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-mono font-semibold text-slate-700">
                  Q{currentIndex + 1} of {questions.length}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500 text-xs font-mono">
                <span>{isMobileNavOpen ? 'Hide' : 'Show Navigator'}</span>
                {isMobileNavOpen ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </div>
            </button>

            {isMobileNavOpen && (
              <div className="p-4 border-t border-slate-100 space-y-4">
                {/* Mobile Filter Chips */}
                <div className="flex items-center gap-1 p-1 bg-slate-100/90 rounded-xl border border-slate-200/70 text-[10px] font-mono">
                  <button
                    type="button"
                    onClick={() => setNavFilter('all')}
                    className={`flex-1 py-1 px-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      navFilter === 'all'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    All ({questions.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setNavFilter('unanswered')}
                    className={`flex-1 py-1 px-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      navFilter === 'unanswered'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Unanswered ({stats.unanswered})
                  </button>
                  <button
                    type="button"
                    onClick={() => setNavFilter('flagged')}
                    className={`flex-1 py-1 px-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      navFilter === 'flagged'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Flagged ({stats.marked})
                  </button>
                </div>

                {/* Grid of Number Buttons */}
                <div className="grid grid-cols-6 gap-2">
                  {questions.map((q, idx) => {
                    const isCurrent = idx === currentIndex;
                    const isAns = isQuestionAnswered(q.id);
                    const isMarked = Boolean(markedForReview[q.id]);

                    let isDimmed = false;
                    if (navFilter === 'unanswered' && isAns) isDimmed = true;
                    if (navFilter === 'flagged' && !isMarked) isDimmed = true;

                    let btnStyles = 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60';
                    if (isAns) {
                      btnStyles = 'bg-[#15233E] text-white font-bold';
                    } else if (isMarked) {
                      btnStyles = 'bg-amber-50 text-amber-800 border-amber-300 font-bold';
                    }
                    if (isCurrent) {
                      btnStyles += ' ring-2 ring-slate-900 ring-offset-2';
                    }
                    if (isDimmed) {
                      btnStyles += ' opacity-25';
                    }

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => {
                          setCurrentIndex(idx);
                          setIsMobileNavOpen(false);
                        }}
                        className={`relative w-full aspect-square rounded-xl font-mono text-xs flex items-center justify-center transition-all cursor-pointer ${btnStyles}`}
                      >
                        {idx + 1}
                        {isMarked && isAns && (
                          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-[#15233E]" />
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-amber-100 border border-amber-300" />
                    <span>Flagged</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-slate-100 border border-slate-200" />
                    <span>Unanswered</span>
                  </div>
                </div>

                {/* Submit test button inside mobile accordion */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(true)}
                    className="w-full py-3 px-4 rounded-xl bg-[#E14D45] hover:bg-[#CC3F37] text-white font-bold text-xs tracking-tight shadow-xs transition-all active:scale-[0.99] cursor-pointer"
                  >
                    Submit test
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =================================================================== */}
        {/* RIGHT COLUMN: QUESTION NAVIGATOR (Desktop sidebar only: hidden lg:flex) */}
        {/* =================================================================== */}
        <aside className="w-full lg:w-[28%] hidden lg:flex flex-col shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs sticky top-36 space-y-5">
            {/* Header */}
            <div className="space-y-1">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Question navigator
              </h2>
              <p className="text-xs text-slate-500">
                Tap a number to jump to any question.
              </p>
            </div>

            {/* High-Craft UX: Smart Filter Chips */}
            <div className="flex items-center gap-1 p-1 bg-slate-100/90 rounded-xl border border-slate-200/70 text-[10px] font-mono">
              <button
                type="button"
                onClick={() => setNavFilter('all')}
                className={`flex-1 py-1 px-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  navFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                All ({questions.length})
              </button>
              <button
                type="button"
                onClick={() => setNavFilter('unanswered')}
                className={`flex-1 py-1 px-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  navFilter === 'unanswered'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Unanswered ({stats.unanswered})
              </button>
              <button
                type="button"
                onClick={() => setNavFilter('flagged')}
                className={`flex-1 py-1 px-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  navFilter === 'flagged'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Flagged ({stats.marked})
              </button>
            </div>

            {/* Grid of Number Buttons (6 columns for 6 questions) */}
            <div className="grid grid-cols-6 gap-2">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAns = isQuestionAnswered(q.id);
                const isMarked = Boolean(markedForReview[q.id]);

                // Filter logic
                let isDimmed = false;
                if (navFilter === 'unanswered' && isAns) isDimmed = true;
                if (navFilter === 'flagged' && !isMarked) isDimmed = true;

                let btnStyles = 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60';

                if (isAns) {
                  btnStyles = 'bg-[#15233E] text-white hover:bg-slate-800 font-bold';
                } else if (isMarked) {
                  btnStyles = 'bg-amber-50 text-amber-800 border-amber-300 font-bold';
                }

                if (isCurrent) {
                  btnStyles += ' ring-2 ring-slate-900 ring-offset-2';
                }

                if (isDimmed) {
                  btnStyles += ' opacity-25 hover:opacity-100';
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative w-full aspect-square rounded-xl font-mono text-xs flex items-center justify-center transition-all cursor-pointer ${btnStyles}`}
                  >
                    {idx + 1}
                    {isMarked && isAns && (
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend (Page 16) */}
            <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-xs bg-[#15233E]" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-xs bg-amber-100 border border-amber-300" />
                <span>Flagged</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-xs bg-slate-100 border border-slate-200" />
                <span>Unanswered</span>
              </div>
            </div>

            {/* Big Red Submit Test CTA (Screenshot Page 16) */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(true)}
                className="w-full py-3.5 px-4 rounded-xl bg-[#E14D45] hover:bg-[#CC3F37] text-white font-bold text-xs tracking-tight shadow-xs transition-all active:scale-[0.99] cursor-pointer"
              >
                Submit test
              </button>
              <p className="text-[11px] font-mono text-center text-slate-400 mt-2">
                Submits instantly &bull; {stats.totalAnswered}/{questions.length} answered
              </p>
            </div>
          </div>
        </aside>
      </main>

      {/* Mobile Floating Quick-Submit Pill (above sticky bottom bar) */}
      <div className="fixed bottom-16 right-4 sm:hidden z-30">
        <button
          type="button"
          onClick={() => setIsSubmitModalOpen(true)}
          className="px-4 py-2.5 rounded-full bg-[#E14D45] hover:bg-[#CC3F37] text-white text-xs font-bold tracking-tight shadow-lg flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
        >
          <span>Submit</span>
          <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-mono">
            {stats.totalAnswered}/{questions.length}
          </span>
        </button>
      </div>

      {/* Mobile Sticky Bottom Navigation Bar (sm:hidden) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 py-2 shadow-lg flex items-center justify-between gap-2 sm:hidden">
        {/* Previous Button */}
        <button
          type="button"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          className="flex-1 h-12 inline-flex items-center justify-center gap-1.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer active:scale-98"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Prev</span>
        </button>

        {/* Flag for Review Button */}
        <button
          type="button"
          onClick={handleToggleReview}
          className={`flex-1 h-12 inline-flex items-center justify-center gap-1.5 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer active:scale-98 ${
            isCurrentMarked
              ? 'border-amber-300 bg-amber-50 text-amber-800'
              : 'border-slate-200 bg-white text-slate-700'
          }`}
        >
          <Bookmark
            className={`w-4 h-4 ${
              isCurrentMarked ? 'fill-amber-500 text-amber-500' : 'text-slate-400'
            }`}
          />
          <span>{isCurrentMarked ? 'Flagged' : 'Flag'}</span>
        </button>

        {/* Next Button */}
        <button
          type="button"
          disabled={currentIndex === questions.length - 1}
          onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
          className="flex-1 h-12 inline-flex items-center justify-center gap-1.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer active:scale-98"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Ready to submit test?"
      >
        <div className="space-y-4 pt-2">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            You have answered <strong className="text-slate-900">{stats.totalAnswered}</strong> of{' '}
            <strong className="text-slate-900">{questions.length}</strong> questions.
            {stats.unanswered > 0 && (
              <span className="block mt-1 text-amber-700 font-medium">
                Note: {stats.unanswered} question{stats.unanswered > 1 ? 's are' : ' is'} currently unanswered.
              </span>
            )}
          </p>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
            >
              Cancel &amp; Continue Test
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleFinalSubmit(false)}
              className="px-4 py-2 rounded-lg bg-[#E14D45] hover:bg-[#CC3F37] text-white text-xs font-bold tracking-tight shadow-xs transition-all cursor-pointer"
            >
              {isSubmitting ? 'Submitting...' : 'Yes, Submit Test'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Exit Exam Confirmation Modal */}
      <Modal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
        title="Leave this exam?"
      >
        <div className="space-y-4 pt-2">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Your progress will be lost. This cannot be undone.
          </p>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setIsExitModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                hasSubmittedRef.current = true;
                if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
                try {
                  localStorage.removeItem(`prephub_exam_end_${testId}`);
                } catch {}
                router.push('/courses');
              }}
              className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold tracking-tight shadow-xs transition-all cursor-pointer"
            >
              Leave Exam
            </button>
          </div>
        </div>
      </Modal>

      {/* Anti-Cheat Proctor Integrity Warning Modal */}
      <Modal
        isOpen={isWarningModalOpen}
        onClose={() => setIsWarningModalOpen(false)}
        title="⚠️ Exam Proctor Security Notice"
      >
        <div className="space-y-4 pt-2">
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-amber-900">Academic Integrity Alert</h4>
              <p className="text-xs text-amber-800 leading-relaxed">{warningMessage}</p>
            </div>
          </div>

          <div className="text-[11px] font-mono text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
            <div>
              Recorded Incidents: <span className="font-bold text-rose-600">{tabSwitchCount} of 3</span>
            </div>
            <p className="text-slate-500 font-sans text-[11px]">
              Switching tabs, minimizing the browser, or using external utilities is logged. A 3rd violation enforces instant auto-submission.
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => setIsWarningModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold tracking-tight transition-all cursor-pointer shadow-xs"
            >
              I Understand & Resume Exam
            </button>
          </div>
        </div>
      </Modal>

      {/* Time's Up Full-Screen Overlay */}
      {isTimeUpOverlay && (
        <div className="fixed inset-0 z-50 bg-[#111A2E]/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-white text-center animate-in fade-in duration-200">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mb-4 text-rose-400 animate-pulse">
            <Clock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Time&apos;s Up</h2>
          <p className="text-sm text-slate-300 font-mono mt-2 max-w-sm">
            Submitting your paper and calculating scores...
          </p>
          <div className="w-48 h-1 bg-slate-800 rounded-full mt-6 overflow-hidden">
            <div className="h-full bg-[#E14D45] animate-pulse w-full" />
          </div>
        </div>
      )}
    </div>
  );
};

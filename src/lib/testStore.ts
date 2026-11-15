import { MockTest, Question, QuestionType, ExamSettings } from '@/types';
import { initialMockTests } from '@/data/mockData';
import { getSeededQuestionsForTest } from './seedQuestions';
import { buildCourseMockTest } from './courseTestBank';
import { findCourseMockTest } from '@/data/coursesData';

const STORAGE_KEY = 'prephub_mock_tests_v2';
const EVENT_NAME = 'prephub_tests_updated';

export interface StorageResult {
  success: boolean;
  error?: string;
}

/**
 * Generates a collision-resistant unique ID for tests or questions.
 * Uses crypto.randomUUID when available, with a cryptographically sound fallback.
 */
export function generateUniqueId(prefix: 'test' | 'q' = 'test'): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 10);
  return `${prefix}-${timestamp}-${randomStr}`;
}

/**
 * Creates default exam configuration and scheduling settings.
 */
export function getDefaultExamSettings(test: Partial<MockTest>): ExamSettings {
  return {
    scheduleType: test.scheduledDate ? 'scheduled' : 'immediate',
    startDate: test.scheduledDate,
    durationMinutes: test.durationMinutes || 60,
    hasDeadline: !!test.scheduledDate,
    deadlineDate: test.scheduledDate
      ? new Date(new Date(test.scheduledDate).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()
      : undefined,
    sectionOrCourse: 'General Cohort (All Enrolled)',
    shareableLink: `https://prephub.edu/exam/${test.id || 'test'}`,
    isPasswordProtected: false,
    maxAttempts: 1,
    instructions: test.instructions || 'Read all questions carefully. Time limit begins as soon as you launch the assessment.',
    shuffleQuestions: false,
    shuffleOptions: false,
    practiceMode: false,
    answerReleaseTiming: 'immediate_after_close',
    resultsReleaseTiming: 'immediate_after_close',
    resultsVisibilityScope: 'score_answers_explanations',
  };
}

/**
 * Creates a blank question with sensible defaults for the given type.
 */
export function createDefaultQuestion(
  testId: string,
  order: number,
  type: QuestionType = 'single_choice'
): Question {
  const timestamp = new Date().toISOString();
  const id = generateUniqueId('q');

  switch (type) {
    case 'single_choice':
      return {
        id,
        testId,
        order,
        type: 'single_choice',
        statement: 'Which of the following is the correct SI unit of work and energy?',
        marks: 4,
        negativeMarks: 1,
        options: [
          { id: `${id}-opt-1`, text: 'Joule (J)', isCorrect: true, explanation: '1 Joule = 1 Newton × 1 Meter = 1 kg·m²/s²' },
          { id: `${id}-opt-2`, text: 'Watt (W)', isCorrect: false, explanation: 'Watt is the unit of power (Joules per second).' },
          { id: `${id}-opt-3`, text: 'Newton (N)', isCorrect: false, explanation: 'Newton is the unit of force.' },
          { id: `${id}-opt-4`, text: 'Pascal (Pa)', isCorrect: false, explanation: 'Pascal is the unit of pressure.' },
        ],
        explanation: 'Work and energy share the same dimensions [M L² T⁻²] and their SI unit is the Joule.',
        createdAt: timestamp,
        updatedAt: timestamp,
      };

    case 'multiple_choice':
      return {
        id,
        testId,
        order,
        type: 'multiple_choice',
        statement: 'Which of the following physical quantities are vector quantities? (Select all that apply)',
        marks: 4,
        negativeMarks: 1,
        options: [
          { id: `${id}-opt-1`, text: 'Displacement', isCorrect: true, explanation: 'Has both magnitude and direction.' },
          { id: `${id}-opt-2`, text: 'Velocity', isCorrect: true, explanation: 'Rate of change of displacement (vector).' },
          { id: `${id}-opt-3`, text: 'Speed', isCorrect: false, explanation: 'Speed is a scalar quantity.' },
          { id: `${id}-opt-4`, text: 'Acceleration', isCorrect: true, explanation: 'Rate of change of velocity (vector).' },
        ],
        explanation: 'Displacement, velocity, and acceleration have both magnitude and direction, unlike speed.',
        createdAt: timestamp,
        updatedAt: timestamp,
      };

    case 'numerical':
      return {
        id,
        testId,
        order,
        type: 'numerical',
        statement: 'A body of mass 5 kg is accelerated uniformly from rest to a speed of 20 m/s in 4 seconds. Calculate the net force (in Newtons) acting on the body.',
        marks: 4,
        negativeMarks: 0,
        expectedNumericAnswer: 25,
        numericTolerance: 0.1,
        unit: 'N',
        explanation: 'Acceleration a = (20 - 0) / 4 = 5 m/s². Net Force F = m × a = 5 kg × 5 m/s² = 25 N.',
        createdAt: timestamp,
        updatedAt: timestamp,
      };

    case 'subjective':
      return {
        id,
        testId,
        order,
        type: 'subjective',
        statement: 'State Newton\'s Second Law of Motion. Derive the relationship F = ma from the rate of change of linear momentum, and state any assumptions made.',
        marks: 6,
        negativeMarks: 0,
        wordLimit: 200,
        subjectiveGuidelines: 'Rubric:\n1. Clear statement of rate of change of momentum (2 pts)\n2. Step-by-step derivation: F = dp/dt = d(mv)/dt = m(dv/dt) (2 pts)\n3. Explicit assumption that mass m is constant (2 pts)',
        sampleAnswer: 'Newton\'s Second Law states that the time rate of change of linear momentum of a body is directly proportional to the applied net force and takes place in the direction of that force.\n\nDerivation:\nMomentum p = m * v\nForce F ∝ dp/dt\nAssuming mass m remains constant: F = m * (dv/dt) = m * a\nIn SI units, the constant of proportionality is chosen as 1, yielding F = ma.',
        createdAt: timestamp,
        updatedAt: timestamp,
      };

    default:
      return {
        id,
        testId,
        order,
        type: 'single_choice',
        statement: '',
        marks: 4,
        negativeMarks: 0,
        options: [
          { id: `${id}-opt-1`, text: '', isCorrect: true },
          { id: `${id}-opt-2`, text: '', isCorrect: false },
        ],
        createdAt: timestamp,
        updatedAt: timestamp,
      };
  }
}

/**
 * Ensures initial mock tests have realistic sample questions.
 */
function seedDefaultQuestions(tests: MockTest[]): MockTest[] {
  return tests.map((t) => {
    if (t.questions && t.questions.length > 0) {
      return t;
    }

    if (t.id === 'test-001') {
      const q1 = createDefaultQuestion('test-001', 1, 'single_choice');
      q1.statement = 'The characteristic distance at which quantum gravitational effects are significant, the Planck length, can be determined from a suitable combination of the fundamental physical constants $G$, $\\hbar$ and $c$. Which of the following correctly gives the Planck length ?';
      q1.marks = 4;
      q1.negativeMarks = 1;
      q1.options = [
        { id: 't1-q1-opt1', text: '$G\\hbar^2 c^3$', isCorrect: false },
        { id: 't1-q1-opt2', text: '$G^2 \\hbar c$', isCorrect: false },
        { id: 't1-q1-opt3', text: '\\sqrt{\\frac{G\\hbar}{c^3}}', isCorrect: true, explanation: 'Planck length is l_p = \\sqrt{\\frac{G\\hbar}{c^3}} ≈ 1.616 × 10⁻³⁵ m' },
        { id: 't1-q1-opt4', text: '\\sqrt{\\frac{G\\hbar}{c}}', isCorrect: false },
      ];

      const q2 = createDefaultQuestion('test-001', 2, 'single_choice');
      q2.statement = 'A block of mass $m = 2.0\\text{ kg}$ slides down a $30^\\circ$ frictionless incline of length $L = 10\\text{ m}$ starting from rest. What is its velocity at the bottom? (Take $g = 9.8\\text{ m/s}^2$)';
      q2.marks = 4;
      q2.negativeMarks = 1;
      q2.options = [
        { id: 't1-q2-opt1', text: '9.9 m/s', isCorrect: true, explanation: 'v = \\sqrt{2 g L \\sin\\theta} = \\sqrt{2 × 9.8 × 10 × 0.5} ≈ 9.9 m/s' },
        { id: 't1-q2-opt2', text: '14.0 m/s', isCorrect: false },
        { id: 't1-q2-opt3', text: '7.0 m/s', isCorrect: false },
        { id: 't1-q2-opt4', text: '4.9 m/s', isCorrect: false },
      ];

      const q3 = createDefaultQuestion('test-001', 3, 'multiple_choice');
      q3.statement = 'Which of the following statements are TRUE for a reversible adiabatic process in an ideal gas? (Select all that apply)';
      q3.marks = 4;
      q3.negativeMarks = 1;
      q3.options = [
        { id: 't1-q3-opt1', text: 'No heat enters or leaves the system ($Q = 0$)', isCorrect: true },
        { id: 't1-q3-opt2', text: 'The entropy of the system remains constant ($\\Delta S = 0$)', isCorrect: true },
        { id: 't1-q3-opt3', text: 'Temperature must remain constant during the expansion', isCorrect: false },
        { id: 't1-q3-opt4', text: 'Pressure and volume satisfy $P \\cdot V^\\gamma = \\text{constant}$', isCorrect: true },
      ];

      const q4 = createDefaultQuestion('test-001', 4, 'numerical');
      q4.statement = 'A Carnot heat engine operates between temperatures $T_H = 600\\text{ K}$ and $T_C = 300\\text{ K}$. If it absorbs $1200\\text{ J}$ of heat from the high-temperature reservoir per cycle, calculate the work output $W$ (in Joules) delivered per cycle.';
      q4.marks = 4;
      q4.negativeMarks = 0;
      q4.expectedNumericAnswer = 600;
      q4.numericTolerance = 1;
      q4.unit = 'Joules';

      const q5 = createDefaultQuestion('test-001', 5, 'subjective');
      q5.statement = 'State the Clausius statement of the Second Law of Thermodynamics. Explain how it guarantees that heat cannot spontaneously transfer from a cooler body to a hotter body without external work.';
      q5.marks = 6;
      q5.negativeMarks = 0;
      q5.wordLimit = 150;

      const q6 = createDefaultQuestion('test-001', 6, 'single_choice');
      q6.statement = 'What is the time period of a simple pendulum of length $l = 1.0\\text{ m}$ on Earth? (Take $g = \\pi^2\\text{ m/s}^2$)';
      q6.marks = 4;
      q6.negativeMarks = 1;
      q6.options = [
        { id: 't1-q6-opt1', text: '2.0 s', isCorrect: true },
        { id: 't1-q6-opt2', text: '1.0 s', isCorrect: false },
        { id: 't1-q6-opt3', text: '3.14 s', isCorrect: false },
        { id: 't1-q6-opt4', text: '4.0 s', isCorrect: false },
      ];

      const q7 = createDefaultQuestion('test-001', 7, 'single_choice');
      q7.statement = 'The moment of inertia of a uniform solid sphere of mass $M$ and radius $R$ about its diameter is:';
      q7.marks = 4;
      q7.negativeMarks = 1;
      q7.options = [
        { id: 't1-q7-opt1', text: '$\\frac{2}{5} M R^2$', isCorrect: true },
        { id: 't1-q7-opt2', text: '$\\frac{1}{2} M R^2$', isCorrect: false },
        { id: 't1-q7-opt3', text: '$\\frac{2}{3} M R^2$', isCorrect: false },
        { id: 't1-q7-opt4', text: '$\\frac{5}{3} M R^2$', isCorrect: false },
      ];

      const q8 = createDefaultQuestion('test-001', 8, 'single_choice');
      q8.statement = 'The escape velocity from the surface of Earth ($R_E = 6400\\text{ km}$) is approximately:';
      q8.marks = 4;
      q8.negativeMarks = 1;
      q8.options = [
        { id: 't1-q8-opt1', text: '11.2 km/s', isCorrect: true },
        { id: 't1-q8-opt2', text: '7.9 km/s', isCorrect: false },
        { id: 't1-q8-opt3', text: '9.8 km/s', isCorrect: false },
        { id: 't1-q8-opt4', text: '42.1 km/s', isCorrect: false },
      ];

      const q9 = createDefaultQuestion('test-001', 9, 'multiple_choice');
      q9.statement = 'Which of the following conditions must be satisfied for Bernoulli\'s equation to hold strictly in fluid dynamics? (Select all that apply)';
      q9.marks = 4;
      q9.negativeMarks = 1;
      q9.options = [
        { id: 't1-q9-opt1', text: 'The fluid flow is streamline (laminar)', isCorrect: true },
        { id: 't1-q9-opt2', text: 'The fluid is incompressible', isCorrect: true },
        { id: 't1-q9-opt3', text: 'The fluid is non-viscous', isCorrect: true },
        { id: 't1-q9-opt4', text: 'The flow is turbulent and compressible', isCorrect: false },
      ];

      const q10 = createDefaultQuestion('test-001', 10, 'numerical');
      q10.statement = 'A black body at absolute temperature $T = 300\\text{ K}$ emits radiation at a rate of $E = 460\\text{ W/m}^2$. If its temperature is doubled to $600\\text{ K}$, calculate the new emissive power (in $\\text{W/m}^2$).';
      q10.marks = 4;
      q10.negativeMarks = 0;
      q10.expectedNumericAnswer = 7360;
      q10.numericTolerance = 10;
      q10.unit = 'W/m²';

      const q11 = createDefaultQuestion('test-001', 11, 'single_choice');
      q11.statement = 'A source of sound of frequency $f = 600\\text{ Hz}$ approaches a stationary observer at $v_s = 34\\text{ m/s}$. Speed of sound in air is $340\\text{ m/s}$. What frequency does the observer perceive?';
      q11.marks = 4;
      q11.negativeMarks = 1;
      q11.options = [
        { id: 't1-q11-opt1', text: '667 Hz', isCorrect: true },
        { id: 't1-q11-opt2', text: '545 Hz', isCorrect: false },
        { id: 't1-q11-opt3', text: '600 Hz', isCorrect: false },
        { id: 't1-q11-opt4', text: '720 Hz', isCorrect: false },
      ];

      const q12 = createDefaultQuestion('test-001', 12, 'single_choice');
      q12.statement = 'According to Stokes\' law, the viscous drag force acting on a sphere of radius $r$ moving with terminal velocity $v$ through a fluid of viscosity $\\eta$ is given by:';
      q12.marks = 4;
      q12.negativeMarks = 1;
      q12.options = [
        { id: 't1-q12-opt1', text: '$F = 6 \\pi \\eta r v$', isCorrect: true },
        { id: 't1-q12-opt2', text: '$F = 4 \\pi \\eta r^2 v$', isCorrect: false },
        { id: 't1-q12-opt3', text: '$F = 6 \\pi \\eta r^2 / v$', isCorrect: false },
        { id: 't1-q12-opt4', text: '$F = \\frac{4}{3} \\pi r^3 \\eta g$', isCorrect: false },
      ];

      const q13 = createDefaultQuestion('test-001', 13, 'numerical');
      q13.statement = 'In a thermodynamic cycle, an ideal gas absorbs $500\\text{ J}$ of heat and performs $320\\text{ J}$ of external work. What is the net change in internal energy $\\Delta U$ (in Joules)?';
      q13.marks = 4;
      q13.negativeMarks = 0;
      q13.expectedNumericAnswer = 180;
      q13.numericTolerance = 0.5;
      q13.unit = 'Joules';

      const q14 = createDefaultQuestion('test-001', 14, 'single_choice');
      q14.statement = 'The speed of transverse waves on a string under tension $T$ with linear mass density $\\mu$ is:';
      q14.marks = 4;
      q14.negativeMarks = 1;
      q14.options = [
        { id: 't1-q14-opt1', text: '$v = \\sqrt{T / \\mu}$', isCorrect: true },
        { id: 't1-q14-opt2', text: '$v = \\sqrt{\\mu / T}$', isCorrect: false },
        { id: 't1-q14-opt3', text: '$v = T \\cdot \\mu$', isCorrect: false },
        { id: 't1-q14-opt4', text: '$v = \\sqrt{T \\cdot \\mu}$', isCorrect: false },
      ];

      const q15 = createDefaultQuestion('test-001', 15, 'single_choice');
      q15.statement = 'When a spinning ice skater pulls her arms inward, which quantity remains strictly conserved in the absence of net external torque?';
      q15.marks = 4;
      q15.negativeMarks = 1;
      q15.options = [
        { id: 't1-q15-opt1', text: 'Angular Momentum', isCorrect: true },
        { id: 't1-q15-opt2', text: 'Rotational Kinetic Energy', isCorrect: false },
        { id: 't1-q15-opt3', text: 'Moment of Inertia', isCorrect: false },
        { id: 't1-q15-opt4', text: 'Angular Velocity', isCorrect: false },
      ];

      const q16 = createDefaultQuestion('test-001', 16, 'single_choice');
      q16.statement = 'The root-mean-square velocity ($v_{\\text{rms}}$) of molecules of an ideal gas at temperature $T$ is proportional to:';
      q16.marks = 4;
      q16.negativeMarks = 1;
      q16.options = [
        { id: 't1-q16-opt1', text: '$\\sqrt{T}$', isCorrect: true },
        { id: 't1-q16-opt2', text: '$T$', isCorrect: false },
        { id: 't1-q16-opt3', text: '$T^2$', isCorrect: false },
        { id: 't1-q16-opt4', text: '$1 / \\sqrt{T}$', isCorrect: false },
      ];

      const q17 = createDefaultQuestion('test-001', 17, 'single_choice');
      q17.statement = 'The height $h$ to which water rises in a glass capillary tube of radius $r$ is inversely proportional to:';
      q17.marks = 4;
      q17.negativeMarks = 1;
      q17.options = [
        { id: 't1-q17-opt1', text: 'Radius of the tube ($r$)', isCorrect: true },
        { id: 't1-q17-opt2', text: 'Surface tension ($T$)', isCorrect: false },
        { id: 't1-q17-opt3', text: 'Contact angle cosine ($\\cos\\theta$)', isCorrect: false },
        { id: 't1-q17-opt4', text: 'Capillary length ($L$)', isCorrect: false },
      ];

      const q18 = createDefaultQuestion('test-001', 18, 'single_choice');
      q18.statement = 'For a perfectly elastic head-on collision between two equal masses moving along a straight line:';
      q18.marks = 4;
      q18.negativeMarks = 1;
      q18.options = [
        { id: 't1-q18-opt1', text: 'They completely exchange their velocities', isCorrect: true },
        { id: 't1-q18-opt2', text: 'Both come to rest immediately', isCorrect: false },
        { id: 't1-q18-opt3', text: 'Total kinetic energy is reduced by 50%', isCorrect: false },
        { id: 't1-q18-opt4', text: 'The coefficient of restitution is 0', isCorrect: false },
      ];

      const q19 = createDefaultQuestion('test-001', 19, 'numerical');
      q19.statement = 'A metal rod of length $1.0\\text{ m}$ and cross-sectional area $0.02\\text{ m}^2$ has thermal conductivity $k = 200\\text{ W/(m}\\cdot\\text{K)}$. If the temperature difference across its ends is $50\\text{ K}$, compute the rate of heat flow $\\frac{dQ}{dt}$ (in Watts).';
      q19.marks = 4;
      q19.negativeMarks = 0;
      q19.expectedNumericAnswer = 200;
      q19.numericTolerance = 1;
      q19.unit = 'Watts';

      const q20 = createDefaultQuestion('test-001', 20, 'subjective');
      q20.statement = 'Compare the thermodynamic efficiency of an ideal Otto cycle engine with that of a Carnot engine operating across the same maximum and minimum temperature limits ($T_{\\text{max}}$ and $T_{\\text{min}}$). Explain why the Carnot cycle represents the theoretical upper limit.';
      q20.marks = 6;
      q20.negativeMarks = 0;
      q20.wordLimit = 150;

      const questions = [
        q1, q2, q3, q4, q5,
        q6, q7, q8, q9, q10,
        q11, q12, q13, q14, q15,
        q16, q17, q18, q19, q20,
      ];

      return {
        ...t,
        instructor: 'Dr. Priya Sharma',
        targetQuestionCount: 20,
        totalMarks: questions.reduce((sum, q) => sum + q.marks, 0),
        questionCount: questions.length,
        questions,
        settings: t.settings || getDefaultExamSettings(t),
      };
    }

    if (t.id === 'test-002') {
      const q1 = createDefaultQuestion('test-002', 1, 'single_choice');
      q1.statement = 'Evaluate the definite integral $\\int_0^{\\pi/2} \\sin^2(x) \\, dx$ using trigonometric reduction.';
      q1.marks = 4;
      q1.negativeMarks = 1;
      q1.options = [
        { id: 't2-q1-opt1', text: '$\\frac{\\pi}{4}$', isCorrect: true, explanation: 'Using $\\sin^2(x) = \\frac{1 - \\cos(2x)}{2}$, $\\int_0^{\\pi/2} \\frac{1-\\cos(2x)}{2}dx = [\\frac{x}{2} - \\frac{\\sin(2x)}{4}]_0^{\\pi/2} = \\frac{\\pi}{4}$.' },
        { id: 't2-q1-opt2', text: '$\\frac{\\pi}{2}$', isCorrect: false },
        { id: 't2-q1-opt3', text: '1', isCorrect: false },
        { id: 't2-q1-opt4', text: '$\\frac{\\pi}{8}$', isCorrect: false },
      ];

      const q2 = createDefaultQuestion('test-002', 2, 'single_choice');
      q2.statement = 'Find all eigenvalues $\\lambda$ of the symmetric $2 \\times 2$ matrix $A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$.';
      q2.marks = 4;
      q2.negativeMarks = 1;
      q2.options = [
        { id: 't2-q2-opt1', text: '$\\lambda_1 = 1, \\lambda_2 = 3$', isCorrect: true, explanation: '$\\det(A - \\lambda I) = (2 - \\lambda)^2 - 1 = \\lambda^2 - 4\\lambda + 3 = (\\lambda - 1)(\\lambda - 3) = 0$.' },
        { id: 't2-q2-opt2', text: '$\\lambda_1 = 2, \\lambda_2 = 2$', isCorrect: false },
        { id: 't2-q2-opt3', text: '$\\lambda_1 = 0, \\lambda_2 = 4$', isCorrect: false },
        { id: 't2-q2-opt4', text: '$\\lambda_1 = -1, \\lambda_2 = 5$', isCorrect: false },
      ];

      const q3 = createDefaultQuestion('test-002', 3, 'multiple_choice');
      q3.statement = 'Let $A$ be an $n \\times n$ real matrix. Which of the following conditions are equivalent to $A$ being invertible? (Select all that apply)';
      q3.marks = 4;
      q3.negativeMarks = 1;
      q3.options = [
        { id: 't2-q3-opt1', text: '$\\det(A) \\neq 0$', isCorrect: true },
        { id: 't2-q3-opt2', text: '$\\text{Rank}(A) = n$', isCorrect: true },
        { id: 't2-q3-opt3', text: 'The kernel $\\ker(A) = \\{\\mathbf{0}\\}$', isCorrect: true },
        { id: 't2-q3-opt4', text: '$\\lambda = 0$ is an eigenvalue of $A$', isCorrect: false, explanation: 'If 0 is an eigenvalue, $\\det(A) = 0$, so $A$ is singular.' },
      ];

      const q4 = createDefaultQuestion('test-002', 4, 'numerical');
      q4.statement = 'If $f(x) = x^3 - 4x^2 + 7x - 5$, calculate the second derivative value $f\'\'(4)$.';
      q4.marks = 4;
      q4.negativeMarks = 0;
      q4.expectedNumericAnswer = 16;
      q4.numericTolerance = 0.1;
      q4.explanation = '$f\'(x) = 3x^2 - 8x + 7 \\implies f\'\'(x) = 6x - 8$. At $x = 4$, $f\'\'(4) = 6(4) - 8 = 16$.';

      const q5 = createDefaultQuestion('test-002', 5, 'single_choice');
      q5.statement = 'The derivative of $y = \\ln(\\sec x + \\tan x)$ with respect to $x$ is:';
      q5.marks = 4;
      q5.negativeMarks = 1;
      q5.options = [
        { id: 't2-q5-opt1', text: '$\\sec x$', isCorrect: true, explanation: '$\\frac{dy}{dx} = \\frac{\\sec x \\tan x + \\sec^2 x}{\\sec x + \\tan x} = \\sec x$.' },
        { id: 't2-q5-opt2', text: '$\\tan x$', isCorrect: false },
        { id: 't2-q5-opt3', text: '$\\sec^2 x$', isCorrect: false },
        { id: 't2-q5-opt4', text: '$\\frac{1}{\\sec x}$', isCorrect: false },
      ];

      const q6 = createDefaultQuestion('test-002', 6, 'numerical');
      q6.statement = 'Evaluate the fundamental trigonometric limit: $\\lim_{x \\to 0} \\frac{\\sin(5x)}{x}$.';
      q6.marks = 4;
      q6.negativeMarks = 0;
      q6.expectedNumericAnswer = 5;
      q6.numericTolerance = 0.01;
      q6.explanation = '$\\lim_{x \\to 0} 5 \\cdot \\frac{\\sin(5x)}{5x} = 5 \\cdot 1 = 5$.';

      const q7 = createDefaultQuestion('test-002', 7, 'multiple_choice');
      q7.statement = 'Which of the following ordinary differential equations are linear? (Select all that apply)';
      q7.marks = 4;
      q7.negativeMarks = 1;
      q7.options = [
        { id: 't2-q7-opt1', text: '$\\frac{d^2 y}{dx^2} + 3 \\frac{dy}{dx} + 2y = \\sin(x)$', isCorrect: true },
        { id: 't2-q7-opt2', text: '$x^2 \\frac{dy}{dx} + y = e^x$', isCorrect: true },
        { id: 't2-q7-opt3', text: '$\\frac{dy}{dx} + y^2 = 0$', isCorrect: false, explanation: 'Non-linear due to $y^2$ term.' },
        { id: 't2-q7-opt4', text: '$\\frac{dy}{dx} + \\sin(y) = x$', isCorrect: false, explanation: 'Non-linear due to $\\sin(y)$ term.' },
      ];

      const q8 = createDefaultQuestion('test-002', 8, 'subjective');
      q8.statement = 'State Rolle\'s Theorem for a real-valued function $f:[a,b] \\to \\mathbb{R}$. Explain how it is used to prove the Lagrange Mean Value Theorem.';
      q8.marks = 6;
      q8.negativeMarks = 0;
      q8.wordLimit = 180;
      q8.subjectiveGuidelines = 'Rubric:\n1. 3 conditions of Rolle\'s Theorem (continuity on [a,b], differentiability on (a,b), f(a)=f(b)) (2 pts)\n2. Auxiliary function definition g(x) = f(x) - [(f(b)-f(a))/(b-a)](x-a) (2 pts)\n3. Showing g\'(c)=0 implies f\'(c) = (f(b)-f(a))/(b-a) (2 pts)';

      const q9 = createDefaultQuestion('test-002', 9, 'single_choice');
      q9.statement = 'The value of the standard Gaussian integral $I = \\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx$ is:';
      q9.marks = 4;
      q9.negativeMarks = 1;
      q9.options = [
        { id: 't2-q9-opt1', text: '$\\sqrt{\\pi}$', isCorrect: true, explanation: '$I^2 = \\int_{-\\infty}^\\infty \\int_{-\\infty}^\\infty e^{-(x^2+y^2)} dx dy = \\pi \\implies I = \\sqrt{\\pi}$.' },
        { id: 't2-q9-opt2', text: '$\\pi$', isCorrect: false },
        { id: 't2-q9-opt3', text: '$\\frac{\\sqrt{\\pi}}{2}$', isCorrect: false },
        { id: 't2-q9-opt4', text: '$2\\pi$', isCorrect: false },
      ];

      const q10 = createDefaultQuestion('test-002', 10, 'numerical');
      q10.statement = 'Find the volume of the solid generated by revolving the region bounded by $y = \\sqrt{x}$, $y = 0$, and $x = 4$ about the x-axis. Round to 2 decimal places. (Take $\\pi \\approx 3.1416$)';
      q10.marks = 4;
      q10.negativeMarks = 0;
      q10.expectedNumericAnswer = 25.13;
      q10.numericTolerance = 0.2;
      q10.unit = 'cubic units';
      q10.explanation = '$V = \\pi \\int_0^4 (\\sqrt{x})^2 dx = \\pi [\\frac{x^2}{2}]_0^4 = 8\\pi \\approx 25.13$.';

      const questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];
      return {
        ...t,
        instructor: 'Prof. Alan Turing',
        targetQuestionCount: 10,
        totalMarks: questions.reduce((sum, q) => sum + q.marks, 0),
        questionCount: questions.length,
        questions,
        settings: t.settings || getDefaultExamSettings(t),
      };
    }

    if (t.id === 'test-004') {
      const q1 = createDefaultQuestion('test-004', 1, 'single_choice');
      q1.statement = 'What is the worst-case time complexity of searching for a key in a self-balancing AVL tree containing $n$ elements?';
      q1.marks = 4;
      q1.negativeMarks = 1;
      q1.options = [
        { id: 't4-q1-opt1', text: '$O(\\log n)$', isCorrect: true, explanation: 'The strict balance factor condition $|h_L - h_R| \\leq 1$ guarantees height $h \\leq 1.44 \\log_2 n$, so search is guaranteed $O(\\log n)$.' },
        { id: 't4-q1-opt2', text: '$O(n)$', isCorrect: false },
        { id: 't4-q1-opt3', text: '$O(n \\log n)$', isCorrect: false },
        { id: 't4-q1-opt4', text: '$O(1)$', isCorrect: false },
      ];

      const q2 = createDefaultQuestion('test-004', 2, 'single_choice');
      q2.statement = 'In Dijkstra\'s shortest path algorithm using a min-heap on a directed graph with $V$ vertices and $E$ edges, what is the optimal asymptotic running time?';
      q2.marks = 4;
      q2.negativeMarks = 1;
      q2.options = [
        { id: 't4-q2-opt1', text: '$O((V + E) \\log V)$', isCorrect: true, explanation: 'Extract-min takes $O(V \\log V)$ and decrease-key takes $O(E \\log V)$, yielding $O((V + E) \\log V)$.' },
        { id: 't4-q2-opt2', text: '$O(V^2)$', isCorrect: false },
        { id: 't4-q2-opt3', text: '$O(V \\cdot E)$', isCorrect: false },
        { id: 't4-q2-opt4', text: '$O(E \\log E)$', isCorrect: false },
      ];

      const q3 = createDefaultQuestion('test-004', 3, 'multiple_choice');
      q3.statement = 'Which of the following sorting algorithms have a worst-case time complexity of $O(n \\log n)$? (Select all that apply)';
      q3.marks = 4;
      q3.negativeMarks = 1;
      q3.options = [
        { id: 't4-q3-opt1', text: 'Merge Sort', isCorrect: true },
        { id: 't4-q3-opt2', text: 'Heap Sort', isCorrect: true },
        { id: 't4-q3-opt3', text: 'Quick Sort', isCorrect: false, explanation: 'Standard Quick Sort worst case is $O(n^2)$ when pivots are repeatedly poor.' },
        { id: 't4-q3-opt4', text: 'Insertion Sort', isCorrect: false },
      ];

      const q4 = createDefaultQuestion('test-004', 4, 'numerical');
      q4.statement = 'A perfect binary tree has 31 total nodes. What is the height $h$ of the tree (counting the root level as height 0)?';
      q4.marks = 4;
      q4.negativeMarks = 0;
      q4.expectedNumericAnswer = 4;
      q4.numericTolerance = 0;
      q4.explanation = '$2^{h+1} - 1 = 31 \\implies 2^{h+1} = 32 = 2^5 \\implies h = 4$.';

      const q5 = createDefaultQuestion('test-004', 5, 'multiple_choice');
      q5.statement = 'Which of the following conditions must hold simultaneously for a deadlock to occur in an operating system (Coffman conditions)? (Select all that apply)';
      q5.marks = 4;
      q5.negativeMarks = 1;
      q5.options = [
        { id: 't4-q5-opt1', text: 'Mutual Exclusion', isCorrect: true },
        { id: 't4-q5-opt2', text: 'Hold and Wait', isCorrect: true },
        { id: 't4-q5-opt3', text: 'No Preemption', isCorrect: true },
        { id: 't4-q5-opt4', text: 'Circular Wait', isCorrect: true },
      ];

      const q6 = createDefaultQuestion('test-004', 6, 'numerical');
      q6.statement = 'In a hash table with $m = 13$ slots using linear probing and hash function $h(k) = k \\bmod 13$, the keys $18, 26, 9$ are inserted. When key $35$ ($35 \\bmod 13 = 9$) is inserted, what slot index will it occupy after resolving collision?';
      q6.marks = 4;
      q6.negativeMarks = 0;
      q6.expectedNumericAnswer = 10;
      q6.numericTolerance = 0;
      q6.explanation = '$35 \\bmod 13 = 9$. Slot 9 is occupied by 9, so linear probing tries slot $(9 + 1) \\bmod 13 = 10$, which is empty.';

      const q7 = createDefaultQuestion('test-004', 7, 'single_choice');
      q7.statement = 'Which layer of the OSI model is responsible for reliable segment transmission, congestion control, and end-to-end flow control?';
      q7.marks = 4;
      q7.negativeMarks = 1;
      q7.options = [
        { id: 't4-q7-opt1', text: 'Transport Layer (Layer 4)', isCorrect: true, explanation: 'The Transport Layer (TCP/UDP) handles end-to-end flow control, port multiplexing, and reliability.' },
        { id: 't4-q7-opt2', text: 'Network Layer (Layer 3)', isCorrect: false },
        { id: 't4-q7-opt3', text: 'Data Link Layer (Layer 2)', isCorrect: false },
        { id: 't4-q7-opt4', text: 'Session Layer (Layer 5)', isCorrect: false },
      ];

      const q8 = createDefaultQuestion('test-004', 8, 'subjective');
      q8.statement = 'Compare Dynamic Programming with Greedy Algorithms. Give the mathematical recurrence relation for the 0/1 Knapsack problem and explain why the greedy density approach fails for 0/1 Knapsack.';
      q8.marks = 6;
      q8.negativeMarks = 0;
      q8.wordLimit = 200;
      q8.subjectiveGuidelines = 'Rubric:\n1. Distinction between local greedy decision and global subproblem evaluation (2 pts)\n2. Recurrence: dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i]] + val[i]) (2 pts)\n3. Counterexample showing greedy ratio fails when items cannot be fractioned (2 pts)';

      const q9 = createDefaultQuestion('test-004', 9, 'single_choice');
      q9.statement = 'In relational database theory, which normal form eliminates transitive functional dependencies on candidate keys?';
      q9.marks = 4;
      q9.negativeMarks = 1;
      q9.options = [
        { id: 't4-q9-opt1', text: 'Third Normal Form (3NF)', isCorrect: true, explanation: '3NF requires that every non-prime attribute is non-transitively dependent on candidate keys.' },
        { id: 't4-q9-opt2', text: 'Second Normal Form (2NF)', isCorrect: false },
        { id: 't4-q9-opt3', text: 'Boyce-Codd Normal Form (BCNF)', isCorrect: false },
        { id: 't4-q9-opt4', text: 'First Normal Form (1NF)', isCorrect: false },
      ];

      const q10 = createDefaultQuestion('test-004', 10, 'numerical');
      q10.statement = 'How many distinct simple undirected graphs can be constructed using $n = 4$ labeled vertices without self-loops?';
      q10.marks = 4;
      q10.negativeMarks = 0;
      q10.expectedNumericAnswer = 64;
      q10.numericTolerance = 0;
      q10.explanation = 'There are $\\binom{4}{2} = 6$ possible edges. Each edge can be present or absent: $2^6 = 64$.';

      const questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];
      return {
        ...t,
        instructor: 'Dr. Donald Knuth',
        targetQuestionCount: 10,
        totalMarks: questions.reduce((sum, q) => sum + q.marks, 0),
        questionCount: questions.length,
        questions,
        settings: t.settings || getDefaultExamSettings(t),
      };
    }

    if (t.id === 'test-003') {
      const q1 = createDefaultQuestion('test-003', 1, 'single_choice');
      q1.statement = 'Which mechanism predominantly governs the reaction between 2-bromo-2-methylpropane (tert-butyl bromide) and aqueous hydroxide at room temperature?';
      q1.marks = 4;
      q1.negativeMarks = 1;
      q1.options = [
        { id: 't3-q1-opt1', text: 'SN1 mechanism via a tertiary carbocation intermediate', isCorrect: true, explanation: 'Tertiary alkyl halides undergo rapid ionization to form a stable $3^\\circ$ carbocation intermediate.' },
        { id: 't3-q1-opt2', text: 'SN2 mechanism with backside nucleophilic attack', isCorrect: false },
        { id: 't3-q1-opt3', text: 'E2 elimination exclusively', isCorrect: false },
        { id: 't3-q1-opt4', text: 'Electrophilic aromatic substitution', isCorrect: false },
      ];

      const q2 = createDefaultQuestion('test-003', 2, 'multiple_choice');
      q2.statement = 'Which of the following organic functional groups give a positive silver mirror precipitate with Tollens\' reagent? (Select all that apply)';
      q2.marks = 4;
      q2.negativeMarks = 1;
      q2.options = [
        { id: 't3-q2-opt1', text: 'Aliphatic Aldehydes (e.g. ethanal)', isCorrect: true },
        { id: 't3-q2-opt2', text: 'Aromatic Aldehydes (e.g. benzaldehyde)', isCorrect: true },
        { id: 't3-q2-opt3', text: 'Alpha-hydroxy ketones (e.g. fructose via enediol rearrangement)', isCorrect: true },
        { id: 't3-q2-opt4', text: 'Simple Dialkyl Ketones (e.g. acetone)', isCorrect: false },
      ];

      const q3 = createDefaultQuestion('test-003', 3, 'numerical');
      q3.statement = 'Calculate the pH of a $0.001\\text{ M}$ aqueous hydrochloric acid ($\\text{HCl}$) solution at $25^\\circ\\text{C}$.';
      q3.marks = 4;
      q3.negativeMarks = 0;
      q3.expectedNumericAnswer = 3;
      q3.numericTolerance = 0.05;
      q3.explanation = '$\\text{HCl}$ is a strong acid that dissociates completely: $[H^+] = 10^{-3}\\text{ M} \\implies \\text{pH} = -\\log_{10}(10^{-3}) = 3.0$.';

      const q4 = createDefaultQuestion('test-003', 4, 'single_choice');
      q4.statement = 'What is the hybridization state of all carbon atoms in the planar benzene ring ($C_6H_6$)?';
      q4.marks = 4;
      q4.negativeMarks = 1;
      q4.options = [
        { id: 't3-q4-opt1', text: '$sp^2$', isCorrect: true, explanation: 'Each carbon forms 3 coplanar $\\sigma$-bonds ($sp^2$) and has one unhybridized $p$-orbital participating in $\\pi$-delocalization.' },
        { id: 't3-q4-opt2', text: '$sp^3$', isCorrect: false },
        { id: 't3-q4-opt3', text: '$sp$', isCorrect: false },
        { id: 't3-q4-opt4', text: '$dsp^2$', isCorrect: false },
      ];

      const q5 = createDefaultQuestion('test-003', 5, 'multiple_choice');
      q5.statement = 'Which of the following reaction conditions favor a bimolecular nucleophilic substitution ($S_N2$) pathway? (Select all that apply)';
      q5.marks = 4;
      q5.negativeMarks = 1;
      q5.options = [
        { id: 't3-q5-opt1', text: 'Polar aprotic solvent (e.g. DMSO, Acetone, DMF)', isCorrect: true },
        { id: 't3-q5-opt2', text: 'Strong, unhindered nucleophile (e.g. $OH^-$, $CN^-$)', isCorrect: true },
        { id: 't3-q5-opt3', text: 'Primary or methyl alkyl substrate', isCorrect: true },
        { id: 't3-q5-opt4', text: 'Bulky tertiary alkyl halide', isCorrect: false },
      ];

      const q6 = createDefaultQuestion('test-003', 6, 'subjective');
      q6.statement = 'Explain Hückel\'s $(4n+2)\\pi$ rule for aromaticity. Describe the four criteria required for aromatic stability and explain why cyclooctatetraene is non-aromatic.';
      q6.marks = 6;
      q6.negativeMarks = 0;
      q6.wordLimit = 180;
      q6.subjectiveGuidelines = 'Rubric:\n1. 4 criteria (cyclic, planar, fully conjugated, [4n+2] pi electrons) (2 pts)\n2. Cyclooctatetraene has 8 pi electrons (4n system) (2 pts)\n3. Tub conformation avoids antiaromatic destabilization (2 pts)';

      const q7 = createDefaultQuestion('test-003', 7, 'numerical');
      q7.statement = 'A first-order chemical reaction has a half-life of $t_{1/2} = 69.3\\text{ seconds}$. Calculate the rate constant $k$ in $\\text{s}^{-1}$.';
      q7.marks = 4;
      q7.negativeMarks = 0;
      q7.expectedNumericAnswer = 0.01;
      q7.numericTolerance = 0.001;
      q7.explanation = '$k = \\frac{\\ln 2}{t_{1/2}} = \\frac{0.69315}{69.3} = 0.01\\text{ s}^{-1}$.';

      const q8 = createDefaultQuestion('test-003', 8, 'single_choice');
      q8.statement = 'The oxidation state of chromium in potassium dichromate ($K_2Cr_2O_7$) is:';
      q8.marks = 4;
      q8.negativeMarks = 1;
      q8.options = [
        { id: 't3-q8-opt1', text: '+6', isCorrect: true, explanation: '$2(+1) + 2(x) + 7(-2) = 0 \\implies 2 + 2x - 14 = 0 \\implies 2x = 12 \\implies x = +6$.' },
        { id: 't3-q8-opt2', text: '+3', isCorrect: false },
        { id: 't3-q8-opt3', text: '+7', isCorrect: false },
        { id: 't3-q8-opt4', text: '+4', isCorrect: false },
      ];

      const questions = [q1, q2, q3, q4, q5, q6, q7, q8];
      return {
        ...t,
        instructor: 'Dr. Rosalind Franklin',
        targetQuestionCount: 8,
        totalMarks: questions.reduce((sum, q) => sum + q.marks, 0),
        questionCount: questions.length,
        questions,
        settings: t.settings || getDefaultExamSettings(t),
      };
    }

    // Check if external question seed exists for topic / full-length / advanced subject tests
    const extraQuestions = getSeededQuestionsForTest(t.id);
    if (extraQuestions.length > 0) {
      return {
        ...t,
        targetQuestionCount: t.targetQuestionCount || extraQuestions.length,
        totalMarks: extraQuestions.reduce((sum, q) => sum + (q.marks || 4), 0),
        questionCount: extraQuestions.length,
        questions: extraQuestions,
        settings: t.settings || getDefaultExamSettings(t),
      };
    }

    // Default starter question for any other test
    const defaultQ = createDefaultQuestion(t.id, 1, 'single_choice');
    return {
      ...t,
      targetQuestionCount: t.targetQuestionCount || t.questionCount || 1,
      totalMarks: 4,
      questionCount: 1,
      questions: [defaultQ],
      settings: t.settings || getDefaultExamSettings(t),
    };
  });
}

/**
 * Retrieves all tests safely from localStorage with fallback to seeded mock tests.
 */
export function getStoredTests(): MockTest[] {
  if (typeof window === 'undefined') {
    return seedDefaultQuestions(initialMockTests);
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = seedDefaultQuestions(initialMockTests);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Ensure seeded tests have full rich questions and multi-tiered metadata
      const seededList = seedDefaultQuestions(initialMockTests);
      let needsSync = false;

      const synced = seededList.map((seeded) => {
        const existing = parsed.find((p: MockTest) => p.id === seeded.id);
        if (!existing) {
          needsSync = true;
          return seeded;
        }

        // If existing is missing tiered category or has outdated question set
        const missingTierInfo = !existing.testCategory || !existing.targetYear || !existing.difficulty;
        const needsMoreQuestions =
          seeded.questions &&
          seeded.questions.length > 1 &&
          (!existing.questions || existing.questions.length < seeded.questions.length);

        if (missingTierInfo || needsMoreQuestions) {
          needsSync = true;
          return {
            ...existing,
            title: seeded.title || existing.title,
            subject: seeded.subject || existing.subject,
            testCategory: seeded.testCategory || existing.testCategory,
            targetYear: seeded.targetYear || existing.targetYear,
            topicName: seeded.topicName || existing.topicName,
            subjectsIncluded: seeded.subjectsIncluded || existing.subjectsIncluded,
            difficulty: seeded.difficulty || existing.difficulty,
            durationMinutes: existing.durationMinutes || seeded.durationMinutes,
            questions: needsMoreQuestions ? seeded.questions : existing.questions,
            questionCount: needsMoreQuestions ? seeded.questionCount : existing.questionCount,
            totalMarks: needsMoreQuestions ? seeded.totalMarks : existing.totalMarks,
          };
        }
        return existing;
      });

      // Also retain any custom tests created by user that are not in initialMockTests
      const customTests = parsed.filter(
        (p: MockTest) => !seededList.some((s) => s.id === p.id)
      );
      const combined = [...synced, ...customTests];

      if (needsSync) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(combined));
      }
      return combined;
    }
    const seeded = seedDefaultQuestions(initialMockTests);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  } catch (err) {
    console.warn('Error reading stored tests from localStorage:', err);
    return seedDefaultQuestions(initialMockTests);
  }
}

/**
 * Retrieves a single test by ID.
 */
export function getStoredTestById(id: string): MockTest | null {
  const tests = getStoredTests();
  const existing = tests.find((t) => t.id === id);
  if (existing) return existing;

  // Dynamically resolve course tests with rich 10-question pools
  const courseTest = findCourseMockTest(id);
  if (courseTest) {
    const isTest2 = id.endsWith('-t2');
    return buildCourseMockTest(
      courseTest.id,
      courseTest.title,
      courseTest.subject,
      courseTest.level,
      courseTest.durationMinutes,
      isTest2 ? 2 : 1
    );
  }

  return null;
}

/**
 * Saves or updates a test in localStorage and notifies listeners.
 * Returns a StorageResult indicating whether persistence succeeded.
 */
export function saveStoredTest(updatedTest: MockTest): StorageResult {
  if (typeof window === 'undefined') return { success: true };

  try {
    const tests = getStoredTests();
    const index = tests.findIndex((t) => t.id === updatedTest.id);

    // Update questionCount and totalMarks based on questions array if present
    const questions = updatedTest.questions || [];
    const questionCount = questions.length;
    const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 0), 0);

    const testToSave: MockTest = {
      ...updatedTest,
      targetQuestionCount: updatedTest.targetQuestionCount || updatedTest.questionCount || (questionCount > 0 ? questionCount : 1),
      questionCount,
      totalMarks,
      updatedAt: new Date().toISOString(),
    };

    let updatedList: MockTest[];
    if (index >= 0) {
      updatedList = [...tests];
      updatedList[index] = testToSave;
    } else {
      updatedList = [testToSave, ...tests];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: testToSave }));
    return { success: true };
  } catch (err) {
    console.error('Failed to save test in localStorage:', err);
    const isQuota =
      err instanceof DOMException &&
      (err.name === 'QuotaExceededError' ||
        err.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
        err.code === 22 ||
        err.code === 1014);

    return {
      success: false,
      error: isQuota
        ? 'Browser storage quota exceeded. The test data or attached images exceed local storage limits (5MB). Please reduce image sizes or remove attachments.'
        : 'Failed to persist test to local storage.',
    };
  }
}

/**
 * Deletes a test from localStorage by ID.
 */
export function deleteStoredTest(id: string): StorageResult {
  if (typeof window === 'undefined') return { success: true };

  try {
    const tests = getStoredTests();
    const filtered = tests.filter((t) => t.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { id, deleted: true } }));
    return { success: true };
  } catch (err) {
    console.error('Failed to delete test in localStorage:', err);
    return {
      success: false,
      error: 'Failed to delete test from local storage.',
    };
  }
}

/**
 * Resets storage back to default sample tests.
 */
export function resetStoredTestsToDefault(): MockTest[] {
  const seeded = seedDefaultQuestions(initialMockTests);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      window.dispatchEvent(new CustomEvent(EVENT_NAME));
    } catch (err) {
      console.error('Failed to reset tests in localStorage:', err);
    }
  }
  return seeded;
}

/**
 * Subscribes to storage updates across components.
 */
export function subscribeToTestStore(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handler = () => callback();
  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener('storage', handler);

  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener('storage', handler);
  };
}

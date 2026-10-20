import { MockTest, Question, QuestionType } from '@/types';
import { initialMockTests } from '@/data/mockData';

const STORAGE_KEY = 'prephub_mock_tests_v2';
const EVENT_NAME = 'prephub_tests_updated';

/**
 * Creates a blank question with sensible defaults for the given type.
 */
export function createDefaultQuestion(
  testId: string,
  order: number,
  type: QuestionType = 'single_choice'
): Question {
  const timestamp = new Date().toISOString();
  const id = `q-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 6)}`;

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
      q1.statement = 'A block of mass m = 2.0 kg slides down a 30° frictionless incline of length L = 10 m starting from rest. What is its velocity (in m/s) at the bottom? (Take g = 9.8 m/s²)';
      q1.options = [
        { id: 't1-q1-opt1', text: '9.9 m/s', isCorrect: true, explanation: 'v = √(2 g L sin θ) = √(2 × 9.8 × 10 × 0.5) = √98 ≈ 9.9 m/s' },
        { id: 't1-q1-opt2', text: '14.0 m/s', isCorrect: false, explanation: 'This corresponds to free fall without the incline angle.' },
        { id: 't1-q1-opt3', text: '7.0 m/s', isCorrect: false, explanation: 'Incorrect factor of 2.' },
        { id: 't1-q1-opt4', text: '4.9 m/s', isCorrect: false, explanation: 'Corresponds to acceleration, not velocity.' },
      ];
      q1.marks = 4;
      q1.negativeMarks = 1;

      const q2 = createDefaultQuestion('test-001', 2, 'multiple_choice');
      q2.statement = 'Which of the following statements are TRUE for a reversible adiabatic process in an ideal gas? (Select all that apply)';
      q2.options = [
        { id: 't1-q2-opt1', text: 'No heat enters or leaves the system (Q = 0)', isCorrect: true },
        { id: 't1-q2-opt2', text: 'The entropy of the system remains constant (ΔS = 0)', isCorrect: true },
        { id: 't1-q2-opt3', text: 'Temperature must remain constant during the expansion', isCorrect: false, explanation: 'In an adiabatic expansion, temperature drops as work is done at the expense of internal energy.' },
        { id: 't1-q2-opt4', text: 'Pressure and volume satisfy P · V^γ = constant', isCorrect: true },
      ];
      q2.marks = 4;
      q2.negativeMarks = 1;

      const q3 = createDefaultQuestion('test-001', 3, 'numerical');
      q3.statement = 'A Carnot heat engine operates between temperatures TH = 600 K and TC = 300 K. If it absorbs 1200 J of heat from the high-temperature reservoir per cycle, calculate the work output W (in Joules) delivered per cycle.';
      q3.expectedNumericAnswer = 600;
      q3.numericTolerance = 1;
      q3.unit = 'Joules';
      q3.explanation = 'Carnot efficiency η = 1 - (TC / TH) = 1 - (300/600) = 0.50 (50%). Work output W = η × Q_in = 0.50 × 1200 J = 600 J.';

      const q4 = createDefaultQuestion('test-001', 4, 'subjective');
      q4.statement = 'State the Clausius statement of the Second Law of Thermodynamics. Explain how it guarantees that heat cannot spontaneously transfer from a cooler body to a hotter body without external work.';
      q4.marks = 6;
      q4.wordLimit = 150;
      q4.subjectiveGuidelines = 'Key points: 1) Accurate statement of Clausius principle. 2) Entropy interpretation ΔS_univ ≥ 0. 3) Explanation that spontaneous reverse flow would decrease total entropy.';

      const questions = [q1, q2, q3, q4];
      return {
        ...t,
        totalMarks: questions.reduce((sum, q) => sum + q.marks, 0),
        questionCount: questions.length,
        questions,
      };
    }

    if (t.id === 'test-003') {
      const q1 = createDefaultQuestion('test-003', 1, 'single_choice');
      q1.statement = 'Which mechanism predominantly governs the reaction between 2-bromo-2-methylpropane (tert-butyl bromide) and aqueous hydroxide at room temperature?';
      q1.options = [
        { id: 't3-q1-opt1', text: 'SN1 mechanism via a tertiary carbocation intermediate', isCorrect: true },
        { id: 't3-q1-opt2', text: 'SN2 mechanism with backside nucleophilic attack', isCorrect: false },
        { id: 't3-q1-opt3', text: 'E2 elimination exclusively', isCorrect: false },
        { id: 't3-q1-opt4', text: 'Electrophilic aromatic substitution', isCorrect: false },
      ];
      const questions = [q1];
      return {
        ...t,
        totalMarks: 4,
        questionCount: 1,
        questions,
      };
    }

    // Default starter question for any other test
    const defaultQ = createDefaultQuestion(t.id, 1, 'single_choice');
    return {
      ...t,
      totalMarks: 4,
      questionCount: 1,
      questions: [defaultQ],
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
      return parsed;
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
  return tests.find((t) => t.id === id) || null;
}

/**
 * Saves or updates a test in localStorage and notifies listeners.
 */
export function saveStoredTest(updatedTest: MockTest): void {
  if (typeof window === 'undefined') return;

  try {
    const tests = getStoredTests();
    const index = tests.findIndex((t) => t.id === updatedTest.id);

    // Update questionCount and totalMarks based on questions array if present
    const questions = updatedTest.questions || [];
    const questionCount = questions.length;
    const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 0), 0);

    const testToSave: MockTest = {
      ...updatedTest,
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
  } catch (err) {
    console.error('Failed to save test in localStorage:', err);
  }
}

/**
 * Deletes a test from localStorage by ID.
 */
export function deleteStoredTest(id: string): void {
  if (typeof window === 'undefined') return;

  try {
    const tests = getStoredTests();
    const filtered = tests.filter((t) => t.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { id, deleted: true } }));
  } catch (err) {
    console.error('Failed to delete test in localStorage:', err);
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

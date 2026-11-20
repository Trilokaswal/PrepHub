import { BankQuestion, QuestionType, MockTest, Question, McqOption, MockTestGenerationConfig } from '@/types';
import { createClient as createBrowserSupabase, isSupabaseConfigured } from '@/lib/supabase/client';

export const AUTHORIZED_ADMIN_GMAIL = 'trilokaswal260506@gmail.com';

/**
 * Server and client verified admin check
 */
export function isAuthorizedAdmin(emailOrUser?: string | { email?: string } | null): boolean {
  if (!emailOrUser) return false;
  const email = typeof emailOrUser === 'string' ? emailOrUser : emailOrUser.email;
  if (!email) return false;
  return email.trim().toLowerCase() === AUTHORIZED_ADMIN_GMAIL.toLowerCase();
}

/**
 * Initial curated academic questions across multiple subjects and difficulties.
 * Ensures the Question Bank is immediately functional with rich KaTeX formulas even before uploading documents.
 */
export const INITIAL_BANK_QUESTIONS: BankQuestion[] = [
  // --- PHYSICS ---
  {
    id: 'qb-phy-001',
    statement: 'The characteristic distance at which quantum gravitational effects become significant, the Planck length, can be determined from the fundamental constants $G$, $\\hbar$, and $c$. Which expression correctly represents the Planck length $l_p$?',
    subject: 'Physics',
    topic: 'Modern Physics & Quantum Mechanics',
    difficulty: 'Hard',
    type: 'single_choice',
    options: [
      { id: 'qb-phy-001-o1', text: '$G \\hbar^2 c^3$', isCorrect: false },
      { id: 'qb-phy-001-o2', text: '$\\sqrt{\\frac{G\\hbar}{c^3}}$', isCorrect: true, explanation: 'By dimensional analysis, $l_p = \\sqrt{\\frac{G\\hbar}{c^3}} \\approx 1.616 \\times 10^{-35}\\text{ m}$.' },
      { id: 'qb-phy-001-o3', text: '$\\frac{G\\hbar}{c^2}$', isCorrect: false },
      { id: 'qb-phy-001-o4', text: '$\\sqrt{\\frac{G\\hbar}{c}}$', isCorrect: false },
    ],
    correctAnswer: '$\\sqrt{\\frac{G\\hbar}{c^3}}$',
    explanation: 'The Planck length is derived by combining Newtonian gravitation $G$, reduced Planck constant $\\hbar$, and speed of light $c$.',
    marks: 4,
    negativeMarks: 1,
    createdAt: '2026-10-01T10:00:00Z',
    updatedAt: '2026-10-01T10:00:00Z',
  },
  {
    id: 'qb-phy-002',
    statement: 'A block of mass $m = 2.0\\text{ kg}$ slides down a $30^\\circ$ frictionless incline of length $L = 10\\text{ m}$ starting from rest. What is its velocity at the bottom? (Take $g = 9.8\\text{ m/s}^2$)',
    subject: 'Physics',
    topic: 'Classical Mechanics',
    difficulty: 'Medium',
    type: 'single_choice',
    options: [
      { id: 'qb-phy-002-o1', text: '$9.9\\text{ m/s}$', isCorrect: true, explanation: '$v = \\sqrt{2 g L \\sin 30^\\circ} = \\sqrt{2 \\times 9.8 \\times 10 \\times 0.5} = \\sqrt{98} \\approx 9.9\\text{ m/s}$.' },
      { id: 'qb-phy-002-o2', text: '$14.0\\text{ m/s}$', isCorrect: false },
      { id: 'qb-phy-002-o3', text: '$7.0\\text{ m/s}$', isCorrect: false },
      { id: 'qb-phy-002-o4', text: '$4.9\\text{ m/s}$', isCorrect: false },
    ],
    correctAnswer: '$9.9\\text{ m/s}$',
    explanation: 'Using conservation of mechanical energy: $m g h = \\frac{1}{2} m v^2 \\implies v = \\sqrt{2 g L \\sin\\theta}$.',
    marks: 4,
    negativeMarks: 1,
    createdAt: '2026-10-02T10:00:00Z',
    updatedAt: '2026-10-02T10:00:00Z',
  },
  {
    id: 'qb-phy-003',
    statement: 'Which of the following is the correct SI unit of electric permittivity $\\varepsilon_0$?',
    subject: 'Physics',
    topic: 'Electromagnetism',
    difficulty: 'Easy',
    type: 'single_choice',
    options: [
      { id: 'qb-phy-003-o1', text: '$\\text{C}^2\\cdot\\text{N}^{-1}\\cdot\\text{m}^{-2}$', isCorrect: true, explanation: 'From Coulomb\'s law: $F = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1 q_2}{r^2} \\implies \\varepsilon_0 = \\frac{q^2}{F r^2}$.' },
      { id: 'qb-phy-003-o2', text: '$\\text{N}\\cdot\\text{m}^2\\cdot\\text{C}^{-2}$', isCorrect: false },
      { id: 'qb-phy-003-o3', text: '$\\text{F}\\cdot\\text{m}$', isCorrect: false },
      { id: 'qb-phy-003-o4', text: '$\\text{C}\\cdot\\text{N}^{-1}\\cdot\\text{m}^{-1}$', isCorrect: false },
    ],
    correctAnswer: '$\\text{C}^2\\cdot\\text{N}^{-1}\\cdot\\text{m}^{-2}$',
    explanation: 'Electric permittivity has units of Farad per meter, equivalent to $\\text{C}^2 / (\\text{N}\\cdot\\text{m}^2)$.',
    marks: 4,
    negativeMarks: 1,
    createdAt: '2026-10-03T10:00:00Z',
    updatedAt: '2026-10-03T10:00:00Z',
  },
  {
    id: 'qb-phy-004',
    statement: 'A Carnot engine operates between reservoirs at $T_H = 600\\text{ K}$ and $T_C = 300\\text{ K}$. If it absorbs $1200\\text{ J}$ of heat from the hot reservoir per cycle, calculate the work done (in Joules) per cycle.',
    subject: 'Physics',
    topic: 'Thermodynamics',
    difficulty: 'Easy',
    type: 'single_choice',
    options: [
      { id: 'qb-phy-004-o1', text: '$600\\text{ J}$', isCorrect: true, explanation: 'Efficiency $\\eta = 1 - \\frac{T_C}{T_H} = 1 - \\frac{300}{600} = 0.5$. $W = \\eta Q_H = 0.5 \\times 1200 = 600\\text{ J}$.' },
      { id: 'qb-phy-004-o2', text: '$400\\text{ J}$', isCorrect: false },
      { id: 'qb-phy-004-o3', text: '$800\\text{ J}$', isCorrect: false },
      { id: 'qb-phy-004-o4', text: '$1200\\text{ J}$', isCorrect: false },
    ],
    correctAnswer: '$600\\text{ J}$',
    explanation: 'Efficiency of Carnot engine is $\\eta = 1 - T_C/T_H = 0.5$. Work $W = \\eta \\cdot Q_H = 600\\text{ J}$.',
    marks: 4,
    negativeMarks: 1,
    createdAt: '2026-10-04T10:00:00Z',
    updatedAt: '2026-10-04T10:00:00Z',
  },
  {
    id: 'qb-phy-005',
    statement: 'A uniform solid sphere and a uniform solid cylinder having identical mass $M$ and radius $R$ roll down an inclined plane without slipping from rest. What is the ratio of their translational accelerations $a_{\\text{sphere}} / a_{\\text{cylinder}}$?',
    subject: 'Physics',
    topic: 'Rotational Dynamics',
    difficulty: 'Hard',
    type: 'single_choice',
    options: [
      { id: 'qb-phy-005-o1', text: '$\\frac{15}{14}$', isCorrect: true, explanation: '$a = \\frac{g\\sin\\theta}{1 + I/(M R^2)}$. For sphere: $a_s = \\frac{g\\sin\\theta}{1 + 2/5} = \\frac{5}{7}g\\sin\\theta$. For cylinder: $a_c = \\frac{g\\sin\\theta}{1 + 1/2} = \\frac{2}{3}g\\sin\\theta$. Ratio = $\\frac{5/7}{2/3} = \\frac{15}{14}$.' },
      { id: 'qb-phy-005-o2', text: '$\\frac{14}{15}$', isCorrect: false },
      { id: 'qb-phy-005-o3', text: '$\\frac{5}{4}$', isCorrect: false },
      { id: 'qb-phy-005-o4', text: '$1$', isCorrect: false },
    ],
    correctAnswer: '$\\frac{15}{14}$',
    explanation: 'The sphere has a smaller moment of inertia ratio ($k^2/R^2 = 2/5 < 1/2$), hence accelerating faster down the incline.',
    marks: 4,
    negativeMarks: 1,
    createdAt: '2026-10-05T10:00:00Z',
    updatedAt: '2026-10-05T10:00:00Z',
  },

  // --- MATHEMATICS ---
  {
    id: 'qb-math-001',
    statement: 'What are the eigenvalues of the real symmetric matrix $A = \\begin{pmatrix} 4 & 2 \\\\ 2 & 1 \\end{pmatrix}$?',
    subject: 'Mathematics',
    topic: 'Linear Algebra',
    difficulty: 'Easy',
    type: 'single_choice',
    options: [
      { id: 'qb-math-001-o1', text: '$\\lambda_1 = 5, \\lambda_2 = 0$', isCorrect: true, explanation: 'Trace $= 4 + 1 = 5$. Determinant $= 4(1) - 2(2) = 0$. Hence $\\lambda_1 + \\lambda_2 = 5$ and $\\lambda_1 \\lambda_2 = 0 \\implies \\lambda = 5, 0$.' },
      { id: 'qb-math-001-o2', text: '$\\lambda_1 = 4, \\lambda_2 = 1$', isCorrect: false },
      { id: 'qb-math-001-o3', text: '$\\lambda_1 = 3, \\lambda_2 = 2$', isCorrect: false },
      { id: 'qb-math-001-o4', text: '$\\lambda_1 = -5, \\lambda_2 = 0$', isCorrect: false },
    ],
    correctAnswer: '$\\lambda_1 = 5, \\lambda_2 = 0$',
    explanation: 'The characteristic equation $\\det(A - \\lambda I) = (4 - \\lambda)(1 - \\lambda) - 4 = \\lambda^2 - 5\\lambda = 0$ yields $\\lambda = 0, 5$.',
    marks: 4,
    negativeMarks: 1,
    createdAt: '2026-10-06T10:00:00Z',
    updatedAt: '2026-10-06T10:00:00Z',
  },
  {
    id: 'qb-math-002',
    statement: 'Evaluate the definite integral $I = \\int_0^{\\pi/2} \\frac{\\sqrt{\\sin x}}{\\sqrt{\\sin x} + \\sqrt{\\cos x}} \\, dx$.',
    subject: 'Mathematics',
    topic: 'Calculus',
    difficulty: 'Medium',
    type: 'single_choice',
    options: [
      { id: 'qb-math-002-o1', text: '$\\frac{\\pi}{4}$', isCorrect: true, explanation: 'Using King\'s property $\\int_a^b f(x)dx = \\int_a^b f(a+b-x)dx$, $2I = \\int_0^{\\pi/2} 1 \\, dx = \\frac{\\pi}{2} \\implies I = \\frac{\\pi}{4}$.' },
      { id: 'qb-math-002-o2', text: '$\\frac{\\pi}{2}$', isCorrect: false },
      { id: 'qb-math-002-o3', text: '$\\pi$', isCorrect: false },
      { id: 'qb-math-002-o4', text: '$1$', isCorrect: false },
    ],
    correctAnswer: '$\\frac{\\pi}{4}$',
    explanation: 'Applying the substitution $x \\to \\pi/2 - x$ transforms the numerator to $\\sqrt{\\cos x}$. Adding both yields $2I = \\pi/2$.',
    marks: 4,
    negativeMarks: 1,
    createdAt: '2026-10-07T10:00:00Z',
    updatedAt: '2026-10-07T10:00:00Z',
  },
  {
    id: 'qb-math-003',
    statement: 'What is the order and degree of the differential equation $\\left(1 + \\left(\\frac{dy}{dx}\\right)^2\\right)^{3/2} = k \\frac{d^2 y}{dx^2}$?',
    subject: 'Mathematics',
    topic: 'Differential Equations',
    difficulty: 'Easy',
    type: 'single_choice',
    options: [
      { id: 'qb-math-003-o1', text: 'Order = 2, Degree = 2', isCorrect: true, explanation: 'Squaring both sides eliminates fractional powers: $(1 + (y\')^2)^3 = k^2 (y\'\')^2$. Highest derivative is 2nd order with power 2.' },
      { id: 'qb-math-003-o2', text: 'Order = 2, Degree = 1', isCorrect: false },
      { id: 'qb-math-003-o3', text: 'Order = 1, Degree = 3', isCorrect: false },
      { id: 'qb-math-003-o4', text: 'Order = 2, Degree = 3', isCorrect: false },
    ],
    correctAnswer: 'Order = 2, Degree = 2',
    explanation: 'After rationalizing exponents, the power of the highest order derivative $d^2y/dx^2$ is 2.',
    marks: 4,
    negativeMarks: 1,
    createdAt: '2026-10-08T10:00:00Z',
    updatedAt: '2026-10-08T10:00:00Z',
  },
  {
    id: 'qb-math-004',
    statement: 'If a random variable $X$ follows a Poisson distribution with mean $\\lambda = 3$, what is the variance $\\text{Var}(X)$?',
    subject: 'Mathematics',
    topic: 'Probability & Statistics',
    difficulty: 'Easy',
    type: 'single_choice',
    options: [
      { id: 'qb-math-004-o1', text: '$3$', isCorrect: true, explanation: 'For a Poisson distribution, Mean = Variance = $\\lambda = 3$.' },
      { id: 'qb-math-004-o2', text: '$9$', isCorrect: false },
      { id: 'qb-math-004-o3', text: '$\\sqrt{3}$', isCorrect: false },
      { id: 'qb-math-004-o4', text: '$1.5$', isCorrect: false },
    ],
    correctAnswer: '$3$',
    explanation: 'A fundamental property of the Poisson distribution is that its variance is equal to its mean parameter $\\lambda$.',
    marks: 4,
    negativeMarks: 1,
    createdAt: '2026-10-09T10:00:00Z',
    updatedAt: '2026-10-09T10:00:00Z',
  },
  {
    id: 'qb-math-005',
    statement: 'Consider the vector field $\\vec{F} = (2x y + z^3)\\hat{i} + x^2\\hat{j} + 3x z^2\\hat{k}$. Which of the following statements is TRUE?',
    subject: 'Mathematics',
    topic: 'Vector Calculus',
    difficulty: 'Hard',
    type: 'single_choice',
    options: [
      { id: 'qb-math-005-o1', text: '$\\vec{F}$ is conservative and its scalar potential is $\\phi = x^2 y + x z^3 + C$', isCorrect: true, explanation: '$\\nabla \\times \\vec{F} = 0$, meaning $\\vec{F}$ is irrotational (conservative). Integrating $\\partial\\phi/\\partial x = 2xy + z^3$ gives $\\phi = x^2 y + x z^3 + C$.' },
      { id: 'qb-math-005-o2', text: '$\\vec{F}$ is solenoidal but not conservative', isCorrect: false },
      { id: 'qb-math-005-o3', text: '$\\vec{F}$ has non-zero curl everywhere', isCorrect: false },
      { id: 'qb-math-005-o4', text: 'The line integral of $\\vec{F}$ around any closed loop is $2\\pi$', isCorrect: false },
    ],
    correctAnswer: '$\\vec{F}$ is conservative and its scalar potential is $\\phi = x^2 y + x z^3 + C$',
    explanation: 'Since the curl of $\\vec{F}$ is zero throughout $\\mathbb{R}^3$, the field is conservative with potential $\\phi(x,y,z) = x^2 y + x z^3$.',
    marks: 4,
    negativeMarks: 1,
    createdAt: '2026-10-10T10:00:00Z',
    updatedAt: '2026-10-10T10:00:00Z',
  },

  // --- DATA STRUCTURES & ALGORITHMS ---
  {
    id: 'qb-dsa-001',
    statement: 'What is the worst-case time complexity of searching for an element in an AVL tree with $n$ nodes?',
    subject: 'Data Structures',
    topic: 'Trees & Balanced Search',
    difficulty: 'Easy',
    type: 'single_choice',
    options: [
      { id: 'qb-dsa-001-o1', text: '$O(\\log n)$', isCorrect: true, explanation: 'AVL trees strictly maintain height balance where balance factor $\\in \\{-1, 0, 1\\}$, guaranteeing height $h \\le 1.44 \\log_2 n$.' },
      { id: 'qb-dsa-001-o2', text: '$O(n)$', isCorrect: false },
      { id: 'qb-dsa-001-o3', text: '$O(n \\log n)$', isCorrect: false },
      { id: 'qb-dsa-001-o4', text: '$O(1)$', isCorrect: false },
    ],
    correctAnswer: '$O(\\log n)$',
    explanation: 'Self-balancing AVL trees ensure logarithmic height in the worst case, preventing degeneration into linked lists.',
    marks: 4,
    negativeMarks: 1,
    createdAt: '2026-10-11T10:00:00Z',
    updatedAt: '2026-10-11T10:00:00Z',
  },
  {
    id: 'qb-dsa-002',
    statement: 'Which of the following algorithmic paradigms does the Floyd-Warshall all-pairs shortest path algorithm use?',
    subject: 'Data Structures',
    topic: 'Graph Algorithms',
    difficulty: 'Medium',
    type: 'single_choice',
    options: [
      { id: 'qb-dsa-002-o1', text: 'Dynamic Programming', isCorrect: true, explanation: 'Floyd-Warshall solves subproblems $D^{(k)}[i][j] = \\min(D^{(k-1)}[i][j], D^{(k-1)}[i][k] + D^{(k-1)}[k][j])$ using DP.' },
      { id: 'qb-dsa-002-o2', text: 'Greedy Technique', isCorrect: false },
      { id: 'qb-dsa-002-o3', text: 'Divide and Conquer', isCorrect: false },
      { id: 'qb-dsa-002-o4', text: 'Branch and Bound', isCorrect: false },
    ],
    correctAnswer: 'Dynamic Programming',
    explanation: 'Floyd-Warshall is a classic $O(V^3)$ Dynamic Programming algorithm that considers intermediate vertices step-by-step.',
    marks: 4,
    negativeMarks: 1,
    createdAt: '2026-10-12T10:00:00Z',
    updatedAt: '2026-10-12T10:00:00Z',
  },
  {
    id: 'qb-dsa-003',
    statement: 'In a min-heap with $n$ elements, what is the tightest time complexity to find the maximum element?',
    subject: 'Data Structures',
    topic: 'Heaps & Priority Queues',
    difficulty: 'Medium',
    type: 'single_choice',
    options: [
      { id: 'qb-dsa-003-o1', text: '$O(n)$', isCorrect: true, explanation: 'In a min-heap, the maximum element must reside in one of the leaf nodes (nodes from $\\lfloor n/2 \\rfloor$ to $n-1$). There are $\\lceil n/2 \\rceil$ leaves, requiring a linear scan.' },
      { id: 'qb-dsa-003-o2', text: '$O(1)$', isCorrect: false },
      { id: 'qb-dsa-003-o3', text: '$O(\\log n)$', isCorrect: false },
      { id: 'qb-dsa-003-o4', text: '$O(n \\log n)$', isCorrect: false },
    ],
    correctAnswer: '$O(n)$',
    explanation: 'The maximum value in a min-heap is located among the leaves. Scanning all $\\approx n/2$ leaf nodes requires $O(n)$ time.',
    marks: 4,
    negativeMarks: 1,
    createdAt: '2026-10-13T10:00:00Z',
    updatedAt: '2026-10-13T10:00:00Z',
  },
  {
    id: 'qb-dsa-004',
    statement: 'Given the recurrence relation $T(n) = 2 T(n/2) + n \\log n$, what is the asymptotic solution according to the Master Theorem / Akra-Bazzi method?',
    subject: 'Data Structures',
    topic: 'Asymptotic Analysis',
    difficulty: 'Hard',
    type: 'single_choice',
    options: [
      { id: 'qb-dsa-004-o1', text: '$\\Theta(n \\log^2 n)$', isCorrect: true, explanation: '$a = 2, b = 2 \\implies n^{\\log_b a} = n^1$. Since $f(n) = n \\log n = n^{\\log_2 2} \\log^k n$ with $k=1$, case 2 applies: $T(n) = \\Theta(n \\log^{k+1} n) = \\Theta(n \\log^2 n)$.' },
      { id: 'qb-dsa-004-o2', text: '$\\Theta(n \\log n)$', isCorrect: false },
      { id: 'qb-dsa-004-o3', text: '$\\Theta(n^2)$', isCorrect: false },
      { id: 'qb-dsa-004-o4', text: '$\\Theta(n)$', isCorrect: false },
    ],
    correctAnswer: '$\\Theta(n \\log^2 n)$',
    explanation: 'By the extended Master Theorem case 2 ($f(n) = \\Theta(n^{\\log_b a} \\log^k n)$ with $k=1$), $T(n) = \\Theta(n \\log^2 n)$.',
    marks: 4,
    negativeMarks: 1,
    createdAt: '2026-10-14T10:00:00Z',
    updatedAt: '2026-10-14T10:00:00Z',
  },

  // --- CHEMISTRY ---
  {
    id: 'qb-chem-001',
    statement: 'According to Crystal Field Theory, what is the crystal field stabilization energy (CFSE) for a high-spin octahedral $d^6$ complex in terms of $\\Delta_o$ and pairing energy $P$?',
    subject: 'Chemistry',
    topic: 'Coordination Chemistry',
    difficulty: 'Hard',
    type: 'single_choice',
    options: [
      { id: 'qb-chem-001-o1', text: '$-0.4 \\Delta_o$', isCorrect: true, explanation: 'High-spin $d^6$ configuration is $t_{2g}^4 e_g^2$. CFSE = $4(-0.4\\Delta_o) + 2(+0.6\\Delta_o) = -1.6\\Delta_o + 1.2\\Delta_o = -0.4\\Delta_o$.' },
      { id: 'qb-chem-001-o2', text: '$-2.4 \\Delta_o + 2P$', isCorrect: false },
      { id: 'qb-chem-001-o3', text: '$-0.8 \\Delta_o$', isCorrect: false },
      { id: 'qb-chem-001-o4', text: '$0$', isCorrect: false },
    ],
    correctAnswer: '$-0.4 \\Delta_o$',
    explanation: 'With 4 electrons in lower $t_{2g}$ and 2 in upper $e_g$, CFSE $= 4(-0.4) + 2(0.6) = -0.4\\Delta_o$.',
    marks: 4,
    negativeMarks: 1,
    createdAt: '2026-10-15T10:00:00Z',
    updatedAt: '2026-10-15T10:00:00Z',
  },
  {
    id: 'qb-chem-002',
    statement: 'For a first-order chemical reaction, the half-life $t_{1/2}$ is $69.3\\text{ seconds}$. What is the rate constant $k$ (in $\\text{s}^{-1}$)?',
    subject: 'Chemistry',
    topic: 'Chemical Kinetics',
    difficulty: 'Easy',
    type: 'single_choice',
    options: [
      { id: 'qb-chem-002-o1', text: '$0.010\\text{ s}^{-1}$', isCorrect: true, explanation: '$k = \\frac{\\ln 2}{t_{1/2}} = \\frac{0.693}{69.3} = 0.010\\text{ s}^{-1}$.' },
      { id: 'qb-chem-002-o2', text: '$0.10\\text{ s}^{-1}$', isCorrect: false },
      { id: 'qb-chem-002-o3', text: '$1.0\\text{ s}^{-1}$', isCorrect: false },
      { id: 'qb-chem-002-o4', text: '$0.001\\text{ s}^{-1}$', isCorrect: false },
    ],
    correctAnswer: '$0.010\\text{ s}^{-1}$',
    explanation: 'For first order reactions, $k = 0.693 / t_{1/2} = 0.01\\text{ s}^{-1}$.',
    marks: 4,
    negativeMarks: 1,
    createdAt: '2026-10-16T10:00:00Z',
    updatedAt: '2026-10-16T10:00:00Z',
  },
  {
    id: 'qb-chem-003',
    statement: 'Which of the following compounds exhibits optical isomerism (chirality)?',
    subject: 'Chemistry',
    topic: 'Stereochemistry',
    difficulty: 'Medium',
    type: 'single_choice',
    options: [
      { id: 'qb-chem-003-o1', text: '2-Chlorobutane', isCorrect: true, explanation: 'Carbon-2 in 2-chlorobutane is bonded to 4 distinct groups: $-\\text{H}$, $-\\text{Cl}$, $-\\text{CH}_3$, and $-\\text{CH}_2\\text{CH}_3$, making it a chiral center.' },
      { id: 'qb-chem-003-o2', text: '1-Chlorobutane', isCorrect: false },
      { id: 'qb-chem-003-o3', text: '2-Chloropropane', isCorrect: false },
      { id: 'qb-chem-003-o4', text: 'Dichloromethane', isCorrect: false },
    ],
    correctAnswer: '2-Chlorobutane',
    explanation: 'A molecule is chiral if it has an asymmetric carbon attached to four different groups.',
    marks: 4,
    negativeMarks: 1,
    createdAt: '2026-10-17T10:00:00Z',
    updatedAt: '2026-10-17T10:00:00Z',
  },

  // --- COMPUTER NETWORKS & OPERATING SYSTEMS ---
  {
    id: 'qb-cs-001',
    statement: 'In the context of Operating Systems, which of the following conditions is NOT required for a deadlock to occur (Coffman Conditions)?',
    subject: 'Operating Systems',
    topic: 'Process Synchronization & Deadlocks',
    difficulty: 'Easy',
    type: 'single_choice',
    options: [
      { id: 'qb-cs-001-o1', text: 'Preemption of resources allowed', isCorrect: true, explanation: 'The 4 Coffman conditions are Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait. If preemption is allowed, deadlocks cannot persist.' },
      { id: 'qb-cs-001-o2', text: 'Mutual Exclusion', isCorrect: false },
      { id: 'qb-cs-001-o3', text: 'Hold and Wait', isCorrect: false },
      { id: 'qb-cs-001-o4', text: 'Circular Wait', isCorrect: false },
    ],
    correctAnswer: 'Preemption of resources allowed',
    explanation: 'Deadlock requires "No Preemption". Allowing resource preemption breaks the deadlock cycle.',
    marks: 4,
    negativeMarks: 1,
    createdAt: '2026-10-18T10:00:00Z',
    updatedAt: '2026-10-18T10:00:00Z',
  },
  {
    id: 'qb-cs-002',
    statement: 'A computer system uses 32-bit virtual addresses and a page size of $4\\text{ KB}$ ($2^{12}\\text{ bytes}$). How many bits are used for the page offset, and how many for the virtual page number (VPN)?',
    subject: 'Operating Systems',
    topic: 'Memory Management & Paging',
    difficulty: 'Medium',
    type: 'single_choice',
    options: [
      { id: 'qb-cs-002-o1', text: 'Offset: 12 bits, VPN: 20 bits', isCorrect: true, explanation: 'Page size $4\\text{ KB} = 2^{12}$ bytes $\\implies 12$ bits offset. Virtual address is 32 bits $\\implies 32 - 12 = 20$ bits for page number.' },
      { id: 'qb-cs-002-o2', text: 'Offset: 16 bits, VPN: 16 bits', isCorrect: false },
      { id: 'qb-cs-002-o3', text: 'Offset: 10 bits, VPN: 22 bits', isCorrect: false },
      { id: 'qb-cs-002-o4', text: 'Offset: 8 bits, VPN: 24 bits', isCorrect: false },
    ],
    correctAnswer: 'Offset: 12 bits, VPN: 20 bits',
    explanation: '$4\\text{ KB} = 2^{12}$ bytes requires 12 bits for offset. The remaining $32 - 12 = 20$ bits identify the page.',
    marks: 4,
    negativeMarks: 1,
    createdAt: '2026-10-19T10:00:00Z',
    updatedAt: '2026-10-19T10:00:00Z',
  },
];

const STORAGE_KEY = 'prephub_question_bank_v1';
const BANK_CHANGE_EVENT = 'prephub_question_bank_changed';

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Loads stored question bank items with fallback to initial seed questions
 */
export function getStoredBankQuestions(): BankQuestion[] {
  if (!isBrowser()) return INITIAL_BANK_QUESTIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BANK_QUESTIONS));
      return INITIAL_BANK_QUESTIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_BANK_QUESTIONS;
  } catch (err) {
    console.warn('Failed to read question bank from localStorage:', err);
    return INITIAL_BANK_QUESTIONS;
  }
}

/**
 * Saves question bank items to local storage
 */
export function saveStoredBankQuestions(questions: BankQuestion[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
    window.dispatchEvent(new Event(BANK_CHANGE_EVENT));
  } catch (err) {
    console.warn('Failed to write question bank to localStorage:', err);
  }
}

/**
 * Subscribes to question bank updates
 */
export function subscribeToQuestionBank(callback: () => void): () => void {
  if (!isBrowser()) return () => {};
  window.addEventListener(BANK_CHANGE_EVENT, callback);
  return () => window.removeEventListener(BANK_CHANGE_EVENT, callback);
}

/**
 * Question Bank management interface
 */
export const questionBankStore = {
  getQuestions(filters?: {
    subject?: string;
    topic?: string;
    difficulty?: string;
    type?: string;
    search?: string;
  }): BankQuestion[] {
    const all = getStoredBankQuestions();
    return all.filter((q) => {
      if (filters?.subject && filters.subject !== 'All' && q.subject.toLowerCase() !== filters.subject.toLowerCase()) {
        return false;
      }
      if (filters?.topic && filters.topic !== 'All' && q.topic.toLowerCase() !== filters.topic.toLowerCase()) {
        return false;
      }
      if (filters?.difficulty && filters.difficulty !== 'All' && q.difficulty.toLowerCase() !== filters.difficulty.toLowerCase()) {
        return false;
      }
      if (filters?.type && filters.type !== 'All' && q.type !== filters.type) {
        return false;
      }
      if (filters?.search && filters.search.trim()) {
        const query = filters.search.toLowerCase().trim();
        const matches =
          q.statement.toLowerCase().includes(query) ||
          q.subject.toLowerCase().includes(query) ||
          q.topic.toLowerCase().includes(query) ||
          q.explanation?.toLowerCase().includes(query) ||
          q.options?.some((o) => o.text.toLowerCase().includes(query));
        if (!matches) return false;
      }
      return true;
    });
  },

  getQuestionById(id: string): BankQuestion | undefined {
    const all = getStoredBankQuestions();
    return all.find((q) => q.id === id);
  },

  getAvailableSubjects(): string[] {
    const all = getStoredBankQuestions();
    const set = new Set<string>();
    all.forEach((q) => set.add(q.subject));
    return Array.from(set).sort();
  },

  getAvailableTopics(subject?: string): string[] {
    const all = getStoredBankQuestions();
    const set = new Set<string>();
    all.forEach((q) => {
      if (!subject || subject === 'All' || q.subject.toLowerCase() === subject.toLowerCase()) {
        set.add(q.topic);
      }
    });
    return Array.from(set).sort();
  },

  getStats(): {
    totalCount: number;
    subjectCounts: { [subject: string]: number };
    difficultyCounts: { Easy: number; Medium: number; Hard: number };
  } {
    const all = getStoredBankQuestions();
    const subjectCounts: { [subject: string]: number } = {};
    const difficultyCounts = { Easy: 0, Medium: 0, Hard: 0 };

    all.forEach((q) => {
      subjectCounts[q.subject] = (subjectCounts[q.subject] || 0) + 1;
      if (q.difficulty in difficultyCounts) {
        difficultyCounts[q.difficulty]++;
      }
    });

    return {
      totalCount: all.length,
      subjectCounts,
      difficultyCounts,
    };
  },

  addQuestion(q: Omit<BankQuestion, 'id' | 'createdAt' | 'updatedAt'>): BankQuestion {
    const all = getStoredBankQuestions();
    const now = new Date().toISOString();
    const newQ: BankQuestion = {
      ...q,
      id: `qb-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: now,
      updatedAt: now,
    };
    const updated = [newQ, ...all];
    saveStoredBankQuestions(updated);
    return newQ;
  },

  bulkAddQuestions(questions: Omit<BankQuestion, 'id' | 'createdAt' | 'updatedAt'>[]): {
    addedCount: number;
    duplicateCount: number;
  } {
    const existing = getStoredBankQuestions();
    const existingSignatures = new Set(
      existing.map((q) => q.statement.toLowerCase().replace(/[^\w]/g, ''))
    );

    const now = new Date().toISOString();
    const toAdd: BankQuestion[] = [];
    let duplicateCount = 0;

    questions.forEach((q) => {
      const sig = q.statement.toLowerCase().replace(/[^\w]/g, '');
      if (existingSignatures.has(sig)) {
        duplicateCount++;
      } else {
        existingSignatures.add(sig);
        toAdd.push({
          ...q,
          id: `qb-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          createdAt: now,
          updatedAt: now,
        });
      }
    });

    if (toAdd.length > 0) {
      saveStoredBankQuestions([...toAdd, ...existing]);
    }

    return {
      addedCount: toAdd.length,
      duplicateCount,
    };
  },

  updateQuestion(id: string, updates: Partial<BankQuestion>): boolean {
    const all = getStoredBankQuestions();
    const idx = all.findIndex((q) => q.id === id);
    if (idx === -1) return false;

    all[idx] = {
      ...all[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    saveStoredBankQuestions(all);
    return true;
  },

  deleteQuestion(id: string): boolean {
    const all = getStoredBankQuestions();
    const filtered = all.filter((q) => q.id !== id);
    if (filtered.length === all.length) return false;
    saveStoredBankQuestions(filtered);
    return true;
  },

  bulkDeleteQuestions(ids: string[]): number {
    const idSet = new Set(ids);
    const all = getStoredBankQuestions();
    const filtered = all.filter((q) => !idSet.has(q.id));
    const deletedCount = all.length - filtered.length;
    saveStoredBankQuestions(filtered);
    return deletedCount;
  },

  bulkUpdateDifficulty(ids: string[], difficulty: 'Easy' | 'Medium' | 'Hard'): number {
    const idSet = new Set(ids);
    const all = getStoredBankQuestions();
    let updatedCount = 0;
    const updated = all.map((q) => {
      if (idSet.has(q.id)) {
        updatedCount++;
        return { ...q, difficulty, updatedAt: new Date().toISOString() };
      }
      return q;
    });
    saveStoredBankQuestions(updated);
    return updatedCount;
  },
};

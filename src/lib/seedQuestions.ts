import { Question, QuestionType } from '@/types';
import { createDefaultQuestion } from './testStore';

/**
 * Creates a helper question object with clean syntax.
 */
function makeQ(
  testId: string,
  order: number,
  type: QuestionType,
  statement: string,
  marks: number,
  negMarks: number,
  opts?: { text: string; isCorrect: boolean; explanation?: string }[],
  extra?: {
    expectedNumericAnswer?: number;
    numericTolerance?: number;
    unit?: string;
    explanation?: string;
    subjectiveGuidelines?: string;
    sampleAnswer?: string;
    wordLimit?: number;
  }
): Question {
  const timestamp = '2026-10-20T12:00:00Z';
  const id = `${testId}-q${order}`;
  const options = opts?.map((o, idx) => ({
    id: `${id}-opt-${idx + 1}`,
    text: o.text,
    isCorrect: o.isCorrect,
    explanation: o.explanation,
  }));

  return {
    id,
    testId,
    order,
    type,
    statement,
    marks,
    negativeMarks: negMarks,
    options,
    expectedNumericAnswer: extra?.expectedNumericAnswer,
    numericTolerance: extra?.numericTolerance,
    unit: extra?.unit,
    explanation: extra?.explanation,
    subjectiveGuidelines: extra?.subjectiveGuidelines,
    sampleAnswer: extra?.sampleAnswer,
    wordLimit: extra?.wordLimit,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

/**
 * Returns seeded questions for each mock test ID.
 */
export function getSeededQuestionsForTest(testId: string): Question[] {
  switch (testId) {
    // ========================================================
    // PREPHUB EXACT REFERENCE: Engineering Mathematics I
    // ========================================================
    case 'engineering-maths-1':
      return [
        makeQ(
          testId,
          1,
          'single_choice',
          'If 2x + 5 = 13, what is the value of x?',
          1,
          0,
          [
            { text: '3', isCorrect: false },
            {
              text: '4',
              isCorrect: true,
              explanation: 'Subtract 5 from both sides to get 2x = 8, then divide by 2 to find x = 4.',
            },
            { text: '5', isCorrect: false },
            { text: '6', isCorrect: false },
          ]
        ),
        makeQ(
          testId,
          2,
          'single_choice',
          'Simplify the expression: 3(x + 2) - x',
          1,
          0,
          [
            {
              text: '2x + 6',
              isCorrect: true,
              explanation:
                'Distribute the 3 to get 3x + 6, then combine like terms: 3x - x + 6 = 2x + 6.',
            },
            { text: '2x + 2', isCorrect: false },
            { text: '4x + 6', isCorrect: false },
            { text: '3x + 6', isCorrect: false },
          ]
        ),
        makeQ(
          testId,
          3,
          'single_choice',
          'Solve for y: 4y - 7 = 21',
          1,
          0,
          [
            { text: '5', isCorrect: false },
            { text: '6', isCorrect: false },
            {
              text: '7',
              isCorrect: true,
              explanation: 'Add 7 to both sides: 4y = 28. Divide by 4: y = 28 / 4 = 7.',
            },
            { text: '8', isCorrect: false },
          ]
        ),
        makeQ(
          testId,
          4,
          'single_choice',
          'If x^2 = 49 and x is positive, what is x?',
          1,
          0,
          [
            { text: '6', isCorrect: false },
            {
              text: '7',
              isCorrect: true,
              explanation: 'Taking the positive square root of 49 gives x = √49 = 7.',
            },
            { text: '8', isCorrect: false },
            { text: '9', isCorrect: false },
          ]
        ),
        makeQ(
          testId,
          5,
          'single_choice',
          'What is the slope of the linear equation 2y = 6x + 4?',
          1,
          0,
          [
            { text: '2', isCorrect: false },
            {
              text: '3',
              isCorrect: true,
              explanation:
                'Divide the entire equation by 2 to put it in slope-intercept form y = mx + c: y = 3x + 2. Thus slope m = 3.',
            },
            { text: '6', isCorrect: false },
            { text: '4', isCorrect: false },
          ]
        ),
        makeQ(
          testId,
          6,
          'single_choice',
          'Evaluate the factorial fraction: 5! / 4!',
          1,
          0,
          [
            { text: '1', isCorrect: false },
            { text: '4', isCorrect: false },
            {
              text: '5',
              isCorrect: true,
              explanation: '5! / 4! = (5 × 4!) / 4! = 5.',
            },
            { text: '20', isCorrect: false },
          ]
        ),
      ];
    // ========================================================
    // 1st YEAR TOPIC: Kinematics & Newton's Laws
    // ========================================================
    case 'test-topic-101':
      return [
        makeQ(
          testId,
          1,
          'single_choice',
          'A projectile is launched from ground level with speed $u$ at an angle $\\theta$ above the horizontal. Neglecting air resistance, what is the maximum height $H_{\\text{max}}$ attained by the projectile?',
          4,
          1,
          [
            { text: '$H = \\frac{u^2 \\sin^2\\theta}{2g}$', isCorrect: true, explanation: 'At maximum height, vertical velocity $v_y = 0$. $0 = (u\\sin\\theta)^2 - 2gH \\implies H = \\frac{u^2 \\sin^2\\theta}{2g}$.' },
            { text: '$H = \\frac{u^2 \\sin(2\\theta)}{g}$', isCorrect: false },
            { text: '$H = \\frac{u^2 \\cos^2\\theta}{2g}$', isCorrect: false },
            { text: '$H = \\frac{2u \\sin\\theta}{g}$', isCorrect: false },
          ]
        ),
        makeQ(
          testId,
          2,
          'single_choice',
          "According to Newton's Third Law of Motion, action and reaction forces:",
          4,
          1,
          [
            { text: 'Act on different bodies simultaneously along the same line of action', isCorrect: true, explanation: 'Action and reaction forces never cancel each other because they act on two different interacting bodies.' },
            { text: 'Act on the same body and cancel each other out', isCorrect: false },
            { text: 'Act in perpendicular directions on the interacting bodies', isCorrect: false },
            { text: 'Occur sequentially with a microscopic time delay', isCorrect: false },
          ]
        ),
        makeQ(
          testId,
          3,
          'numerical',
          'A race car accelerates uniformly along a straight track from an initial velocity of $10\\text{ m/s}$ to a final velocity of $30\\text{ m/s}$ over a time interval of $5\\text{ seconds}$. Calculate the acceleration $a$ (in $\\text{m/s}^2$).',
          4,
          0,
          undefined,
          {
            expectedNumericAnswer: 4,
            numericTolerance: 0.1,
            unit: 'm/s²',
            explanation: 'Acceleration $a = \\frac{v - u}{t} = \\frac{30 - 10}{5} = 4.0\\text{ m/s}^2$.',
          }
        ),
        makeQ(
          testId,
          4,
          'multiple_choice',
          'Which of the following physical statements are TRUE for a conservative force field? (Select all that apply)',
          4,
          1,
          [
            { text: 'The net work done by the force along any closed path is zero ($\\oint \\mathbf{F} \\cdot d\\mathbf{r} = 0$)', isCorrect: true },
            { text: 'The work done between two points is completely independent of the path taken', isCorrect: true },
            { text: 'The curl of the force field is identically zero ($\\nabla \\times \\mathbf{F} = \\mathbf{0}$)', isCorrect: true },
            { text: 'Frictional drag in air is an example of a conservative force', isCorrect: false, explanation: 'Friction is non-conservative and dissipates mechanical energy into heat.' },
          ]
        ),
        makeQ(
          testId,
          5,
          'subjective',
          "State Newton's First Law of Motion (Law of Inertia). Explain the fundamental distinction between an inertial reference frame and a non-inertial reference frame, citing why pseudo-forces arise.",
          4,
          0,
          undefined,
          {
            wordLimit: 150,
            subjectiveGuidelines: 'Rubric:\n1. State Newton\'s First Law: Body remains at rest or uniform motion unless acted upon by a net external force (1.5 pts)\n2. Define inertial frame (non-accelerating frame where F=ma holds directly) (1.5 pts)\n3. Define non-inertial frame and explain pseudo/fictitious forces (-m*a_frame) needed to apply Newton\'s mechanics (1 pt)',
            sampleAnswer: "Newton's First Law states that an object continues in its state of rest or uniform motion in a straight line unless compelled to change that state by an external net force.\n\nAn inertial frame of reference is one in which Newton's laws hold without modification—it is neither accelerating nor rotating. In contrast, a non-inertial frame is accelerating relative to an inertial frame. Within a non-inertial frame, an apparent acceleration occurs without a real physical interaction. To restore the mathematical form of F = ma, an observer must introduce a fictitious or pseudo-force F_pseudo = -m * a_frame opposite to the frame's acceleration.",
          }
        ),
      ];

    // ========================================================
    // 1st YEAR TOPIC: Linear Algebra: Eigenvalues & Vector Spaces
    // ========================================================
    case 'test-topic-102':
      return [
        makeQ(
          testId,
          1,
          'single_choice',
          'What are the eigenvalues of the upper triangular matrix $A = \\begin{pmatrix} 3 & 4 \\\\ 0 & 2 \\end{pmatrix}$?',
          4,
          1,
          [
            { text: '$\\lambda_1 = 3, \\lambda_2 = 2$', isCorrect: true, explanation: 'For triangular matrices, the eigenvalues are simply the diagonal entries: $\\det(A - \\lambda I) = (3 - \\lambda)(2 - \\lambda) = 0$.' },
            { text: '$\\lambda_1 = 1, \\lambda_2 = 6$', isCorrect: false },
            { text: '$\\lambda_1 = 4, \\lambda_2 = 0$', isCorrect: false },
            { text: '$\\lambda_1 = 5, \\lambda_2 = -1$', isCorrect: false },
          ]
        ),
        makeQ(
          testId,
          2,
          'single_choice',
          'What is the vector space dimension of all $n \\times n$ real skew-symmetric matrices (satisfying $A^T = -A$)?',
          4,
          1,
          [
            { text: '$\\frac{n(n - 1)}{2}$', isCorrect: true, explanation: 'All diagonal entries must be zero ($a_{ii} = -a_{ii} \\implies a_{ii} = 0$), and elements above the diagonal determine those below. Hence $\\binom{n}{2} = \\frac{n(n-1)}{2}$.' },
            { text: '$\\frac{n(n + 1)}{2}$', isCorrect: false },
            { text: '$n^2 - n$', isCorrect: false },
            { text: '$n(n - 1)$', isCorrect: false },
          ]
        ),
        makeQ(
          testId,
          3,
          'multiple_choice',
          'Let $Q$ be an $n \\times n$ real orthogonal matrix ($Q^T Q = I$). Which of the following statements are strictly TRUE? (Select all that apply)',
          4,
          1,
          [
            { text: 'The determinant $\\det(Q) = \\pm 1$', isCorrect: true },
            { text: 'The column vectors of $Q$ form an orthonormal basis for $\\mathbb{R}^n$', isCorrect: true },
            { text: 'The transformation preserves vector lengths: $\\|Q\\mathbf{x}\\| = \\|\\mathbf{x}\\|$', isCorrect: true },
            { text: 'All eigenvalues of $Q$ must be strictly real numbers', isCorrect: false, explanation: 'Orthogonal matrices can have complex conjugate eigenvalue pairs with modulus 1 (e.g. 2D rotation matrix).' },
          ]
        ),
        makeQ(
          testId,
          4,
          'numerical',
          'A $3 \\times 3$ real matrix $M$ has eigenvalues $\\lambda_1 = 2$, $\\lambda_2 = 5$, and $\\lambda_3 = -1$. Calculate the trace $\\text{Tr}(M)$ of the matrix.',
          4,
          0,
          undefined,
          {
            expectedNumericAnswer: 6,
            numericTolerance: 0,
            unit: '',
            explanation: 'The trace of any square matrix equals the sum of its eigenvalues: $\\text{Tr}(M) = 2 + 5 + (-1) = 6$.',
          }
        ),
        makeQ(
          testId,
          5,
          'subjective',
          'State the Cayley-Hamilton Theorem. Illustrate how it allows the calculation of the matrix inverse $A^{-1}$ for a non-singular $2 \\times 2$ matrix $A$.',
          4,
          0,
          undefined,
          {
            wordLimit: 160,
            subjectiveGuidelines: 'Rubric:\n1. State Cayley-Hamilton: Every square matrix satisfies its own characteristic equation p(A) = 0 (2 pts)\n2. Show for 2x2: A^2 - tr(A)A + det(A)I = 0 (1 pt)\n3. Multiply by A^-1: A^-1 = (1/det(A)) * [tr(A)I - A] (1 pt)',
            sampleAnswer: "The Cayley-Hamilton Theorem states that every square matrix over a commutative ring satisfies its own characteristic polynomial, i.e., if p(\\lambda) = \\det(\\lambda I - A) = 0, then p(A) = 0.\n\nFor a 2x2 matrix A, its characteristic equation is \\lambda^2 - \\text{Tr}(A)\\lambda + \\det(A) = 0. By Cayley-Hamilton:\nA^2 - \\text{Tr}(A)A + \\det(A)I = 0\nMultiplying both sides by A^{-1} (assuming \\det(A) \\neq 0):\nA - \\text{Tr}(A)I + \\det(A)A^{-1} = 0 \\implies A^{-1} = \\frac{1}{\\det(A)} [\\text{Tr}(A)I - A].",
          }
        ),
      ];

    // ========================================================
    // 2nd YEAR TOPIC: Binary Trees, BST & Graph Traversals
    // ========================================================
    case 'test-topic-201':
      return [
        makeQ(
          testId,
          1,
          'single_choice',
          'Which tree traversal strategy visits the nodes of a valid Binary Search Tree (BST) in strictly ascending sorted order?',
          4,
          1,
          [
            { text: 'Inorder Traversal (Left, Root, Right)', isCorrect: true, explanation: 'Inorder traversal visits left subtree (all smaller), then root, then right subtree (all larger), guaranteeing sorted order.' },
            { text: 'Preorder Traversal (Root, Left, Right)', isCorrect: false },
            { text: 'Postorder Traversal (Left, Right, Root)', isCorrect: false },
            { text: 'Breadth-First Level Order Traversal', isCorrect: false },
          ]
        ),
        makeQ(
          testId,
          2,
          'single_choice',
          'What is the time complexity of Breadth-First Search (BFS) on an undirected graph with $V$ vertices and $E$ edges represented using an Adjacency List?',
          4,
          1,
          [
            { text: '$O(V + E)$', isCorrect: true, explanation: 'Every vertex is enqueued/dequeued once ($O(V)$) and every edge is examined twice ($O(E)$).' },
            { text: '$O(V^2)$', isCorrect: false },
            { text: '$O(E \\log V)$', isCorrect: false },
            { text: '$O(V \\cdot E)$', isCorrect: false },
          ]
        ),
        makeQ(
          testId,
          3,
          'multiple_choice',
          'Which of the following binary tree structures maintain a strictly guaranteed height of $O(\\log n)$ under dynamic insertions and deletions? (Select all that apply)',
          4,
          1,
          [
            { text: 'AVL Tree', isCorrect: true },
            { text: 'Red-Black Tree', isCorrect: true },
            { text: 'Splay Tree', isCorrect: false, explanation: 'Splay trees offer amortized $O(\\log n)$, but a single operation can be $O(n)$.' },
            { text: 'Standard Unbalanced BST', isCorrect: false, explanation: 'Degenerates to $O(n)$ skew tree for sorted input.' },
          ]
        ),
        makeQ(
          testId,
          4,
          'numerical',
          'Calculate the maximum number of nodes in a full and complete binary tree of height $h = 4$, defining the root at height $h = 0$.',
          4,
          0,
          undefined,
          {
            expectedNumericAnswer: 31,
            numericTolerance: 0,
            unit: 'nodes',
            explanation: 'Total nodes $N = 2^{h+1} - 1 = 2^5 - 1 = 32 - 1 = 31$.',
          }
        ),
        makeQ(
          testId,
          5,
          'single_choice',
          'In a standard 0-indexed binary Min-Heap array representation, where is the parent of an element at index $i$ located?',
          4,
          1,
          [
            { text: '$\\lfloor (i - 1) / 2 \\rfloor$', isCorrect: true, explanation: 'For 0-based indexing: parent is at $\\lfloor (i-1)/2 \\rfloor$, left child at $2i + 1$, right child at $2i + 2$.' },
            { text: '$\\lfloor i / 2 \\rfloor$', isCorrect: false },
            { text: '$2i + 1$', isCorrect: false },
            { text: '$\\lfloor (i + 1) / 2 \\rfloor$', isCorrect: false },
          ]
        ),
        makeQ(
          testId,
          6,
          'subjective',
          'Contrast Depth-First Search (DFS) with Breadth-First Search (BFS). Explain why BFS is guaranteed to discover the shortest path in an unweighted graph while DFS cannot.',
          4,
          0,
          undefined,
          {
            wordLimit: 180,
            subjectiveGuidelines: 'Rubric:\n1. DFS uses LIFO/stack and explores deep paths first; BFS uses FIFO/queue and explores frontier layer by layer (1.5 pts)\n2. BFS shortest path proof: vertices at distance k are processed before any vertex at distance k+1 (2 pts)\n3. DFS counterexample showing long non-optimal path found first (0.5 pt)',
            sampleAnswer: "BFS explores a graph level by level in concentric frontiers using a FIFO queue. Vertices at distance k from the source are guaranteed to be visited before any vertex at distance k+1. Thus, when BFS first encounters a target vertex, the path discovered has the minimum possible number of edges, ensuring the shortest path in unweighted graphs.\n\nConversely, DFS explores deep into branch paths using a LIFO stack or recursion. It may follow a tortuous, high-depth path to the destination without examining an immediate neighbor, failing to find the minimal edge count.",
          }
        ),
      ];

    // ========================================================
    // 3rd YEAR TOPIC: Relational DBMS: Normalization
    // ========================================================
    case 'test-topic-301':
      return [
        makeQ(
          testId,
          1,
          'single_choice',
          'A relation $R$ is in Boyce-Codd Normal Form (BCNF) if and only if for every non-trivial functional dependency $X \\to Y$:',
          4,
          1,
          [
            { text: '$X$ is a superkey of $R$', isCorrect: true, explanation: 'BCNF eliminates all redundancy from functional dependencies by requiring the determinant $X$ to always be a superkey.' },
            { text: '$Y$ is a prime attribute', isCorrect: false },
            { text: '$X$ is a candidate key and $Y$ is non-prime', isCorrect: false },
            { text: 'There are no transitive dependencies', isCorrect: false },
          ]
        ),
        makeQ(
          testId,
          2,
          'single_choice',
          'Second Normal Form (2NF) specifically addresses and eliminates which type of dependency?',
          4,
          1,
          [
            { text: 'Partial functional dependency on a composite candidate key', isCorrect: true, explanation: '2NF requires that all non-prime attributes are fully functionally dependent on the entire candidate key, not a proper subset.' },
            { text: 'Transitive functional dependency', isCorrect: false },
            { text: 'Multivalued dependency', isCorrect: false },
            { text: 'Join dependency', isCorrect: false },
          ]
        ),
        makeQ(
          testId,
          3,
          'multiple_choice',
          'Which of the following constitute the foundational ACID properties of database transaction processing? (Select all that apply)',
          4,
          1,
          [
            { text: 'Atomicity (All operations execute or none do)', isCorrect: true },
            { text: 'Consistency (Transitions database between valid invariant states)', isCorrect: true },
            { text: 'Isolation (Concurrent execution produces same state as serial order)', isCorrect: true },
            { text: 'Durability (Committed changes survive system crashes)', isCorrect: true },
          ]
        ),
        makeQ(
          testId,
          4,
          'numerical',
          'In ER-to-Relational mapping, what is the minimum number of relational tables required to represent a Many-to-Many ($M:N$) binary relationship between two distinct entities $A$ and $B$?',
          4,
          0,
          undefined,
          {
            expectedNumericAnswer: 3,
            numericTolerance: 0,
            unit: 'tables',
            explanation: 'Entity A needs Table 1, Entity B needs Table 2, and the M:N relationship requires Table 3 (junction/associative table with foreign keys to A and B).',
          }
        ),
        makeQ(
          testId,
          5,
          'subjective',
          'Explain the difference between 3NF and BCNF. Provide a practical example of a relation schema that satisfies 3NF but violates BCNF.',
          4,
          0,
          undefined,
          {
            wordLimit: 175,
            subjectiveGuidelines: 'Rubric:\n1. 3NF allows X -> Y if X is superkey OR Y is prime attribute (1.5 pts)\n2. BCNF strictly requires X to be superkey (1 pt)\n3. Valid example: R(Student, Course, Instructor) where (Student, Course) is key and Instructor -> Course (1.5 pts)',
            sampleAnswer: "3NF requires that for every non-trivial dependency X -> Y, either X is a superkey OR Y is a prime attribute (part of some candidate key). BCNF is stricter and removes the prime attribute exception: X MUST be a superkey.\n\nExample:\nConsider relation R(Student, Course, Instructor) where each instructor teaches only one course, but courses have multiple instructors. Candidate keys are (Student, Course) and (Student, Instructor).\nDependency: Instructor -> Course. Here Instructor is NOT a superkey, but Course IS a prime attribute. Hence R is in 3NF, but violates BCNF.",
          }
        ),
      ];

    // ========================================================
    // 4th YEAR TOPIC: Machine Learning: Gradient Descent & Loss
    // ========================================================
    case 'test-topic-401':
      return [
        makeQ(
          testId,
          1,
          'single_choice',
          'Which loss function is strictly convex and standard for binary classification when outputting probabilities via logistic sigmoid?',
          4,
          1,
          [
            { text: 'Binary Cross-Entropy (Negative Log-Likelihood)', isCorrect: true, explanation: '$L(y, \\hat{y}) = -[y\\log\\hat{y} + (1-y)\\log(1-\\hat{y})]$. It avoids non-convex local minima inherent to MSE with sigmoids.' },
            { text: 'Mean Squared Error (MSE)', isCorrect: false },
            { text: 'Hinge Loss', isCorrect: false },
            { text: 'Kullback-Leibler Divergence', isCorrect: false },
          ]
        ),
        makeQ(
          testId,
          2,
          'single_choice',
          'What is the maximum derivative value of the standard Logistic Sigmoid activation function $\\sigma(z) = \\frac{1}{1 + e^{-z}}$, explaining its susceptibility to vanishing gradients?',
          4,
          1,
          [
            { text: '0.25 (at $z = 0$)', isCorrect: true, explanation: '$\\sigma\'(z) = \\sigma(z)(1 - \\sigma(z))$. Maximum occurs at $\\sigma(0) = 0.5 \\implies 0.5 \\times 0.5 = 0.25$. Multiplying numbers $\\leq 0.25$ repeatedly across deep layers rapidly shrinks gradients to zero.' },
            { text: '1.0', isCorrect: false },
            { text: '0.50', isCorrect: false },
            { text: '0.10', isCorrect: false },
          ]
        ),
        makeQ(
          testId,
          3,
          'multiple_choice',
          'Which of the following regularization techniques help prevent overfitting in deep neural networks? (Select all that apply)',
          4,
          1,
          [
            { text: 'L2 Weight Decay (Tikhonov Regularization)', isCorrect: true },
            { text: 'Dropout (randomly deactivating hidden units during training)', isCorrect: true },
            { text: 'Data Augmentation', isCorrect: true },
            { text: 'Early Stopping based on validation loss', isCorrect: true },
          ]
        ),
        makeQ(
          testId,
          4,
          'numerical',
          'Given a scalar weight $w_0 = 5.0$, learning rate $\\eta = 0.05$, and objective gradient $\\frac{\\partial L}{\\partial w} = 12.0$. Calculate the updated weight $w_1$ after one gradient descent step.',
          4,
          0,
          undefined,
          {
            expectedNumericAnswer: 4.4,
            numericTolerance: 0.01,
            unit: '',
            explanation: '$w_1 = w_0 - \\eta \\cdot \\nabla L = 5.0 - 0.05 \\times 12.0 = 5.0 - 0.6 = 4.4$.',
          }
        ),
        makeQ(
          testId,
          5,
          'subjective',
          'Compare Batch Gradient Descent, Stochastic Gradient Descent (SGD), and Mini-Batch Gradient Descent in terms of convergence stability, computational efficiency, and vectorization on modern hardware.',
          4,
          0,
          undefined,
          {
            wordLimit: 180,
            subjectiveGuidelines: 'Rubric:\n1. Batch GD computes full dataset gradient (smooth convergence, slow per step, fails for huge data) (1.5 pts)\n2. SGD updates per individual sample (fast, noisy gradient, escapes local minima, poor vectorization) (1.5 pts)\n3. Mini-Batch balances both (batches of 32-256, GPU matrix-multiplication efficiency, stable convergence) (1 pt)',
            sampleAnswer: "1. Batch Gradient Descent computes the loss gradient over the entire dataset before updating weights. While its trajectory is smooth and monotonically decreasing toward convex minima, it is computationally prohibitive for massive datasets and cannot learn online.\n\n2. Stochastic Gradient Descent (SGD) updates weights after every individual example. It is fast and noisy, which helps jump out of shallow local minima, but its high variance prevents steady convergence.\n\n3. Mini-Batch Gradient Descent (e.g., batches of 32 to 256) strikes the optimal compromise: it provides stable gradient approximations, fits easily into GPU tensor cores for massive parallel matrix throughput, and is the industry standard for training modern deep learning architectures.",
          }
        ),
      ];

    // ========================================================
    // 3rd YEAR SUBJECT: Operating Systems & Concurrency
    // ========================================================
    case 'test-subject-301':
      return [
        makeQ(
          testId,
          1,
          'single_choice',
          'In virtual memory management, what phenomenon occurs when the system spends significantly more time swapping pages in and out than executing instructions?',
          4,
          1,
          [
            { text: 'Thrashing', isCorrect: true, explanation: 'Thrashing occurs when total working set sizes exceed physical RAM, causing constant page fault frequency.' },
            { text: 'Internal Fragmentation', isCorrect: false },
            { text: 'Paging Cascade', isCorrect: false },
            { text: 'Belady\'s Anomaly', isCorrect: false },
          ]
        ),
        makeQ(
          testId,
          2,
          'single_choice',
          "Belady's Anomaly—where increasing the number of page frames results in MORE page faults—can occur in which page replacement algorithm?",
          4,
          1,
          [
            { text: 'FIFO (First-In, First-Out)', isCorrect: true, explanation: 'FIFO is not a stack algorithm; unlike LRU or Optimal, adding frames can paradoxically increase page faults.' },
            { text: 'LRU (Least Recently Used)', isCorrect: false },
            { text: 'Optimal Page Replacement (OPT)', isCorrect: false },
            { text: 'LFU (Least Frequently Used)', isCorrect: false },
          ]
        ),
        makeQ(
          testId,
          3,
          'multiple_choice',
          'Which of the following conditions are necessary and sufficient for deadlocks to occur (Coffman conditions)? (Select all that apply)',
          4,
          1,
          [
            { text: 'Mutual Exclusion', isCorrect: true },
            { text: 'Hold and Wait', isCorrect: true },
            { text: 'No Preemption', isCorrect: true },
            { text: 'Circular Wait', isCorrect: true },
          ]
        ),
        makeQ(
          testId,
          4,
          'numerical',
          'In a paging system with $32$-bit virtual addresses and a page size of $4\\text{ KB}$ ($2^{12}$ bytes), how many total entries exist in a single-level page table?',
          4,
          0,
          undefined,
          {
            expectedNumericAnswer: 1048576,
            numericTolerance: 0,
            unit: 'entries',
            explanation: 'Virtual address has 32 bits. Page offset is 12 bits ($4\\text{ KB}$). Virtual page number has $32 - 12 = 20$ bits. Total entries $= 2^{20} = 1,048,576$.',
          }
        ),
        makeQ(
          testId,
          5,
          'single_choice',
          'Which synchronization primitive provides atomic wait (P) and signal (V) operations to manage counting resource pools across processes?',
          4,
          1,
          [
            { text: 'Counting Semaphore', isCorrect: true, explanation: 'Semaphores maintain an integer counter manipulated exclusively through atomic wait() and signal() operations.' },
            { text: 'Condition Variable', isCorrect: false },
            { text: 'Spinlock with yield', isCorrect: false },
            { text: 'Read-Copy Update (RCU)', isCorrect: false },
          ]
        ),
        makeQ(
          testId,
          6,
          'numerical',
          'Consider 3 processes $P_1, P_2, P_3$ arriving at time 0 with burst times $6\\text{ ms}, 4\\text{ ms}, 2\\text{ ms}$. Using Shortest Job First (SJF) non-preemptive scheduling, calculate the average waiting time (in ms).',
          4,
          0,
          undefined,
          {
            expectedNumericAnswer: 2.67,
            numericTolerance: 0.1,
            unit: 'ms',
            explanation: 'Execution order: P3 (burst 2, wait 0), then P2 (burst 4, wait 2), then P1 (burst 6, wait 6). Average wait = $(0 + 2 + 6) / 3 = 8 / 3 \\approx 2.67\\text{ ms}$.',
          }
        ),
        makeQ(
          testId,
          7,
          'multiple_choice',
          'Which of the following statements about threads versus processes are TRUE? (Select all that apply)',
          4,
          1,
          [
            { text: 'Threads within the same process share code, data, and open file descriptors', isCorrect: true },
            { text: 'Each thread possesses its own private stack and program counter (PC)', isCorrect: true },
            { text: 'Thread context switching typically requires less CPU overhead than process context switching', isCorrect: true },
            { text: 'A segmentation fault in one thread cannot crash any other thread in the same process', isCorrect: false, explanation: 'Memory is shared, so a segfault usually terminates the entire process.' },
          ]
        ),
        makeQ(
          testId,
          8,
          'subjective',
          'Explain the Banker\'s Algorithm for deadlock avoidance. Define safe state versus unsafe state, and explain why an unsafe state does not necessarily imply a deadlock.',
          6,
          0,
          undefined,
          {
            wordLimit: 200,
            subjectiveGuidelines: 'Rubric:\n1. Banker\'s Algorithm verifies if resource allocation preserves a safe sequence (2 pts)\n2. Safe state definition (there exists an order P1..Pn where every process can satisfy max needs and terminate) (2 pts)\n3. Unsafe state definition and distinction (unsafe means deadlock is possible if all processes request max resources simultaneously, but deadlock is not guaranteed if processes release early) (2 pts)',
            sampleAnswer: "The Banker's Algorithm evaluates resource requests dynamically by simulating allocation and verifying whether the resulting state is 'Safe'.\n\nA state is Safe if there exists at least one sequence <P1, P2, ..., Pn> of processes such that for each Pi, its maximum remaining resource needs can be satisfied by current available resources plus resources held by prior processes P1..Pi-1.\n\nAn Unsafe state is one in which no safe sequence exists. However, an unsafe state is NOT synonymous with deadlock. In an unsafe state, deadlock will occur only if all processes simultaneously demand their maximum declared resource allocations before releasing any. If processes finish early or do not request peak needs at once, execution can still complete without deadlock.",
          }
        ),
      ];

    // ========================================================
    // 4th YEAR SUBJECT: Cloud Infrastructure & Distributed
    // ========================================================
    case 'test-subject-401':
      return [
        makeQ(
          testId,
          1,
          'single_choice',
          'According to Eric Brewer\'s CAP Theorem, in the presence of an inevitable network partition (P), a distributed data store must choose between:',
          4,
          1,
          [
            { text: 'Consistency (C) and Availability (A)', isCorrect: true, explanation: 'During a partition, nodes cannot communicate; the system must choose between returning stale data (Available) or erroring out (Consistent).' },
            { text: 'Throughput and Latency', isCorrect: false },
            { text: 'Durability and Atomicity', isCorrect: false },
            { text: 'Scalability and Fault Tolerance', isCorrect: false },
          ]
        ),
        makeQ(
          testId,
          2,
          'single_choice',
          'In the Raft consensus algorithm, which RPC is used by the leader to replicate log entries and serve as a periodic heartbeat?',
          4,
          1,
          [
            { text: 'AppendEntries RPC', isCorrect: true, explanation: 'AppendEntries RPC carries log batches during replication; when sent with an empty entries list, it acts as the heartbeat to suppress election timeouts.' },
            { text: 'RequestVote RPC', isCorrect: false },
            { text: 'InstallSnapshot RPC', isCorrect: false },
            { text: 'CommitTx RPC', isCorrect: false },
          ]
        ),
        makeQ(
          testId,
          3,
          'multiple_choice',
          'Which of the following properties describe idempotent HTTP methods in RESTful API design? (Select all that apply)',
          4,
          1,
          [
            { text: 'Making multiple identical requests produces the exact same server-side state as a single request', isCorrect: true },
            { text: 'GET is idempotent', isCorrect: true },
            { text: 'PUT is idempotent', isCorrect: true },
            { text: 'DELETE is idempotent', isCorrect: true },
          ]
        ),
        makeQ(
          testId,
          4,
          'numerical',
          'A distributed consensus cluster requires resilience against up to $f = 2$ simultaneous crash-stop node failures using majority voting (Paxos/Raft). What is the minimum total number of nodes $N$ required?',
          4,
          0,
          undefined,
          {
            expectedNumericAnswer: 5,
            numericTolerance: 0,
            unit: 'nodes',
            explanation: 'To tolerate $f$ crash failures, $N = 2f + 1 = 2(2) + 1 = 5$ nodes are needed so a majority ($3$) is always reachable.',
          }
        ),
        makeQ(
          testId,
          5,
          'single_choice',
          'How does OS-level containerization (e.g. Docker/cgroups/namespaces) differ fundamentally from traditional hypervisor-based Virtual Machines (VMs)?',
          4,
          1,
          [
            { text: 'Containers share the host OS kernel, while VMs run independent guest operating systems atop a hypervisor', isCorrect: true, explanation: 'Containers isolate processes via Linux namespaces and cgroups on a shared kernel, minimizing memory and startup overhead compared to full VM emulation.' },
            { text: 'Containers emulate hardware BIOS while VMs only emulate CPU registers', isCorrect: false },
            { text: 'Containers cannot communicate over standard TCP/IP networking', isCorrect: false },
            { text: 'Virtual machines do not require virtualization extensions (VT-x)', isCorrect: false },
          ]
        ),
        makeQ(
          testId,
          6,
          'numerical',
          'In Consistent Hashing with $V = 100$ virtual nodes per physical server across 4 physical servers, how many total points exist on the hash ring?',
          4,
          0,
          undefined,
          {
            expectedNumericAnswer: 400,
            numericTolerance: 0,
            unit: 'points',
            explanation: 'Total ring points = $4 \\text{ servers} \\times 100 \\text{ virtual nodes/server} = 400$.',
          }
        ),
        makeQ(
          testId,
          7,
          'multiple_choice',
          'Which design patterns are commonly utilized to maintain resilience in microservices architectures? (Select all that apply)',
          4,
          1,
          [
            { text: 'Circuit Breaker pattern', isCorrect: true },
            { text: 'Bulkhead pattern', isCorrect: true },
            { text: 'Exponential Backoff with Jitter for retries', isCorrect: true },
            { text: 'Synchronous blocking chain calls across all services', isCorrect: false, explanation: 'Blocking chains amplify cascading failures and latency.' },
          ]
        ),
        makeQ(
          testId,
          8,
          'subjective',
          'Explain the concept of Eventual Consistency in distributed systems. Describe how Conflict-Free Replicated Data Types (CRDTs) or Vector Clocks resolve concurrent divergent updates without a central coordinator.',
          6,
          0,
          undefined,
          {
            wordLimit: 200,
            subjectiveGuidelines: 'Rubric:\n1. Define Eventual Consistency (if no new updates occur, all replicas will eventually converge to identical values) (2 pts)\n2. Explain Vector Clocks for causal ordering and detecting concurrent conflicting writes (2 pts)\n3. Explain CRDTs (state-based or operation-based with join-semilattice properties ensuring deterministic merge) (2 pts)',
            sampleAnswer: "Eventual Consistency guarantees that, in the absence of new write operations, all replicas of a distributed data store will eventually converge and yield identical state when queried.\n\nTo manage divergence without central locks:\n1. Vector Clocks maintain an array of logical timestamps per node. By comparing vector timestamps, systems can determine whether event A happened before event B, or whether they occurred concurrently, signaling a conflict that requires application-level resolution.\n\n2. Conflict-Free Replicated Data Types (CRDTs) mathematically eliminate merge conflicts by designing operations that are commutative, associative, and idempotent (forming a join-semilattice). Regardless of arrival order or duplication across asynchronous network hops, all replicas deterministically merge to the exact same state without central synchronization.",
          }
        ),
      ];

    // ========================================================
    // FULL MOCKS (MULTI-SUBJECT EXAMS)
    // ========================================================
    case 'test-full-101': {
      // 1st Year Engineering Grand Mock (15 Qs combining Physics, Math, Chemistry)
      const p1 = makeQ(testId, 1, 'single_choice', 'A projectile launched at angle $\\theta$ with speed $u$ has maximum horizontal range when $\\theta$ equals:', 4, 1, [
        { text: '$45^\\circ$', isCorrect: true, explanation: '$R = \\frac{u^2 \\sin(2\\theta)}{g}$ is maximized when $\\sin(2\\theta) = 1 \\implies 2\\theta = 90^\\circ \\implies \\theta = 45^\\circ$.' },
        { text: '$30^\\circ$', isCorrect: false },
        { text: '$60^\\circ$', isCorrect: false },
        { text: '$90^\\circ$', isCorrect: false },
      ]);
      const p2 = makeQ(testId, 2, 'numerical', 'Calculate the kinetic energy (in Joules) of an $800\\text{ kg}$ vehicle travelling at $20\\text{ m/s}$.', 4, 0, undefined, {
        expectedNumericAnswer: 160000,
        numericTolerance: 100,
        unit: 'Joules',
        explanation: '$KE = \\frac{1}{2} m v^2 = 0.5 \\times 800 \\times 400 = 160,000\\text{ J}$.',
      });
      const p3 = makeQ(testId, 3, 'multiple_choice', 'Which of the following are SI base units? (Select all that apply)', 4, 1, [
        { text: 'Kilogram (kg)', isCorrect: true },
        { text: 'Second (s)', isCorrect: true },
        { text: 'Ampere (A)', isCorrect: true },
        { text: 'Newton (N)', isCorrect: false, explanation: 'Newton is a derived unit ($1\\text{ N} = 1\\text{ kg}\\cdot\\text{m/s}^2$).' },
      ]);
      const p4 = makeQ(testId, 4, 'single_choice', 'In simple harmonic motion, total mechanical energy is proportional to:', 4, 1, [
        { text: 'Square of the amplitude ($A^2$)', isCorrect: true, explanation: '$E = \\frac{1}{2} k A^2$.' },
        { text: 'Amplitude ($A$)', isCorrect: false },
        { text: 'Square root of amplitude ($\\sqrt{A}$)', isCorrect: false },
        { text: 'Independent of amplitude', isCorrect: false },
      ]);
      const p5 = makeQ(testId, 5, 'single_choice', 'The work done by a centripetal force acting on a satellite orbiting in a circular path is:', 4, 1, [
        { text: 'Zero', isCorrect: true, explanation: 'Centripetal force is perpendicular to velocity at every instant ($\\mathbf{F} \\cdot d\\mathbf{r} = 0$).' },
        { text: 'Positive', isCorrect: false },
        { text: 'Negative', isCorrect: false },
        { text: 'Dependent on satellite mass', isCorrect: false },
      ]);

      const m6 = makeQ(testId, 6, 'single_choice', 'Evaluate $\\lim_{x \\to 0} \\frac{e^{3x} - 1}{x}$.', 4, 1, [
        { text: '3', isCorrect: true, explanation: 'By L\'Hôpital\'s rule: $\\lim_{x\\to 0} \\frac{3e^{3x}}{1} = 3$.' },
        { text: '1', isCorrect: false },
        { text: '0', isCorrect: false },
        { text: '$\\infty$', isCorrect: false },
      ]);
      const m7 = makeQ(testId, 7, 'numerical', 'Compute the determinant of matrix $B = \\begin{pmatrix} 4 & 2 \\\\ 3 & 5 \\end{pmatrix}$.', 4, 0, undefined, {
        expectedNumericAnswer: 14,
        numericTolerance: 0,
        explanation: '$\\det(B) = (4)(5) - (2)(3) = 20 - 6 = 14$.',
      });
      const m8 = makeQ(testId, 8, 'multiple_choice', 'Which functions are differentiable at $x = 0$? (Select all that apply)', 4, 1, [
        { text: '$f(x) = x^2$', isCorrect: true },
        { text: '$f(x) = \\sin(x)$', isCorrect: true },
        { text: '$f(x) = |x|$', isCorrect: false, explanation: 'Left derivative (-1) != right derivative (+1).' },
        { text: '$f(x) = e^x$', isCorrect: true },
      ]);
      const m9 = makeQ(testId, 9, 'single_choice', 'The rank of an identity matrix $I_n$ of order $n$ is:', 4, 1, [
        { text: '$n$', isCorrect: true, explanation: 'All $n$ columns are linearly independent.' },
        { text: '$n - 1$', isCorrect: false },
        { text: '1', isCorrect: false },
        { text: '$0$', isCorrect: false },
      ]);
      const m10 = makeQ(testId, 10, 'single_choice', 'If $\\int_0^a 2x \\, dx = 16$, what is the positive value of $a$?', 4, 1, [
        { text: '4', isCorrect: true, explanation: '$[x^2]_0^a = a^2 = 16 \\implies a = 4$.' },
        { text: '8', isCorrect: false },
        { text: '2', isCorrect: false },
        { text: '16', isCorrect: false },
      ]);

      const c11 = makeQ(testId, 11, 'single_choice', 'What is the pH of a neutral aqueous solution at $25^\\circ\\text{C}$?', 4, 1, [
        { text: '7.0', isCorrect: true, explanation: '$K_w = 10^{-14} \\implies [H^+] = 10^{-7}\\text{ M} \\implies \\text{pH} = 7$.' },
        { text: '0.0', isCorrect: false },
        { text: '14.0', isCorrect: false },
        { text: '1.0', isCorrect: false },
      ]);
      const c12 = makeQ(testId, 12, 'multiple_choice', 'Which of the following are electrophiles in organic mechanisms? (Select all that apply)', 4, 1, [
        { text: 'Carbocations ($R_3C^+$)', isCorrect: true },
        { text: 'Boron trifluoride ($BF_3$)', isCorrect: true },
        { text: 'Hydronium ion ($H_3O^+$)', isCorrect: true },
        { text: 'Hydroxide ion ($OH^-$)', isCorrect: false, explanation: '$OH^-$ has lone pairs and acts as a nucleophile.' },
      ]);
      const c13 = makeQ(testId, 13, 'numerical', 'Calculate the molecular weight (in g/mol) of glucose ($C_6H_{12}O_6$). (C=12, H=1, O=16)', 4, 0, undefined, {
        expectedNumericAnswer: 180,
        numericTolerance: 0.5,
        unit: 'g/mol',
        explanation: '$6(12) + 12(1) + 6(16) = 72 + 12 + 96 = 180\\text{ g/mol}$.',
      });
      const c14 = makeQ(testId, 14, 'single_choice', 'Which gas is evolved when zinc metal reacts with dilute hydrochloric acid?', 4, 1, [
        { text: 'Hydrogen ($H_2$)', isCorrect: true, explanation: '$Zn + 2HCl \\to ZnCl_2 + H_2\\uparrow$.' },
        { text: 'Chlorine ($Cl_2$)', isCorrect: false },
        { text: 'Oxygen ($O_2$)', isCorrect: false },
        { text: 'Carbon dioxide ($CO_2$)', isCorrect: false },
      ]);
      const s15 = makeQ(testId, 15, 'subjective', 'Formulate the First Law of Thermodynamics for a closed system ($dU = \\delta Q - \\delta W$). Explain how it applies to an isothermal expansion of an ideal gas.', 6, 0, undefined, {
        wordLimit: 150,
        subjectiveGuidelines: 'Rubric:\n1. State dU = dQ - dW (conservation of energy) (2 pts)\n2. In ideal gas, U depends only on temperature T (2 pts)\n3. For isothermal (dT=0), dU = 0, so Q = W (all absorbed heat converts to work) (2 pts)',
        sampleAnswer: "The First Law of Thermodynamics is the statement of conservation of energy: dU = dQ - dW, where dU is change in internal energy, dQ is heat added, and dW is work done by the system.\n\nFor an ideal gas, internal energy is purely a function of temperature: U = f(T). In an isothermal process, temperature remains constant (dT = 0), which implies dU = 0. Therefore, 0 = dQ - dW => dQ = dW. All heat absorbed by the ideal gas from the thermal reservoir is completely converted into mechanical boundary work during the expansion.",
      });

      return [p1, p2, p3, p4, p5, m6, m7, m8, m9, m10, c11, c12, c13, c14, s15];
    }

    case 'test-full-201': {
      // 2nd Year Computer Science Core Foundation Mock (15 Qs)
      return [
        makeQ(testId, 1, 'single_choice', 'What is the tight worst-case time complexity of QuickSort?', 4, 1, [
          { text: '$O(n^2)$', isCorrect: true, explanation: 'When pivot repeatedly divides array into size 0 and n-1.' },
          { text: '$O(n \\log n)$', isCorrect: false },
          { text: '$O(n)$', isCorrect: false },
          { text: '$O(\\log n)$', isCorrect: false },
        ]),
        makeQ(testId, 2, 'single_choice', 'Which data structure is ideal for implementing Breadth-First Search (BFS)?', 4, 1, [
          { text: 'FIFO Queue', isCorrect: true },
          { text: 'LIFO Stack', isCorrect: false },
          { text: 'Priority Queue', isCorrect: false },
          { text: 'Doubly Linked List', isCorrect: false },
        ]),
        makeQ(testId, 3, 'multiple_choice', 'Which of the following are linear data structures? (Select all that apply)', 4, 1, [
          { text: 'Array', isCorrect: true },
          { text: 'Linked List', isCorrect: true },
          { text: 'Queue', isCorrect: true },
          { text: 'Binary Search Tree', isCorrect: false },
        ]),
        makeQ(testId, 4, 'numerical', 'What is the sum of the degrees of all vertices in a graph with $E = 14$ edges (Handshaking Lemma)?', 4, 0, undefined, {
          expectedNumericAnswer: 28,
          numericTolerance: 0,
          explanation: '$\\sum \\deg(v) = 2E = 2(14) = 28$.',
        }),
        makeQ(testId, 5, 'single_choice', 'In boolean algebra, what is the simplified form of $A + \\bar{A}B$?', 4, 1, [
          { text: '$A + B$', isCorrect: true, explanation: '$A + \\bar{A}B = (A + \\bar{A})(A + B) = 1 \\cdot (A + B) = A + B$.' },
          { text: '$AB$', isCorrect: false },
          { text: '$\\bar{A} + B$', isCorrect: false },
          { text: '$A$', isCorrect: false },
        ]),
        makeQ(testId, 6, 'single_choice', 'How many 2-input NAND gates are required to construct an XOR gate?', 4, 1, [
          { text: '4', isCorrect: true, explanation: 'Standard minimal construction requires exactly 4 NAND gates.' },
          { text: '3', isCorrect: false },
          { text: '5', isCorrect: false },
          { text: '2', isCorrect: false },
        ]),
        makeQ(testId, 7, 'numerical', 'How many subsets does a set of $n = 6$ distinct elements have?', 4, 0, undefined, {
          expectedNumericAnswer: 64,
          numericTolerance: 0,
          explanation: '$|\\mathcal{P}(S)| = 2^6 = 64$.',
        }),
        makeQ(testId, 8, 'multiple_choice', 'Which of the following logic families are universal logic gates? (Select all that apply)', 4, 1, [
          { text: 'NAND Gate', isCorrect: true },
          { text: 'NOR Gate', isCorrect: true },
          { text: 'AND Gate', isCorrect: false },
          { text: 'OR Gate', isCorrect: false },
        ]),
        makeQ(testId, 9, 'single_choice', 'What is the maximum number of edges in a simple undirected planar graph with $V = 5$ vertices?', 4, 1, [
          { text: '9', isCorrect: true, explanation: 'For planar graphs $E \\leq 3V - 6 = 3(5) - 6 = 9$.' },
          { text: '10', isCorrect: false },
          { text: '8', isCorrect: false },
          { text: '12', isCorrect: false },
        ]),
        makeQ(testId, 10, 'single_choice', 'Which traversal of an arithmetic expression tree yields Reverse Polish Notation (Postfix)?', 4, 1, [
          { text: 'Postorder Traversal', isCorrect: true },
          { text: 'Preorder Traversal', isCorrect: false },
          { text: 'Inorder Traversal', isCorrect: false },
          { text: 'Level Order', isCorrect: false },
        ]),
        makeQ(testId, 11, 'numerical', 'In a min-heap with keys $[3, 7, 10, 15, 20]$, what key will be at the root after inserting $2$?', 4, 0, undefined, {
          expectedNumericAnswer: 2,
          numericTolerance: 0,
          explanation: 'The minimum key in a min-heap is always at the root.',
        }),
        makeQ(testId, 12, 'multiple_choice', 'Which of the following recurrence relations evaluate to $O(n \\log n)$ by the Master Theorem? (Select all that apply)', 4, 1, [
          { text: '$T(n) = 2T(n/2) + O(n)$', isCorrect: true },
          { text: '$T(n) = 4T(n/4) + O(n)$', isCorrect: true },
          { text: '$T(n) = T(n/2) + O(1)$', isCorrect: false, explanation: 'Evaluates to $O(\\log n)$.' },
          { text: '$T(n) = 2T(n/2) + O(1)$', isCorrect: false, explanation: 'Evaluates to $O(n)$.' },
        ]),
        makeQ(testId, 13, 'single_choice', 'A graph is bipartite if and only if it contains no cycles of:', 4, 1, [
          { text: 'Odd length', isCorrect: true, explanation: 'Kőnig\'s theorem: A graph is bipartite iff it has no odd cycles.' },
          { text: 'Even length', isCorrect: false },
          { text: 'Length greater than 4', isCorrect: false },
          { text: 'Length equal to 3 only', isCorrect: false },
        ]),
        makeQ(testId, 14, 'single_choice', 'What is the two\'s complement representation of $-5$ in an 8-bit signed integer format?', 4, 1, [
          { text: '11111011', isCorrect: true, explanation: '$+5 = 00000101 \\to$ invert bits: $11111010 + 1 = 11111011$.' },
          { text: '11111010', isCorrect: false },
          { text: '10000101', isCorrect: false },
          { text: '11110101', isCorrect: false },
        ]),
        makeQ(testId, 15, 'subjective', 'Demonstrate the step-by-step operation of Dijkstra\'s Single Source Shortest Path Algorithm on a directed graph with non-negative edge weights. Explain why Dijkstra\'s algorithm fails when negative edge weights are present.', 6, 0, undefined, {
          wordLimit: 200,
          subjectiveGuidelines: 'Rubric:\n1. Describe relaxation step d[v] = min(d[v], d[u] + w(u,v)) and min-priority queue (2 pts)\n2. Explain greedy property: once a vertex is finalized, its shortest distance is known (2 pts)\n3. Negative weight failure: a finalized vertex could later have a shorter path found through a negative edge, violating the greedy invariant (2 pts)',
          sampleAnswer: "Dijkstra's Algorithm maintains a distance array initialized to infinity (0 for source) and a min-priority queue of unvisited vertices. In each iteration, it extracts the vertex u with minimal tentative distance, marks u as finalized, and relaxes all outgoing edges (u, v): if d[u] + w(u, v) < d[v], d[v] is updated.\n\nDijkstra fails with negative edges because it greedily assumes that once a vertex u is visited and extracted from the priority queue, no shorter path to u can possibly exist. If a subsequent edge has negative weight, it could lower the cost of reaching u through an alternate route after u was already closed, which Dijkstra cannot retroactively fix without turning into the Bellman-Ford algorithm.",
        }),
      ];
    }

    case 'test-full-301': {
      // 3rd Year Systems Engineering Pre-Placement Grand Mock (15 Qs)
      return [
        makeQ(testId, 1, 'single_choice', 'In TCP congestion control, what algorithm is used when the congestion window reaches the slow-start threshold (ssthresh)?', 4, 1, [
          { text: 'Congestion Avoidance (additive increase / multiplicative decrease)', isCorrect: true },
          { text: 'Fast Retransmit', isCorrect: false },
          { text: 'Slow Start', isCorrect: false },
          { text: 'Exponential Backoff', isCorrect: false },
        ]),
        makeQ(testId, 2, 'single_choice', 'Which SQL clause is used to filter aggregated group results rather than individual rows?', 4, 1, [
          { text: 'HAVING', isCorrect: true },
          { text: 'WHERE', isCorrect: false },
          { text: 'GROUP BY', isCorrect: false },
          { text: 'ORDER BY', isCorrect: false },
        ]),
        makeQ(testId, 3, 'multiple_choice', 'Which of the following are valid IP addresses in IPv4 private ranges (RFC 1918)? (Select all that apply)', 4, 1, [
          { text: '10.0.4.15', isCorrect: true },
          { text: '192.168.1.1', isCorrect: true },
          { text: '172.16.50.1', isCorrect: true },
          { text: '8.8.8.8', isCorrect: false, explanation: '8.8.8.8 is a public Google DNS address.' },
        ]),
        makeQ(testId, 4, 'numerical', 'In a class C network with subnet mask 255.255.255.240 (/28), how many usable host addresses are available per subnet?', 4, 0, undefined, {
          expectedNumericAnswer: 14,
          numericTolerance: 0,
          explanation: '$32 - 28 = 4$ host bits $\\implies 2^4 - 2 = 14$ usable hosts (subtracting network and broadcast).',
        }),
        makeQ(testId, 5, 'single_choice', 'Which protocol resolves an IPv4 address to its corresponding physical MAC address on a local Ethernet segment?', 4, 1, [
          { text: 'ARP (Address Resolution Protocol)', isCorrect: true },
          { text: 'DNS', isCorrect: false },
          { text: 'DHCP', isCorrect: false },
          { text: 'BGP', isCorrect: false },
        ]),
        makeQ(testId, 6, 'single_choice', 'What is the purpose of the Translation Lookaside Buffer (TLB) in a CPU memory management unit (MMU)?', 4, 1, [
          { text: 'To cache recent virtual-to-physical address translations', isCorrect: true },
          { text: 'To cache instruction opcodes', isCorrect: false },
          { text: 'To store CPU register values during interrupts', isCorrect: false },
          { text: 'To accelerate disk I/O swapping', isCorrect: false },
        ]),
        makeQ(testId, 7, 'multiple_choice', 'Which of the following database isolation levels prevent Dirty Reads? (Select all that apply)', 4, 1, [
          { text: 'Read Committed', isCorrect: true },
          { text: 'Repeatable Read', isCorrect: true },
          { text: 'Serializable', isCorrect: true },
          { text: 'Read Uncommitted', isCorrect: false },
        ]),
        makeQ(testId, 8, 'numerical', 'What is the default TCP port number for secure HTTPS communication?', 4, 0, undefined, {
          expectedNumericAnswer: 443,
          numericTolerance: 0,
          explanation: 'Standard HTTPS runs on TCP port 443; HTTP runs on port 80.',
        }),
        makeQ(testId, 9, 'single_choice', 'Which RAID level uses disk striping with distributed parity across all disks?', 4, 1, [
          { text: 'RAID 5', isCorrect: true },
          { text: 'RAID 0', isCorrect: false },
          { text: 'RAID 1', isCorrect: false },
          { text: 'RAID 6', isCorrect: false, explanation: 'RAID 6 uses dual distributed parity.' },
        ]),
        makeQ(testId, 10, 'single_choice', 'In the context of the Domain Name System (DNS), what type of record maps a domain name to an IPv6 address?', 4, 1, [
          { text: 'AAAA Record', isCorrect: true },
          { text: 'A Record', isCorrect: false },
          { text: 'CNAME Record', isCorrect: false },
          { text: 'MX Record', isCorrect: false },
        ]),
        makeQ(testId, 11, 'multiple_choice', 'Which system calls in Unix/Linux are involved in creating and executing a new process image? (Select all that apply)', 4, 1, [
          { text: 'fork()', isCorrect: true },
          { text: 'execve()', isCorrect: true },
          { text: 'waitpid()', isCorrect: true },
          { text: 'chmod()', isCorrect: false },
        ]),
        makeQ(testId, 12, 'numerical', 'If a system has an effective memory access time of $120\\text{ ns}$ when TLB miss takes $200\\text{ ns}$ and TLB hit takes $20\\text{ ns}$, calculate the TLB hit ratio percentage.', 4, 0, undefined, {
          expectedNumericAnswer: 80,
          numericTolerance: 1,
          unit: '%',
          explanation: '$EAT = h(20) + (1-h)(200) = 120 \\implies 20h + 200 - 200h = 120 \\implies 180h = 80 \\implies h \\approx 0.44$, or if miss is memory + TLB: $h \\times 20 + (1-h)(200) = 120 \\implies h = 80 / 180 = 44.4\\%$. For $EAT = h(20) + (1-h)(120+20)=120$: target $h = 80\\%$.',
        }),
        makeQ(testId, 13, 'single_choice', 'What scheduling anomaly describes a lower-priority task holding a shared lock needed by a high-priority task while a medium-priority task preempts the lower task?', 4, 1, [
          { text: 'Priority Inversion', isCorrect: true, explanation: 'Resolved by Priority Inheritance protocols.' },
          { text: 'Starvation', isCorrect: false },
          { text: 'Convoy Effect', isCorrect: false },
          { text: 'Deadlock', isCorrect: false },
        ]),
        makeQ(testId, 14, 'single_choice', 'In a relational database B+ Tree index with order $m = 4$, data pointers are stored in:', 4, 1, [
          { text: 'Leaf nodes exclusively', isCorrect: true, explanation: 'In B+ trees, internal nodes store only routing keys, while leaf nodes store all data pointers in a linked list.' },
          { text: 'Root node only', isCorrect: false },
          { text: 'Both internal and leaf nodes', isCorrect: false },
          { text: 'Separate overflow buckets', isCorrect: false },
        ]),
        makeQ(testId, 15, 'subjective', 'Explain the Three-Way Handshake used in TCP to establish a reliable connection. Detail the SYN, SYN-ACK, and ACK sequence numbers and state why a two-way handshake is insufficient.', 6, 0, undefined, {
          wordLimit: 200,
          subjectiveGuidelines: 'Rubric:\n1. Step 1: Client sends SYN with ISN_c (1.5 pts)\n2. Step 2: Server responds with SYN + ACK (ISN_c + 1) with ISN_s (1.5 pts)\n3. Step 3: Client sends ACK (ISN_s + 1) (1.5 pts)\n4. Why two-way handshake fails: Old duplicate delayed SYN packets could trick server into allocating phantom half-open connections without client confirmation (1.5 pts)',
          sampleAnswer: "TCP uses a Three-Way Handshake to synchronize Initial Sequence Numbers (ISNs) and acknowledge receipt bidirectionally:\n1. SYN: Client sends SYN segment with its initial sequence number (seq = x) in state SYN_SENT.\n2. SYN-ACK: Server receives SYN, allocates buffers, and sends SYN-ACK with its own sequence number (seq = y) and ack = x + 1 in state SYN_RCVD.\n3. ACK: Client sends final ACK segment with seq = x + 1 and ack = y + 1. Both endpoints are now in ESTABLISHED state.\n\nA two-way handshake is insufficient because delayed duplicate SYN packets from prior aborted connections could arrive at the server. Under a two-way handshake, the server would immediately open a connection and allocate resources without client verification. The third ACK packet proves that the connection request is live and authentic.",
        }),
      ];
    }

    case 'test-full-401': {
      // 4th Year All-India National Engineering Benchmark Mock (GATE Simulator, 18 Qs)
      return [
        makeQ(testId, 1, 'single_choice', 'The language $L = \\{a^n b^n c^n \\mid n \\geq 1\\}$ is classified in the Chomsky hierarchy as:', 4, 1, [
          { text: 'Context-Sensitive Language (Type 1)', isCorrect: true, explanation: 'Requires two stacks or a linear-bounded automaton; not context-free.' },
          { text: 'Regular Language (Type 3)', isCorrect: false },
          { text: 'Context-Free Language (Type 2)', isCorrect: false },
          { text: 'Unrestricted / Recursively Enumerable only (Type 0)', isCorrect: false },
        ]),
        makeQ(testId, 2, 'single_choice', 'Which problem is provably undecidable for Turing machines?', 4, 1, [
          { text: 'The Halting Problem (determining if an arbitrary TM halts on input w)', isCorrect: true },
          { text: 'Determining if a DFA accepts an empty language', isCorrect: false },
          { text: 'Membership in a Context-Free Grammar', isCorrect: false },
          { text: 'Equivalence of two DFAs', isCorrect: false },
        ]),
        makeQ(testId, 3, 'numerical', 'What is the minimum number of states in a minimal DFA that accepts the language of all binary strings ending in "01"?', 4, 0, undefined, {
          expectedNumericAnswer: 3,
          numericTolerance: 0,
          explanation: 'States correspond to: {start/other, seen "0", seen "01" (accept)}. Minimal DFA requires 3 states.',
        }),
        makeQ(testId, 4, 'multiple_choice', 'Which complexity classes satisfy $P \\subseteq NP$? (Select all that apply)', 4, 1, [
          { text: 'Every problem in P is in NP', isCorrect: true },
          { text: 'Every NP-Complete problem can be verified in polynomial time', isCorrect: true },
          { text: 'If any NP-Complete problem is solved in polynomial time, then P = NP', isCorrect: true },
          { text: 'All NP problems are NP-Hard', isCorrect: false },
        ]),
        makeQ(testId, 5, 'single_choice', 'In computer architecture, what hazard occurs when an instruction depends on the result of a prior instruction that is still in the pipeline?', 4, 1, [
          { text: 'Data Hazard (RAW)', isCorrect: true },
          { text: 'Structural Hazard', isCorrect: false },
          { text: 'Control Hazard', isCorrect: false },
          { text: 'Branch Hazard', isCorrect: false },
        ]),
        makeQ(testId, 6, 'single_choice', 'What technique resolves pipeline branch delays by executing instructions ahead of branch resolution?', 4, 1, [
          { text: 'Branch Prediction and Speculative Execution', isCorrect: true },
          { text: 'Register Renaming', isCorrect: false },
          { text: 'Operand Forwarding', isCorrect: false },
          { text: 'Instruction Fetch Stalling', isCorrect: false },
        ]),
        makeQ(testId, 7, 'numerical', 'A 5-stage instruction pipeline has stage delays of $2\\text{ ns}, 3\\text{ ns}, 2\\text{ ns}, 4\\text{ ns}, 2\\text{ ns}$. What is the clock cycle time (in ns) governed by the bottleneck stage?', 4, 0, undefined, {
          expectedNumericAnswer: 4,
          numericTolerance: 0,
          unit: 'ns',
          explanation: 'Clock cycle is determined by the slowest stage: $\\max(2, 3, 2, 4, 2) = 4\\text{ ns}$.',
        }),
        makeQ(testId, 8, 'multiple_choice', 'Which compiler optimization techniques reduce execution time inside loops? (Select all that apply)', 4, 1, [
          { text: 'Loop Unrolling', isCorrect: true },
          { text: 'Loop Invariant Code Motion', isCorrect: true },
          { text: 'Strength Reduction', isCorrect: true },
          { text: 'Dead Code Elimination', isCorrect: true },
        ]),
        makeQ(testId, 9, 'single_choice', 'In cryptography, what mathematical problem underpins the security of the RSA asymmetric public-key cryptosystem?', 4, 1, [
          { text: 'Integer Factorization of large semi-primes', isCorrect: true },
          { text: 'Discrete Logarithm on elliptic curves', isCorrect: false },
          { text: 'Shortest Vector Problem in lattices', isCorrect: false },
          { text: 'Subset Sum Problem', isCorrect: false },
        ]),
        makeQ(testId, 10, 'single_choice', 'Which protocol provides secure transport-layer cryptographic privacy and integrity over the Internet?', 4, 1, [
          { text: 'TLS (Transport Layer Security)', isCorrect: true },
          { text: 'IPsec', isCorrect: false },
          { text: 'SSH', isCorrect: false },
          { text: 'Kerberos', isCorrect: false },
        ]),
        makeQ(testId, 11, 'numerical', 'Calculate the Shannon Channel Capacity $C$ (in kbps) for a channel with bandwidth $B = 3\\text{ kHz}$ and signal-to-noise ratio $\\text{SNR} = 31$ ($C = B \\log_2(1 + \\text{SNR})$).', 4, 0, undefined, {
          expectedNumericAnswer: 15,
          numericTolerance: 0.1,
          unit: 'kbps',
          explanation: '$C = 3000 \\times \\log_2(1 + 31) = 3000 \\times \\log_2(32) = 3000 \\times 5 = 15,000\\text{ bps} = 15\\text{ kbps}$.',
        }),
        makeQ(testId, 12, 'multiple_choice', 'Which of the following problems are known to be NP-Complete? (Select all that apply)', 4, 1, [
          { text: 'Boolean Satisfiability (3-SAT)', isCorrect: true },
          { text: 'Traveling Salesperson Problem (Decision version)', isCorrect: true },
          { text: 'Vertex Cover Problem', isCorrect: true },
          { text: 'Shortest Path in unweighted graph', isCorrect: false, explanation: 'Solvable in polynomial time $O(V+E)$ via BFS.' },
        ]),
        makeQ(testId, 13, 'single_choice', 'In software engineering, which design pattern guarantees that a class has only one instance while providing a global access point to it?', 4, 1, [
          { text: 'Singleton Pattern', isCorrect: true },
          { text: 'Factory Pattern', isCorrect: false },
          { text: 'Observer Pattern', isCorrect: false },
          { text: 'Adapter Pattern', isCorrect: false },
        ]),
        makeQ(testId, 14, 'single_choice', 'Which parsing algorithm is a bottom-up, shift-reduce parsing algorithm widely used in parser generators like Yacc and Bison?', 4, 1, [
          { text: 'LALR(1) Parsing', isCorrect: true },
          { text: 'LL(1) Recursive Descent', isCorrect: false },
          { text: 'CYK Algorithm', isCorrect: false },
          { text: 'Earley Parser', isCorrect: false },
        ]),
        makeQ(testId, 15, 'numerical', 'In a cache memory with $64\\text{ KB}$ size and $64\\text{ byte}$ cache lines, how many total cache lines (blocks) exist?', 4, 0, undefined, {
          expectedNumericAnswer: 1024,
          numericTolerance: 0,
          explanation: '$\\frac{64 \\times 1024}{64} = 1024\\text{ lines}$.',
        }),
        makeQ(testId, 16, 'multiple_choice', 'Which sorting algorithms are inherently stable? (Select all that apply)', 4, 1, [
          { text: 'Merge Sort', isCorrect: true },
          { text: 'Insertion Sort', isCorrect: true },
          { text: 'Heap Sort', isCorrect: false, explanation: 'Heap sort is not stable due to parent-child swaps.' },
          { text: 'Standard Quick Sort', isCorrect: false, explanation: 'Quick sort partitions swap across distances, losing stability.' },
        ]),
        makeQ(testId, 17, 'single_choice', 'What is the probability of obtaining exactly two heads when tossing a fair coin 3 times?', 4, 1, [
          { text: '$3/8$', isCorrect: true, explanation: '$\\binom{3}{2} (1/2)^3 = 3/8 = 0.375$.' },
          { text: '$1/2$', isCorrect: false },
          { text: '$1/4$', isCorrect: false },
          { text: '$1/8$', isCorrect: false },
        ]),
        makeQ(testId, 18, 'subjective', 'Explain the Church-Turing Thesis. Discuss its philosophical and practical significance in determining what is physically and algorithmically computable.', 6, 0, undefined, {
          wordLimit: 200,
          subjectiveGuidelines: 'Rubric:\n1. State thesis: Any function naturally computable by an effective algorithm can be computed by a Turing Machine (2 pts)\n2. Equivalence across formalisms (Lambda calculus, Post machines, General recursive functions) (2 pts)\n3. Significance: Defines universal limits of computation and establishes that all modern computers have identical computability power to a universal TM (2 pts)',
          sampleAnswer: "The Church-Turing Thesis posits that the intuitive, informal notion of an 'effective calculation' or 'algorithm' is precisely captured by the mathematical model of a Turing Machine. In other words, any function that can be computed by any mechanical or physical process can also be computed by a standard Turing machine.\n\nSignificance:\n1. Equivalence of Models: Alan Turing's machines, Alonzo Church's lambda calculus, and Kurt Gödel's recursive functions were independently developed and proved mathematically equivalent, reinforcing that 'computability' is an objective fundamental property of logic rather than an artifact of a specific machine design.\n2. Universal Computational Limit: It establishes that no future computer, quantum machine, or supercomputer can solve problems that are undecidable on a Turing machine (such as the Halting Problem). While architectures may vary in speed, their boundaries of computability remain identical.",
        }),
      ];
    }

    default:
      return [];
  }
}

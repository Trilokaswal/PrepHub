import { MockTest, Question } from '@/types';
import { getDefaultExamSettings } from './testStore';

interface QuestionTemplate {
  statement: string;
  options: { text: string; isCorrect: boolean; explanation?: string }[];
}

/**
 * Rich domain-specific question pools.
 * Provides authentic, high-quality questions with formulas, code snippets, and explanations.
 */
const DOMAIN_QUESTIONS: Record<string, QuestionTemplate[]> = {
  mathematics: [
    {
      statement: 'What is the value of the limit $\\lim_{x \\to 0} \\frac{\\sin(3x)}{x}$?',
      options: [
        { text: '3', isCorrect: true, explanation: 'Using the standard limit $\\lim_{u \\to 0} \\frac{\\sin u}{u} = 1$, we have $\\lim_{x \\to 0} \\frac{\\sin(3x)}{x} = 3 \\times 1 = 3$.' },
        { text: '0', isCorrect: false },
        { text: '1', isCorrect: false },
        { text: 'Does not exist', isCorrect: false },
      ],
    },
    {
      statement: 'If $A$ is a square matrix such that $A^2 = A$, then matrix $A$ is called:',
      options: [
        { text: 'Idempotent matrix', isCorrect: true, explanation: 'An idempotent matrix satisfies $A^2 = A$.' },
        { text: 'Involutory matrix', isCorrect: false, explanation: 'Involutory matrices satisfy $A^2 = I$.' },
        { text: 'Nilpotent matrix', isCorrect: false, explanation: 'Nilpotent matrices satisfy $A^k = 0$ for some positive integer $k$.' },
        { text: 'Orthogonal matrix', isCorrect: false, explanation: 'Orthogonal matrices satisfy $A^T A = I$.' },
      ],
    },
    {
      statement: 'What are the eigenvalues of the diagonal matrix $D = \\begin{pmatrix} 4 & 0 \\\\ 0 & -2 \\end{pmatrix}$?',
      options: [
        { text: '$\\lambda = 4$ and $\\lambda = -2$', isCorrect: true, explanation: 'The eigenvalues of any diagonal matrix are simply its diagonal entries.' },
        { text: '$\\lambda = 2$ and $\\lambda = -4$', isCorrect: false },
        { text: '$\\lambda = 0$ and $\\lambda = -8$', isCorrect: false },
        { text: '$\\lambda = 2$ and $\\lambda = 2$', isCorrect: false },
      ],
    },
    {
      statement: 'Evaluate the definite integral $\\int_0^1 (3x^2 + 2x + 1) \\, dx$.',
      options: [
        { text: '3', isCorrect: true, explanation: '$\\int_0^1 (3x^2 + 2x + 1) dx = [x^3 + x^2 + x]_0^1 = 1 + 1 + 1 = 3$.' },
        { text: '2', isCorrect: false },
        { text: '4', isCorrect: false },
        { text: '1', isCorrect: false },
      ],
    },
    {
      statement: 'The order and degree of the differential equation $\\left(\\frac{d^2y}{dx^2}\\right)^3 + \\left(\\frac{dy}{dx}\\right)^4 + y = 0$ are:',
      options: [
        { text: 'Order 2, Degree 3', isCorrect: true, explanation: 'The highest derivative is $\\frac{d^2y}{dx^2}$ (order 2), raised to the power 3 (degree 3).' },
        { text: 'Order 3, Degree 2', isCorrect: false },
        { text: 'Order 2, Degree 4', isCorrect: false },
        { text: 'Order 4, Degree 2', isCorrect: false },
      ],
    },
    {
      statement: 'According to Rolle\'s Theorem, if $f(x)$ is continuous on $[a, b]$, differentiable on $(a, b)$, and $f(a) = f(b)$, then there exists at least one $c \\in (a, b)$ such that:',
      options: [
        { text: '$f\'(c) = 0$', isCorrect: true, explanation: 'Rolle\'s theorem guarantees at least one stationary point where the tangent is horizontal, i.e., $f\'(c) = 0$.' },
        { text: '$f\'(c) = 1$', isCorrect: false },
        { text: '$f(c) = 0$', isCorrect: false },
        { text: '$f\'\'(c) = 0$', isCorrect: false },
      ],
    },
    {
      statement: 'What is the Laplace transform of the constant function $f(t) = 1$ for $s > 0$?',
      options: [
        { text: '$\\frac{1}{s}$', isCorrect: true, explanation: '$\\mathcal{L}\\{1\\} = \\int_0^\\infty e^{-st} \\, dt = \\frac{1}{s}$.' },
        { text: '$\\frac{1}{s^2}$', isCorrect: false },
        { text: '$s$', isCorrect: false },
        { text: '$\\frac{1}{s+1}$', isCorrect: false },
      ],
    },
    {
      statement: 'If two events $A$ and $B$ are independent with $P(A) = 0.4$ and $P(B) = 0.5$, what is $P(A \\cap B)$?',
      options: [
        { text: '0.20', isCorrect: true, explanation: 'For independent events, $P(A \\cap B) = P(A) \\times P(B) = 0.4 \\times 0.5 = 0.20$.' },
        { text: '0.90', isCorrect: false },
        { text: '0.10', isCorrect: false },
        { text: '0.45', isCorrect: false },
      ],
    },
    {
      statement: 'The divergence of the vector field $\\mathbf{F} = x\\mathbf{i} + y\\mathbf{j} + z\\mathbf{k}$ is:',
      options: [
        { text: '3', isCorrect: true, explanation: '$\\nabla \\cdot \\mathbf{F} = \\frac{\\partial x}{\\partial x} + \\frac{\\partial y}{\\partial y} + \\frac{\\partial z}{\\partial z} = 1 + 1 + 1 = 3$.' },
        { text: '0', isCorrect: false },
        { text: '1', isCorrect: false },
        { text: '$\\mathbf{0}$', isCorrect: false },
      ],
    },
    {
      statement: 'Which of the following functions is analytic everywhere in the complex plane (an entire function)?',
      options: [
        { text: '$f(z) = e^z$', isCorrect: true, explanation: '$e^z$ is holomorphic and satisfies Cauchy-Riemann equations across the entire complex plane $\\mathbb{C}$.' },
        { text: '$f(z) = \\bar{z}$', isCorrect: false, explanation: 'Complex conjugate $\\bar{z}$ nowhere satisfies Cauchy-Riemann conditions.' },
        { text: '$f(z) = \\frac{1}{z}$', isCorrect: false, explanation: '$\\frac{1}{z}$ has a pole singularity at $z = 0$.' },
        { text: '$f(z) = \\text{Re}(z)$', isCorrect: false },
      ],
    },
    {
      statement: 'In numerical methods, Simpson\'s 1/3 rule assumes that the integrand is approximated by a polynomial of degree:',
      options: [
        { text: '2 (Parabola)', isCorrect: true, explanation: 'Simpson\'s 1/3 rule fits quadratic polynomials through successive sets of three equally spaced points.' },
        { text: '1 (Straight line)', isCorrect: false },
        { text: '3 (Cubic)', isCorrect: false },
        { text: '4 (Quartic)', isCorrect: false },
      ],
    },
    {
      statement: 'The rank of an identity matrix $I_n$ of order $n$ is always equal to:',
      options: [
        { text: '$n$', isCorrect: true, explanation: 'All $n$ rows and columns of an identity matrix are linearly independent, so its rank is $n$.' },
        { text: '1', isCorrect: false },
        { text: '$n - 1$', isCorrect: false },
        { text: '$0$', isCorrect: false },
      ],
    },
  ],

  programming: [
    {
      statement: 'In the C programming language, what does the expression `sizeof(char)` always evaluate to according to the ANSI standard?',
      options: [
        { text: '1 byte', isCorrect: true, explanation: 'The C standard defines `sizeof(char)` as strictly 1 by definition on all compliant implementations.' },
        { text: '2 bytes', isCorrect: false },
        { text: '4 bytes', isCorrect: false },
        { text: 'Implementation dependent', isCorrect: false },
      ],
    },
    {
      statement: 'What is the worst-case time complexity of searching for an element in a balanced Binary Search Tree (AVL or Red-Black Tree) containing $n$ nodes?',
      options: [
        { text: '$O(\\log n)$', isCorrect: true, explanation: 'Because AVL/Red-Black trees maintain balanced height $\\le c \\log n$, searches take $O(\\log n)$ in the worst case.' },
        { text: '$O(n)$', isCorrect: false },
        { text: '$O(1)$', isCorrect: false },
        { text: '$O(n \\log n)$', isCorrect: false },
      ],
    },
    {
      statement: 'Which data structure follows the Last-In, First-Out (LIFO) operational principle?',
      options: [
        { text: 'Stack', isCorrect: true, explanation: 'A Stack is a LIFO data structure where the last item pushed is the first one popped.' },
        { text: 'Queue', isCorrect: false, explanation: 'Queue follows First-In, First-Out (FIFO).' },
        { text: 'Linked List', isCorrect: false },
        { text: 'Binary Tree', isCorrect: false },
      ],
    },
    {
      statement: 'In Object-Oriented Programming, the mechanism of hiding internal implementation details and exposing only essential interfaces is called:',
      options: [
        { text: 'Encapsulation / Abstraction', isCorrect: true, explanation: 'Abstraction focuses on exposing the essential features while encapsulation bundles data with methods and hides state.' },
        { text: 'Inheritance', isCorrect: false },
        { text: 'Polymorphism', isCorrect: false },
        { text: 'Compilation', isCorrect: false },
      ],
    },
    {
      statement: 'What will be the output of the following Python expression: `[x**2 for x in range(4) if x % 2 == 0]`?',
      options: [
        { text: '[0, 4]', isCorrect: true, explanation: '`range(4)` gives 0, 1, 2, 3. The even numbers are 0 and 2. Squaring them yields `0**2 = 0` and `2**2 = 4`.' },
        { text: '[0, 1, 4, 9]', isCorrect: false },
        { text: '[1, 9]', isCorrect: false },
        { text: '[0, 2]', isCorrect: false },
      ],
    },
    {
      statement: 'In Relational Database Management Systems (RDBMS), which normal form eliminates transitive functional dependencies?',
      options: [
        { text: 'Third Normal Form (3NF)', isCorrect: true, explanation: 'A relation is in 3NF if it is in 2NF and has no transitive dependencies of non-prime attributes on candidate keys.' },
        { text: 'First Normal Form (1NF)', isCorrect: false },
        { text: 'Second Normal Form (2NF)', isCorrect: false, explanation: '2NF eliminates partial key dependencies.' },
        { text: 'Boyce-Codd Normal Form (BCNF)', isCorrect: false },
      ],
    },
    {
      statement: 'Which of the following CPU scheduling algorithms is strictly non-preemptive?',
      options: [
        { text: 'First-Come, First-Served (FCFS)', isCorrect: true, explanation: 'In FCFS, once a process is allocated the CPU, it holds it until termination or voluntary I/O release.' },
        { text: 'Round Robin (RR)', isCorrect: false },
        { text: 'Shortest Remaining Time First (SRTF)', isCorrect: false },
        { text: 'Priority Preemptive Scheduling', isCorrect: false },
      ],
    },
    {
      statement: 'Which protocol operates at the Transport layer of the OSI model and guarantees reliable, ordered packet delivery?',
      options: [
        { text: 'Transmission Control Protocol (TCP)', isCorrect: true, explanation: 'TCP is a connection-oriented, reliable transport protocol using three-way handshakes and sequence acknowledgments.' },
        { text: 'User Datagram Protocol (UDP)', isCorrect: false, explanation: 'UDP is connectionless and does not guarantee delivery.' },
        { text: 'Internet Protocol (IP)', isCorrect: false, explanation: 'IP operates at the Network layer.' },
        { text: 'Hypertext Transfer Protocol (HTTP)', isCorrect: false, explanation: 'HTTP operates at the Application layer.' },
      ],
    },
    {
      statement: 'What is the average time complexity of QuickSort on an array of size $n$ with randomized pivots?',
      options: [
        { text: '$O(n \\log n)$', isCorrect: true, explanation: 'QuickSort splits partitions evenly on average, yielding recurrence $T(n) = 2T(n/2) + O(n) = O(n \\log n)$.' },
        { text: '$O(n^2)$', isCorrect: false, explanation: '$O(n^2)$ is the worst-case time complexity.' },
        { text: '$O(n)$', isCorrect: false },
        { text: '$O(\\log n)$', isCorrect: false },
      ],
    },
    {
      statement: 'Which condition is NOT one of the four Coffman conditions necessary for a system deadlock to occur?',
      options: [
        { text: 'Preemptive resource allocation', isCorrect: true, explanation: 'No preemption is the necessary condition. If resources can be preempted, deadlocks are prevented.' },
        { text: 'Mutual Exclusion', isCorrect: false },
        { text: 'Hold and Wait', isCorrect: false },
        { text: 'Circular Wait', isCorrect: false },
      ],
    },
    {
      statement: 'In Java, which keyword prevents a method from being overridden by a subclass?',
      options: [
        { text: 'final', isCorrect: true, explanation: 'Marking a method `final` in Java prevents subclasses from overriding its implementation.' },
        { text: 'static', isCorrect: false },
        { text: 'abstract', isCorrect: false },
        { text: 'private', isCorrect: false },
      ],
    },
    {
      statement: 'In git version control, which command creates and switches to a new branch in a single step?',
      options: [
        { text: 'git checkout -b <branch-name>', isCorrect: true, explanation: '`git checkout -b <name>` (or `git switch -c <name>`) creates the branch and checks it out immediately.' },
        { text: 'git branch <branch-name>', isCorrect: false },
        { text: 'git commit -b <branch-name>', isCorrect: false },
        { text: 'git merge -b <branch-name>', isCorrect: false },
      ],
    },
  ],

  physics: [
    {
      statement: 'What is the SI unit of magnetic flux?',
      options: [
        { text: 'Weber (Wb)', isCorrect: true, explanation: 'Magnetic flux is measured in Webers (Wb), where $1\\text{ Wb} = 1\\text{ Tesla} \\cdot \\text{m}^2$.' },
        { text: 'Tesla (T)', isCorrect: false, explanation: 'Tesla is the unit of magnetic flux density ($B$).' },
        { text: 'Henry (H)', isCorrect: false, explanation: 'Henry is the unit of inductance.' },
        { text: 'Lumen (lm)', isCorrect: false },
      ],
    },
    {
      statement: 'According to de Broglie\'s hypothesis, what is the wavelength $\\lambda$ associated with a particle of mass $m$ moving with velocity $v$?',
      options: [
        { text: '$\\lambda = \\frac{h}{m v}$', isCorrect: true, explanation: 'de Broglie wavelength is given by $\\lambda = \\frac{h}{p} = \\frac{h}{mv}$.' },
        { text: '$\\lambda = \\frac{m v}{h}$', isCorrect: false },
        { text: '$\\lambda = h \\cdot m v$', isCorrect: false },
        { text: '$\\lambda = \\frac{h c}{m v^2}$', isCorrect: false },
      ],
    },
    {
      statement: 'A reversible heat engine operates between $600\\text{ K}$ and $300\\text{ K}$. What is its theoretical Carnot efficiency?',
      options: [
        { text: '50%', isCorrect: true, explanation: '$\\eta = 1 - \\frac{T_C}{T_H} = 1 - \\frac{300}{600} = 0.50 = 50\\%$.' },
        { text: '100%', isCorrect: false },
        { text: '33.3%', isCorrect: false },
        { text: '75%', isCorrect: false },
      ],
    },
    {
      statement: 'In an electromagnetic wave propagating in vacuum, what is the phase relationship between the oscillating electric field $\\mathbf{E}$ and magnetic field $\\mathbf{B}$?',
      options: [
        { text: 'In phase ($0^\\circ$ phase difference)', isCorrect: true, explanation: 'In a plane EM wave in free space, $\\mathbf{E}$ and $\\mathbf{B}$ reach their maxima and minima at identical locations and times.' },
        { text: 'Out of phase by $90^\\circ$', isCorrect: false },
        { text: 'Out of phase by $180^\\circ$', isCorrect: false },
        { text: 'Variable depending on wavelength', isCorrect: false },
      ],
    },
    {
      statement: 'Which physical phenomenon provides direct experimental evidence for the transverse nature of light waves?',
      options: [
        { text: 'Polarization', isCorrect: true, explanation: 'Only transverse waves can be polarized; longitudinal waves (such as sound) cannot exhibit polarization.' },
        { text: 'Interference', isCorrect: false },
        { text: 'Diffraction', isCorrect: false },
        { text: 'Refraction', isCorrect: false },
      ],
    },
    {
      statement: 'What is the escape velocity from the surface of the Earth (radius $\\approx 6400\\text{ km}$)?',
      options: [
        { text: '$11.2\\text{ km/s}$', isCorrect: true, explanation: '$v_e = \\sqrt{2 g R} = \\sqrt{2 \\times 9.8 \\times 6.4 \\times 10^6} \\approx 11.2\\text{ km/s}$.' },
        { text: '$7.9\\text{ km/s}$', isCorrect: false, explanation: '$7.9\\text{ km/s}$ is orbital velocity.' },
        { text: '$9.8\\text{ km/s}$', isCorrect: false },
        { text: '$3.0 \\times 10^5\\text{ km/s}$', isCorrect: false },
      ],
    },
    {
      statement: 'The principle of superposition of waves explains which of the following optical phenomena?',
      options: [
        { text: 'Interference and Diffraction', isCorrect: true, explanation: 'Both interference and diffraction arise directly from the algebraic superposition of overlapping coherent wave disturbances.' },
        { text: 'Photoelectric effect', isCorrect: false },
        { text: 'Compton scattering', isCorrect: false },
        { text: 'Blackbody radiation', isCorrect: false },
      ],
    },
    {
      statement: 'The moment of inertia of a uniform thin rod of mass $M$ and length $L$ about an axis perpendicular to its length through its center is:',
      options: [
        { text: '$\\frac{1}{12} M L^2$', isCorrect: true, explanation: '$I = \\int_{-L/2}^{L/2} x^2 \\left(\\frac{M}{L}\\right) dx = \\frac{1}{12} M L^2$.' },
        { text: '$\\frac{1}{3} M L^2$', isCorrect: false, explanation: '$\\frac{1}{3}ML^2$ is about an axis through one end.' },
        { text: '$\\frac{1}{2} M L^2$', isCorrect: false },
        { text: '$M L^2$', isCorrect: false },
      ],
    },
    {
      statement: 'According to Heisenberg\'s Uncertainty Principle, the product of uncertainties in position and momentum satisfies:',
      options: [
        { text: '$\\Delta x \\cdot \\Delta p \\ge \\frac{\\hbar}{2}$', isCorrect: true, explanation: 'The standard quantum lower bound is $\\Delta x \\cdot \\Delta p \\ge \\frac{\\hbar}{2}$, where $\\hbar = \\frac{h}{2\\pi}$.' },
        { text: '$\\Delta x \\cdot \\Delta p = 0$', isCorrect: false },
        { text: '$\\Delta x \\cdot \\Delta p \\le \\frac{h}{2}$', isCorrect: false },
        { text: '$\\Delta x \\cdot \\Delta p = h c$', isCorrect: false },
      ],
    },
    {
      statement: 'In an intrinsic semiconductor at absolute zero temperature ($T = 0\\text{ K}$), the conduction band is:',
      options: [
        { text: 'Completely empty', isCorrect: true, explanation: 'At $0\\text{ K}$, thermal energy is zero, so no electrons can overcome the bandgap; the conduction band is completely empty and valence band full.' },
        { text: 'Partially filled', isCorrect: false },
        { text: 'Completely full', isCorrect: false },
        { text: 'Doped with holes', isCorrect: false },
      ],
    },
  ],

  engineering: [
    {
      statement: 'In mechanics of materials, Hooke\'s Law states that within the elastic limit:',
      options: [
        { text: 'Stress is directly proportional to Strain', isCorrect: true, explanation: 'Hooke\'s Law states $\\sigma = E \\cdot \\epsilon$, where $E$ is Young\'s modulus of elasticity.' },
        { text: 'Strain is inversely proportional to Stress', isCorrect: false },
        { text: 'Stress is proportional to the square of Strain', isCorrect: false },
        { text: 'Stress is independent of Strain', isCorrect: false },
      ],
    },
    {
      statement: 'In an electrical AC circuit, what is the impedance of an ideal capacitor with capacitance $C$ at frequency $\\omega$?',
      options: [
        { text: '$Z_C = \\frac{1}{j\\omega C}$', isCorrect: true, explanation: 'Capacitive reactance is $X_C = \\frac{1}{\\omega C}$, yielding complex impedance $Z_C = -j/(\\omega C) = \\frac{1}{j\\omega C}$.' },
        { text: '$Z_C = j\\omega C$', isCorrect: false },
        { text: '$Z_C = \\omega C$', isCorrect: false },
        { text: '$Z_C = R + j\\omega C$', isCorrect: false },
      ],
    },
    {
      statement: 'In fluid mechanics, what dimensionless parameter characterizes the transition between laminar and turbulent flow?',
      options: [
        { text: 'Reynolds Number ($Re$)', isCorrect: true, explanation: 'Reynolds number $Re = \\frac{\\rho v D}{\\mu}$ represents the ratio of inertial forces to viscous forces.' },
        { text: 'Mach Number ($Ma$)', isCorrect: false },
        { text: 'Froude Number ($Fr$)', isCorrect: false },
        { text: 'Prandtl Number ($Pr$)', isCorrect: false },
      ],
    },
    {
      statement: 'Which thermodynamic cycle represents the ideal cycle for a spark-ignition (petrol) internal combustion engine?',
      options: [
        { text: 'Otto Cycle', isCorrect: true, explanation: 'The Otto cycle features constant-volume heat addition and rejection, modeling four-stroke petrol engines.' },
        { text: 'Diesel Cycle', isCorrect: false },
        { text: 'Rankine Cycle', isCorrect: false, explanation: 'Rankine cycle models steam power plants.' },
        { text: 'Brayton Cycle', isCorrect: false, explanation: 'Brayton cycle models gas turbine power plants.' },
      ],
    },
    {
      statement: 'Kirchhoff\'s Current Law (KCL) is a direct consequence of which fundamental physical conservation law?',
      options: [
        { text: 'Conservation of Electric Charge', isCorrect: true, explanation: 'KCL states that total current entering a node equals total current leaving it, conserving charge.' },
        { text: 'Conservation of Energy', isCorrect: false, explanation: 'Kirchhoff\'s Voltage Law (KVL) is based on conservation of energy.' },
        { text: 'Conservation of Momentum', isCorrect: false },
        { text: 'Conservation of Mass', isCorrect: false },
      ],
    },
    {
      statement: 'In digital logic design, which gate is known as a universal logic gate?',
      options: [
        { text: 'NAND gate (and NOR gate)', isCorrect: true, explanation: 'Any boolean function can be implemented using solely NAND gates or solely NOR gates.' },
        { text: 'AND gate', isCorrect: false },
        { text: 'OR gate', isCorrect: false },
        { text: 'XOR gate', isCorrect: false },
      ],
    },
    {
      statement: 'In control systems, a closed-loop system is BIBO (Bounded-Input Bounded-Output) stable if and only if all poles of its transfer function lie in:',
      options: [
        { text: 'The left-half of the complex s-plane (LHP)', isCorrect: true, explanation: 'Poles with negative real parts guarantee decaying exponential responses, ensuring stability.' },
        { text: 'The right-half of the s-plane', isCorrect: false },
        { text: 'Directly on the imaginary axis', isCorrect: false },
        { text: 'Inside the unit circle only', isCorrect: false, explanation: 'Unit circle criterion applies to discrete z-plane systems.' },
      ],
    },
    {
      statement: 'The maximum power transfer theorem states that maximum power is delivered from a source to a load when load resistance $R_L$ equals:',
      options: [
        { text: 'Thevenin internal resistance $R_{th}$', isCorrect: true, explanation: 'Power transferred is maximized when $R_L = R_{th}$, achieving $50\\%$ transfer efficiency.' },
        { text: 'Zero', isCorrect: false },
        { text: 'Infinity', isCorrect: false },
        { text: '$2 R_{th}$', isCorrect: false },
      ],
    },
    {
      statement: 'In structural engineering, the point on a beam where the bending moment is zero and changes sign is known as:',
      options: [
        { text: 'Point of Contraflexure (Inflection)', isCorrect: true, explanation: 'The point of contraflexure is where the curvature of the beam reverses sign, signifying zero bending moment.' },
        { text: 'Neutral Axis', isCorrect: false },
        { text: 'Shear Center', isCorrect: false },
        { text: 'Plastic Hinge', isCorrect: false },
      ],
    },
    {
      statement: 'Which component in a DC motor is responsible for reversing the direction of current in the armature coils every half-rotation to maintain unidirectional torque?',
      options: [
        { text: 'Commutator and Brushes', isCorrect: true, explanation: 'The split-ring commutator switches current polarity through the coils as they cross the magnetic neutral plane.' },
        { text: 'Stator poles', isCorrect: false },
        { text: 'Rotor shaft', isCorrect: false },
        { text: 'Slip rings', isCorrect: false, explanation: 'Slip rings maintain continuous contact in AC alternators.' },
      ],
    },
  ],

  business: [
    {
      statement: 'According to the fundamental accounting equation, which relationship always holds true on a company\'s Balance Sheet?',
      options: [
        { text: 'Assets = Liabilities + Equity', isCorrect: true, explanation: 'The fundamental balance sheet equation requires all company assets to be funded by either debt (liabilities) or owners\' capital (equity).' },
        { text: 'Assets + Liabilities = Equity', isCorrect: false },
        { text: 'Equity = Assets + Liabilities', isCorrect: false },
        { text: 'Net Profit = Assets - Liabilities', isCorrect: false },
      ],
    },
    {
      statement: 'In microeconomics, if a $10\\%$ increase in the price of a commodity leads to a $20\\%$ decrease in the quantity demanded, the price elasticity of demand is:',
      options: [
        { text: '-2.0 (Elastic)', isCorrect: true, explanation: '$E_d = \\frac{\\% \\Delta Q}{\\% \\Delta P} = \\frac{-20\\%}{+10\\%} = -2.0$. Since $|E_d| > 1$, demand is price elastic.' },
        { text: '-0.5 (Inelastic)', isCorrect: false },
        { text: '0 (Perfectively inelastic)', isCorrect: false },
        { text: '-1.0 (Unitary)', isCorrect: false },
      ],
    },
    {
      statement: 'Which of the following is considered an element of Philip Kotler\'s classic "4 Ps" Marketing Mix framework?',
      options: [
        { text: 'Product, Price, Place, Promotion', isCorrect: true, explanation: 'The traditional 4 Ps of marketing are Product, Price, Place (distribution), and Promotion.' },
        { text: 'People, Process, Profit, Product', isCorrect: false },
        { text: 'Planning, Positioning, Packaging, Promotion', isCorrect: false },
        { text: 'Purchase, Payment, Performance, Publicity', isCorrect: false },
      ],
    },
    {
      statement: 'What financial metric calculates the discount rate that makes the Net Present Value (NPV) of all cash flows from a project equal to zero?',
      options: [
        { text: 'Internal Rate of Return (IRR)', isCorrect: true, explanation: 'IRR is the specific hurdle rate where $\\text{NPV} = \\sum \\frac{C_t}{(1 + \\text{IRR})^t} - C_0 = 0$.' },
        { text: 'Return on Equity (ROE)', isCorrect: false },
        { text: 'Weighted Average Cost of Capital (WACC)', isCorrect: false },
        { text: 'Payback Period', isCorrect: false },
      ],
    },
    {
      statement: 'In management theory, Abraham Maslow\'s Hierarchy of Needs places which need at the apex (highest level)?',
      options: [
        { text: 'Self-Actualization', isCorrect: true, explanation: 'Maslow\'s pyramid tops with Self-Actualization after physiological, safety, social/belonging, and esteem needs.' },
        { text: 'Esteem Needs', isCorrect: false },
        { text: 'Safety and Security', isCorrect: false },
        { text: 'Physiological Needs', isCorrect: false },
      ],
    },
    {
      statement: 'In financial analysis, the Quick Ratio (Acid-Test Ratio) excludes which current asset from the numerator because it is least liquid?',
      options: [
        { text: 'Inventory', isCorrect: true, explanation: '$\\text{Quick Ratio} = \\frac{\\text{Cash} + \\text{Marketable Securities} + \\text{Receivables}}{\\text{Current Liabilities}}$, strictly excluding inventory and prepaid expenses.' },
        { text: 'Cash and Bank balances', isCorrect: false },
        { text: 'Accounts Receivable', isCorrect: false },
        { text: 'Short-term investments', isCorrect: false },
      ],
    },
    {
      statement: 'Which market structure features a small number of large, mutually interdependent firms producing either homogeneous or differentiated products?',
      options: [
        { text: 'Oligopoly', isCorrect: true, explanation: 'Oligopolies (e.g. telecom, airlines, automotive) are defined by high barriers to entry and strong mutual interdependence between few dominant sellers.' },
        { text: 'Monopoly', isCorrect: false },
        { text: 'Perfect Competition', isCorrect: false },
        { text: 'Monopsony', isCorrect: false },
      ],
    },
    {
      statement: 'In corporate finance, the Capital Asset Pricing Model (CAPM) estimates the expected return on an asset using which risk sensitivity measure?',
      options: [
        { text: 'Beta ($\\beta$)', isCorrect: true, explanation: '$\\text{Beta}$ measures systematic, undiversifiable market risk relative to the broader market index: $E(R_i) = R_f + \\beta_i [E(R_m) - R_f]$.' },
        { text: 'Alpha ($\\alpha$)', isCorrect: false },
        { text: 'Standard Deviation', isCorrect: false },
        { text: 'Sharpe Ratio', isCorrect: false },
      ],
    },
    {
      statement: 'A SWOT analysis is a strategic planning framework used to evaluate which four components of an organization?',
      options: [
        { text: 'Strengths, Weaknesses, Opportunities, Threats', isCorrect: true, explanation: 'SWOT separates internal factors (Strengths & Weaknesses) from external environmental factors (Opportunities & Threats).' },
        { text: 'Sales, Workforce, Operations, Targets', isCorrect: false },
        { text: 'Strategy, Wealth, Objectives, Taxes', isCorrect: false },
        { text: 'Suppliers, Warehouses, Orders, Transport', isCorrect: false },
      ],
    },
    {
      statement: 'What is the primary role of a country\'s Central Bank in conducting monetary policy during an inflationary surge?',
      options: [
        { text: 'Raise policy interest rates to cool aggregate borrowing and demand', isCorrect: true, explanation: 'Increasing policy interest rates tightens liquidity, discourages speculative borrowing, and moderates inflation.' },
        { text: 'Lower bank reserve requirements', isCorrect: false },
        { text: 'Print additional fiat currency', isCorrect: false },
        { text: 'Increase fiscal subsidies to corporations', isCorrect: false },
      ],
    },
  ],

  humanities: [
    {
      statement: 'Which ancient civilization was situated along the Tigris and Euphrates rivers and developed cuneiform script?',
      options: [
        { text: 'Mesopotamia', isCorrect: true, explanation: 'Mesopotamia (Sumer, Akkad, Babylon) flourished in the Fertile Crescent between the Tigris and Euphrates, inventing cuneiform writing.' },
        { text: 'Ancient Egypt', isCorrect: false, explanation: 'Egypt was centered on the Nile and used hieroglyphs.' },
        { text: 'Indus Valley Civilization', isCorrect: false },
        { text: 'Minoan Civilization', isCorrect: false },
      ],
    },
    {
      statement: 'In political philosophy, who authored the famous 1651 political treatise *Leviathan*, arguing that life in the state of nature is "solitary, poor, nasty, brutish, and short"?',
      options: [
        { text: 'Thomas Hobbes', isCorrect: true, explanation: 'Thomas Hobbes argued for strong sovereign social contracts in *Leviathan* to escape the chaotic state of nature.' },
        { text: 'John Locke', isCorrect: false },
        { text: 'Jean-Jacques Rousseau', isCorrect: false },
        { text: 'Niccolò Machiavelli', isCorrect: false },
      ],
    },
    {
      statement: 'The Treaty of Versailles, which formally concluded World War I, was signed in which year?',
      options: [
        { text: '1919', isCorrect: true, explanation: 'The Treaty of Versailles was signed on June 28, 1919 in the Hall of Mirrors in Versailles, France.' },
        { text: '1914', isCorrect: false },
        { text: '1918', isCorrect: false },
        { text: '1923', isCorrect: false },
      ],
    },
    {
      statement: 'In English literature, a Shakespearean (English) sonnet consists of:',
      options: [
        { text: 'Three quatrains and a final rhyming couplet (14 lines)', isCorrect: true, explanation: 'A Shakespearean sonnet follows the rhyme scheme ABAB CDCD EFEF GG across 14 iambic pentameter lines.' },
        { text: 'An octave followed by a sestet', isCorrect: false, explanation: 'Octave + sestet is the Petrarchan (Italian) sonnet structure.' },
        { text: 'Four tercets and two refrains', isCorrect: false },
        { text: 'Twelve rhymed couplets', isCorrect: false },
      ],
    },
    {
      statement: 'Which political principle asserts that governmental powers should be divided among distinct legislative, executive, and judicial branches to avoid tyranny?',
      options: [
        { text: 'Separation of Powers (Montesquieu)', isCorrect: true, explanation: 'Baron de Montesquieu formulated the doctrine of the separation of powers in *The Spirit of the Laws* (1748).' },
        { text: 'Federalism', isCorrect: false },
        { text: 'Direct Democracy', isCorrect: false },
        { text: 'Parliamentary Sovereignty', isCorrect: false },
      ],
    },
    {
      statement: 'Who is widely regarded as the "Father of Economics" and author of *The Wealth of Nations* (1776)?',
      options: [
        { text: 'Adam Smith', isCorrect: true, explanation: 'Adam Smith articulated classical free-market economics, the division of labor, and the "invisible hand" concept.' },
        { text: 'Karl Marx', isCorrect: false },
        { text: 'John Maynard Keynes', isCorrect: false },
        { text: 'David Ricardo', isCorrect: false },
      ],
    },
    {
      statement: 'The Universal Declaration of Human Rights (UDHR) was adopted by the United Nations General Assembly in:',
      options: [
        { text: '1948', isCorrect: true, explanation: 'The UDHR was adopted on December 10, 1948 in Paris (commemorated annually as Human Rights Day).' },
        { text: '1945', isCorrect: false },
        { text: '1950', isCorrect: false },
        { text: '1962', isCorrect: false },
      ],
    },
    {
      statement: 'In sociological theory, Max Weber identified three distinct types of legitimate authority: Traditional, Charismatic, and:',
      options: [
        { text: 'Rational-Legal Authority', isCorrect: true, explanation: 'Weber\'s tripartite classification of authority includes Traditional (customs), Charismatic (heroic persona), and Rational-Legal (bureaucratic law).' },
        { text: 'Coercive Authority', isCorrect: false },
        { text: 'Monarchical Authority', isCorrect: false },
        { text: 'Economic Authority', isCorrect: false },
      ],
    },
    {
      statement: 'Which 19th-century intellectual movement in literature and art placed prime emphasis on emotion, nature, individualism, and sublime beauty over industrial rationalism?',
      options: [
        { text: 'Romanticism', isCorrect: true, explanation: 'Romanticism (Wordsworth, Coleridge, Keats, Shelley) arose as an aesthetic reaction against Enlightenment rationalism and the Industrial Revolution.' },
        { text: 'Neoclassicism', isCorrect: false },
        { text: 'Modernism', isCorrect: false },
        { text: 'Realism', isCorrect: false },
      ],
    },
    {
      statement: 'In Indian constitutional law, which article is recognized as the "Heart and Soul of the Constitution" by Dr. B.R. Ambedkar?',
      options: [
        { text: 'Article 32 (Right to Constitutional Remedies)', isCorrect: true, explanation: 'Article 32 guarantees direct access to the Supreme Court for enforcement of Fundamental Rights via prerogative writs.' },
        { text: 'Article 21 (Protection of Life and Personal Liberty)', isCorrect: false },
        { text: 'Article 14 (Equality before Law)', isCorrect: false },
        { text: 'Article 19 (Freedom of Speech and Expression)', isCorrect: false },
      ],
    },
  ],

  science: [
    {
      statement: 'In organic chemistry, which reaction mechanism is characterized by a concerted one-step bimolecular nucleophilic substitution with complete inversion of stereochemistry (Walden inversion)?',
      options: [
        { text: '$S_N2$ mechanism', isCorrect: true, explanation: '$S_N2$ proceeds via backside nucleophilic attack in a single concerted step, resulting in umbrella inversion of stereocenters.' },
        { text: '$S_N1$ mechanism', isCorrect: false, explanation: '$S_N1$ is a two-step mechanism via planar carbocation giving racemization.' },
        { text: '$E1$ mechanism', isCorrect: false },
        { text: '$E2$ mechanism', isCorrect: false },
      ],
    },
    {
      statement: 'What is the oxidation state of Chromium ($Cr$) in the dichromate anion $Cr_2O_7^{2-}$?',
      options: [
        { text: '+6', isCorrect: true, explanation: '$2(Cr) + 7(-2) = -2 \\implies 2Cr - 14 = -2 \\implies 2Cr = 12 \\implies Cr = +6$.' },
        { text: '+3', isCorrect: false },
        { text: '+7', isCorrect: false },
        { text: '+4', isCorrect: false },
      ],
    },
    {
      statement: 'In cell biology, which cellular organelle is responsible for ATP synthesis via oxidative phosphorylation (often termed the powerhouse of the cell)?',
      options: [
        { text: 'Mitochondria', isCorrect: true, explanation: 'Mitochondria generate the majority of cellular adenosine triphosphate (ATP) through the electron transport chain on the inner cristae.' },
        { text: 'Ribosome', isCorrect: false, explanation: 'Ribosomes perform protein translation.' },
        { text: 'Golgi Apparatus', isCorrect: false, explanation: 'Golgi apparatus modifies and packages proteins.' },
        { text: 'Lysosome', isCorrect: false, explanation: 'Lysosomes carry out cellular waste degradation.' },
      ],
    },
    {
      statement: 'According to Le Chatelier\'s principle, what will happen to the exothermic equilibrium $N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g) + \\text{Heat}$ if the temperature is increased?',
      options: [
        { text: 'The equilibrium shifts to the left (favors reactants)', isCorrect: true, explanation: 'Adding heat shifts an exothermic reaction in the reverse direction to absorb the excess thermal energy.' },
        { text: 'The equilibrium shifts to the right (produces more $NH_3$)', isCorrect: false },
        { text: 'No shift occurs', isCorrect: false },
        { text: 'The equilibrium constant $K$ increases', isCorrect: false },
      ],
    },
    {
      statement: 'What is the pH of a neutral aqueous solution at standard temperature ($25^\\circ\\text{C}$)?',
      options: [
        { text: '7.0', isCorrect: true, explanation: 'At $25^\\circ\\text{C}$, $K_w = 1.0 \\times 10^{-14}$, so $[H^+] = 10^{-7}\\text{ M}$, yielding $\\text{pH} = -\\log(10^{-7}) = 7.0$.' },
        { text: '0.0', isCorrect: false },
        { text: '14.0', isCorrect: false },
        { text: '1.0', isCorrect: false },
      ],
    },
    {
      statement: 'In genetics, during which phase of meiosis does crossing over (homologous genetic recombination) occur?',
      options: [
        { text: 'Pachytene stage of Prophase I', isCorrect: true, explanation: 'Synapsis completes and non-sister chromatids form chiasmata for genetic crossing over during pachytene of prophase I.' },
        { text: 'Metaphase I', isCorrect: false },
        { text: 'Anaphase II', isCorrect: false },
        { text: 'Telophase I', isCorrect: false },
      ],
    },
    {
      statement: 'Which subatomic particle was discovered by J.J. Thomson in 1897 through his cathode ray tube experiments?',
      options: [
        { text: 'Electron', isCorrect: true, explanation: 'J.J. Thomson determined the charge-to-mass ($e/m$) ratio of cathode ray particles, proving the existence of electrons.' },
        { text: 'Proton', isCorrect: false },
        { text: 'Neutron', isCorrect: false },
        { text: 'Positron', isCorrect: false },
      ],
    },
    {
      statement: 'What type of chemical bonding exists between hydrogen and oxygen atoms within a single water molecule ($H_2O$)?',
      options: [
        { text: 'Polar Covalent Bond', isCorrect: true, explanation: 'Differences in electronegativity (O: 3.44 vs H: 2.20) create unequal electron sharing, forming polar covalent $\\sigma$-bonds.' },
        { text: 'Ionic Bond', isCorrect: false },
        { text: 'Non-polar Covalent Bond', isCorrect: false },
        { text: 'Metallic Bond', isCorrect: false },
      ],
    },
    {
      statement: 'According to the central dogma of molecular biology, genetic information is transcribed from DNA to messenger RNA, which is then translated into:',
      options: [
        { text: 'Polypeptides (Proteins)', isCorrect: true, explanation: 'The central dogma outlines: $\\text{DNA} \\xrightarrow{\\text{transcription}} \\text{mRNA} \\xrightarrow{\\text{translation}} \\text{Protein}$.' },
        { text: 'Lipids', isCorrect: false },
        { text: 'Carbohydrates', isCorrect: false },
        { text: 'Adenosine triphosphate', isCorrect: false },
      ],
    },
    {
      statement: 'What is the shape and bond angle of a methane ($CH_4$) molecule according to VSEPR theory?',
      options: [
        { text: 'Tetrahedral with bond angles of $109.5^\\circ$', isCorrect: true, explanation: '$sp^3$ hybridization with 4 bonding pairs and zero lone pairs minimizes electron repulsion at $109.5^\\circ$.' },
        { text: 'Square planar with bond angles of $90^\\circ$', isCorrect: false },
        { text: 'Trigonal bipyramidal with $120^\\circ$', isCorrect: false },
        { text: 'Octahedral with $90^\\circ$', isCorrect: false },
      ],
    },
  ],
};

/**
 * Maps subject name keywords to domain question pools.
 */
function resolveDomain(subjectName: string): string {
  const s = subjectName.toLowerCase();
  if (
    s.includes('math') ||
    s.includes('calculus') ||
    s.includes('algebra') ||
    s.includes('discrete') ||
    s.includes('statistics') ||
    s.includes('probability') ||
    s.includes('quantitative') ||
    s.includes('differential')
  ) {
    return 'mathematics';
  }
  if (
    s.includes('program') ||
    s.includes('data struct') ||
    s.includes('algorithm') ||
    s.includes('software') ||
    s.includes('c++') ||
    s.includes('java') ||
    s.includes('python') ||
    s.includes('database') ||
    s.includes('dbms') ||
    s.includes('network') ||
    s.includes('operating system') ||
    s.includes('web') ||
    s.includes('cloud') ||
    s.includes('cyber') ||
    s.includes('ai') ||
    s.includes('compiler') ||
    s.includes('computer')
  ) {
    return 'programming';
  }
  if (
    s.includes('physic') ||
    s.includes('mechanic') ||
    s.includes('optics') ||
    s.includes('thermodynamic') ||
    s.includes('electromagnet') ||
    s.includes('quantum') ||
    s.includes('wave')
  ) {
    return 'physics';
  }
  if (
    s.includes('circuit') ||
    s.includes('electron') ||
    s.includes('electric') ||
    s.includes('digital') ||
    s.includes('signal') ||
    s.includes('vlsi') ||
    s.includes('control system') ||
    s.includes('civil') ||
    s.includes('structure') ||
    s.includes('fluid') ||
    s.includes('machine') ||
    s.includes('power') ||
    s.includes('engineer') ||
    s.includes('survey')
  ) {
    return 'engineering';
  }
  if (
    s.includes('account') ||
    s.includes('finance') ||
    s.includes('market') ||
    s.includes('manage') ||
    s.includes('business') ||
    s.includes('econom') ||
    s.includes('commerce') ||
    s.includes('organ') ||
    s.includes('banking') ||
    s.includes('hrm')
  ) {
    return 'business';
  }
  if (
    s.includes('history') ||
    s.includes('politic') ||
    s.includes('literat') ||
    s.includes('english') ||
    s.includes('sociol') ||
    s.includes('human') ||
    s.includes('philosophy') ||
    s.includes('law') ||
    s.includes('communicat')
  ) {
    return 'humanities';
  }
  return 'science';
}

/**
 * Deterministically generates exactly 10 high-quality questions for any test ID and subject.
 */
export function generateQuestionsForTest(
  testId: string,
  subjectName: string,
  testIndex: number = 1
): Question[] {
  const primaryDomain = resolveDomain(subjectName);
  const primaryPool = DOMAIN_QUESTIONS[primaryDomain] || DOMAIN_QUESTIONS.mathematics;
  
  // Secondary pool to guarantee rich question diversity
  const secondaryDomain =
    primaryDomain === 'programming'
      ? 'mathematics'
      : primaryDomain === 'physics'
      ? 'engineering'
      : primaryDomain === 'engineering'
      ? 'physics'
      : primaryDomain === 'business'
      ? 'humanities'
      : primaryDomain === 'humanities'
      ? 'business'
      : 'physics';
  const secondaryPool = DOMAIN_QUESTIONS[secondaryDomain] || DOMAIN_QUESTIONS.science;

  // Hash the testId for deterministic shuffling and selection
  let hash = 0;
  for (let i = 0; i < testId.length; i++) {
    hash = (hash << 5) - hash + testId.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);

  const combined = [...primaryPool, ...secondaryPool];
  const offset = (absHash + (testIndex - 1) * 7) % combined.length;

  const selectedTemplates: QuestionTemplate[] = [];
  for (let i = 0; i < 10; i++) {
    const idx = (offset + i) % combined.length;
    selectedTemplates.push(combined[idx]);
  }

  const timestamp = '2026-10-20T10:00:00Z';

  return selectedTemplates.map((template, idx) => {
    const qNumber = idx + 1;
    const qId = `${testId}-q${qNumber}`;

    const options = template.options.map((opt, optIdx) => ({
      id: `${qId}-opt-${optIdx + 1}`,
      text: opt.text,
      isCorrect: opt.isCorrect,
      explanation: opt.explanation,
    }));

    return {
      id: qId,
      testId,
      order: qNumber,
      type: 'single_choice',
      statement: template.statement,
      marks: 4,
      negativeMarks: 1,
      options,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
  });
}

/**
 * Builds a full MockTest object for any course test ID.
 */
export function buildCourseMockTest(
  testId: string,
  testTitle: string,
  subjectName: string,
  level: 'Beginner' | 'Intermediate' | 'Advanced' = 'Intermediate',
  durationMinutes: number = 20,
  testIndex: number = 1
): MockTest {
  const questions = generateQuestionsForTest(testId, subjectName, testIndex);
  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

  const baseTest: Partial<MockTest> = {
    id: testId,
    title: testTitle,
    subject: subjectName,
    testCategory: 'subject',
    difficulty: level,
    durationMinutes,
    questionCount: questions.length,
    targetQuestionCount: questions.length,
    totalMarks,
    status: 'published',
    instructions: `Official exam simulation for ${subjectName}. This test has ${questions.length} questions. Time limit is ${durationMinutes} minutes. Each question carries 4 marks with -1 negative mark for incorrect choices.`,
    createdAt: '2026-10-20T10:00:00Z',
    updatedAt: '2026-10-20T10:00:00Z',
  };

  return {
    ...(baseTest as MockTest),
    questions,
    totalAttempts: 142 + (Math.abs(testId.length * 17) % 350),
    averageScore: 74.2,
    settings: getDefaultExamSettings(baseTest),
  };
}

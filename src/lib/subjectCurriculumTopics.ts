import { questionBankStore } from './questionBankStore';

/**
 * Standard university syllabus topics for key engineering and science subjects.
 * Used when a student configures a mock test for their subject.
 */
export const CURRICULUM_TOPICS_MAP: Record<string, string[]> = {
  // Mathematics
  'engineering mathematics i': [
    'Matrices & Determinants',
    'Differential Calculus & Taylor Series',
    'Partial Differentiation & Maxima/Minima',
    'Integral Calculus & Multiple Integrals',
    'Vectors & Analytical Geometry',
  ],
  'engineering mathematics ii': [
    'Ordinary Differential Equations',
    'Linear Differential Equations with Constant Coefficients',
    'Laplace Transforms & Applications',
    'Fourier Series & Harmonic Analysis',
    'Partial Differential Equations',
  ],
  'discrete mathematics': [
    'Set Theory, Relations & Functions',
    'Propositional & Predicate Logic',
    'Graph Theory, Paths & Trees',
    'Combinatorics & Generating Functions',
    'Recurrence Relations & Boolean Algebra',
  ],

  // Physics
  'engineering physics': [
    'Wave Optics, Interference & Diffraction',
    'Quantum Mechanics & Wave-Particle Duality',
    'Classical Mechanics & Rotational Dynamics',
    'Electromagnetism & Maxwell Equations',
    'Lasers, Optical Fibers & Semiconductors',
  ],

  // Chemistry
  'engineering chemistry': [
    'Thermodynamics & Chemical Kinetics',
    'Electrochemistry & Corrosion Engineering',
    'Water Technology & Hardness Treatment',
    'Polymers, Composites & Nanomaterials',
    'Spectroscopy & Instrumental Analysis',
  ],

  // Programming & CS
  'programming for problem solving in c': [
    'C Syntax, Data Types & Operators',
    'Control Flow: Conditionals & Loops',
    'Arrays, Strings & String Functions',
    'Pointers & Dynamic Memory Allocation (malloc/free)',
    'Functions, Recursion & Storage Classes',
    'Structures, Unions & File I/O',
  ],
  'data structures & algorithms': [
    'Arrays, Stacks & Queue Applications',
    'Singly & Doubly Linked Lists',
    'Binary Trees, BST & AVL Trees',
    'Graph Algorithms (BFS, DFS, Dijkstra)',
    'Searching & Sorting Algorithms (Quick, Merge, Heap)',
    'Dynamic Programming & Time Complexity ($O(n)$)',
  ],
  'operating systems': [
    'Process Scheduling & Thread Management',
    'Process Synchronization, Mutex & Semaphores',
    'Deadlock Prevention, Detection & Avoidance',
    'Memory Management, Paging & Virtual Memory',
    'File Systems, Inodes & Disk Scheduling (SCAN, SSTF)',
  ],
  'database management systems': [
    'ER Modeling & Relational Schema Design',
    'SQL Queries, Aggregate Functions & Joins',
    'Normalization (1NF, 2NF, 3NF, BCNF)',
    'Transaction Management & ACID Properties',
    'Indexing (B-Tree, B+ Tree) & Query Optimization',
  ],
  'computer networks': [
    'OSI Model & TCP/IP Protocol Architecture',
    'Data Link Layer: Framing & Error Detection',
    'Network Layer: IPv4, Subnetting & Routing (OSPF, BGP)',
    'Transport Layer: TCP 3-Way Handshake, Flow Control',
    'Application Layer: HTTP, DNS, DHCP & TLS',
  ],
  'object-oriented programming with c++': [
    'Classes, Objects & Encapsulation',
    'Constructors, Destructors & Copy Semantics',
    'Inheritance, Polymorphism & Virtual Functions',
    'Operator Overloading & Friends',
    'Templates & C++ Standard Template Library (STL)',
  ],
  'digital logic & circuit design': [
    'Boolean Algebra & Logic Gates',
    'Karnaugh Maps (K-Maps) & Minimization',
    'Combinational Circuits (Adders, Multiplexers, Decoders)',
    'Sequential Circuits (SR, JK, D, T Flip-Flops)',
    'Registers, Synchronous Counters & Finite State Machines',
  ],
  'computer organization & architecture': [
    'Instruction Set Architecture (ISA) & Addressing Modes',
    'ALU Operations & Computer Arithmetic',
    'Pipelining Hazards (Data, Structural, Control)',
    'Cache Memory Hierarchy (Direct, Associative, Set-Associative)',
    'I/O Interfacing, Interrupts & DMA',
  ],
  'basic electrical engineering': [
    'DC Circuits, Ohm Law, KCL & KVL',
    'Network Theorems (Thevenin, Norton, Superposition)',
    'AC Circuits, Phasors, Impedance & Power Factor',
    'Single Phase & Three Phase Transformers',
    'DC Machines & Induction Motors',
  ],
  'basic electronics engineering': [
    'Semiconductor Diodes & Rectifier Circuits',
    'Bipolar Junction Transistors (BJT) Characteristics',
    'Field Effect Transistors (FET, MOSFET)',
    'Operational Amplifiers (Op-Amps) & Inverting/Non-Inverting Circuits',
    'Number Systems & Basic Logic Gates',
  ],
  'environmental science': [
    'Ecosystem Dynamics & Biodiversity Conservation',
    'Air, Water & Soil Pollution Control',
    'Renewable Energy & Sustainable Development',
    'Solid Waste Management & Environmental Laws',
  ],
};

/**
 * Returns available topics for a subject by checking Question Bank stored questions
 * combined with standard university curriculum topics.
 */
export function getTopicsForSubject(subjectName: string): string[] {
  const norm = subjectName.trim().toLowerCase();
  const bankTopics = questionBankStore.getAvailableTopics(subjectName);
  const set = new Set<string>();

  // Add bank topics
  bankTopics.forEach((t) => {
    if (t && t.trim() !== '') set.add(t.trim());
  });

  // Check curriculum match
  let matchedCurriculum: string[] = [];
  for (const [key, topics] of Object.entries(CURRICULUM_TOPICS_MAP)) {
    if (norm === key || norm.includes(key) || key.includes(norm)) {
      matchedCurriculum = topics;
      break;
    }
  }

  // Fallback for general matches
  if (matchedCurriculum.length === 0) {
    if (norm.includes('math')) {
      matchedCurriculum = CURRICULUM_TOPICS_MAP['engineering mathematics i'];
    } else if (norm.includes('physic')) {
      matchedCurriculum = CURRICULUM_TOPICS_MAP['engineering physics'];
    } else if (norm.includes('chem')) {
      matchedCurriculum = CURRICULUM_TOPICS_MAP['engineering chemistry'];
    } else if (norm.includes('c program') || norm.includes('c language')) {
      matchedCurriculum = CURRICULUM_TOPICS_MAP['programming for problem solving in c'];
    } else if (norm.includes('structure') || norm.includes('algo')) {
      matchedCurriculum = CURRICULUM_TOPICS_MAP['data structures & algorithms'];
    } else if (norm.includes('system') && norm.includes('operat')) {
      matchedCurriculum = CURRICULUM_TOPICS_MAP['operating systems'];
    } else {
      matchedCurriculum = [
        'Unit 1: Fundamentals & Core Principles',
        'Unit 2: Applied Concepts & Methodologies',
        'Unit 3: Advanced Analysis & Techniques',
        'Unit 4: Applications & Case Studies',
      ];
    }
  }

  matchedCurriculum.forEach((t) => set.add(t));
  return Array.from(set);
}

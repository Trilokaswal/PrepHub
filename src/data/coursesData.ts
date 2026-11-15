/**
 * Comprehensive Course, Branch, Semester, and Subject catalog for PrepHub.
 * Auto-structured with standardized curricula and 10-question mock tests per subject.
 */

export interface MockTestInfo {
  id: string;
  title: string;
  subject: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  questionCount: number;
  description: string;
}

export interface SubjectInfo {
  id: string;
  name: string;
  code?: string;
  description: string;
  testsCount: number;
  tests: MockTestInfo[];
}

export interface SemesterInfo {
  id: string;
  number: number;
  title: string;
  description: string;
  availableTestsCount: number;
  subjects: SubjectInfo[];
}

export interface BranchInfo {
  id: string;
  name: string;
  code: string;
  description: string;
  totalSemesters: number;
  totalMockTests: number;
  semesters: SemesterInfo[];
}

export interface CourseInfo {
  id: string;
  name: string;
  title: string;
  description: string;
  iconName?: 'Cpu' | 'Code2' | 'Briefcase' | 'BookOpen' | 'FlaskConical';
  totalSemesters: number;
  totalMockTests: number;
  branches: BranchInfo[];
  semesters: SemesterInfo[];
}

export const COURSES_DATA: CourseInfo[] = [
  {
    "id": "btech",
    "name": "B.Tech",
    "title": "Bachelor of Technology",
    "description": "Engineering mathematics, physics, programming, and core technical subjects across an eight-semester programme.",
    "iconName": "Cpu",
    "totalSemesters": 8,
    "totalMockTests": 360,
    "branches": [
      {
        "id": "cse",
        "name": "Computer Science & Engineering",
        "code": "CSE",
        "description": "Software development, algorithms, artificial intelligence, operating systems, and computer systems architecture.",
        "totalSemesters": 8,
        "totalMockTests": 68,
        "semesters": [
          {
            "id": "semester-1",
            "number": 1,
            "title": "Semester 1",
            "description": "B.Tech (CSE) — Semester 1 subjects, mock tests, and exam practice.",
            "availableTestsCount": 10,
            "subjects": [
              {
                "id": "btech-cse-s1-subj-1",
                "name": "Engineering Mathematics I",
                "code": "MA-101",
                "description": "Differential calculus, matrices, Taylor series, and analytical geometry.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s1-subj1-t1",
                    "title": "Engineering Mathematics I — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Mathematics I",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Mathematics I."
                  },
                  {
                    "id": "btech-cse-s1-subj1-t2",
                    "title": "Engineering Mathematics I — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Mathematics I",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-cse-s1-subj-2",
                "name": "Engineering Physics",
                "code": "PH-101",
                "description": "Optics, quantum mechanics, lasers, and electromagnetic wave theory.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s1-subj2-t1",
                    "title": "Engineering Physics — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Physics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Physics."
                  },
                  {
                    "id": "btech-cse-s1-subj2-t2",
                    "title": "Engineering Physics — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Physics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-cse-s1-subj-3",
                "name": "Programming for Problem Solving in C",
                "code": "CS-101",
                "description": "Pointers, arrays, recursion, structs, and memory management in C.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s1-subj3-t1",
                    "title": "Programming for Problem Solving in C — Practice Test 1: Fundamental Concepts",
                    "subject": "Programming for Problem Solving in C",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Programming for Problem Solving in C."
                  },
                  {
                    "id": "btech-cse-s1-subj3-t2",
                    "title": "Programming for Problem Solving in C — Practice Test 2: Exam Simulation",
                    "subject": "Programming for Problem Solving in C",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-cse-s1-subj-4",
                "name": "Basic Electrical Engineering",
                "code": "EE-101",
                "description": "AC/DC circuits, transformers, Kirchhoff’s laws, and electrical machines.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s1-subj4-t1",
                    "title": "Basic Electrical Engineering — Practice Test 1: Fundamental Concepts",
                    "subject": "Basic Electrical Engineering",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Basic Electrical Engineering."
                  },
                  {
                    "id": "btech-cse-s1-subj4-t2",
                    "title": "Basic Electrical Engineering — Practice Test 2: Exam Simulation",
                    "subject": "Basic Electrical Engineering",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-cse-s1-subj-5",
                "name": "Engineering Graphics & Design",
                "code": "ME-101",
                "description": "Orthographic projections, isometric views, and CAD fundamentals.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s1-subj5-t1",
                    "title": "Engineering Graphics & Design — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Graphics & Design",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Graphics & Design."
                  },
                  {
                    "id": "btech-cse-s1-subj5-t2",
                    "title": "Engineering Graphics & Design — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Graphics & Design",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-2",
            "number": 2,
            "title": "Semester 2",
            "description": "B.Tech (CSE) — Semester 2 subjects, mock tests, and exam practice.",
            "availableTestsCount": 10,
            "subjects": [
              {
                "id": "btech-cse-s2-subj-1",
                "name": "Engineering Mathematics II",
                "code": "MA-102",
                "description": "Vector calculus, Fourier series, and ordinary differential equations.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s2-subj1-t1",
                    "title": "Engineering Mathematics II — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Mathematics II",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Mathematics II."
                  },
                  {
                    "id": "btech-cse-s2-subj1-t2",
                    "title": "Engineering Mathematics II — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Mathematics II",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-cse-s2-subj-2",
                "name": "Engineering Chemistry",
                "code": "CH-102",
                "description": "Spectroscopy, thermodynamics, chemical kinetics, and polymers.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s2-subj2-t1",
                    "title": "Engineering Chemistry — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Chemistry",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Chemistry."
                  },
                  {
                    "id": "btech-cse-s2-subj2-t2",
                    "title": "Engineering Chemistry — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Chemistry",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-cse-s2-subj-3",
                "name": "Data Structures & Algorithms",
                "code": "CS-102",
                "description": "Stacks, queues, linked lists, trees, and sorting algorithms.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s2-subj3-t1",
                    "title": "Data Structures & Algorithms — Practice Test 1: Fundamental Concepts",
                    "subject": "Data Structures & Algorithms",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Data Structures & Algorithms."
                  },
                  {
                    "id": "btech-cse-s2-subj3-t2",
                    "title": "Data Structures & Algorithms — Practice Test 2: Exam Simulation",
                    "subject": "Data Structures & Algorithms",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-cse-s2-subj-4",
                "name": "Basic Electronics Engineering",
                "code": "EC-102",
                "description": "Diodes, transistors, op-amps, and digital logic gates.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s2-subj4-t1",
                    "title": "Basic Electronics Engineering — Practice Test 1: Fundamental Concepts",
                    "subject": "Basic Electronics Engineering",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Basic Electronics Engineering."
                  },
                  {
                    "id": "btech-cse-s2-subj4-t2",
                    "title": "Basic Electronics Engineering — Practice Test 2: Exam Simulation",
                    "subject": "Basic Electronics Engineering",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-cse-s2-subj-5",
                "name": "Environmental Science",
                "code": "ES-102",
                "description": "Ecosystems, environmental pollution, and sustainable engineering.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s2-subj5-t1",
                    "title": "Environmental Science — Practice Test 1: Fundamental Concepts",
                    "subject": "Environmental Science",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Environmental Science."
                  },
                  {
                    "id": "btech-cse-s2-subj5-t2",
                    "title": "Environmental Science — Practice Test 2: Exam Simulation",
                    "subject": "Environmental Science",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-3",
            "number": 3,
            "title": "Semester 3",
            "description": "B.Tech (CSE) — Semester 3 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-cse-s3-subj-1",
                "name": "Discrete Mathematics",
                "code": "CS-201",
                "description": "Set theory, propositional logic, graph theory, and combinatorics.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s3-subj1-t1",
                    "title": "Discrete Mathematics — Practice Test 1: Fundamental Concepts",
                    "subject": "Discrete Mathematics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Discrete Mathematics."
                  },
                  {
                    "id": "btech-cse-s3-subj1-t2",
                    "title": "Discrete Mathematics — Practice Test 2: Exam Simulation",
                    "subject": "Discrete Mathematics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-cse-s3-subj-2",
                "name": "Object-Oriented Programming with C++",
                "code": "CS-202",
                "description": "Inheritance, polymorphism, templates, and STL in C++.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s3-subj2-t1",
                    "title": "Object-Oriented Programming with C++ — Practice Test 1: Fundamental Concepts",
                    "subject": "Object-Oriented Programming with C++",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Object-Oriented Programming with C++."
                  },
                  {
                    "id": "btech-cse-s3-subj2-t2",
                    "title": "Object-Oriented Programming with C++ — Practice Test 2: Exam Simulation",
                    "subject": "Object-Oriented Programming with C++",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-cse-s3-subj-3",
                "name": "Digital Logic & Circuit Design",
                "code": "CS-203",
                "description": "Boolean algebra, Karnaugh maps, multiplexers, and flip-flops.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s3-subj3-t1",
                    "title": "Digital Logic & Circuit Design — Practice Test 1: Fundamental Concepts",
                    "subject": "Digital Logic & Circuit Design",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Digital Logic & Circuit Design."
                  },
                  {
                    "id": "btech-cse-s3-subj3-t2",
                    "title": "Digital Logic & Circuit Design — Practice Test 2: Exam Simulation",
                    "subject": "Digital Logic & Circuit Design",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-cse-s3-subj-4",
                "name": "Computer Organization & Architecture",
                "code": "CS-204",
                "description": "Instruction set architecture, pipelining, and cache memory.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s3-subj4-t1",
                    "title": "Computer Organization & Architecture — Practice Test 1: Fundamental Concepts",
                    "subject": "Computer Organization & Architecture",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Computer Organization & Architecture."
                  },
                  {
                    "id": "btech-cse-s3-subj4-t2",
                    "title": "Computer Organization & Architecture — Practice Test 2: Exam Simulation",
                    "subject": "Computer Organization & Architecture",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-4",
            "number": 4,
            "title": "Semester 4",
            "description": "B.Tech (CSE) — Semester 4 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-cse-s4-subj-1",
                "name": "Design and Analysis of Algorithms",
                "code": "CS-205",
                "description": "Divide and conquer, dynamic programming, and greedy algorithms.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s4-subj1-t1",
                    "title": "Design and Analysis of Algorithms — Practice Test 1: Fundamental Concepts",
                    "subject": "Design and Analysis of Algorithms",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Design and Analysis of Algorithms."
                  },
                  {
                    "id": "btech-cse-s4-subj1-t2",
                    "title": "Design and Analysis of Algorithms — Practice Test 2: Exam Simulation",
                    "subject": "Design and Analysis of Algorithms",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-cse-s4-subj-2",
                "name": "Operating Systems",
                "code": "CS-206",
                "description": "Process scheduling, deadlocks, virtual memory, and file systems.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s4-subj2-t1",
                    "title": "Operating Systems — Practice Test 1: Fundamental Concepts",
                    "subject": "Operating Systems",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Operating Systems."
                  },
                  {
                    "id": "btech-cse-s4-subj2-t2",
                    "title": "Operating Systems — Practice Test 2: Exam Simulation",
                    "subject": "Operating Systems",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-cse-s4-subj-3",
                "name": "Database Management Systems",
                "code": "CS-207",
                "description": "Relational algebra, SQL, normalization, and ACID transactions.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s4-subj3-t1",
                    "title": "Database Management Systems — Practice Test 1: Fundamental Concepts",
                    "subject": "Database Management Systems",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Database Management Systems."
                  },
                  {
                    "id": "btech-cse-s4-subj3-t2",
                    "title": "Database Management Systems — Practice Test 2: Exam Simulation",
                    "subject": "Database Management Systems",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-cse-s4-subj-4",
                "name": "Theory of Computation",
                "code": "CS-208",
                "description": "Finite automata, context-free grammars, and Turing machines.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s4-subj4-t1",
                    "title": "Theory of Computation — Practice Test 1: Fundamental Concepts",
                    "subject": "Theory of Computation",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Theory of Computation."
                  },
                  {
                    "id": "btech-cse-s4-subj4-t2",
                    "title": "Theory of Computation — Practice Test 2: Exam Simulation",
                    "subject": "Theory of Computation",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-5",
            "number": 5,
            "title": "Semester 5",
            "description": "B.Tech (CSE) — Semester 5 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-cse-s5-subj-1",
                "name": "Computer Networks",
                "code": "CS-301",
                "description": "OSI layers, TCP/IP, IP addressing, routing protocols, and congestion.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s5-subj1-t1",
                    "title": "Computer Networks — Practice Test 1: Fundamental Concepts",
                    "subject": "Computer Networks",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Computer Networks."
                  },
                  {
                    "id": "btech-cse-s5-subj1-t2",
                    "title": "Computer Networks — Practice Test 2: Exam Simulation",
                    "subject": "Computer Networks",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-cse-s5-subj-2",
                "name": "Compiler Design",
                "code": "CS-302",
                "description": "Lexical analysis, syntax trees, semantic checking, and code generation.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s5-subj2-t1",
                    "title": "Compiler Design — Practice Test 1: Fundamental Concepts",
                    "subject": "Compiler Design",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Compiler Design."
                  },
                  {
                    "id": "btech-cse-s5-subj2-t2",
                    "title": "Compiler Design — Practice Test 2: Exam Simulation",
                    "subject": "Compiler Design",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-cse-s5-subj-3",
                "name": "Web Technologies & Frameworks",
                "code": "CS-303",
                "description": "HTML5, CSS3, modern JavaScript, REST APIs, and responsive design.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s5-subj3-t1",
                    "title": "Web Technologies & Frameworks — Practice Test 1: Fundamental Concepts",
                    "subject": "Web Technologies & Frameworks",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Web Technologies & Frameworks."
                  },
                  {
                    "id": "btech-cse-s5-subj3-t2",
                    "title": "Web Technologies & Frameworks — Practice Test 2: Exam Simulation",
                    "subject": "Web Technologies & Frameworks",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-cse-s5-subj-4",
                "name": "Artificial Intelligence",
                "code": "CS-304",
                "description": "Heuristic search, knowledge representation, game playing, and Bayes nets.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s5-subj4-t1",
                    "title": "Artificial Intelligence — Practice Test 1: Fundamental Concepts",
                    "subject": "Artificial Intelligence",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Artificial Intelligence."
                  },
                  {
                    "id": "btech-cse-s5-subj4-t2",
                    "title": "Artificial Intelligence — Practice Test 2: Exam Simulation",
                    "subject": "Artificial Intelligence",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-6",
            "number": 6,
            "title": "Semester 6",
            "description": "B.Tech (CSE) — Semester 6 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-cse-s6-subj-1",
                "name": "Machine Learning",
                "code": "CS-305",
                "description": "Supervised learning, classification, clustering, and gradient descent.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s6-subj1-t1",
                    "title": "Machine Learning — Practice Test 1: Fundamental Concepts",
                    "subject": "Machine Learning",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Machine Learning."
                  },
                  {
                    "id": "btech-cse-s6-subj1-t2",
                    "title": "Machine Learning — Practice Test 2: Exam Simulation",
                    "subject": "Machine Learning",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-cse-s6-subj-2",
                "name": "Cloud Computing & Distributed Systems",
                "code": "CS-306",
                "description": "Virtualization, microservices, containerization, and AWS/Azure architectures.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s6-subj2-t1",
                    "title": "Cloud Computing & Distributed Systems — Practice Test 1: Fundamental Concepts",
                    "subject": "Cloud Computing & Distributed Systems",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Cloud Computing & Distributed Systems."
                  },
                  {
                    "id": "btech-cse-s6-subj2-t2",
                    "title": "Cloud Computing & Distributed Systems — Practice Test 2: Exam Simulation",
                    "subject": "Cloud Computing & Distributed Systems",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-cse-s6-subj-3",
                "name": "Information & Cyber Security",
                "code": "CS-307",
                "description": "Cryptography, public-key infrastructure, firewalls, and network defense.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s6-subj3-t1",
                    "title": "Information & Cyber Security — Practice Test 1: Fundamental Concepts",
                    "subject": "Information & Cyber Security",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Information & Cyber Security."
                  },
                  {
                    "id": "btech-cse-s6-subj3-t2",
                    "title": "Information & Cyber Security — Practice Test 2: Exam Simulation",
                    "subject": "Information & Cyber Security",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-cse-s6-subj-4",
                "name": "Internet of Things (IoT)",
                "code": "CS-308",
                "description": "Embedded sensors, MQTT/CoAP protocols, and edge analytics.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s6-subj4-t1",
                    "title": "Internet of Things (IoT) — Practice Test 1: Fundamental Concepts",
                    "subject": "Internet of Things (IoT)",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Internet of Things (IoT)."
                  },
                  {
                    "id": "btech-cse-s6-subj4-t2",
                    "title": "Internet of Things (IoT) — Practice Test 2: Exam Simulation",
                    "subject": "Internet of Things (IoT)",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-7",
            "number": 7,
            "title": "Semester 7",
            "description": "B.Tech (CSE) — Semester 7 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-cse-s7-subj-1",
                "name": "Deep Learning & Neural Networks",
                "code": "CS-401",
                "description": "CNNs, RNNs, Transformers, backpropagation, and PyTorch.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s7-subj1-t1",
                    "title": "Deep Learning & Neural Networks — Practice Test 1: Fundamental Concepts",
                    "subject": "Deep Learning & Neural Networks",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Deep Learning & Neural Networks."
                  },
                  {
                    "id": "btech-cse-s7-subj1-t2",
                    "title": "Deep Learning & Neural Networks — Practice Test 2: Exam Simulation",
                    "subject": "Deep Learning & Neural Networks",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-cse-s7-subj-2",
                "name": "Big Data Analytics",
                "code": "CS-402",
                "description": "Hadoop, Spark, MapReduce, and distributed data pipelines.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s7-subj2-t1",
                    "title": "Big Data Analytics — Practice Test 1: Fundamental Concepts",
                    "subject": "Big Data Analytics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Big Data Analytics."
                  },
                  {
                    "id": "btech-cse-s7-subj2-t2",
                    "title": "Big Data Analytics — Practice Test 2: Exam Simulation",
                    "subject": "Big Data Analytics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-cse-s7-subj-3",
                "name": "Mobile Application Development",
                "code": "CS-403",
                "description": "Android SDK, cross-platform frameworks, and mobile UX design.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s7-subj3-t1",
                    "title": "Mobile Application Development — Practice Test 1: Fundamental Concepts",
                    "subject": "Mobile Application Development",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Mobile Application Development."
                  },
                  {
                    "id": "btech-cse-s7-subj3-t2",
                    "title": "Mobile Application Development — Practice Test 2: Exam Simulation",
                    "subject": "Mobile Application Development",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-cse-s7-subj-4",
                "name": "Blockchain Technologies",
                "code": "CS-404",
                "description": "Decentralized consensus, smart contracts, and Ethereum architecture.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s7-subj4-t1",
                    "title": "Blockchain Technologies — Practice Test 1: Fundamental Concepts",
                    "subject": "Blockchain Technologies",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Blockchain Technologies."
                  },
                  {
                    "id": "btech-cse-s7-subj4-t2",
                    "title": "Blockchain Technologies — Practice Test 2: Exam Simulation",
                    "subject": "Blockchain Technologies",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-8",
            "number": 8,
            "title": "Semester 8",
            "description": "B.Tech (CSE) — Semester 8 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-cse-s8-subj-1",
                "name": "Natural Language Processing",
                "code": "CS-405",
                "description": "Tokenization, word embeddings, attention mechanisms, and LLMs.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s8-subj1-t1",
                    "title": "Natural Language Processing — Practice Test 1: Fundamental Concepts",
                    "subject": "Natural Language Processing",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Natural Language Processing."
                  },
                  {
                    "id": "btech-cse-s8-subj1-t2",
                    "title": "Natural Language Processing — Practice Test 2: Exam Simulation",
                    "subject": "Natural Language Processing",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-cse-s8-subj-2",
                "name": "Autonomous Robotics & Control",
                "code": "CS-406",
                "description": "Kinematics, sensor fusion, path planning, and ROS framework.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s8-subj2-t1",
                    "title": "Autonomous Robotics & Control — Practice Test 1: Fundamental Concepts",
                    "subject": "Autonomous Robotics & Control",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Autonomous Robotics & Control."
                  },
                  {
                    "id": "btech-cse-s8-subj2-t2",
                    "title": "Autonomous Robotics & Control — Practice Test 2: Exam Simulation",
                    "subject": "Autonomous Robotics & Control",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-cse-s8-subj-3",
                "name": "Quantum Computing Fundamentals",
                "code": "CS-407",
                "description": "Qubits, quantum gates, entanglement, and Shor’s algorithm.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s8-subj3-t1",
                    "title": "Quantum Computing Fundamentals — Practice Test 1: Fundamental Concepts",
                    "subject": "Quantum Computing Fundamentals",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Quantum Computing Fundamentals."
                  },
                  {
                    "id": "btech-cse-s8-subj3-t2",
                    "title": "Quantum Computing Fundamentals — Practice Test 2: Exam Simulation",
                    "subject": "Quantum Computing Fundamentals",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-cse-s8-subj-4",
                "name": "Capstone Engineering Project & Viva",
                "code": "CS-408",
                "description": "Comprehensive technical review, system defense, and practical assessment.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-cse-s8-subj4-t1",
                    "title": "Capstone Engineering Project & Viva — Practice Test 1: Fundamental Concepts",
                    "subject": "Capstone Engineering Project & Viva",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Capstone Engineering Project & Viva."
                  },
                  {
                    "id": "btech-cse-s8-subj4-t2",
                    "title": "Capstone Engineering Project & Viva — Practice Test 2: Exam Simulation",
                    "subject": "Capstone Engineering Project & Viva",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "ece",
        "name": "Electronics & Communication",
        "code": "ECE",
        "description": "Semiconductor devices, analog & digital communication, VLSI, signal processing, and embedded systems.",
        "totalSemesters": 8,
        "totalMockTests": 58,
        "semesters": [
          {
            "id": "semester-1",
            "number": 1,
            "title": "Semester 1",
            "description": "B.Tech (ECE) — Semester 1 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-ece-s1-subj-1",
                "name": "Engineering Mathematics I",
                "code": "MA-101",
                "description": "Differential calculus, matrices, and analytical geometry.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s1-subj1-t1",
                    "title": "Engineering Mathematics I — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Mathematics I",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Mathematics I."
                  },
                  {
                    "id": "btech-ece-s1-subj1-t2",
                    "title": "Engineering Mathematics I — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Mathematics I",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ece-s1-subj-2",
                "name": "Engineering Physics",
                "code": "PH-101",
                "description": "Optics, quantum mechanics, and semiconductors.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s1-subj2-t1",
                    "title": "Engineering Physics — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Physics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Physics."
                  },
                  {
                    "id": "btech-ece-s1-subj2-t2",
                    "title": "Engineering Physics — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Physics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ece-s1-subj-3",
                "name": "Basic Electrical Engineering",
                "code": "EE-101",
                "description": "AC/DC circuits, transformers, and electrical machines.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s1-subj3-t1",
                    "title": "Basic Electrical Engineering — Practice Test 1: Fundamental Concepts",
                    "subject": "Basic Electrical Engineering",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Basic Electrical Engineering."
                  },
                  {
                    "id": "btech-ece-s1-subj3-t2",
                    "title": "Basic Electrical Engineering — Practice Test 2: Exam Simulation",
                    "subject": "Basic Electrical Engineering",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ece-s1-subj-4",
                "name": "Programming for Problem Solving in C",
                "code": "CS-101",
                "description": "Procedural programming, pointers, and memory layout.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s1-subj4-t1",
                    "title": "Programming for Problem Solving in C — Practice Test 1: Fundamental Concepts",
                    "subject": "Programming for Problem Solving in C",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Programming for Problem Solving in C."
                  },
                  {
                    "id": "btech-ece-s1-subj4-t2",
                    "title": "Programming for Problem Solving in C — Practice Test 2: Exam Simulation",
                    "subject": "Programming for Problem Solving in C",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-2",
            "number": 2,
            "title": "Semester 2",
            "description": "B.Tech (ECE) — Semester 2 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-ece-s2-subj-1",
                "name": "Engineering Mathematics II",
                "code": "MA-102",
                "description": "Vector calculus and differential equations.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s2-subj1-t1",
                    "title": "Engineering Mathematics II — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Mathematics II",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Mathematics II."
                  },
                  {
                    "id": "btech-ece-s2-subj1-t2",
                    "title": "Engineering Mathematics II — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Mathematics II",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ece-s2-subj-2",
                "name": "Electronic Devices & Circuits",
                "code": "EC-101",
                "description": "PN diodes, BJTs, MOSFETs, and amplifier biasing.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s2-subj2-t1",
                    "title": "Electronic Devices & Circuits — Practice Test 1: Fundamental Concepts",
                    "subject": "Electronic Devices & Circuits",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Electronic Devices & Circuits."
                  },
                  {
                    "id": "btech-ece-s2-subj2-t2",
                    "title": "Electronic Devices & Circuits — Practice Test 2: Exam Simulation",
                    "subject": "Electronic Devices & Circuits",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ece-s2-subj-3",
                "name": "Network Analysis & Synthesis",
                "code": "EC-102",
                "description": "Two-port networks, resonance, and Laplace circuit analysis.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s2-subj3-t1",
                    "title": "Network Analysis & Synthesis — Practice Test 1: Fundamental Concepts",
                    "subject": "Network Analysis & Synthesis",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Network Analysis & Synthesis."
                  },
                  {
                    "id": "btech-ece-s2-subj3-t2",
                    "title": "Network Analysis & Synthesis — Practice Test 2: Exam Simulation",
                    "subject": "Network Analysis & Synthesis",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ece-s2-subj-4",
                "name": "Engineering Chemistry",
                "code": "CH-102",
                "description": "Electrochemistry and engineering materials.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s2-subj4-t1",
                    "title": "Engineering Chemistry — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Chemistry",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Chemistry."
                  },
                  {
                    "id": "btech-ece-s2-subj4-t2",
                    "title": "Engineering Chemistry — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Chemistry",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-3",
            "number": 3,
            "title": "Semester 3",
            "description": "B.Tech (ECE) — Semester 3 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-ece-s3-subj-1",
                "name": "Analog Electronic Circuits",
                "code": "EC-201",
                "description": "Operational amplifiers, feedback circuits, and oscillators.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s3-subj1-t1",
                    "title": "Analog Electronic Circuits — Practice Test 1: Fundamental Concepts",
                    "subject": "Analog Electronic Circuits",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Analog Electronic Circuits."
                  },
                  {
                    "id": "btech-ece-s3-subj1-t2",
                    "title": "Analog Electronic Circuits — Practice Test 2: Exam Simulation",
                    "subject": "Analog Electronic Circuits",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ece-s3-subj-2",
                "name": "Signals and Systems",
                "code": "EC-202",
                "description": "Continuous and discrete Fourier, Laplace, and Z-transforms.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s3-subj2-t1",
                    "title": "Signals and Systems — Practice Test 1: Fundamental Concepts",
                    "subject": "Signals and Systems",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Signals and Systems."
                  },
                  {
                    "id": "btech-ece-s3-subj2-t2",
                    "title": "Signals and Systems — Practice Test 2: Exam Simulation",
                    "subject": "Signals and Systems",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ece-s3-subj-3",
                "name": "Digital Circuit Design",
                "code": "EC-203",
                "description": "Sequential logic, finite state machines, and HDL design.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s3-subj3-t1",
                    "title": "Digital Circuit Design — Practice Test 1: Fundamental Concepts",
                    "subject": "Digital Circuit Design",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Digital Circuit Design."
                  },
                  {
                    "id": "btech-ece-s3-subj3-t2",
                    "title": "Digital Circuit Design — Practice Test 2: Exam Simulation",
                    "subject": "Digital Circuit Design",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ece-s3-subj-4",
                "name": "Electromagnetic Field Theory",
                "code": "EC-204",
                "description": "Maxwell’s equations, wave propagation, and transmission lines.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s3-subj4-t1",
                    "title": "Electromagnetic Field Theory — Practice Test 1: Fundamental Concepts",
                    "subject": "Electromagnetic Field Theory",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Electromagnetic Field Theory."
                  },
                  {
                    "id": "btech-ece-s3-subj4-t2",
                    "title": "Electromagnetic Field Theory — Practice Test 2: Exam Simulation",
                    "subject": "Electromagnetic Field Theory",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-4",
            "number": 4,
            "title": "Semester 4",
            "description": "B.Tech (ECE) — Semester 4 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-ece-s4-subj-1",
                "name": "Analog Communication",
                "code": "EC-205",
                "description": "AM, FM, PM modulators, receivers, and noise analysis.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s4-subj1-t1",
                    "title": "Analog Communication — Practice Test 1: Fundamental Concepts",
                    "subject": "Analog Communication",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Analog Communication."
                  },
                  {
                    "id": "btech-ece-s4-subj1-t2",
                    "title": "Analog Communication — Practice Test 2: Exam Simulation",
                    "subject": "Analog Communication",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ece-s4-subj-2",
                "name": "Microprocessors & Microcontrollers",
                "code": "EC-206",
                "description": "8085/8086 architectures, ARM Cortex, and assembly interfacing.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s4-subj2-t1",
                    "title": "Microprocessors & Microcontrollers — Practice Test 1: Fundamental Concepts",
                    "subject": "Microprocessors & Microcontrollers",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Microprocessors & Microcontrollers."
                  },
                  {
                    "id": "btech-ece-s4-subj2-t2",
                    "title": "Microprocessors & Microcontrollers — Practice Test 2: Exam Simulation",
                    "subject": "Microprocessors & Microcontrollers",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ece-s4-subj-3",
                "name": "Linear Integrated Circuits",
                "code": "EC-207",
                "description": "555 timers, phase-locked loops, and active filters.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s4-subj3-t1",
                    "title": "Linear Integrated Circuits — Practice Test 1: Fundamental Concepts",
                    "subject": "Linear Integrated Circuits",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Linear Integrated Circuits."
                  },
                  {
                    "id": "btech-ece-s4-subj3-t2",
                    "title": "Linear Integrated Circuits — Practice Test 2: Exam Simulation",
                    "subject": "Linear Integrated Circuits",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ece-s4-subj-4",
                "name": "Control Systems Engineering",
                "code": "EC-208",
                "description": "Root locus, Nyquist plots, Bode diagrams, and state-space models.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s4-subj4-t1",
                    "title": "Control Systems Engineering — Practice Test 1: Fundamental Concepts",
                    "subject": "Control Systems Engineering",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Control Systems Engineering."
                  },
                  {
                    "id": "btech-ece-s4-subj4-t2",
                    "title": "Control Systems Engineering — Practice Test 2: Exam Simulation",
                    "subject": "Control Systems Engineering",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-5",
            "number": 5,
            "title": "Semester 5",
            "description": "B.Tech (ECE) — Semester 5 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-ece-s5-subj-1",
                "name": "Digital Signal Processing",
                "code": "EC-301",
                "description": "FFT algorithms, FIR/IIR filter design, and DSP processors.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s5-subj1-t1",
                    "title": "Digital Signal Processing — Practice Test 1: Fundamental Concepts",
                    "subject": "Digital Signal Processing",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Digital Signal Processing."
                  },
                  {
                    "id": "btech-ece-s5-subj1-t2",
                    "title": "Digital Signal Processing — Practice Test 2: Exam Simulation",
                    "subject": "Digital Signal Processing",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ece-s5-subj-2",
                "name": "Digital Communication Systems",
                "code": "EC-302",
                "description": "PCM, QAM, information theory, and error-correcting codes.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s5-subj2-t1",
                    "title": "Digital Communication Systems — Practice Test 1: Fundamental Concepts",
                    "subject": "Digital Communication Systems",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Digital Communication Systems."
                  },
                  {
                    "id": "btech-ece-s5-subj2-t2",
                    "title": "Digital Communication Systems — Practice Test 2: Exam Simulation",
                    "subject": "Digital Communication Systems",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ece-s5-subj-3",
                "name": "Antenna & Wave Propagation",
                "code": "EC-303",
                "description": "Radiation patterns, dipole antennas, and ionospheric propagation.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s5-subj3-t1",
                    "title": "Antenna & Wave Propagation — Practice Test 1: Fundamental Concepts",
                    "subject": "Antenna & Wave Propagation",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Antenna & Wave Propagation."
                  },
                  {
                    "id": "btech-ece-s5-subj3-t2",
                    "title": "Antenna & Wave Propagation — Practice Test 2: Exam Simulation",
                    "subject": "Antenna & Wave Propagation",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ece-s5-subj-4",
                "name": "VLSI Design Fundamentals",
                "code": "EC-304",
                "description": "CMOS logic gates, layout rules, and delay estimation.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s5-subj4-t1",
                    "title": "VLSI Design Fundamentals — Practice Test 1: Fundamental Concepts",
                    "subject": "VLSI Design Fundamentals",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in VLSI Design Fundamentals."
                  },
                  {
                    "id": "btech-ece-s5-subj4-t2",
                    "title": "VLSI Design Fundamentals — Practice Test 2: Exam Simulation",
                    "subject": "VLSI Design Fundamentals",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-6",
            "number": 6,
            "title": "Semester 6",
            "description": "B.Tech (ECE) — Semester 6 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-ece-s6-subj-1",
                "name": "Microwave & Radar Engineering",
                "code": "EC-305",
                "description": "Waveguides, klystrons, radar equation, and MTI radar.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s6-subj1-t1",
                    "title": "Microwave & Radar Engineering — Practice Test 1: Fundamental Concepts",
                    "subject": "Microwave & Radar Engineering",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Microwave & Radar Engineering."
                  },
                  {
                    "id": "btech-ece-s6-subj1-t2",
                    "title": "Microwave & Radar Engineering — Practice Test 2: Exam Simulation",
                    "subject": "Microwave & Radar Engineering",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ece-s6-subj-2",
                "name": "Embedded Systems & RTOS",
                "code": "EC-306",
                "description": "Real-time operating systems, device drivers, and I2C/SPI.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s6-subj2-t1",
                    "title": "Embedded Systems & RTOS — Practice Test 1: Fundamental Concepts",
                    "subject": "Embedded Systems & RTOS",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Embedded Systems & RTOS."
                  },
                  {
                    "id": "btech-ece-s6-subj2-t2",
                    "title": "Embedded Systems & RTOS — Practice Test 2: Exam Simulation",
                    "subject": "Embedded Systems & RTOS",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ece-s6-subj-3",
                "name": "Wireless & Cellular Communication",
                "code": "EC-307",
                "description": "Cellular geometry, 4G LTE/5G standards, and fading channels.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s6-subj3-t1",
                    "title": "Wireless & Cellular Communication — Practice Test 1: Fundamental Concepts",
                    "subject": "Wireless & Cellular Communication",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Wireless & Cellular Communication."
                  },
                  {
                    "id": "btech-ece-s6-subj3-t2",
                    "title": "Wireless & Cellular Communication — Practice Test 2: Exam Simulation",
                    "subject": "Wireless & Cellular Communication",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ece-s6-subj-4",
                "name": "Optical Fiber Communications",
                "code": "EC-308",
                "description": "Fiber attenuation, dispersion, lasers, and optical receivers.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s6-subj4-t1",
                    "title": "Optical Fiber Communications — Practice Test 1: Fundamental Concepts",
                    "subject": "Optical Fiber Communications",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Optical Fiber Communications."
                  },
                  {
                    "id": "btech-ece-s6-subj4-t2",
                    "title": "Optical Fiber Communications — Practice Test 2: Exam Simulation",
                    "subject": "Optical Fiber Communications",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-7",
            "number": 7,
            "title": "Semester 7",
            "description": "B.Tech (ECE) — Semester 7 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "btech-ece-s7-subj-1",
                "name": "Satellite Communication Systems",
                "code": "EC-401",
                "description": "Orbital mechanics, link budget calculation, and earth stations.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s7-subj1-t1",
                    "title": "Satellite Communication Systems — Practice Test 1: Fundamental Concepts",
                    "subject": "Satellite Communication Systems",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Satellite Communication Systems."
                  },
                  {
                    "id": "btech-ece-s7-subj1-t2",
                    "title": "Satellite Communication Systems — Practice Test 2: Exam Simulation",
                    "subject": "Satellite Communication Systems",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ece-s7-subj-2",
                "name": "RF Circuit Design",
                "code": "EC-402",
                "description": "Smith charts, impedance matching, and high-frequency amplifiers.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s7-subj2-t1",
                    "title": "RF Circuit Design — Practice Test 1: Fundamental Concepts",
                    "subject": "RF Circuit Design",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in RF Circuit Design."
                  },
                  {
                    "id": "btech-ece-s7-subj2-t2",
                    "title": "RF Circuit Design — Practice Test 2: Exam Simulation",
                    "subject": "RF Circuit Design",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ece-s7-subj-3",
                "name": "Biomedical Signal Processing",
                "code": "EC-403",
                "description": "ECG/EEG analysis, noise filtering, and medical telemetry.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s7-subj3-t1",
                    "title": "Biomedical Signal Processing — Practice Test 1: Fundamental Concepts",
                    "subject": "Biomedical Signal Processing",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Biomedical Signal Processing."
                  },
                  {
                    "id": "btech-ece-s7-subj3-t2",
                    "title": "Biomedical Signal Processing — Practice Test 2: Exam Simulation",
                    "subject": "Biomedical Signal Processing",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-8",
            "number": 8,
            "title": "Semester 8",
            "description": "B.Tech (ECE) — Semester 8 subjects, mock tests, and exam practice.",
            "availableTestsCount": 4,
            "subjects": [
              {
                "id": "btech-ece-s8-subj-1",
                "name": "Advanced Semiconductor Devices",
                "code": "EC-404",
                "description": "FinFETs, quantum-well devices, and nanoelectronics.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s8-subj1-t1",
                    "title": "Advanced Semiconductor Devices — Practice Test 1: Fundamental Concepts",
                    "subject": "Advanced Semiconductor Devices",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Advanced Semiconductor Devices."
                  },
                  {
                    "id": "btech-ece-s8-subj1-t2",
                    "title": "Advanced Semiconductor Devices — Practice Test 2: Exam Simulation",
                    "subject": "Advanced Semiconductor Devices",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ece-s8-subj-2",
                "name": "Major Technical Project & Seminar",
                "code": "EC-405",
                "description": "Comprehensive prototype design, technical report, and oral defense.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ece-s8-subj2-t1",
                    "title": "Major Technical Project & Seminar — Practice Test 1: Fundamental Concepts",
                    "subject": "Major Technical Project & Seminar",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Major Technical Project & Seminar."
                  },
                  {
                    "id": "btech-ece-s8-subj2-t2",
                    "title": "Major Technical Project & Seminar — Practice Test 2: Exam Simulation",
                    "subject": "Major Technical Project & Seminar",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "me",
        "name": "Mechanical Engineering",
        "code": "ME",
        "description": "Thermodynamics, fluid mechanics, machine design, manufacturing processes, and robotics.",
        "totalSemesters": 8,
        "totalMockTests": 60,
        "semesters": [
          {
            "id": "semester-1",
            "number": 1,
            "title": "Semester 1",
            "description": "B.Tech (ME) — Semester 1 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-me-s1-subj-1",
                "name": "Engineering Mathematics I",
                "code": "MA-101",
                "description": "Differential calculus, matrices, and vectors.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s1-subj1-t1",
                    "title": "Engineering Mathematics I — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Mathematics I",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Mathematics I."
                  },
                  {
                    "id": "btech-me-s1-subj1-t2",
                    "title": "Engineering Mathematics I — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Mathematics I",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-me-s1-subj-2",
                "name": "Engineering Physics",
                "code": "PH-101",
                "description": "Mechanics, wave optics, and thermal properties.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s1-subj2-t1",
                    "title": "Engineering Physics — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Physics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Physics."
                  },
                  {
                    "id": "btech-me-s1-subj2-t2",
                    "title": "Engineering Physics — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Physics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-me-s1-subj-3",
                "name": "Engineering Graphics & Drawing",
                "code": "ME-101",
                "description": "Projection of solids, sectioning, and machine drawing.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s1-subj3-t1",
                    "title": "Engineering Graphics & Drawing — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Graphics & Drawing",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Graphics & Drawing."
                  },
                  {
                    "id": "btech-me-s1-subj3-t2",
                    "title": "Engineering Graphics & Drawing — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Graphics & Drawing",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-me-s1-subj-4",
                "name": "Workshop Practice & Manufacturing",
                "code": "ME-102",
                "description": "Fitting, welding, machining, and foundry techniques.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s1-subj4-t1",
                    "title": "Workshop Practice & Manufacturing — Practice Test 1: Fundamental Concepts",
                    "subject": "Workshop Practice & Manufacturing",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Workshop Practice & Manufacturing."
                  },
                  {
                    "id": "btech-me-s1-subj4-t2",
                    "title": "Workshop Practice & Manufacturing — Practice Test 2: Exam Simulation",
                    "subject": "Workshop Practice & Manufacturing",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-2",
            "number": 2,
            "title": "Semester 2",
            "description": "B.Tech (ME) — Semester 2 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-me-s2-subj-1",
                "name": "Engineering Mathematics II",
                "code": "MA-102",
                "description": "Multivariable calculus and differential equations.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s2-subj1-t1",
                    "title": "Engineering Mathematics II — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Mathematics II",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Mathematics II."
                  },
                  {
                    "id": "btech-me-s2-subj1-t2",
                    "title": "Engineering Mathematics II — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Mathematics II",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-me-s2-subj-2",
                "name": "Engineering Chemistry",
                "code": "CH-102",
                "description": "Fuels, combustion, lubricants, and corrosion science.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s2-subj2-t1",
                    "title": "Engineering Chemistry — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Chemistry",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Chemistry."
                  },
                  {
                    "id": "btech-me-s2-subj2-t2",
                    "title": "Engineering Chemistry — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Chemistry",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-me-s2-subj-3",
                "name": "Basic Electrical & Electronics",
                "code": "EE-102",
                "description": "Circuit analysis, DC motors, and electronic switches.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s2-subj3-t1",
                    "title": "Basic Electrical & Electronics — Practice Test 1: Fundamental Concepts",
                    "subject": "Basic Electrical & Electronics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Basic Electrical & Electronics."
                  },
                  {
                    "id": "btech-me-s2-subj3-t2",
                    "title": "Basic Electrical & Electronics — Practice Test 2: Exam Simulation",
                    "subject": "Basic Electrical & Electronics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-me-s2-subj-4",
                "name": "Engineering Mechanics",
                "code": "ME-103",
                "description": "Statics, dynamics, friction, and moment of inertia.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s2-subj4-t1",
                    "title": "Engineering Mechanics — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Mechanics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Mechanics."
                  },
                  {
                    "id": "btech-me-s2-subj4-t2",
                    "title": "Engineering Mechanics — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Mechanics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-3",
            "number": 3,
            "title": "Semester 3",
            "description": "B.Tech (ME) — Semester 3 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-me-s3-subj-1",
                "name": "Engineering Thermodynamics",
                "code": "ME-201",
                "description": "First and second laws, entropy, and pure substance behavior.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s3-subj1-t1",
                    "title": "Engineering Thermodynamics — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Thermodynamics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Thermodynamics."
                  },
                  {
                    "id": "btech-me-s3-subj1-t2",
                    "title": "Engineering Thermodynamics — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Thermodynamics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-me-s3-subj-2",
                "name": "Strength of Materials",
                "code": "ME-202",
                "description": "Stress, strain, Mohr’s circle, shear force, and bending moments.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s3-subj2-t1",
                    "title": "Strength of Materials — Practice Test 1: Fundamental Concepts",
                    "subject": "Strength of Materials",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Strength of Materials."
                  },
                  {
                    "id": "btech-me-s3-subj2-t2",
                    "title": "Strength of Materials — Practice Test 2: Exam Simulation",
                    "subject": "Strength of Materials",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-me-s3-subj-3",
                "name": "Material Science & Metallurgy",
                "code": "ME-203",
                "description": "Iron-carbon phase diagram, heat treatment, and crystal structures.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s3-subj3-t1",
                    "title": "Material Science & Metallurgy — Practice Test 1: Fundamental Concepts",
                    "subject": "Material Science & Metallurgy",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Material Science & Metallurgy."
                  },
                  {
                    "id": "btech-me-s3-subj3-t2",
                    "title": "Material Science & Metallurgy — Practice Test 2: Exam Simulation",
                    "subject": "Material Science & Metallurgy",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-me-s3-subj-4",
                "name": "Machine Drawing & Solid Modeling",
                "code": "ME-204",
                "description": "Fasteners, couplings, 3D modeling, and assembly blueprints.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s3-subj4-t1",
                    "title": "Machine Drawing & Solid Modeling — Practice Test 1: Fundamental Concepts",
                    "subject": "Machine Drawing & Solid Modeling",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Machine Drawing & Solid Modeling."
                  },
                  {
                    "id": "btech-me-s3-subj4-t2",
                    "title": "Machine Drawing & Solid Modeling — Practice Test 2: Exam Simulation",
                    "subject": "Machine Drawing & Solid Modeling",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-4",
            "number": 4,
            "title": "Semester 4",
            "description": "B.Tech (ME) — Semester 4 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-me-s4-subj-1",
                "name": "Fluid Mechanics & Hydraulic Machinery",
                "code": "ME-205",
                "description": "Bernoulli’s theorem, boundary layer, pumps, and turbines.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s4-subj1-t1",
                    "title": "Fluid Mechanics & Hydraulic Machinery — Practice Test 1: Fundamental Concepts",
                    "subject": "Fluid Mechanics & Hydraulic Machinery",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Fluid Mechanics & Hydraulic Machinery."
                  },
                  {
                    "id": "btech-me-s4-subj1-t2",
                    "title": "Fluid Mechanics & Hydraulic Machinery — Practice Test 2: Exam Simulation",
                    "subject": "Fluid Mechanics & Hydraulic Machinery",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-me-s4-subj-2",
                "name": "Kinematics of Machinery",
                "code": "ME-206",
                "description": "Velocity and acceleration diagrams, cams, and gear trains.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s4-subj2-t1",
                    "title": "Kinematics of Machinery — Practice Test 1: Fundamental Concepts",
                    "subject": "Kinematics of Machinery",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Kinematics of Machinery."
                  },
                  {
                    "id": "btech-me-s4-subj2-t2",
                    "title": "Kinematics of Machinery — Practice Test 2: Exam Simulation",
                    "subject": "Kinematics of Machinery",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-me-s4-subj-3",
                "name": "Manufacturing Processes I",
                "code": "ME-207",
                "description": "Metal casting, forming, joining, and powder metallurgy.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s4-subj3-t1",
                    "title": "Manufacturing Processes I — Practice Test 1: Fundamental Concepts",
                    "subject": "Manufacturing Processes I",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Manufacturing Processes I."
                  },
                  {
                    "id": "btech-me-s4-subj3-t2",
                    "title": "Manufacturing Processes I — Practice Test 2: Exam Simulation",
                    "subject": "Manufacturing Processes I",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-me-s4-subj-4",
                "name": "Applied Mathematics for Mechanical",
                "code": "MA-208",
                "description": "Numerical methods and partial differential equations.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s4-subj4-t1",
                    "title": "Applied Mathematics for Mechanical — Practice Test 1: Fundamental Concepts",
                    "subject": "Applied Mathematics for Mechanical",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Applied Mathematics for Mechanical."
                  },
                  {
                    "id": "btech-me-s4-subj4-t2",
                    "title": "Applied Mathematics for Mechanical — Practice Test 2: Exam Simulation",
                    "subject": "Applied Mathematics for Mechanical",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-5",
            "number": 5,
            "title": "Semester 5",
            "description": "B.Tech (ME) — Semester 5 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-me-s5-subj-1",
                "name": "Dynamics of Machinery",
                "code": "ME-301",
                "description": "Balancing of rotating masses, vibrations, and gyroscopes.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s5-subj1-t1",
                    "title": "Dynamics of Machinery — Practice Test 1: Fundamental Concepts",
                    "subject": "Dynamics of Machinery",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Dynamics of Machinery."
                  },
                  {
                    "id": "btech-me-s5-subj1-t2",
                    "title": "Dynamics of Machinery — Practice Test 2: Exam Simulation",
                    "subject": "Dynamics of Machinery",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-me-s5-subj-2",
                "name": "Heat and Mass Transfer",
                "code": "ME-302",
                "description": "Conduction, convection, radiation, and heat exchangers.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s5-subj2-t1",
                    "title": "Heat and Mass Transfer — Practice Test 1: Fundamental Concepts",
                    "subject": "Heat and Mass Transfer",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Heat and Mass Transfer."
                  },
                  {
                    "id": "btech-me-s5-subj2-t2",
                    "title": "Heat and Mass Transfer — Practice Test 2: Exam Simulation",
                    "subject": "Heat and Mass Transfer",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-me-s5-subj-3",
                "name": "Design of Machine Elements",
                "code": "ME-303",
                "description": "Fatigue design, shafts, bearings, springs, and gears.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s5-subj3-t1",
                    "title": "Design of Machine Elements — Practice Test 1: Fundamental Concepts",
                    "subject": "Design of Machine Elements",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Design of Machine Elements."
                  },
                  {
                    "id": "btech-me-s5-subj3-t2",
                    "title": "Design of Machine Elements — Practice Test 2: Exam Simulation",
                    "subject": "Design of Machine Elements",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-me-s5-subj-4",
                "name": "Machining Sciences & Machine Tools",
                "code": "ME-304",
                "description": "Orthogonal cutting, tool life, and CNC machining.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s5-subj4-t1",
                    "title": "Machining Sciences & Machine Tools — Practice Test 1: Fundamental Concepts",
                    "subject": "Machining Sciences & Machine Tools",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Machining Sciences & Machine Tools."
                  },
                  {
                    "id": "btech-me-s5-subj4-t2",
                    "title": "Machining Sciences & Machine Tools — Practice Test 2: Exam Simulation",
                    "subject": "Machining Sciences & Machine Tools",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-6",
            "number": 6,
            "title": "Semester 6",
            "description": "B.Tech (ME) — Semester 6 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-me-s6-subj-1",
                "name": "Internal Combustion Engines & Gas Turbines",
                "code": "ME-305",
                "description": "Otto, Diesel, Dual cycles, emissions, and turbocharging.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s6-subj1-t1",
                    "title": "Internal Combustion Engines & Gas Turbines — Practice Test 1: Fundamental Concepts",
                    "subject": "Internal Combustion Engines & Gas Turbines",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Internal Combustion Engines & Gas Turbines."
                  },
                  {
                    "id": "btech-me-s6-subj1-t2",
                    "title": "Internal Combustion Engines & Gas Turbines — Practice Test 2: Exam Simulation",
                    "subject": "Internal Combustion Engines & Gas Turbines",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-me-s6-subj-2",
                "name": "Refrigeration & Air Conditioning",
                "code": "ME-306",
                "description": "Vapor compression, psychrometry, and cooling load analysis.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s6-subj2-t1",
                    "title": "Refrigeration & Air Conditioning — Practice Test 1: Fundamental Concepts",
                    "subject": "Refrigeration & Air Conditioning",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Refrigeration & Air Conditioning."
                  },
                  {
                    "id": "btech-me-s6-subj2-t2",
                    "title": "Refrigeration & Air Conditioning — Practice Test 2: Exam Simulation",
                    "subject": "Refrigeration & Air Conditioning",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-me-s6-subj-3",
                "name": "Finite Element Analysis (FEA)",
                "code": "ME-307",
                "description": "1D/2D structural elements, stiffness matrices, and ANSYS modeling.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s6-subj3-t1",
                    "title": "Finite Element Analysis (FEA) — Practice Test 1: Fundamental Concepts",
                    "subject": "Finite Element Analysis (FEA)",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Finite Element Analysis (FEA)."
                  },
                  {
                    "id": "btech-me-s6-subj3-t2",
                    "title": "Finite Element Analysis (FEA) — Practice Test 2: Exam Simulation",
                    "subject": "Finite Element Analysis (FEA)",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-me-s6-subj-4",
                "name": "Metrology and Quality Control",
                "code": "ME-308",
                "description": "Interferometry, surface finish, CMM, and statistical quality control.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s6-subj4-t1",
                    "title": "Metrology and Quality Control — Practice Test 1: Fundamental Concepts",
                    "subject": "Metrology and Quality Control",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Metrology and Quality Control."
                  },
                  {
                    "id": "btech-me-s6-subj4-t2",
                    "title": "Metrology and Quality Control — Practice Test 2: Exam Simulation",
                    "subject": "Metrology and Quality Control",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-7",
            "number": 7,
            "title": "Semester 7",
            "description": "B.Tech (ME) — Semester 7 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "btech-me-s7-subj-1",
                "name": "CAD / CAM / CIM",
                "code": "ME-401",
                "description": "Geometric modeling, NC code generation, and flexible manufacturing.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s7-subj1-t1",
                    "title": "CAD / CAM / CIM — Practice Test 1: Fundamental Concepts",
                    "subject": "CAD / CAM / CIM",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in CAD / CAM / CIM."
                  },
                  {
                    "id": "btech-me-s7-subj1-t2",
                    "title": "CAD / CAM / CIM — Practice Test 2: Exam Simulation",
                    "subject": "CAD / CAM / CIM",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-me-s7-subj-2",
                "name": "Power Plant Engineering",
                "code": "ME-402",
                "description": "Thermal, nuclear, and hydro power systems analysis.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s7-subj2-t1",
                    "title": "Power Plant Engineering — Practice Test 1: Fundamental Concepts",
                    "subject": "Power Plant Engineering",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Power Plant Engineering."
                  },
                  {
                    "id": "btech-me-s7-subj2-t2",
                    "title": "Power Plant Engineering — Practice Test 2: Exam Simulation",
                    "subject": "Power Plant Engineering",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-me-s7-subj-3",
                "name": "Automobile Engineering",
                "code": "ME-403",
                "description": "Chassis, transmission systems, steering geometry, and EV powertrains.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s7-subj3-t1",
                    "title": "Automobile Engineering — Practice Test 1: Fundamental Concepts",
                    "subject": "Automobile Engineering",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Automobile Engineering."
                  },
                  {
                    "id": "btech-me-s7-subj3-t2",
                    "title": "Automobile Engineering — Practice Test 2: Exam Simulation",
                    "subject": "Automobile Engineering",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-8",
            "number": 8,
            "title": "Semester 8",
            "description": "B.Tech (ME) — Semester 8 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "btech-me-s8-subj-1",
                "name": "Robotics and Industrial Automation",
                "code": "ME-404",
                "description": "Robot kinematics, pneumatic actuators, and PLC programming.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s8-subj1-t1",
                    "title": "Robotics and Industrial Automation — Practice Test 1: Fundamental Concepts",
                    "subject": "Robotics and Industrial Automation",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Robotics and Industrial Automation."
                  },
                  {
                    "id": "btech-me-s8-subj1-t2",
                    "title": "Robotics and Industrial Automation — Practice Test 2: Exam Simulation",
                    "subject": "Robotics and Industrial Automation",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-me-s8-subj-2",
                "name": "Renewable Energy Systems",
                "code": "ME-405",
                "description": "Solar thermal, photovoltaic, wind turbines, and biomass.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s8-subj2-t1",
                    "title": "Renewable Energy Systems — Practice Test 1: Fundamental Concepts",
                    "subject": "Renewable Energy Systems",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Renewable Energy Systems."
                  },
                  {
                    "id": "btech-me-s8-subj2-t2",
                    "title": "Renewable Energy Systems — Practice Test 2: Exam Simulation",
                    "subject": "Renewable Energy Systems",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-me-s8-subj-3",
                "name": "Major Engineering Project",
                "code": "ME-406",
                "description": "Design fabrication, testing, and comprehensive defense.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-me-s8-subj3-t1",
                    "title": "Major Engineering Project — Practice Test 1: Fundamental Concepts",
                    "subject": "Major Engineering Project",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Major Engineering Project."
                  },
                  {
                    "id": "btech-me-s8-subj3-t2",
                    "title": "Major Engineering Project — Practice Test 2: Exam Simulation",
                    "subject": "Major Engineering Project",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "ee",
        "name": "Electrical Engineering",
        "code": "EE",
        "description": "Electric circuits, electrical machines, power systems, control engineering, and power electronics.",
        "totalSemesters": 8,
        "totalMockTests": 58,
        "semesters": [
          {
            "id": "semester-1",
            "number": 1,
            "title": "Semester 1",
            "description": "B.Tech (EE) — Semester 1 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-ee-s1-subj-1",
                "name": "Engineering Mathematics I",
                "code": "MA-101",
                "description": "Calculus, matrices, and coordinate geometry.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s1-subj1-t1",
                    "title": "Engineering Mathematics I — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Mathematics I",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Mathematics I."
                  },
                  {
                    "id": "btech-ee-s1-subj1-t2",
                    "title": "Engineering Mathematics I — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Mathematics I",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ee-s1-subj-2",
                "name": "Engineering Physics",
                "code": "PH-101",
                "description": "Electromagnetic theory, optics, and solid-state physics.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s1-subj2-t1",
                    "title": "Engineering Physics — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Physics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Physics."
                  },
                  {
                    "id": "btech-ee-s1-subj2-t2",
                    "title": "Engineering Physics — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Physics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ee-s1-subj-3",
                "name": "Basic Electrical Engineering",
                "code": "EE-101",
                "description": "DC network theorems, magnetic circuits, and single-phase AC.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s1-subj3-t1",
                    "title": "Basic Electrical Engineering — Practice Test 1: Fundamental Concepts",
                    "subject": "Basic Electrical Engineering",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Basic Electrical Engineering."
                  },
                  {
                    "id": "btech-ee-s1-subj3-t2",
                    "title": "Basic Electrical Engineering — Practice Test 2: Exam Simulation",
                    "subject": "Basic Electrical Engineering",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ee-s1-subj-4",
                "name": "Programming in C",
                "code": "CS-101",
                "description": "Structured programming and algorithm design.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s1-subj4-t1",
                    "title": "Programming in C — Practice Test 1: Fundamental Concepts",
                    "subject": "Programming in C",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Programming in C."
                  },
                  {
                    "id": "btech-ee-s1-subj4-t2",
                    "title": "Programming in C — Practice Test 2: Exam Simulation",
                    "subject": "Programming in C",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-2",
            "number": 2,
            "title": "Semester 2",
            "description": "B.Tech (EE) — Semester 2 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-ee-s2-subj-1",
                "name": "Engineering Mathematics II",
                "code": "MA-102",
                "description": "Differential equations and vector calculus.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s2-subj1-t1",
                    "title": "Engineering Mathematics II — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Mathematics II",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Mathematics II."
                  },
                  {
                    "id": "btech-ee-s2-subj1-t2",
                    "title": "Engineering Mathematics II — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Mathematics II",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ee-s2-subj-2",
                "name": "Electric Circuit Analysis",
                "code": "EE-102",
                "description": "Laplace transform, network synthesis, and three-phase circuits.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s2-subj2-t1",
                    "title": "Electric Circuit Analysis — Practice Test 1: Fundamental Concepts",
                    "subject": "Electric Circuit Analysis",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Electric Circuit Analysis."
                  },
                  {
                    "id": "btech-ee-s2-subj2-t2",
                    "title": "Electric Circuit Analysis — Practice Test 2: Exam Simulation",
                    "subject": "Electric Circuit Analysis",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ee-s2-subj-3",
                "name": "Analog Electronics",
                "code": "EC-102",
                "description": "Transistors, operational amplifiers, and power supplies.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s2-subj3-t1",
                    "title": "Analog Electronics — Practice Test 1: Fundamental Concepts",
                    "subject": "Analog Electronics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Analog Electronics."
                  },
                  {
                    "id": "btech-ee-s2-subj3-t2",
                    "title": "Analog Electronics — Practice Test 2: Exam Simulation",
                    "subject": "Analog Electronics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ee-s2-subj-4",
                "name": "Engineering Chemistry",
                "code": "CH-102",
                "description": "Batteries, fuel cells, and insulating materials.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s2-subj4-t1",
                    "title": "Engineering Chemistry — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Chemistry",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Chemistry."
                  },
                  {
                    "id": "btech-ee-s2-subj4-t2",
                    "title": "Engineering Chemistry — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Chemistry",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-3",
            "number": 3,
            "title": "Semester 3",
            "description": "B.Tech (EE) — Semester 3 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-ee-s3-subj-1",
                "name": "Electrical Machines I",
                "code": "EE-201",
                "description": "Transformers and DC generators and motors.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s3-subj1-t1",
                    "title": "Electrical Machines I — Practice Test 1: Fundamental Concepts",
                    "subject": "Electrical Machines I",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Electrical Machines I."
                  },
                  {
                    "id": "btech-ee-s3-subj1-t2",
                    "title": "Electrical Machines I — Practice Test 2: Exam Simulation",
                    "subject": "Electrical Machines I",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ee-s3-subj-2",
                "name": "Electromagnetic Fields",
                "code": "EE-202",
                "description": "Electrostatics, magnetostatics, and Maxwell’s equations.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s3-subj2-t1",
                    "title": "Electromagnetic Fields — Practice Test 1: Fundamental Concepts",
                    "subject": "Electromagnetic Fields",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Electromagnetic Fields."
                  },
                  {
                    "id": "btech-ee-s3-subj2-t2",
                    "title": "Electromagnetic Fields — Practice Test 2: Exam Simulation",
                    "subject": "Electromagnetic Fields",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ee-s3-subj-3",
                "name": "Digital Electronics",
                "code": "EE-203",
                "description": "Combinational logic, registers, counters, and ADC/DAC.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s3-subj3-t1",
                    "title": "Digital Electronics — Practice Test 1: Fundamental Concepts",
                    "subject": "Digital Electronics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Digital Electronics."
                  },
                  {
                    "id": "btech-ee-s3-subj3-t2",
                    "title": "Digital Electronics — Practice Test 2: Exam Simulation",
                    "subject": "Digital Electronics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ee-s3-subj-4",
                "name": "Electrical Measurements & Instrumentation",
                "code": "EE-204",
                "description": "Galvanometers, bridges, transducers, and digital meters.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s3-subj4-t1",
                    "title": "Electrical Measurements & Instrumentation — Practice Test 1: Fundamental Concepts",
                    "subject": "Electrical Measurements & Instrumentation",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Electrical Measurements & Instrumentation."
                  },
                  {
                    "id": "btech-ee-s3-subj4-t2",
                    "title": "Electrical Measurements & Instrumentation — Practice Test 2: Exam Simulation",
                    "subject": "Electrical Measurements & Instrumentation",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-4",
            "number": 4,
            "title": "Semester 4",
            "description": "B.Tech (EE) — Semester 4 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-ee-s4-subj-1",
                "name": "Electrical Machines II",
                "code": "EE-205",
                "description": "Induction motors, synchronous machines, and fractional HP motors.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s4-subj1-t1",
                    "title": "Electrical Machines II — Practice Test 1: Fundamental Concepts",
                    "subject": "Electrical Machines II",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Electrical Machines II."
                  },
                  {
                    "id": "btech-ee-s4-subj1-t2",
                    "title": "Electrical Machines II — Practice Test 2: Exam Simulation",
                    "subject": "Electrical Machines II",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ee-s4-subj-2",
                "name": "Power Systems I",
                "code": "EE-206",
                "description": "Generation, transmission line parameters, and performance models.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s4-subj2-t1",
                    "title": "Power Systems I — Practice Test 1: Fundamental Concepts",
                    "subject": "Power Systems I",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Power Systems I."
                  },
                  {
                    "id": "btech-ee-s4-subj2-t2",
                    "title": "Power Systems I — Practice Test 2: Exam Simulation",
                    "subject": "Power Systems I",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ee-s4-subj-3",
                "name": "Control Systems",
                "code": "EE-207",
                "description": "Transfer functions, stability criteria, and state variable analysis.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s4-subj3-t1",
                    "title": "Control Systems — Practice Test 1: Fundamental Concepts",
                    "subject": "Control Systems",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Control Systems."
                  },
                  {
                    "id": "btech-ee-s4-subj3-t2",
                    "title": "Control Systems — Practice Test 2: Exam Simulation",
                    "subject": "Control Systems",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ee-s4-subj-4",
                "name": "Signals & Systems for EE",
                "code": "EE-208",
                "description": "Fourier analysis and discrete-time signal operations.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s4-subj4-t1",
                    "title": "Signals & Systems for EE — Practice Test 1: Fundamental Concepts",
                    "subject": "Signals & Systems for EE",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Signals & Systems for EE."
                  },
                  {
                    "id": "btech-ee-s4-subj4-t2",
                    "title": "Signals & Systems for EE — Practice Test 2: Exam Simulation",
                    "subject": "Signals & Systems for EE",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-5",
            "number": 5,
            "title": "Semester 5",
            "description": "B.Tech (EE) — Semester 5 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-ee-s5-subj-1",
                "name": "Power Electronics",
                "code": "EE-301",
                "description": "Thyristors, inverters, choppers, and cycloconverters.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s5-subj1-t1",
                    "title": "Power Electronics — Practice Test 1: Fundamental Concepts",
                    "subject": "Power Electronics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Power Electronics."
                  },
                  {
                    "id": "btech-ee-s5-subj1-t2",
                    "title": "Power Electronics — Practice Test 2: Exam Simulation",
                    "subject": "Power Electronics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ee-s5-subj-2",
                "name": "Power Systems II",
                "code": "EE-302",
                "description": "Load flow studies, symmetrical/unsymmetrical fault analysis, and stability.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s5-subj2-t1",
                    "title": "Power Systems II — Practice Test 1: Fundamental Concepts",
                    "subject": "Power Systems II",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Power Systems II."
                  },
                  {
                    "id": "btech-ee-s5-subj2-t2",
                    "title": "Power Systems II — Practice Test 2: Exam Simulation",
                    "subject": "Power Systems II",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ee-s5-subj-3",
                "name": "Microprocessors & Microcontrollers",
                "code": "EE-303",
                "description": "8051 microcontroller architecture, timers, and external interfacing.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s5-subj3-t1",
                    "title": "Microprocessors & Microcontrollers — Practice Test 1: Fundamental Concepts",
                    "subject": "Microprocessors & Microcontrollers",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Microprocessors & Microcontrollers."
                  },
                  {
                    "id": "btech-ee-s5-subj3-t2",
                    "title": "Microprocessors & Microcontrollers — Practice Test 2: Exam Simulation",
                    "subject": "Microprocessors & Microcontrollers",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ee-s5-subj-4",
                "name": "Linear Control Theory",
                "code": "EE-304",
                "description": "Lead-lag compensator design and modern state-space controllers.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s5-subj4-t1",
                    "title": "Linear Control Theory — Practice Test 1: Fundamental Concepts",
                    "subject": "Linear Control Theory",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Linear Control Theory."
                  },
                  {
                    "id": "btech-ee-s5-subj4-t2",
                    "title": "Linear Control Theory — Practice Test 2: Exam Simulation",
                    "subject": "Linear Control Theory",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-6",
            "number": 6,
            "title": "Semester 6",
            "description": "B.Tech (EE) — Semester 6 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-ee-s6-subj-1",
                "name": "Power System Protection & Switchgear",
                "code": "EE-305",
                "description": "Circuit breakers, protective relays, and substation design.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s6-subj1-t1",
                    "title": "Power System Protection & Switchgear — Practice Test 1: Fundamental Concepts",
                    "subject": "Power System Protection & Switchgear",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Power System Protection & Switchgear."
                  },
                  {
                    "id": "btech-ee-s6-subj1-t2",
                    "title": "Power System Protection & Switchgear — Practice Test 2: Exam Simulation",
                    "subject": "Power System Protection & Switchgear",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ee-s6-subj-2",
                "name": "Electric Drives & Traction",
                "code": "EE-306",
                "description": "Solid-state speed control of DC and AC drives.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s6-subj2-t1",
                    "title": "Electric Drives & Traction — Practice Test 1: Fundamental Concepts",
                    "subject": "Electric Drives & Traction",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Electric Drives & Traction."
                  },
                  {
                    "id": "btech-ee-s6-subj2-t2",
                    "title": "Electric Drives & Traction — Practice Test 2: Exam Simulation",
                    "subject": "Electric Drives & Traction",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ee-s6-subj-3",
                "name": "High Voltage Engineering",
                "code": "EE-307",
                "description": "Dielectric breakdown, impulse voltage generation, and testing.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s6-subj3-t1",
                    "title": "High Voltage Engineering — Practice Test 1: Fundamental Concepts",
                    "subject": "High Voltage Engineering",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in High Voltage Engineering."
                  },
                  {
                    "id": "btech-ee-s6-subj3-t2",
                    "title": "High Voltage Engineering — Practice Test 2: Exam Simulation",
                    "subject": "High Voltage Engineering",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ee-s6-subj-4",
                "name": "Renewable Energy Integration",
                "code": "EE-308",
                "description": "Grid-tied solar inverters, wind energy generators, and microgrids.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s6-subj4-t1",
                    "title": "Renewable Energy Integration — Practice Test 1: Fundamental Concepts",
                    "subject": "Renewable Energy Integration",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Renewable Energy Integration."
                  },
                  {
                    "id": "btech-ee-s6-subj4-t2",
                    "title": "Renewable Energy Integration — Practice Test 2: Exam Simulation",
                    "subject": "Renewable Energy Integration",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-7",
            "number": 7,
            "title": "Semester 7",
            "description": "B.Tech (EE) — Semester 7 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "btech-ee-s7-subj-1",
                "name": "Smart Grids & Distributed Generation",
                "code": "EE-401",
                "description": "AMI, smart meters, wide-area monitoring, and energy storage.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s7-subj1-t1",
                    "title": "Smart Grids & Distributed Generation — Practice Test 1: Fundamental Concepts",
                    "subject": "Smart Grids & Distributed Generation",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Smart Grids & Distributed Generation."
                  },
                  {
                    "id": "btech-ee-s7-subj1-t2",
                    "title": "Smart Grids & Distributed Generation — Practice Test 2: Exam Simulation",
                    "subject": "Smart Grids & Distributed Generation",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ee-s7-subj-2",
                "name": "Power Quality & FACTS",
                "code": "EE-402",
                "description": "Harmonics mitigation, STATCOM, and reactive power compensation.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s7-subj2-t1",
                    "title": "Power Quality & FACTS — Practice Test 1: Fundamental Concepts",
                    "subject": "Power Quality & FACTS",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Power Quality & FACTS."
                  },
                  {
                    "id": "btech-ee-s7-subj2-t2",
                    "title": "Power Quality & FACTS — Practice Test 2: Exam Simulation",
                    "subject": "Power Quality & FACTS",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ee-s7-subj-3",
                "name": "Utilization of Electrical Energy",
                "code": "EE-403",
                "description": "Illumination engineering, electric heating, and welding.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s7-subj3-t1",
                    "title": "Utilization of Electrical Energy — Practice Test 1: Fundamental Concepts",
                    "subject": "Utilization of Electrical Energy",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Utilization of Electrical Energy."
                  },
                  {
                    "id": "btech-ee-s7-subj3-t2",
                    "title": "Utilization of Electrical Energy — Practice Test 2: Exam Simulation",
                    "subject": "Utilization of Electrical Energy",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-8",
            "number": 8,
            "title": "Semester 8",
            "description": "B.Tech (EE) — Semester 8 subjects, mock tests, and exam practice.",
            "availableTestsCount": 4,
            "subjects": [
              {
                "id": "btech-ee-s8-subj-1",
                "name": "Energy Management & Energy Audit",
                "code": "EE-404",
                "description": "Tariffs, energy conservation principles, and industrial audits.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s8-subj1-t1",
                    "title": "Energy Management & Energy Audit — Practice Test 1: Fundamental Concepts",
                    "subject": "Energy Management & Energy Audit",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Energy Management & Energy Audit."
                  },
                  {
                    "id": "btech-ee-s8-subj1-t2",
                    "title": "Energy Management & Energy Audit — Practice Test 2: Exam Simulation",
                    "subject": "Energy Management & Energy Audit",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ee-s8-subj-2",
                "name": "Major Technical Project & Viva",
                "code": "EE-405",
                "description": "Electrical design implementation, testing, and capstone presentation.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ee-s8-subj2-t1",
                    "title": "Major Technical Project & Viva — Practice Test 1: Fundamental Concepts",
                    "subject": "Major Technical Project & Viva",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Major Technical Project & Viva."
                  },
                  {
                    "id": "btech-ee-s8-subj2-t2",
                    "title": "Major Technical Project & Viva — Practice Test 2: Exam Simulation",
                    "subject": "Major Technical Project & Viva",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "ce",
        "name": "Civil Engineering",
        "code": "CE",
        "description": "Structural mechanics, geotechnical engineering, surveying, transportation, and environmental design.",
        "totalSemesters": 8,
        "totalMockTests": 58,
        "semesters": [
          {
            "id": "semester-1",
            "number": 1,
            "title": "Semester 1",
            "description": "B.Tech (CE) — Semester 1 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-ce-s1-subj-1",
                "name": "Engineering Mathematics I",
                "code": "MA-101",
                "description": "Calculus and analytical geometry.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s1-subj1-t1",
                    "title": "Engineering Mathematics I — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Mathematics I",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Mathematics I."
                  },
                  {
                    "id": "btech-ce-s1-subj1-t2",
                    "title": "Engineering Mathematics I — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Mathematics I",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ce-s1-subj-2",
                "name": "Engineering Physics",
                "code": "PH-101",
                "description": "Wave mechanics, acoustics, and elasticity.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s1-subj2-t1",
                    "title": "Engineering Physics — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Physics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Physics."
                  },
                  {
                    "id": "btech-ce-s1-subj2-t2",
                    "title": "Engineering Physics — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Physics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ce-s1-subj-3",
                "name": "Engineering Mechanics",
                "code": "CE-101",
                "description": "Force systems, equilibrium, friction, and centroid.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s1-subj3-t1",
                    "title": "Engineering Mechanics — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Mechanics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Mechanics."
                  },
                  {
                    "id": "btech-ce-s1-subj3-t2",
                    "title": "Engineering Mechanics — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Mechanics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ce-s1-subj-4",
                "name": "Basic Engineering Drawing",
                "code": "ME-101",
                "description": "Orthographic projections and civil drafting symbols.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s1-subj4-t1",
                    "title": "Basic Engineering Drawing — Practice Test 1: Fundamental Concepts",
                    "subject": "Basic Engineering Drawing",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Basic Engineering Drawing."
                  },
                  {
                    "id": "btech-ce-s1-subj4-t2",
                    "title": "Basic Engineering Drawing — Practice Test 2: Exam Simulation",
                    "subject": "Basic Engineering Drawing",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-2",
            "number": 2,
            "title": "Semester 2",
            "description": "B.Tech (CE) — Semester 2 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-ce-s2-subj-1",
                "name": "Engineering Mathematics II",
                "code": "MA-102",
                "description": "Differential equations and numerical methods.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s2-subj1-t1",
                    "title": "Engineering Mathematics II — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Mathematics II",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Mathematics II."
                  },
                  {
                    "id": "btech-ce-s2-subj1-t2",
                    "title": "Engineering Mathematics II — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Mathematics II",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ce-s2-subj-2",
                "name": "Engineering Chemistry",
                "code": "CH-102",
                "description": "Cement chemistry, corrosion, water treatment, and bitumen.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s2-subj2-t1",
                    "title": "Engineering Chemistry — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Chemistry",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Chemistry."
                  },
                  {
                    "id": "btech-ce-s2-subj2-t2",
                    "title": "Engineering Chemistry — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Chemistry",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ce-s2-subj-3",
                "name": "Building Materials & Construction",
                "code": "CE-102",
                "description": "Bricks, stones, concrete, masonry, and foundations.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s2-subj3-t1",
                    "title": "Building Materials & Construction — Practice Test 1: Fundamental Concepts",
                    "subject": "Building Materials & Construction",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Building Materials & Construction."
                  },
                  {
                    "id": "btech-ce-s2-subj3-t2",
                    "title": "Building Materials & Construction — Practice Test 2: Exam Simulation",
                    "subject": "Building Materials & Construction",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ce-s2-subj-4",
                "name": "Basic Electrical & Programming",
                "code": "EE-102",
                "description": "Electrical circuits and introductory computer programming.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s2-subj4-t1",
                    "title": "Basic Electrical & Programming — Practice Test 1: Fundamental Concepts",
                    "subject": "Basic Electrical & Programming",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Basic Electrical & Programming."
                  },
                  {
                    "id": "btech-ce-s2-subj4-t2",
                    "title": "Basic Electrical & Programming — Practice Test 2: Exam Simulation",
                    "subject": "Basic Electrical & Programming",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-3",
            "number": 3,
            "title": "Semester 3",
            "description": "B.Tech (CE) — Semester 3 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-ce-s3-subj-1",
                "name": "Mechanics of Solids",
                "code": "CE-201",
                "description": "Stresses, strains, deflection of beams, and torsion.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s3-subj1-t1",
                    "title": "Mechanics of Solids — Practice Test 1: Fundamental Concepts",
                    "subject": "Mechanics of Solids",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Mechanics of Solids."
                  },
                  {
                    "id": "btech-ce-s3-subj1-t2",
                    "title": "Mechanics of Solids — Practice Test 2: Exam Simulation",
                    "subject": "Mechanics of Solids",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ce-s3-subj-2",
                "name": "Surveying I",
                "code": "CE-202",
                "description": "Chain, compass, leveling, and theodolite surveying.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s3-subj2-t1",
                    "title": "Surveying I — Practice Test 1: Fundamental Concepts",
                    "subject": "Surveying I",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Surveying I."
                  },
                  {
                    "id": "btech-ce-s3-subj2-t2",
                    "title": "Surveying I — Practice Test 2: Exam Simulation",
                    "subject": "Surveying I",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ce-s3-subj-3",
                "name": "Fluid Mechanics & Open Channel Flow",
                "code": "CE-203",
                "description": "Hydrostatics, continuity, energy equation, and channel flow.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s3-subj3-t1",
                    "title": "Fluid Mechanics & Open Channel Flow — Practice Test 1: Fundamental Concepts",
                    "subject": "Fluid Mechanics & Open Channel Flow",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Fluid Mechanics & Open Channel Flow."
                  },
                  {
                    "id": "btech-ce-s3-subj3-t2",
                    "title": "Fluid Mechanics & Open Channel Flow — Practice Test 2: Exam Simulation",
                    "subject": "Fluid Mechanics & Open Channel Flow",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ce-s3-subj-4",
                "name": "Engineering Geology",
                "code": "CE-204",
                "description": "Mineralogy, petrology, faulting, and rock mechanics.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s3-subj4-t1",
                    "title": "Engineering Geology — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Geology",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Geology."
                  },
                  {
                    "id": "btech-ce-s3-subj4-t2",
                    "title": "Engineering Geology — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Geology",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-4",
            "number": 4,
            "title": "Semester 4",
            "description": "B.Tech (CE) — Semester 4 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-ce-s4-subj-1",
                "name": "Structural Analysis I",
                "code": "CE-205",
                "description": "Determinate structures, trusses, arches, and influence lines.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s4-subj1-t1",
                    "title": "Structural Analysis I — Practice Test 1: Fundamental Concepts",
                    "subject": "Structural Analysis I",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Structural Analysis I."
                  },
                  {
                    "id": "btech-ce-s4-subj1-t2",
                    "title": "Structural Analysis I — Practice Test 2: Exam Simulation",
                    "subject": "Structural Analysis I",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ce-s4-subj-2",
                "name": "Concrete Technology",
                "code": "CE-206",
                "description": "Cement hydration, admixtures, mix design, and testing.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s4-subj2-t1",
                    "title": "Concrete Technology — Practice Test 1: Fundamental Concepts",
                    "subject": "Concrete Technology",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Concrete Technology."
                  },
                  {
                    "id": "btech-ce-s4-subj2-t2",
                    "title": "Concrete Technology — Practice Test 2: Exam Simulation",
                    "subject": "Concrete Technology",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ce-s4-subj-3",
                "name": "Surveying II & Advanced Geomatics",
                "code": "CE-207",
                "description": "Total stations, GPS, photogrammetry, and remote sensing.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s4-subj3-t1",
                    "title": "Surveying II & Advanced Geomatics — Practice Test 1: Fundamental Concepts",
                    "subject": "Surveying II & Advanced Geomatics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Surveying II & Advanced Geomatics."
                  },
                  {
                    "id": "btech-ce-s4-subj3-t2",
                    "title": "Surveying II & Advanced Geomatics — Practice Test 2: Exam Simulation",
                    "subject": "Surveying II & Advanced Geomatics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ce-s4-subj-4",
                "name": "Hydraulic Engineering",
                "code": "CE-208",
                "description": "Pipe networks, water hammer, and hydraulic machines.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s4-subj4-t1",
                    "title": "Hydraulic Engineering — Practice Test 1: Fundamental Concepts",
                    "subject": "Hydraulic Engineering",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Hydraulic Engineering."
                  },
                  {
                    "id": "btech-ce-s4-subj4-t2",
                    "title": "Hydraulic Engineering — Practice Test 2: Exam Simulation",
                    "subject": "Hydraulic Engineering",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-5",
            "number": 5,
            "title": "Semester 5",
            "description": "B.Tech (CE) — Semester 5 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-ce-s5-subj-1",
                "name": "Design of Reinforced Concrete Structures (RCC)",
                "code": "CE-301",
                "description": "Limit state design of beams, slabs, columns, and footings.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s5-subj1-t1",
                    "title": "Design of Reinforced Concrete Structures (RCC) — Practice Test 1: Fundamental Concepts",
                    "subject": "Design of Reinforced Concrete Structures (RCC)",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Design of Reinforced Concrete Structures (RCC)."
                  },
                  {
                    "id": "btech-ce-s5-subj1-t2",
                    "title": "Design of Reinforced Concrete Structures (RCC) — Practice Test 2: Exam Simulation",
                    "subject": "Design of Reinforced Concrete Structures (RCC)",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ce-s5-subj-2",
                "name": "Geotechnical Engineering I",
                "code": "CE-302",
                "description": "Soil classification, permeability, compaction, and consolidation.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s5-subj2-t1",
                    "title": "Geotechnical Engineering I — Practice Test 1: Fundamental Concepts",
                    "subject": "Geotechnical Engineering I",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Geotechnical Engineering I."
                  },
                  {
                    "id": "btech-ce-s5-subj2-t2",
                    "title": "Geotechnical Engineering I — Practice Test 2: Exam Simulation",
                    "subject": "Geotechnical Engineering I",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ce-s5-subj-3",
                "name": "Environmental Engineering I",
                "code": "CE-303",
                "description": "Water supply, treatment processes, and distribution networks.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s5-subj3-t1",
                    "title": "Environmental Engineering I — Practice Test 1: Fundamental Concepts",
                    "subject": "Environmental Engineering I",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Environmental Engineering I."
                  },
                  {
                    "id": "btech-ce-s5-subj3-t2",
                    "title": "Environmental Engineering I — Practice Test 2: Exam Simulation",
                    "subject": "Environmental Engineering I",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ce-s5-subj-4",
                "name": "Transportation & Highway Engineering",
                "code": "CE-304",
                "description": "Geometric design of highways, pavement materials, and traffic.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s5-subj4-t1",
                    "title": "Transportation & Highway Engineering — Practice Test 1: Fundamental Concepts",
                    "subject": "Transportation & Highway Engineering",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Transportation & Highway Engineering."
                  },
                  {
                    "id": "btech-ce-s5-subj4-t2",
                    "title": "Transportation & Highway Engineering — Practice Test 2: Exam Simulation",
                    "subject": "Transportation & Highway Engineering",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-6",
            "number": 6,
            "title": "Semester 6",
            "description": "B.Tech (CE) — Semester 6 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-ce-s6-subj-1",
                "name": "Design of Steel Structures",
                "code": "CE-305",
                "description": "Tension members, compression members, beams, and connections.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s6-subj1-t1",
                    "title": "Design of Steel Structures — Practice Test 1: Fundamental Concepts",
                    "subject": "Design of Steel Structures",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Design of Steel Structures."
                  },
                  {
                    "id": "btech-ce-s6-subj1-t2",
                    "title": "Design of Steel Structures — Practice Test 2: Exam Simulation",
                    "subject": "Design of Steel Structures",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ce-s6-subj-2",
                "name": "Geotechnical Engineering II",
                "code": "CE-306",
                "description": "Earth pressure, retaining walls, slope stability, and pile foundations.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s6-subj2-t1",
                    "title": "Geotechnical Engineering II — Practice Test 1: Fundamental Concepts",
                    "subject": "Geotechnical Engineering II",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Geotechnical Engineering II."
                  },
                  {
                    "id": "btech-ce-s6-subj2-t2",
                    "title": "Geotechnical Engineering II — Practice Test 2: Exam Simulation",
                    "subject": "Geotechnical Engineering II",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ce-s6-subj-3",
                "name": "Environmental Engineering II",
                "code": "CE-307",
                "description": "Sewage treatment, sludge disposal, and air pollution control.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s6-subj3-t1",
                    "title": "Environmental Engineering II — Practice Test 1: Fundamental Concepts",
                    "subject": "Environmental Engineering II",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Environmental Engineering II."
                  },
                  {
                    "id": "btech-ce-s6-subj3-t2",
                    "title": "Environmental Engineering II — Practice Test 2: Exam Simulation",
                    "subject": "Environmental Engineering II",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ce-s6-subj-4",
                "name": "Hydrology & Water Resources Engineering",
                "code": "CE-308",
                "description": "Precipitation, runoff, flood routing, and reservoir storage.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s6-subj4-t1",
                    "title": "Hydrology & Water Resources Engineering — Practice Test 1: Fundamental Concepts",
                    "subject": "Hydrology & Water Resources Engineering",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Hydrology & Water Resources Engineering."
                  },
                  {
                    "id": "btech-ce-s6-subj4-t2",
                    "title": "Hydrology & Water Resources Engineering — Practice Test 2: Exam Simulation",
                    "subject": "Hydrology & Water Resources Engineering",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-7",
            "number": 7,
            "title": "Semester 7",
            "description": "B.Tech (CE) — Semester 7 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "btech-ce-s7-subj-1",
                "name": "Structural Analysis II (Matrix Methods)",
                "code": "CE-401",
                "description": "Stiffness method, flexibility method, and finite element modeling.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s7-subj1-t1",
                    "title": "Structural Analysis II (Matrix Methods) — Practice Test 1: Fundamental Concepts",
                    "subject": "Structural Analysis II (Matrix Methods)",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Structural Analysis II (Matrix Methods)."
                  },
                  {
                    "id": "btech-ce-s7-subj1-t2",
                    "title": "Structural Analysis II (Matrix Methods) — Practice Test 2: Exam Simulation",
                    "subject": "Structural Analysis II (Matrix Methods)",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ce-s7-subj-2",
                "name": "Earthquake Resistant Structural Design",
                "code": "CE-402",
                "description": "Seismic zoning, dynamic response, and ductile detailing.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s7-subj2-t1",
                    "title": "Earthquake Resistant Structural Design — Practice Test 1: Fundamental Concepts",
                    "subject": "Earthquake Resistant Structural Design",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Earthquake Resistant Structural Design."
                  },
                  {
                    "id": "btech-ce-s7-subj2-t2",
                    "title": "Earthquake Resistant Structural Design — Practice Test 2: Exam Simulation",
                    "subject": "Earthquake Resistant Structural Design",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ce-s7-subj-3",
                "name": "Quantity Surveying, Estimating & Valuation",
                "code": "CE-403",
                "description": "Rate analysis, contract specifications, and property valuation.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s7-subj3-t1",
                    "title": "Quantity Surveying, Estimating & Valuation — Practice Test 1: Fundamental Concepts",
                    "subject": "Quantity Surveying, Estimating & Valuation",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Quantity Surveying, Estimating & Valuation."
                  },
                  {
                    "id": "btech-ce-s7-subj3-t2",
                    "title": "Quantity Surveying, Estimating & Valuation — Practice Test 2: Exam Simulation",
                    "subject": "Quantity Surveying, Estimating & Valuation",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-8",
            "number": 8,
            "title": "Semester 8",
            "description": "B.Tech (CE) — Semester 8 subjects, mock tests, and exam practice.",
            "availableTestsCount": 4,
            "subjects": [
              {
                "id": "btech-ce-s8-subj-1",
                "name": "Urban Planning & Smart Infrastructure",
                "code": "CE-404",
                "description": "Zoning laws, traffic planning, and sustainable urban drainage.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s8-subj1-t1",
                    "title": "Urban Planning & Smart Infrastructure — Practice Test 1: Fundamental Concepts",
                    "subject": "Urban Planning & Smart Infrastructure",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Urban Planning & Smart Infrastructure."
                  },
                  {
                    "id": "btech-ce-s8-subj1-t2",
                    "title": "Urban Planning & Smart Infrastructure — Practice Test 2: Exam Simulation",
                    "subject": "Urban Planning & Smart Infrastructure",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-ce-s8-subj-2",
                "name": "Construction Management & Project Work",
                "code": "CE-405",
                "description": "CPM/PERT networks, safety management, and final project defense.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-ce-s8-subj2-t1",
                    "title": "Construction Management & Project Work — Practice Test 1: Fundamental Concepts",
                    "subject": "Construction Management & Project Work",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Construction Management & Project Work."
                  },
                  {
                    "id": "btech-ce-s8-subj2-t2",
                    "title": "Construction Management & Project Work — Practice Test 2: Exam Simulation",
                    "subject": "Construction Management & Project Work",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "it",
        "name": "Information Technology",
        "code": "IT",
        "description": "Enterprise computing, database systems, web architecture, mobile applications, and information security.",
        "totalSemesters": 8,
        "totalMockTests": 58,
        "semesters": [
          {
            "id": "semester-1",
            "number": 1,
            "title": "Semester 1",
            "description": "B.Tech (IT) — Semester 1 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-it-s1-subj-1",
                "name": "Engineering Mathematics I",
                "code": "MA-101",
                "description": "Matrices, limits, calculus, and linear algebra.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s1-subj1-t1",
                    "title": "Engineering Mathematics I — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Mathematics I",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Mathematics I."
                  },
                  {
                    "id": "btech-it-s1-subj1-t2",
                    "title": "Engineering Mathematics I — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Mathematics I",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-it-s1-subj-2",
                "name": "Engineering Physics",
                "code": "PH-101",
                "description": "Wave mechanics, semiconductors, and lasers.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s1-subj2-t1",
                    "title": "Engineering Physics — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Physics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Physics."
                  },
                  {
                    "id": "btech-it-s1-subj2-t2",
                    "title": "Engineering Physics — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Physics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-it-s1-subj-3",
                "name": "Problem Solving through C",
                "code": "IT-101",
                "description": "C syntax, loops, functions, pointers, and files.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s1-subj3-t1",
                    "title": "Problem Solving through C — Practice Test 1: Fundamental Concepts",
                    "subject": "Problem Solving through C",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Problem Solving through C."
                  },
                  {
                    "id": "btech-it-s1-subj3-t2",
                    "title": "Problem Solving through C — Practice Test 2: Exam Simulation",
                    "subject": "Problem Solving through C",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-it-s1-subj-4",
                "name": "Basic Electrical & Electronics",
                "code": "EE-101",
                "description": "Circuit theory and semiconductor electronics.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s1-subj4-t1",
                    "title": "Basic Electrical & Electronics — Practice Test 1: Fundamental Concepts",
                    "subject": "Basic Electrical & Electronics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Basic Electrical & Electronics."
                  },
                  {
                    "id": "btech-it-s1-subj4-t2",
                    "title": "Basic Electrical & Electronics — Practice Test 2: Exam Simulation",
                    "subject": "Basic Electrical & Electronics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-2",
            "number": 2,
            "title": "Semester 2",
            "description": "B.Tech (IT) — Semester 2 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-it-s2-subj-1",
                "name": "Engineering Mathematics II",
                "code": "MA-102",
                "description": "Vector calculus, differential equations, and series.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s2-subj1-t1",
                    "title": "Engineering Mathematics II — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Mathematics II",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Mathematics II."
                  },
                  {
                    "id": "btech-it-s2-subj1-t2",
                    "title": "Engineering Mathematics II — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Mathematics II",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-it-s2-subj-2",
                "name": "Data Structures & Algorithms",
                "code": "IT-102",
                "description": "Arrays, lists, trees, graphs, and sorting.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s2-subj2-t1",
                    "title": "Data Structures & Algorithms — Practice Test 1: Fundamental Concepts",
                    "subject": "Data Structures & Algorithms",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Data Structures & Algorithms."
                  },
                  {
                    "id": "btech-it-s2-subj2-t2",
                    "title": "Data Structures & Algorithms — Practice Test 2: Exam Simulation",
                    "subject": "Data Structures & Algorithms",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-it-s2-subj-3",
                "name": "Digital Logic & Microprocessors",
                "code": "IT-103",
                "description": "Boolean gates, counters, and 8086 microprocessors.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s2-subj3-t1",
                    "title": "Digital Logic & Microprocessors — Practice Test 1: Fundamental Concepts",
                    "subject": "Digital Logic & Microprocessors",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Digital Logic & Microprocessors."
                  },
                  {
                    "id": "btech-it-s2-subj3-t2",
                    "title": "Digital Logic & Microprocessors — Practice Test 2: Exam Simulation",
                    "subject": "Digital Logic & Microprocessors",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-it-s2-subj-4",
                "name": "Engineering Chemistry",
                "code": "CH-102",
                "description": "Polymers, nanomaterials, and electrochemistry.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s2-subj4-t1",
                    "title": "Engineering Chemistry — Practice Test 1: Fundamental Concepts",
                    "subject": "Engineering Chemistry",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Chemistry."
                  },
                  {
                    "id": "btech-it-s2-subj4-t2",
                    "title": "Engineering Chemistry — Practice Test 2: Exam Simulation",
                    "subject": "Engineering Chemistry",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-3",
            "number": 3,
            "title": "Semester 3",
            "description": "B.Tech (IT) — Semester 3 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-it-s3-subj-1",
                "name": "Discrete Mathematics",
                "code": "IT-201",
                "description": "Logic, sets, relations, functions, and graph theory.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s3-subj1-t1",
                    "title": "Discrete Mathematics — Practice Test 1: Fundamental Concepts",
                    "subject": "Discrete Mathematics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Discrete Mathematics."
                  },
                  {
                    "id": "btech-it-s3-subj1-t2",
                    "title": "Discrete Mathematics — Practice Test 2: Exam Simulation",
                    "subject": "Discrete Mathematics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-it-s3-subj-2",
                "name": "Object Oriented Programming with Java",
                "code": "IT-202",
                "description": "Classes, inheritance, exceptions, and collections in Java.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s3-subj2-t1",
                    "title": "Object Oriented Programming with Java — Practice Test 1: Fundamental Concepts",
                    "subject": "Object Oriented Programming with Java",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Object Oriented Programming with Java."
                  },
                  {
                    "id": "btech-it-s3-subj2-t2",
                    "title": "Object Oriented Programming with Java — Practice Test 2: Exam Simulation",
                    "subject": "Object Oriented Programming with Java",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-it-s3-subj-3",
                "name": "Database Management Systems",
                "code": "IT-203",
                "description": "Relational data model, SQL, normalization, and indexing.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s3-subj3-t1",
                    "title": "Database Management Systems — Practice Test 1: Fundamental Concepts",
                    "subject": "Database Management Systems",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Database Management Systems."
                  },
                  {
                    "id": "btech-it-s3-subj3-t2",
                    "title": "Database Management Systems — Practice Test 2: Exam Simulation",
                    "subject": "Database Management Systems",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-it-s3-subj-4",
                "name": "Computer Architecture & Organization",
                "code": "IT-204",
                "description": "Pipelining, memory hierarchy, and I/O organization.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s3-subj4-t1",
                    "title": "Computer Architecture & Organization — Practice Test 1: Fundamental Concepts",
                    "subject": "Computer Architecture & Organization",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Computer Architecture & Organization."
                  },
                  {
                    "id": "btech-it-s3-subj4-t2",
                    "title": "Computer Architecture & Organization — Practice Test 2: Exam Simulation",
                    "subject": "Computer Architecture & Organization",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-4",
            "number": 4,
            "title": "Semester 4",
            "description": "B.Tech (IT) — Semester 4 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-it-s4-subj-1",
                "name": "Design & Analysis of Algorithms",
                "code": "IT-205",
                "description": "Complexity analysis, divide & conquer, and dynamic programming.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s4-subj1-t1",
                    "title": "Design & Analysis of Algorithms — Practice Test 1: Fundamental Concepts",
                    "subject": "Design & Analysis of Algorithms",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Design & Analysis of Algorithms."
                  },
                  {
                    "id": "btech-it-s4-subj1-t2",
                    "title": "Design & Analysis of Algorithms — Practice Test 2: Exam Simulation",
                    "subject": "Design & Analysis of Algorithms",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-it-s4-subj-2",
                "name": "Operating Systems Concepts",
                "code": "IT-206",
                "description": "Processes, concurrency, memory management, and file systems.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s4-subj2-t1",
                    "title": "Operating Systems Concepts — Practice Test 1: Fundamental Concepts",
                    "subject": "Operating Systems Concepts",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Operating Systems Concepts."
                  },
                  {
                    "id": "btech-it-s4-subj2-t2",
                    "title": "Operating Systems Concepts — Practice Test 2: Exam Simulation",
                    "subject": "Operating Systems Concepts",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-it-s4-subj-3",
                "name": "Software Engineering Methodologies",
                "code": "IT-207",
                "description": "Agile development, SDLC, requirements, and testing.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s4-subj3-t1",
                    "title": "Software Engineering Methodologies — Practice Test 1: Fundamental Concepts",
                    "subject": "Software Engineering Methodologies",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Software Engineering Methodologies."
                  },
                  {
                    "id": "btech-it-s4-subj3-t2",
                    "title": "Software Engineering Methodologies — Practice Test 2: Exam Simulation",
                    "subject": "Software Engineering Methodologies",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-it-s4-subj-4",
                "name": "Data Communication & Networking",
                "code": "IT-208",
                "description": "Transmission media, framing, error control, and protocols.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s4-subj4-t1",
                    "title": "Data Communication & Networking — Practice Test 1: Fundamental Concepts",
                    "subject": "Data Communication & Networking",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Data Communication & Networking."
                  },
                  {
                    "id": "btech-it-s4-subj4-t2",
                    "title": "Data Communication & Networking — Practice Test 2: Exam Simulation",
                    "subject": "Data Communication & Networking",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-5",
            "number": 5,
            "title": "Semester 5",
            "description": "B.Tech (IT) — Semester 5 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-it-s5-subj-1",
                "name": "Web Programming & Services",
                "code": "IT-301",
                "description": "Full-stack web concepts, APIs, JSON, and server-side scripts.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s5-subj1-t1",
                    "title": "Web Programming & Services — Practice Test 1: Fundamental Concepts",
                    "subject": "Web Programming & Services",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Web Programming & Services."
                  },
                  {
                    "id": "btech-it-s5-subj1-t2",
                    "title": "Web Programming & Services — Practice Test 2: Exam Simulation",
                    "subject": "Web Programming & Services",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-it-s5-subj-2",
                "name": "Information & Network Security",
                "code": "IT-302",
                "description": "Ciphers, RSA, AES, digital signatures, and firewalls.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s5-subj2-t1",
                    "title": "Information & Network Security — Practice Test 1: Fundamental Concepts",
                    "subject": "Information & Network Security",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Information & Network Security."
                  },
                  {
                    "id": "btech-it-s5-subj2-t2",
                    "title": "Information & Network Security — Practice Test 2: Exam Simulation",
                    "subject": "Information & Network Security",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-it-s5-subj-3",
                "name": "Cloud Computing Technologies",
                "code": "IT-303",
                "description": "SaaS, PaaS, IaaS, AWS, and serverless compute.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s5-subj3-t1",
                    "title": "Cloud Computing Technologies — Practice Test 1: Fundamental Concepts",
                    "subject": "Cloud Computing Technologies",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Cloud Computing Technologies."
                  },
                  {
                    "id": "btech-it-s5-subj3-t2",
                    "title": "Cloud Computing Technologies — Practice Test 2: Exam Simulation",
                    "subject": "Cloud Computing Technologies",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-it-s5-subj-4",
                "name": "Formal Languages & Automata",
                "code": "IT-304",
                "description": "Regular expressions, DFAs, NFAs, and pushdown automata.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s5-subj4-t1",
                    "title": "Formal Languages & Automata — Practice Test 1: Fundamental Concepts",
                    "subject": "Formal Languages & Automata",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Formal Languages & Automata."
                  },
                  {
                    "id": "btech-it-s5-subj4-t2",
                    "title": "Formal Languages & Automata — Practice Test 2: Exam Simulation",
                    "subject": "Formal Languages & Automata",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-6",
            "number": 6,
            "title": "Semester 6",
            "description": "B.Tech (IT) — Semester 6 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "btech-it-s6-subj-1",
                "name": "Data Mining & Business Intelligence",
                "code": "IT-305",
                "description": "Data warehousing, association rules, and classification.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s6-subj1-t1",
                    "title": "Data Mining & Business Intelligence — Practice Test 1: Fundamental Concepts",
                    "subject": "Data Mining & Business Intelligence",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Data Mining & Business Intelligence."
                  },
                  {
                    "id": "btech-it-s6-subj1-t2",
                    "title": "Data Mining & Business Intelligence — Practice Test 2: Exam Simulation",
                    "subject": "Data Mining & Business Intelligence",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-it-s6-subj-2",
                "name": "Mobile Application Engineering",
                "code": "IT-306",
                "description": "Native mobile apps, lifecycle, and cloud backends.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s6-subj2-t1",
                    "title": "Mobile Application Engineering — Practice Test 1: Fundamental Concepts",
                    "subject": "Mobile Application Engineering",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Mobile Application Engineering."
                  },
                  {
                    "id": "btech-it-s6-subj2-t2",
                    "title": "Mobile Application Engineering — Practice Test 2: Exam Simulation",
                    "subject": "Mobile Application Engineering",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-it-s6-subj-3",
                "name": "Machine Learning Fundamentals",
                "code": "IT-307",
                "description": "Regression, SVMs, decision trees, and neural nets.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s6-subj3-t1",
                    "title": "Machine Learning Fundamentals — Practice Test 1: Fundamental Concepts",
                    "subject": "Machine Learning Fundamentals",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Machine Learning Fundamentals."
                  },
                  {
                    "id": "btech-it-s6-subj3-t2",
                    "title": "Machine Learning Fundamentals — Practice Test 2: Exam Simulation",
                    "subject": "Machine Learning Fundamentals",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-it-s6-subj-4",
                "name": "DevOps & Continuous Integration",
                "code": "IT-308",
                "description": "Git, Docker, Jenkins pipelines, and automated deployment.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s6-subj4-t1",
                    "title": "DevOps & Continuous Integration — Practice Test 1: Fundamental Concepts",
                    "subject": "DevOps & Continuous Integration",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in DevOps & Continuous Integration."
                  },
                  {
                    "id": "btech-it-s6-subj4-t2",
                    "title": "DevOps & Continuous Integration — Practice Test 2: Exam Simulation",
                    "subject": "DevOps & Continuous Integration",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-7",
            "number": 7,
            "title": "Semester 7",
            "description": "B.Tech (IT) — Semester 7 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "btech-it-s7-subj-1",
                "name": "Big Data Technologies & Analytics",
                "code": "IT-401",
                "description": "Hadoop ecosystem, Spark processing, and NoSQL stores.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s7-subj1-t1",
                    "title": "Big Data Technologies & Analytics — Practice Test 1: Fundamental Concepts",
                    "subject": "Big Data Technologies & Analytics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Big Data Technologies & Analytics."
                  },
                  {
                    "id": "btech-it-s7-subj1-t2",
                    "title": "Big Data Technologies & Analytics — Practice Test 2: Exam Simulation",
                    "subject": "Big Data Technologies & Analytics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-it-s7-subj-2",
                "name": "Cyber Forensics & Incident Response",
                "code": "IT-402",
                "description": "Evidence preservation, memory analysis, and cyber laws.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s7-subj2-t1",
                    "title": "Cyber Forensics & Incident Response — Practice Test 1: Fundamental Concepts",
                    "subject": "Cyber Forensics & Incident Response",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Cyber Forensics & Incident Response."
                  },
                  {
                    "id": "btech-it-s7-subj2-t2",
                    "title": "Cyber Forensics & Incident Response — Practice Test 2: Exam Simulation",
                    "subject": "Cyber Forensics & Incident Response",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-it-s7-subj-3",
                "name": "Enterprise Resource Planning (ERP)",
                "code": "IT-403",
                "description": "Business process integration and ERP system architecture.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s7-subj3-t1",
                    "title": "Enterprise Resource Planning (ERP) — Practice Test 1: Fundamental Concepts",
                    "subject": "Enterprise Resource Planning (ERP)",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Enterprise Resource Planning (ERP)."
                  },
                  {
                    "id": "btech-it-s7-subj3-t2",
                    "title": "Enterprise Resource Planning (ERP) — Practice Test 2: Exam Simulation",
                    "subject": "Enterprise Resource Planning (ERP)",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-8",
            "number": 8,
            "title": "Semester 8",
            "description": "B.Tech (IT) — Semester 8 subjects, mock tests, and exam practice.",
            "availableTestsCount": 4,
            "subjects": [
              {
                "id": "btech-it-s8-subj-1",
                "name": "Artificial Intelligence & Cognitive Systems",
                "code": "IT-404",
                "description": "Search strategies, expert systems, and NLP applications.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s8-subj1-t1",
                    "title": "Artificial Intelligence & Cognitive Systems — Practice Test 1: Fundamental Concepts",
                    "subject": "Artificial Intelligence & Cognitive Systems",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Artificial Intelligence & Cognitive Systems."
                  },
                  {
                    "id": "btech-it-s8-subj1-t2",
                    "title": "Artificial Intelligence & Cognitive Systems — Practice Test 2: Exam Simulation",
                    "subject": "Artificial Intelligence & Cognitive Systems",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "btech-it-s8-subj-2",
                "name": "Major Technical Project & Dissertation",
                "code": "IT-405",
                "description": "Complete software solution development, defense, and documentation.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "btech-it-s8-subj2-t1",
                    "title": "Major Technical Project & Dissertation — Practice Test 1: Fundamental Concepts",
                    "subject": "Major Technical Project & Dissertation",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Major Technical Project & Dissertation."
                  },
                  {
                    "id": "btech-it-s8-subj2-t2",
                    "title": "Major Technical Project & Dissertation — Practice Test 2: Exam Simulation",
                    "subject": "Major Technical Project & Dissertation",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "semesters": [
      {
        "id": "semester-1",
        "number": 1,
        "title": "Semester 1",
        "description": "B.Tech (CSE) — Semester 1 subjects, mock tests, and exam practice.",
        "availableTestsCount": 10,
        "subjects": [
          {
            "id": "btech-cse-s1-subj-1",
            "name": "Engineering Mathematics I",
            "code": "MA-101",
            "description": "Differential calculus, matrices, Taylor series, and analytical geometry.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s1-subj1-t1",
                "title": "Engineering Mathematics I — Practice Test 1: Fundamental Concepts",
                "subject": "Engineering Mathematics I",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Mathematics I."
              },
              {
                "id": "btech-cse-s1-subj1-t2",
                "title": "Engineering Mathematics I — Practice Test 2: Exam Simulation",
                "subject": "Engineering Mathematics I",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "btech-cse-s1-subj-2",
            "name": "Engineering Physics",
            "code": "PH-101",
            "description": "Optics, quantum mechanics, lasers, and electromagnetic wave theory.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s1-subj2-t1",
                "title": "Engineering Physics — Practice Test 1: Fundamental Concepts",
                "subject": "Engineering Physics",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Physics."
              },
              {
                "id": "btech-cse-s1-subj2-t2",
                "title": "Engineering Physics — Practice Test 2: Exam Simulation",
                "subject": "Engineering Physics",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "btech-cse-s1-subj-3",
            "name": "Programming for Problem Solving in C",
            "code": "CS-101",
            "description": "Pointers, arrays, recursion, structs, and memory management in C.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s1-subj3-t1",
                "title": "Programming for Problem Solving in C — Practice Test 1: Fundamental Concepts",
                "subject": "Programming for Problem Solving in C",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Programming for Problem Solving in C."
              },
              {
                "id": "btech-cse-s1-subj3-t2",
                "title": "Programming for Problem Solving in C — Practice Test 2: Exam Simulation",
                "subject": "Programming for Problem Solving in C",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "btech-cse-s1-subj-4",
            "name": "Basic Electrical Engineering",
            "code": "EE-101",
            "description": "AC/DC circuits, transformers, Kirchhoff’s laws, and electrical machines.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s1-subj4-t1",
                "title": "Basic Electrical Engineering — Practice Test 1: Fundamental Concepts",
                "subject": "Basic Electrical Engineering",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Basic Electrical Engineering."
              },
              {
                "id": "btech-cse-s1-subj4-t2",
                "title": "Basic Electrical Engineering — Practice Test 2: Exam Simulation",
                "subject": "Basic Electrical Engineering",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "btech-cse-s1-subj-5",
            "name": "Engineering Graphics & Design",
            "code": "ME-101",
            "description": "Orthographic projections, isometric views, and CAD fundamentals.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s1-subj5-t1",
                "title": "Engineering Graphics & Design — Practice Test 1: Fundamental Concepts",
                "subject": "Engineering Graphics & Design",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Graphics & Design."
              },
              {
                "id": "btech-cse-s1-subj5-t2",
                "title": "Engineering Graphics & Design — Practice Test 2: Exam Simulation",
                "subject": "Engineering Graphics & Design",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      },
      {
        "id": "semester-2",
        "number": 2,
        "title": "Semester 2",
        "description": "B.Tech (CSE) — Semester 2 subjects, mock tests, and exam practice.",
        "availableTestsCount": 10,
        "subjects": [
          {
            "id": "btech-cse-s2-subj-1",
            "name": "Engineering Mathematics II",
            "code": "MA-102",
            "description": "Vector calculus, Fourier series, and ordinary differential equations.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s2-subj1-t1",
                "title": "Engineering Mathematics II — Practice Test 1: Fundamental Concepts",
                "subject": "Engineering Mathematics II",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Mathematics II."
              },
              {
                "id": "btech-cse-s2-subj1-t2",
                "title": "Engineering Mathematics II — Practice Test 2: Exam Simulation",
                "subject": "Engineering Mathematics II",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "btech-cse-s2-subj-2",
            "name": "Engineering Chemistry",
            "code": "CH-102",
            "description": "Spectroscopy, thermodynamics, chemical kinetics, and polymers.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s2-subj2-t1",
                "title": "Engineering Chemistry — Practice Test 1: Fundamental Concepts",
                "subject": "Engineering Chemistry",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Engineering Chemistry."
              },
              {
                "id": "btech-cse-s2-subj2-t2",
                "title": "Engineering Chemistry — Practice Test 2: Exam Simulation",
                "subject": "Engineering Chemistry",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "btech-cse-s2-subj-3",
            "name": "Data Structures & Algorithms",
            "code": "CS-102",
            "description": "Stacks, queues, linked lists, trees, and sorting algorithms.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s2-subj3-t1",
                "title": "Data Structures & Algorithms — Practice Test 1: Fundamental Concepts",
                "subject": "Data Structures & Algorithms",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Data Structures & Algorithms."
              },
              {
                "id": "btech-cse-s2-subj3-t2",
                "title": "Data Structures & Algorithms — Practice Test 2: Exam Simulation",
                "subject": "Data Structures & Algorithms",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "btech-cse-s2-subj-4",
            "name": "Basic Electronics Engineering",
            "code": "EC-102",
            "description": "Diodes, transistors, op-amps, and digital logic gates.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s2-subj4-t1",
                "title": "Basic Electronics Engineering — Practice Test 1: Fundamental Concepts",
                "subject": "Basic Electronics Engineering",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Basic Electronics Engineering."
              },
              {
                "id": "btech-cse-s2-subj4-t2",
                "title": "Basic Electronics Engineering — Practice Test 2: Exam Simulation",
                "subject": "Basic Electronics Engineering",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "btech-cse-s2-subj-5",
            "name": "Environmental Science",
            "code": "ES-102",
            "description": "Ecosystems, environmental pollution, and sustainable engineering.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s2-subj5-t1",
                "title": "Environmental Science — Practice Test 1: Fundamental Concepts",
                "subject": "Environmental Science",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Environmental Science."
              },
              {
                "id": "btech-cse-s2-subj5-t2",
                "title": "Environmental Science — Practice Test 2: Exam Simulation",
                "subject": "Environmental Science",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      },
      {
        "id": "semester-3",
        "number": 3,
        "title": "Semester 3",
        "description": "B.Tech (CSE) — Semester 3 subjects, mock tests, and exam practice.",
        "availableTestsCount": 8,
        "subjects": [
          {
            "id": "btech-cse-s3-subj-1",
            "name": "Discrete Mathematics",
            "code": "CS-201",
            "description": "Set theory, propositional logic, graph theory, and combinatorics.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s3-subj1-t1",
                "title": "Discrete Mathematics — Practice Test 1: Fundamental Concepts",
                "subject": "Discrete Mathematics",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Discrete Mathematics."
              },
              {
                "id": "btech-cse-s3-subj1-t2",
                "title": "Discrete Mathematics — Practice Test 2: Exam Simulation",
                "subject": "Discrete Mathematics",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "btech-cse-s3-subj-2",
            "name": "Object-Oriented Programming with C++",
            "code": "CS-202",
            "description": "Inheritance, polymorphism, templates, and STL in C++.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s3-subj2-t1",
                "title": "Object-Oriented Programming with C++ — Practice Test 1: Fundamental Concepts",
                "subject": "Object-Oriented Programming with C++",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Object-Oriented Programming with C++."
              },
              {
                "id": "btech-cse-s3-subj2-t2",
                "title": "Object-Oriented Programming with C++ — Practice Test 2: Exam Simulation",
                "subject": "Object-Oriented Programming with C++",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "btech-cse-s3-subj-3",
            "name": "Digital Logic & Circuit Design",
            "code": "CS-203",
            "description": "Boolean algebra, Karnaugh maps, multiplexers, and flip-flops.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s3-subj3-t1",
                "title": "Digital Logic & Circuit Design — Practice Test 1: Fundamental Concepts",
                "subject": "Digital Logic & Circuit Design",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Digital Logic & Circuit Design."
              },
              {
                "id": "btech-cse-s3-subj3-t2",
                "title": "Digital Logic & Circuit Design — Practice Test 2: Exam Simulation",
                "subject": "Digital Logic & Circuit Design",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "btech-cse-s3-subj-4",
            "name": "Computer Organization & Architecture",
            "code": "CS-204",
            "description": "Instruction set architecture, pipelining, and cache memory.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s3-subj4-t1",
                "title": "Computer Organization & Architecture — Practice Test 1: Fundamental Concepts",
                "subject": "Computer Organization & Architecture",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Computer Organization & Architecture."
              },
              {
                "id": "btech-cse-s3-subj4-t2",
                "title": "Computer Organization & Architecture — Practice Test 2: Exam Simulation",
                "subject": "Computer Organization & Architecture",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      },
      {
        "id": "semester-4",
        "number": 4,
        "title": "Semester 4",
        "description": "B.Tech (CSE) — Semester 4 subjects, mock tests, and exam practice.",
        "availableTestsCount": 8,
        "subjects": [
          {
            "id": "btech-cse-s4-subj-1",
            "name": "Design and Analysis of Algorithms",
            "code": "CS-205",
            "description": "Divide and conquer, dynamic programming, and greedy algorithms.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s4-subj1-t1",
                "title": "Design and Analysis of Algorithms — Practice Test 1: Fundamental Concepts",
                "subject": "Design and Analysis of Algorithms",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Design and Analysis of Algorithms."
              },
              {
                "id": "btech-cse-s4-subj1-t2",
                "title": "Design and Analysis of Algorithms — Practice Test 2: Exam Simulation",
                "subject": "Design and Analysis of Algorithms",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "btech-cse-s4-subj-2",
            "name": "Operating Systems",
            "code": "CS-206",
            "description": "Process scheduling, deadlocks, virtual memory, and file systems.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s4-subj2-t1",
                "title": "Operating Systems — Practice Test 1: Fundamental Concepts",
                "subject": "Operating Systems",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Operating Systems."
              },
              {
                "id": "btech-cse-s4-subj2-t2",
                "title": "Operating Systems — Practice Test 2: Exam Simulation",
                "subject": "Operating Systems",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "btech-cse-s4-subj-3",
            "name": "Database Management Systems",
            "code": "CS-207",
            "description": "Relational algebra, SQL, normalization, and ACID transactions.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s4-subj3-t1",
                "title": "Database Management Systems — Practice Test 1: Fundamental Concepts",
                "subject": "Database Management Systems",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Database Management Systems."
              },
              {
                "id": "btech-cse-s4-subj3-t2",
                "title": "Database Management Systems — Practice Test 2: Exam Simulation",
                "subject": "Database Management Systems",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "btech-cse-s4-subj-4",
            "name": "Theory of Computation",
            "code": "CS-208",
            "description": "Finite automata, context-free grammars, and Turing machines.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s4-subj4-t1",
                "title": "Theory of Computation — Practice Test 1: Fundamental Concepts",
                "subject": "Theory of Computation",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Theory of Computation."
              },
              {
                "id": "btech-cse-s4-subj4-t2",
                "title": "Theory of Computation — Practice Test 2: Exam Simulation",
                "subject": "Theory of Computation",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      },
      {
        "id": "semester-5",
        "number": 5,
        "title": "Semester 5",
        "description": "B.Tech (CSE) — Semester 5 subjects, mock tests, and exam practice.",
        "availableTestsCount": 8,
        "subjects": [
          {
            "id": "btech-cse-s5-subj-1",
            "name": "Computer Networks",
            "code": "CS-301",
            "description": "OSI layers, TCP/IP, IP addressing, routing protocols, and congestion.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s5-subj1-t1",
                "title": "Computer Networks — Practice Test 1: Fundamental Concepts",
                "subject": "Computer Networks",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Computer Networks."
              },
              {
                "id": "btech-cse-s5-subj1-t2",
                "title": "Computer Networks — Practice Test 2: Exam Simulation",
                "subject": "Computer Networks",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "btech-cse-s5-subj-2",
            "name": "Compiler Design",
            "code": "CS-302",
            "description": "Lexical analysis, syntax trees, semantic checking, and code generation.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s5-subj2-t1",
                "title": "Compiler Design — Practice Test 1: Fundamental Concepts",
                "subject": "Compiler Design",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Compiler Design."
              },
              {
                "id": "btech-cse-s5-subj2-t2",
                "title": "Compiler Design — Practice Test 2: Exam Simulation",
                "subject": "Compiler Design",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "btech-cse-s5-subj-3",
            "name": "Web Technologies & Frameworks",
            "code": "CS-303",
            "description": "HTML5, CSS3, modern JavaScript, REST APIs, and responsive design.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s5-subj3-t1",
                "title": "Web Technologies & Frameworks — Practice Test 1: Fundamental Concepts",
                "subject": "Web Technologies & Frameworks",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Web Technologies & Frameworks."
              },
              {
                "id": "btech-cse-s5-subj3-t2",
                "title": "Web Technologies & Frameworks — Practice Test 2: Exam Simulation",
                "subject": "Web Technologies & Frameworks",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "btech-cse-s5-subj-4",
            "name": "Artificial Intelligence",
            "code": "CS-304",
            "description": "Heuristic search, knowledge representation, game playing, and Bayes nets.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s5-subj4-t1",
                "title": "Artificial Intelligence — Practice Test 1: Fundamental Concepts",
                "subject": "Artificial Intelligence",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Artificial Intelligence."
              },
              {
                "id": "btech-cse-s5-subj4-t2",
                "title": "Artificial Intelligence — Practice Test 2: Exam Simulation",
                "subject": "Artificial Intelligence",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      },
      {
        "id": "semester-6",
        "number": 6,
        "title": "Semester 6",
        "description": "B.Tech (CSE) — Semester 6 subjects, mock tests, and exam practice.",
        "availableTestsCount": 8,
        "subjects": [
          {
            "id": "btech-cse-s6-subj-1",
            "name": "Machine Learning",
            "code": "CS-305",
            "description": "Supervised learning, classification, clustering, and gradient descent.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s6-subj1-t1",
                "title": "Machine Learning — Practice Test 1: Fundamental Concepts",
                "subject": "Machine Learning",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Machine Learning."
              },
              {
                "id": "btech-cse-s6-subj1-t2",
                "title": "Machine Learning — Practice Test 2: Exam Simulation",
                "subject": "Machine Learning",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "btech-cse-s6-subj-2",
            "name": "Cloud Computing & Distributed Systems",
            "code": "CS-306",
            "description": "Virtualization, microservices, containerization, and AWS/Azure architectures.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s6-subj2-t1",
                "title": "Cloud Computing & Distributed Systems — Practice Test 1: Fundamental Concepts",
                "subject": "Cloud Computing & Distributed Systems",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Cloud Computing & Distributed Systems."
              },
              {
                "id": "btech-cse-s6-subj2-t2",
                "title": "Cloud Computing & Distributed Systems — Practice Test 2: Exam Simulation",
                "subject": "Cloud Computing & Distributed Systems",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "btech-cse-s6-subj-3",
            "name": "Information & Cyber Security",
            "code": "CS-307",
            "description": "Cryptography, public-key infrastructure, firewalls, and network defense.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s6-subj3-t1",
                "title": "Information & Cyber Security — Practice Test 1: Fundamental Concepts",
                "subject": "Information & Cyber Security",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Information & Cyber Security."
              },
              {
                "id": "btech-cse-s6-subj3-t2",
                "title": "Information & Cyber Security — Practice Test 2: Exam Simulation",
                "subject": "Information & Cyber Security",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "btech-cse-s6-subj-4",
            "name": "Internet of Things (IoT)",
            "code": "CS-308",
            "description": "Embedded sensors, MQTT/CoAP protocols, and edge analytics.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s6-subj4-t1",
                "title": "Internet of Things (IoT) — Practice Test 1: Fundamental Concepts",
                "subject": "Internet of Things (IoT)",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Internet of Things (IoT)."
              },
              {
                "id": "btech-cse-s6-subj4-t2",
                "title": "Internet of Things (IoT) — Practice Test 2: Exam Simulation",
                "subject": "Internet of Things (IoT)",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      },
      {
        "id": "semester-7",
        "number": 7,
        "title": "Semester 7",
        "description": "B.Tech (CSE) — Semester 7 subjects, mock tests, and exam practice.",
        "availableTestsCount": 8,
        "subjects": [
          {
            "id": "btech-cse-s7-subj-1",
            "name": "Deep Learning & Neural Networks",
            "code": "CS-401",
            "description": "CNNs, RNNs, Transformers, backpropagation, and PyTorch.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s7-subj1-t1",
                "title": "Deep Learning & Neural Networks — Practice Test 1: Fundamental Concepts",
                "subject": "Deep Learning & Neural Networks",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Deep Learning & Neural Networks."
              },
              {
                "id": "btech-cse-s7-subj1-t2",
                "title": "Deep Learning & Neural Networks — Practice Test 2: Exam Simulation",
                "subject": "Deep Learning & Neural Networks",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "btech-cse-s7-subj-2",
            "name": "Big Data Analytics",
            "code": "CS-402",
            "description": "Hadoop, Spark, MapReduce, and distributed data pipelines.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s7-subj2-t1",
                "title": "Big Data Analytics — Practice Test 1: Fundamental Concepts",
                "subject": "Big Data Analytics",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Big Data Analytics."
              },
              {
                "id": "btech-cse-s7-subj2-t2",
                "title": "Big Data Analytics — Practice Test 2: Exam Simulation",
                "subject": "Big Data Analytics",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "btech-cse-s7-subj-3",
            "name": "Mobile Application Development",
            "code": "CS-403",
            "description": "Android SDK, cross-platform frameworks, and mobile UX design.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s7-subj3-t1",
                "title": "Mobile Application Development — Practice Test 1: Fundamental Concepts",
                "subject": "Mobile Application Development",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Mobile Application Development."
              },
              {
                "id": "btech-cse-s7-subj3-t2",
                "title": "Mobile Application Development — Practice Test 2: Exam Simulation",
                "subject": "Mobile Application Development",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "btech-cse-s7-subj-4",
            "name": "Blockchain Technologies",
            "code": "CS-404",
            "description": "Decentralized consensus, smart contracts, and Ethereum architecture.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s7-subj4-t1",
                "title": "Blockchain Technologies — Practice Test 1: Fundamental Concepts",
                "subject": "Blockchain Technologies",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Blockchain Technologies."
              },
              {
                "id": "btech-cse-s7-subj4-t2",
                "title": "Blockchain Technologies — Practice Test 2: Exam Simulation",
                "subject": "Blockchain Technologies",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      },
      {
        "id": "semester-8",
        "number": 8,
        "title": "Semester 8",
        "description": "B.Tech (CSE) — Semester 8 subjects, mock tests, and exam practice.",
        "availableTestsCount": 8,
        "subjects": [
          {
            "id": "btech-cse-s8-subj-1",
            "name": "Natural Language Processing",
            "code": "CS-405",
            "description": "Tokenization, word embeddings, attention mechanisms, and LLMs.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s8-subj1-t1",
                "title": "Natural Language Processing — Practice Test 1: Fundamental Concepts",
                "subject": "Natural Language Processing",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Natural Language Processing."
              },
              {
                "id": "btech-cse-s8-subj1-t2",
                "title": "Natural Language Processing — Practice Test 2: Exam Simulation",
                "subject": "Natural Language Processing",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "btech-cse-s8-subj-2",
            "name": "Autonomous Robotics & Control",
            "code": "CS-406",
            "description": "Kinematics, sensor fusion, path planning, and ROS framework.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s8-subj2-t1",
                "title": "Autonomous Robotics & Control — Practice Test 1: Fundamental Concepts",
                "subject": "Autonomous Robotics & Control",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Autonomous Robotics & Control."
              },
              {
                "id": "btech-cse-s8-subj2-t2",
                "title": "Autonomous Robotics & Control — Practice Test 2: Exam Simulation",
                "subject": "Autonomous Robotics & Control",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "btech-cse-s8-subj-3",
            "name": "Quantum Computing Fundamentals",
            "code": "CS-407",
            "description": "Qubits, quantum gates, entanglement, and Shor’s algorithm.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s8-subj3-t1",
                "title": "Quantum Computing Fundamentals — Practice Test 1: Fundamental Concepts",
                "subject": "Quantum Computing Fundamentals",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Quantum Computing Fundamentals."
              },
              {
                "id": "btech-cse-s8-subj3-t2",
                "title": "Quantum Computing Fundamentals — Practice Test 2: Exam Simulation",
                "subject": "Quantum Computing Fundamentals",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "btech-cse-s8-subj-4",
            "name": "Capstone Engineering Project & Viva",
            "code": "CS-408",
            "description": "Comprehensive technical review, system defense, and practical assessment.",
            "testsCount": 2,
            "tests": [
              {
                "id": "btech-cse-s8-subj4-t1",
                "title": "Capstone Engineering Project & Viva — Practice Test 1: Fundamental Concepts",
                "subject": "Capstone Engineering Project & Viva",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Capstone Engineering Project & Viva."
              },
              {
                "id": "btech-cse-s8-subj4-t2",
                "title": "Capstone Engineering Project & Viva — Practice Test 2: Exam Simulation",
                "subject": "Capstone Engineering Project & Viva",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca",
    "name": "BCA",
    "title": "Bachelor of Computer Applications",
    "description": "Computer applications, programming, data structures, and software foundations across six semesters.",
    "iconName": "Code2",
    "totalSemesters": 6,
    "totalMockTests": 124,
    "branches": [
      {
        "id": "software",
        "name": "Software Development & Web Technologies",
        "code": "BCA-SD",
        "description": "Modern software engineering, full stack web development, Java, Python, and mobile applications.",
        "totalSemesters": 6,
        "totalMockTests": 46,
        "semesters": [
          {
            "id": "semester-1",
            "number": 1,
            "title": "Semester 1",
            "description": "BCA (BCA-SD) — Semester 1 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "bca-software-s1-subj-1",
                "name": "Fundamentals of Computers & IT",
                "code": "BCA-101",
                "description": "Hardware components, operating systems, and computer fundamentals.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-software-s1-subj1-t1",
                    "title": "Fundamentals of Computers & IT — Practice Test 1: Fundamental Concepts",
                    "subject": "Fundamentals of Computers & IT",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Fundamentals of Computers & IT."
                  },
                  {
                    "id": "bca-software-s1-subj1-t2",
                    "title": "Fundamentals of Computers & IT — Practice Test 2: Exam Simulation",
                    "subject": "Fundamentals of Computers & IT",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-software-s1-subj-2",
                "name": "Programming in C",
                "code": "BCA-102",
                "description": "Control flow, pointers, arrays, and structured program design.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-software-s1-subj2-t1",
                    "title": "Programming in C — Practice Test 1: Fundamental Concepts",
                    "subject": "Programming in C",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Programming in C."
                  },
                  {
                    "id": "bca-software-s1-subj2-t2",
                    "title": "Programming in C — Practice Test 2: Exam Simulation",
                    "subject": "Programming in C",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-software-s1-subj-3",
                "name": "Mathematical Foundations for CS",
                "code": "BCA-103",
                "description": "Matrices, set theory, functions, and elementary calculus.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-software-s1-subj3-t1",
                    "title": "Mathematical Foundations for CS — Practice Test 1: Fundamental Concepts",
                    "subject": "Mathematical Foundations for CS",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Mathematical Foundations for CS."
                  },
                  {
                    "id": "bca-software-s1-subj3-t2",
                    "title": "Mathematical Foundations for CS — Practice Test 2: Exam Simulation",
                    "subject": "Mathematical Foundations for CS",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-software-s1-subj-4",
                "name": "Digital Electronics",
                "code": "BCA-104",
                "description": "Number systems, logic gates, and boolean simplification.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-software-s1-subj4-t1",
                    "title": "Digital Electronics — Practice Test 1: Fundamental Concepts",
                    "subject": "Digital Electronics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Digital Electronics."
                  },
                  {
                    "id": "bca-software-s1-subj4-t2",
                    "title": "Digital Electronics — Practice Test 2: Exam Simulation",
                    "subject": "Digital Electronics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-2",
            "number": 2,
            "title": "Semester 2",
            "description": "BCA (BCA-SD) — Semester 2 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "bca-software-s2-subj-1",
                "name": "Data Structures using C++",
                "code": "BCA-201",
                "description": "Stacks, queues, linked lists, trees, and searching algorithms.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-software-s2-subj1-t1",
                    "title": "Data Structures using C++ — Practice Test 1: Fundamental Concepts",
                    "subject": "Data Structures using C++",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Data Structures using C++."
                  },
                  {
                    "id": "bca-software-s2-subj1-t2",
                    "title": "Data Structures using C++ — Practice Test 2: Exam Simulation",
                    "subject": "Data Structures using C++",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-software-s2-subj-2",
                "name": "Database Management Systems (SQL)",
                "code": "BCA-202",
                "description": "ER diagrams, SQL queries, relational normalization, and views.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-software-s2-subj2-t1",
                    "title": "Database Management Systems (SQL) — Practice Test 1: Fundamental Concepts",
                    "subject": "Database Management Systems (SQL)",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Database Management Systems (SQL)."
                  },
                  {
                    "id": "bca-software-s2-subj2-t2",
                    "title": "Database Management Systems (SQL) — Practice Test 2: Exam Simulation",
                    "subject": "Database Management Systems (SQL)",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-software-s2-subj-3",
                "name": "Web Designing (HTML5, CSS3, JS)",
                "code": "BCA-203",
                "description": "Semantic markup, styling, flexbox/grid, and DOM manipulation.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-software-s2-subj3-t1",
                    "title": "Web Designing (HTML5, CSS3, JS) — Practice Test 1: Fundamental Concepts",
                    "subject": "Web Designing (HTML5, CSS3, JS)",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Web Designing (HTML5, CSS3, JS)."
                  },
                  {
                    "id": "bca-software-s2-subj3-t2",
                    "title": "Web Designing (HTML5, CSS3, JS) — Practice Test 2: Exam Simulation",
                    "subject": "Web Designing (HTML5, CSS3, JS)",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-software-s2-subj-4",
                "name": "Numerical and Statistical Methods",
                "code": "BCA-204",
                "description": "Root finding, interpolation, correlation, and regression.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-software-s2-subj4-t1",
                    "title": "Numerical and Statistical Methods — Practice Test 1: Fundamental Concepts",
                    "subject": "Numerical and Statistical Methods",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Numerical and Statistical Methods."
                  },
                  {
                    "id": "bca-software-s2-subj4-t2",
                    "title": "Numerical and Statistical Methods — Practice Test 2: Exam Simulation",
                    "subject": "Numerical and Statistical Methods",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-3",
            "number": 3,
            "title": "Semester 3",
            "description": "BCA (BCA-SD) — Semester 3 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "bca-software-s3-subj-1",
                "name": "Core Java Programming",
                "code": "BCA-301",
                "description": "OOP concepts, exception handling, multithreading, and swings.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-software-s3-subj1-t1",
                    "title": "Core Java Programming — Practice Test 1: Fundamental Concepts",
                    "subject": "Core Java Programming",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Core Java Programming."
                  },
                  {
                    "id": "bca-software-s3-subj1-t2",
                    "title": "Core Java Programming — Practice Test 2: Exam Simulation",
                    "subject": "Core Java Programming",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-software-s3-subj-2",
                "name": "Operating System Principles",
                "code": "BCA-302",
                "description": "Memory allocation, process states, synchronization, and storage.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-software-s3-subj2-t1",
                    "title": "Operating System Principles — Practice Test 1: Fundamental Concepts",
                    "subject": "Operating System Principles",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Operating System Principles."
                  },
                  {
                    "id": "bca-software-s3-subj2-t2",
                    "title": "Operating System Principles — Practice Test 2: Exam Simulation",
                    "subject": "Operating System Principles",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-software-s3-subj-3",
                "name": "Computer Networks Fundamentals",
                "code": "BCA-303",
                "description": "Topology, switching, protocols, IP addressing, and subnetting.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-software-s3-subj3-t1",
                    "title": "Computer Networks Fundamentals — Practice Test 1: Fundamental Concepts",
                    "subject": "Computer Networks Fundamentals",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Computer Networks Fundamentals."
                  },
                  {
                    "id": "bca-software-s3-subj3-t2",
                    "title": "Computer Networks Fundamentals — Practice Test 2: Exam Simulation",
                    "subject": "Computer Networks Fundamentals",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-software-s3-subj-4",
                "name": "Software Engineering",
                "code": "BCA-304",
                "description": "Waterfall, Agile, requirements analysis, and testing strategies.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-software-s3-subj4-t1",
                    "title": "Software Engineering — Practice Test 1: Fundamental Concepts",
                    "subject": "Software Engineering",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Software Engineering."
                  },
                  {
                    "id": "bca-software-s3-subj4-t2",
                    "title": "Software Engineering — Practice Test 2: Exam Simulation",
                    "subject": "Software Engineering",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-4",
            "number": 4,
            "title": "Semester 4",
            "description": "BCA (BCA-SD) — Semester 4 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "bca-software-s4-subj-1",
                "name": "Python Programming",
                "code": "BCA-401",
                "description": "Data types, file I/O, OOP, NumPy, and Pandas library.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-software-s4-subj1-t1",
                    "title": "Python Programming — Practice Test 1: Fundamental Concepts",
                    "subject": "Python Programming",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Python Programming."
                  },
                  {
                    "id": "bca-software-s4-subj1-t2",
                    "title": "Python Programming — Practice Test 2: Exam Simulation",
                    "subject": "Python Programming",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-software-s4-subj-2",
                "name": "PHP and MySQL Web Applications",
                "code": "BCA-402",
                "description": "Server scripting, database connectivity, and session management.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-software-s4-subj2-t1",
                    "title": "PHP and MySQL Web Applications — Practice Test 1: Fundamental Concepts",
                    "subject": "PHP and MySQL Web Applications",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in PHP and MySQL Web Applications."
                  },
                  {
                    "id": "bca-software-s4-subj2-t2",
                    "title": "PHP and MySQL Web Applications — Practice Test 2: Exam Simulation",
                    "subject": "PHP and MySQL Web Applications",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-software-s4-subj-3",
                "name": "Design and Analysis of Algorithms",
                "code": "BCA-403",
                "description": "Divide and conquer, greedy methods, and complexity classes.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-software-s4-subj3-t1",
                    "title": "Design and Analysis of Algorithms — Practice Test 1: Fundamental Concepts",
                    "subject": "Design and Analysis of Algorithms",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Design and Analysis of Algorithms."
                  },
                  {
                    "id": "bca-software-s4-subj3-t2",
                    "title": "Design and Analysis of Algorithms — Practice Test 2: Exam Simulation",
                    "subject": "Design and Analysis of Algorithms",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-software-s4-subj-4",
                "name": "Computer Graphics & Multimedia",
                "code": "BCA-404",
                "description": "2D/3D transformations, rasterization, and clipping algorithms.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-software-s4-subj4-t1",
                    "title": "Computer Graphics & Multimedia — Practice Test 1: Fundamental Concepts",
                    "subject": "Computer Graphics & Multimedia",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Computer Graphics & Multimedia."
                  },
                  {
                    "id": "bca-software-s4-subj4-t2",
                    "title": "Computer Graphics & Multimedia — Practice Test 2: Exam Simulation",
                    "subject": "Computer Graphics & Multimedia",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-5",
            "number": 5,
            "title": "Semester 5",
            "description": "BCA (BCA-SD) — Semester 5 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "bca-software-s5-subj-1",
                "name": "Full Stack Development (MERN)",
                "code": "BCA-501",
                "description": "MongoDB, Express.js, React.js, and Node.js architectures.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-software-s5-subj1-t1",
                    "title": "Full Stack Development (MERN) — Practice Test 1: Fundamental Concepts",
                    "subject": "Full Stack Development (MERN)",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Full Stack Development (MERN)."
                  },
                  {
                    "id": "bca-software-s5-subj1-t2",
                    "title": "Full Stack Development (MERN) — Practice Test 2: Exam Simulation",
                    "subject": "Full Stack Development (MERN)",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-software-s5-subj-2",
                "name": "Cyber Security & Ethical Hacking",
                "code": "BCA-502",
                "description": "Vulnerability assessment, cryptography, and network defense.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-software-s5-subj2-t1",
                    "title": "Cyber Security & Ethical Hacking — Practice Test 1: Fundamental Concepts",
                    "subject": "Cyber Security & Ethical Hacking",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Cyber Security & Ethical Hacking."
                  },
                  {
                    "id": "bca-software-s5-subj2-t2",
                    "title": "Cyber Security & Ethical Hacking — Practice Test 2: Exam Simulation",
                    "subject": "Cyber Security & Ethical Hacking",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-software-s5-subj-3",
                "name": "Mobile App Development",
                "code": "BCA-503",
                "description": "Building mobile interfaces, storage, and API integration.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-software-s5-subj3-t1",
                    "title": "Mobile App Development — Practice Test 1: Fundamental Concepts",
                    "subject": "Mobile App Development",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Mobile App Development."
                  },
                  {
                    "id": "bca-software-s5-subj3-t2",
                    "title": "Mobile App Development — Practice Test 2: Exam Simulation",
                    "subject": "Mobile App Development",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-software-s5-subj-4",
                "name": "Cloud Computing Fundamentals",
                "code": "BCA-504",
                "description": "Cloud service models, virtualization, and deployment.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-software-s5-subj4-t1",
                    "title": "Cloud Computing Fundamentals — Practice Test 1: Fundamental Concepts",
                    "subject": "Cloud Computing Fundamentals",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Cloud Computing Fundamentals."
                  },
                  {
                    "id": "bca-software-s5-subj4-t2",
                    "title": "Cloud Computing Fundamentals — Practice Test 2: Exam Simulation",
                    "subject": "Cloud Computing Fundamentals",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-6",
            "number": 6,
            "title": "Semester 6",
            "description": "BCA (BCA-SD) — Semester 6 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "bca-software-s6-subj-1",
                "name": "Machine Learning with Python",
                "code": "BCA-601",
                "description": "Classification models, regression, clustering, and Scikit-learn.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-software-s6-subj1-t1",
                    "title": "Machine Learning with Python — Practice Test 1: Fundamental Concepts",
                    "subject": "Machine Learning with Python",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Machine Learning with Python."
                  },
                  {
                    "id": "bca-software-s6-subj1-t2",
                    "title": "Machine Learning with Python — Practice Test 2: Exam Simulation",
                    "subject": "Machine Learning with Python",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-software-s6-subj-2",
                "name": "Software Testing & Quality Assurance",
                "code": "BCA-602",
                "description": "Manual testing, automation with Selenium, and test cases.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-software-s6-subj2-t1",
                    "title": "Software Testing & Quality Assurance — Practice Test 1: Fundamental Concepts",
                    "subject": "Software Testing & Quality Assurance",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Software Testing & Quality Assurance."
                  },
                  {
                    "id": "bca-software-s6-subj2-t2",
                    "title": "Software Testing & Quality Assurance — Practice Test 2: Exam Simulation",
                    "subject": "Software Testing & Quality Assurance",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-software-s6-subj-3",
                "name": "Capstone Software Project & Viva",
                "code": "BCA-603",
                "description": "Complete software development lifecycle project and viva.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-software-s6-subj3-t1",
                    "title": "Capstone Software Project & Viva — Practice Test 1: Fundamental Concepts",
                    "subject": "Capstone Software Project & Viva",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Capstone Software Project & Viva."
                  },
                  {
                    "id": "bca-software-s6-subj3-t2",
                    "title": "Capstone Software Project & Viva — Practice Test 2: Exam Simulation",
                    "subject": "Capstone Software Project & Viva",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "data-science",
        "name": "Data Science & Artificial Intelligence",
        "code": "BCA-DS",
        "description": "Big data analytics, machine learning, statistical modeling, and data visualization.",
        "totalSemesters": 6,
        "totalMockTests": 40,
        "semesters": [
          {
            "id": "semester-1",
            "number": 1,
            "title": "Semester 1",
            "description": "BCA (BCA-DS) — Semester 1 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "bca-data-science-s1-subj-1",
                "name": "Computer Fundamentals",
                "code": "BCA-101",
                "description": "Hardware, software, and networking essentials.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-data-science-s1-subj1-t1",
                    "title": "Computer Fundamentals — Practice Test 1: Fundamental Concepts",
                    "subject": "Computer Fundamentals",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Computer Fundamentals."
                  },
                  {
                    "id": "bca-data-science-s1-subj1-t2",
                    "title": "Computer Fundamentals — Practice Test 2: Exam Simulation",
                    "subject": "Computer Fundamentals",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-data-science-s1-subj-2",
                "name": "Programming in Python",
                "code": "BCA-DS-102",
                "description": "Python foundations, syntax, functions, and data structures.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-data-science-s1-subj2-t1",
                    "title": "Programming in Python — Practice Test 1: Fundamental Concepts",
                    "subject": "Programming in Python",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Programming in Python."
                  },
                  {
                    "id": "bca-data-science-s1-subj2-t2",
                    "title": "Programming in Python — Practice Test 2: Exam Simulation",
                    "subject": "Programming in Python",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-data-science-s1-subj-3",
                "name": "Linear Algebra & Calculus for Data Science",
                "code": "BCA-DS-103",
                "description": "Vectors, matrices, derivatives, and optimizations.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-data-science-s1-subj3-t1",
                    "title": "Linear Algebra & Calculus for Data Science — Practice Test 1: Fundamental Concepts",
                    "subject": "Linear Algebra & Calculus for Data Science",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Linear Algebra & Calculus for Data Science."
                  },
                  {
                    "id": "bca-data-science-s1-subj3-t2",
                    "title": "Linear Algebra & Calculus for Data Science — Practice Test 2: Exam Simulation",
                    "subject": "Linear Algebra & Calculus for Data Science",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-data-science-s1-subj-4",
                "name": "Descriptive Statistics",
                "code": "BCA-DS-104",
                "description": "Measures of central tendency, dispersion, and distributions.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-data-science-s1-subj4-t1",
                    "title": "Descriptive Statistics — Practice Test 1: Fundamental Concepts",
                    "subject": "Descriptive Statistics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Descriptive Statistics."
                  },
                  {
                    "id": "bca-data-science-s1-subj4-t2",
                    "title": "Descriptive Statistics — Practice Test 2: Exam Simulation",
                    "subject": "Descriptive Statistics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-2",
            "number": 2,
            "title": "Semester 2",
            "description": "BCA (BCA-DS) — Semester 2 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "bca-data-science-s2-subj-1",
                "name": "Data Structures with Python",
                "code": "BCA-DS-201",
                "description": "Linear and non-linear data structures in Python.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-data-science-s2-subj1-t1",
                    "title": "Data Structures with Python — Practice Test 1: Fundamental Concepts",
                    "subject": "Data Structures with Python",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Data Structures with Python."
                  },
                  {
                    "id": "bca-data-science-s2-subj1-t2",
                    "title": "Data Structures with Python — Practice Test 2: Exam Simulation",
                    "subject": "Data Structures with Python",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-data-science-s2-subj-2",
                "name": "Relational & NoSQL Databases",
                "code": "BCA-DS-202",
                "description": "SQL querying, normalization, and MongoDB document storage.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-data-science-s2-subj2-t1",
                    "title": "Relational & NoSQL Databases — Practice Test 1: Fundamental Concepts",
                    "subject": "Relational & NoSQL Databases",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Relational & NoSQL Databases."
                  },
                  {
                    "id": "bca-data-science-s2-subj2-t2",
                    "title": "Relational & NoSQL Databases — Practice Test 2: Exam Simulation",
                    "subject": "Relational & NoSQL Databases",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-data-science-s2-subj-3",
                "name": "Inferential Statistics & Probability",
                "code": "BCA-DS-203",
                "description": "Hypothesis testing, t-tests, ANOVA, and probability rules.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-data-science-s2-subj3-t1",
                    "title": "Inferential Statistics & Probability — Practice Test 1: Fundamental Concepts",
                    "subject": "Inferential Statistics & Probability",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Inferential Statistics & Probability."
                  },
                  {
                    "id": "bca-data-science-s2-subj3-t2",
                    "title": "Inferential Statistics & Probability — Practice Test 2: Exam Simulation",
                    "subject": "Inferential Statistics & Probability",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-data-science-s2-subj-4",
                "name": "Data Wrangling with Pandas",
                "code": "BCA-DS-204",
                "description": "Data cleaning, transformation, reshaping, and merging.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-data-science-s2-subj4-t1",
                    "title": "Data Wrangling with Pandas — Practice Test 1: Fundamental Concepts",
                    "subject": "Data Wrangling with Pandas",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Data Wrangling with Pandas."
                  },
                  {
                    "id": "bca-data-science-s2-subj4-t2",
                    "title": "Data Wrangling with Pandas — Practice Test 2: Exam Simulation",
                    "subject": "Data Wrangling with Pandas",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-3",
            "number": 3,
            "title": "Semester 3",
            "description": "BCA (BCA-DS) — Semester 3 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "bca-data-science-s3-subj-1",
                "name": "Machine Learning Algorithms",
                "code": "BCA-DS-301",
                "description": "Supervised and unsupervised learning techniques.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-data-science-s3-subj1-t1",
                    "title": "Machine Learning Algorithms — Practice Test 1: Fundamental Concepts",
                    "subject": "Machine Learning Algorithms",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Machine Learning Algorithms."
                  },
                  {
                    "id": "bca-data-science-s3-subj1-t2",
                    "title": "Machine Learning Algorithms — Practice Test 2: Exam Simulation",
                    "subject": "Machine Learning Algorithms",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-data-science-s3-subj-2",
                "name": "Data Visualization (Tableau & Matplotlib)",
                "code": "BCA-DS-302",
                "description": "Dashboard design, storytelling with data, and visual analytics.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-data-science-s3-subj2-t1",
                    "title": "Data Visualization (Tableau & Matplotlib) — Practice Test 1: Fundamental Concepts",
                    "subject": "Data Visualization (Tableau & Matplotlib)",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Data Visualization (Tableau & Matplotlib)."
                  },
                  {
                    "id": "bca-data-science-s3-subj2-t2",
                    "title": "Data Visualization (Tableau & Matplotlib) — Practice Test 2: Exam Simulation",
                    "subject": "Data Visualization (Tableau & Matplotlib)",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-data-science-s3-subj-3",
                "name": "R Programming for Statistics",
                "code": "BCA-DS-303",
                "description": "Statistical programming and exploratory data analysis in R.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-data-science-s3-subj3-t1",
                    "title": "R Programming for Statistics — Practice Test 1: Fundamental Concepts",
                    "subject": "R Programming for Statistics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in R Programming for Statistics."
                  },
                  {
                    "id": "bca-data-science-s3-subj3-t2",
                    "title": "R Programming for Statistics — Practice Test 2: Exam Simulation",
                    "subject": "R Programming for Statistics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-data-science-s3-subj-4",
                "name": "Operating Systems & Scripting",
                "code": "BCA-DS-304",
                "description": "Shell scripting, processes, and file administration.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-data-science-s3-subj4-t1",
                    "title": "Operating Systems & Scripting — Practice Test 1: Fundamental Concepts",
                    "subject": "Operating Systems & Scripting",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Operating Systems & Scripting."
                  },
                  {
                    "id": "bca-data-science-s3-subj4-t2",
                    "title": "Operating Systems & Scripting — Practice Test 2: Exam Simulation",
                    "subject": "Operating Systems & Scripting",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-4",
            "number": 4,
            "title": "Semester 4",
            "description": "BCA (BCA-DS) — Semester 4 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "bca-data-science-s4-subj-1",
                "name": "Deep Learning & Neural Networks",
                "code": "BCA-DS-401",
                "description": "Perceptrons, backpropagation, CNNs, and TensorFlow.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-data-science-s4-subj1-t1",
                    "title": "Deep Learning & Neural Networks — Practice Test 1: Fundamental Concepts",
                    "subject": "Deep Learning & Neural Networks",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Deep Learning & Neural Networks."
                  },
                  {
                    "id": "bca-data-science-s4-subj1-t2",
                    "title": "Deep Learning & Neural Networks — Practice Test 2: Exam Simulation",
                    "subject": "Deep Learning & Neural Networks",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-data-science-s4-subj-2",
                "name": "Big Data Processing with PySpark",
                "code": "BCA-DS-402",
                "description": "Distributed computing, RDDs, DataFrames, and pipelines.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-data-science-s4-subj2-t1",
                    "title": "Big Data Processing with PySpark — Practice Test 1: Fundamental Concepts",
                    "subject": "Big Data Processing with PySpark",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Big Data Processing with PySpark."
                  },
                  {
                    "id": "bca-data-science-s4-subj2-t2",
                    "title": "Big Data Processing with PySpark — Practice Test 2: Exam Simulation",
                    "subject": "Big Data Processing with PySpark",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-data-science-s4-subj-3",
                "name": "Natural Language Processing Fundamentals",
                "code": "BCA-DS-403",
                "description": "Text preprocessing, TF-IDF, sentiment analysis, and NLTK.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-data-science-s4-subj3-t1",
                    "title": "Natural Language Processing Fundamentals — Practice Test 1: Fundamental Concepts",
                    "subject": "Natural Language Processing Fundamentals",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Natural Language Processing Fundamentals."
                  },
                  {
                    "id": "bca-data-science-s4-subj3-t2",
                    "title": "Natural Language Processing Fundamentals — Practice Test 2: Exam Simulation",
                    "subject": "Natural Language Processing Fundamentals",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-5",
            "number": 5,
            "title": "Semester 5",
            "description": "BCA (BCA-DS) — Semester 5 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "bca-data-science-s5-subj-1",
                "name": "Time Series Analysis & Forecasting",
                "code": "BCA-DS-501",
                "description": "ARIMA, exponential smoothing, seasonality, and trend models.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-data-science-s5-subj1-t1",
                    "title": "Time Series Analysis & Forecasting — Practice Test 1: Fundamental Concepts",
                    "subject": "Time Series Analysis & Forecasting",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Time Series Analysis & Forecasting."
                  },
                  {
                    "id": "bca-data-science-s5-subj1-t2",
                    "title": "Time Series Analysis & Forecasting — Practice Test 2: Exam Simulation",
                    "subject": "Time Series Analysis & Forecasting",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-data-science-s5-subj-2",
                "name": "Business Intelligence & Metrics",
                "code": "BCA-DS-502",
                "description": "KPI development, data cubes, and reporting frameworks.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-data-science-s5-subj2-t1",
                    "title": "Business Intelligence & Metrics — Practice Test 1: Fundamental Concepts",
                    "subject": "Business Intelligence & Metrics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Business Intelligence & Metrics."
                  },
                  {
                    "id": "bca-data-science-s5-subj2-t2",
                    "title": "Business Intelligence & Metrics — Practice Test 2: Exam Simulation",
                    "subject": "Business Intelligence & Metrics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-data-science-s5-subj-3",
                "name": "Cloud AI Services & Deployment",
                "code": "BCA-DS-503",
                "description": "Model serving, Docker containerization, and cloud APIs.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-data-science-s5-subj3-t1",
                    "title": "Cloud AI Services & Deployment — Practice Test 1: Fundamental Concepts",
                    "subject": "Cloud AI Services & Deployment",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Cloud AI Services & Deployment."
                  },
                  {
                    "id": "bca-data-science-s5-subj3-t2",
                    "title": "Cloud AI Services & Deployment — Practice Test 2: Exam Simulation",
                    "subject": "Cloud AI Services & Deployment",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-6",
            "number": 6,
            "title": "Semester 6",
            "description": "BCA (BCA-DS) — Semester 6 subjects, mock tests, and exam practice.",
            "availableTestsCount": 4,
            "subjects": [
              {
                "id": "bca-data-science-s6-subj-1",
                "name": "AI Ethics, Privacy & Governance",
                "code": "BCA-DS-601",
                "description": "Model interpretability, algorithmic bias, and data privacy.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-data-science-s6-subj1-t1",
                    "title": "AI Ethics, Privacy & Governance — Practice Test 1: Fundamental Concepts",
                    "subject": "AI Ethics, Privacy & Governance",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in AI Ethics, Privacy & Governance."
                  },
                  {
                    "id": "bca-data-science-s6-subj1-t2",
                    "title": "AI Ethics, Privacy & Governance — Practice Test 2: Exam Simulation",
                    "subject": "AI Ethics, Privacy & Governance",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-data-science-s6-subj-2",
                "name": "Data Science Capstone Project",
                "code": "BCA-DS-602",
                "description": "End-to-end data science pipeline, deployment, and viva.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-data-science-s6-subj2-t1",
                    "title": "Data Science Capstone Project — Practice Test 1: Fundamental Concepts",
                    "subject": "Data Science Capstone Project",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Data Science Capstone Project."
                  },
                  {
                    "id": "bca-data-science-s6-subj2-t2",
                    "title": "Data Science Capstone Project — Practice Test 2: Exam Simulation",
                    "subject": "Data Science Capstone Project",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "cloud-cyber",
        "name": "Cloud Computing & Cyber Security",
        "code": "BCA-CS",
        "description": "Server infrastructure, cloud architecture, network defense, penetration testing, and digital forensics.",
        "totalSemesters": 6,
        "totalMockTests": 38,
        "semesters": [
          {
            "id": "semester-1",
            "number": 1,
            "title": "Semester 1",
            "description": "BCA (BCA-CS) — Semester 1 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "bca-cloud-cyber-s1-subj-1",
                "name": "Computer Architecture & Fundamentals",
                "code": "BCA-101",
                "description": "Digital logic, CPU architecture, and computer systems.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-cloud-cyber-s1-subj1-t1",
                    "title": "Computer Architecture & Fundamentals — Practice Test 1: Fundamental Concepts",
                    "subject": "Computer Architecture & Fundamentals",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Computer Architecture & Fundamentals."
                  },
                  {
                    "id": "bca-cloud-cyber-s1-subj1-t2",
                    "title": "Computer Architecture & Fundamentals — Practice Test 2: Exam Simulation",
                    "subject": "Computer Architecture & Fundamentals",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-cloud-cyber-s1-subj-2",
                "name": "Programming in C & Scripting",
                "code": "BCA-102",
                "description": "C programming and basic command line scripting.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-cloud-cyber-s1-subj2-t1",
                    "title": "Programming in C & Scripting — Practice Test 1: Fundamental Concepts",
                    "subject": "Programming in C & Scripting",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Programming in C & Scripting."
                  },
                  {
                    "id": "bca-cloud-cyber-s1-subj2-t2",
                    "title": "Programming in C & Scripting — Practice Test 2: Exam Simulation",
                    "subject": "Programming in C & Scripting",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-cloud-cyber-s1-subj-3",
                "name": "Network Fundamentals",
                "code": "BCA-CS-103",
                "description": "OSI reference model, TCP/IP stack, and routing basics.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-cloud-cyber-s1-subj3-t1",
                    "title": "Network Fundamentals — Practice Test 1: Fundamental Concepts",
                    "subject": "Network Fundamentals",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Network Fundamentals."
                  },
                  {
                    "id": "bca-cloud-cyber-s1-subj3-t2",
                    "title": "Network Fundamentals — Practice Test 2: Exam Simulation",
                    "subject": "Network Fundamentals",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-cloud-cyber-s1-subj-4",
                "name": "Mathematics for Computing",
                "code": "BCA-104",
                "description": "Discrete math, logic, and cryptography foundations.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-cloud-cyber-s1-subj4-t1",
                    "title": "Mathematics for Computing — Practice Test 1: Fundamental Concepts",
                    "subject": "Mathematics for Computing",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Mathematics for Computing."
                  },
                  {
                    "id": "bca-cloud-cyber-s1-subj4-t2",
                    "title": "Mathematics for Computing — Practice Test 2: Exam Simulation",
                    "subject": "Mathematics for Computing",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-2",
            "number": 2,
            "title": "Semester 2",
            "description": "BCA (BCA-CS) — Semester 2 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "bca-cloud-cyber-s2-subj-1",
                "name": "Linux System Administration",
                "code": "BCA-CS-201",
                "description": "Bash scripting, permissions, systemd, and server setup.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-cloud-cyber-s2-subj1-t1",
                    "title": "Linux System Administration — Practice Test 1: Fundamental Concepts",
                    "subject": "Linux System Administration",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Linux System Administration."
                  },
                  {
                    "id": "bca-cloud-cyber-s2-subj1-t2",
                    "title": "Linux System Administration — Practice Test 2: Exam Simulation",
                    "subject": "Linux System Administration",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-cloud-cyber-s2-subj-2",
                "name": "Database Security & SQL",
                "code": "BCA-CS-202",
                "description": "SQL queries, injection defense, and database hardening.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-cloud-cyber-s2-subj2-t1",
                    "title": "Database Security & SQL — Practice Test 1: Fundamental Concepts",
                    "subject": "Database Security & SQL",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Database Security & SQL."
                  },
                  {
                    "id": "bca-cloud-cyber-s2-subj2-t2",
                    "title": "Database Security & SQL — Practice Test 2: Exam Simulation",
                    "subject": "Database Security & SQL",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-cloud-cyber-s2-subj-3",
                "name": "Data Structures",
                "code": "BCA-CS-203",
                "description": "Arrays, stacks, queues, and tree traversal algorithms.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-cloud-cyber-s2-subj3-t1",
                    "title": "Data Structures — Practice Test 1: Fundamental Concepts",
                    "subject": "Data Structures",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Data Structures."
                  },
                  {
                    "id": "bca-cloud-cyber-s2-subj3-t2",
                    "title": "Data Structures — Practice Test 2: Exam Simulation",
                    "subject": "Data Structures",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-cloud-cyber-s2-subj-4",
                "name": "Information Security Concepts",
                "code": "BCA-CS-204",
                "description": "CIA triad, security policies, and threat landscapes.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-cloud-cyber-s2-subj4-t1",
                    "title": "Information Security Concepts — Practice Test 1: Fundamental Concepts",
                    "subject": "Information Security Concepts",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Information Security Concepts."
                  },
                  {
                    "id": "bca-cloud-cyber-s2-subj4-t2",
                    "title": "Information Security Concepts — Practice Test 2: Exam Simulation",
                    "subject": "Information Security Concepts",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-3",
            "number": 3,
            "title": "Semester 3",
            "description": "BCA (BCA-CS) — Semester 3 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "bca-cloud-cyber-s3-subj-1",
                "name": "Cloud Infrastructure & AWS",
                "code": "BCA-CS-301",
                "description": "EC2, S3, IAM, VPC networking, and cloud storage.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-cloud-cyber-s3-subj1-t1",
                    "title": "Cloud Infrastructure & AWS — Practice Test 1: Fundamental Concepts",
                    "subject": "Cloud Infrastructure & AWS",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Cloud Infrastructure & AWS."
                  },
                  {
                    "id": "bca-cloud-cyber-s3-subj1-t2",
                    "title": "Cloud Infrastructure & AWS — Practice Test 2: Exam Simulation",
                    "subject": "Cloud Infrastructure & AWS",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-cloud-cyber-s3-subj-2",
                "name": "Cryptography & Network Security",
                "code": "BCA-CS-302",
                "description": "Symmetric/asymmetric encryption, hashing, and PKI.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-cloud-cyber-s3-subj2-t1",
                    "title": "Cryptography & Network Security — Practice Test 1: Fundamental Concepts",
                    "subject": "Cryptography & Network Security",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Cryptography & Network Security."
                  },
                  {
                    "id": "bca-cloud-cyber-s3-subj2-t2",
                    "title": "Cryptography & Network Security — Practice Test 2: Exam Simulation",
                    "subject": "Cryptography & Network Security",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-cloud-cyber-s3-subj-3",
                "name": "Routing & Switching Protocols",
                "code": "BCA-CS-303",
                "description": "VLANs, OSPF, BGP, and firewall configurations.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-cloud-cyber-s3-subj3-t1",
                    "title": "Routing & Switching Protocols — Practice Test 1: Fundamental Concepts",
                    "subject": "Routing & Switching Protocols",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Routing & Switching Protocols."
                  },
                  {
                    "id": "bca-cloud-cyber-s3-subj3-t2",
                    "title": "Routing & Switching Protocols — Practice Test 2: Exam Simulation",
                    "subject": "Routing & Switching Protocols",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-4",
            "number": 4,
            "title": "Semester 4",
            "description": "BCA (BCA-CS) — Semester 4 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "bca-cloud-cyber-s4-subj-1",
                "name": "Ethical Hacking & Penetration Testing",
                "code": "BCA-CS-401",
                "description": "Reconnaissance, scanning, Metasploit, and reporting.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-cloud-cyber-s4-subj1-t1",
                    "title": "Ethical Hacking & Penetration Testing — Practice Test 1: Fundamental Concepts",
                    "subject": "Ethical Hacking & Penetration Testing",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Ethical Hacking & Penetration Testing."
                  },
                  {
                    "id": "bca-cloud-cyber-s4-subj1-t2",
                    "title": "Ethical Hacking & Penetration Testing — Practice Test 2: Exam Simulation",
                    "subject": "Ethical Hacking & Penetration Testing",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-cloud-cyber-s4-subj-2",
                "name": "Server Virtualization & Containers",
                "code": "BCA-CS-402",
                "description": "Hypervisors, Docker containers, and container security.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-cloud-cyber-s4-subj2-t1",
                    "title": "Server Virtualization & Containers — Practice Test 1: Fundamental Concepts",
                    "subject": "Server Virtualization & Containers",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Server Virtualization & Containers."
                  },
                  {
                    "id": "bca-cloud-cyber-s4-subj2-t2",
                    "title": "Server Virtualization & Containers — Practice Test 2: Exam Simulation",
                    "subject": "Server Virtualization & Containers",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-cloud-cyber-s4-subj-3",
                "name": "Web Application Security",
                "code": "BCA-CS-403",
                "description": "OWASP Top 10 vulnerabilities, XSS, and CSRF defense.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-cloud-cyber-s4-subj3-t1",
                    "title": "Web Application Security — Practice Test 1: Fundamental Concepts",
                    "subject": "Web Application Security",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Web Application Security."
                  },
                  {
                    "id": "bca-cloud-cyber-s4-subj3-t2",
                    "title": "Web Application Security — Practice Test 2: Exam Simulation",
                    "subject": "Web Application Security",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-5",
            "number": 5,
            "title": "Semester 5",
            "description": "BCA (BCA-CS) — Semester 5 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "bca-cloud-cyber-s5-subj-1",
                "name": "Kubernetes & Cloud Orchestration",
                "code": "BCA-CS-501",
                "description": "Pods, clusters, ingress controllers, and microservices.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-cloud-cyber-s5-subj1-t1",
                    "title": "Kubernetes & Cloud Orchestration — Practice Test 1: Fundamental Concepts",
                    "subject": "Kubernetes & Cloud Orchestration",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Kubernetes & Cloud Orchestration."
                  },
                  {
                    "id": "bca-cloud-cyber-s5-subj1-t2",
                    "title": "Kubernetes & Cloud Orchestration — Practice Test 2: Exam Simulation",
                    "subject": "Kubernetes & Cloud Orchestration",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-cloud-cyber-s5-subj-2",
                "name": "Digital Forensics & Incident Response",
                "code": "BCA-CS-502",
                "description": "Disk forensics, memory analysis, and chain of custody.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-cloud-cyber-s5-subj2-t1",
                    "title": "Digital Forensics & Incident Response — Practice Test 1: Fundamental Concepts",
                    "subject": "Digital Forensics & Incident Response",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Digital Forensics & Incident Response."
                  },
                  {
                    "id": "bca-cloud-cyber-s5-subj2-t2",
                    "title": "Digital Forensics & Incident Response — Practice Test 2: Exam Simulation",
                    "subject": "Digital Forensics & Incident Response",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-cloud-cyber-s5-subj-3",
                "name": "Cyber Laws & Compliance",
                "code": "BCA-CS-503",
                "description": "IT Act, GDPR, HIPAA, and security audit frameworks.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-cloud-cyber-s5-subj3-t1",
                    "title": "Cyber Laws & Compliance — Practice Test 1: Fundamental Concepts",
                    "subject": "Cyber Laws & Compliance",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Cyber Laws & Compliance."
                  },
                  {
                    "id": "bca-cloud-cyber-s5-subj3-t2",
                    "title": "Cyber Laws & Compliance — Practice Test 2: Exam Simulation",
                    "subject": "Cyber Laws & Compliance",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-6",
            "number": 6,
            "title": "Semester 6",
            "description": "BCA (BCA-CS) — Semester 6 subjects, mock tests, and exam practice.",
            "availableTestsCount": 4,
            "subjects": [
              {
                "id": "bca-cloud-cyber-s6-subj-1",
                "name": "DevSecOps & Cloud Security",
                "code": "BCA-CS-601",
                "description": "CI/CD pipeline security, SAST/DAST, and cloud auditing.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-cloud-cyber-s6-subj1-t1",
                    "title": "DevSecOps & Cloud Security — Practice Test 1: Fundamental Concepts",
                    "subject": "DevSecOps & Cloud Security",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in DevSecOps & Cloud Security."
                  },
                  {
                    "id": "bca-cloud-cyber-s6-subj1-t2",
                    "title": "DevSecOps & Cloud Security — Practice Test 2: Exam Simulation",
                    "subject": "DevSecOps & Cloud Security",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bca-cloud-cyber-s6-subj-2",
                "name": "Security Capstone Project & Defense",
                "code": "BCA-CS-602",
                "description": "Hands-on enterprise security implementation and viva.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bca-cloud-cyber-s6-subj2-t1",
                    "title": "Security Capstone Project & Defense — Practice Test 1: Fundamental Concepts",
                    "subject": "Security Capstone Project & Defense",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Security Capstone Project & Defense."
                  },
                  {
                    "id": "bca-cloud-cyber-s6-subj2-t2",
                    "title": "Security Capstone Project & Defense — Practice Test 2: Exam Simulation",
                    "subject": "Security Capstone Project & Defense",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "semesters": [
      {
        "id": "semester-1",
        "number": 1,
        "title": "Semester 1",
        "description": "BCA (BCA-SD) — Semester 1 subjects, mock tests, and exam practice.",
        "availableTestsCount": 8,
        "subjects": [
          {
            "id": "bca-software-s1-subj-1",
            "name": "Fundamentals of Computers & IT",
            "code": "BCA-101",
            "description": "Hardware components, operating systems, and computer fundamentals.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bca-software-s1-subj1-t1",
                "title": "Fundamentals of Computers & IT — Practice Test 1: Fundamental Concepts",
                "subject": "Fundamentals of Computers & IT",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Fundamentals of Computers & IT."
              },
              {
                "id": "bca-software-s1-subj1-t2",
                "title": "Fundamentals of Computers & IT — Practice Test 2: Exam Simulation",
                "subject": "Fundamentals of Computers & IT",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bca-software-s1-subj-2",
            "name": "Programming in C",
            "code": "BCA-102",
            "description": "Control flow, pointers, arrays, and structured program design.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bca-software-s1-subj2-t1",
                "title": "Programming in C — Practice Test 1: Fundamental Concepts",
                "subject": "Programming in C",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Programming in C."
              },
              {
                "id": "bca-software-s1-subj2-t2",
                "title": "Programming in C — Practice Test 2: Exam Simulation",
                "subject": "Programming in C",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bca-software-s1-subj-3",
            "name": "Mathematical Foundations for CS",
            "code": "BCA-103",
            "description": "Matrices, set theory, functions, and elementary calculus.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bca-software-s1-subj3-t1",
                "title": "Mathematical Foundations for CS — Practice Test 1: Fundamental Concepts",
                "subject": "Mathematical Foundations for CS",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Mathematical Foundations for CS."
              },
              {
                "id": "bca-software-s1-subj3-t2",
                "title": "Mathematical Foundations for CS — Practice Test 2: Exam Simulation",
                "subject": "Mathematical Foundations for CS",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bca-software-s1-subj-4",
            "name": "Digital Electronics",
            "code": "BCA-104",
            "description": "Number systems, logic gates, and boolean simplification.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bca-software-s1-subj4-t1",
                "title": "Digital Electronics — Practice Test 1: Fundamental Concepts",
                "subject": "Digital Electronics",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Digital Electronics."
              },
              {
                "id": "bca-software-s1-subj4-t2",
                "title": "Digital Electronics — Practice Test 2: Exam Simulation",
                "subject": "Digital Electronics",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      },
      {
        "id": "semester-2",
        "number": 2,
        "title": "Semester 2",
        "description": "BCA (BCA-SD) — Semester 2 subjects, mock tests, and exam practice.",
        "availableTestsCount": 8,
        "subjects": [
          {
            "id": "bca-software-s2-subj-1",
            "name": "Data Structures using C++",
            "code": "BCA-201",
            "description": "Stacks, queues, linked lists, trees, and searching algorithms.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bca-software-s2-subj1-t1",
                "title": "Data Structures using C++ — Practice Test 1: Fundamental Concepts",
                "subject": "Data Structures using C++",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Data Structures using C++."
              },
              {
                "id": "bca-software-s2-subj1-t2",
                "title": "Data Structures using C++ — Practice Test 2: Exam Simulation",
                "subject": "Data Structures using C++",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bca-software-s2-subj-2",
            "name": "Database Management Systems (SQL)",
            "code": "BCA-202",
            "description": "ER diagrams, SQL queries, relational normalization, and views.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bca-software-s2-subj2-t1",
                "title": "Database Management Systems (SQL) — Practice Test 1: Fundamental Concepts",
                "subject": "Database Management Systems (SQL)",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Database Management Systems (SQL)."
              },
              {
                "id": "bca-software-s2-subj2-t2",
                "title": "Database Management Systems (SQL) — Practice Test 2: Exam Simulation",
                "subject": "Database Management Systems (SQL)",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bca-software-s2-subj-3",
            "name": "Web Designing (HTML5, CSS3, JS)",
            "code": "BCA-203",
            "description": "Semantic markup, styling, flexbox/grid, and DOM manipulation.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bca-software-s2-subj3-t1",
                "title": "Web Designing (HTML5, CSS3, JS) — Practice Test 1: Fundamental Concepts",
                "subject": "Web Designing (HTML5, CSS3, JS)",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Web Designing (HTML5, CSS3, JS)."
              },
              {
                "id": "bca-software-s2-subj3-t2",
                "title": "Web Designing (HTML5, CSS3, JS) — Practice Test 2: Exam Simulation",
                "subject": "Web Designing (HTML5, CSS3, JS)",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bca-software-s2-subj-4",
            "name": "Numerical and Statistical Methods",
            "code": "BCA-204",
            "description": "Root finding, interpolation, correlation, and regression.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bca-software-s2-subj4-t1",
                "title": "Numerical and Statistical Methods — Practice Test 1: Fundamental Concepts",
                "subject": "Numerical and Statistical Methods",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Numerical and Statistical Methods."
              },
              {
                "id": "bca-software-s2-subj4-t2",
                "title": "Numerical and Statistical Methods — Practice Test 2: Exam Simulation",
                "subject": "Numerical and Statistical Methods",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      },
      {
        "id": "semester-3",
        "number": 3,
        "title": "Semester 3",
        "description": "BCA (BCA-SD) — Semester 3 subjects, mock tests, and exam practice.",
        "availableTestsCount": 8,
        "subjects": [
          {
            "id": "bca-software-s3-subj-1",
            "name": "Core Java Programming",
            "code": "BCA-301",
            "description": "OOP concepts, exception handling, multithreading, and swings.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bca-software-s3-subj1-t1",
                "title": "Core Java Programming — Practice Test 1: Fundamental Concepts",
                "subject": "Core Java Programming",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Core Java Programming."
              },
              {
                "id": "bca-software-s3-subj1-t2",
                "title": "Core Java Programming — Practice Test 2: Exam Simulation",
                "subject": "Core Java Programming",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bca-software-s3-subj-2",
            "name": "Operating System Principles",
            "code": "BCA-302",
            "description": "Memory allocation, process states, synchronization, and storage.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bca-software-s3-subj2-t1",
                "title": "Operating System Principles — Practice Test 1: Fundamental Concepts",
                "subject": "Operating System Principles",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Operating System Principles."
              },
              {
                "id": "bca-software-s3-subj2-t2",
                "title": "Operating System Principles — Practice Test 2: Exam Simulation",
                "subject": "Operating System Principles",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bca-software-s3-subj-3",
            "name": "Computer Networks Fundamentals",
            "code": "BCA-303",
            "description": "Topology, switching, protocols, IP addressing, and subnetting.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bca-software-s3-subj3-t1",
                "title": "Computer Networks Fundamentals — Practice Test 1: Fundamental Concepts",
                "subject": "Computer Networks Fundamentals",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Computer Networks Fundamentals."
              },
              {
                "id": "bca-software-s3-subj3-t2",
                "title": "Computer Networks Fundamentals — Practice Test 2: Exam Simulation",
                "subject": "Computer Networks Fundamentals",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bca-software-s3-subj-4",
            "name": "Software Engineering",
            "code": "BCA-304",
            "description": "Waterfall, Agile, requirements analysis, and testing strategies.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bca-software-s3-subj4-t1",
                "title": "Software Engineering — Practice Test 1: Fundamental Concepts",
                "subject": "Software Engineering",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Software Engineering."
              },
              {
                "id": "bca-software-s3-subj4-t2",
                "title": "Software Engineering — Practice Test 2: Exam Simulation",
                "subject": "Software Engineering",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      },
      {
        "id": "semester-4",
        "number": 4,
        "title": "Semester 4",
        "description": "BCA (BCA-SD) — Semester 4 subjects, mock tests, and exam practice.",
        "availableTestsCount": 8,
        "subjects": [
          {
            "id": "bca-software-s4-subj-1",
            "name": "Python Programming",
            "code": "BCA-401",
            "description": "Data types, file I/O, OOP, NumPy, and Pandas library.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bca-software-s4-subj1-t1",
                "title": "Python Programming — Practice Test 1: Fundamental Concepts",
                "subject": "Python Programming",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Python Programming."
              },
              {
                "id": "bca-software-s4-subj1-t2",
                "title": "Python Programming — Practice Test 2: Exam Simulation",
                "subject": "Python Programming",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bca-software-s4-subj-2",
            "name": "PHP and MySQL Web Applications",
            "code": "BCA-402",
            "description": "Server scripting, database connectivity, and session management.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bca-software-s4-subj2-t1",
                "title": "PHP and MySQL Web Applications — Practice Test 1: Fundamental Concepts",
                "subject": "PHP and MySQL Web Applications",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in PHP and MySQL Web Applications."
              },
              {
                "id": "bca-software-s4-subj2-t2",
                "title": "PHP and MySQL Web Applications — Practice Test 2: Exam Simulation",
                "subject": "PHP and MySQL Web Applications",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bca-software-s4-subj-3",
            "name": "Design and Analysis of Algorithms",
            "code": "BCA-403",
            "description": "Divide and conquer, greedy methods, and complexity classes.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bca-software-s4-subj3-t1",
                "title": "Design and Analysis of Algorithms — Practice Test 1: Fundamental Concepts",
                "subject": "Design and Analysis of Algorithms",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Design and Analysis of Algorithms."
              },
              {
                "id": "bca-software-s4-subj3-t2",
                "title": "Design and Analysis of Algorithms — Practice Test 2: Exam Simulation",
                "subject": "Design and Analysis of Algorithms",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bca-software-s4-subj-4",
            "name": "Computer Graphics & Multimedia",
            "code": "BCA-404",
            "description": "2D/3D transformations, rasterization, and clipping algorithms.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bca-software-s4-subj4-t1",
                "title": "Computer Graphics & Multimedia — Practice Test 1: Fundamental Concepts",
                "subject": "Computer Graphics & Multimedia",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Computer Graphics & Multimedia."
              },
              {
                "id": "bca-software-s4-subj4-t2",
                "title": "Computer Graphics & Multimedia — Practice Test 2: Exam Simulation",
                "subject": "Computer Graphics & Multimedia",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      },
      {
        "id": "semester-5",
        "number": 5,
        "title": "Semester 5",
        "description": "BCA (BCA-SD) — Semester 5 subjects, mock tests, and exam practice.",
        "availableTestsCount": 8,
        "subjects": [
          {
            "id": "bca-software-s5-subj-1",
            "name": "Full Stack Development (MERN)",
            "code": "BCA-501",
            "description": "MongoDB, Express.js, React.js, and Node.js architectures.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bca-software-s5-subj1-t1",
                "title": "Full Stack Development (MERN) — Practice Test 1: Fundamental Concepts",
                "subject": "Full Stack Development (MERN)",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Full Stack Development (MERN)."
              },
              {
                "id": "bca-software-s5-subj1-t2",
                "title": "Full Stack Development (MERN) — Practice Test 2: Exam Simulation",
                "subject": "Full Stack Development (MERN)",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bca-software-s5-subj-2",
            "name": "Cyber Security & Ethical Hacking",
            "code": "BCA-502",
            "description": "Vulnerability assessment, cryptography, and network defense.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bca-software-s5-subj2-t1",
                "title": "Cyber Security & Ethical Hacking — Practice Test 1: Fundamental Concepts",
                "subject": "Cyber Security & Ethical Hacking",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Cyber Security & Ethical Hacking."
              },
              {
                "id": "bca-software-s5-subj2-t2",
                "title": "Cyber Security & Ethical Hacking — Practice Test 2: Exam Simulation",
                "subject": "Cyber Security & Ethical Hacking",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bca-software-s5-subj-3",
            "name": "Mobile App Development",
            "code": "BCA-503",
            "description": "Building mobile interfaces, storage, and API integration.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bca-software-s5-subj3-t1",
                "title": "Mobile App Development — Practice Test 1: Fundamental Concepts",
                "subject": "Mobile App Development",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Mobile App Development."
              },
              {
                "id": "bca-software-s5-subj3-t2",
                "title": "Mobile App Development — Practice Test 2: Exam Simulation",
                "subject": "Mobile App Development",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bca-software-s5-subj-4",
            "name": "Cloud Computing Fundamentals",
            "code": "BCA-504",
            "description": "Cloud service models, virtualization, and deployment.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bca-software-s5-subj4-t1",
                "title": "Cloud Computing Fundamentals — Practice Test 1: Fundamental Concepts",
                "subject": "Cloud Computing Fundamentals",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Cloud Computing Fundamentals."
              },
              {
                "id": "bca-software-s5-subj4-t2",
                "title": "Cloud Computing Fundamentals — Practice Test 2: Exam Simulation",
                "subject": "Cloud Computing Fundamentals",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      },
      {
        "id": "semester-6",
        "number": 6,
        "title": "Semester 6",
        "description": "BCA (BCA-SD) — Semester 6 subjects, mock tests, and exam practice.",
        "availableTestsCount": 6,
        "subjects": [
          {
            "id": "bca-software-s6-subj-1",
            "name": "Machine Learning with Python",
            "code": "BCA-601",
            "description": "Classification models, regression, clustering, and Scikit-learn.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bca-software-s6-subj1-t1",
                "title": "Machine Learning with Python — Practice Test 1: Fundamental Concepts",
                "subject": "Machine Learning with Python",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Machine Learning with Python."
              },
              {
                "id": "bca-software-s6-subj1-t2",
                "title": "Machine Learning with Python — Practice Test 2: Exam Simulation",
                "subject": "Machine Learning with Python",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bca-software-s6-subj-2",
            "name": "Software Testing & Quality Assurance",
            "code": "BCA-602",
            "description": "Manual testing, automation with Selenium, and test cases.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bca-software-s6-subj2-t1",
                "title": "Software Testing & Quality Assurance — Practice Test 1: Fundamental Concepts",
                "subject": "Software Testing & Quality Assurance",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Software Testing & Quality Assurance."
              },
              {
                "id": "bca-software-s6-subj2-t2",
                "title": "Software Testing & Quality Assurance — Practice Test 2: Exam Simulation",
                "subject": "Software Testing & Quality Assurance",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bca-software-s6-subj-3",
            "name": "Capstone Software Project & Viva",
            "code": "BCA-603",
            "description": "Complete software development lifecycle project and viva.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bca-software-s6-subj3-t1",
                "title": "Capstone Software Project & Viva — Practice Test 1: Fundamental Concepts",
                "subject": "Capstone Software Project & Viva",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Capstone Software Project & Viva."
              },
              {
                "id": "bca-software-s6-subj3-t2",
                "title": "Capstone Software Project & Viva — Practice Test 2: Exam Simulation",
                "subject": "Capstone Software Project & Viva",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bba",
    "name": "BBA",
    "title": "Bachelor of Business Administration",
    "description": "Management, accounting, economics, and business communication across six semesters.",
    "iconName": "Briefcase",
    "totalSemesters": 6,
    "totalMockTests": 118,
    "branches": [
      {
        "id": "finance",
        "name": "Finance & Accounting",
        "code": "BBA-FIN",
        "description": "Financial management, corporate accounting, investment banking, taxation, and financial markets.",
        "totalSemesters": 6,
        "totalMockTests": 44,
        "semesters": [
          {
            "id": "semester-1",
            "number": 1,
            "title": "Semester 1",
            "description": "BBA (BBA-FIN) — Semester 1 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "bba-finance-s1-subj-1",
                "name": "Principles of Management",
                "code": "BBA-101",
                "description": "Planning, organizing, staffing, leading, and controlling organizations.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-finance-s1-subj1-t1",
                    "title": "Principles of Management — Practice Test 1: Fundamental Concepts",
                    "subject": "Principles of Management",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Principles of Management."
                  },
                  {
                    "id": "bba-finance-s1-subj1-t2",
                    "title": "Principles of Management — Practice Test 2: Exam Simulation",
                    "subject": "Principles of Management",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-finance-s1-subj-2",
                "name": "Financial Accounting",
                "code": "BBA-102",
                "description": "Journal entries, ledgers, trial balance, and balance sheet preparation.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-finance-s1-subj2-t1",
                    "title": "Financial Accounting — Practice Test 1: Fundamental Concepts",
                    "subject": "Financial Accounting",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Financial Accounting."
                  },
                  {
                    "id": "bba-finance-s1-subj2-t2",
                    "title": "Financial Accounting — Practice Test 2: Exam Simulation",
                    "subject": "Financial Accounting",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-finance-s1-subj-3",
                "name": "Microeconomics for Business",
                "code": "BBA-103",
                "description": "Supply, demand, market structures, and cost functions.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-finance-s1-subj3-t1",
                    "title": "Microeconomics for Business — Practice Test 1: Fundamental Concepts",
                    "subject": "Microeconomics for Business",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Microeconomics for Business."
                  },
                  {
                    "id": "bba-finance-s1-subj3-t2",
                    "title": "Microeconomics for Business — Practice Test 2: Exam Simulation",
                    "subject": "Microeconomics for Business",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-finance-s1-subj-4",
                "name": "Business Communication",
                "code": "BBA-104",
                "description": "Written correspondence, presentation skills, and corporate memos.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-finance-s1-subj4-t1",
                    "title": "Business Communication — Practice Test 1: Fundamental Concepts",
                    "subject": "Business Communication",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Business Communication."
                  },
                  {
                    "id": "bba-finance-s1-subj4-t2",
                    "title": "Business Communication — Practice Test 2: Exam Simulation",
                    "subject": "Business Communication",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-2",
            "number": 2,
            "title": "Semester 2",
            "description": "BBA (BBA-FIN) — Semester 2 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "bba-finance-s2-subj-1",
                "name": "Organizational Behavior",
                "code": "BBA-201",
                "description": "Motivation, group dynamics, leadership styles, and corporate culture.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-finance-s2-subj1-t1",
                    "title": "Organizational Behavior — Practice Test 1: Fundamental Concepts",
                    "subject": "Organizational Behavior",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Organizational Behavior."
                  },
                  {
                    "id": "bba-finance-s2-subj1-t2",
                    "title": "Organizational Behavior — Practice Test 2: Exam Simulation",
                    "subject": "Organizational Behavior",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-finance-s2-subj-2",
                "name": "Cost Accounting",
                "code": "BBA-202",
                "description": "Material, labor, overhead costing, and marginal break-even analysis.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-finance-s2-subj2-t1",
                    "title": "Cost Accounting — Practice Test 1: Fundamental Concepts",
                    "subject": "Cost Accounting",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Cost Accounting."
                  },
                  {
                    "id": "bba-finance-s2-subj2-t2",
                    "title": "Cost Accounting — Practice Test 2: Exam Simulation",
                    "subject": "Cost Accounting",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-finance-s2-subj-3",
                "name": "Macroeconomics for Business",
                "code": "BBA-203",
                "description": "National income accounting, inflation, fiscal policy, and GDP.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-finance-s2-subj3-t1",
                    "title": "Macroeconomics for Business — Practice Test 1: Fundamental Concepts",
                    "subject": "Macroeconomics for Business",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Macroeconomics for Business."
                  },
                  {
                    "id": "bba-finance-s2-subj3-t2",
                    "title": "Macroeconomics for Business — Practice Test 2: Exam Simulation",
                    "subject": "Macroeconomics for Business",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-finance-s2-subj-4",
                "name": "Business Mathematics & Statistics",
                "code": "BBA-204",
                "description": "Time value of money, probability, and correlation analysis.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-finance-s2-subj4-t1",
                    "title": "Business Mathematics & Statistics — Practice Test 1: Fundamental Concepts",
                    "subject": "Business Mathematics & Statistics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Business Mathematics & Statistics."
                  },
                  {
                    "id": "bba-finance-s2-subj4-t2",
                    "title": "Business Mathematics & Statistics — Practice Test 2: Exam Simulation",
                    "subject": "Business Mathematics & Statistics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-3",
            "number": 3,
            "title": "Semester 3",
            "description": "BBA (BBA-FIN) — Semester 3 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "bba-finance-s3-subj-1",
                "name": "Corporate Financial Management",
                "code": "BBA-301",
                "description": "Capital budgeting, cost of capital (WACC), and dividend policies.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-finance-s3-subj1-t1",
                    "title": "Corporate Financial Management — Practice Test 1: Fundamental Concepts",
                    "subject": "Corporate Financial Management",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Corporate Financial Management."
                  },
                  {
                    "id": "bba-finance-s3-subj1-t2",
                    "title": "Corporate Financial Management — Practice Test 2: Exam Simulation",
                    "subject": "Corporate Financial Management",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-finance-s3-subj-2",
                "name": "Corporate & Business Law",
                "code": "BBA-302",
                "description": "Indian Contract Act, Sale of Goods Act, and Companies Act.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-finance-s3-subj2-t1",
                    "title": "Corporate & Business Law — Practice Test 1: Fundamental Concepts",
                    "subject": "Corporate & Business Law",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Corporate & Business Law."
                  },
                  {
                    "id": "bba-finance-s3-subj2-t2",
                    "title": "Corporate & Business Law — Practice Test 2: Exam Simulation",
                    "subject": "Corporate & Business Law",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-finance-s3-subj-3",
                "name": "Marketing Management",
                "code": "BBA-303",
                "description": "Market segmentation, targeting, positioning, and marketing mix.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-finance-s3-subj3-t1",
                    "title": "Marketing Management — Practice Test 1: Fundamental Concepts",
                    "subject": "Marketing Management",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Marketing Management."
                  },
                  {
                    "id": "bba-finance-s3-subj3-t2",
                    "title": "Marketing Management — Practice Test 2: Exam Simulation",
                    "subject": "Marketing Management",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-finance-s3-subj-4",
                "name": "Human Resource Management",
                "code": "BBA-304",
                "description": "Recruitment, selection, training, performance appraisal, and compensation.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-finance-s3-subj4-t1",
                    "title": "Human Resource Management — Practice Test 1: Fundamental Concepts",
                    "subject": "Human Resource Management",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Human Resource Management."
                  },
                  {
                    "id": "bba-finance-s3-subj4-t2",
                    "title": "Human Resource Management — Practice Test 2: Exam Simulation",
                    "subject": "Human Resource Management",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-4",
            "number": 4,
            "title": "Semester 4",
            "description": "BBA (BBA-FIN) — Semester 4 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "bba-finance-s4-subj-1",
                "name": "Security Analysis & Portfolio Management",
                "code": "BBA-401",
                "description": "Risk-return tradeoff, CAPM model, and technical chart analysis.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-finance-s4-subj1-t1",
                    "title": "Security Analysis & Portfolio Management — Practice Test 1: Fundamental Concepts",
                    "subject": "Security Analysis & Portfolio Management",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Security Analysis & Portfolio Management."
                  },
                  {
                    "id": "bba-finance-s4-subj1-t2",
                    "title": "Security Analysis & Portfolio Management — Practice Test 2: Exam Simulation",
                    "subject": "Security Analysis & Portfolio Management",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-finance-s4-subj-2",
                "name": "Corporate Taxation & GST",
                "code": "BBA-402",
                "description": "Direct taxation, corporate deductions, and GST compliance.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-finance-s4-subj2-t1",
                    "title": "Corporate Taxation & GST — Practice Test 1: Fundamental Concepts",
                    "subject": "Corporate Taxation & GST",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Corporate Taxation & GST."
                  },
                  {
                    "id": "bba-finance-s4-subj2-t2",
                    "title": "Corporate Taxation & GST — Practice Test 2: Exam Simulation",
                    "subject": "Corporate Taxation & GST",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-finance-s4-subj-3",
                "name": "Business Research Methodology",
                "code": "BBA-403",
                "description": "Research design, sampling techniques, and hypothesis testing.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-finance-s4-subj3-t1",
                    "title": "Business Research Methodology — Practice Test 1: Fundamental Concepts",
                    "subject": "Business Research Methodology",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Business Research Methodology."
                  },
                  {
                    "id": "bba-finance-s4-subj3-t2",
                    "title": "Business Research Methodology — Practice Test 2: Exam Simulation",
                    "subject": "Business Research Methodology",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-finance-s4-subj-4",
                "name": "Management Information Systems",
                "code": "BBA-404",
                "description": "ERP systems, decision support systems, and IT in business.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-finance-s4-subj4-t1",
                    "title": "Management Information Systems — Practice Test 1: Fundamental Concepts",
                    "subject": "Management Information Systems",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Management Information Systems."
                  },
                  {
                    "id": "bba-finance-s4-subj4-t2",
                    "title": "Management Information Systems — Practice Test 2: Exam Simulation",
                    "subject": "Management Information Systems",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-5",
            "number": 5,
            "title": "Semester 5",
            "description": "BBA (BBA-FIN) — Semester 5 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "bba-finance-s5-subj-1",
                "name": "Financial Markets & Institutions",
                "code": "BBA-501",
                "description": "Money markets, capital markets, SEBI regulations, and stock exchanges.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-finance-s5-subj1-t1",
                    "title": "Financial Markets & Institutions — Practice Test 1: Fundamental Concepts",
                    "subject": "Financial Markets & Institutions",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Financial Markets & Institutions."
                  },
                  {
                    "id": "bba-finance-s5-subj1-t2",
                    "title": "Financial Markets & Institutions — Practice Test 2: Exam Simulation",
                    "subject": "Financial Markets & Institutions",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-finance-s5-subj-2",
                "name": "International Financial Management",
                "code": "BBA-502",
                "description": "Foreign exchange risk, hedging, and multinational capital budgeting.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-finance-s5-subj2-t1",
                    "title": "International Financial Management — Practice Test 1: Fundamental Concepts",
                    "subject": "International Financial Management",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in International Financial Management."
                  },
                  {
                    "id": "bba-finance-s5-subj2-t2",
                    "title": "International Financial Management — Practice Test 2: Exam Simulation",
                    "subject": "International Financial Management",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-finance-s5-subj-3",
                "name": "Strategic Management",
                "code": "BBA-503",
                "description": "Porter’s five forces, generic strategies, and corporate governance.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-finance-s5-subj3-t1",
                    "title": "Strategic Management — Practice Test 1: Fundamental Concepts",
                    "subject": "Strategic Management",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Strategic Management."
                  },
                  {
                    "id": "bba-finance-s5-subj3-t2",
                    "title": "Strategic Management — Practice Test 2: Exam Simulation",
                    "subject": "Strategic Management",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-6",
            "number": 6,
            "title": "Semester 6",
            "description": "BBA (BBA-FIN) — Semester 6 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "bba-finance-s6-subj-1",
                "name": "Investment Banking & Financial Services",
                "code": "BBA-601",
                "description": "IPOs, underwriting, venture capital, and private equity.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-finance-s6-subj1-t1",
                    "title": "Investment Banking & Financial Services — Practice Test 1: Fundamental Concepts",
                    "subject": "Investment Banking & Financial Services",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Investment Banking & Financial Services."
                  },
                  {
                    "id": "bba-finance-s6-subj1-t2",
                    "title": "Investment Banking & Financial Services — Practice Test 2: Exam Simulation",
                    "subject": "Investment Banking & Financial Services",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-finance-s6-subj-2",
                "name": "Financial Derivatives & Risk Management",
                "code": "BBA-602",
                "description": "Futures, options, swaps, and hedging strategies.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-finance-s6-subj2-t1",
                    "title": "Financial Derivatives & Risk Management — Practice Test 1: Fundamental Concepts",
                    "subject": "Financial Derivatives & Risk Management",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Financial Derivatives & Risk Management."
                  },
                  {
                    "id": "bba-finance-s6-subj2-t2",
                    "title": "Financial Derivatives & Risk Management — Practice Test 2: Exam Simulation",
                    "subject": "Financial Derivatives & Risk Management",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-finance-s6-subj-3",
                "name": "Comprehensive Business Project & Viva",
                "code": "BBA-603",
                "description": "Applied business research dissertation and oral viva.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-finance-s6-subj3-t1",
                    "title": "Comprehensive Business Project & Viva — Practice Test 1: Fundamental Concepts",
                    "subject": "Comprehensive Business Project & Viva",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Comprehensive Business Project & Viva."
                  },
                  {
                    "id": "bba-finance-s6-subj3-t2",
                    "title": "Comprehensive Business Project & Viva — Practice Test 2: Exam Simulation",
                    "subject": "Comprehensive Business Project & Viva",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "marketing",
        "name": "Marketing Management",
        "code": "BBA-MKT",
        "description": "Brand strategy, consumer behavior, digital marketing, market research, and sales management.",
        "totalSemesters": 6,
        "totalMockTests": 38,
        "semesters": [
          {
            "id": "semester-1",
            "number": 1,
            "title": "Semester 1",
            "description": "BBA (BBA-MKT) — Semester 1 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "bba-marketing-s1-subj-1",
                "name": "Principles of Management",
                "code": "BBA-101",
                "description": "Management principles and organizational dynamics.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-marketing-s1-subj1-t1",
                    "title": "Principles of Management — Practice Test 1: Fundamental Concepts",
                    "subject": "Principles of Management",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Principles of Management."
                  },
                  {
                    "id": "bba-marketing-s1-subj1-t2",
                    "title": "Principles of Management — Practice Test 2: Exam Simulation",
                    "subject": "Principles of Management",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-marketing-s1-subj-2",
                "name": "Fundamentals of Marketing",
                "code": "BBA-MKT-102",
                "description": "Marketing concepts, customer value, and marketing environments.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-marketing-s1-subj2-t1",
                    "title": "Fundamentals of Marketing — Practice Test 1: Fundamental Concepts",
                    "subject": "Fundamentals of Marketing",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Fundamentals of Marketing."
                  },
                  {
                    "id": "bba-marketing-s1-subj2-t2",
                    "title": "Fundamentals of Marketing — Practice Test 2: Exam Simulation",
                    "subject": "Fundamentals of Marketing",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-marketing-s1-subj-3",
                "name": "Business Economics",
                "code": "BBA-103",
                "description": "Demand forecasting, price elasticity, and market equilibrium.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-marketing-s1-subj3-t1",
                    "title": "Business Economics — Practice Test 1: Fundamental Concepts",
                    "subject": "Business Economics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Business Economics."
                  },
                  {
                    "id": "bba-marketing-s1-subj3-t2",
                    "title": "Business Economics — Practice Test 2: Exam Simulation",
                    "subject": "Business Economics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-marketing-s1-subj-4",
                "name": "Business Communication",
                "code": "BBA-104",
                "description": "Corporate communication and negotiation skills.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-marketing-s1-subj4-t1",
                    "title": "Business Communication — Practice Test 1: Fundamental Concepts",
                    "subject": "Business Communication",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Business Communication."
                  },
                  {
                    "id": "bba-marketing-s1-subj4-t2",
                    "title": "Business Communication — Practice Test 2: Exam Simulation",
                    "subject": "Business Communication",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-2",
            "number": 2,
            "title": "Semester 2",
            "description": "BBA (BBA-MKT) — Semester 2 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "bba-marketing-s2-subj-1",
                "name": "Consumer Behavior",
                "code": "BBA-MKT-201",
                "description": "Perception, attitude, buying decision processes, and psychographics.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-marketing-s2-subj1-t1",
                    "title": "Consumer Behavior — Practice Test 1: Fundamental Concepts",
                    "subject": "Consumer Behavior",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Consumer Behavior."
                  },
                  {
                    "id": "bba-marketing-s2-subj1-t2",
                    "title": "Consumer Behavior — Practice Test 2: Exam Simulation",
                    "subject": "Consumer Behavior",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-marketing-s2-subj-2",
                "name": "Financial Accounting for Marketers",
                "code": "BBA-202",
                "description": "Reading financial statements and budgeting marketing expenses.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-marketing-s2-subj2-t1",
                    "title": "Financial Accounting for Marketers — Practice Test 1: Fundamental Concepts",
                    "subject": "Financial Accounting for Marketers",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Financial Accounting for Marketers."
                  },
                  {
                    "id": "bba-marketing-s2-subj2-t2",
                    "title": "Financial Accounting for Marketers — Practice Test 2: Exam Simulation",
                    "subject": "Financial Accounting for Marketers",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-marketing-s2-subj-3",
                "name": "Marketing Research",
                "code": "BBA-MKT-203",
                "description": "Survey design, focus groups, data collection, and analytics.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-marketing-s2-subj3-t1",
                    "title": "Marketing Research — Practice Test 1: Fundamental Concepts",
                    "subject": "Marketing Research",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Marketing Research."
                  },
                  {
                    "id": "bba-marketing-s2-subj3-t2",
                    "title": "Marketing Research — Practice Test 2: Exam Simulation",
                    "subject": "Marketing Research",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-marketing-s2-subj-4",
                "name": "Business Statistics",
                "code": "BBA-204",
                "description": "Statistical inference, testing, and descriptive analytics.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-marketing-s2-subj4-t1",
                    "title": "Business Statistics — Practice Test 1: Fundamental Concepts",
                    "subject": "Business Statistics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Business Statistics."
                  },
                  {
                    "id": "bba-marketing-s2-subj4-t2",
                    "title": "Business Statistics — Practice Test 2: Exam Simulation",
                    "subject": "Business Statistics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-3",
            "number": 3,
            "title": "Semester 3",
            "description": "BBA (BBA-MKT) — Semester 3 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "bba-marketing-s3-subj-1",
                "name": "Advertising & Brand Management",
                "code": "BBA-MKT-301",
                "description": "Brand equity, creative advertising strategies, and media planning.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-marketing-s3-subj1-t1",
                    "title": "Advertising & Brand Management — Practice Test 1: Fundamental Concepts",
                    "subject": "Advertising & Brand Management",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Advertising & Brand Management."
                  },
                  {
                    "id": "bba-marketing-s3-subj1-t2",
                    "title": "Advertising & Brand Management — Practice Test 2: Exam Simulation",
                    "subject": "Advertising & Brand Management",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-marketing-s3-subj-2",
                "name": "Sales & Distribution Management",
                "code": "BBA-MKT-302",
                "description": "Sales force management, channel design, and logistics.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-marketing-s3-subj2-t1",
                    "title": "Sales & Distribution Management — Practice Test 1: Fundamental Concepts",
                    "subject": "Sales & Distribution Management",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Sales & Distribution Management."
                  },
                  {
                    "id": "bba-marketing-s3-subj2-t2",
                    "title": "Sales & Distribution Management — Practice Test 2: Exam Simulation",
                    "subject": "Sales & Distribution Management",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-marketing-s3-subj-3",
                "name": "Services Marketing",
                "code": "BBA-MKT-303",
                "description": "7 Ps of services, service quality gaps, and customer loyalty.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-marketing-s3-subj3-t1",
                    "title": "Services Marketing — Practice Test 1: Fundamental Concepts",
                    "subject": "Services Marketing",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Services Marketing."
                  },
                  {
                    "id": "bba-marketing-s3-subj3-t2",
                    "title": "Services Marketing — Practice Test 2: Exam Simulation",
                    "subject": "Services Marketing",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-4",
            "number": 4,
            "title": "Semester 4",
            "description": "BBA (BBA-MKT) — Semester 4 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "bba-marketing-s4-subj-1",
                "name": "Digital Marketing & Social Media",
                "code": "BBA-MKT-401",
                "description": "SEO, SEM, content marketing, Google Ads, and social campaigns.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-marketing-s4-subj1-t1",
                    "title": "Digital Marketing & Social Media — Practice Test 1: Fundamental Concepts",
                    "subject": "Digital Marketing & Social Media",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Digital Marketing & Social Media."
                  },
                  {
                    "id": "bba-marketing-s4-subj1-t2",
                    "title": "Digital Marketing & Social Media — Practice Test 2: Exam Simulation",
                    "subject": "Digital Marketing & Social Media",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-marketing-s4-subj-2",
                "name": "Retail Management",
                "code": "BBA-MKT-402",
                "description": "Store layout, merchandising, inventory, and omnichannel retail.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-marketing-s4-subj2-t1",
                    "title": "Retail Management — Practice Test 1: Fundamental Concepts",
                    "subject": "Retail Management",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Retail Management."
                  },
                  {
                    "id": "bba-marketing-s4-subj2-t2",
                    "title": "Retail Management — Practice Test 2: Exam Simulation",
                    "subject": "Retail Management",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-marketing-s4-subj-3",
                "name": "Business-to-Business (B2B) Marketing",
                "code": "BBA-MKT-403",
                "description": "Organizational buying behavior and relationship marketing.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-marketing-s4-subj3-t1",
                    "title": "Business-to-Business (B2B) Marketing — Practice Test 1: Fundamental Concepts",
                    "subject": "Business-to-Business (B2B) Marketing",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Business-to-Business (B2B) Marketing."
                  },
                  {
                    "id": "bba-marketing-s4-subj3-t2",
                    "title": "Business-to-Business (B2B) Marketing — Practice Test 2: Exam Simulation",
                    "subject": "Business-to-Business (B2B) Marketing",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-5",
            "number": 5,
            "title": "Semester 5",
            "description": "BBA (BBA-MKT) — Semester 5 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "bba-marketing-s5-subj-1",
                "name": "International Marketing",
                "code": "BBA-MKT-501",
                "description": "Global market entry strategies and cross-cultural marketing.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-marketing-s5-subj1-t1",
                    "title": "International Marketing — Practice Test 1: Fundamental Concepts",
                    "subject": "International Marketing",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in International Marketing."
                  },
                  {
                    "id": "bba-marketing-s5-subj1-t2",
                    "title": "International Marketing — Practice Test 2: Exam Simulation",
                    "subject": "International Marketing",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-marketing-s5-subj-2",
                "name": "Strategic Marketing Planning",
                "code": "BBA-MKT-502",
                "description": "Competitive advantage and product portfolio management.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-marketing-s5-subj2-t1",
                    "title": "Strategic Marketing Planning — Practice Test 1: Fundamental Concepts",
                    "subject": "Strategic Marketing Planning",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Strategic Marketing Planning."
                  },
                  {
                    "id": "bba-marketing-s5-subj2-t2",
                    "title": "Strategic Marketing Planning — Practice Test 2: Exam Simulation",
                    "subject": "Strategic Marketing Planning",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-marketing-s5-subj-3",
                "name": "Customer Relationship Management (CRM)",
                "code": "BBA-MKT-503",
                "description": "Customer lifetime value, CRM software, and retention.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-marketing-s5-subj3-t1",
                    "title": "Customer Relationship Management (CRM) — Practice Test 1: Fundamental Concepts",
                    "subject": "Customer Relationship Management (CRM)",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Customer Relationship Management (CRM)."
                  },
                  {
                    "id": "bba-marketing-s5-subj3-t2",
                    "title": "Customer Relationship Management (CRM) — Practice Test 2: Exam Simulation",
                    "subject": "Customer Relationship Management (CRM)",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-6",
            "number": 6,
            "title": "Semester 6",
            "description": "BBA (BBA-MKT) — Semester 6 subjects, mock tests, and exam practice.",
            "availableTestsCount": 4,
            "subjects": [
              {
                "id": "bba-marketing-s6-subj-1",
                "name": "Product Policy & Innovation",
                "code": "BBA-MKT-601",
                "description": "New product development, lifecycle management, and branding.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-marketing-s6-subj1-t1",
                    "title": "Product Policy & Innovation — Practice Test 1: Fundamental Concepts",
                    "subject": "Product Policy & Innovation",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Product Policy & Innovation."
                  },
                  {
                    "id": "bba-marketing-s6-subj1-t2",
                    "title": "Product Policy & Innovation — Practice Test 2: Exam Simulation",
                    "subject": "Product Policy & Innovation",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-marketing-s6-subj-2",
                "name": "Marketing Capstone Project & Viva",
                "code": "BBA-MKT-602",
                "description": "Field research project, strategic brand audit, and defense.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-marketing-s6-subj2-t1",
                    "title": "Marketing Capstone Project & Viva — Practice Test 1: Fundamental Concepts",
                    "subject": "Marketing Capstone Project & Viva",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Marketing Capstone Project & Viva."
                  },
                  {
                    "id": "bba-marketing-s6-subj2-t2",
                    "title": "Marketing Capstone Project & Viva — Practice Test 2: Exam Simulation",
                    "subject": "Marketing Capstone Project & Viva",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "hr",
        "name": "Human Resource Management",
        "code": "BBA-HR",
        "description": "Talent management, organizational behavior, industrial relations, labor laws, and training.",
        "totalSemesters": 6,
        "totalMockTests": 36,
        "semesters": [
          {
            "id": "semester-1",
            "number": 1,
            "title": "Semester 1",
            "description": "BBA (BBA-HR) — Semester 1 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "bba-hr-s1-subj-1",
                "name": "Principles of Management",
                "code": "BBA-101",
                "description": "Foundations of leadership, coordination, and planning.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-hr-s1-subj1-t1",
                    "title": "Principles of Management — Practice Test 1: Fundamental Concepts",
                    "subject": "Principles of Management",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Principles of Management."
                  },
                  {
                    "id": "bba-hr-s1-subj1-t2",
                    "title": "Principles of Management — Practice Test 2: Exam Simulation",
                    "subject": "Principles of Management",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-hr-s1-subj-2",
                "name": "Introduction to Human Resources",
                "code": "BBA-HR-102",
                "description": "HR functions, job analysis, and workforce planning.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-hr-s1-subj2-t1",
                    "title": "Introduction to Human Resources — Practice Test 1: Fundamental Concepts",
                    "subject": "Introduction to Human Resources",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Introduction to Human Resources."
                  },
                  {
                    "id": "bba-hr-s1-subj2-t2",
                    "title": "Introduction to Human Resources — Practice Test 2: Exam Simulation",
                    "subject": "Introduction to Human Resources",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-hr-s1-subj-3",
                "name": "Business Economics",
                "code": "BBA-103",
                "description": "Labor markets, wages, and economic theory.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-hr-s1-subj3-t1",
                    "title": "Business Economics — Practice Test 1: Fundamental Concepts",
                    "subject": "Business Economics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Business Economics."
                  },
                  {
                    "id": "bba-hr-s1-subj3-t2",
                    "title": "Business Economics — Practice Test 2: Exam Simulation",
                    "subject": "Business Economics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-hr-s1-subj-4",
                "name": "Business Communication",
                "code": "BBA-104",
                "description": "Interpersonal communication and interview techniques.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-hr-s1-subj4-t1",
                    "title": "Business Communication — Practice Test 1: Fundamental Concepts",
                    "subject": "Business Communication",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Business Communication."
                  },
                  {
                    "id": "bba-hr-s1-subj4-t2",
                    "title": "Business Communication — Practice Test 2: Exam Simulation",
                    "subject": "Business Communication",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-2",
            "number": 2,
            "title": "Semester 2",
            "description": "BBA (BBA-HR) — Semester 2 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "bba-hr-s2-subj-1",
                "name": "Organizational Behavior",
                "code": "BBA-201",
                "description": "Motivation, personality, and group dynamics.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-hr-s2-subj1-t1",
                    "title": "Organizational Behavior — Practice Test 1: Fundamental Concepts",
                    "subject": "Organizational Behavior",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Organizational Behavior."
                  },
                  {
                    "id": "bba-hr-s2-subj1-t2",
                    "title": "Organizational Behavior — Practice Test 2: Exam Simulation",
                    "subject": "Organizational Behavior",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-hr-s2-subj-2",
                "name": "Recruitment & Talent Acquisition",
                "code": "BBA-HR-202",
                "description": "Sourcing strategies, selection testing, and onboarding.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-hr-s2-subj2-t1",
                    "title": "Recruitment & Talent Acquisition — Practice Test 1: Fundamental Concepts",
                    "subject": "Recruitment & Talent Acquisition",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Recruitment & Talent Acquisition."
                  },
                  {
                    "id": "bba-hr-s2-subj2-t2",
                    "title": "Recruitment & Talent Acquisition — Practice Test 2: Exam Simulation",
                    "subject": "Recruitment & Talent Acquisition",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-hr-s2-subj-3",
                "name": "Business Law",
                "code": "BBA-203",
                "description": "Contracts, partnerships, and legal business frameworks.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-hr-s2-subj3-t1",
                    "title": "Business Law — Practice Test 1: Fundamental Concepts",
                    "subject": "Business Law",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Business Law."
                  },
                  {
                    "id": "bba-hr-s2-subj3-t2",
                    "title": "Business Law — Practice Test 2: Exam Simulation",
                    "subject": "Business Law",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-3",
            "number": 3,
            "title": "Semester 3",
            "description": "BBA (BBA-HR) — Semester 3 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "bba-hr-s3-subj-1",
                "name": "Training & Development",
                "code": "BBA-HR-301",
                "description": "Training needs assessment, instructional design, and evaluation.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-hr-s3-subj1-t1",
                    "title": "Training & Development — Practice Test 1: Fundamental Concepts",
                    "subject": "Training & Development",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Training & Development."
                  },
                  {
                    "id": "bba-hr-s3-subj1-t2",
                    "title": "Training & Development — Practice Test 2: Exam Simulation",
                    "subject": "Training & Development",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-hr-s3-subj-2",
                "name": "Performance Management Systems",
                "code": "BBA-HR-302",
                "description": "KPI setting, 360-degree feedback, and appraisal interviews.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-hr-s3-subj2-t1",
                    "title": "Performance Management Systems — Practice Test 1: Fundamental Concepts",
                    "subject": "Performance Management Systems",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Performance Management Systems."
                  },
                  {
                    "id": "bba-hr-s3-subj2-t2",
                    "title": "Performance Management Systems — Practice Test 2: Exam Simulation",
                    "subject": "Performance Management Systems",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-hr-s3-subj-3",
                "name": "Compensation & Benefits Management",
                "code": "BBA-HR-303",
                "description": "Wage determination, incentive plans, and executive compensation.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-hr-s3-subj3-t1",
                    "title": "Compensation & Benefits Management — Practice Test 1: Fundamental Concepts",
                    "subject": "Compensation & Benefits Management",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Compensation & Benefits Management."
                  },
                  {
                    "id": "bba-hr-s3-subj3-t2",
                    "title": "Compensation & Benefits Management — Practice Test 2: Exam Simulation",
                    "subject": "Compensation & Benefits Management",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-4",
            "number": 4,
            "title": "Semester 4",
            "description": "BBA (BBA-HR) — Semester 4 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "bba-hr-s4-subj-1",
                "name": "Industrial Relations & Labor Legislation",
                "code": "BBA-HR-401",
                "description": "Trade unions, collective bargaining, and Factories Act.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-hr-s4-subj1-t1",
                    "title": "Industrial Relations & Labor Legislation — Practice Test 1: Fundamental Concepts",
                    "subject": "Industrial Relations & Labor Legislation",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Industrial Relations & Labor Legislation."
                  },
                  {
                    "id": "bba-hr-s4-subj1-t2",
                    "title": "Industrial Relations & Labor Legislation — Practice Test 2: Exam Simulation",
                    "subject": "Industrial Relations & Labor Legislation",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-hr-s4-subj-2",
                "name": "Organizational Development & Change",
                "code": "BBA-HR-402",
                "description": "Change management models, team building, and interventions.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-hr-s4-subj2-t1",
                    "title": "Organizational Development & Change — Practice Test 1: Fundamental Concepts",
                    "subject": "Organizational Development & Change",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Organizational Development & Change."
                  },
                  {
                    "id": "bba-hr-s4-subj2-t2",
                    "title": "Organizational Development & Change — Practice Test 2: Exam Simulation",
                    "subject": "Organizational Development & Change",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-hr-s4-subj-3",
                "name": "HR Analytics & Metrics",
                "code": "BBA-HR-403",
                "description": "Attrition prediction, employee engagement data, and HR dashboards.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-hr-s4-subj3-t1",
                    "title": "HR Analytics & Metrics — Practice Test 1: Fundamental Concepts",
                    "subject": "HR Analytics & Metrics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in HR Analytics & Metrics."
                  },
                  {
                    "id": "bba-hr-s4-subj3-t2",
                    "title": "HR Analytics & Metrics — Practice Test 2: Exam Simulation",
                    "subject": "HR Analytics & Metrics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-5",
            "number": 5,
            "title": "Semester 5",
            "description": "BBA (BBA-HR) — Semester 5 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "bba-hr-s5-subj-1",
                "name": "Strategic Human Resource Management",
                "code": "BBA-HR-501",
                "description": "Aligning HR policies with corporate business goals.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-hr-s5-subj1-t1",
                    "title": "Strategic Human Resource Management — Practice Test 1: Fundamental Concepts",
                    "subject": "Strategic Human Resource Management",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Strategic Human Resource Management."
                  },
                  {
                    "id": "bba-hr-s5-subj1-t2",
                    "title": "Strategic Human Resource Management — Practice Test 2: Exam Simulation",
                    "subject": "Strategic Human Resource Management",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-hr-s5-subj-2",
                "name": "International HRM",
                "code": "BBA-HR-502",
                "description": "Expatriate management, global staffing, and cross-cultural HR.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-hr-s5-subj2-t1",
                    "title": "International HRM — Practice Test 1: Fundamental Concepts",
                    "subject": "International HRM",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in International HRM."
                  },
                  {
                    "id": "bba-hr-s5-subj2-t2",
                    "title": "International HRM — Practice Test 2: Exam Simulation",
                    "subject": "International HRM",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-hr-s5-subj-3",
                "name": "Business Ethics & Corporate Governance",
                "code": "BBA-HR-503",
                "description": "Ethical leadership, CSR, and workplace diversity.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-hr-s5-subj3-t1",
                    "title": "Business Ethics & Corporate Governance — Practice Test 1: Fundamental Concepts",
                    "subject": "Business Ethics & Corporate Governance",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Business Ethics & Corporate Governance."
                  },
                  {
                    "id": "bba-hr-s5-subj3-t2",
                    "title": "Business Ethics & Corporate Governance — Practice Test 2: Exam Simulation",
                    "subject": "Business Ethics & Corporate Governance",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-6",
            "number": 6,
            "title": "Semester 6",
            "description": "BBA (BBA-HR) — Semester 6 subjects, mock tests, and exam practice.",
            "availableTestsCount": 4,
            "subjects": [
              {
                "id": "bba-hr-s6-subj-1",
                "name": "Labor Welfare & Social Security",
                "code": "BBA-HR-601",
                "description": "Provident funds, gratuity, health insurance, and workplace safety.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-hr-s6-subj1-t1",
                    "title": "Labor Welfare & Social Security — Practice Test 1: Fundamental Concepts",
                    "subject": "Labor Welfare & Social Security",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Labor Welfare & Social Security."
                  },
                  {
                    "id": "bba-hr-s6-subj1-t2",
                    "title": "Labor Welfare & Social Security — Practice Test 2: Exam Simulation",
                    "subject": "Labor Welfare & Social Security",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bba-hr-s6-subj-2",
                "name": "HR Capstone Project & Viva",
                "code": "BBA-HR-602",
                "description": "Comprehensive HR field research study and viva.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bba-hr-s6-subj2-t1",
                    "title": "HR Capstone Project & Viva — Practice Test 1: Fundamental Concepts",
                    "subject": "HR Capstone Project & Viva",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in HR Capstone Project & Viva."
                  },
                  {
                    "id": "bba-hr-s6-subj2-t2",
                    "title": "HR Capstone Project & Viva — Practice Test 2: Exam Simulation",
                    "subject": "HR Capstone Project & Viva",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "semesters": [
      {
        "id": "semester-1",
        "number": 1,
        "title": "Semester 1",
        "description": "BBA (BBA-FIN) — Semester 1 subjects, mock tests, and exam practice.",
        "availableTestsCount": 8,
        "subjects": [
          {
            "id": "bba-finance-s1-subj-1",
            "name": "Principles of Management",
            "code": "BBA-101",
            "description": "Planning, organizing, staffing, leading, and controlling organizations.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bba-finance-s1-subj1-t1",
                "title": "Principles of Management — Practice Test 1: Fundamental Concepts",
                "subject": "Principles of Management",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Principles of Management."
              },
              {
                "id": "bba-finance-s1-subj1-t2",
                "title": "Principles of Management — Practice Test 2: Exam Simulation",
                "subject": "Principles of Management",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bba-finance-s1-subj-2",
            "name": "Financial Accounting",
            "code": "BBA-102",
            "description": "Journal entries, ledgers, trial balance, and balance sheet preparation.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bba-finance-s1-subj2-t1",
                "title": "Financial Accounting — Practice Test 1: Fundamental Concepts",
                "subject": "Financial Accounting",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Financial Accounting."
              },
              {
                "id": "bba-finance-s1-subj2-t2",
                "title": "Financial Accounting — Practice Test 2: Exam Simulation",
                "subject": "Financial Accounting",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bba-finance-s1-subj-3",
            "name": "Microeconomics for Business",
            "code": "BBA-103",
            "description": "Supply, demand, market structures, and cost functions.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bba-finance-s1-subj3-t1",
                "title": "Microeconomics for Business — Practice Test 1: Fundamental Concepts",
                "subject": "Microeconomics for Business",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Microeconomics for Business."
              },
              {
                "id": "bba-finance-s1-subj3-t2",
                "title": "Microeconomics for Business — Practice Test 2: Exam Simulation",
                "subject": "Microeconomics for Business",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bba-finance-s1-subj-4",
            "name": "Business Communication",
            "code": "BBA-104",
            "description": "Written correspondence, presentation skills, and corporate memos.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bba-finance-s1-subj4-t1",
                "title": "Business Communication — Practice Test 1: Fundamental Concepts",
                "subject": "Business Communication",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Business Communication."
              },
              {
                "id": "bba-finance-s1-subj4-t2",
                "title": "Business Communication — Practice Test 2: Exam Simulation",
                "subject": "Business Communication",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      },
      {
        "id": "semester-2",
        "number": 2,
        "title": "Semester 2",
        "description": "BBA (BBA-FIN) — Semester 2 subjects, mock tests, and exam practice.",
        "availableTestsCount": 8,
        "subjects": [
          {
            "id": "bba-finance-s2-subj-1",
            "name": "Organizational Behavior",
            "code": "BBA-201",
            "description": "Motivation, group dynamics, leadership styles, and corporate culture.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bba-finance-s2-subj1-t1",
                "title": "Organizational Behavior — Practice Test 1: Fundamental Concepts",
                "subject": "Organizational Behavior",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Organizational Behavior."
              },
              {
                "id": "bba-finance-s2-subj1-t2",
                "title": "Organizational Behavior — Practice Test 2: Exam Simulation",
                "subject": "Organizational Behavior",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bba-finance-s2-subj-2",
            "name": "Cost Accounting",
            "code": "BBA-202",
            "description": "Material, labor, overhead costing, and marginal break-even analysis.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bba-finance-s2-subj2-t1",
                "title": "Cost Accounting — Practice Test 1: Fundamental Concepts",
                "subject": "Cost Accounting",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Cost Accounting."
              },
              {
                "id": "bba-finance-s2-subj2-t2",
                "title": "Cost Accounting — Practice Test 2: Exam Simulation",
                "subject": "Cost Accounting",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bba-finance-s2-subj-3",
            "name": "Macroeconomics for Business",
            "code": "BBA-203",
            "description": "National income accounting, inflation, fiscal policy, and GDP.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bba-finance-s2-subj3-t1",
                "title": "Macroeconomics for Business — Practice Test 1: Fundamental Concepts",
                "subject": "Macroeconomics for Business",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Macroeconomics for Business."
              },
              {
                "id": "bba-finance-s2-subj3-t2",
                "title": "Macroeconomics for Business — Practice Test 2: Exam Simulation",
                "subject": "Macroeconomics for Business",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bba-finance-s2-subj-4",
            "name": "Business Mathematics & Statistics",
            "code": "BBA-204",
            "description": "Time value of money, probability, and correlation analysis.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bba-finance-s2-subj4-t1",
                "title": "Business Mathematics & Statistics — Practice Test 1: Fundamental Concepts",
                "subject": "Business Mathematics & Statistics",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Business Mathematics & Statistics."
              },
              {
                "id": "bba-finance-s2-subj4-t2",
                "title": "Business Mathematics & Statistics — Practice Test 2: Exam Simulation",
                "subject": "Business Mathematics & Statistics",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      },
      {
        "id": "semester-3",
        "number": 3,
        "title": "Semester 3",
        "description": "BBA (BBA-FIN) — Semester 3 subjects, mock tests, and exam practice.",
        "availableTestsCount": 8,
        "subjects": [
          {
            "id": "bba-finance-s3-subj-1",
            "name": "Corporate Financial Management",
            "code": "BBA-301",
            "description": "Capital budgeting, cost of capital (WACC), and dividend policies.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bba-finance-s3-subj1-t1",
                "title": "Corporate Financial Management — Practice Test 1: Fundamental Concepts",
                "subject": "Corporate Financial Management",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Corporate Financial Management."
              },
              {
                "id": "bba-finance-s3-subj1-t2",
                "title": "Corporate Financial Management — Practice Test 2: Exam Simulation",
                "subject": "Corporate Financial Management",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bba-finance-s3-subj-2",
            "name": "Corporate & Business Law",
            "code": "BBA-302",
            "description": "Indian Contract Act, Sale of Goods Act, and Companies Act.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bba-finance-s3-subj2-t1",
                "title": "Corporate & Business Law — Practice Test 1: Fundamental Concepts",
                "subject": "Corporate & Business Law",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Corporate & Business Law."
              },
              {
                "id": "bba-finance-s3-subj2-t2",
                "title": "Corporate & Business Law — Practice Test 2: Exam Simulation",
                "subject": "Corporate & Business Law",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bba-finance-s3-subj-3",
            "name": "Marketing Management",
            "code": "BBA-303",
            "description": "Market segmentation, targeting, positioning, and marketing mix.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bba-finance-s3-subj3-t1",
                "title": "Marketing Management — Practice Test 1: Fundamental Concepts",
                "subject": "Marketing Management",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Marketing Management."
              },
              {
                "id": "bba-finance-s3-subj3-t2",
                "title": "Marketing Management — Practice Test 2: Exam Simulation",
                "subject": "Marketing Management",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bba-finance-s3-subj-4",
            "name": "Human Resource Management",
            "code": "BBA-304",
            "description": "Recruitment, selection, training, performance appraisal, and compensation.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bba-finance-s3-subj4-t1",
                "title": "Human Resource Management — Practice Test 1: Fundamental Concepts",
                "subject": "Human Resource Management",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Human Resource Management."
              },
              {
                "id": "bba-finance-s3-subj4-t2",
                "title": "Human Resource Management — Practice Test 2: Exam Simulation",
                "subject": "Human Resource Management",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      },
      {
        "id": "semester-4",
        "number": 4,
        "title": "Semester 4",
        "description": "BBA (BBA-FIN) — Semester 4 subjects, mock tests, and exam practice.",
        "availableTestsCount": 8,
        "subjects": [
          {
            "id": "bba-finance-s4-subj-1",
            "name": "Security Analysis & Portfolio Management",
            "code": "BBA-401",
            "description": "Risk-return tradeoff, CAPM model, and technical chart analysis.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bba-finance-s4-subj1-t1",
                "title": "Security Analysis & Portfolio Management — Practice Test 1: Fundamental Concepts",
                "subject": "Security Analysis & Portfolio Management",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Security Analysis & Portfolio Management."
              },
              {
                "id": "bba-finance-s4-subj1-t2",
                "title": "Security Analysis & Portfolio Management — Practice Test 2: Exam Simulation",
                "subject": "Security Analysis & Portfolio Management",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bba-finance-s4-subj-2",
            "name": "Corporate Taxation & GST",
            "code": "BBA-402",
            "description": "Direct taxation, corporate deductions, and GST compliance.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bba-finance-s4-subj2-t1",
                "title": "Corporate Taxation & GST — Practice Test 1: Fundamental Concepts",
                "subject": "Corporate Taxation & GST",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Corporate Taxation & GST."
              },
              {
                "id": "bba-finance-s4-subj2-t2",
                "title": "Corporate Taxation & GST — Practice Test 2: Exam Simulation",
                "subject": "Corporate Taxation & GST",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bba-finance-s4-subj-3",
            "name": "Business Research Methodology",
            "code": "BBA-403",
            "description": "Research design, sampling techniques, and hypothesis testing.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bba-finance-s4-subj3-t1",
                "title": "Business Research Methodology — Practice Test 1: Fundamental Concepts",
                "subject": "Business Research Methodology",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Business Research Methodology."
              },
              {
                "id": "bba-finance-s4-subj3-t2",
                "title": "Business Research Methodology — Practice Test 2: Exam Simulation",
                "subject": "Business Research Methodology",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bba-finance-s4-subj-4",
            "name": "Management Information Systems",
            "code": "BBA-404",
            "description": "ERP systems, decision support systems, and IT in business.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bba-finance-s4-subj4-t1",
                "title": "Management Information Systems — Practice Test 1: Fundamental Concepts",
                "subject": "Management Information Systems",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Management Information Systems."
              },
              {
                "id": "bba-finance-s4-subj4-t2",
                "title": "Management Information Systems — Practice Test 2: Exam Simulation",
                "subject": "Management Information Systems",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      },
      {
        "id": "semester-5",
        "number": 5,
        "title": "Semester 5",
        "description": "BBA (BBA-FIN) — Semester 5 subjects, mock tests, and exam practice.",
        "availableTestsCount": 6,
        "subjects": [
          {
            "id": "bba-finance-s5-subj-1",
            "name": "Financial Markets & Institutions",
            "code": "BBA-501",
            "description": "Money markets, capital markets, SEBI regulations, and stock exchanges.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bba-finance-s5-subj1-t1",
                "title": "Financial Markets & Institutions — Practice Test 1: Fundamental Concepts",
                "subject": "Financial Markets & Institutions",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Financial Markets & Institutions."
              },
              {
                "id": "bba-finance-s5-subj1-t2",
                "title": "Financial Markets & Institutions — Practice Test 2: Exam Simulation",
                "subject": "Financial Markets & Institutions",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bba-finance-s5-subj-2",
            "name": "International Financial Management",
            "code": "BBA-502",
            "description": "Foreign exchange risk, hedging, and multinational capital budgeting.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bba-finance-s5-subj2-t1",
                "title": "International Financial Management — Practice Test 1: Fundamental Concepts",
                "subject": "International Financial Management",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in International Financial Management."
              },
              {
                "id": "bba-finance-s5-subj2-t2",
                "title": "International Financial Management — Practice Test 2: Exam Simulation",
                "subject": "International Financial Management",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bba-finance-s5-subj-3",
            "name": "Strategic Management",
            "code": "BBA-503",
            "description": "Porter’s five forces, generic strategies, and corporate governance.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bba-finance-s5-subj3-t1",
                "title": "Strategic Management — Practice Test 1: Fundamental Concepts",
                "subject": "Strategic Management",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Strategic Management."
              },
              {
                "id": "bba-finance-s5-subj3-t2",
                "title": "Strategic Management — Practice Test 2: Exam Simulation",
                "subject": "Strategic Management",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      },
      {
        "id": "semester-6",
        "number": 6,
        "title": "Semester 6",
        "description": "BBA (BBA-FIN) — Semester 6 subjects, mock tests, and exam practice.",
        "availableTestsCount": 6,
        "subjects": [
          {
            "id": "bba-finance-s6-subj-1",
            "name": "Investment Banking & Financial Services",
            "code": "BBA-601",
            "description": "IPOs, underwriting, venture capital, and private equity.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bba-finance-s6-subj1-t1",
                "title": "Investment Banking & Financial Services — Practice Test 1: Fundamental Concepts",
                "subject": "Investment Banking & Financial Services",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Investment Banking & Financial Services."
              },
              {
                "id": "bba-finance-s6-subj1-t2",
                "title": "Investment Banking & Financial Services — Practice Test 2: Exam Simulation",
                "subject": "Investment Banking & Financial Services",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bba-finance-s6-subj-2",
            "name": "Financial Derivatives & Risk Management",
            "code": "BBA-602",
            "description": "Futures, options, swaps, and hedging strategies.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bba-finance-s6-subj2-t1",
                "title": "Financial Derivatives & Risk Management — Practice Test 1: Fundamental Concepts",
                "subject": "Financial Derivatives & Risk Management",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Financial Derivatives & Risk Management."
              },
              {
                "id": "bba-finance-s6-subj2-t2",
                "title": "Financial Derivatives & Risk Management — Practice Test 2: Exam Simulation",
                "subject": "Financial Derivatives & Risk Management",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bba-finance-s6-subj-3",
            "name": "Comprehensive Business Project & Viva",
            "code": "BBA-603",
            "description": "Applied business research dissertation and oral viva.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bba-finance-s6-subj3-t1",
                "title": "Comprehensive Business Project & Viva — Practice Test 1: Fundamental Concepts",
                "subject": "Comprehensive Business Project & Viva",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Comprehensive Business Project & Viva."
              },
              {
                "id": "bba-finance-s6-subj3-t2",
                "title": "Comprehensive Business Project & Viva — Practice Test 2: Exam Simulation",
                "subject": "Comprehensive Business Project & Viva",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "ba",
    "name": "BA",
    "title": "Bachelor of Arts",
    "description": "Humanities, languages, social sciences, and communication across six semesters.",
    "iconName": "BookOpen",
    "totalSemesters": 6,
    "totalMockTests": 104,
    "branches": [
      {
        "id": "english",
        "name": "English Literature & Linguistics",
        "code": "BA-ENG",
        "description": "Classical, British, American, and Post-Colonial literature, literary theory, and linguistics.",
        "totalSemesters": 6,
        "totalMockTests": 36,
        "semesters": [
          {
            "id": "semester-1",
            "number": 1,
            "title": "Semester 1",
            "description": "BA (BA-ENG) — Semester 1 subjects, mock tests, and exam practice.",
            "availableTestsCount": 8,
            "subjects": [
              {
                "id": "ba-english-s1-subj-1",
                "name": "Introduction to English Literature",
                "code": "ENG-101",
                "description": "Forms of poetry, drama, fiction, and narrative prose.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-english-s1-subj1-t1",
                    "title": "Introduction to English Literature — Practice Test 1: Fundamental Concepts",
                    "subject": "Introduction to English Literature",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Introduction to English Literature."
                  },
                  {
                    "id": "ba-english-s1-subj1-t2",
                    "title": "Introduction to English Literature — Practice Test 2: Exam Simulation",
                    "subject": "Introduction to English Literature",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-english-s1-subj-2",
                "name": "World Literature & Classical Myths",
                "code": "ENG-102",
                "description": "Greco-Roman epics, Homer, and comparative mythology.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-english-s1-subj2-t1",
                    "title": "World Literature & Classical Myths — Practice Test 1: Fundamental Concepts",
                    "subject": "World Literature & Classical Myths",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in World Literature & Classical Myths."
                  },
                  {
                    "id": "ba-english-s1-subj2-t2",
                    "title": "World Literature & Classical Myths — Practice Test 2: Exam Simulation",
                    "subject": "World Literature & Classical Myths",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-english-s1-subj-3",
                "name": "Academic Writing & Composition",
                "code": "ENG-103",
                "description": "Critical analysis, essay writing, rhetoric, and citations.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-english-s1-subj3-t1",
                    "title": "Academic Writing & Composition — Practice Test 1: Fundamental Concepts",
                    "subject": "Academic Writing & Composition",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Academic Writing & Composition."
                  },
                  {
                    "id": "ba-english-s1-subj3-t2",
                    "title": "Academic Writing & Composition — Practice Test 2: Exam Simulation",
                    "subject": "Academic Writing & Composition",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-english-s1-subj-4",
                "name": "Environmental Studies",
                "code": "BA-104",
                "description": "Environmental conservation and humanities perspectives.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-english-s1-subj4-t1",
                    "title": "Environmental Studies — Practice Test 1: Fundamental Concepts",
                    "subject": "Environmental Studies",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Environmental Studies."
                  },
                  {
                    "id": "ba-english-s1-subj4-t2",
                    "title": "Environmental Studies — Practice Test 2: Exam Simulation",
                    "subject": "Environmental Studies",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-2",
            "number": 2,
            "title": "Semester 2",
            "description": "BA (BA-ENG) — Semester 2 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "ba-english-s2-subj-1",
                "name": "British Poetry & Drama (16th–18th C)",
                "code": "ENG-201",
                "description": "Shakespeare, Marlowe, Milton, Pope, and Elizabethan theatre.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-english-s2-subj1-t1",
                    "title": "British Poetry & Drama (16th–18th C) — Practice Test 1: Fundamental Concepts",
                    "subject": "British Poetry & Drama (16th–18th C)",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in British Poetry & Drama (16th–18th C)."
                  },
                  {
                    "id": "ba-english-s2-subj1-t2",
                    "title": "British Poetry & Drama (16th–18th C) — Practice Test 2: Exam Simulation",
                    "subject": "British Poetry & Drama (16th–18th C)",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-english-s2-subj-2",
                "name": "History of the English Language",
                "code": "ENG-202",
                "description": "Old English, Middle English, Great Vowel Shift, and global Englishes.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-english-s2-subj2-t1",
                    "title": "History of the English Language — Practice Test 1: Fundamental Concepts",
                    "subject": "History of the English Language",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in History of the English Language."
                  },
                  {
                    "id": "ba-english-s2-subj2-t2",
                    "title": "History of the English Language — Practice Test 2: Exam Simulation",
                    "subject": "History of the English Language",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-english-s2-subj-3",
                "name": "Indian Writing in English",
                "code": "ENG-203",
                "description": "Tagore, R.K. Narayan, Salman Rushdie, and post-independence voices.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-english-s2-subj3-t1",
                    "title": "Indian Writing in English — Practice Test 1: Fundamental Concepts",
                    "subject": "Indian Writing in English",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Indian Writing in English."
                  },
                  {
                    "id": "ba-english-s2-subj3-t2",
                    "title": "Indian Writing in English — Practice Test 2: Exam Simulation",
                    "subject": "Indian Writing in English",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-3",
            "number": 3,
            "title": "Semester 3",
            "description": "BA (BA-ENG) — Semester 3 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "ba-english-s3-subj-1",
                "name": "19th-Century European Literature",
                "code": "ENG-301",
                "description": "Romantic and Victorian poets: Wordsworth, Keats, Tennyson, and Dickens.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-english-s3-subj1-t1",
                    "title": "19th-Century European Literature — Practice Test 1: Fundamental Concepts",
                    "subject": "19th-Century European Literature",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in 19th-Century European Literature."
                  },
                  {
                    "id": "ba-english-s3-subj1-t2",
                    "title": "19th-Century European Literature — Practice Test 2: Exam Simulation",
                    "subject": "19th-Century European Literature",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-english-s3-subj-2",
                "name": "Phonetics & English Linguistics",
                "code": "ENG-302",
                "description": "IPA transcription, syntax trees, morphology, and semantics.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-english-s3-subj2-t1",
                    "title": "Phonetics & English Linguistics — Practice Test 1: Fundamental Concepts",
                    "subject": "Phonetics & English Linguistics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Phonetics & English Linguistics."
                  },
                  {
                    "id": "ba-english-s3-subj2-t2",
                    "title": "Phonetics & English Linguistics — Practice Test 2: Exam Simulation",
                    "subject": "Phonetics & English Linguistics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-english-s3-subj-3",
                "name": "Women’s Writings & Gender Studies",
                "code": "ENG-303",
                "description": "Feminist literary criticism, Virginia Woolf, and gender discourses.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-english-s3-subj3-t1",
                    "title": "Women’s Writings & Gender Studies — Practice Test 1: Fundamental Concepts",
                    "subject": "Women’s Writings & Gender Studies",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Women’s Writings & Gender Studies."
                  },
                  {
                    "id": "ba-english-s3-subj3-t2",
                    "title": "Women’s Writings & Gender Studies — Practice Test 2: Exam Simulation",
                    "subject": "Women’s Writings & Gender Studies",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-4",
            "number": 4,
            "title": "Semester 4",
            "description": "BA (BA-ENG) — Semester 4 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "ba-english-s4-subj-1",
                "name": "Modern British & American Literature",
                "code": "ENG-401",
                "description": "T.S. Eliot, W.B. Yeats, Hemingway, Fitzgerald, and Modernism.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-english-s4-subj1-t1",
                    "title": "Modern British & American Literature — Practice Test 1: Fundamental Concepts",
                    "subject": "Modern British & American Literature",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Modern British & American Literature."
                  },
                  {
                    "id": "ba-english-s4-subj1-t2",
                    "title": "Modern British & American Literature — Practice Test 2: Exam Simulation",
                    "subject": "Modern British & American Literature",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-english-s4-subj-2",
                "name": "Post-Colonial Literature",
                "code": "ENG-402",
                "description": "Achebe, Edward Said’s Orientalism, and subaltern narratives.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-english-s4-subj2-t1",
                    "title": "Post-Colonial Literature — Practice Test 1: Fundamental Concepts",
                    "subject": "Post-Colonial Literature",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Post-Colonial Literature."
                  },
                  {
                    "id": "ba-english-s4-subj2-t2",
                    "title": "Post-Colonial Literature — Practice Test 2: Exam Simulation",
                    "subject": "Post-Colonial Literature",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-english-s4-subj-3",
                "name": "Literary Theory & Criticism",
                "code": "ENG-403",
                "description": "Formalism, Structuralism, Deconstruction, and Psychoanalytic theory.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-english-s4-subj3-t1",
                    "title": "Literary Theory & Criticism — Practice Test 1: Fundamental Concepts",
                    "subject": "Literary Theory & Criticism",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Literary Theory & Criticism."
                  },
                  {
                    "id": "ba-english-s4-subj3-t2",
                    "title": "Literary Theory & Criticism — Practice Test 2: Exam Simulation",
                    "subject": "Literary Theory & Criticism",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-5",
            "number": 5,
            "title": "Semester 5",
            "description": "BA (BA-ENG) — Semester 5 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "ba-english-s5-subj-1",
                "name": "Contemporary World Drama & Theatre",
                "code": "ENG-501",
                "description": "Absurdist drama, Beckett, Brecht’s epic theatre, and performance.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-english-s5-subj1-t1",
                    "title": "Contemporary World Drama & Theatre — Practice Test 1: Fundamental Concepts",
                    "subject": "Contemporary World Drama & Theatre",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Contemporary World Drama & Theatre."
                  },
                  {
                    "id": "ba-english-s5-subj1-t2",
                    "title": "Contemporary World Drama & Theatre — Practice Test 2: Exam Simulation",
                    "subject": "Contemporary World Drama & Theatre",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-english-s5-subj-2",
                "name": "Translation Studies & Praxis",
                "code": "ENG-502",
                "description": "Theories of translation, cultural transposition, and text practice.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-english-s5-subj2-t1",
                    "title": "Translation Studies & Praxis — Practice Test 1: Fundamental Concepts",
                    "subject": "Translation Studies & Praxis",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Translation Studies & Praxis."
                  },
                  {
                    "id": "ba-english-s5-subj2-t2",
                    "title": "Translation Studies & Praxis — Practice Test 2: Exam Simulation",
                    "subject": "Translation Studies & Praxis",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-english-s5-subj-3",
                "name": "Film & Cultural Studies",
                "code": "ENG-503",
                "description": "Cinematic adaptation, semiotics, popular culture, and ideology.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-english-s5-subj3-t1",
                    "title": "Film & Cultural Studies — Practice Test 1: Fundamental Concepts",
                    "subject": "Film & Cultural Studies",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Film & Cultural Studies."
                  },
                  {
                    "id": "ba-english-s5-subj3-t2",
                    "title": "Film & Cultural Studies — Practice Test 2: Exam Simulation",
                    "subject": "Film & Cultural Studies",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-6",
            "number": 6,
            "title": "Semester 6",
            "description": "BA (BA-ENG) — Semester 6 subjects, mock tests, and exam practice.",
            "availableTestsCount": 4,
            "subjects": [
              {
                "id": "ba-english-s6-subj-1",
                "name": "21st-Century Fiction & Digital Humanities",
                "code": "ENG-601",
                "description": "Contemporary fiction, graphic novels, and computational literary study.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-english-s6-subj1-t1",
                    "title": "21st-Century Fiction & Digital Humanities — Practice Test 1: Fundamental Concepts",
                    "subject": "21st-Century Fiction & Digital Humanities",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in 21st-Century Fiction & Digital Humanities."
                  },
                  {
                    "id": "ba-english-s6-subj1-t2",
                    "title": "21st-Century Fiction & Digital Humanities — Practice Test 2: Exam Simulation",
                    "subject": "21st-Century Fiction & Digital Humanities",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-english-s6-subj-2",
                "name": "Research Project & Literary Dissertation",
                "code": "ENG-602",
                "description": "Supervised academic dissertation and oral defense.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-english-s6-subj2-t1",
                    "title": "Research Project & Literary Dissertation — Practice Test 1: Fundamental Concepts",
                    "subject": "Research Project & Literary Dissertation",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Research Project & Literary Dissertation."
                  },
                  {
                    "id": "ba-english-s6-subj2-t2",
                    "title": "Research Project & Literary Dissertation — Practice Test 2: Exam Simulation",
                    "subject": "Research Project & Literary Dissertation",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "history",
        "name": "History & Archaeology",
        "code": "BA-HIST",
        "description": "Ancient, medieval, and modern world history, Indian historiography, and archaeological methods.",
        "totalSemesters": 6,
        "totalMockTests": 34,
        "semesters": [
          {
            "id": "semester-1",
            "number": 1,
            "title": "Semester 1",
            "description": "BA (BA-HIST) — Semester 1 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "ba-history-s1-subj-1",
                "name": "Ancient World Civilizations",
                "code": "HIS-101",
                "description": "Mesopotamia, Egypt, Shang Dynasty, and Indus Valley civilization.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-history-s1-subj1-t1",
                    "title": "Ancient World Civilizations — Practice Test 1: Fundamental Concepts",
                    "subject": "Ancient World Civilizations",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Ancient World Civilizations."
                  },
                  {
                    "id": "ba-history-s1-subj1-t2",
                    "title": "Ancient World Civilizations — Practice Test 2: Exam Simulation",
                    "subject": "Ancient World Civilizations",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-history-s1-subj-2",
                "name": "Ancient Indian History (Prehistory to 600 BCE)",
                "code": "HIS-102",
                "description": "Paleolithic to Iron Age, Harappan civilization, and Vedic period.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-history-s1-subj2-t1",
                    "title": "Ancient Indian History (Prehistory to 600 BCE) — Practice Test 1: Fundamental Concepts",
                    "subject": "Ancient Indian History (Prehistory to 600 BCE)",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Ancient Indian History (Prehistory to 600 BCE)."
                  },
                  {
                    "id": "ba-history-s1-subj2-t2",
                    "title": "Ancient Indian History (Prehistory to 600 BCE) — Practice Test 2: Exam Simulation",
                    "subject": "Ancient Indian History (Prehistory to 600 BCE)",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-history-s1-subj-3",
                "name": "History of Ancient Greece & Rome",
                "code": "HIS-103",
                "description": "Athenian democracy, Alexander, and the Roman Empire.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-history-s1-subj3-t1",
                    "title": "History of Ancient Greece & Rome — Practice Test 1: Fundamental Concepts",
                    "subject": "History of Ancient Greece & Rome",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in History of Ancient Greece & Rome."
                  },
                  {
                    "id": "ba-history-s1-subj3-t2",
                    "title": "History of Ancient Greece & Rome — Practice Test 2: Exam Simulation",
                    "subject": "History of Ancient Greece & Rome",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-2",
            "number": 2,
            "title": "Semester 2",
            "description": "BA (BA-HIST) — Semester 2 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "ba-history-s2-subj-1",
                "name": "Early Indian State Formations (600 BCE–650 CE)",
                "code": "HIS-201",
                "description": "Mauryas, Guptas, Buddhism, Jainism, and trade routes.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-history-s2-subj1-t1",
                    "title": "Early Indian State Formations (600 BCE–650 CE) — Practice Test 1: Fundamental Concepts",
                    "subject": "Early Indian State Formations (600 BCE–650 CE)",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Early Indian State Formations (600 BCE–650 CE)."
                  },
                  {
                    "id": "ba-history-s2-subj1-t2",
                    "title": "Early Indian State Formations (600 BCE–650 CE) — Practice Test 2: Exam Simulation",
                    "subject": "Early Indian State Formations (600 BCE–650 CE)",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-history-s2-subj-2",
                "name": "Medieval European History (500–1500 CE)",
                "code": "HIS-202",
                "description": "Feudalism, Crusades, Monasticism, and early Renaissance.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-history-s2-subj2-t1",
                    "title": "Medieval European History (500–1500 CE) — Practice Test 1: Fundamental Concepts",
                    "subject": "Medieval European History (500–1500 CE)",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Medieval European History (500–1500 CE)."
                  },
                  {
                    "id": "ba-history-s2-subj2-t2",
                    "title": "Medieval European History (500–1500 CE) — Practice Test 2: Exam Simulation",
                    "subject": "Medieval European History (500–1500 CE)",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-history-s2-subj-3",
                "name": "Principles of Archaeology",
                "code": "HIS-203",
                "description": "Excavation methods, stratigraphy, dating, and heritage preservation.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-history-s2-subj3-t1",
                    "title": "Principles of Archaeology — Practice Test 1: Fundamental Concepts",
                    "subject": "Principles of Archaeology",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Principles of Archaeology."
                  },
                  {
                    "id": "ba-history-s2-subj3-t2",
                    "title": "Principles of Archaeology — Practice Test 2: Exam Simulation",
                    "subject": "Principles of Archaeology",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-3",
            "number": 3,
            "title": "Semester 3",
            "description": "BA (BA-HIST) — Semester 3 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "ba-history-s3-subj-1",
                "name": "Medieval Indian History (Delhi Sultanate)",
                "code": "HIS-301",
                "description": "Ghurid invasions, Sultanate administration, society, and economy.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-history-s3-subj1-t1",
                    "title": "Medieval Indian History (Delhi Sultanate) — Practice Test 1: Fundamental Concepts",
                    "subject": "Medieval Indian History (Delhi Sultanate)",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Medieval Indian History (Delhi Sultanate)."
                  },
                  {
                    "id": "ba-history-s3-subj1-t2",
                    "title": "Medieval Indian History (Delhi Sultanate) — Practice Test 2: Exam Simulation",
                    "subject": "Medieval Indian History (Delhi Sultanate)",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-history-s3-subj-2",
                "name": "The Mughal Empire (1526–1707 CE)",
                "code": "HIS-302",
                "description": "Akbar’s religious policy, mansabdari system, architecture, and decline.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-history-s3-subj2-t1",
                    "title": "The Mughal Empire (1526–1707 CE) — Practice Test 1: Fundamental Concepts",
                    "subject": "The Mughal Empire (1526–1707 CE)",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in The Mughal Empire (1526–1707 CE)."
                  },
                  {
                    "id": "ba-history-s3-subj2-t2",
                    "title": "The Mughal Empire (1526–1707 CE) — Practice Test 2: Exam Simulation",
                    "subject": "The Mughal Empire (1526–1707 CE)",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-history-s3-subj-3",
                "name": "Renaissance & Reformation in Europe",
                "code": "HIS-303",
                "description": "Humanism, Protestant reformation, and scientific revolution.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-history-s3-subj3-t1",
                    "title": "Renaissance & Reformation in Europe — Practice Test 1: Fundamental Concepts",
                    "subject": "Renaissance & Reformation in Europe",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Renaissance & Reformation in Europe."
                  },
                  {
                    "id": "ba-history-s3-subj3-t2",
                    "title": "Renaissance & Reformation in Europe — Practice Test 2: Exam Simulation",
                    "subject": "Renaissance & Reformation in Europe",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-4",
            "number": 4,
            "title": "Semester 4",
            "description": "BA (BA-HIST) — Semester 4 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "ba-history-s4-subj-1",
                "name": "Modern Indian History (Colonial Conquest)",
                "code": "HIS-401",
                "description": "East India Company, 1857 revolt, and economic impact of colonialism.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-history-s4-subj1-t1",
                    "title": "Modern Indian History (Colonial Conquest) — Practice Test 1: Fundamental Concepts",
                    "subject": "Modern Indian History (Colonial Conquest)",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Modern Indian History (Colonial Conquest)."
                  },
                  {
                    "id": "ba-history-s4-subj1-t2",
                    "title": "Modern Indian History (Colonial Conquest) — Practice Test 2: Exam Simulation",
                    "subject": "Modern Indian History (Colonial Conquest)",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-history-s4-subj-2",
                "name": "The Industrial Revolution & Modern Europe",
                "code": "HIS-402",
                "description": "Capitalism, French Revolution, and rise of nation-states.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-history-s4-subj2-t1",
                    "title": "The Industrial Revolution & Modern Europe — Practice Test 1: Fundamental Concepts",
                    "subject": "The Industrial Revolution & Modern Europe",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in The Industrial Revolution & Modern Europe."
                  },
                  {
                    "id": "ba-history-s4-subj2-t2",
                    "title": "The Industrial Revolution & Modern Europe — Practice Test 2: Exam Simulation",
                    "subject": "The Industrial Revolution & Modern Europe",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-history-s4-subj-3",
                "name": "World History (1914–1945: The World Wars)",
                "code": "HIS-403",
                "description": "World War I, Russian Revolution, Fascism, and World War II.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-history-s4-subj3-t1",
                    "title": "World History (1914–1945: The World Wars) — Practice Test 1: Fundamental Concepts",
                    "subject": "World History (1914–1945: The World Wars)",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in World History (1914–1945: The World Wars)."
                  },
                  {
                    "id": "ba-history-s4-subj3-t2",
                    "title": "World History (1914–1945: The World Wars) — Practice Test 2: Exam Simulation",
                    "subject": "World History (1914–1945: The World Wars)",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-5",
            "number": 5,
            "title": "Semester 5",
            "description": "BA (BA-HIST) — Semester 5 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "ba-history-s5-subj-1",
                "name": "Indian National Movement (1885–1947)",
                "code": "HIS-501",
                "description": "Gandhi’s mass movements, revolutionary activities, and Partition.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-history-s5-subj1-t1",
                    "title": "Indian National Movement (1885–1947) — Practice Test 1: Fundamental Concepts",
                    "subject": "Indian National Movement (1885–1947)",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Indian National Movement (1885–1947)."
                  },
                  {
                    "id": "ba-history-s5-subj1-t2",
                    "title": "Indian National Movement (1885–1947) — Practice Test 2: Exam Simulation",
                    "subject": "Indian National Movement (1885–1947)",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-history-s5-subj-2",
                "name": "Post-War Global Order & Cold War",
                "code": "HIS-502",
                "description": "Decolonization, NATO, Warsaw Pact, and non-aligned movement.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-history-s5-subj2-t1",
                    "title": "Post-War Global Order & Cold War — Practice Test 1: Fundamental Concepts",
                    "subject": "Post-War Global Order & Cold War",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Post-War Global Order & Cold War."
                  },
                  {
                    "id": "ba-history-s5-subj2-t2",
                    "title": "Post-War Global Order & Cold War — Practice Test 2: Exam Simulation",
                    "subject": "Post-War Global Order & Cold War",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-history-s5-subj-3",
                "name": "Historiography: Methods & Debates",
                "code": "HIS-503",
                "description": "Marxist, Subaltern, Cambridge, and Nationalist historical debates.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-history-s5-subj3-t1",
                    "title": "Historiography: Methods & Debates — Practice Test 1: Fundamental Concepts",
                    "subject": "Historiography: Methods & Debates",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Historiography: Methods & Debates."
                  },
                  {
                    "id": "ba-history-s5-subj3-t2",
                    "title": "Historiography: Methods & Debates — Practice Test 2: Exam Simulation",
                    "subject": "Historiography: Methods & Debates",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-6",
            "number": 6,
            "title": "Semester 6",
            "description": "BA (BA-HIST) — Semester 6 subjects, mock tests, and exam practice.",
            "availableTestsCount": 4,
            "subjects": [
              {
                "id": "ba-history-s6-subj-1",
                "name": "Post-Independence India (1947–2000)",
                "code": "HIS-601",
                "description": "Integration of states, planned economy, and foreign policy.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-history-s6-subj1-t1",
                    "title": "Post-Independence India (1947–2000) — Practice Test 1: Fundamental Concepts",
                    "subject": "Post-Independence India (1947–2000)",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Post-Independence India (1947–2000)."
                  },
                  {
                    "id": "ba-history-s6-subj1-t2",
                    "title": "Post-Independence India (1947–2000) — Practice Test 2: Exam Simulation",
                    "subject": "Post-Independence India (1947–2000)",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-history-s6-subj-2",
                "name": "Historical Research Dissertation & Viva",
                "code": "HIS-602",
                "description": "Archival research thesis and oral examination.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-history-s6-subj2-t1",
                    "title": "Historical Research Dissertation & Viva — Practice Test 1: Fundamental Concepts",
                    "subject": "Historical Research Dissertation & Viva",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Historical Research Dissertation & Viva."
                  },
                  {
                    "id": "ba-history-s6-subj2-t2",
                    "title": "Historical Research Dissertation & Viva — Practice Test 2: Exam Simulation",
                    "subject": "Historical Research Dissertation & Viva",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "pol-science",
        "name": "Political Science",
        "code": "BA-POL",
        "description": "Political theory, constitutional frameworks, comparative governance, and international diplomacy.",
        "totalSemesters": 6,
        "totalMockTests": 34,
        "semesters": [
          {
            "id": "semester-1",
            "number": 1,
            "title": "Semester 1",
            "description": "BA (BA-POL) — Semester 1 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "ba-pol-science-s1-subj-1",
                "name": "Foundations of Political Theory",
                "code": "POL-101",
                "description": "State, sovereignty, liberty, equality, justice, and power.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-pol-science-s1-subj1-t1",
                    "title": "Foundations of Political Theory — Practice Test 1: Fundamental Concepts",
                    "subject": "Foundations of Political Theory",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Foundations of Political Theory."
                  },
                  {
                    "id": "ba-pol-science-s1-subj1-t2",
                    "title": "Foundations of Political Theory — Practice Test 2: Exam Simulation",
                    "subject": "Foundations of Political Theory",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-pol-science-s1-subj-2",
                "name": "Indian Constitution: Institutions & Rights",
                "code": "POL-102",
                "description": "Preamble, Fundamental Rights, Parliament, and Judiciary.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-pol-science-s1-subj2-t1",
                    "title": "Indian Constitution: Institutions & Rights — Practice Test 1: Fundamental Concepts",
                    "subject": "Indian Constitution: Institutions & Rights",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Indian Constitution: Institutions & Rights."
                  },
                  {
                    "id": "ba-pol-science-s1-subj2-t2",
                    "title": "Indian Constitution: Institutions & Rights — Practice Test 2: Exam Simulation",
                    "subject": "Indian Constitution: Institutions & Rights",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-pol-science-s1-subj-3",
                "name": "Political Sociology",
                "code": "POL-103",
                "description": "Caste, class, gender, and religion in electoral politics.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-pol-science-s1-subj3-t1",
                    "title": "Political Sociology — Practice Test 1: Fundamental Concepts",
                    "subject": "Political Sociology",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Political Sociology."
                  },
                  {
                    "id": "ba-pol-science-s1-subj3-t2",
                    "title": "Political Sociology — Practice Test 2: Exam Simulation",
                    "subject": "Political Sociology",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-2",
            "number": 2,
            "title": "Semester 2",
            "description": "BA (BA-POL) — Semester 2 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "ba-pol-science-s2-subj-1",
                "name": "Western Political Thought: Classical to Modern",
                "code": "POL-201",
                "description": "Plato, Aristotle, Machiavelli, Hobbes, Locke, Rousseau, and Marx.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-pol-science-s2-subj1-t1",
                    "title": "Western Political Thought: Classical to Modern — Practice Test 1: Fundamental Concepts",
                    "subject": "Western Political Thought: Classical to Modern",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Western Political Thought: Classical to Modern."
                  },
                  {
                    "id": "ba-pol-science-s2-subj1-t2",
                    "title": "Western Political Thought: Classical to Modern — Practice Test 2: Exam Simulation",
                    "subject": "Western Political Thought: Classical to Modern",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-pol-science-s2-subj-2",
                "name": "Political Processes in India",
                "code": "POL-202",
                "description": "Party system, regionalism, secularism, and coalition politics.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-pol-science-s2-subj2-t1",
                    "title": "Political Processes in India — Practice Test 1: Fundamental Concepts",
                    "subject": "Political Processes in India",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Political Processes in India."
                  },
                  {
                    "id": "ba-pol-science-s2-subj2-t2",
                    "title": "Political Processes in India — Practice Test 2: Exam Simulation",
                    "subject": "Political Processes in India",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-pol-science-s2-subj-3",
                "name": "Comparative Government & Politics",
                "code": "POL-203",
                "description": "Comparative study of US, UK, Switzerland, and Chinese regimes.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-pol-science-s2-subj3-t1",
                    "title": "Comparative Government & Politics — Practice Test 1: Fundamental Concepts",
                    "subject": "Comparative Government & Politics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Comparative Government & Politics."
                  },
                  {
                    "id": "ba-pol-science-s2-subj3-t2",
                    "title": "Comparative Government & Politics — Practice Test 2: Exam Simulation",
                    "subject": "Comparative Government & Politics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-3",
            "number": 3,
            "title": "Semester 3",
            "description": "BA (BA-POL) — Semester 3 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "ba-pol-science-s3-subj-1",
                "name": "Indian Political Thought: Ancient to Modern",
                "code": "POL-301",
                "description": "Kautilya, Gandhi, Ambedkar, Nehru, and Tagore.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-pol-science-s3-subj1-t1",
                    "title": "Indian Political Thought: Ancient to Modern — Practice Test 1: Fundamental Concepts",
                    "subject": "Indian Political Thought: Ancient to Modern",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Indian Political Thought: Ancient to Modern."
                  },
                  {
                    "id": "ba-pol-science-s3-subj1-t2",
                    "title": "Indian Political Thought: Ancient to Modern — Practice Test 2: Exam Simulation",
                    "subject": "Indian Political Thought: Ancient to Modern",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-pol-science-s3-subj-2",
                "name": "Theories of International Relations",
                "code": "POL-302",
                "description": "Realism, Liberalism, Constructivism, and feminist IR theory.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-pol-science-s3-subj2-t1",
                    "title": "Theories of International Relations — Practice Test 1: Fundamental Concepts",
                    "subject": "Theories of International Relations",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Theories of International Relations."
                  },
                  {
                    "id": "ba-pol-science-s3-subj2-t2",
                    "title": "Theories of International Relations — Practice Test 2: Exam Simulation",
                    "subject": "Theories of International Relations",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-pol-science-s3-subj-3",
                "name": "Public Administration: Concepts & Theories",
                "code": "POL-303",
                "description": "Bureaucracy, Scientific Management, and New Public Management.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-pol-science-s3-subj3-t1",
                    "title": "Public Administration: Concepts & Theories — Practice Test 1: Fundamental Concepts",
                    "subject": "Public Administration: Concepts & Theories",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Public Administration: Concepts & Theories."
                  },
                  {
                    "id": "ba-pol-science-s3-subj3-t2",
                    "title": "Public Administration: Concepts & Theories — Practice Test 2: Exam Simulation",
                    "subject": "Public Administration: Concepts & Theories",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-4",
            "number": 4,
            "title": "Semester 4",
            "description": "BA (BA-POL) — Semester 4 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "ba-pol-science-s4-subj-1",
                "name": "Global Politics & Contemporary Issues",
                "code": "POL-401",
                "description": "Globalization, climate treaties, nuclear non-proliferation, and terrorism.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-pol-science-s4-subj1-t1",
                    "title": "Global Politics & Contemporary Issues — Practice Test 1: Fundamental Concepts",
                    "subject": "Global Politics & Contemporary Issues",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Global Politics & Contemporary Issues."
                  },
                  {
                    "id": "ba-pol-science-s4-subj1-t2",
                    "title": "Global Politics & Contemporary Issues — Practice Test 2: Exam Simulation",
                    "subject": "Global Politics & Contemporary Issues",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-pol-science-s4-subj-2",
                "name": "Public Policy Formulation & Analysis",
                "code": "POL-402",
                "description": "Policy cycle, implementation challenges, and evaluation methods.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-pol-science-s4-subj2-t1",
                    "title": "Public Policy Formulation & Analysis — Practice Test 1: Fundamental Concepts",
                    "subject": "Public Policy Formulation & Analysis",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Public Policy Formulation & Analysis."
                  },
                  {
                    "id": "ba-pol-science-s4-subj2-t2",
                    "title": "Public Policy Formulation & Analysis — Practice Test 2: Exam Simulation",
                    "subject": "Public Policy Formulation & Analysis",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-pol-science-s4-subj-3",
                "name": "Human Rights & International Law",
                "code": "POL-403",
                "description": "UN conventions, war crimes, refugee law, and humanitarian rights.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-pol-science-s4-subj3-t1",
                    "title": "Human Rights & International Law — Practice Test 1: Fundamental Concepts",
                    "subject": "Human Rights & International Law",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Human Rights & International Law."
                  },
                  {
                    "id": "ba-pol-science-s4-subj3-t2",
                    "title": "Human Rights & International Law — Practice Test 2: Exam Simulation",
                    "subject": "Human Rights & International Law",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-5",
            "number": 5,
            "title": "Semester 5",
            "description": "BA (BA-POL) — Semester 5 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "ba-pol-science-s5-subj-1",
                "name": "India’s Foreign Policy",
                "code": "POL-501",
                "description": "Strategic autonomy, neighborhood policy, and ties with major powers.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-pol-science-s5-subj1-t1",
                    "title": "India’s Foreign Policy — Practice Test 1: Fundamental Concepts",
                    "subject": "India’s Foreign Policy",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in India’s Foreign Policy."
                  },
                  {
                    "id": "ba-pol-science-s5-subj1-t2",
                    "title": "India’s Foreign Policy — Practice Test 2: Exam Simulation",
                    "subject": "India’s Foreign Policy",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-pol-science-s5-subj-2",
                "name": "Modern Ideologies: Socialism, Fascism, Ecology",
                "code": "POL-502",
                "description": "Political philosophies shaping 20th and 21st century governments.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-pol-science-s5-subj2-t1",
                    "title": "Modern Ideologies: Socialism, Fascism, Ecology — Practice Test 1: Fundamental Concepts",
                    "subject": "Modern Ideologies: Socialism, Fascism, Ecology",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Modern Ideologies: Socialism, Fascism, Ecology."
                  },
                  {
                    "id": "ba-pol-science-s5-subj2-t2",
                    "title": "Modern Ideologies: Socialism, Fascism, Ecology — Practice Test 2: Exam Simulation",
                    "subject": "Modern Ideologies: Socialism, Fascism, Ecology",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-pol-science-s5-subj-3",
                "name": "Research Methodology in Social Sciences",
                "code": "POL-503",
                "description": "Qualitative, quantitative, and comparative research designs.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-pol-science-s5-subj3-t1",
                    "title": "Research Methodology in Social Sciences — Practice Test 1: Fundamental Concepts",
                    "subject": "Research Methodology in Social Sciences",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Research Methodology in Social Sciences."
                  },
                  {
                    "id": "ba-pol-science-s5-subj3-t2",
                    "title": "Research Methodology in Social Sciences — Practice Test 2: Exam Simulation",
                    "subject": "Research Methodology in Social Sciences",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-6",
            "number": 6,
            "title": "Semester 6",
            "description": "BA (BA-POL) — Semester 6 subjects, mock tests, and exam practice.",
            "availableTestsCount": 4,
            "subjects": [
              {
                "id": "ba-pol-science-s6-subj-1",
                "name": "Democratic Governance & Decentralization",
                "code": "POL-601",
                "description": "Panchayati Raj, urban local bodies, and citizen charters.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-pol-science-s6-subj1-t1",
                    "title": "Democratic Governance & Decentralization — Practice Test 1: Fundamental Concepts",
                    "subject": "Democratic Governance & Decentralization",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Democratic Governance & Decentralization."
                  },
                  {
                    "id": "ba-pol-science-s6-subj1-t2",
                    "title": "Democratic Governance & Decentralization — Practice Test 2: Exam Simulation",
                    "subject": "Democratic Governance & Decentralization",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "ba-pol-science-s6-subj-2",
                "name": "Capstone Political Science Project",
                "code": "POL-602",
                "description": "Independent policy thesis and defense.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "ba-pol-science-s6-subj2-t1",
                    "title": "Capstone Political Science Project — Practice Test 1: Fundamental Concepts",
                    "subject": "Capstone Political Science Project",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Capstone Political Science Project."
                  },
                  {
                    "id": "ba-pol-science-s6-subj2-t2",
                    "title": "Capstone Political Science Project — Practice Test 2: Exam Simulation",
                    "subject": "Capstone Political Science Project",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "semesters": [
      {
        "id": "semester-1",
        "number": 1,
        "title": "Semester 1",
        "description": "BA (BA-ENG) — Semester 1 subjects, mock tests, and exam practice.",
        "availableTestsCount": 8,
        "subjects": [
          {
            "id": "ba-english-s1-subj-1",
            "name": "Introduction to English Literature",
            "code": "ENG-101",
            "description": "Forms of poetry, drama, fiction, and narrative prose.",
            "testsCount": 2,
            "tests": [
              {
                "id": "ba-english-s1-subj1-t1",
                "title": "Introduction to English Literature — Practice Test 1: Fundamental Concepts",
                "subject": "Introduction to English Literature",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Introduction to English Literature."
              },
              {
                "id": "ba-english-s1-subj1-t2",
                "title": "Introduction to English Literature — Practice Test 2: Exam Simulation",
                "subject": "Introduction to English Literature",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "ba-english-s1-subj-2",
            "name": "World Literature & Classical Myths",
            "code": "ENG-102",
            "description": "Greco-Roman epics, Homer, and comparative mythology.",
            "testsCount": 2,
            "tests": [
              {
                "id": "ba-english-s1-subj2-t1",
                "title": "World Literature & Classical Myths — Practice Test 1: Fundamental Concepts",
                "subject": "World Literature & Classical Myths",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in World Literature & Classical Myths."
              },
              {
                "id": "ba-english-s1-subj2-t2",
                "title": "World Literature & Classical Myths — Practice Test 2: Exam Simulation",
                "subject": "World Literature & Classical Myths",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "ba-english-s1-subj-3",
            "name": "Academic Writing & Composition",
            "code": "ENG-103",
            "description": "Critical analysis, essay writing, rhetoric, and citations.",
            "testsCount": 2,
            "tests": [
              {
                "id": "ba-english-s1-subj3-t1",
                "title": "Academic Writing & Composition — Practice Test 1: Fundamental Concepts",
                "subject": "Academic Writing & Composition",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Academic Writing & Composition."
              },
              {
                "id": "ba-english-s1-subj3-t2",
                "title": "Academic Writing & Composition — Practice Test 2: Exam Simulation",
                "subject": "Academic Writing & Composition",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "ba-english-s1-subj-4",
            "name": "Environmental Studies",
            "code": "BA-104",
            "description": "Environmental conservation and humanities perspectives.",
            "testsCount": 2,
            "tests": [
              {
                "id": "ba-english-s1-subj4-t1",
                "title": "Environmental Studies — Practice Test 1: Fundamental Concepts",
                "subject": "Environmental Studies",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Environmental Studies."
              },
              {
                "id": "ba-english-s1-subj4-t2",
                "title": "Environmental Studies — Practice Test 2: Exam Simulation",
                "subject": "Environmental Studies",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      },
      {
        "id": "semester-2",
        "number": 2,
        "title": "Semester 2",
        "description": "BA (BA-ENG) — Semester 2 subjects, mock tests, and exam practice.",
        "availableTestsCount": 6,
        "subjects": [
          {
            "id": "ba-english-s2-subj-1",
            "name": "British Poetry & Drama (16th–18th C)",
            "code": "ENG-201",
            "description": "Shakespeare, Marlowe, Milton, Pope, and Elizabethan theatre.",
            "testsCount": 2,
            "tests": [
              {
                "id": "ba-english-s2-subj1-t1",
                "title": "British Poetry & Drama (16th–18th C) — Practice Test 1: Fundamental Concepts",
                "subject": "British Poetry & Drama (16th–18th C)",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in British Poetry & Drama (16th–18th C)."
              },
              {
                "id": "ba-english-s2-subj1-t2",
                "title": "British Poetry & Drama (16th–18th C) — Practice Test 2: Exam Simulation",
                "subject": "British Poetry & Drama (16th–18th C)",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "ba-english-s2-subj-2",
            "name": "History of the English Language",
            "code": "ENG-202",
            "description": "Old English, Middle English, Great Vowel Shift, and global Englishes.",
            "testsCount": 2,
            "tests": [
              {
                "id": "ba-english-s2-subj2-t1",
                "title": "History of the English Language — Practice Test 1: Fundamental Concepts",
                "subject": "History of the English Language",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in History of the English Language."
              },
              {
                "id": "ba-english-s2-subj2-t2",
                "title": "History of the English Language — Practice Test 2: Exam Simulation",
                "subject": "History of the English Language",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "ba-english-s2-subj-3",
            "name": "Indian Writing in English",
            "code": "ENG-203",
            "description": "Tagore, R.K. Narayan, Salman Rushdie, and post-independence voices.",
            "testsCount": 2,
            "tests": [
              {
                "id": "ba-english-s2-subj3-t1",
                "title": "Indian Writing in English — Practice Test 1: Fundamental Concepts",
                "subject": "Indian Writing in English",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Indian Writing in English."
              },
              {
                "id": "ba-english-s2-subj3-t2",
                "title": "Indian Writing in English — Practice Test 2: Exam Simulation",
                "subject": "Indian Writing in English",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      },
      {
        "id": "semester-3",
        "number": 3,
        "title": "Semester 3",
        "description": "BA (BA-ENG) — Semester 3 subjects, mock tests, and exam practice.",
        "availableTestsCount": 6,
        "subjects": [
          {
            "id": "ba-english-s3-subj-1",
            "name": "19th-Century European Literature",
            "code": "ENG-301",
            "description": "Romantic and Victorian poets: Wordsworth, Keats, Tennyson, and Dickens.",
            "testsCount": 2,
            "tests": [
              {
                "id": "ba-english-s3-subj1-t1",
                "title": "19th-Century European Literature — Practice Test 1: Fundamental Concepts",
                "subject": "19th-Century European Literature",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in 19th-Century European Literature."
              },
              {
                "id": "ba-english-s3-subj1-t2",
                "title": "19th-Century European Literature — Practice Test 2: Exam Simulation",
                "subject": "19th-Century European Literature",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "ba-english-s3-subj-2",
            "name": "Phonetics & English Linguistics",
            "code": "ENG-302",
            "description": "IPA transcription, syntax trees, morphology, and semantics.",
            "testsCount": 2,
            "tests": [
              {
                "id": "ba-english-s3-subj2-t1",
                "title": "Phonetics & English Linguistics — Practice Test 1: Fundamental Concepts",
                "subject": "Phonetics & English Linguistics",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Phonetics & English Linguistics."
              },
              {
                "id": "ba-english-s3-subj2-t2",
                "title": "Phonetics & English Linguistics — Practice Test 2: Exam Simulation",
                "subject": "Phonetics & English Linguistics",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "ba-english-s3-subj-3",
            "name": "Women’s Writings & Gender Studies",
            "code": "ENG-303",
            "description": "Feminist literary criticism, Virginia Woolf, and gender discourses.",
            "testsCount": 2,
            "tests": [
              {
                "id": "ba-english-s3-subj3-t1",
                "title": "Women’s Writings & Gender Studies — Practice Test 1: Fundamental Concepts",
                "subject": "Women’s Writings & Gender Studies",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Women’s Writings & Gender Studies."
              },
              {
                "id": "ba-english-s3-subj3-t2",
                "title": "Women’s Writings & Gender Studies — Practice Test 2: Exam Simulation",
                "subject": "Women’s Writings & Gender Studies",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      },
      {
        "id": "semester-4",
        "number": 4,
        "title": "Semester 4",
        "description": "BA (BA-ENG) — Semester 4 subjects, mock tests, and exam practice.",
        "availableTestsCount": 6,
        "subjects": [
          {
            "id": "ba-english-s4-subj-1",
            "name": "Modern British & American Literature",
            "code": "ENG-401",
            "description": "T.S. Eliot, W.B. Yeats, Hemingway, Fitzgerald, and Modernism.",
            "testsCount": 2,
            "tests": [
              {
                "id": "ba-english-s4-subj1-t1",
                "title": "Modern British & American Literature — Practice Test 1: Fundamental Concepts",
                "subject": "Modern British & American Literature",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Modern British & American Literature."
              },
              {
                "id": "ba-english-s4-subj1-t2",
                "title": "Modern British & American Literature — Practice Test 2: Exam Simulation",
                "subject": "Modern British & American Literature",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "ba-english-s4-subj-2",
            "name": "Post-Colonial Literature",
            "code": "ENG-402",
            "description": "Achebe, Edward Said’s Orientalism, and subaltern narratives.",
            "testsCount": 2,
            "tests": [
              {
                "id": "ba-english-s4-subj2-t1",
                "title": "Post-Colonial Literature — Practice Test 1: Fundamental Concepts",
                "subject": "Post-Colonial Literature",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Post-Colonial Literature."
              },
              {
                "id": "ba-english-s4-subj2-t2",
                "title": "Post-Colonial Literature — Practice Test 2: Exam Simulation",
                "subject": "Post-Colonial Literature",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "ba-english-s4-subj-3",
            "name": "Literary Theory & Criticism",
            "code": "ENG-403",
            "description": "Formalism, Structuralism, Deconstruction, and Psychoanalytic theory.",
            "testsCount": 2,
            "tests": [
              {
                "id": "ba-english-s4-subj3-t1",
                "title": "Literary Theory & Criticism — Practice Test 1: Fundamental Concepts",
                "subject": "Literary Theory & Criticism",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Literary Theory & Criticism."
              },
              {
                "id": "ba-english-s4-subj3-t2",
                "title": "Literary Theory & Criticism — Practice Test 2: Exam Simulation",
                "subject": "Literary Theory & Criticism",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      },
      {
        "id": "semester-5",
        "number": 5,
        "title": "Semester 5",
        "description": "BA (BA-ENG) — Semester 5 subjects, mock tests, and exam practice.",
        "availableTestsCount": 6,
        "subjects": [
          {
            "id": "ba-english-s5-subj-1",
            "name": "Contemporary World Drama & Theatre",
            "code": "ENG-501",
            "description": "Absurdist drama, Beckett, Brecht’s epic theatre, and performance.",
            "testsCount": 2,
            "tests": [
              {
                "id": "ba-english-s5-subj1-t1",
                "title": "Contemporary World Drama & Theatre — Practice Test 1: Fundamental Concepts",
                "subject": "Contemporary World Drama & Theatre",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Contemporary World Drama & Theatre."
              },
              {
                "id": "ba-english-s5-subj1-t2",
                "title": "Contemporary World Drama & Theatre — Practice Test 2: Exam Simulation",
                "subject": "Contemporary World Drama & Theatre",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "ba-english-s5-subj-2",
            "name": "Translation Studies & Praxis",
            "code": "ENG-502",
            "description": "Theories of translation, cultural transposition, and text practice.",
            "testsCount": 2,
            "tests": [
              {
                "id": "ba-english-s5-subj2-t1",
                "title": "Translation Studies & Praxis — Practice Test 1: Fundamental Concepts",
                "subject": "Translation Studies & Praxis",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Translation Studies & Praxis."
              },
              {
                "id": "ba-english-s5-subj2-t2",
                "title": "Translation Studies & Praxis — Practice Test 2: Exam Simulation",
                "subject": "Translation Studies & Praxis",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "ba-english-s5-subj-3",
            "name": "Film & Cultural Studies",
            "code": "ENG-503",
            "description": "Cinematic adaptation, semiotics, popular culture, and ideology.",
            "testsCount": 2,
            "tests": [
              {
                "id": "ba-english-s5-subj3-t1",
                "title": "Film & Cultural Studies — Practice Test 1: Fundamental Concepts",
                "subject": "Film & Cultural Studies",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Film & Cultural Studies."
              },
              {
                "id": "ba-english-s5-subj3-t2",
                "title": "Film & Cultural Studies — Practice Test 2: Exam Simulation",
                "subject": "Film & Cultural Studies",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      },
      {
        "id": "semester-6",
        "number": 6,
        "title": "Semester 6",
        "description": "BA (BA-ENG) — Semester 6 subjects, mock tests, and exam practice.",
        "availableTestsCount": 4,
        "subjects": [
          {
            "id": "ba-english-s6-subj-1",
            "name": "21st-Century Fiction & Digital Humanities",
            "code": "ENG-601",
            "description": "Contemporary fiction, graphic novels, and computational literary study.",
            "testsCount": 2,
            "tests": [
              {
                "id": "ba-english-s6-subj1-t1",
                "title": "21st-Century Fiction & Digital Humanities — Practice Test 1: Fundamental Concepts",
                "subject": "21st-Century Fiction & Digital Humanities",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in 21st-Century Fiction & Digital Humanities."
              },
              {
                "id": "ba-english-s6-subj1-t2",
                "title": "21st-Century Fiction & Digital Humanities — Practice Test 2: Exam Simulation",
                "subject": "21st-Century Fiction & Digital Humanities",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "ba-english-s6-subj-2",
            "name": "Research Project & Literary Dissertation",
            "code": "ENG-602",
            "description": "Supervised academic dissertation and oral defense.",
            "testsCount": 2,
            "tests": [
              {
                "id": "ba-english-s6-subj2-t1",
                "title": "Research Project & Literary Dissertation — Practice Test 1: Fundamental Concepts",
                "subject": "Research Project & Literary Dissertation",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Research Project & Literary Dissertation."
              },
              {
                "id": "ba-english-s6-subj2-t2",
                "title": "Research Project & Literary Dissertation — Practice Test 2: Exam Simulation",
                "subject": "Research Project & Literary Dissertation",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bsc",
    "name": "BSc",
    "title": "Bachelor of Science",
    "description": "Physics, chemistry, biology, and mathematics across six semesters of science study.",
    "iconName": "FlaskConical",
    "totalSemesters": 6,
    "totalMockTests": 70,
    "branches": [
      {
        "id": "pcm",
        "name": "Physics, Chemistry & Mathematics (PCM)",
        "code": "BSc-PCM",
        "description": "Rigorous theoretical and experimental study across pure physics, chemistry, and mathematics.",
        "totalSemesters": 6,
        "totalMockTests": 36,
        "semesters": [
          {
            "id": "semester-1",
            "number": 1,
            "title": "Semester 1",
            "description": "BSc (BSc-PCM) — Semester 1 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "bsc-pcm-s1-subj-1",
                "name": "Classical Mechanics & Properties of Matter",
                "code": "PHY-101",
                "description": "Newtonian mechanics, rotational dynamics, gravitation, and elasticity.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-pcm-s1-subj1-t1",
                    "title": "Classical Mechanics & Properties of Matter — Practice Test 1: Fundamental Concepts",
                    "subject": "Classical Mechanics & Properties of Matter",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Classical Mechanics & Properties of Matter."
                  },
                  {
                    "id": "bsc-pcm-s1-subj1-t2",
                    "title": "Classical Mechanics & Properties of Matter — Practice Test 2: Exam Simulation",
                    "subject": "Classical Mechanics & Properties of Matter",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bsc-pcm-s1-subj-2",
                "name": "Inorganic Chemistry I: Bonding & Periodicity",
                "code": "CHE-101",
                "description": "Atomic structure, periodic trends, VSEPR, and chemical bonding.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-pcm-s1-subj2-t1",
                    "title": "Inorganic Chemistry I: Bonding & Periodicity — Practice Test 1: Fundamental Concepts",
                    "subject": "Inorganic Chemistry I: Bonding & Periodicity",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Inorganic Chemistry I: Bonding & Periodicity."
                  },
                  {
                    "id": "bsc-pcm-s1-subj2-t2",
                    "title": "Inorganic Chemistry I: Bonding & Periodicity — Practice Test 2: Exam Simulation",
                    "subject": "Inorganic Chemistry I: Bonding & Periodicity",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bsc-pcm-s1-subj-3",
                "name": "Differential Calculus & Analytical Geometry",
                "code": "MAT-101",
                "description": "Limits, curvature, partial derivatives, and coordinate geometry.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-pcm-s1-subj3-t1",
                    "title": "Differential Calculus & Analytical Geometry — Practice Test 1: Fundamental Concepts",
                    "subject": "Differential Calculus & Analytical Geometry",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Differential Calculus & Analytical Geometry."
                  },
                  {
                    "id": "bsc-pcm-s1-subj3-t2",
                    "title": "Differential Calculus & Analytical Geometry — Practice Test 2: Exam Simulation",
                    "subject": "Differential Calculus & Analytical Geometry",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-2",
            "number": 2,
            "title": "Semester 2",
            "description": "BSc (BSc-PCM) — Semester 2 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "bsc-pcm-s2-subj-1",
                "name": "Electricity, Magnetism & EM Theory",
                "code": "PHY-201",
                "description": "Gauss’s law, Biot-Savart law, Faraday’s induction, and Maxwell’s equations.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-pcm-s2-subj1-t1",
                    "title": "Electricity, Magnetism & EM Theory — Practice Test 1: Fundamental Concepts",
                    "subject": "Electricity, Magnetism & EM Theory",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Electricity, Magnetism & EM Theory."
                  },
                  {
                    "id": "bsc-pcm-s2-subj1-t2",
                    "title": "Electricity, Magnetism & EM Theory — Practice Test 2: Exam Simulation",
                    "subject": "Electricity, Magnetism & EM Theory",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bsc-pcm-s2-subj-2",
                "name": "Organic Chemistry I: Functional Groups",
                "code": "CHE-201",
                "description": "Hydrocarbons, stereochemistry, SN1/SN2, and elimination reactions.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-pcm-s2-subj2-t1",
                    "title": "Organic Chemistry I: Functional Groups — Practice Test 1: Fundamental Concepts",
                    "subject": "Organic Chemistry I: Functional Groups",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Organic Chemistry I: Functional Groups."
                  },
                  {
                    "id": "bsc-pcm-s2-subj2-t2",
                    "title": "Organic Chemistry I: Functional Groups — Practice Test 2: Exam Simulation",
                    "subject": "Organic Chemistry I: Functional Groups",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bsc-pcm-s2-subj-3",
                "name": "Integral Calculus & Vector Analysis",
                "code": "MAT-201",
                "description": "Definite integrals, Green’s theorem, Stokes’ theorem, and divergence.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-pcm-s2-subj3-t1",
                    "title": "Integral Calculus & Vector Analysis — Practice Test 1: Fundamental Concepts",
                    "subject": "Integral Calculus & Vector Analysis",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Integral Calculus & Vector Analysis."
                  },
                  {
                    "id": "bsc-pcm-s2-subj3-t2",
                    "title": "Integral Calculus & Vector Analysis — Practice Test 2: Exam Simulation",
                    "subject": "Integral Calculus & Vector Analysis",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-3",
            "number": 3,
            "title": "Semester 3",
            "description": "BSc (BSc-PCM) — Semester 3 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "bsc-pcm-s3-subj-1",
                "name": "Wave Optics & Thermodynamics",
                "code": "PHY-301",
                "description": "Interference, diffraction, polarization, entropy, and heat engines.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-pcm-s3-subj1-t1",
                    "title": "Wave Optics & Thermodynamics — Practice Test 1: Fundamental Concepts",
                    "subject": "Wave Optics & Thermodynamics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Wave Optics & Thermodynamics."
                  },
                  {
                    "id": "bsc-pcm-s3-subj1-t2",
                    "title": "Wave Optics & Thermodynamics — Practice Test 2: Exam Simulation",
                    "subject": "Wave Optics & Thermodynamics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bsc-pcm-s3-subj-2",
                "name": "Physical Chemistry I: Thermodynamics & Kinetics",
                "code": "CHE-301",
                "description": "First and second laws, chemical equilibrium, and reaction rates.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-pcm-s3-subj2-t1",
                    "title": "Physical Chemistry I: Thermodynamics & Kinetics — Practice Test 1: Fundamental Concepts",
                    "subject": "Physical Chemistry I: Thermodynamics & Kinetics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Physical Chemistry I: Thermodynamics & Kinetics."
                  },
                  {
                    "id": "bsc-pcm-s3-subj2-t2",
                    "title": "Physical Chemistry I: Thermodynamics & Kinetics — Practice Test 2: Exam Simulation",
                    "subject": "Physical Chemistry I: Thermodynamics & Kinetics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bsc-pcm-s3-subj-3",
                "name": "Ordinary & Partial Differential Equations",
                "code": "MAT-301",
                "description": "First and higher order linear ODEs, and separation of variables.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-pcm-s3-subj3-t1",
                    "title": "Ordinary & Partial Differential Equations — Practice Test 1: Fundamental Concepts",
                    "subject": "Ordinary & Partial Differential Equations",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Ordinary & Partial Differential Equations."
                  },
                  {
                    "id": "bsc-pcm-s3-subj3-t2",
                    "title": "Ordinary & Partial Differential Equations — Practice Test 2: Exam Simulation",
                    "subject": "Ordinary & Partial Differential Equations",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-4",
            "number": 4,
            "title": "Semester 4",
            "description": "BSc (BSc-PCM) — Semester 4 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "bsc-pcm-s4-subj-1",
                "name": "Quantum Mechanics & Special Relativity",
                "code": "PHY-401",
                "description": "Wave-particle duality, Schrödinger equation, and Lorentz transforms.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-pcm-s4-subj1-t1",
                    "title": "Quantum Mechanics & Special Relativity — Practice Test 1: Fundamental Concepts",
                    "subject": "Quantum Mechanics & Special Relativity",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Quantum Mechanics & Special Relativity."
                  },
                  {
                    "id": "bsc-pcm-s4-subj1-t2",
                    "title": "Quantum Mechanics & Special Relativity — Practice Test 2: Exam Simulation",
                    "subject": "Quantum Mechanics & Special Relativity",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bsc-pcm-s4-subj-2",
                "name": "Inorganic Chemistry II: Coordination Compounds",
                "code": "CHE-401",
                "description": "Crystal field theory, transition metals, and organometallics.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-pcm-s4-subj2-t1",
                    "title": "Inorganic Chemistry II: Coordination Compounds — Practice Test 1: Fundamental Concepts",
                    "subject": "Inorganic Chemistry II: Coordination Compounds",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Inorganic Chemistry II: Coordination Compounds."
                  },
                  {
                    "id": "bsc-pcm-s4-subj2-t2",
                    "title": "Inorganic Chemistry II: Coordination Compounds — Practice Test 2: Exam Simulation",
                    "subject": "Inorganic Chemistry II: Coordination Compounds",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bsc-pcm-s4-subj-3",
                "name": "Linear Algebra & Matrix Theory",
                "code": "MAT-401",
                "description": "Vector spaces, eigenvalues, eigenvectors, and diagonalizability.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-pcm-s4-subj3-t1",
                    "title": "Linear Algebra & Matrix Theory — Practice Test 1: Fundamental Concepts",
                    "subject": "Linear Algebra & Matrix Theory",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Linear Algebra & Matrix Theory."
                  },
                  {
                    "id": "bsc-pcm-s4-subj3-t2",
                    "title": "Linear Algebra & Matrix Theory — Practice Test 2: Exam Simulation",
                    "subject": "Linear Algebra & Matrix Theory",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-5",
            "number": 5,
            "title": "Semester 5",
            "description": "BSc (BSc-PCM) — Semester 5 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "bsc-pcm-s5-subj-1",
                "name": "Solid State & Nuclear Physics",
                "code": "PHY-501",
                "description": "Crystal lattices, X-ray diffraction, radioactivity, and nuclear models.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-pcm-s5-subj1-t1",
                    "title": "Solid State & Nuclear Physics — Practice Test 1: Fundamental Concepts",
                    "subject": "Solid State & Nuclear Physics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Solid State & Nuclear Physics."
                  },
                  {
                    "id": "bsc-pcm-s5-subj1-t2",
                    "title": "Solid State & Nuclear Physics — Practice Test 2: Exam Simulation",
                    "subject": "Solid State & Nuclear Physics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bsc-pcm-s5-subj-2",
                "name": "Organic Chemistry II: Synthesis & Spectroscopy",
                "code": "CHE-501",
                "description": "NMR, IR, UV-Vis spectroscopy, and synthetic organic reagents.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-pcm-s5-subj2-t1",
                    "title": "Organic Chemistry II: Synthesis & Spectroscopy — Practice Test 1: Fundamental Concepts",
                    "subject": "Organic Chemistry II: Synthesis & Spectroscopy",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Organic Chemistry II: Synthesis & Spectroscopy."
                  },
                  {
                    "id": "bsc-pcm-s5-subj2-t2",
                    "title": "Organic Chemistry II: Synthesis & Spectroscopy — Practice Test 2: Exam Simulation",
                    "subject": "Organic Chemistry II: Synthesis & Spectroscopy",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bsc-pcm-s5-subj-3",
                "name": "Real Analysis & Metric Spaces",
                "code": "MAT-501",
                "description": "Sequences, series convergence, metric topology, and compactness.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-pcm-s5-subj3-t1",
                    "title": "Real Analysis & Metric Spaces — Practice Test 1: Fundamental Concepts",
                    "subject": "Real Analysis & Metric Spaces",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Real Analysis & Metric Spaces."
                  },
                  {
                    "id": "bsc-pcm-s5-subj3-t2",
                    "title": "Real Analysis & Metric Spaces — Practice Test 2: Exam Simulation",
                    "subject": "Real Analysis & Metric Spaces",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-6",
            "number": 6,
            "title": "Semester 6",
            "description": "BSc (BSc-PCM) — Semester 6 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "bsc-pcm-s6-subj-1",
                "name": "Atomic, Molecular & Laser Physics",
                "code": "PHY-601",
                "description": "Bohr-Sommerfeld model, Zeeman effect, and laser action.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-pcm-s6-subj1-t1",
                    "title": "Atomic, Molecular & Laser Physics — Practice Test 1: Fundamental Concepts",
                    "subject": "Atomic, Molecular & Laser Physics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Atomic, Molecular & Laser Physics."
                  },
                  {
                    "id": "bsc-pcm-s6-subj1-t2",
                    "title": "Atomic, Molecular & Laser Physics — Practice Test 2: Exam Simulation",
                    "subject": "Atomic, Molecular & Laser Physics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bsc-pcm-s6-subj-2",
                "name": "Physical Chemistry II: Electrochemistry & Quantum",
                "code": "CHE-601",
                "description": "Nernst equation, conductance, quantum chemistry, and photochemistry.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-pcm-s6-subj2-t1",
                    "title": "Physical Chemistry II: Electrochemistry & Quantum — Practice Test 1: Fundamental Concepts",
                    "subject": "Physical Chemistry II: Electrochemistry & Quantum",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Physical Chemistry II: Electrochemistry & Quantum."
                  },
                  {
                    "id": "bsc-pcm-s6-subj2-t2",
                    "title": "Physical Chemistry II: Electrochemistry & Quantum — Practice Test 2: Exam Simulation",
                    "subject": "Physical Chemistry II: Electrochemistry & Quantum",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bsc-pcm-s6-subj-3",
                "name": "Abstract Algebra & Complex Analysis",
                "code": "MAT-601",
                "description": "Groups, rings, fields, Cauchy integral formula, and residues.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-pcm-s6-subj3-t1",
                    "title": "Abstract Algebra & Complex Analysis — Practice Test 1: Fundamental Concepts",
                    "subject": "Abstract Algebra & Complex Analysis",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Abstract Algebra & Complex Analysis."
                  },
                  {
                    "id": "bsc-pcm-s6-subj3-t2",
                    "title": "Abstract Algebra & Complex Analysis — Practice Test 2: Exam Simulation",
                    "subject": "Abstract Algebra & Complex Analysis",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "cs",
        "name": "Computer Science",
        "code": "BSc-CS",
        "description": "Algorithmic theory, systems programming, computation, and software engineering.",
        "totalSemesters": 6,
        "totalMockTests": 34,
        "semesters": [
          {
            "id": "semester-1",
            "number": 1,
            "title": "Semester 1",
            "description": "BSc (BSc-CS) — Semester 1 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "bsc-cs-s1-subj-1",
                "name": "Programming Fundamentals using C/C++",
                "code": "BSCS-101",
                "description": "Procedural logic, pointers, memory, and OOP principles.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-cs-s1-subj1-t1",
                    "title": "Programming Fundamentals using C/C++ — Practice Test 1: Fundamental Concepts",
                    "subject": "Programming Fundamentals using C/C++",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Programming Fundamentals using C/C++."
                  },
                  {
                    "id": "bsc-cs-s1-subj1-t2",
                    "title": "Programming Fundamentals using C/C++ — Practice Test 2: Exam Simulation",
                    "subject": "Programming Fundamentals using C/C++",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bsc-cs-s1-subj-2",
                "name": "Computer System Architecture",
                "code": "BSCS-102",
                "description": "Logic gates, ALU, control unit, and memory organization.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-cs-s1-subj2-t1",
                    "title": "Computer System Architecture — Practice Test 1: Fundamental Concepts",
                    "subject": "Computer System Architecture",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Computer System Architecture."
                  },
                  {
                    "id": "bsc-cs-s1-subj2-t2",
                    "title": "Computer System Architecture — Practice Test 2: Exam Simulation",
                    "subject": "Computer System Architecture",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bsc-cs-s1-subj-3",
                "name": "Calculus and Discrete Mathematics",
                "code": "BSCS-103",
                "description": "Calculus, mathematical logic, graphs, and combinatorics.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-cs-s1-subj3-t1",
                    "title": "Calculus and Discrete Mathematics — Practice Test 1: Fundamental Concepts",
                    "subject": "Calculus and Discrete Mathematics",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Calculus and Discrete Mathematics."
                  },
                  {
                    "id": "bsc-cs-s1-subj3-t2",
                    "title": "Calculus and Discrete Mathematics — Practice Test 2: Exam Simulation",
                    "subject": "Calculus and Discrete Mathematics",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-2",
            "number": 2,
            "title": "Semester 2",
            "description": "BSc (BSc-CS) — Semester 2 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "bsc-cs-s2-subj-1",
                "name": "Data Structures and Algorithms",
                "code": "BSCS-201",
                "description": "Linear and non-linear data structures, trees, and graphs.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-cs-s2-subj1-t1",
                    "title": "Data Structures and Algorithms — Practice Test 1: Fundamental Concepts",
                    "subject": "Data Structures and Algorithms",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Data Structures and Algorithms."
                  },
                  {
                    "id": "bsc-cs-s2-subj1-t2",
                    "title": "Data Structures and Algorithms — Practice Test 2: Exam Simulation",
                    "subject": "Data Structures and Algorithms",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bsc-cs-s2-subj-2",
                "name": "Database Management Systems",
                "code": "BSCS-202",
                "description": "ER models, relational schema, SQL, and indexing.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-cs-s2-subj2-t1",
                    "title": "Database Management Systems — Practice Test 1: Fundamental Concepts",
                    "subject": "Database Management Systems",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Database Management Systems."
                  },
                  {
                    "id": "bsc-cs-s2-subj2-t2",
                    "title": "Database Management Systems — Practice Test 2: Exam Simulation",
                    "subject": "Database Management Systems",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bsc-cs-s2-subj-3",
                "name": "Probability and Statistics for Computing",
                "code": "BSCS-203",
                "description": "Random variables, distributions, and statistical inference.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-cs-s2-subj3-t1",
                    "title": "Probability and Statistics for Computing — Practice Test 1: Fundamental Concepts",
                    "subject": "Probability and Statistics for Computing",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Probability and Statistics for Computing."
                  },
                  {
                    "id": "bsc-cs-s2-subj3-t2",
                    "title": "Probability and Statistics for Computing — Practice Test 2: Exam Simulation",
                    "subject": "Probability and Statistics for Computing",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-3",
            "number": 3,
            "title": "Semester 3",
            "description": "BSc (BSc-CS) — Semester 3 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "bsc-cs-s3-subj-1",
                "name": "Operating Systems",
                "code": "BSCS-301",
                "description": "Process management, synchronization, paging, and deadlocks.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-cs-s3-subj1-t1",
                    "title": "Operating Systems — Practice Test 1: Fundamental Concepts",
                    "subject": "Operating Systems",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Operating Systems."
                  },
                  {
                    "id": "bsc-cs-s3-subj1-t2",
                    "title": "Operating Systems — Practice Test 2: Exam Simulation",
                    "subject": "Operating Systems",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bsc-cs-s3-subj-2",
                "name": "Object-Oriented Programming with Java",
                "code": "BSCS-302",
                "description": "Java syntax, threads, I/O streams, and collections.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-cs-s3-subj2-t1",
                    "title": "Object-Oriented Programming with Java — Practice Test 1: Fundamental Concepts",
                    "subject": "Object-Oriented Programming with Java",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Object-Oriented Programming with Java."
                  },
                  {
                    "id": "bsc-cs-s3-subj2-t2",
                    "title": "Object-Oriented Programming with Java — Practice Test 2: Exam Simulation",
                    "subject": "Object-Oriented Programming with Java",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bsc-cs-s3-subj-3",
                "name": "Design and Analysis of Algorithms",
                "code": "BSCS-303",
                "description": "Divide and conquer, greedy methods, dynamic programming, and NP.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-cs-s3-subj3-t1",
                    "title": "Design and Analysis of Algorithms — Practice Test 1: Fundamental Concepts",
                    "subject": "Design and Analysis of Algorithms",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Design and Analysis of Algorithms."
                  },
                  {
                    "id": "bsc-cs-s3-subj3-t2",
                    "title": "Design and Analysis of Algorithms — Practice Test 2: Exam Simulation",
                    "subject": "Design and Analysis of Algorithms",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-4",
            "number": 4,
            "title": "Semester 4",
            "description": "BSc (BSc-CS) — Semester 4 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "bsc-cs-s4-subj-1",
                "name": "Computer Networks",
                "code": "BSCS-401",
                "description": "OSI layers, routing, TCP/UDP, DNS, and HTTP protocols.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-cs-s4-subj1-t1",
                    "title": "Computer Networks — Practice Test 1: Fundamental Concepts",
                    "subject": "Computer Networks",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Computer Networks."
                  },
                  {
                    "id": "bsc-cs-s4-subj1-t2",
                    "title": "Computer Networks — Practice Test 2: Exam Simulation",
                    "subject": "Computer Networks",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bsc-cs-s4-subj-2",
                "name": "Software Engineering",
                "code": "BSCS-402",
                "description": "System requirements, design patterns, testing, and Git.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-cs-s4-subj2-t1",
                    "title": "Software Engineering — Practice Test 1: Fundamental Concepts",
                    "subject": "Software Engineering",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Software Engineering."
                  },
                  {
                    "id": "bsc-cs-s4-subj2-t2",
                    "title": "Software Engineering — Practice Test 2: Exam Simulation",
                    "subject": "Software Engineering",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bsc-cs-s4-subj-3",
                "name": "Theory of Computation",
                "code": "BSCS-403",
                "description": "Automata theory, formal grammars, and Turing computability.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-cs-s4-subj3-t1",
                    "title": "Theory of Computation — Practice Test 1: Fundamental Concepts",
                    "subject": "Theory of Computation",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Theory of Computation."
                  },
                  {
                    "id": "bsc-cs-s4-subj3-t2",
                    "title": "Theory of Computation — Practice Test 2: Exam Simulation",
                    "subject": "Theory of Computation",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-5",
            "number": 5,
            "title": "Semester 5",
            "description": "BSc (BSc-CS) — Semester 5 subjects, mock tests, and exam practice.",
            "availableTestsCount": 6,
            "subjects": [
              {
                "id": "bsc-cs-s5-subj-1",
                "name": "Artificial Intelligence & Machine Learning",
                "code": "BSCS-501",
                "description": "Search algorithms, regression, classification, and neural nets.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-cs-s5-subj1-t1",
                    "title": "Artificial Intelligence & Machine Learning — Practice Test 1: Fundamental Concepts",
                    "subject": "Artificial Intelligence & Machine Learning",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Artificial Intelligence & Machine Learning."
                  },
                  {
                    "id": "bsc-cs-s5-subj1-t2",
                    "title": "Artificial Intelligence & Machine Learning — Practice Test 2: Exam Simulation",
                    "subject": "Artificial Intelligence & Machine Learning",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bsc-cs-s5-subj-2",
                "name": "Web and Internet Technologies",
                "code": "BSCS-502",
                "description": "HTML, CSS, JavaScript, REST APIs, and modern frameworks.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-cs-s5-subj2-t1",
                    "title": "Web and Internet Technologies — Practice Test 1: Fundamental Concepts",
                    "subject": "Web and Internet Technologies",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Web and Internet Technologies."
                  },
                  {
                    "id": "bsc-cs-s5-subj2-t2",
                    "title": "Web and Internet Technologies — Practice Test 2: Exam Simulation",
                    "subject": "Web and Internet Technologies",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bsc-cs-s5-subj-3",
                "name": "Information Security Fundamentals",
                "code": "BSCS-503",
                "description": "Cryptography, hashes, digital certificates, and firewalls.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-cs-s5-subj3-t1",
                    "title": "Information Security Fundamentals — Practice Test 1: Fundamental Concepts",
                    "subject": "Information Security Fundamentals",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Information Security Fundamentals."
                  },
                  {
                    "id": "bsc-cs-s5-subj3-t2",
                    "title": "Information Security Fundamentals — Practice Test 2: Exam Simulation",
                    "subject": "Information Security Fundamentals",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          },
          {
            "id": "semester-6",
            "number": 6,
            "title": "Semester 6",
            "description": "BSc (BSc-CS) — Semester 6 subjects, mock tests, and exam practice.",
            "availableTestsCount": 4,
            "subjects": [
              {
                "id": "bsc-cs-s6-subj-1",
                "name": "Cloud Computing & Distributed Systems",
                "code": "BSCS-601",
                "description": "Virtualization, microservices, containerization, and AWS.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-cs-s6-subj1-t1",
                    "title": "Cloud Computing & Distributed Systems — Practice Test 1: Fundamental Concepts",
                    "subject": "Cloud Computing & Distributed Systems",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Cloud Computing & Distributed Systems."
                  },
                  {
                    "id": "bsc-cs-s6-subj1-t2",
                    "title": "Cloud Computing & Distributed Systems — Practice Test 2: Exam Simulation",
                    "subject": "Cloud Computing & Distributed Systems",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              },
              {
                "id": "bsc-cs-s6-subj-2",
                "name": "Major Computer Science Project & Viva",
                "code": "BSCS-602",
                "description": "End-to-end software application development and defense.",
                "testsCount": 2,
                "tests": [
                  {
                    "id": "bsc-cs-s6-subj2-t1",
                    "title": "Major Computer Science Project & Viva — Practice Test 1: Fundamental Concepts",
                    "subject": "Major Computer Science Project & Viva",
                    "level": "Beginner",
                    "durationMinutes": 20,
                    "questionCount": 10,
                    "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Major Computer Science Project & Viva."
                  },
                  {
                    "id": "bsc-cs-s6-subj2-t2",
                    "title": "Major Computer Science Project & Viva — Practice Test 2: Exam Simulation",
                    "subject": "Major Computer Science Project & Viva",
                    "level": "Intermediate",
                    "durationMinutes": 25,
                    "questionCount": 10,
                    "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "semesters": [
      {
        "id": "semester-1",
        "number": 1,
        "title": "Semester 1",
        "description": "BSc (BSc-PCM) — Semester 1 subjects, mock tests, and exam practice.",
        "availableTestsCount": 6,
        "subjects": [
          {
            "id": "bsc-pcm-s1-subj-1",
            "name": "Classical Mechanics & Properties of Matter",
            "code": "PHY-101",
            "description": "Newtonian mechanics, rotational dynamics, gravitation, and elasticity.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bsc-pcm-s1-subj1-t1",
                "title": "Classical Mechanics & Properties of Matter — Practice Test 1: Fundamental Concepts",
                "subject": "Classical Mechanics & Properties of Matter",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Classical Mechanics & Properties of Matter."
              },
              {
                "id": "bsc-pcm-s1-subj1-t2",
                "title": "Classical Mechanics & Properties of Matter — Practice Test 2: Exam Simulation",
                "subject": "Classical Mechanics & Properties of Matter",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bsc-pcm-s1-subj-2",
            "name": "Inorganic Chemistry I: Bonding & Periodicity",
            "code": "CHE-101",
            "description": "Atomic structure, periodic trends, VSEPR, and chemical bonding.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bsc-pcm-s1-subj2-t1",
                "title": "Inorganic Chemistry I: Bonding & Periodicity — Practice Test 1: Fundamental Concepts",
                "subject": "Inorganic Chemistry I: Bonding & Periodicity",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Inorganic Chemistry I: Bonding & Periodicity."
              },
              {
                "id": "bsc-pcm-s1-subj2-t2",
                "title": "Inorganic Chemistry I: Bonding & Periodicity — Practice Test 2: Exam Simulation",
                "subject": "Inorganic Chemistry I: Bonding & Periodicity",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bsc-pcm-s1-subj-3",
            "name": "Differential Calculus & Analytical Geometry",
            "code": "MAT-101",
            "description": "Limits, curvature, partial derivatives, and coordinate geometry.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bsc-pcm-s1-subj3-t1",
                "title": "Differential Calculus & Analytical Geometry — Practice Test 1: Fundamental Concepts",
                "subject": "Differential Calculus & Analytical Geometry",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Differential Calculus & Analytical Geometry."
              },
              {
                "id": "bsc-pcm-s1-subj3-t2",
                "title": "Differential Calculus & Analytical Geometry — Practice Test 2: Exam Simulation",
                "subject": "Differential Calculus & Analytical Geometry",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      },
      {
        "id": "semester-2",
        "number": 2,
        "title": "Semester 2",
        "description": "BSc (BSc-PCM) — Semester 2 subjects, mock tests, and exam practice.",
        "availableTestsCount": 6,
        "subjects": [
          {
            "id": "bsc-pcm-s2-subj-1",
            "name": "Electricity, Magnetism & EM Theory",
            "code": "PHY-201",
            "description": "Gauss’s law, Biot-Savart law, Faraday’s induction, and Maxwell’s equations.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bsc-pcm-s2-subj1-t1",
                "title": "Electricity, Magnetism & EM Theory — Practice Test 1: Fundamental Concepts",
                "subject": "Electricity, Magnetism & EM Theory",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Electricity, Magnetism & EM Theory."
              },
              {
                "id": "bsc-pcm-s2-subj1-t2",
                "title": "Electricity, Magnetism & EM Theory — Practice Test 2: Exam Simulation",
                "subject": "Electricity, Magnetism & EM Theory",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bsc-pcm-s2-subj-2",
            "name": "Organic Chemistry I: Functional Groups",
            "code": "CHE-201",
            "description": "Hydrocarbons, stereochemistry, SN1/SN2, and elimination reactions.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bsc-pcm-s2-subj2-t1",
                "title": "Organic Chemistry I: Functional Groups — Practice Test 1: Fundamental Concepts",
                "subject": "Organic Chemistry I: Functional Groups",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Organic Chemistry I: Functional Groups."
              },
              {
                "id": "bsc-pcm-s2-subj2-t2",
                "title": "Organic Chemistry I: Functional Groups — Practice Test 2: Exam Simulation",
                "subject": "Organic Chemistry I: Functional Groups",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bsc-pcm-s2-subj-3",
            "name": "Integral Calculus & Vector Analysis",
            "code": "MAT-201",
            "description": "Definite integrals, Green’s theorem, Stokes’ theorem, and divergence.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bsc-pcm-s2-subj3-t1",
                "title": "Integral Calculus & Vector Analysis — Practice Test 1: Fundamental Concepts",
                "subject": "Integral Calculus & Vector Analysis",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Integral Calculus & Vector Analysis."
              },
              {
                "id": "bsc-pcm-s2-subj3-t2",
                "title": "Integral Calculus & Vector Analysis — Practice Test 2: Exam Simulation",
                "subject": "Integral Calculus & Vector Analysis",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      },
      {
        "id": "semester-3",
        "number": 3,
        "title": "Semester 3",
        "description": "BSc (BSc-PCM) — Semester 3 subjects, mock tests, and exam practice.",
        "availableTestsCount": 6,
        "subjects": [
          {
            "id": "bsc-pcm-s3-subj-1",
            "name": "Wave Optics & Thermodynamics",
            "code": "PHY-301",
            "description": "Interference, diffraction, polarization, entropy, and heat engines.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bsc-pcm-s3-subj1-t1",
                "title": "Wave Optics & Thermodynamics — Practice Test 1: Fundamental Concepts",
                "subject": "Wave Optics & Thermodynamics",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Wave Optics & Thermodynamics."
              },
              {
                "id": "bsc-pcm-s3-subj1-t2",
                "title": "Wave Optics & Thermodynamics — Practice Test 2: Exam Simulation",
                "subject": "Wave Optics & Thermodynamics",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bsc-pcm-s3-subj-2",
            "name": "Physical Chemistry I: Thermodynamics & Kinetics",
            "code": "CHE-301",
            "description": "First and second laws, chemical equilibrium, and reaction rates.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bsc-pcm-s3-subj2-t1",
                "title": "Physical Chemistry I: Thermodynamics & Kinetics — Practice Test 1: Fundamental Concepts",
                "subject": "Physical Chemistry I: Thermodynamics & Kinetics",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Physical Chemistry I: Thermodynamics & Kinetics."
              },
              {
                "id": "bsc-pcm-s3-subj2-t2",
                "title": "Physical Chemistry I: Thermodynamics & Kinetics — Practice Test 2: Exam Simulation",
                "subject": "Physical Chemistry I: Thermodynamics & Kinetics",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bsc-pcm-s3-subj-3",
            "name": "Ordinary & Partial Differential Equations",
            "code": "MAT-301",
            "description": "First and higher order linear ODEs, and separation of variables.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bsc-pcm-s3-subj3-t1",
                "title": "Ordinary & Partial Differential Equations — Practice Test 1: Fundamental Concepts",
                "subject": "Ordinary & Partial Differential Equations",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Ordinary & Partial Differential Equations."
              },
              {
                "id": "bsc-pcm-s3-subj3-t2",
                "title": "Ordinary & Partial Differential Equations — Practice Test 2: Exam Simulation",
                "subject": "Ordinary & Partial Differential Equations",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      },
      {
        "id": "semester-4",
        "number": 4,
        "title": "Semester 4",
        "description": "BSc (BSc-PCM) — Semester 4 subjects, mock tests, and exam practice.",
        "availableTestsCount": 6,
        "subjects": [
          {
            "id": "bsc-pcm-s4-subj-1",
            "name": "Quantum Mechanics & Special Relativity",
            "code": "PHY-401",
            "description": "Wave-particle duality, Schrödinger equation, and Lorentz transforms.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bsc-pcm-s4-subj1-t1",
                "title": "Quantum Mechanics & Special Relativity — Practice Test 1: Fundamental Concepts",
                "subject": "Quantum Mechanics & Special Relativity",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Quantum Mechanics & Special Relativity."
              },
              {
                "id": "bsc-pcm-s4-subj1-t2",
                "title": "Quantum Mechanics & Special Relativity — Practice Test 2: Exam Simulation",
                "subject": "Quantum Mechanics & Special Relativity",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bsc-pcm-s4-subj-2",
            "name": "Inorganic Chemistry II: Coordination Compounds",
            "code": "CHE-401",
            "description": "Crystal field theory, transition metals, and organometallics.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bsc-pcm-s4-subj2-t1",
                "title": "Inorganic Chemistry II: Coordination Compounds — Practice Test 1: Fundamental Concepts",
                "subject": "Inorganic Chemistry II: Coordination Compounds",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Inorganic Chemistry II: Coordination Compounds."
              },
              {
                "id": "bsc-pcm-s4-subj2-t2",
                "title": "Inorganic Chemistry II: Coordination Compounds — Practice Test 2: Exam Simulation",
                "subject": "Inorganic Chemistry II: Coordination Compounds",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bsc-pcm-s4-subj-3",
            "name": "Linear Algebra & Matrix Theory",
            "code": "MAT-401",
            "description": "Vector spaces, eigenvalues, eigenvectors, and diagonalizability.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bsc-pcm-s4-subj3-t1",
                "title": "Linear Algebra & Matrix Theory — Practice Test 1: Fundamental Concepts",
                "subject": "Linear Algebra & Matrix Theory",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Linear Algebra & Matrix Theory."
              },
              {
                "id": "bsc-pcm-s4-subj3-t2",
                "title": "Linear Algebra & Matrix Theory — Practice Test 2: Exam Simulation",
                "subject": "Linear Algebra & Matrix Theory",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      },
      {
        "id": "semester-5",
        "number": 5,
        "title": "Semester 5",
        "description": "BSc (BSc-PCM) — Semester 5 subjects, mock tests, and exam practice.",
        "availableTestsCount": 6,
        "subjects": [
          {
            "id": "bsc-pcm-s5-subj-1",
            "name": "Solid State & Nuclear Physics",
            "code": "PHY-501",
            "description": "Crystal lattices, X-ray diffraction, radioactivity, and nuclear models.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bsc-pcm-s5-subj1-t1",
                "title": "Solid State & Nuclear Physics — Practice Test 1: Fundamental Concepts",
                "subject": "Solid State & Nuclear Physics",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Solid State & Nuclear Physics."
              },
              {
                "id": "bsc-pcm-s5-subj1-t2",
                "title": "Solid State & Nuclear Physics — Practice Test 2: Exam Simulation",
                "subject": "Solid State & Nuclear Physics",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bsc-pcm-s5-subj-2",
            "name": "Organic Chemistry II: Synthesis & Spectroscopy",
            "code": "CHE-501",
            "description": "NMR, IR, UV-Vis spectroscopy, and synthetic organic reagents.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bsc-pcm-s5-subj2-t1",
                "title": "Organic Chemistry II: Synthesis & Spectroscopy — Practice Test 1: Fundamental Concepts",
                "subject": "Organic Chemistry II: Synthesis & Spectroscopy",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Organic Chemistry II: Synthesis & Spectroscopy."
              },
              {
                "id": "bsc-pcm-s5-subj2-t2",
                "title": "Organic Chemistry II: Synthesis & Spectroscopy — Practice Test 2: Exam Simulation",
                "subject": "Organic Chemistry II: Synthesis & Spectroscopy",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bsc-pcm-s5-subj-3",
            "name": "Real Analysis & Metric Spaces",
            "code": "MAT-501",
            "description": "Sequences, series convergence, metric topology, and compactness.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bsc-pcm-s5-subj3-t1",
                "title": "Real Analysis & Metric Spaces — Practice Test 1: Fundamental Concepts",
                "subject": "Real Analysis & Metric Spaces",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Real Analysis & Metric Spaces."
              },
              {
                "id": "bsc-pcm-s5-subj3-t2",
                "title": "Real Analysis & Metric Spaces — Practice Test 2: Exam Simulation",
                "subject": "Real Analysis & Metric Spaces",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      },
      {
        "id": "semester-6",
        "number": 6,
        "title": "Semester 6",
        "description": "BSc (BSc-PCM) — Semester 6 subjects, mock tests, and exam practice.",
        "availableTestsCount": 6,
        "subjects": [
          {
            "id": "bsc-pcm-s6-subj-1",
            "name": "Atomic, Molecular & Laser Physics",
            "code": "PHY-601",
            "description": "Bohr-Sommerfeld model, Zeeman effect, and laser action.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bsc-pcm-s6-subj1-t1",
                "title": "Atomic, Molecular & Laser Physics — Practice Test 1: Fundamental Concepts",
                "subject": "Atomic, Molecular & Laser Physics",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Atomic, Molecular & Laser Physics."
              },
              {
                "id": "bsc-pcm-s6-subj1-t2",
                "title": "Atomic, Molecular & Laser Physics — Practice Test 2: Exam Simulation",
                "subject": "Atomic, Molecular & Laser Physics",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bsc-pcm-s6-subj-2",
            "name": "Physical Chemistry II: Electrochemistry & Quantum",
            "code": "CHE-601",
            "description": "Nernst equation, conductance, quantum chemistry, and photochemistry.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bsc-pcm-s6-subj2-t1",
                "title": "Physical Chemistry II: Electrochemistry & Quantum — Practice Test 1: Fundamental Concepts",
                "subject": "Physical Chemistry II: Electrochemistry & Quantum",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Physical Chemistry II: Electrochemistry & Quantum."
              },
              {
                "id": "bsc-pcm-s6-subj2-t2",
                "title": "Physical Chemistry II: Electrochemistry & Quantum — Practice Test 2: Exam Simulation",
                "subject": "Physical Chemistry II: Electrochemistry & Quantum",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          },
          {
            "id": "bsc-pcm-s6-subj-3",
            "name": "Abstract Algebra & Complex Analysis",
            "code": "MAT-601",
            "description": "Groups, rings, fields, Cauchy integral formula, and residues.",
            "testsCount": 2,
            "tests": [
              {
                "id": "bsc-pcm-s6-subj3-t1",
                "title": "Abstract Algebra & Complex Analysis — Practice Test 1: Fundamental Concepts",
                "subject": "Abstract Algebra & Complex Analysis",
                "level": "Beginner",
                "durationMinutes": 20,
                "questionCount": 10,
                "description": "Targeted 10-question assessment testing core concepts, fundamental principles, and definitions in Abstract Algebra & Complex Analysis."
              },
              {
                "id": "bsc-pcm-s6-subj3-t2",
                "title": "Abstract Algebra & Complex Analysis — Practice Test 2: Exam Simulation",
                "subject": "Abstract Algebra & Complex Analysis",
                "level": "Intermediate",
                "durationMinutes": 25,
                "questionCount": 10,
                "description": "Comprehensive 10-question timed practice under standard examination conditions with analytical problem solving."
              }
            ]
          }
        ]
      }
    ]
  }
];

/**
 * Fast lookup helpers
 */
export function getCourseById(courseId: string): CourseInfo | undefined {
  return COURSES_DATA.find((c) => c.id.toLowerCase() === courseId.toLowerCase());
}

export function getBranchById(courseId: string, branchId: string): BranchInfo | undefined {
  const course = getCourseById(courseId);
  return course?.branches.find((b) => b.id.toLowerCase() === branchId.toLowerCase());
}

export function getSemesterById(
  courseId: string,
  branchId: string,
  semesterId: string
): SemesterInfo | undefined {
  const branch = getBranchById(courseId, branchId);
  return branch?.semesters.find((s) => s.id.toLowerCase() === semesterId.toLowerCase());
}

export function findCourseMockTest(testId: string): MockTestInfo | undefined {
  for (const course of COURSES_DATA) {
    for (const branch of course.branches) {
      for (const sem of branch.semesters) {
        for (const subj of sem.subjects) {
          const found = subj.tests.find((t) => t.id === testId);
          if (found) return found;
        }
      }
    }
  }
  return undefined;
}

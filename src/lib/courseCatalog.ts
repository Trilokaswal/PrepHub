import { COURSES_DATA } from '@/data/coursesData';

export interface BranchOption {
  name: string;
  label: string;
  code: string;
}

export interface CourseOption {
  id: string;
  name: string;
  fullName: string;
  totalSemesters: number;
  branches: BranchOption[];
}

export interface CurriculumSubject {
  name: string;
  code: string;
}

export const COURSE_OPTIONS: CourseOption[] = [
  {
    id: 'btech',
    name: 'B.Tech',
    fullName: 'B.Tech (Bachelor of Technology)',
    totalSemesters: 8,
    branches: [
      { name: 'Computer Science & Engineering', label: 'Computer Science & Engineering (CSE)', code: 'CSE' },
      { name: 'Information Technology', label: 'Information Technology (IT)', code: 'IT' },
      { name: 'Electronics & Communication', label: 'Electronics & Communication (ECE)', code: 'ECE' },
      { name: 'Mechanical Engineering', label: 'Mechanical Engineering (ME)', code: 'ME' },
      { name: 'Electrical Engineering', label: 'Electrical Engineering (EE)', code: 'EE' },
      { name: 'Civil Engineering', label: 'Civil Engineering (CE)', code: 'CE' },
      { name: 'Artificial Intelligence & Data Science', label: 'Artificial Intelligence & Data Science (AI & DS)', code: 'AIDS' },
    ],
  },
  {
    id: 'bca',
    name: 'BCA',
    fullName: 'BCA (Bachelor of Computer Applications)',
    totalSemesters: 6,
    branches: [
      { name: 'Software Development & Web Technologies', label: 'Software Development & Web Technologies', code: 'BCA-DEV' },
      { name: 'Data Science & Artificial Intelligence', label: 'Data Science & Artificial Intelligence', code: 'BCA-DS' },
      { name: 'Cloud Computing & Cyber Security', label: 'Cloud Computing & Cyber Security', code: 'BCA-CLOUD' },
      { name: 'General Computer Applications', label: 'General Computer Applications', code: 'BCA-GEN' },
    ],
  },
  {
    id: 'bba',
    name: 'BBA',
    fullName: 'BBA (Bachelor of Business Administration)',
    totalSemesters: 6,
    branches: [
      { name: 'Finance & Accounting', label: 'Finance & Accounting', code: 'BBA-FIN' },
      { name: 'Marketing Management', label: 'Marketing Management', code: 'BBA-MKT' },
      { name: 'Human Resource Management', label: 'Human Resource Management', code: 'BBA-HR' },
      { name: 'General Management', label: 'General Management', code: 'BBA-MGMT' },
      { name: 'International Business', label: 'International Business', code: 'BBA-IB' },
    ],
  },
  {
    id: 'bsc',
    name: 'BSc',
    fullName: 'BSc (Bachelor of Science)',
    totalSemesters: 6,
    branches: [
      { name: 'Physics, Chemistry & Mathematics (PCM)', label: 'Physics, Chemistry & Mathematics (PCM)', code: 'BSc-PCM' },
      { name: 'Computer Science', label: 'Computer Science', code: 'BSc-CS' },
      { name: 'Mathematics', label: 'Mathematics', code: 'BSc-MATH' },
      { name: 'Physics', label: 'Physics', code: 'BSc-PHY' },
      { name: 'Chemistry', label: 'Chemistry', code: 'BSc-CHEM' },
      { name: 'Information Technology', label: 'Information Technology', code: 'BSc-IT' },
    ],
  },
  {
    id: 'ba',
    name: 'BA',
    fullName: 'BA (Bachelor of Arts)',
    totalSemesters: 6,
    branches: [
      { name: 'English Literature & Linguistics', label: 'English Literature & Linguistics', code: 'BA-ENG' },
      { name: 'History & Archaeology', label: 'History & Archaeology', code: 'BA-HIST' },
      { name: 'Political Science', label: 'Political Science', code: 'BA-POL' },
      { name: 'Economics', label: 'Economics', code: 'BA-ECO' },
      { name: 'Psychology', label: 'Psychology', code: 'BA-PSY' },
    ],
  },
];

const SPECIALIZED_SUBJECTS: Record<string, CurriculumSubject[]> = {
  'bsc-mathematics': [
    { name: 'Calculus & Analytical Geometry', code: 'MAT-101' },
    { name: 'Algebra & Matrices', code: 'MAT-102' },
    { name: 'Differential Equations', code: 'MAT-103' },
    { name: 'Computer Programming in C', code: 'CS-101' },
  ],
  'bsc-physics': [
    { name: 'Classical Mechanics & Properties of Matter', code: 'PHY-101' },
    { name: 'Electromagnetism & Circuit Theory', code: 'PHY-102' },
    { name: 'Optics & Thermal Physics', code: 'PHY-103' },
    { name: 'Mathematical Methods in Physics', code: 'MAT-101' },
  ],
  'bsc-chemistry': [
    { name: 'Inorganic Chemistry I: Periodicity & Bonding', code: 'CHE-101' },
    { name: 'Physical Chemistry I: States of Matter', code: 'CHE-102' },
    { name: 'Organic Chemistry I: Reaction Mechanisms', code: 'CHE-103' },
    { name: 'Analytical & Environmental Chemistry', code: 'CHE-104' },
  ],
  'ba-economics': [
    { name: 'Principles of Microeconomics', code: 'ECO-101' },
    { name: 'Mathematical Methods for Economics', code: 'ECO-102' },
    { name: 'Statistical Methods for Economists', code: 'ECO-103' },
  ],
  'ba-psychology': [
    { name: 'Introduction to Psychology', code: 'PSY-101' },
    { name: 'Biopsychology & Human Behavior', code: 'PSY-102' },
    { name: 'Cognitive Processes', code: 'PSY-103' },
  ],
};

export function normalizeCourseName(rawCourse: string): string {
  if (!rawCourse) return '';
  const cleaned = rawCourse.trim();
  if (/^b\.?sc$/i.test(cleaned)) return 'BSc';
  if (/^b\.?tech$/i.test(cleaned)) return 'B.Tech';
  if (/^b\.?c\.?a$/i.test(cleaned)) return 'BCA';
  if (/^b\.?b\.?a$/i.test(cleaned)) return 'BBA';
  if (/^b\.?a$/i.test(cleaned)) return 'BA';
  return cleaned;
}

export function getCurriculumSubjects(
  courseName: string,
  branchName: string,
  semesterNum: number = 1
): CurriculumSubject[] {
  if (!courseName || !branchName) return [];

  const normCourse = normalizeCourseName(courseName);
  const courseKey = normCourse.toLowerCase().replace(/[^a-z]/g, '');
  const branchKey = branchName.toLowerCase().replace(/[^a-z]/g, '');

  const customKey = `${courseKey}-${branchKey}`;
  if (SPECIALIZED_SUBJECTS[customKey]) {
    return SPECIALIZED_SUBJECTS[customKey];
  }

  // Look up in COURSES_DATA
  const course = COURSES_DATA.find((c) => {
    const cNorm = c.name.toLowerCase().replace(/[^a-z]/g, '');
    const cIdNorm = c.id.toLowerCase().replace(/[^a-z]/g, '');
    return cNorm === courseKey || cIdNorm === courseKey;
  });

  if (!course) return [];

  const branch =
    course.branches.find(
      (b) =>
        b.name.toLowerCase() === branchName.toLowerCase() ||
        b.code.toLowerCase() === branchName.toLowerCase() ||
        branchName.toLowerCase().includes(b.name.toLowerCase()) ||
        b.name.toLowerCase().includes(branchName.toLowerCase())
    ) || course.branches[0];

  if (!branch) return [];

  const sem = branch.semesters.find((s) => s.number === semesterNum) || branch.semesters[0];
  if (!sem || !sem.subjects || sem.subjects.length === 0) return [];

  return sem.subjects.map((s) => ({
    name: s.name,
    code: s.code || s.id,
  }));
}

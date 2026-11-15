import React from 'react';
import {
  Cpu,
  Code2,
  Briefcase,
  BookOpen,
  FlaskConical,
  GraduationCap,
  Layers,
  Radio,
  Cog,
  Zap,
  Building2,
  Network,
  Laptop,
  BarChart3,
  ShieldCheck,
  Landmark,
  Megaphone,
  Users,
  Feather,
  Scroll,
  Scale,
  Atom,
  Monitor,
  Dna,
  Calculator,
  Database,
  Brain,
  TrendingUp,
  type LucideProps,
} from 'lucide-react';

/* =========================================================================
   1. COURSE ICONS
   ========================================================================= */
export const COURSE_ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  btech: Cpu,
  bca: Code2,
  bba: Briefcase,
  ba: BookOpen,
  bsc: FlaskConical,
};

export function getCourseIconComponent(courseId?: string): React.ComponentType<LucideProps> {
  if (!courseId) return GraduationCap;
  const key = courseId.toLowerCase().replace(/[^a-z]/g, '');
  return COURSE_ICON_MAP[key] || GraduationCap;
}

export function CourseIcon({
  courseId,
  className = 'w-6 h-6 stroke-[1.75]',
  ...props
}: { courseId: string; className?: string } & LucideProps) {
  const Icon = getCourseIconComponent(courseId);
  return <Icon className={className} {...props} />;
}

/* =========================================================================
   2. BRANCH ICONS
   ========================================================================= */
export const BRANCH_ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  cse: Code2,
  ece: Radio,
  me: Cog,
  ee: Zap,
  ce: Building2,
  it: Network,
  software: Laptop,
  datascience: BarChart3,
  cloudcyber: ShieldCheck,
  finance: Landmark,
  marketing: Megaphone,
  hr: Users,
  english: Feather,
  history: Scroll,
  polscience: Scale,
  pcm: Atom,
  cs: Monitor,
  biology: Dna,
};

export function getBranchIconComponent(branchId?: string): React.ComponentType<LucideProps> {
  if (!branchId) return Layers;
  const key = branchId.toLowerCase().replace(/[^a-z]/g, '');
  return BRANCH_ICON_MAP[key] || Layers;
}

export function BranchIcon({
  branchId,
  className = 'w-6 h-6 stroke-[1.75]',
  ...props
}: { branchId: string; className?: string } & LucideProps) {
  const Icon = getBranchIconComponent(branchId);
  return <Icon className={className} {...props} />;
}

/* =========================================================================
   3. SUBJECT ICONS
   ========================================================================= */
export function getSubjectIconComponent(subjectName?: string): React.ComponentType<LucideProps> {
  if (!subjectName) return BookOpen;
  const s = subjectName.toLowerCase();

  // Mathematics & Quantitative
  if (
    s.includes('math') ||
    s.includes('calculus') ||
    s.includes('algebra') ||
    s.includes('statistic') ||
    s.includes('numerical') ||
    s.includes('discrete') ||
    s.includes('probability')
  ) {
    return Calculator;
  }

  // Physics & Optical
  if (
    s.includes('physic') ||
    s.includes('optics') ||
    s.includes('quantum') ||
    s.includes('relativity') ||
    s.includes('laser') ||
    s.includes('acoustics') ||
    s.includes('solid state') ||
    s.includes('nuclear')
  ) {
    return Atom;
  }

  // Chemistry & Materials
  if (
    s.includes('chem') ||
    s.includes('reaction') ||
    s.includes('polymer') ||
    s.includes('spectroscopy') ||
    s.includes('bonding')
  ) {
    return FlaskConical;
  }

  // Programming & Software
  if (
    s.includes('program') ||
    s.includes('c++') ||
    s.includes('java') ||
    s.includes('python') ||
    s.includes('algorithm') ||
    s.includes('data structure') ||
    s.includes('web') ||
    s.includes('coding') ||
    s.includes('compiler')
  ) {
    return Code2;
  }

  // Databases & Storage
  if (
    s.includes('database') ||
    s.includes('dbms') ||
    s.includes('sql') ||
    s.includes('data mining') ||
    s.includes('nosql') ||
    s.includes('warehouse')
  ) {
    return Database;
  }

  // AI & Machine Learning
  if (
    s.includes('ai') ||
    s.includes('artificial') ||
    s.includes('machine learning') ||
    s.includes('deep learning') ||
    s.includes('neural') ||
    s.includes('nlp') ||
    s.includes('intelligence')
  ) {
    return Brain;
  }

  // Computer Systems & Architecture
  if (
    s.includes('operating system') ||
    s.includes('architecture') ||
    s.includes('microprocessor') ||
    s.includes('microcontroller') ||
    s.includes('hardware') ||
    s.includes('embedded')
  ) {
    return Cpu;
  }

  // Networks & Cloud
  if (
    s.includes('network') ||
    s.includes('cloud') ||
    s.includes('distributed') ||
    s.includes('internet of things') ||
    s.includes('iot') ||
    s.includes('devops')
  ) {
    return Network;
  }

  // Electrical & Power
  if (
    s.includes('electric') ||
    s.includes('power') ||
    s.includes('high voltage') ||
    s.includes('transformer') ||
    s.includes('grid') ||
    s.includes('traction')
  ) {
    return Zap;
  }

  // Electronics & Communications
  if (
    s.includes('electronic') ||
    s.includes('signal') ||
    s.includes('communication') ||
    s.includes('antenna') ||
    s.includes('radar') ||
    s.includes('vlsi') ||
    s.includes('microwave') ||
    s.includes('rf ') ||
    s.includes('satellite')
  ) {
    return Radio;
  }

  // Mechanical & Thermal
  if (
    s.includes('mechanic') ||
    s.includes('thermodynamic') ||
    s.includes('machin') ||
    s.includes('manufacturing') ||
    s.includes('fluid') ||
    s.includes('heat') ||
    s.includes('refrigeration') ||
    s.includes('engine') ||
    s.includes('kinematics') ||
    s.includes('dynamics') ||
    s.includes('cad') ||
    s.includes('cam')
  ) {
    return Cog;
  }

  // Civil & Structural
  if (
    s.includes('civil') ||
    s.includes('structur') ||
    s.includes('build') ||
    s.includes('survey') ||
    s.includes('concrete') ||
    s.includes('highway') ||
    s.includes('soil') ||
    s.includes('geotech') ||
    s.includes('transportation') ||
    s.includes('hydraul') ||
    s.includes('earthquake')
  ) {
    return Building2;
  }

  // Accounting & Taxation
  if (
    s.includes('account') ||
    s.includes('tax') ||
    s.includes('bank') ||
    s.includes('portfolio') ||
    s.includes('financial market') ||
    s.includes('costing') ||
    s.includes('audit')
  ) {
    return Landmark;
  }

  // Economics & Management Strategy
  if (
    s.includes('econom') ||
    s.includes('finance') ||
    s.includes('strategic') ||
    s.includes('investment') ||
    s.includes('business') ||
    s.includes('commerce')
  ) {
    return TrendingUp;
  }

  // Marketing & Sales
  if (
    s.includes('market') ||
    s.includes('advertis') ||
    s.includes('brand') ||
    s.includes('sales') ||
    s.includes('retail') ||
    s.includes('consumer')
  ) {
    return Megaphone;
  }

  // HR & Organizational
  if (
    s.includes('human resource') ||
    s.includes('hr') ||
    s.includes('organ') ||
    s.includes('talent') ||
    s.includes('training') ||
    s.includes('labor') ||
    s.includes('welfare')
  ) {
    return Users;
  }

  // English & Literature
  if (
    s.includes('english') ||
    s.includes('literat') ||
    s.includes('poetry') ||
    s.includes('drama') ||
    s.includes('prose') ||
    s.includes('writing') ||
    s.includes('linguistic') ||
    s.includes('fiction')
  ) {
    return Feather;
  }

  // History & Archaeology
  if (
    s.includes('history') ||
    s.includes('archaeology') ||
    s.includes('civilization') ||
    s.includes('empire') ||
    s.includes('historiography')
  ) {
    return Scroll;
  }

  // Political Science & Law
  if (
    s.includes('politic') ||
    s.includes('constitut') ||
    s.includes('law') ||
    s.includes('governance') ||
    s.includes('rights') ||
    s.includes('policy') ||
    s.includes('diplomacy') ||
    s.includes('administration')
  ) {
    return Scale;
  }

  // Biology & Genetics
  if (
    s.includes('bio') ||
    s.includes('genetic') ||
    s.includes('cell') ||
    s.includes('microbiology') ||
    s.includes('physiology') ||
    s.includes('zoology') ||
    s.includes('botany')
  ) {
    return Dna;
  }

  // Cyber Security & Forensics
  if (
    s.includes('secur') ||
    s.includes('cyber') ||
    s.includes('forensic') ||
    s.includes('crypto') ||
    s.includes('hacking')
  ) {
    return ShieldCheck;
  }

  return BookOpen;
}

export function SubjectIcon({
  subjectName,
  className = 'w-6 h-6 stroke-[1.75]',
  ...props
}: { subjectName: string; className?: string } & LucideProps) {
  const Icon = getSubjectIconComponent(subjectName);
  return <Icon className={className} {...props} />;
}

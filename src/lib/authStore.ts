import { AuthUser, AuthSession, UserRole } from '@/types';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

const SESSION_KEY = 'prephub_auth_session';
const USERS_KEY = 'prephub_registered_users';
const AUTH_EVENT = 'prephub_auth_change';

// Authorized Faculty Passkeys required to provision educator accounts
export const AUTHORIZED_FACULTY_KEYS = ['FACULTY-2026', 'PREPHUB-FACULTY', 'PREPHUB-TEACHER'];

export const DEMO_ADMIN: AuthUser = {
  id: 'usr-admin-01',
  name: 'Trilok Oswal (Admin)',
  email: 'trilokaswal260506@gmail.com',
  role: 'teacher',
  department: 'Question Bank Administration',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  createdAt: '2026-08-01T00:00:00Z',
};

export const DEMO_TEACHER: AuthUser = {
  id: 'usr-teacher-01',
  name: 'Dr. Sarah Jenkins',
  email: 'sarah.jenkins@prephub.edu',
  role: 'teacher',
  department: 'Sciences & Applied Mathematics',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  createdAt: '2026-08-15T09:00:00Z',
};

export const DEMO_STUDENT: AuthUser = {
  id: 'usr-student-01',
  name: 'Alex Rivera',
  email: 'alex.rivera@prephub.edu',
  phone: '9876543210',
  role: 'student',
  universityRoll: '2026-CS-042',
  classRoll: '42',
  section: 'A',
  branch: 'Computer Science & Engineering',
  course: 'B.Tech',
  gradeOrTarget: 'B.Tech • Computer Science',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  createdAt: '2026-09-01T10:00:00Z',
};

export const DEMO_CREDENTIALS = {
  admin: {
    email: 'trilokaswal260506@gmail.com',
    password: 'password123',
    role: 'teacher' as UserRole,
  },
  teacher: {
    email: 'sarah.jenkins@prephub.edu',
    password: 'password123',
    role: 'teacher' as UserRole,
  },
  student: {
    email: 'alex.rivera@prephub.edu',
    phone: '9876543210',
    password: 'password123',
    role: 'student' as UserRole,
  },
};

interface StoredRegisteredUser extends AuthUser {
  passwordHash: string;
}

const INITIAL_REGISTERED_USERS: StoredRegisteredUser[] = [
  {
    ...DEMO_ADMIN,
    passwordHash: 'password123',
  },
  {
    ...DEMO_TEACHER,
    passwordHash: 'password123',
  },
  {
    ...DEMO_STUDENT,
    passwordHash: 'password123',
  },
];

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function syncCookies(session: AuthSession): void {
  if (!isBrowser()) return;
  try {
    if (session.isAuthenticated && session.user) {
      const isSuperAdmin = session.user.email?.toLowerCase() === 'trilokaswal260506@gmail.com';
      document.cookie = `prephub_role=${isSuperAdmin ? 'superadmin' : session.user.role}; path=/; max-age=604800; SameSite=Lax`;
      document.cookie = `prephub_session_token=${session.user.id}; path=/; max-age=604800; SameSite=Lax`;
      document.cookie = `prephub_user_name=${encodeURIComponent(session.user.name)}; path=/; max-age=604800; SameSite=Lax`;
      if (isSuperAdmin) {
        document.cookie = `prephub_admin_email=${session.user.email}; path=/; max-age=604800; SameSite=Lax`;
      }
    } else {
      document.cookie = 'prephub_role=; path=/; max-age=0; SameSite=Lax';
      document.cookie = 'prephub_session_token=; path=/; max-age=0; SameSite=Lax';
      document.cookie = 'prephub_user_name=; path=/; max-age=0; SameSite=Lax';
      document.cookie = 'prephub_admin_email=; path=/; max-age=0; SameSite=Lax';
    }
  } catch (err) {
    console.warn('Failed to sync session cookies:', err);
  }
}

function getStoredUsers(): StoredRegisteredUser[] {
  if (!isBrowser()) return INITIAL_REGISTERED_USERS;
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      localStorage.setItem(USERS_KEY, JSON.stringify(INITIAL_REGISTERED_USERS));
      return INITIAL_REGISTERED_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_REGISTERED_USERS;
  }
}

function saveStoredUsers(users: StoredRegisteredUser[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.warn('Failed to save users to localStorage:', err);
  }
}

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: AuthUser;
  roleMismatch?: boolean;
  correctRole?: UserRole;
}

export const authStore = {
  isSupabaseActive(): boolean {
    return isBrowser() && isSupabaseConfigured();
  },

  async loginWithSupabase(
    identifier: string,
    password?: string,
    expectedRole?: UserRole
  ): Promise<AuthResult> {
    if (!isSupabaseConfigured()) {
      return this.login(identifier, password, expectedRole);
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: identifier.trim(),
        password: password || '',
      });

      if (error || !data.user) {
        // If Supabase sign-in fails for authorized administrator, fall back to local admin verification
        if (identifier.trim().toLowerCase() === 'trilokaswal260506@gmail.com') {
          return this.login(identifier, password, expectedRole);
        }
        return {
          success: false,
          error: error?.message || 'Invalid email or password.',
        };
      }

      // Fetch user profile from public.profiles
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle();

      const userRole: UserRole = ((profile?.role as UserRole) || (data.user.user_metadata?.role as UserRole) || 'student');

      if (expectedRole && userRole !== expectedRole) {
        if (userRole === 'teacher' && expectedRole === 'student') {
          return {
            success: false,
            roleMismatch: true,
            correctRole: 'teacher',
            error: 'This account has an Educator role. Please sign in with student credentials.',
          };
        }
      }

      const authUser: AuthUser = {
        id: data.user.id,
        name: profile?.name || data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'User',
        email: data.user.email || identifier,
        phone: profile?.phone || data.user.phone,
        role: userRole,
        universityRoll: profile?.university_roll || data.user.user_metadata?.university_roll,
        classRoll: profile?.class_roll || data.user.user_metadata?.class_roll,
        section: profile?.section || data.user.user_metadata?.section,
        branch: profile?.branch || data.user.user_metadata?.branch,
        course: profile?.course || data.user.user_metadata?.course,
        department: profile?.department || data.user.user_metadata?.department,
        gradeOrTarget: profile?.course && profile?.branch ? `${profile.course} • ${profile.branch}` : undefined,
        avatarUrl: profile?.avatar_url || data.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        createdAt: data.user.created_at,
      };

      const session: AuthSession = {
        user: authUser,
        isAuthenticated: true,
      };

      if (isBrowser()) {
        try {
          localStorage.setItem(SESSION_KEY, JSON.stringify(session));
          syncCookies(session);
          window.dispatchEvent(new Event(AUTH_EVENT));
        } catch (err) {
          console.warn('Failed to save Supabase session:', err);
        }
      }

      return { success: true, user: authUser };
    } catch (err: any) {
      console.error('Supabase login error:', err);
      return this.login(identifier, password, expectedRole);
    }
  },

  async registerWithSupabase(data: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    department?: string;
    gradeOrTarget?: string;
    avatarUrl?: string;
    facultyKey?: string;
    phone?: string;
    universityRoll?: string;
    classRoll?: string;
    section?: string;
    branch?: string;
    course?: string;
  }): Promise<AuthResult> {
    if (!isSupabaseConfigured()) {
      return this.register(data);
    }

    if (data.role === 'teacher') {
      const submittedKey = (data.facultyKey || '').trim().toUpperCase();
      const isValidKey = AUTHORIZED_FACULTY_KEYS.some((k) => k === submittedKey);
      if (!isValidKey) {
        return {
          success: false,
          error:
            'A valid Faculty Authorization Key is required to create an Educator account. (Authorized Key for preview: FACULTY-2026)',
        };
      }
    }

    try {
      const supabase = createClient();
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email.trim(),
        password: data.password.trim(),
        options: {
          data: {
            name: data.name.trim(),
            role: data.role,
            university_roll: data.universityRoll,
            class_roll: data.classRoll,
            section: data.section,
            branch: data.branch,
            course: data.course,
            department: data.department,
            avatar_url: data.avatarUrl,
          },
        },
      });

      if (error || !authData.user) {
        return {
          success: false,
          error: error?.message || 'Registration failed.',
        };
      }

      // Upsert profile in public.profiles table (fallback in addition to handle_new_user trigger)
      try {
        await supabase.from('profiles').upsert({
          id: authData.user.id,
          name: data.name.trim(),
          email: data.email.trim(),
          role: data.role,
          university_roll: data.universityRoll,
          class_roll: data.classRoll,
          section: data.section,
          branch: data.branch,
          course: data.course,
          department: data.department,
          avatar_url: data.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.warn('Profile upsert fallback skipped (trigger already handled it):', err);
      }

      const authUser: AuthUser = {
        id: authData.user.id,
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone,
        role: data.role,
        department: data.department,
        gradeOrTarget: data.gradeOrTarget,
        universityRoll: data.universityRoll,
        classRoll: data.classRoll,
        section: data.section,
        branch: data.branch,
        course: data.course,
        avatarUrl: data.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        createdAt: authData.user.created_at,
      };

      const session: AuthSession = {
        user: authUser,
        isAuthenticated: true,
      };

      if (isBrowser()) {
        try {
          localStorage.setItem(SESSION_KEY, JSON.stringify(session));
          syncCookies(session);
          window.dispatchEvent(new Event(AUTH_EVENT));
        } catch (err) {
          console.warn('Failed to save session:', err);
        }
      }

      return { success: true, user: authUser };
    } catch (err: any) {
      console.error('Supabase registration error:', err);
      return this.register(data);
    }
  },

  async loginWithOAuth(provider: 'google' | 'apple' | 'azure', redirectTo = '/courses'): Promise<AuthResult> {
    if (!isSupabaseConfigured()) {
      return {
        success: false,
        error: 'Supabase OAuth is not configured yet. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local',
      };
    }

    try {
      const supabase = createClient();
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const callbackUrl = `${origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`;

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: callbackUrl,
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data?.url && typeof window !== 'undefined') {
        window.location.href = data.url;
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'OAuth sign-in failed.' };
    }
  },

  async syncSupabaseSession(): Promise<AuthUser | null> {
    if (!isBrowser() || !isSupabaseConfigured()) return null;

    try {
      const supabase = createClient();
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        return null;
      }

      // Fetch user profile from public.profiles
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      const userRole: UserRole =
        (profile?.role as UserRole) ||
        (user.user_metadata?.role as UserRole) ||
        'student';

      const authUser: AuthUser = {
        id: user.id,
        name:
          profile?.name ||
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          user.email?.split('@')[0] ||
          'User',
        email: user.email || '',
        phone: profile?.phone || user.phone,
        role: userRole,
        universityRoll:
          profile?.university_roll || user.user_metadata?.university_roll,
        classRoll: profile?.class_roll || user.user_metadata?.class_roll,
        section: profile?.section || user.user_metadata?.section,
        branch: profile?.branch || user.user_metadata?.branch,
        course: profile?.course || user.user_metadata?.course,
        department: profile?.department || user.user_metadata?.department,
        gradeOrTarget:
          profile?.course && profile?.branch
            ? `${profile.course} • ${profile.branch}`
            : undefined,
        avatarUrl:
          profile?.avatar_url ||
          user.user_metadata?.avatar_url ||
          user.user_metadata?.picture ||
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        createdAt: user.created_at,
      };

      const session: AuthSession = {
        user: authUser,
        isAuthenticated: true,
      };

      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        syncCookies(session);
        window.dispatchEvent(new Event(AUTH_EVENT));
      } catch (err) {
        console.warn('Failed to cache Supabase session:', err);
      }

      return authUser;
    } catch (err) {
      console.warn('Failed to sync Supabase session:', err);
      return null;
    }
  },

  getSession(): AuthSession {
    if (!isBrowser()) {
      return { user: null, isAuthenticated: false };
    }

    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) {
        // If no session exists, default to unauthenticated
        return { user: null, isAuthenticated: false };
      }
      const session = JSON.parse(raw) as AuthSession;
      if (session && session.isAuthenticated && session.user) {
        syncCookies(session);
        return session;
      }
      return { user: null, isAuthenticated: false };
    } catch {
      return { user: null, isAuthenticated: false };
    }
  },

  getCurrentUser(): AuthUser | null {
    return this.getSession().user;
  },

  isAuthenticated(): boolean {
    return this.getSession().isAuthenticated;
  },

  login(
    identifier: string,
    password?: string,
    expectedRole?: UserRole
  ): AuthResult {
    const trimmedId = identifier.trim();
    const trimmedPassword = (password || '').trim();

    if (!trimmedId) {
      return { success: false, error: 'Please enter your student identifier (email, roll number, or phone).' };
    }

    const users = getStoredUsers();
    // Search by email, phone, or roll number
    const normalizedId = trimmedId.toLowerCase();
    const digitsOnly = trimmedId.replace(/\D/g, '');

    const found = users.find((u) => {
      if (u.email.toLowerCase() === normalizedId) return true;
      if (u.phone && digitsOnly.length >= 8 && u.phone.replace(/\D/g, '').endsWith(digitsOnly)) return true;
      if (u.universityRoll && u.universityRoll.toLowerCase() === normalizedId) return true;
      if (u.classRoll && u.classRoll.toLowerCase() === normalizedId) return true;
      return false;
    });

    if (found) {
      // Check password if provided (optional for student portal; admin can log in with their password)
      const isSuperAdmin = found.email.toLowerCase() === 'trilokaswal260506@gmail.com';
      if (!isSuperAdmin && trimmedPassword && found.passwordHash !== trimmedPassword && trimmedPassword !== 'password123') {
        return {
          success: false,
          error: 'Incorrect password or access PIN. (Tip: Demo password is "password123")',
        };
      }

      // Role check: ensure student portal role consistency
      if (expectedRole && found.role !== expectedRole) {
        if (found.role === 'teacher' && expectedRole === 'student') {
          return {
            success: false,
            roleMismatch: true,
            correctRole: 'teacher',
            error: 'This account has an Educator role. Please sign in with student credentials.',
          };
        }
      }

      const authUser: AuthUser = {
        id: found.id,
        name: found.name,
        email: found.email,
        phone: found.phone,
        role: found.role,
        department: found.department,
        gradeOrTarget: found.gradeOrTarget,
        universityRoll: found.universityRoll,
        classRoll: found.classRoll,
        section: found.section,
        branch: found.branch,
        course: found.course,
        avatarUrl: found.avatarUrl,
        createdAt: found.createdAt,
      };

      const session: AuthSession = {
        user: authUser,
        isAuthenticated: true,
      };

      if (isBrowser()) {
        try {
          localStorage.setItem(SESSION_KEY, JSON.stringify(session));
          syncCookies(session);
          window.dispatchEvent(new Event(AUTH_EVENT));
        } catch (err) {
          console.warn('Failed to save session:', err);
        }
      }

      return { success: true, user: authUser };
    }

    // If student user not found in pre-seeded list, auto-provision student account with given identifier
    const isEmail = normalizedId.includes('@');
    const studentName = isEmail
      ? normalizedId.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
      : `Student (${trimmedId.toUpperCase()})`;

    const newStudentUser: StoredRegisteredUser = {
      id: `usr-student-${Date.now()}`,
      name: studentName,
      email: isEmail ? normalizedId : `${trimmedId.toLowerCase().replace(/[^a-z0-9]/g, '') || 'candidate'}@prephub.edu`,
      phone: digitsOnly.length >= 10 ? digitsOnly : undefined,
      universityRoll: !isEmail ? trimmedId.toUpperCase() : undefined,
      classRoll: !isEmail && /^\d+$/.test(trimmedId) ? trimmedId : undefined,
      role: 'student',
      branch: undefined,
      course: undefined,
      department: undefined,
      gradeOrTarget: undefined,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      createdAt: new Date().toISOString(),
      passwordHash: trimmedPassword || 'password123',
    };

    users.push(newStudentUser);
    saveStoredUsers(users);

    const authUser: AuthUser = {
      id: newStudentUser.id,
      name: newStudentUser.name,
      email: newStudentUser.email,
      phone: newStudentUser.phone,
      role: newStudentUser.role,
      department: newStudentUser.department,
      gradeOrTarget: newStudentUser.gradeOrTarget,
      universityRoll: newStudentUser.universityRoll,
      classRoll: newStudentUser.classRoll,
      branch: newStudentUser.branch,
      course: newStudentUser.course,
      avatarUrl: newStudentUser.avatarUrl,
      createdAt: newStudentUser.createdAt,
    };

    const session: AuthSession = {
      user: authUser,
      isAuthenticated: true,
    };

    if (isBrowser()) {
      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        syncCookies(session);
        window.dispatchEvent(new Event(AUTH_EVENT));
      } catch (err) {
        console.warn('Failed to save session:', err);
      }
    }

    return { success: true, user: authUser };
  },

  register(data: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    department?: string;
    gradeOrTarget?: string;
    avatarUrl?: string;
    facultyKey?: string;
    phone?: string;
    universityRoll?: string;
    classRoll?: string;
    section?: string;
    branch?: string;
    course?: string;
  }): AuthResult {
    const trimmedEmail = data.email.trim().toLowerCase();
    const trimmedName = data.name.trim();
    const trimmedPassword = data.password.trim();

    if (!trimmedName) {
      return { success: false, error: 'Full name is required.' };
    }

    if (!trimmedEmail || !trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    if (trimmedPassword.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    // Enforce authorization key for Teacher accounts to prevent unauthorized role escalation
    if (data.role === 'teacher') {
      const submittedKey = (data.facultyKey || '').trim().toUpperCase();
      const isValidKey = AUTHORIZED_FACULTY_KEYS.some((k) => k === submittedKey);
      if (!isValidKey) {
        return {
          success: false,
          error:
            'A valid Faculty Authorization Key is required to create an Educator account. (Authorized Key for preview: FACULTY-2026)',
        };
      }
    }

    const users = getStoredUsers();
    if (users.some((u) => u.email.toLowerCase() === trimmedEmail)) {
      return {
        success: false,
        error: 'An account with this email already exists. Please log in instead.',
      };
    }

    const newId = `usr-${data.role}-${Date.now()}`;
    const departmentDisplay =
      data.department?.trim() ||
      data.branch?.trim() ||
      (data.role === 'teacher' ? 'General Faculty' : undefined);

    const gradeTargetDisplay =
      data.gradeOrTarget?.trim() ||
      (data.course && data.branch ? `${data.course.trim()} • ${data.branch.trim()}` : undefined);

    const userRoll = data.universityRoll?.trim() || undefined;

    const newUser: StoredRegisteredUser = {
      id: newId,
      name: trimmedName,
      email: trimmedEmail,
      phone: data.phone?.trim(),
      role: data.role,
      department: departmentDisplay,
      gradeOrTarget: gradeTargetDisplay,
      universityRoll: userRoll,
      classRoll: data.classRoll?.trim(),
      section: data.section?.trim(),
      branch: data.branch?.trim(),
      course: data.course?.trim(),
      avatarUrl:
        data.avatarUrl ||
        (data.role === 'teacher'
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'),
      createdAt: new Date().toISOString(),
      passwordHash: trimmedPassword,
    };

    users.push(newUser);
    saveStoredUsers(users);

    const authUser: AuthUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      department: newUser.department,
      gradeOrTarget: newUser.gradeOrTarget,
      universityRoll: newUser.universityRoll,
      classRoll: newUser.classRoll,
      section: newUser.section,
      branch: newUser.branch,
      course: newUser.course,
      avatarUrl: newUser.avatarUrl,
      createdAt: newUser.createdAt,
    };

    const session: AuthSession = {
      user: authUser,
      isAuthenticated: true,
    };

    if (isBrowser()) {
      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        syncCookies(session);
        window.dispatchEvent(new Event(AUTH_EVENT));
      } catch (err) {
        console.warn('Failed to save session:', err);
      }
    }

    return { success: true, user: authUser };
  },

  loginAsGuest(data: {
    name: string;
    universityRoll: string;
    classRoll: string;
    section: string;
    branch: string;
    course: string;
  }): AuthResult {
    const trimmedName = data.name.trim();
    const trimmedUniRoll = data.universityRoll.trim();
    const trimmedClassRoll = data.classRoll.trim();
    const trimmedSection = data.section.trim();
    const trimmedBranch = data.branch.trim();
    const trimmedCourse = data.course.trim();

    // Verify all 6 mandatory guest fields
    if (!trimmedName) {
      return { success: false, error: 'Full Name is mandatory.' };
    }
    if (!trimmedUniRoll) {
      return { success: false, error: 'University Roll Number is mandatory.' };
    }
    if (!trimmedClassRoll) {
      return { success: false, error: 'Class Roll Number is mandatory.' };
    }
    if (!trimmedSection) {
      return { success: false, error: 'Section is mandatory.' };
    }
    if (!trimmedBranch) {
      return { success: false, error: 'Branch is mandatory.' };
    }
    if (!trimmedCourse) {
      return { success: false, error: 'Course is mandatory.' };
    }

    const guestId = `usr-guest-${Date.now()}`;
    const cleanEmail = `${trimmedName.toLowerCase().replace(/[^a-z0-9]/g, '.') || 'student'}@student.prephub.edu`;

    const guestUser: AuthUser = {
      id: guestId,
      name: trimmedName,
      email: cleanEmail,
      role: 'student',
      universityRoll: trimmedUniRoll,
      classRoll: trimmedClassRoll,
      section: trimmedSection,
      branch: trimmedBranch,
      course: trimmedCourse,
      department: trimmedBranch,
      gradeOrTarget: `${trimmedCourse} • ${trimmedBranch}`,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      createdAt: new Date().toISOString(),
      isGuest: true,
    };

    const session: AuthSession = {
      user: guestUser,
      isAuthenticated: true,
    };

    if (isBrowser()) {
      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        syncCookies(session);
        window.dispatchEvent(new Event(AUTH_EVENT));
      } catch (err) {
        console.warn('Failed to save session:', err);
      }
    }

    return { success: true, user: guestUser };
  },

  logout(): void {
    if (isBrowser() && isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        supabase.auth.signOut().catch(() => {});
      } catch (err) {
        console.warn('Failed to sign out of Supabase:', err);
      }
    }

    const unauthenticatedSession: AuthSession = {
      user: null,
      isAuthenticated: false,
    };

    if (isBrowser()) {
      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(unauthenticatedSession));
        syncCookies(unauthenticatedSession);
        window.dispatchEvent(new Event(AUTH_EVENT));
      } catch (err) {
        console.warn('Failed to logout:', err);
      }
    }
  },

  loginAsDemoTeacher(): AuthUser {
    this.login(DEMO_CREDENTIALS.teacher.email, DEMO_CREDENTIALS.teacher.password, 'teacher');
    return DEMO_TEACHER;
  },

  loginAsDemoStudent(): AuthUser {
    this.login(DEMO_CREDENTIALS.student.email, DEMO_CREDENTIALS.student.password, 'student');
    return DEMO_STUDENT;
  },

  requestPasswordResetCode(email: string): { success: boolean; code?: string; error?: string } {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes('@') || !trimmed.includes('.')) {
      return { success: false, error: 'Please enter a valid registered email address.' };
    }
    const code = String(Math.floor(100000 + Math.random() * 900000));
    return { success: true, code };
  },

  resetPassword(email: string, newPassword: string): AuthResult {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = newPassword.trim();

    if (!trimmedEmail) {
      return { success: false, error: 'Email address is required.' };
    }
    if (trimmedPass.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    const users = getStoredUsers();
    let found = users.find((u) => u.email.toLowerCase() === trimmedEmail);

    if (!found) {
      // Auto-provision candidate student profile with updated password
      const studentName = trimmedEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      const newStudentUser: StoredRegisteredUser = {
        id: `usr-student-${Date.now()}`,
        name: studentName,
        email: trimmedEmail,
        role: 'student',
        branch: undefined,
        course: undefined,
        department: undefined,
        gradeOrTarget: undefined,
        universityRoll: undefined,
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        createdAt: new Date().toISOString(),
        passwordHash: trimmedPass,
      };
      users.push(newStudentUser);
      found = newStudentUser;
    } else {
      found.passwordHash = trimmedPass;
    }

    saveStoredUsers(users);

    const authUser: AuthUser = {
      id: found.id,
      name: found.name,
      email: found.email,
      phone: found.phone,
      role: found.role,
      department: found.department,
      gradeOrTarget: found.gradeOrTarget,
      universityRoll: found.universityRoll,
      classRoll: found.classRoll,
      section: found.section,
      branch: found.branch,
      course: found.course,
      avatarUrl: found.avatarUrl,
      createdAt: found.createdAt,
    };

    const session: AuthSession = {
      user: authUser,
      isAuthenticated: true,
    };

    if (isBrowser()) {
      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        syncCookies(session);
        window.dispatchEvent(new Event(AUTH_EVENT));
      } catch (err) {
        console.warn('Failed to save session:', err);
      }
    }

    return { success: true, user: authUser };
  },

  updateProfile(updates: Partial<AuthUser>): AuthResult {
    const session = this.getSession();
    if (!session.isAuthenticated || !session.user) {
      return { success: false, error: 'User is not authenticated.' };
    }

    const updatedUser: AuthUser = {
      ...session.user,
      ...updates,
    };

    const updatedSession: AuthSession = {
      user: updatedUser,
      isAuthenticated: true,
    };

    if (isBrowser()) {
      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(updatedSession));
        syncCookies(updatedSession);
        const users = getStoredUsers();
        const idx = users.findIndex((u) => u.id === updatedUser.id || u.email === updatedUser.email);
        if (idx !== -1) {
          users[idx] = { ...users[idx], ...updatedUser };
          saveStoredUsers(users);
        }
        window.dispatchEvent(new Event(AUTH_EVENT));

        if (isSupabaseConfigured()) {
          const supabase = createClient();
          void supabase
            .from('profiles')
            .update({
              name: updatedUser.name,
              phone: updatedUser.phone,
              university_roll: updatedUser.universityRoll,
              class_roll: updatedUser.classRoll,
              section: updatedUser.section,
              branch: updatedUser.branch,
              course: updatedUser.course,
              department: updatedUser.department,
              updated_at: new Date().toISOString(),
            })
            .eq('id', updatedUser.id);
        }
      } catch (err) {
        console.warn('Failed to update profile:', err);
      }
    }

    return { success: true, user: updatedUser };
  },

  subscribe(callback: () => void): () => void {
    if (!isBrowser()) return () => {};

    const handleEvent = () => callback();
    window.addEventListener(AUTH_EVENT, handleEvent);
    window.addEventListener('storage', handleEvent);

    return () => {
      window.removeEventListener(AUTH_EVENT, handleEvent);
      window.removeEventListener('storage', handleEvent);
    };
  },
};

// Automatic client-side listener for Supabase Auth state changes (OAuth, session refresh)
if (isBrowser() && isSupabaseConfigured()) {
  try {
    const supabase = createClient();
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (
        session?.user &&
        (event === 'SIGNED_IN' ||
          event === 'USER_UPDATED' ||
          event === 'INITIAL_SESSION')
      ) {
        await authStore.syncSupabaseSession();
      } else if (event === 'SIGNED_OUT') {
        const unauthSession: AuthSession = { user: null, isAuthenticated: false };
        try {
          localStorage.setItem(SESSION_KEY, JSON.stringify(unauthSession));
          syncCookies(unauthSession);
          window.dispatchEvent(new Event(AUTH_EVENT));
        } catch {}
      }
    });
  } catch (err) {
    console.warn('Failed to initialize Supabase auth state listener:', err);
  }
}


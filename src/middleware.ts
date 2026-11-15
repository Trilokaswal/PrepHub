import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Fast redirect for legacy student login
  if (pathname === '/student/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const sessionToken = request.cookies.get('prephub_session_token')?.value;
  const userRole = request.cookies.get('prephub_role')?.value;
  const hasLocalAuth = Boolean(sessionToken && userRole);

  // 2. Refresh Supabase session cookies if present
  const { supabaseResponse, user: supabaseUser } = await updateSession(request);

  const isAuthenticated = hasLocalAuth || Boolean(supabaseUser);
  const isTeacher =
    isAuthenticated &&
    (userRole === 'teacher' || (supabaseUser?.user_metadata?.role === 'teacher'));

  // 3. Protect /teacher workspace
  if (pathname.startsWith('/teacher') && !pathname.startsWith('/teacher/login')) {
    if (!isTeacher) {
      return NextResponse.redirect(new URL('/teacher/login', request.url));
    }
  }

  // 4. Protect platform study, exam & profile routes
  if (
    pathname.startsWith('/courses') ||
    pathname.startsWith('/test') ||
    pathname.startsWith('/tests') ||
    pathname.startsWith('/profile') ||
    (pathname.startsWith('/student') && pathname !== '/student/login')
  ) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/teacher/:path*',
    '/student/:path*',
    '/courses',
    '/courses/:path*',
    '/test/:path*',
    '/tests/:path*',
    '/profile',
    '/profile/:path*',
  ],
};

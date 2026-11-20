import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { AUTHORIZED_ADMIN_GMAIL } from '@/lib/questionBankStore';

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user || !user.email) {
      return NextResponse.json({
        isAdmin: false,
        isAuthenticated: false,
        email: null,
      });
    }

    const email = user.email.toLowerCase().trim();
    const isAdmin = email === AUTHORIZED_ADMIN_GMAIL.toLowerCase();

    return NextResponse.json({
      isAdmin,
      isAuthenticated: true,
      email: user.email,
      name: user.user_metadata?.name || user.email.split('@')[0],
      avatarUrl: user.user_metadata?.avatar_url || null,
    });
  } catch (err: any) {
    console.error('Admin auth check error:', err);
    return NextResponse.json(
      { isAdmin: false, isAuthenticated: false, error: err.message },
      { status: 500 }
    );
  }
}

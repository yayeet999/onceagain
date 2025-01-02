import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protected routes
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Auth routes (when already logged in)
  if (['/login', '/signup'].includes(req.nextUrl.pathname)) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return res;
}

// Specify which routes this middleware should run for
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
}; 
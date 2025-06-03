// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const isLoggedIn = !!token;
  const pathname = request.nextUrl.pathname;

  // Allow access to login page
  if (pathname === '/login') {
    return NextResponse.next();
  }

  // Block access to all other pages if not logged in
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

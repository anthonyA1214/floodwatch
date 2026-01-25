import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeJwt } from '@/lib/jwt';

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('access_token');
  const refreshToken = request.cookies.get('refresh_token');

  const { pathname } = request.nextUrl;

  const hasAnyToken = Boolean(accessToken || refreshToken);

  const isAuthPath = pathname.startsWith('/auth');
  const isProtectedPath = pathname.startsWith('/admin');

  if (isProtectedPath) {
    if (!accessToken) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const payload = decodeJwt(accessToken.value);

    if (!payload || payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  if (isAuthPath && hasAnyToken) {
    const payload = accessToken ? decodeJwt(accessToken.value) : null;

    if (payload?.role === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.redirect(new URL('/map', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*'],
};

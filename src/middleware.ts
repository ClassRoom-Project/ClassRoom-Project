import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { useUserRoleStore } from './store/mypage/userRoleStore';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (request.nextUrl.pathname.startsWith('/messages')) {
    if (!token) {
      return NextResponse.redirect(new URL('/hello', request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith('/payment')) {
    if (!token) {
      return NextResponse.redirect(new URL('/hello', request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith('/register')) {
    if (!token) {
      return NextResponse.redirect(new URL('/hello', request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith('/reserve')) {
    if (!token) {
      return NextResponse.redirect(new URL('/hello', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/hello')) {
    if (token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/teacherMypage')) {
    if (!token) {
      return NextResponse.redirect(new URL('/hello', request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith('/studentMypage')) {
    if (!token) {
      return NextResponse.redirect(new URL('/hello', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/messages/:path*',
    '/teacherMypage/:path*',
    '/studentMypage/:path*',
    '/payment/:path*',
    '/register/:path*',
    '/reserve/:path*',
    '/hello'
  ]
};

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;

  const loginRequiredPaths = ['/messages', '/payment', '/register', '/reserve', '/teacherMypage', '/studentMypage'];
  const isLoggedIn = token !== null;

  if (loginRequiredPaths.some((path) => pathname.startsWith(path))) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/hello', request.url));
    }
  }
  console.log('콘솔', token);
  if (pathname.startsWith('/hello') && isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url));
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

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // /messages 경로는 로그인한 사용자만 접근 가능
  if (request.nextUrl.pathname.startsWith('/messages')) {
    if (!token) {
      // 로그인하지 않았다면 로그인 페이지로 리다이렉트
      return NextResponse.redirect(new URL('/hello', request.url));
    }
  }

  // /hello 경로는 로그인하지 않은 사용자만 접근 가능
  if (request.nextUrl.pathname.startsWith('/hello')) {
    if (token) {
      // 로그인했다면 홈페이지로 리다이렉트
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/messages/:path*', '/hello']
};

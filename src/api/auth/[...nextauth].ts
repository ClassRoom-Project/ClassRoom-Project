import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { createClient } from '@supabase/supabase-js';
import GoogleProvider from 'next-auth/providers/google';
import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from 'next-auth/providers/kakao';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('SupabaseUrl undefined');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default NextAuth({
  providers: [
    EmailProvider({
      // 이메일 제공자 설정
      // 실제 사용 시 자세한 설정이 필요합니다.
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRENT!
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRENT!
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // 사용자의 계정 유형(선생님/학생)에 따른 로직을 구현합니다.
      // 예를 들어, 사용자가 선생님으로 가입하면 Supabase의 사용자 테이블에 admin을 true로 설정합니다.
      // 사용자를 Supabase 데이터베이스에 저장하는 로직을 추가합니다.
      return true;
    },
    async session({ session, token, user }) {
      // 세션 로직을 구현합니다.
      // 필요한 경우 Supabase에서 사용자 정보를 조회하여 세션에 추가 정보를 포함시킬 수 있습니다.
      return session;
    }
    // 필요한 다른 콜백을 추가합니다.
  }
  // 필요한 경우 추가적인 NextAuth 설정을 여기에 구성합니다.
});

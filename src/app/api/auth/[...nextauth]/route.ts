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

const handler = NextAuth({
  pages: {
    signIn: 'login'
  },
  providers: [
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: parseInt(process.env.EMAIL_SERVER_PORT || '465', 10), // 문자열을 숫자로 변환
    //     secure: process.env.EMAIL_SECURE === 'true',
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD
    //     }
    //   },
    //   from: process.env.EMAIL_FROM
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID! as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRENT! as string
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID! as string,
      clientSecret: process.env.NAVER_CLIENT_SECRENT! as string
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID! as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET! as string
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const newUser = {
        email: user.email,
        nickname: profile?.name || user.name,
        profile_image: profile?.image || user.image
      };
      return true;
    },
    async session({ session, token, user }) {
      if (user && session.user) {
        session.user.image = user.image;
        session.user.email = user.email;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };

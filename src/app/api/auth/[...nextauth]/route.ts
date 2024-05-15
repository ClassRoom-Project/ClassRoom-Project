import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from 'next-auth/providers/kakao';
import { supabase } from '../../supabase/supabase';

const handler = NextAuth({
  pages: {
    signIn: '/'
  },
  providers: [
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
      const { data: existingUser } = await supabase.from('users').select('email').eq('email', user.email).single();

      if (!existingUser) {
        const uuid = crypto.randomUUID();
        const { data, error } = await supabase.from('users').upsert({
          user_id: uuid,
          email: user.email,
          nickname: profile?.name || user.name,
          profile_image: profile?.image || user.image,
          isTeacher: false
        });
        return !error;
      }

      const getSession = async () => {
        const session = await supabase.auth.getSession();
      };
      return true;
    },
    // async session({ session, token, user }) {
    //   if (user && session.user) {
    //     session.user.image = user.image;
    //     session.user.email = user.email;
    //   }
    //   return session;
    // },
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    }
  }
});

export { handler as GET, handler as POST };

import { Metadata } from 'next';
import LoginPage from './_component/LoginPage';

export const metadata: Metadata = {
  title: '클룸 회원가입/로그인페이지',
  description: '클룸 소셜 회원가입/로그인 페이지입니다.'
};

export default async function Home() {
  return <LoginPage />;
}

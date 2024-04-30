import { Metadata } from 'next';
import LoginPage from './_component/LoginPage';
import loginMetadataImage from '@/assets/images/loginMetadataImage.png';

export const metadata: Metadata = {
  title: '클룸 회원가입/로그인페이지',
  description: '클룸 소셜 회원가입/로그인 페이지입니다.',
  keywords: ['OneDay Class', '원데이 클래스'],
  creator: 'Team BugBusters',
  openGraph: {
    title: '클룸',
    description: '다채로운 매력을 지닌 원데이 클래스들을 즐기기 위해 로그인을 해보세요!',
    images: [
      {
        url: '../../assets/images/loginMetadataImage.jpg',
        width: 500,
        height: 400
      }
    ],
    url: 'https://www.cl-room.com/hello',
    siteName: '클룸',
    locale: 'ko_KR',
    type: 'website'
  }
};

export default async function Home() {
  return <LoginPage />;
}

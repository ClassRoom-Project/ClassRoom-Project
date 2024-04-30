import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// import './globals.css';
import Header from '@/components/common/bars/Header';
import SideBar from '@/components/common/bars/SideBar';
import { ReactNode, Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: '클룸',
  description: '다채로운 매력을 지닌 원데이 클래스들을 즐겨보세요!',
  icons: {
    icon: '/logo.svg'
  },
  openGraph: {
    title: '클룸',
    description: '다채로운 매력을 지닌 원데이 클래스들을 즐겨보세요!',
    images: [
      {
        url: '../../assets/images/브로슈어 디자인 파이널.jpg',
        width: 500,
        height: 400
      }
    ],
    siteName: '클룸',
    locale: 'ko_KR',
    type: 'website'
  }
};

interface ClrmRootLayoutProps {
  children: ReactNode;
}

export default function ClrmRootLayout({ children }: ClrmRootLayoutProps) {
  return (
    <div>
      <SideBar>
        <Suspense>
          <Header />
        </Suspense>
        <div className="md:px-20">{children}</div>
      </SideBar>
    </div>
  );
}

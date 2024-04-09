import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// import './globals.css';
import Header from '@/components/common/bars/Header';
import SideBar from '@/components/common/bars/SideBar';
import { ReactNode, Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: '클룸',
  description: '원데이 클래스를 즐겨보세요~!'
};

interface ClrmRootLayoutProps {
  children: ReactNode;
}

export default function ClrmRootLayout({ children }: ClrmRootLayoutProps) {
  return (
    <div>
      <SideBar>
        <Header />
        <Suspense>{children}</Suspense>
      </SideBar>
    </div>
  );
}

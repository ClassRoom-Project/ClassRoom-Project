import { Metadata } from 'next';
import { ReactNode } from 'react';

interface LoginType {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: '클룸',
  description: '원데이 클래스를 즐겨보세요~!',
  icons: {
    icon: '/logo.svg'
  }
};

export default function Layout({ children }: LoginType) {
  return <div>{children}</div>;
}

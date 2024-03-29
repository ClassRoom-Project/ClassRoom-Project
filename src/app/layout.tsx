import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider } from './provider';
import Link from 'next/link';
import UserLayout from '@/components/common/UserLayout';
import BorderLayout from '@/components/common/BorderLayout';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};
export default function RootLayout({
  children,
  admin
}: Readonly<{
  children: React.ReactNode;
  admin: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <BorderLayout>
          <UserLayout />
          {/* Parallel Routes 여기에서 링크로 설정해주기 */}
          <Link href="/login"></Link>
          <QueryProvider>
            {children}
            {admin}
          </QueryProvider>
        </BorderLayout>
      </body>
    </html>
  );
}
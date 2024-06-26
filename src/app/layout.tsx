import { pretendard } from '@/utils/fonts/fonts';
import type { Metadata } from 'next';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';
import './globals.css';
import { QueryProvider } from './provider';

export const metadata: Metadata = {
  title: '클룸',
  description: 'Generated by create next app'
};

type Props = { children: React.ReactNode };

export default function RootLayout({ children }: Props) {
  const mapScriptSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`;
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body>
        <QueryProvider>
          <ToastContainer />
          {children}
          <Script src={mapScriptSrc} strategy="beforeInteractive" />
        </QueryProvider>
      </body>
    </html>
  );
}

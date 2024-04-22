import type { Metadata } from 'next';
import { IBM_Plex_Sans_KR, Inter, Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import { QueryProvider } from './provider';
import Script from 'next/script';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

const noto = Noto_Sans_KR({
  subsets: ['latin'] // 또는 preload: false
});
// const noto = IBM_Plex_Sans_KR({
//   subsets: ['latin'],
//   weight: '400' // 또는 preload: false
// });

type Props = { children: React.ReactNode };

export default function RootLayout({ children }: Props) {
  const mapScriptSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`;
  return (
    <html lang="ko">
      <body className={noto.className}>
        <QueryProvider>
          <ReactQueryDevtools initialIsOpen={true} />
          <ToastContainer />
          <div className="md:px-20">{children}</div>
          <Script src={mapScriptSrc} strategy="beforeInteractive" />
        </QueryProvider>
      </body>
    </html>
  );
}

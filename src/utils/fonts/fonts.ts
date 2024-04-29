import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    {
      path: './PretendardVariable.woff2',
      weight: '400'
    },
    {
      path: './PretendardVariable.woff2',
      weight: '700'
    }
  ],
  variable: '--font-pretendard'
});

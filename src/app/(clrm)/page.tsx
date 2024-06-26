import React, { Suspense } from 'react';
import BestClass from '@/components/main/BestClass';
import LatestClass from '@/components/main/LatestClass';
import { Banner } from '@/components/main/Banner';
import CategoryBtns from '@/components/listpage/CategoryBtns';
import MainFooter from '@/components/main/MainFooter';
import { ChatBubble } from '@/components/main/ChatBubble';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '클룸',
  description: '다채로운 매력을 지닌 원데이 클래스들을 즐겨보세요!',
  keywords: ['OneDay Class', '원데이 클래스'],
  creator: 'Team BugBusters',
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
    url: 'https://www.cl-room.com/',
    siteName: '클룸',
    locale: 'ko_KR',
    type: 'website'
  }
};

const MainPage = () => {
  return (
    <div className="responsiveHeight h-screen">
      <div className="flex items-center justify-center overflow-y-auto">
        <div className="relative mb-16 flex min-h-screen w-full max-w-[1440px] flex-col items-center gap-2 md:mb-0">
          <Banner />
          <Suspense>
            <CategoryBtns />
          </Suspense>
          <BestClass />
          <LatestClass />
          <MainFooter />
          <ChatBubble />
        </div>
      </div>
    </div>
  );
};

export default MainPage;

import ClassList from '@/components/listpage/ClassList';
import SearchFilter from '@/components/listpage/SearchFilter';
import CategoryBtns from '@/components/listpage/CategoryBtns';
import MoveToTopBtn from '@/components/listpage/MoveToTopBtn';
import { Suspense } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '클룸 리스트페이지',
  description: '다채로운 매력을 지닌 원데이 클래스들을 즐겨보세요!',
  keywords: ['OneDay Class', '원데이 클래스'],
  creator: 'Team BugBusters',
  openGraph: {
    images: [
      {
        url: '../../assets/images/브로슈어 디자인 파이널.jpg',
        width: 500,
        height: 400
      }
    ],
    title: '클룸 리스트페이지',
    description: '다채로운 매력을 지닌 원데이 클래스들을 즐겨보세요!',
    url: 'https://www.cl-room.com/list',
    siteName: '클룸',
    locale: 'ko_KR',
    type: 'website'
  }
};

export default function ListPage() {
  return (
    <div className="responsiveHeight h-screen">
      <div className="flex items-center justify-center">
        <div className="flex w-full max-w-[1440px] flex-col items-center justify-center gap-2 md:gap-5">
          <Suspense>
            <CategoryBtns />
            <SearchFilter />
            <ClassList />
          </Suspense>
          <MoveToTopBtn />
        </div>
      </div>
    </div>
  );
}

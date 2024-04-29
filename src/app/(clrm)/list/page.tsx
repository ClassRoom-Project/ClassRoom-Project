import ClassList from '@/components/listpage/ClassList';
import SearchFilter from '@/components/listpage/SearchFilter';
import CategoryBtns from '@/components/listpage/CategoryBtns';
import MoveToTopBtn from '@/components/listpage/MoveToTopBtn';
import { Suspense } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '클룸 listPage',
  description: '전체 클래스를 볼 수 있으며, 제공되는 필터를 통해 검색할 수 있습니다.'
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

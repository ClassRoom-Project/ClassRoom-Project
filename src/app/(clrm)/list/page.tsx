import ClassList from '@/components/listpage/ClassList';
import SearchFilter from '@/components/listpage/SearchFilter';
import CategoryBtns from '@/components/listpage/CategoryBtns';
import MoveToTopBtn from '@/components/listpage/MoveToTopBtn';
import { Suspense } from 'react';
export default function ListPage() {
  return (
    <div className=" flex items-center justify-center">
      <div className="flex w-full max-w-[1440px] flex-col items-center justify-center">
        <Suspense>
          <CategoryBtns />
          <SearchFilter />
          <ClassList />
        </Suspense>
        <MoveToTopBtn />
      </div>
    </div>
  );
}

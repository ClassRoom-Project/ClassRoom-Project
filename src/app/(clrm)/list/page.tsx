import ClassList from '@/components/listpage/ClassList';
import SearchFilter from '@/components/listpage/SearchFilter';
import CategoryBtns from '@/components/listpage/CategoryBtns';
import MoveToTopBtn from '@/components/listpage/MoveToTopBtn';
import { Suspense } from 'react';
export default function ListPage() {
  return (
    <div className=" flex justify-center items-center">
      <div className="flex flex-col w-full items-center justify-center max-w-[1440px]">
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

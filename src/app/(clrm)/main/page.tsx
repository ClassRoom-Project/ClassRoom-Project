import React, { Suspense } from 'react';
import BestClass from '@/components/main/BestClass';
import DeadlineClass from '@/components/main/DeadlineClass';
import LatestClass from '@/components/main/LatestClass';
import { Banner } from '@/components/main/Banner';
import CategoryBtns from '@/components/listpage/CategoryBtns';
const MainPage = () => {
  return (
    <div className=" flex items-center justify-center">
      <div className="relative flex min-h-screen w-full max-w-[1440px] flex-col items-center justify-center gap-10">
        <Banner />
        <Suspense>
          <CategoryBtns />
        </Suspense>
        <BestClass />
        <DeadlineClass />
        <LatestClass />
      </div>
    </div>
  );
};

export default MainPage;

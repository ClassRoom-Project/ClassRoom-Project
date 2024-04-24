import React, { Suspense } from 'react';
import BestClass from '@/components/main/BestClass';
import DeadlineClass from '@/components/main/DeadlineClass';
import LatestClass from '@/components/main/LatestClass';
import { Banner } from '@/components/main/Banner';
import CategoryBtns from '@/components/listpage/CategoryBtns';
const MainPage = () => {
  return (
    <div className=" flex justify-center items-center">
      <div className="flex flex-col items-center justify-center min-h-screen relative gap-10 w-full max-w-[1440px]">
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

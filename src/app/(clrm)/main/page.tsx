import React, { Suspense } from 'react';
import BestClass from '@/components/main/BestClass';
import DeadlineClass from '@/components/main/DeadlineClass';
import LatestClass from '@/components/main/LatestClass';
import { Banner } from '@/components/main/Banner';
import CategoryBtns from '@/components/listpage/CategoryBtns';
const MainPage = () => {
  return (
    <div className="flex flex-col mb-20 items-center justify-center min-h-screen relative gap-10 md:mb-0">
      <Banner />
      <Suspense>
        <CategoryBtns />
      </Suspense>
      <BestClass />
      <LatestClass />
    </div>
  );
};

export default MainPage;

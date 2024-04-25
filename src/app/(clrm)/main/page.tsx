import React, { Suspense } from 'react';
import BestClass from '@/components/main/BestClass';
import LatestClass from '@/components/main/LatestClass';
import { Banner } from '@/components/main/Banner';
import CategoryBtns from '@/components/listpage/CategoryBtns';

const MainPage = () => {
  return (
    <div className="responsiveHeight h-screen">
      <div className="flex items-center justify-center">
        <div className="relative flex min-h-screen w-full max-w-[1440px] flex-col items-center gap-10">
          <Banner />
          <Suspense>
            <CategoryBtns />
          </Suspense>
          <BestClass />
          <LatestClass />
        </div>
      </div>
    </div>
  );
};

export default MainPage;

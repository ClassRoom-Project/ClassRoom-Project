import React, { Suspense } from 'react';
import BestClass from '@/components/main/BestClass';
import LatestClass from '@/components/main/LatestClass';
import { Banner } from '@/components/main/Banner';
import CategoryBtns from '@/components/listpage/CategoryBtns';
import MainFooter from '@/components/main/MainFooter';

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
        </div>
      </div>
    </div>
  );
};

export default MainPage;

import React from 'react';
import BestClass from '@/components/main/BestClass';
import DeadlineClass from '@/components/main/DeadlineClass';
import LatestClass from '@/components/main/LatestClass';
import { Banner } from '@/components/main/Banner';
import CategoryBtns from '@/components/listpage/CategoryBtns';
const MainPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10 p-5">
      <Banner />
      <CategoryBtns />
      <BestClass />
      <DeadlineClass />
      <LatestClass />
    </div>
  );
};

export default MainPage;

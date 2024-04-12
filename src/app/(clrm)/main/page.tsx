import React from 'react';
import BestClass from '@/components/main/BestClass';
import DeadlineClass from '@/components/main/DeadlineClass';
import LatestClass from '@/components/main/LatestClass';

const MainPage = () => {
  return (
    <div className="items-center p-[30px] justify-center grid min-h-screen">
      <BestClass />
      <DeadlineClass />
      <LatestClass />
    </div>
  );
};

export default MainPage;

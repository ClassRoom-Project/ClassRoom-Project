import React from 'react';
import BestClass from '@/components/main/BestClass';

import LatestClass from '@/components/main/LatestClass';
const MainPage = () => {
  return (
    <div className=" items-center p-[30px] justify-center grid min-h-screen bg-[#FFF0EF]">
      <LatestClass />
      <BestClass />
    </div>
  );
};

export default MainPage;

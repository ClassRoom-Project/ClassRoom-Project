import React from 'react';
import BestClass from '@/components/main/BestClass';
import D1Class from '@/components/main/D1Class';
import LatestClass from '@/components/main/LatestClass';
const MainPage = () => {
  return (
    <div className=" items-center p-[30px] justify-center grid min-h-screen bg-[#FFF0EF]">
      <D1Class />
      <LatestClass />
      <BestClass />
    </div>
  );
};

export default MainPage;

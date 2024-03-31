import React from 'react';
import ClassCard from '@/components/main/ClassCard';
import BestClass from '@/components/main/BestClass';
import D1Class from '@/components/main/D1Class';
import LatestClass from '@/components/main/LatestClass';
const MainPage = () => {
  return (
    <div className=" items-center justify-center grid">
      <D1Class />
      <LatestClass />
      <BestClass />
    </div>
  );
};

export default MainPage;

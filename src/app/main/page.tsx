import React from 'react';
import ClassCard from '@/components/main/ClassCard';
import BestClass from '@/components/main/BestClass';
import D1Class from '@/components/main/D1Class';
import LatestClass from '@/components/main/LatestClass';
const MainPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <D1Class />
      <LatestClass />
      <BestClass />
    </div>
  );
};

export default MainPage;

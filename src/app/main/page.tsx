import React from 'react';
import ClassCard from '@/components/main/ClassCard';
const MainPage = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between">
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-4">
            신규 클래스
            <ClassCard />
          </h2>
          <div className="flex space-x-4 overflow-x-auto"></div>
        </div>
      </div>

      <div className="flex justify-between my-8">
        <div className="w-full">
          <div className="flex space-x-4 overflow-x-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;

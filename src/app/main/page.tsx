import React from 'react';

const MainPage = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between">
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-4">신규 클래스</h2>
          <div className="flex space-x-4 overflow-x-auto">
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
        </div>
      </div>
      <div className="flex justify-between my-8">
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-4">인기 클래스</h2>
          <div className="flex space-x-4 overflow-x-auto">
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;

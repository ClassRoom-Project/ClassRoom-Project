import React from 'react';

const NavigationButtons = () => {
  return (
    <div className="flex gap-32">
      <button className="bg-white w-48 p-4 text-center self-end">메인페이지 바로가기</button>
      <button className="bg-white w-48 p-4 text-center self-end">예약 상세 보기</button>
    </div>
  );
};

export default NavigationButtons;

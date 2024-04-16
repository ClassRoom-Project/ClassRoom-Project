import Link from 'next/link';
import React from 'react';

const NavigationButtons = () => {
  //   ? 'bg-point-purple text-white hover:bg-button-hover-color'
  // : 'bg-white hover:bg-background-color hover:border-button-focus-color'

  return (
    <div className="flex gap-8">
      <Link
        href="/"
        className="btn bg-white border border-button-focus-color  border-solid w-48 p-4 text-center self-end hover:bg-background-color hover:border-button-default-color"
      >
        홈 바로가기
      </Link>
      <Link
        href="/mypage?studentMypage=reservedClass"
        className="btn bg-point-purple  text-white font-normal w-48 p-4 text-center self-end hover:bg-button-hover-color"
      >
        예약 상세 보기
      </Link>
    </div>
  );
};

export default NavigationButtons;

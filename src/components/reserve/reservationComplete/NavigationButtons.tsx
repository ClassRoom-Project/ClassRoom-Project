import Link from 'next/link';
import React from 'react';

const NavigationButtons = () => {
  return (
    <div className="flex gap-8">
      <Link href="/" className="btn bg-white border border-point-purple  border-solid w-48 p-4 text-center self-end">
        홈 바로가기
      </Link>
      <Link
        href="/mypage?studentMypage=reservedClass"
        className="btn bg-point-purple  text-white font-normal w-48 p-4 text-center self-end"
      >
        예약 상세 보기
      </Link>
    </div>
  );
};

export default NavigationButtons;

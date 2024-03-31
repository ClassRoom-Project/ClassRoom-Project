import Link from 'next/link';
import React from 'react';

const NavigationButtons = () => {
  return (
    <div className="flex gap-32">
      <Link href="/" className="bg-white w-48 p-4 text-center self-end">
        메인페이지 바로가기
      </Link>
      <Link href="/mypage" className="bg-white w-48 p-4 text-center self-end">
        예약 상세 보기
      </Link>
    </div>
  );
};

export default NavigationButtons;

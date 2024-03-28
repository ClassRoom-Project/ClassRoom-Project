'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const ReserveButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push('reserve/rid=ba59530d-a840-443a-937c-53f10a9c8a93');
      }}
      className="bg-white w-32 text-center self-end"
    >
      예약하기
    </button>
  );
};

export default ReserveButton;

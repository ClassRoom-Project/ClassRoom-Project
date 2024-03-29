'use client';

import useReserveClass from '@/store/reserveClassStore';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useStore } from 'zustand';

const ReserveButton = () => {
  const router = useRouter();
  // 인원 0 일때 alert 로직 필요
  // 예약 정보 맞는지 한번더 확인해주는거 있으면 좋을듯
  // => 모달창으로 정보 한번더 보여주거나, 그냥 정보 맞는지 확인하세요 정도

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

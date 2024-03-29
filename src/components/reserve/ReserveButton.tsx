'use client';

import { submitReservation } from '@/api/supabase/submitReservation';
import useReserveStore from '@/store/reserveClassStore';
import { useRouter } from 'next/navigation';
import React from 'react';

const ReserveButton = () => {
  const router = useRouter();

  const reserveInfo = useReserveStore((state) => state.reserveInfo);

  const handleReserveButtonClick = () => {
    console.log(reserveInfo);
    // router.push('reserve/rid=ba59530d-a840-443a-937c-53f10a9c8a93');
    submitReservation(reserveInfo);
  };

  return (
    <button onClick={handleReserveButtonClick} className="bg-white w-32 text-center self-end">
      예약하기
    </button>
  );
};

export default ReserveButton;

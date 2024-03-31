'use client';

import { submitReservation } from '@/api/supabase/submitReservation';
import useReserveStore from '@/store/reserveClassStore';
import { useRouter } from 'next/navigation';
import React from 'react';

const ReserveButton = ({ maxPeople }: { maxPeople: number }) => {
  const router = useRouter();

  const reserveInfo = useReserveStore((state) => state.reserveInfo);

  const handleReserveButtonClick = () => {
    if (reserveInfo.reserveQuantity === 0) {
      alert('예약 인원은 1명 이상이여야 합니다.');
      return;
    }

    if (
      window.confirm(` 예약 정보가 맞는지 확인해주세요. 이대로 예약하시겠습니까?
    예약 일자 : ${reserveInfo.reserveDate} ${reserveInfo.reserveTime.slice(0, 5)} 
    인원 : ${reserveInfo.reserveQuantity}명
    금액 : ${reserveInfo.reservePrice.toLocaleString('ko-KR')}원
    `)
    ) {
      submitReservation(reserveInfo);
      router.push('reserve/ba59530d-a840-443a-937c-53f10a9c8a93');
    }
    return;
  };

  return (
    <button onClick={handleReserveButtonClick} className="bg-white w-32 text-center self-end">
      예약하기
    </button>
  );
};

export default ReserveButton;

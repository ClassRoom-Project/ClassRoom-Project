'use client';

import { fetchReserveInfo } from '@/api/supabase/fetchReserveInfo';
import { submitReservation } from '@/api/supabase/submitReservation';
import useReserveStore from '@/store/reserveClassStore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ReserveButton = ({ maxPeople }: { maxPeople: number }) => {
  const router = useRouter();

  const reserveInfo = useReserveStore((state) => state.reserveInfo);

  const handleReserveButtonClick = async () => {
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
      const result = await submitReservation(reserveInfo);
      if (!result) {
        alert('예약 도중 오류가 발생했습니다. 잠시 후 다시 시도해주세요,');
        return;
      }
      router.push(`reserve/${result.reserve_id}`);
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

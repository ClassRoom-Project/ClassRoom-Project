'use client';

import { updateReservedUser } from '@/app/api/reserve/updateReservedUser';
import { submitReservation } from '@/app/api/reserve/submitReservation';
import useReserveStore from '@/store/reserveClassStore';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const ReserveButton = ({ maxPeople, classId }: { maxPeople: number; classId: string }) => {
  const router = useRouter();

  const { setReserveInfo, reserveInfo } = useReserveStore((state) => ({
    setReserveInfo: state.setReserveInfo,
    reserveInfo: state.reserveInfo
  }));

  useEffect(() => {
    setReserveInfo({ classId: classId });
  }, [classId, setReserveInfo]);

  // 예약 버튼 클릭
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
      // result: supabase의 응답으로 받아온 제출한 예약 정보
      const result = await submitReservation(reserveInfo);

      // class 테이블의 reserved_user_id 에 예약한 유저 아이디 리스트 업데이트
      updateReservedUser({ userId: '223e4567-e89b-12d3-a456-426614174002', classId });

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

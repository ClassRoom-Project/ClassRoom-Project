'use client';

import { increaseReservedCount } from '@/app/api/reserve/updateReservationCounts';
import { submitReservation } from '@/app/api/reserve/submitReservation';
import { updateReservedUserList } from '@/app/api/reserve/updateReservedUserList';
import useReserveStore from '@/store/reserveClassStore';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { fetchReservedCount } from '@/app/api/reserve/fetchReserveClassInfo';
import { fetchReservedUserIds } from '@/app/api/reserve/fetchReservedUserIds';

const ReserveButton = ({ classId, remainingQuantity }: { classId: string; remainingQuantity: number }) => {
  const router = useRouter();

  const { setReserveInfo, reserveInfo } = useReserveStore();

  useEffect(() => {
    setReserveInfo({ classId: classId });
  }, [classId, setReserveInfo]);

  // 예약 버튼 클릭
  const handleReserveButtonClick = async () => {
    if (reserveInfo.reserveQuantity === 0) {
      alert('예약 인원은 1명 이상이여야 합니다.');
      return;
    }

    const currentRemaininQuantity = await fetchReservedCount(classId);
    fetchReservedUserIds({ classId });

    // 예약 버튼을 눌렀을 때 한번 더 체크 => 서버에서 fetch하여 다시 체크?
    if (remainingQuantity < reserveInfo.reserveQuantity) {
      alert('자리가 다찼어용'); // 확인을 위한 임시 alert
      return;
    }

    // result: supabase의 응답으로 받아온 제출한 예약 정보
    const result = await submitReservation(reserveInfo);

    if (!result) {
      alert('예약 도중 오류가 발생했습니다. 잠시 후 다시 시도해주세요,');
      return;
    }

    // class 테이블의 reserved_user_id 에 예약한 유저 아이디 리스트 업데이트
    await updateReservedUserList({ userId: '223e4567-e89b-12d3-a456-426614174002', classId });

    // class 테이블의 reserved_count 에 예약한 인원 수 업데이트
    await increaseReservedCount({ classId, quantity: reserveInfo.reserveQuantity });

    router.push(`reserve/${result.reserve_id}`);
  };

  return (
    <button onClick={handleReserveButtonClick} className="bg-white w-32 text-center self-end">
      예약하기
    </button>
  );
};

export default ReserveButton;

'use client';

import { increaseReservedCount } from '@/app/api/reserve/updateReservationCounts';
import { submitReservation } from '@/app/api/reserve/submitReservation';
import { updateReservedUserList } from '@/app/api/reserve/updateReservedUserList';
import useReserveStore from '@/store/reserveClassStore';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { fetchReservedCount } from '@/app/api/reserve/fetchReserveClassInfo';
import { changes } from '@/app/api/reserve/subscribeCount';
import { supabase } from '@/app/api/supabase/supabase';

const ReserveButton = ({ classId, maxPeople }: { classId: string; maxPeople: number }) => {
  const router = useRouter();

  const { setReserveInfo, reserveInfo } = useReserveStore();

  useEffect(() => {
    setReserveInfo({ classId: classId });

    // const channel = supabase
    //   .channel('table-db-changes')
    //   .on(
    //     'postgres_changes',
    //     {
    //       event: '*',
    //       schema: 'public',
    //       table: 'class'
    //     },
    //     (payload) => console.log(payload.new.reserved_count)
    //   )
    //   .subscribe();

    // return () => {
    //   supabase.removeChannel(channel);
    // };
  }, [classId, setReserveInfo]);

  // 예약 버튼 클릭
  const handleReserveButtonClick = async () => {
    if (reserveInfo.reserveQuantity === 0) {
      alert('예약 인원은 1명 이상이여야 합니다.');
      return;
    }

    // 예약 버튼을 눌렀을 때 count만 fetch해서 한번 더 체크
    const currentReservedQuantity = await fetchReservedCount(classId);

    if (currentReservedQuantity) {
      // 예약 버튼을 눌렀을 때의 남은 자리
      const currentRemainingQuantity = maxPeople - currentReservedQuantity;

      // 현재 남은 자리가 사용자가 선택한 인원수보다 적으면
      if (currentRemainingQuantity < reserveInfo.reserveQuantity) {
        alert('정원 초과로 인해 예약할 수 없습니다. '); // 확인을 위한 임시 alert
        router.refresh();
        return;
      }
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

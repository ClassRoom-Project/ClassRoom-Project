'use client';

import { increaseReservedCount } from '@/app/api/reserve/updateReservationCounts';
import { newSubmit, submitReservation } from '@/app/api/reserve/submitReservation';
import useReserveStore from '@/store/reserveClassStore';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { fetchReservedCount } from '@/app/api/reserve/fetchReserveClassInfo';
import { useLoginStore } from '@/store/login/LoginUserIdStore';
import { userId } from '@/app/(clrm)/mypage/page';
import { fetchReservationDetails } from '@/app/api/reserve/fetchReservationDetails';

const ReserveButton = ({ classId, maxPeople }: { classId: string; maxPeople: number }) => {
  const router = useRouter();
  const { setReserveInfo, reserveInfo } = useReserveStore();

  const { loginUserId } = useLoginStore();
  console.log('🚀 ~ ReserveButton ~ loginUserId:', loginUserId);

  useEffect(() => {
    setReserveInfo({ classId: classId, userId: loginUserId });
  }, [classId, setReserveInfo, loginUserId]);

  const handleReserveButtonClick = async () => {
    if (reserveInfo.reserveQuantity === 0) {
      alert('예약 인원은 1명 이상이여야 합니다.');
      return;
    }

    // 예약 버튼을 눌렀을 때 count만 fetch해서 한번 더 체크
    const currentReservedQuantity = await fetchReservedCount(classId);

    if (currentReservedQuantity) {
      const currentRemainingQuantity = maxPeople - currentReservedQuantity;

      // 현재 남은 자리가 사용자가 선택한 인원수보다 적으면
      if (currentRemainingQuantity < reserveInfo.reserveQuantity) {
        alert('정원 초과로 인해 예약할 수 없습니다. ');
        router.refresh();
        return;
      }
    }

    // reservationId: supabase의 응답으로 받아온 제출한 예약 정보의 아이디
    // const reservationId = await submitReservation(reserveInfo);
    const reservationId = await newSubmit(reserveInfo);
    if (!reservationId) {
      alert('예약 도중 오류가 발생했습니다. 잠시 후 다시 시도해주세요,');
      return;
    }
    const reservationDetails = await fetchReservationDetails(reservationId);

    if (!reservationDetails || !('class' in reservationDetails)) {
      // 예외 처리 로직
      console.error('faild to fetch reservationDtails in ReserveButton', Error);
      return;
    }

    const { class: classDetails, reserveDate, reserveTime, reserveQuantity, reservePrice } = reservationDetails;
    const userEmail = sessionStorage.getItem('userEmail');

    console.log('제발', loginUserId, classDetails, reserveDate, reserveTime, reserveQuantity, reservePrice);

    // class 테이블의 reserved_count 에 예약한 인원 수 업데이트
    await increaseReservedCount({ classId, quantity: reserveInfo.reserveQuantity });
    // router.push(`reserve/${reservationId}`);
    // router.push(`reserve/${reservationId}payment?customerKey=${userId}`);
    // router.replace(
    //   `/payment?customerKey=${loginUserId}&title=${classDetails.title}&price=${reservePrice}&userEmail=${userEmail}&goToClassDate=${reserveDate}&useClassTime=${reserveTime}&totalPerson=${reserveQuantity}`
    // );
  };

  return (
    <button onClick={handleReserveButtonClick} className="bg-white w-32 text-center self-end">
      예약하기
    </button>
  );
};

export default ReserveButton;

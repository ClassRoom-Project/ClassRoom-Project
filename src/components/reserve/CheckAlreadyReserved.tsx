'use client';

import { checkIsReserved } from '@/app/api/reserve/checkIsReserved';
import { useLoginStore } from '@/store/login/LoginUserIdStore';
import React from 'react';

// 이미 예약한 클래스 인지 확인을 위한 임시 컴포넌트 => 디테일 페이지에서 예약하기 버튼을 누르면 실행될 로직
const CheckAlreadyReserved = ({ classId }: { classId: string }) => {
  const { loginUserId } = useLoginStore();

  const handleCheckButtonClick = async () => {
    if (loginUserId) {
      const isReserved = await checkIsReserved({ userId: loginUserId, classId });

      return isReserved ? alert('네') : alert('아니요?');
    }
  };

  return <button onClick={handleCheckButtonClick}>이미 예약한 클래스일까요?</button>;
};

export default CheckAlreadyReserved;

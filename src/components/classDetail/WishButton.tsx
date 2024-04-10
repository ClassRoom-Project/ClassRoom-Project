'use client';

import { useAddWishMutation } from '@/hooks/useWish/mutateWish';
import { useCheckIsWishedQuery } from '@/hooks/useWish/useWish';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import React from 'react';

const WishButton = ({ classId }: { classId: string | undefined }) => {
  const addWishMutation = useAddWishMutation();
  const { loginUserId } = useLoginStore();

  const { data: isWished, isLoading, isError } = useCheckIsWishedQuery({ userId: loginUserId, classId });

  const handleWishClick = () => {
    //필요한거 유저아이디, 클래스아이디
    if (loginUserId && classId) {
      if (!isWished) {
        try {
          addWishMutation.mutate({ userId: loginUserId, classId });
        } catch (error) {
          alert('위시 추가 오류 😴');
          console.log(error);
        }
      } else {
        // 스크랩 캔슬 딜리트
      }
    }
  };

  return (
    <button onClick={handleWishClick} className="btn justify-end bg-rose-200">
      ❤️
    </button>
  );
};

export default WishButton;

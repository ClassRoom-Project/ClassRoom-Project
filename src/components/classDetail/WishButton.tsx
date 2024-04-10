'use client';

import { useAddWishMutation } from '@/hooks/useWish/mutateWish';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import React from 'react';

const WishButton = ({ classId }: { classId: string }) => {
  const addWishMutation = useAddWishMutation();
  const { loginUserId } = useLoginStore();

  console.log(loginUserId);

  const handleWishClick = () => {
    //필요한거 유저아이디, 클래스아이디
    if (loginUserId) {
      try {
        addWishMutation.mutate({ userId: loginUserId, classId });
      } catch (error) {
        alert('위시 추가 오류');
        console.log(error);
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

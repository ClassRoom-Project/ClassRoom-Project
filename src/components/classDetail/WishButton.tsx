'use client';

import { useAddWishMutation, useCancleWishMutation } from '@/hooks/useWish/mutateWish';
import { useCheckIsWishedQuery } from '@/hooks/useWish/useWish';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useRouter } from 'next/navigation';
import React from 'react';
import { GoHeart } from 'react-icons/go';
import { GoHeartFill } from 'react-icons/go';

const WishButton = ({ classId }: { classId: string | undefined }) => {
  const router = useRouter();
  const addWishMutation = useAddWishMutation();
  const cancleWishMutation = useCancleWishMutation();
  const { loginUserId } = useLoginStore();

  const { data: isWished, isLoading, isError } = useCheckIsWishedQuery({ userId: loginUserId, classId });

  const handleWishClick = () => {
    //TODO: confirm창 모달로 변경
    if (!loginUserId) {
      if (typeof window !== 'undefined' && window.confirm('로그인이 필요한 기능입니다. 로그인하시겠습니까?')) {
        router.push('/hello');
      } else return;
    }
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
        try {
          cancleWishMutation.mutate({ userId: loginUserId, classId });
        } catch (error) {
          alert('위시 취소 오류.');
        }
      }
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>로딩중</p>
      ) : (
        <div>
          <button onClick={handleWishClick} className={`btn justify-end ${isWished ? 'bg-rose-200' : 'bg-gray-200'}`}>
            {isWished ? '찜했음' : '찜하기'}
            <span>{isWished ? <GoHeartFill color="red" /> : <GoHeart />}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default WishButton;

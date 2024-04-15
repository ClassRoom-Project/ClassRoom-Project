'use client';

import { useAddWishMutation, useCancelWishMutation } from '@/hooks/useWish/mutateWish';
import { useCheckIsWishedQuery, useCountWishQuery } from '@/hooks/useWish/useWish';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { GoHeart } from 'react-icons/go';
import { GoHeartFill } from 'react-icons/go';
import { addWish, cancelWish, defaultWarning } from '../common/Toastify';
import { countWish } from '@/app/api/wish/wishApi';

const DetailWishButton = ({ classId }: { classId: string | undefined }) => {
  const router = useRouter();
  const addWishMutation = useAddWishMutation();
  const cancelWishMutation = useCancelWishMutation();
  const { loginUserId } = useLoginStore();
  const { data: isWished, isLoading, isError } = useCheckIsWishedQuery({ userId: loginUserId, classId });
  const [isWishedState, setIsWishedState] = useState<boolean>();
  const { data: wishCount, isLoading: isCountLoading, isError: isCountError } = useCountWishQuery(classId);

  console.log(wishCount, 'wishCount');

  useEffect(() => {
    setIsWishedState(isWished);
  }, [isWished]);

  const handleWishClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    //TODO: confirm창 모달로 변경
    if (!loginUserId) {
      if (typeof window !== 'undefined' && window.confirm('로그인 후 이용 가능합니다.. 로그인하시겠습니까?')) {
        router.push('/hello');
      } else return;
    }

    if (loginUserId && classId) {
      if (!isWished) {
        try {
          addWishMutation.mutate({ userId: loginUserId, classId });
          addWish();
        } catch (error) {
          defaultWarning();
          console.log(error);
        }
      } else {
        try {
          cancelWishMutation.mutate({ userId: loginUserId, classId });
          cancelWish();
        } catch (error) {
          defaultWarning();
          console.log(error);
        }
      }
    }
  };

  return (
    <div className=" h-[20px]">
      {isLoading ? (
        <p></p>
      ) : (
        <button onClick={(e) => handleWishClick(e)} className="flex">
          <span>{isWished ? <GoHeartFill color="red" size={20} /> : <GoHeart color="dimgray" size={20} />}</span>
          <span>{!isLoading ? wishCount : 0}</span>
        </button>
      )}
    </div>
  );
};

export default DetailWishButton;

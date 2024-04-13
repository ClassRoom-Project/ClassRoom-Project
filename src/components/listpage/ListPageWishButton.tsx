'use client';

import { useAddWishMutation, useCancleWishMutation } from '@/hooks/useWish/mutateWish';
import { useCheckIsWishedQuery } from '@/hooks/useWish/useWish';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { ClassAllType } from '@/types/class';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { GoHeart } from 'react-icons/go';
import { GoHeartFill } from 'react-icons/go';

const ListPageWishButton = ({ classId, wishInfo }: { classId: string | undefined; wishInfo: ClassAllType['wish'] }) => {
  const router = useRouter();
  const addWishMutation = useAddWishMutation();
  const cancleWishMutation = useCancleWishMutation();
  const { loginUserId } = useLoginStore();

  const { data: isWished, isLoading, isError } = useCheckIsWishedQuery({ userId: loginUserId, classId });

  //   const userWishInfo =
  //     wishInfo.length > 1
  //       ? wishInfo.find((item) => item.user_id === loginUserId)
  //       : wishInfo.length === 0
  //       ? null
  //       : wishInfo[0];

  const isWishedClass = wishInfo?.find((item) => item.user_id === loginUserId);

  //   console.log(userWishInfo);

  const handleWishClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

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
        <button onClick={(e) => handleWishClick(e)}>
          {isWishedClass ? <div>❤️</div> : <div>🤍</div>}
          {/* <FaRegHeart /> */}
        </button>
      )}
    </div>
  );
};

export default ListPageWishButton;

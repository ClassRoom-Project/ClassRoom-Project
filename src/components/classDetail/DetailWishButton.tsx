'use client';

import {
  useAddWishMutation,
  useCancelWishMutation,
  useCheckIsWishedQuery,
  useCountWishQuery
} from '@/hooks/useWish/useWishQueries';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useRouter } from 'next/navigation';
import React from 'react';
import { addWish, cancelWish, defaultWarning } from '../common/Toastify';
import WishIcon from '../common/WishIcon';

const DetailWishButton = ({ classId }: { classId: string | undefined }) => {
  const router = useRouter();
  const addWishMutation = useAddWishMutation();
  const cancelWishMutation = useCancelWishMutation();
  const { loginUserId } = useLoginStore();
  const {
    data: isWished,
    isLoading: isCheckLoading,
    isError: isCheckError
  } = useCheckIsWishedQuery({ userId: loginUserId, classId });
  const { data: wishCount, isLoading: isCountLoading, isError: isCountError } = useCountWishQuery(classId);

  if (isCheckError ?? isCountError) {
    return;
  }

  const handleWishClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    //TODO: confirm창 모달로 변경
    if (!loginUserId) {
      if (
        typeof window !== 'undefined' &&
        window.confirm('로그인 후 이용이 가능합니다. 로그인 페이지로 이동 하시겠습니까?')
      ) {
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

  return <WishIcon handleWishClick={handleWishClick} isWished={isWished} wishCount={wishCount} />;
};

export default DetailWishButton;

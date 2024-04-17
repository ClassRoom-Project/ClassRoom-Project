'use client';

import { useAddWishMutation, useCancelWishMutation } from '@/hooks/useWish/useWishQueries';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { ClassAllType } from '@/types/class';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { addWish, cancelWish, defaultWarning } from '../common/Toastify';
import WishIcon from '../common/WishIcon';
import ClassInfo from '../reserve/ClassInfo';

const ListPageWishButton = ({ classId, wishInfo }: { classId: string; wishInfo: ClassAllType['wish'] }) => {
  const router = useRouter();
  const addWishMutation = useAddWishMutation();
  const cancelWishMutation = useCancelWishMutation();
  const { loginUserId } = useLoginStore();
  const [isWishedState, setIsWishedState] = useState<boolean>(false);
  const [wishCountState, setWishCountState] = useState<number>(wishInfo.length);
  const isWishedClass = wishInfo.some((item) => item.user_id === loginUserId);

  useEffect(() => {
    setIsWishedState(isWishedClass);
    setWishCountState(wishInfo.length);
  }, [isWishedClass, wishInfo.length]);

  const handleWishClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    //TODO: confirm창 모달로 변경
    if (!loginUserId) {
      if (typeof window !== 'undefined' && window.confirm('로그인 후 이용 가능합니다. 로그인하시겠습니까?')) {
        router.push('/hello');
      } else return;
    }

    if (loginUserId) {
      if (!isWishedState) {
        try {
          addWishMutation.mutate({ userId: loginUserId, classId });
          setIsWishedState(true);
          setWishCountState((prev) => prev + 1);
          addWish();
        } catch (error) {
          defaultWarning();
          console.log(error);
        }
      } else {
        try {
          cancelWishMutation.mutate({ userId: loginUserId, classId });
          setIsWishedState(false);
          setWishCountState((prev) => (prev !== 0 ? prev - 1 : 0));
          cancelWish();
        } catch (error) {
          defaultWarning();
        }
      }
    }
  };

  console.log(wishCountState);

  return <WishIcon handleWishClick={handleWishClick} isWished={isWishedState} wishCount={wishCountState} />;
};

export default ListPageWishButton;

'use client';

import { useLoginStore } from '@/store/login/loginUserIdStore';
import { ClassAllType } from '@/types/class';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { addWish, cancelWish, defaultWarning } from '../common/Toastify';
import { useAddWishMutation, useCancelWishMutation } from '@/hooks/useWish/useWishQueries';

const ListPageWishButton = ({ classId, wishInfo }: { classId: string; wishInfo: ClassAllType['wish'] }) => {
  const router = useRouter();
  const addWishMutation = useAddWishMutation();
  const cancelWishMutation = useCancelWishMutation();
  const { loginUserId } = useLoginStore();
  const [isWishedState, setIsWishedState] = useState<boolean>();
  const [wishCountState, setWishCountState] = useState<number>(wishInfo.length);
  const isWishedClass = wishInfo.some((item) => item.user_id === loginUserId);

  console.log(wishInfo, 'wishCount');

  useEffect(() => {
    setIsWishedState(isWishedClass);
  }, [isWishedClass]);

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
          setWishCountState((prev) => prev - 1);
          cancelWish();
        } catch (error) {
          defaultWarning();
        }
      }
    }
  };

  console.log(wishCountState);

  return (
    <button onClick={(e) => handleWishClick(e)}>
      {!wishInfo ? (
        <p></p>
      ) : (
        <div
          className="flex gap-1.5 items-center justify-center badge border-gray-300 border border-solid py-2.5
        "
        >
          {isWishedState ? (
            <p>
              <GoHeartFill color="red" size={18} />
            </p>
          ) : (
            <p>
              <GoHeart color="dimgray" size={18} />
            </p>
          )}
          <p className="text-xs">{wishCountState}</p>
        </div>
      )}
    </button>
  );
};

export default ListPageWishButton;

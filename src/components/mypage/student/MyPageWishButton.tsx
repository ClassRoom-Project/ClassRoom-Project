'use client';

import { addWish, cancelWish, defaultWarning } from '@/components/common/Toastify';
import WishIcon from '@/components/common/WishIcon';
import {
  useAddWishMutation,
  useCancelWishMutation,
  useCheckIsWishedQuery,
  useCountWishQuery
} from '@/hooks/useWish/useWishQueries';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { MyWishClassType } from '@/types/class';
import React, { useEffect, useState } from 'react';

const MyPageWishButton = ({ classId, classItem }: { classId: string; classItem: MyWishClassType }) => {
  const cancelWishMutation = useCancelWishMutation();
  const { loginUserId } = useLoginStore();
  const [isWishedState, setIsWishedState] = useState<boolean>(true);

  const handleWishClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    try {
      cancelWishMutation.mutate({ userId: loginUserId, classId });
      setIsWishedState(false);
      cancelWish();
    } catch (error) {
      defaultWarning();
    }
  };

  return <WishIcon handleWishClick={handleWishClick} isWished={isWishedState} wishCount={null} />;
};

export default MyPageWishButton;

'use client';

import React, { useEffect, useState } from 'react';
import { useCurrentReservedCountStore } from '@/store/reserveClassStore';

const CurrentReserveQuantity = ({ classId, maxPeople }: { classId: string; maxPeople: number }) => {
  const { currentReservedCount } = useCurrentReservedCountStore();
  const [remainingQuantity, setRemainingQuantity] = useState(currentReservedCount);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentReservedCount || currentReservedCount === 0) {
      setRemainingQuantity(maxPeople - currentReservedCount);
      setIsLoading(false);
    }
  }, [classId, currentReservedCount, maxPeople]);

  return (
    <div className="flex flex-row w-full justify-center bg-base-200 rounded-md  text-sm py-2 px-3 items-center">
      {!isLoading && remainingQuantity ? (
        <div>
          <span className="badge bg-point-purple text-white font-light p-2.5 tracking-wide mr-1 ">
            {remainingQuantity}
          </span>
          <span>자리 남았어요!</span>
        </div>
      ) : !isLoading && !remainingQuantity ? (
        <p>마감되었습니다. 😢</p>
      ) : (
        <span className="loading loading-dots loading-xs"></span>
      )}
    </div>
  );
};

export default CurrentReserveQuantity;

'use client';

import React, { useEffect, useState } from 'react';
import { useCurrentReservedCountStore } from '@/store/reserveClassStore';

const CurrentReserveQuantity = ({ classId, maxPeople }: { classId: string; maxPeople: number }) => {
  const { currentReservedCount } = useCurrentReservedCountStore();
  const [remainingQuantity, setRemainingQuantity] = useState(currentReservedCount);

  useEffect(() => {
    if (currentReservedCount || currentReservedCount === 0) {
      setRemainingQuantity(maxPeople - currentReservedCount);
    }
  }, [classId, currentReservedCount, maxPeople]);

  return (
    <div className="flex flex-row justify-center bg-base-200 rounded-md  text-sm py-2 px-3 items-center">
      <div className="badge bg-point-purple text-white font-light p-2.5 tracking-wide mr-1">
        {remainingQuantity ? remainingQuantity : ''}
      </div>
      자리 남았어요!
    </div>
  );
};

export default CurrentReserveQuantity;

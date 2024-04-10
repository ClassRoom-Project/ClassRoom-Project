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
    <div className="flex flex-row justify-center w-full bg-base-200 rounded-md  text-sm py-2 px-3">
      <div className="badge bg-point-purple text-white font-normal">{remainingQuantity ? remainingQuantity : ''}</div>
      자리 남았어요!
    </div>
  );
};

export default CurrentReserveQuantity;

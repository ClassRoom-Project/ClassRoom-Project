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
    <button className="btn gap-1">
      <div className="badge badge-primary">{remainingQuantity ? remainingQuantity : ''}</div>
      자리 남았어요!
    </button>
  );
};

export default CurrentReserveQuantity;

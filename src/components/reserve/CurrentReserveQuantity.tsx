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

  return <p>{`남은 자리 : ${remainingQuantity ? remainingQuantity : ''}`}</p>;
};

export default CurrentReserveQuantity;

'use client';

import React, { useEffect, useState } from 'react';
import { fetchReservedCount } from '@/app/api/reserve/fetchReserveClassInfo';
import { useCurrentReservedStore } from '@/store/reserveClassStore';

const CurrentReserveQuantity = ({ classId, maxPeople }: { classId: string; maxPeople: number }) => {
  const { currentReservedCount } = useCurrentReservedStore();
  const [remainingQuantity, setRemainingQuantity] = useState(currentReservedCount);

  useEffect(() => {
    if (currentReservedCount) {
      setRemainingQuantity(maxPeople - currentReservedCount);
    }
  }, [classId, currentReservedCount, maxPeople]);

  return <p>{`남은 자리 : ${remainingQuantity ? remainingQuantity : ''}`}</p>;
};

export default CurrentReserveQuantity;

'use client';

import React, { useEffect, useState } from 'react';
import { fetchReservedCount } from '@/app/api/reserve/fetchReserveClassInfo';

const CurrentReserveQuantity = ({ classId, maxPeople }: { classId: string; maxPeople: number }) => {
  const [remainingQuantity, setRemainingQuantity] = useState(0);

  useEffect(() => {
    const fetchCurrentReservedQuantity = async () => {
      const currentReservedCount = await fetchReservedCount(classId);

      if (currentReservedCount) {
        setRemainingQuantity(maxPeople - currentReservedCount);
      }
    };

    fetchCurrentReservedQuantity();
  }, [classId, maxPeople]);

  return <p>{`남은 자리 : ${remainingQuantity ? remainingQuantity : ''}`}</p>;
};

export default CurrentReserveQuantity;

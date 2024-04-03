import { fetchReserveClassInfo, fetchReservedCount } from '@/app/api/reserve/fetchReserveClassInfo';
import React from 'react';

const CurrentReserveQuantity = async ({ maxPeople }: { maxPeople: number }) => {
  const count = await fetchReservedCount('a1b2c3d4-e5f6-4aeb-bcf5-6fa40fc0b0e1');

  return (
    <p>
      {/* {`남은 자리 : ${remainingQuantity}`} */}
      {`남은 자리 : ${maxPeople - (count ?? 0)}`}
    </p>
  );
};

export default CurrentReserveQuantity;

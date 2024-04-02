import { fetchReserveCount } from '@/app/api/reserve/fetchReserveCount';
import { fetchReservedUserIds } from '@/app/api/reserve/fetchReservedUserIds';
import React from 'react';

const CurrentReserveQuantity = async ({ classId, maxPeople }: { classId: string; maxPeople: number }) => {
  const currentReserveQuantity = await fetchReserveCount(classId);
  console.log(currentReserveQuantity);

  return <p>{`남은 자리 : ${maxPeople - currentReserveQuantity}`}</p>;
};

export default CurrentReserveQuantity;

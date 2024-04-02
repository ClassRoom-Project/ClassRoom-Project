import { fetchReserveCount } from '@/app/api/reserve/fetchReserveCount';
import { fetchReservedUserIds } from '@/app/api/reserve/fetchReservedUserIds';
import React from 'react';

const CurrentReserveQuantity = async ({ classId, maxPeople }: { classId: string; maxPeople: number }) => {
  // const currentReserveQuantity = await fetchReservedUserIds({ classId });
  const currentReserveQuantity = await fetchReserveCount(classId);
  console.log(currentReserveQuantity);

  return <div>{`남은 자리 : ${maxPeople - currentReserveQuantity}`}</div>;
};

export default CurrentReserveQuantity;

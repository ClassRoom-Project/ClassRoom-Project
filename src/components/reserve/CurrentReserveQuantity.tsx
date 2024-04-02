import { fetchReservedUserIds } from '@/app/api/reserve/fetchReservedUserIds';
import React from 'react';

const CurrentReserveQuantity = async ({ classId, maxPeople }: { classId: string; maxPeople: number }) => {
  const currentReserveQuantity = await fetchReservedUserIds({ classId });

  return <div>남은자리 {currentReserveQuantity ? maxPeople - currentReserveQuantity.length : maxPeople}</div>;
};

export default CurrentReserveQuantity;

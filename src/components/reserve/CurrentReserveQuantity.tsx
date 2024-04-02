import { fetchReservedUserIds } from '@/app/api/reserve/fetchReservedUserIds';
import React from 'react';

const CurrentReserveQuantity = async ({ classId }: { classId: string }) => {
  const currentReserveQuantity = await fetchReservedUserIds({ classId });

  return <div>얍</div>;
};

export default CurrentReserveQuantity;

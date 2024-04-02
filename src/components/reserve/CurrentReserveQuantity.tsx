import { fetchReservedUserIds } from '@/app/api/reserve/fetchReservedUserIds';
import React from 'react';

const CurrentReserveQuantity = async ({ classId }: { classId: string }) => {
  const currentReserveQuantity = await fetchReservedUserIds({ classId });

  // return <div>남은자리 : {currentReserveQuantity.length}</div>;
};

export default CurrentReserveQuantity;

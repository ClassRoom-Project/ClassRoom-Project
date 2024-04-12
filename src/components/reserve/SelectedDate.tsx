'use client';

import { useReserveStore } from '@/store/reserveClassStore';
import { convertTimeTo12HourClock } from '@/utils/convertTimeTo12HourClock';
import React from 'react';

const SelectedDate = () => {
  const { reserveInfo } = useReserveStore();

  return (
    <div className="flex flex-row justify-between items-center mb-2 w-full bg-base-200 rounded-md  text-sm py-2 px-3">
      {/* <div className="mb-1 font-bold">선택하신 수강일</div>
      {reserveInfo.reserveTime && (
        <p>
          {`${reserveInfo.reserveDate}`} {convertTimeTo12HourClock(reserveInfo.reserveTime)}
        </p>
      )} */}
    </div>
  );
};

export default SelectedDate;

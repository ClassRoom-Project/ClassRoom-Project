import React from 'react';
import DateTimePicker from './DateTimePicker';
import CurrentReserveQuantity from './CurrentReserveQuantity';
import { ReserveClassType } from '@/types/class';

const ReservationScheduler = ({ classInfo }: { classInfo: ReserveClassType }) => {
  return (
    <div>
      <DateTimePicker classDates={classInfo.dates} />
      <CurrentReserveQuantity classId={classInfo.classId} maxPeople={classInfo?.maxPeople} />
    </div>
  );
};

export default ReservationScheduler;

import React from 'react';
import DateTimePicker from './DateTimePicker';
import CurrentReserveQuantity from './CurrentReserveQuantity';
import PriceCalculator from './PriceCalculator';
import ReserveButton from './ReserveButton';
import { ReserveClassType } from '@/types/class';

const ReserveInfo = ({ classInfo }: { classInfo: ReserveClassType }) => {
  return (
    <div className=" py-6  px-12 w-[400px] h-[804px] bg-white rounded-md  justify-between flex flex-col my-2 shadow">
      <p className="font-bold text-lg text-left w-full mb-1">수강일 선택하기</p>
      <DateTimePicker classDates={classInfo.dates} />
      <CurrentReserveQuantity classId={classInfo.classId} maxPeople={classInfo?.maxPeople} />
      <PriceCalculator price={classInfo.price} classId={classInfo.classId} maxPeople={classInfo.maxPeople} />
      <ReserveButton classId={classInfo.classId} maxPeople={classInfo.maxPeople} title={classInfo.title} />
    </div>
  );
};

export default ReserveInfo;

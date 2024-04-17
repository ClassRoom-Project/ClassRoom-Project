import React from 'react';
import PriceCalculator from './PriceCalculator';
import ReserveButton from './ReserveButton';
import { ReserveClassType } from '@/types/class';

const SetQuantityAndPay = ({ classInfo }: { classInfo: ReserveClassType }) => {
  return (
    <div>
      <PriceCalculator price={classInfo.price} classId={classInfo.classId} maxPeople={classInfo.maxPeople} />
      <ReserveButton classId={classInfo.classId} maxPeople={classInfo.maxPeople} title={classInfo.title} />
    </div>
  );
};

export default SetQuantityAndPay;

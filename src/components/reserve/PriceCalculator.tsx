'use client';

import { useCurrentReservedCountStore, useReserveStore } from '@/store/reserveClassStore';
import React, { useEffect, useState } from 'react';

interface PriceCalculatorProps {
  classId: string;
  price: number;
  maxPeople: number;
}

const PriceCalculator = ({ price, classId, maxPeople }: PriceCalculatorProps) => {
  const { setReserveInfo } = useReserveStore();
  const { currentReservedCount } = useCurrentReservedCountStore();
  const [quantity, setQuantity] = useState(1);
  const [remainingQuantity, setRemainingQuantity] = useState(0);
  const totalPrice = price * quantity;

  useEffect(() => {
    setReserveInfo({ reservePrice: totalPrice, reserveQuantity: quantity });
  }, [quantity, setReserveInfo, totalPrice, classId, maxPeople]);

  useEffect(() => {
    setRemainingQuantity(currentReservedCount || currentReservedCount === 0 ? maxPeople - currentReservedCount : 0);

    setQuantity(1);
  }, [currentReservedCount, maxPeople]);

  const handleQuantityIncrease = async () => {
    // 남은자리 수 까지만 인원 추가 가능하도록
    if (remainingQuantity) {
      if (remainingQuantity <= quantity) {
        return;
      }
      setQuantity((prev) => prev + 1);
    }
  };

  const handleQuantityDecrease = () => {
    if (quantity !== 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full flex flex-col mb-6 mt-auto">
      <h1 className="font-bold">수강인원 선택하기</h1>
      <div className="flex w-full mt-4 mb-2 justify-end">
        <span className="font-bold text-right mr-3">총 인원</span>
        <div className="flex gap-2 w-[85px] justify-between">
          <button onClick={handleQuantityDecrease} className="btn btn-circle btn-xs bg-point-purple text-white">
            -
          </button>
          <span className="font-bold w-[20px] text-center"> {quantity} </span>
          <button onClick={handleQuantityIncrease} className="btn btn-circle btn-xs bg-point-purple text-white">
            +
          </button>
        </div>
      </div>
      <div className="divider m-0"></div>
      <div className="flex w-full justify-between gap-4">
        <span className="text-right font-bold">최종 결제 금액</span>
        <span className="font-bold font-gray-800"> {totalPrice.toLocaleString()} 원</span>
      </div>
    </div>
  );
};

export default PriceCalculator;

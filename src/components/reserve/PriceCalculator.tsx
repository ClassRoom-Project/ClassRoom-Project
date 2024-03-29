'use client';

import useReserveStore from '@/store/reserveClassStore';
import { ClassType } from '@/types';
import React, { useState } from 'react';

const PriceCalculator = ({ price }: { price: ClassType['price'] }) => {
  const [quantity, setQuantity] = useState(1);

  const totalPrice = price * quantity;

  const setReserveInfo = useReserveStore((state) => state.setReserveInfo);
  setReserveInfo({ reservePrice: totalPrice, reserveQuantity: quantity });

  // 클래스의 max 인원 고려 필요
  const handleQuantityDecrease = () => {
    if (quantity !== 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col gap-2 text-lg items-center w-80 p-4 border border-solid border-black">
      <div className="flex w-full justify-between gap-4">
        <span className="w-16 text-right">금액</span>
        <span> {price.toLocaleString()} 원</span>
      </div>
      <div className="flex w-full justify-between gap-4">
        <span className="w-16 text-right">인원</span>
        <div className="flex w-16 justify-between gap-2">
          <button onClick={handleQuantityDecrease}> - </button>
          <span> {quantity} </span>
          <button onClick={() => setQuantity((prev) => prev + 1)}> + </button>
        </div>
      </div>
      <div className="flex w-full justify-between gap-4">
        <span className="w-16 text-right">총 금액</span>
        <span> {totalPrice.toLocaleString()} 원 </span>
      </div>
    </div>
  );
};

export default PriceCalculator;
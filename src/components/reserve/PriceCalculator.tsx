'use client';

import { Class } from '@/types/class';
import React, { useState } from 'react';

const PriceCalculator = ({ price }: { price: Class['price'] }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityDecrease = () => {
    if (quantity !== 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (quantity < 0) {
  }

  return (
    <div className="flex flex-col gap-2 text-lg items-center w-80 p-4 border border-solid border-black">
      <div className="flex w-full justify-between gap-4">
        <span className="w-16 text-right">금액</span>
        <span> 50,000 </span>
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
        <span> 50,000 </span>
      </div>
    </div>
  );
};

export default PriceCalculator;

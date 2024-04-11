'use client';
import useRegisterStore from '@/store/registerStore';
import React from 'react';

const Price = () => {
  const { price, setPrice } = useRegisterStore();

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value);
    if (isNaN(value) || value < 0) value = 0;
    setPrice(value);
  };
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between space-x-4">
        <div>
          <p className="text-base text-[#3F3F3F] font-bold">클래스 1인 수강 금액</p>
        </div>
        <div className="relative w-1/3">
          <input
            className="form-input px-3 py-2 border rounded w-full pr-8 text-right"
            type="text"
            value={price}
            onChange={handlePriceChange}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span>원</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;

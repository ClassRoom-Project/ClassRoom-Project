"use client";
import React from 'react'
import useRegisterStore from '@/store/RegisterStore';

const Price = () => {
  const { price, setPrice } = useRegisterStore();

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setPrice(value);
  };
  return (
    <div className="flex items-center space-x-2 my-2">
        <p>가격</p>
        <div>
            <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={price} onChange={handlePriceChange} placeholder="가격"/>
        </div>
    </div>
  )
}

export default Price
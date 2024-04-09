"use client";
import React from 'react'
import useRegisterStore from '@/store/registerStore';

const Price = () => {
  const { price, setPrice } = useRegisterStore();

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setPrice(value);
  };
  return (
    <div className='mt-2'>
        <div className="flex items-center space-x-4">
          <p className='text-base flex-shrink-0 font-bold'>가격</p>
          <div>
              <input 
                className="form-input px-3 py-2 border rounded flex-grow" 
                type="text" 
                value={price} 
                onChange={handlePriceChange} 
                placeholder="가격"
              />
          </div>
        </div>
    </div>
  )
}

export default Price
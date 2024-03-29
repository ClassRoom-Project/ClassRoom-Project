"use client";
import React, { useState } from 'react'

const Price = () => {
  const [price, setPrice] = useState('');
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
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
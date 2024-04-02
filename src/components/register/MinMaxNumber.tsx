"use client";
import React, { useState } from 'react'

const MinNumber = () => {
  const [minNumber, setMinNumber] = useState('');
  const [maxNumber, setMaxNumber] = useState('');

  const handleMinNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinNumber(event.target.value);
  };

  const handleMaxNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxNumber(event.target.value);
  };
  return (
    <div className="flex items-center space-x-2 my-2">
      <p>최소인원</p>
      <div>
        <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={minNumber} onChange={handleMinNumberChange} placeholder="최소인원 입력"/>
      </div>
      <p>최대인원</p>
      <div>
        <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={maxNumber} onChange={handleMaxNumberChange} placeholder="최대인원 입력"/>
      </div>
    </div>
  )
}

export default MinNumber
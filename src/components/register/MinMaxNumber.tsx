"use client";
import React from 'react'
import useRegisterStore from '@/store/RegisterStore';

const MinNumber = () => {
  const { minNumber, maxNumber, setMinNumber, setMaxNumber } = useRegisterStore();


  const handleMinNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setMinNumber(value);
  };

  const handleMaxNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setMaxNumber(value);
  };
  return (
    <div className="flex items-center space-x-2 my-2">
      <p>최소인원</p>
      <div>
        <input className="form-input px-3 py-2 border rounded flex-grow" type="number" value={minNumber} onChange={handleMinNumberChange} placeholder="최소인원 입력"/>
      </div>
      <p>최대인원</p>
      <div>
        <input className="form-input px-3 py-2 border rounded flex-grow" type="number" value={maxNumber} onChange={handleMaxNumberChange} placeholder="최대인원 입력"/>
      </div>
    </div>
  )
}

export default MinNumber
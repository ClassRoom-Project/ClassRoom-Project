"use client";
import React from 'react'
import useRegisterStore from '@/store/registerStore';

const MinNumber = () => {
  const { minNumber, maxNumber, personnel, setMinNumber, setMaxNumber, setPersonnel } = useRegisterStore();

  const handlePersonnelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setPersonnel(value);
  };

  const handleMinNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setMinNumber(value);
  };

  const handleMaxNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setMaxNumber(value);
  };

  return (
    <div className="my-2 flex flex-wrap sm:flex-nowrap justify-between items-center">
      <div className="flex-1 flex items-center space-x-2 my-2 mx-2">
        <p className='text-base flex-shrink-0 font-bold'>정원</p>
        <input 
          className="form-input px-3 py-2 border border-[#D5D5D5] rounded w-full" 
          type="number" 
          value={personnel} 
          onChange={handlePersonnelChange} 
          placeholder="정원 입력"
        />
      </div>
      <div className="flex-1 flex items-center space-x-2 my-2">
        <p className='text-base flex-shrink-0 font-bold'>최소인원</p>
        <input 
          className="form-input px-3 py-2 border border-[#D5D5D5] rounded w-full"
          type="number"
          value={minNumber}
          onChange={handleMinNumberChange}
          placeholder="최소인원 입력"
        />
      </div>
      <div className="flex-1 flex items-center space-x-2 my-2 mx-2">
        <p className='text-base flex-shrink-0 font-bold'>최대인원</p>
        <input 
          className="form-input px-3 py-2 border border-[#D5D5D5] rounded w-full"
          type="number" 
          value={maxNumber} 
          onChange={handleMaxNumberChange} 
          placeholder="최대인원 입력"
        />
      </div>
    </div>
  )
}

export default MinNumber
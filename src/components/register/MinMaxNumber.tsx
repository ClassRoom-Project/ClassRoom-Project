'use client';
import React from 'react';
import useRegisterStore from '@/store/registerStore';

const MinMaxNumber = () => {
  const { minNumber, personnel, setMinNumber, setPersonnel } = useRegisterStore();

  const handlePersonnelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value);
    if (isNaN(value) || value < 0) value = 0;
    setPersonnel(value);
  };

  const handleMinNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value);
    if (isNaN(value) || value < 0) value = 0;
    setMinNumber(value);
  };

  return (
    <div className="my-4 flex flex-wrap sm:flex-nowrap justify-between items-center">
      <div className="flex-1 flex items-center space-x-2">
        <p className="text-base text-[#3F3F3F] flex-shrink-0 font-bold">* 모집 정원</p>
        <input
          className="form-input px-3 py-2 border border-[#D5D5D5] rounded w-1/3"
          type="text"
          value={personnel}
          onChange={handlePersonnelChange}
          placeholder="모집 정원 입력"
        />
      </div>
      <div className="flex-1 flex items-center space-x-2 mx-3">
        <p className="text-base text-[#3F3F3F] flex-shrink-0 font-bold">* 최소 모집 인원</p>
        <input
          className="form-input px-3 py-2 border border-[#D5D5D5] rounded w-1/3"
          type="text"
          value={minNumber}
          onChange={handleMinNumberChange}
          placeholder="최소인원 입력"
        />
      </div>
    </div>
  );
};

export default MinMaxNumber;

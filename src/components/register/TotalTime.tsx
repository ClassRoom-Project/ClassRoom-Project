'use client';
import React from 'react';
import useRegisterStore from '@/store/registerStore';

const TotalTime = () => {
  const { totalTime, setTotalTime } = useRegisterStore();

  const handleTotalTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value);
    if (isNaN(value) || value < 0) value = 0;
    setTotalTime(value);
  };
  return (
    <div className="flex items-center space-x-2 my-4">
      <p className="text-base text-[#3F3F3F] flex-shrink-0 font-bold">소요시간</p>
      <div className="w-1/2 md:w-1/3">
        <input
          className="form-input px-3 py-2 border border-[#D5D5D5] rounded w-1/2"
          type="number"
          value={totalTime}
          onChange={handleTotalTimeChange}
          placeholder="총 소요시간 입력"
        />
      </div>
    </div>
  );
};

export default TotalTime;

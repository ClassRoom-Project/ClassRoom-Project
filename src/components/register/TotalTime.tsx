'use client';
import React from 'react';
import useRegisterStore from '@/store/RegisterStore';

const TotalTime = () => {
  const { totalTime, setTotalTime } = useRegisterStore();

  const handleTotalTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value);
    if (isNaN(value) || value < 0) value = 0;
    setTotalTime(value);
  };
  return (
    <div className="flex items-center space-x-2">
      <p className="text-base text-[#3F3F3F] flex-shrink-0 font-bold">소요시간</p>
      <div className="w-full">
        <input
          className="form-input px-3 py-2 border border-[#D5D5D5] rounded w-full md:w-auto"
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

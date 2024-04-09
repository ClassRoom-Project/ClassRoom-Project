'use client';
import React from 'react';
import useRegisterStore from '@/store/RegisterStore';

const TotalTime = () => {
  const { totalTime, setTotalTime } = useRegisterStore();

  const handleTotalTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setTotalTime(value);
  };
  return (
    <div className="flex items-center space-x-2">
      <p className="text-base flex-shrink-0 font-bold">소요시간</p>
      <div className="w-full">
        <input
          className="form-input px-3 py-2 border rounded w-full md:w-auto"
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

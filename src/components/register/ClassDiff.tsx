'use client';
import useRegisterStore from '@/store/registerStore';
import React from 'react';

const ClassDiff = () => {
  const { difficulty, setDifficulty } = useRegisterStore();

  const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(event.target.value);
  };
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-4">
        <p className="text-base text-[#3F3F3F] flex-shrink-0 font-bold">클래스 난이도</p>
        {/* 난이도 드롭다운 */}
        <select
          value={difficulty}
          onChange={handleDifficultyChange}
          className="border border-[#D5D5D5] rounded-md p-2 text-gray-700"
        >
          <option value="">난이도</option>
          <option value="입문">입문</option>
          <option value="초급">초급</option>
          <option value="중급">중급</option>
          <option value="고급">고급</option>
        </select>
      </div>
    </div>
  );
};

export default ClassDiff;

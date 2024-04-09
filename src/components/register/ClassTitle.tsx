'use client';
import React from 'react';
import useRegisterStore from '@/store/RegisterStore';

const ClassTitle = () => {
  const { classTitle, setClassTitle } = useRegisterStore();

  const handleClassTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClassTitle(event.target.value);
  };
  return (
    <div className="my-2">
      <div className="flex items-center space-x-4">
        <p className="text-base flex-shrink-0 font-bold">클래스명</p>
        <input
          className="form-input px-3 py-2 border rounded flex-grow min-w-0"
          type="text"
          value={classTitle}
          onChange={handleClassTitleChange}
          placeholder="클래스 제목을 입력해주세요"
        />
      </div>
    </div>
  );
};

export default ClassTitle;

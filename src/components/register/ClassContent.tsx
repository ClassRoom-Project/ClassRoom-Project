'use client';
import React from 'react';
import useRegisterStore from '@/store/registerStore';

const ClassContent = () => {
  const { classContent, setClassContent } = useRegisterStore();

  const handleClassContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setClassContent(event.target.value);
  };

  return (
    <div className="my-4">
      <div className="flex items-start space-x-4">
        <p className="text-base text-[#3F3F3F] flex-shrink-0 font-bold">* 클래스 설명</p>
        <textarea
          className="form-input px-3 py-2 border border-[#D5D5D5] rounded flex-grow"
          value={classContent}
          onChange={handleClassContentChange}
          placeholder="클래스의 상세 설명을 입력해주세요"
          rows={10}
        />
      </div>
    </div>
  );
};

export default ClassContent;

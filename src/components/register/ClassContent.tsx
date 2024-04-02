"use client";
import React from 'react'
import useRegisterStore from '@/store/RegisterStore';

const ClassContent = () => {
    const { classContent, setClassContent } = useRegisterStore();

    const handleClassContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClassContent(event.target.value);
    };
    return (
      <div className="flex items-center space-x-2 my-2">
          <p>클래스 설명</p>
          <div>
              <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={classContent} onChange={handleClassContentChange} placeholder="클래스의 상세 설명을 입력해주세요"/>
          </div>
      </div>
    )
}

export default ClassContent
"use client";
import React from 'react'
import useRegisterStore from '@/store/RegisterStore';

const ClassContent = () => {
    const { classContent, setClassContent } = useRegisterStore();

    const handleClassContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setClassContent(event.target.value);
    };

    return (
        <div className='my-2'>
          <div className="flex items-center space-x-4">
            <p className='text-base flex-shrink-0 font-bold'>클래스 설명</p>
            <textarea 
              className="form-input px-3 py-2 border rounded flex-grow" 
              value={classContent} 
              onChange={handleClassContentChange} 
              placeholder="클래스의 상세 설명을 입력해주세요"
              rows={4}
            />
          </div>
      </div>
    )
}

export default ClassContent

"use client";
import React from 'react'
import useRegisterStore from '@/store/registerStore';

const HashTag = () => {
    const { subCategory, setSubCategory } = useRegisterStore();
      
    const handleSubCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubCategory(event.target.value);
    };
  return (
    <div className='my-2'>
        <div className="flex items-center space-x-4 my-2">
          <p className='text-base flex-shrink-0 font-bold'>소분류</p>
          <input 
            className="form-input px-3 py-2 border-b border-t-0 border-r-0 border-l-0 flex-grow min-w-0"
            type="text" 
            value={subCategory} 
            onChange={handleSubCategoryChange} 
            placeholder="해시태그를 입력해주세요(최대 10개까지 입력가능합니다)"
          />
        </div>
    </div>
  )
}

export default HashTag
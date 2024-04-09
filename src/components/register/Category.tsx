"use client";
import React from 'react'
import useRegisterStore from '@/store/registerStore';

const Category = () => {
    const { category, subCategory, setCategory, setSubCategory } = useRegisterStore();

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setCategory(event.target.value);
    };
      
    const handleSubCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubCategory(event.target.value);
    };
    return (
      <div className='my-2'>
        <div className="flex items-center space-x-4 my-2">
          <div>
            {/* 카테고리 드롭다운 */}
            <select value={category} onChange={handleCategoryChange}>
              <option value="">카테고리 선택</option>
              <option value="요리">요리</option>
              <option value="공예&공방">공예&공방</option>
              <option value="운동">운동</option>
              <option value="교육">교육</option>
              <option value="악기&음악">악기&음악</option>
              <option value="뷰티">뷰티</option>
              <option value="기타">기타</option>
            </select>
          </div>
          <p className='text-base flex-shrink-0 font-bold'>소분류</p>
          <input 
            className="form-input px-3 py-2 border rounded flex-grow min-w-0"
            type="text" 
            value={subCategory} 
            onChange={handleSubCategoryChange} 
            placeholder="해시태그를 입력해주세요"
          />
        </div>
      </div>
    )
}
export default Category
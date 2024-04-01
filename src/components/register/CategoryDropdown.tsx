"use client";
import React, { useState } from 'react'

const CategoryDropdown = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };
    
    const handleSubCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubCategory(event.target.value);
    };
    return (
      <div className='w-full max-w-md my-2'>
          <div className="flex items-center space-x-2">
            <div>
              {/* 카테고리 드롭다운 */}
              <select value={selectedCategory} onChange={handleCategoryChange}>
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
            <p>소분류</p>
            <div>
              <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={subCategory} onChange={handleSubCategoryChange} placeholder="해시태그를 입력해주세요"/>
            </div>
          </div>
      </div>
    )
}

export default CategoryDropdown
'use client';

import React, { useCallback, useState } from 'react';
import { useClassFilterStore } from '@/store/classFilterStore';

const CategoryBtns = () => {
  const { selectedCategory, setCategory } = useClassFilterStore((state) => ({
    selectedCategory: state.selectedCategory,
    setCategory: state.setCategory
  }));
  const categories = ['악기&음악', '미술', '스포츠', '공예&공방', '요리', '기타', '뷰티'];
  //useCallback을 이용해 함수 재생성을 막아서 메모리 사용 줄이기
  const handleOnClickListBtn = useCallback(
    (category: string) => {
      setCategory(category);
    },
    [setCategory]
  );

  return (
    <div className="min-w-full bg-[#5373FF] h-16 flex justify-center items-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleOnClickListBtn(category)}
          className={`p-2 font-bold rounded-2xl mx-3 w-24 ${
            selectedCategory === category ? 'bg-purple-600' : 'bg-white'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryBtns;

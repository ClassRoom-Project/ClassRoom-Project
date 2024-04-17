'use client';
import React, { useCallback, useState } from 'react';
import { useCategoryFilterStore } from '@/store/classFilterStore';
import { useRouter } from 'next/navigation';

const CategoryBtns = () => {
  const router = useRouter();
  const { selectedCategory, setSelectedCategory } = useCategoryFilterStore((state) => ({
    selectedCategory: state.selectedCategory,
    setSelectedCategory: state.setSelectedCategory
  }));

  const categories = ['악기&음악', '미술', '운동', '공예&공방', '요리', '뷰티', '교육', '기타'];
  //useCallback을 이용해 함수 재생성을 막아서 메모리 사용 줄이기
  const handleOnClickListBtn = useCallback(
    (category: string) => {
      setSelectedCategory(category);
      router.push('/list');
    },
    [setSelectedCategory, router]
  );
  return (
    <div className="min-w-[85vw] bg-disable-color h-16 flex justify-center items-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleOnClickListBtn(category)}
          className={`p-2 font-bold rounded-2xl mx-3 w-24 ${
            selectedCategory === category ? 'bg-button-press-color' : 'bg-white'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
export default CategoryBtns;

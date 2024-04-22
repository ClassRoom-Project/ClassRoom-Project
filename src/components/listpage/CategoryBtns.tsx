'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useCategoryFilterStore } from '@/store/classFilterStore';
import { usePathname, useRouter } from 'next/navigation';
import { useSearchStore } from '@/store/classFilterStore';

const CategoryBtns = () => {
  const pathName = usePathname();
  const router = useRouter();
  const { selectedCategory, setSelectedCategory } = useCategoryFilterStore((state) => ({
    selectedCategory: state.selectedCategory,
    setSelectedCategory: state.setSelectedCategory
  }));

  const categories = ['요리', '공예&공방', '운동', '교육', '악기&음악', '뷰티', '예술', '기타'];
  //useCallback을 이용해 함수 재생성을 막아서 메모리 사용 줄이기
  const handleOnClickListBtn = useCallback(
    (category: string) => {
      setSelectedCategory(category);
      router.push(`/list`);
    },
    [setSelectedCategory, router]
  );

  //List페이지가 떠날 때 카테고리 초기화
  useEffect(() => {
    const handleLeavePage = () => {
      if (pathName !== `/list`) {
        setSelectedCategory('');
      }
    };

    handleLeavePage();
  }, [pathName, setSelectedCategory]);

  return (
    <div className="min-w-[85vw] bg-disable-color h-16 flex justify-center items-center">
      <div className="w-full px-8 flex flex-row justify-between font-medium">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleOnClickListBtn(category)}
            className={`w-24 rounded-full px-2.5 py-[5px] ${
              selectedCategory === category ? 'bg-button-press-color' : 'bg-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};
export default CategoryBtns;

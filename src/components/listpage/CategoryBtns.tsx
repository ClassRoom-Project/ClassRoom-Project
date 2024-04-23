'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useCategoryFilterStore } from '@/store/classFilterStore';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSearchStore } from '@/store/classFilterStore';

const CategoryBtns = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { selectedCategory, setSelectedCategory } = useCategoryFilterStore((state) => ({
    selectedCategory: state.selectedCategory,
    setSelectedCategory: state.setSelectedCategory
  }));
  const searchQuery = searchParams?.get('query');

  const categories = ['요리', '공예&공방', '운동', '교육', '악기&음악', '뷰티', '예술', '기타'];
  //useCallback을 이용해 함수 재생성을 막아서 메모리 사용 줄이기
  const handleOnClickListBtn = useCallback(
    (category: string) => {
      setSelectedCategory(category);
      if (!searchQuery) {
        router.push('list');
      } else {
        router.push(`/list?query=${searchQuery}`);
      }
    },
    [setSelectedCategory, router, searchQuery]
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
    <div className="w-full bg-disable-color h-12  flex justify-center items-center md:h-16">
      <div className="w-full gap-1 flex px-2 flex-row justify-between md:gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleOnClickListBtn(category)}
            className={`w-24 rounded-full text-xs whitespace-nowrap py-1 px-1 md:text-base ${
              selectedCategory === category
                ? 'md:bg-button-press-color text-dark-purple-color md:text-white'
                : 'md:bg-white'
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

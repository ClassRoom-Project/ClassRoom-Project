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
    <div className="mb-6 flex h-12  w-full items-center justify-center bg-transparent md:h-16">
      <div className="flex w-full flex-row justify-between gap-1 px-2 md:gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleOnClickListBtn(category)}
            className={`w-24 whitespace-nowrap rounded-full  px-1 py-1 text-xs text-gray-700 transition-all md:text-base md:font-semibold 2xl:w-28 ${
              selectedCategory === category
                ? 'text-dark-purple-color md:bg-button-press-color md:text-white'
                : 'border border-solid border-input-border-color md:bg-pale-purple md:hover:border-button-press-color md:hover:bg-background-color'
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

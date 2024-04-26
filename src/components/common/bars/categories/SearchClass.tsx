'use client';

import { useCategoryFilterStore, useSearchStore } from '@/store/classFilterStore';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IoIosSearch } from 'react-icons/io';
import _ from 'lodash';
import { useEffect, useState } from 'react';
//yarn add --dev @types/lodash
//yarn add lodash

export const SearchClass = () => {
  const { setSelectedCategory } = useCategoryFilterStore();
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedTitle, setSelectedTitle } = useSearchStore();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTitle(e.target.value);
  };

  //query= 뒤에있는 query string을 가져온다
  const searchQuery = searchParams?.get('query');

  //List페이지가 떠날 때 카테고리 초기화
  useEffect(() => {
    const handleLeavePage = () => {
      if (pathName !== '/list') {
        setSelectedCategory('');
      }
    };

    handleLeavePage();
  }, [pathName, setSelectedCategory]);

  const handleSearchBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimedSelectedTitle = selectedTitle.trim();
    if (!trimedSelectedTitle) return;
    router.push(`/list?query=${trimedSelectedTitle}`);
  };
  //url로 접근할 경우 타이틀에 queryString 입력
  useEffect(() => {
    setSelectedTitle(searchQuery ?? '');
  }, [searchQuery, setSelectedTitle]);

  return (
    <form className="mx-2 flex h-[120px] w-full items-center justify-start" onSubmit={handleSearchBtn}>
      <div className="xl:[350px] relative flex w-[200px] items-end justify-end rounded-xl border-[1px] border-input-border-color md:w-[250px] lg:w-[300px] 2xl:w-[400px]">
        <input
          maxLength={20}
          onChange={handleSearchChange}
          value={selectedTitle}
          className="h-12 flex-grow rounded-xl bg-red-500 pl-2 outline-none"
          type="text"
          placeholder="검색하기"
        />
        <button
          type="submit"
          className="btn rounded-xl border-[1px] border-transparent bg-white  shadow-none  hover:bg-disable-color"
        >
          <IoIosSearch className="bg-slate-500 text-2xl text-icon-color" />
        </button>
      </div>
    </form>
  );
};

'use client';

import { useCategoryFilterStore, useSearchStore } from '@/store/classFilterStore';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IoIosSearch } from 'react-icons/io';
import _ from 'lodash';
import { useEffect, useState } from 'react';
//yarn add --dev @types/lodash
//yarn add lodash
//yarn add autoprefixer

export const SearchClass = () => {
  const { setSelectedCategory } = useCategoryFilterStore();
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedTitle, setSelectedTitle } = useSearchStore();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTitle(e.target.value);
  };
  const [placeHolder, setPlaceHolder] = useState(' 다양한 클래스를 찾아보세요');

  useEffect(() => {
    const handlePlaceHolder = () => {
      setPlaceHolder(window.innerWidth <= 640 ? ' 검색' : ' 다양한 클래스를 찾아보세요');
    };
    window.addEventListener('resize', handlePlaceHolder);
    handlePlaceHolder();

    return () => {
      window.removeEventListener('resize', handlePlaceHolder);
    };
  }, []);

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
    <form className="ml-2 flex h-24 w-full items-center justify-start" onSubmit={handleSearchBtn}>
      <div className="xl:[350px] relative flex w-[150px] items-end justify-end rounded-xl border-[1px] border-input-border-color mobile:w-[250px] sm:w-[280px] lg:w-[320px] 2xl:w-[500px]">
        {/*input에 플렉스 그로우를 안준 이유: 사파리에서 css가 깨지는 현상*/}
        <input
          maxLength={20}
          onChange={handleSearchChange}
          value={selectedTitle}
          className="h-10 w-[102px] min-w-0 rounded-xl text-sm outline-none mobile:w-[202px] sm:w-[232px] md:h-12 md:w-[224px] md:text-base lg:w-[264px] 2xl:w-[436px]"
          type="text"
          placeholder={placeHolder}
        />
        <button
          type="submit"
          className="btn h-10 min-h-10 w-12 rounded-xl border-[1px] border-transparent bg-white shadow-none hover:bg-disable-color  md:h-12 md:w-14 2xl:w-16"
        >
          <IoIosSearch className="text-2xl text-icon-color" />
        </button>
      </div>
    </form>
  );
};

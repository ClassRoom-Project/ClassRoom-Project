'use client';

import { useSearchStore } from '@/store/classFilterStore';
import { useRouter } from 'next/navigation';
import { IoIosSearch } from 'react-icons/io';
import _ from 'lodash';
import { useSearchParams } from 'next/navigation';
//yarn add --dev @types/lodash
//yarn add lodash

export const SearchClass = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const router = useRouter();
  const { selectedTitle, setSelectedTitle } = useSearchStore();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTitle(e.target.value);
  };

  //TODO - 쓰로틀링 잘 적용안되는 에러 해결

  const handleSearchBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/list');
  };
  console.log(selectedTitle, '데이터입니다!!!!!!!!!!!');
  return (
    <form className="h-[120px ml-2 relative w-full flex items-center justify-center" onSubmit={handleSearchBtn}>
      <div className="border-[1px] rounded-xl w-full items-end justify-end border-point-color relative">
        <input
          maxLength={20}
          onChange={handleSearchChange}
          value={selectedTitle}
          className="h-12 ml-16 outline-none rounded-xl"
          type="text"
          placeholder="검색하기"
        />
        <button
          type="submit"
          className="btn border-[1px] border-transparent shadow-none hover:bg-transparent hover:border-transparent  w-16 rounded-xl absolute left-0 bottom-0 bg-transparent"
        >
          <IoIosSearch className="text-2xl text-icon-color" />
        </button>
      </div>
    </form>
  );
};

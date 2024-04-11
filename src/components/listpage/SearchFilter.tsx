'use client';
import { FiAlignJustify } from 'react-icons/fi';
import React, { useState } from 'react';
import { useClassFilterStore } from '@/store/classFilterStore';
const SearchFilter = () => {
  const { setSelectedCategory } = useClassFilterStore();
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  const handleDropdown = () => {
    setIsOpenCategory(!isOpenCategory);
  };
  const handleResetBtn = () => {
    setSelectedCategory('');
  };
  return (
    <div className="flex p-5">
      <div className="dropdown p-5 dropdown-bottom w-12 h-12">
        <div tabIndex={0} onClick={handleDropdown} role="button" className="btn ">
          <FiAlignJustify size={30} color="#5373FF">
            검색필터
          </FiAlignJustify>
        </div>

        {isOpenCategory ? (
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-white border-gray-300 border-solid border-[1px] w-52"
          >
            <div>
              <button
                className={`p-2 font-bold rounded-2xl mx-3 w-24 ${
                  selectedCategory === category ? 'bg-purple-600' : 'bg-white'
                }`}
              >
                온라인
              </button>
              <button
                className={`p-2 font-bold rounded-2xl mx-3 w-24 ${
                  selectedCategory === category ? 'bg-purple-600' : 'bg-white'
                }`}
              >
                {' '}
                오프라인
              </button>
            </div>
            <div>location</div>
            <div>time</div>
            <div>difficulty</div>
            <div>price</div>
          </ul>
        ) : (
          <></>
        )}
      </div>
      <button onClick={handleResetBtn} className="btn ml-12 m-5 w-17 h-12">
        초기화
      </button>
    </div>
  );
};

export default SearchFilter;

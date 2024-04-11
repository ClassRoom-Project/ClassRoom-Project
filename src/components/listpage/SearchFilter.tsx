'use client';
import { FiAlignJustify } from 'react-icons/fi';
import React, { useState } from 'react';
import { useCategoryFilterStore, useListFilterStore } from '@/store/classFilterStore';
const SearchFilter = () => {
  const { setSelectedCategory } = useCategoryFilterStore();
  const { ClassFilters, setClassFilters } = useListFilterStore();
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  const handleDropdown = () => {
    setIsOpenCategory(!isOpenCategory);
  };
  const handleResetBtn = () => {
    setSelectedCategory('');
    setClassFilters({
      selectedClassType: '',
      selectedLocation: null,
      selectedAMPM: null,
      selectedDifficulty: null,
      selectedPrice: null
    });
  };
  const handleClassTypeBtn = (classType: string) => {
    setClassFilters({ ...ClassFilters, selectedClassType: classType });
  };
  return (
    <div className="flex p-5">
      <div className="dropdown dropdown-bottom w-12 h-12">
        <div tabIndex={0} onClick={handleDropdown} role="button" className="btn ">
          <FiAlignJustify size={30} color="#5373FF">
            검색필터
          </FiAlignJustify>
        </div>

        {isOpenCategory ? (
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-white border-gray-300 border-solid border-[1px] w-80 h-[600px]"
          >
            <div>
              <button
                onClick={() => handleClassTypeBtn('온라인')}
                className={`p-2 font-bold rounded-2xl mx-3 w-24 ${
                  ClassFilters === '온라인' ? 'bg-purple-600' : 'bg-white'
                }`}
              >
                온라인
              </button>
              <button
                onClick={() => handleClassTypeBtn('오프라인')}
                className={`p-2 font-bold rounded-2xl mx-3 w-24 ${
                  ClassFilters === '오프라인' ? 'bg-purple-600' : 'bg-white'
                }`}
              >
                오프라인
              </button>
            </div>
            <div>
              <select className="select select-primary w-full max-w-xs">
                <option disabled selected>
                  지역을 선택하세요
                </option>
                <option>서울</option>
                <option>경기</option>
                <option>인천</option>
                <option>충청남도</option>
                <option>충청북도</option>
                <option>강원도</option>
                <option>경상북도</option>
                <option>경상남도</option>
                <option>전라북도</option>
                <option>전라남도</option>
                <option>제주도</option>
              </select>
            </div>
            <div>
              <button
                className={`p-2 font-bold rounded-2xl mx-3 w-24 ${
                  ClassFilters === ClassFilters ? 'bg-purple-600' : 'bg-white'
                }`}
              >
                오전
              </button>
              <button
                className={`p-2 font-bold rounded-2xl mx-3 w-24 ${
                  ClassFilters === ClassFilters ? 'bg-purple-600' : 'bg-white'
                }`}
              >
                오후
              </button>
            </div>
            <div>
              <button
                className={`p-2 font-bold rounded-2xl mx-3 w-24 ${
                  ClassFilters === ClassFilters ? 'bg-purple-600' : 'bg-white'
                }`}
              >
                입문
              </button>
              <button
                className={`p-2 font-bold rounded-2xl mx-3 w-24 ${
                  ClassFilters === ClassFilters ? 'bg-purple-600' : 'bg-white'
                }`}
              >
                초급
              </button>
              <button
                className={`p-2 font-bold rounded-2xl mx-3 w-24 ${
                  ClassFilters === ClassFilters ? 'bg-purple-600' : 'bg-white'
                }`}
              >
                중급
              </button>
              <button
                className={`p-2 font-bold rounded-2xl mx-3 w-24 ${
                  ClassFilters === ClassFilters ? 'bg-purple-600' : 'bg-white'
                }`}
              >
                고급
              </button>
            </div>
            <div>
              <input
                type="text"
                placeholder="최소 가격"
                className="input input-bordered input-primary w-full max-w-xs"
              />
              <input
                type="text"
                placeholder="최대 가격"
                className="input input-bordered input-primary w-full max-w-xs"
              />
            </div>
          </ul>
        ) : (
          <></>
        )}
      </div>
      <button onClick={handleResetBtn} className="btn ml-12 w-17 h-12">
        초기화
      </button>
    </div>
  );
};

export default SearchFilter;

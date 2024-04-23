'use client';
import { FiAlignJustify } from 'react-icons/fi';
import React, { useState } from 'react';
import { useCategoryFilterStore, useListFilterStore } from '@/store/classFilterStore';
import { useSearchStore } from '@/store/classFilterStore';
import { useRouter, useSearchParams } from 'next/navigation';
const SearchFilter = () => {
  const { setSelectedCategory } = useCategoryFilterStore();
  const { ClassFilters, setClassFilters } = useListFilterStore();
  const [isOpenCategory, setIsOpenCategory] = useState(true);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const { setSelectedTitle } = useSearchStore();
  const router = useRouter();

  const handleDropdown = () => {
    // setIsOpenCategory(!isOpenCategory);
  };
  //초기화 버튼 핸들러
  const handleResetBtn = () => {
    setSelectedCategory('');
    setClassFilters({
      selectedClassType: '',
      selectedLocation: null,
      selectedDifficulty: null,
      selectedPrice: null,
      selectedDayType: null
    });
    setMinPrice('');
    setMaxPrice('');
    setSelectedTitle('');
    router.push('/list');
  };

  //가격 버튼 색상 스테이트 함수
  const isPriceSelected = (min: number, max: number) => {
    return ClassFilters.selectedPrice?.min === min && ClassFilters.selectedPrice?.max === max;
  };
  //클래스 타입 핸들러
  const handleClassTypeBtn = (classType: string) => {
    setClassFilters({ ...ClassFilters, selectedClassType: classType });
  };
  //클래스 위치 핸들러
  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocation = event.target.value;
    setClassFilters({ ...ClassFilters, selectedLocation });
  };
  //클래스 난이도 핸들러
  const handleClassDifficultyBtn = (classDifficulty: string) => {
    setClassFilters({ ...ClassFilters, selectedDifficulty: classDifficulty });
  };
  //클래스 가격 핸들러
  const handlePriceFilter = (min: number, max: number) => {
    setClassFilters({ ...ClassFilters, selectedPrice: { min, max } });
  };

  // 클래스 요일 핸들러
  const handleClassDayClick = (dayType: string) => {
    setClassFilters({ ...ClassFilters, selectedDayType: dayType });
  };

  return (
    <div className="flex w-full items-start justify-start p-5">
      <div className="dropdown-bottom w-12 h-12 z-30">
        <div tabIndex={0} onClick={handleDropdown} role="button" className="btn ">
          <FiAlignJustify size={30} color="#6C5FF7">
            검색필터
          </FiAlignJustify>
        </div>

        {isOpenCategory ? (
          <ul
            tabIndex={0}
            className="p-8 border border-solid border-button-focus-color rounded-md gap-2.5 dropdown-content justify-center flex flex-col items-center z-[1] menu shadow-xl bg-pale-purple w-fit"
          >
            <div className=" flex flex-col items-center justify-center w-full  ">
              <div className="flex mb-3 items-start w-64 justify-start">
                <p className="text-black mb-1">클래스 타입</p>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => handleClassTypeBtn('온라인 클래스')}
                  className={` py-1  border-solid border-point-purple border-[1px] rounded-2xl mx-3 w-24 ${
                    ClassFilters.selectedClassType === '온라인 클래스' ? 'bg-point-purple text-white' : 'bg-pale-purple'
                  }`}
                >
                  온라인
                </button>
                <button
                  onClick={() => handleClassTypeBtn('오프라인 클래스')}
                  className={` py-1  rounded-2xl border-solid border-point-purple border-[1px] mx-3 w-24 ${
                    ClassFilters.selectedClassType === '오프라인 클래스'
                      ? 'bg-point-purple text-white'
                      : 'bg-pale-purple'
                  }`}
                >
                  오프라인
                </button>
              </div>
            </div>
            <div className="divider m-0"></div>
            {/* ------------------------------------------------------- */}
            <div>
              <div className="w-full  flex flex-col justify-center items-center">
                <div className="flex flex-col items-start w-64 mb-3 justify-start">
                  <p className="text-black">지역</p>
                </div>
                <select
                  className="select select-primary w-full"
                  value={ClassFilters.selectedLocation || ''}
                  onChange={handleLocationChange}
                >
                  <option value="" disabled>
                    지역을 선택하세요
                  </option>
                  <option value={'서울'}>서울</option>
                  <option value={'경기'}>경기</option>
                  <option value={'인천'}>인천</option>
                  <option value={'충남'}>충남</option>
                  <option value={'충북'}>충북</option>
                  <option value={'강원특별자치도'}>강원</option>
                  <option value={'경북'}>경북</option>
                  <option value={'경남'}>경남</option>
                  <option value={'전북'}>전북</option>
                  <option value={'전남'}>전남</option>
                  <option value={'제주특별자치도'}>제주</option>
                </select>
              </div>
            </div>
            <div className="divider m-0"></div>

            <div className=" flex items-center justify-start gap-4 w-full  ">
              <div className="flex  justify-start">
                <p className="text-black">요일</p>
              </div>
              <button
                onClick={() => handleClassDayClick('평일')}
                className={`py-1 rounded-2xl border-solid border-point-purple border-[1px]  w-16 ${
                  ClassFilters.selectedDayType === '평일' ? 'bg-point-purple text-white' : 'bg-pale-purple'
                }`}
              >
                평일
              </button>
              <button
                onClick={() => handleClassDayClick('주말')}
                className={`py-1 rounded-2xl border-solid border-point-purple border-[1px]  w-16 ${
                  ClassFilters.selectedDayType === '주말' ? 'bg-point-purple text-white' : 'bg-pale-purple'
                }`}
              >
                주말
              </button>
            </div>
            <div className="divider m-0"></div>

            <div className="w-full justify-center items-center">
              <div className="flex items-start w-64 justify-start mb-3">
                <p className="text-black">난이도</p>
              </div>
              <div className="flex w-full justify-center">
                <div className="grid w-3/4 grid-cols-2 justify-between gap-4">
                  <button
                    onClick={() => handleClassDifficultyBtn('입문')}
                    className={`py-1 rounded-2xl border-solid border-point-purple border-[1px]  ${
                      ClassFilters.selectedDifficulty === '입문' ? 'bg-point-purple text-white' : 'bg-pale-purple'
                    }`}
                  >
                    입문
                  </button>
                  <button
                    onClick={() => handleClassDifficultyBtn('초급')}
                    className={`py-1 rounded-2xl border-solid border-point-purple border-[1px]   ${
                      ClassFilters.selectedDifficulty === '초급' ? 'bg-point-purple text-white' : 'bg-pale-purple'
                    }`}
                  >
                    초급
                  </button>
                  <button
                    onClick={() => handleClassDifficultyBtn('중급')}
                    className={`py-1 rounded-2xl border-solid border-point-purple border-[1px]  ${
                      ClassFilters.selectedDifficulty === '중급' ? 'bg-point-purple text-white' : 'bg-pale-purple'
                    }`}
                  >
                    중급
                  </button>
                  <button
                    onClick={() => handleClassDifficultyBtn('고급')}
                    className={`py-1 rounded-2xl border-solid border-point-purple border-[1px]  ${
                      ClassFilters.selectedDifficulty === '고급' ? 'bg-point-purple text-white' : 'bg-pale-purple'
                    }`}
                  >
                    고급
                  </button>
                </div>
              </div>
            </div>
            <div className="divider m-0"></div>

            <div className="w-full justify-center items-center">
              <div className="flex items-start w-64 justify-start mb-3">
                <p className="text-black">금액</p>
              </div>
              <div className="flex w-full justify-center">
                <div className="grid w-full grid-cols-2 justify-between gap-4">
                  <button
                    onClick={() => handlePriceFilter(0, 19999)}
                    className={`py-1 rounded-2xl border-solid border-point-purple border-[1px]  ${
                      isPriceSelected(0, 19999) ? 'bg-point-purple text-white' : 'bg-pale-purple'
                    }`}
                  >
                    20,000원 미만
                  </button>
                  <button
                    onClick={() => handlePriceFilter(0, 49999)}
                    className={`py-1 rounded-2xl border-solid border-point-purple border-[1px]   ${
                      isPriceSelected(0, 49999) ? 'bg-point-purple text-white' : 'bg-pale-purple'
                    }`}
                  >
                    50,000원 미만
                  </button>
                  <button
                    onClick={() => handlePriceFilter(0, 99999)}
                    className={`py-1 rounded-2xl border-solid border-point-purple border-[1px]  ${
                      isPriceSelected(0, 99999) ? 'bg-point-purple text-white' : 'bg-pale-purple'
                    }`}
                  >
                    100,000원 미만
                  </button>
                  <button
                    onClick={() => handlePriceFilter(100000, 1000000000000000)}
                    className={`py-1 rounded-2xl border-solid border-point-purple border-[1px]  ${
                      isPriceSelected(100000, 1000000000000000) ? 'bg-point-purple text-white' : 'bg-pale-purple'
                    }`}
                  >
                    100,000원 이상
                  </button>
                </div>
              </div>
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

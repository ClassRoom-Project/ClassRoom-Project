'use client';
import { useCategoryFilterStore, useListFilterStore, useSearchStore } from '@/store/classFilterStore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FiAlignJustify } from 'react-icons/fi';
import { PriceBtn, DifficultyBtn } from './listpageBtns';
const SearchFilter = () => {
  const { setSelectedCategory } = useCategoryFilterStore();
  const { ClassFilters, setClassFilters } = useListFilterStore();
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const { setSelectedTitle } = useSearchStore();
  const router = useRouter();

  const handleDropdown = () => {
    setIsOpenCategory(isOpenCategory ? false : true);
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
  const handleClassDifficultyBtn = (classDifficulty: string): (() => void) => {
    return () => {
      setClassFilters({ ...ClassFilters, selectedDifficulty: classDifficulty });
    };
  };
  //클래스 가격 핸들러
  const handlePriceFilter = (min: number, max: number): (() => void) => {
    return () => {
      setClassFilters({ ...ClassFilters, selectedPrice: { min, max } });
    };
  };

  // 클래스 요일 핸들러
  const handleClassDayClick = (dayType: string) => {
    setClassFilters({ ...ClassFilters, selectedDayType: dayType });
  };

  const checkAndCloseDropDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let targetEl = e.currentTarget;
    if (targetEl && targetEl.matches(':focus')) {
      setTimeout(function () {
        targetEl.blur();
      }, 0);
    }
  };

  return (
    <div className="flex w-full items-start justify-start">
      <div className="dropdown dropdown-bottom z-30">
        <div
          tabIndex={0}
          onMouseDown={(e) => checkAndCloseDropDown(e)}
          role="button"
          className="btn ml-2 h-11 w-12 p-0 hover:bg-white md:ml-0 md:w-16"
        >
          <FiAlignJustify
            role="button"
            className="swap-off fill-current text-main-color hover:bg-white"
            size={30}
          ></FiAlignJustify>
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] flex w-fit flex-col items-center justify-center  gap-2.5 rounded-md border border-solid border-button-focus-color bg-pale-purple p-1 shadow-xl md:p-8"
        >
          <div className="w-full items-center justify-center">
            <div className="flex w-full items-start justify-start md:mb-3 md:w-64">
              <p className=" text-black">타입</p>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-1 text-xs md:flex-row md:gap-3 md:text-base">
              <button
                onClick={() => handleClassTypeBtn('온라인 클래스')}
                className={`w-12 rounded-2xl  border-[1px] border-solid border-point-purple py-1  md:w-24 ${
                  ClassFilters.selectedClassType === '온라인 클래스'
                    ? 'bg-point-purple text-white'
                    : 'bg-pale-purple transition-all hover:bg-button-disable-color'
                }`}
              >
                온라인
              </button>
              <button
                onClick={() => handleClassTypeBtn('오프라인 클래스')}
                className={`w-14 rounded-2xl  border-[1px] border-solid border-point-purple py-1  md:w-24 ${
                  ClassFilters.selectedClassType === '오프라인 클래스'
                    ? 'bg-point-purple text-white'
                    : 'bg-pale-purple transition-all hover:bg-button-disable-color'
                }`}
              >
                오프라인
              </button>
            </div>
          </div>
          <div className="divider m-0 h-1 md:h-4"></div>
          <div>
            <div className="w-full items-center justify-center">
              <div className="flex w-full items-start justify-start md:mb-3 md:w-64">
                <p className="text-black">지역</p>
              </div>
              <select
                className="select select-primary w-28 md:h-12  md:w-full"
                value={ClassFilters.selectedLocation || ''}
                onChange={handleLocationChange}
              >
                <option value="" className="bg-disable-color text-xs md:text-base" disabled>
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
          <div className="divider m-0 h-1 md:h-4"></div>
          <div className="w-full items-center justify-center">
            <div className="flex w-full items-start justify-start md:mb-3 md:w-64">
              <p className="text-black">요일</p>
            </div>
            <div className="flex w-full items-center justify-center gap-1 text-xs md:gap-3 md:text-base">
              <button
                onClick={() => handleClassDayClick('평일')}
                className={`w-12 rounded-2xl border-[1px] border-solid border-point-purple py-1  md:w-24 ${
                  ClassFilters.selectedDayType === '평일'
                    ? 'bg-point-purple text-white'
                    : 'bg-pale-purple transition-all hover:bg-button-disable-color'
                }`}
              >
                평일
              </button>
              <button
                onClick={() => handleClassDayClick('주말')}
                className={`w-12 rounded-2xl border-[1px] border-solid border-point-purple py-1  md:w-24 ${
                  ClassFilters.selectedDayType === '주말'
                    ? 'bg-point-purple text-white'
                    : 'bg-pale-purple transition-all hover:bg-button-disable-color'
                }`}
              >
                주말
              </button>
            </div>
          </div>
          <div className="divider m-0 h-1 md:h-4"></div>
          <div className="w-full items-center justify-center">
            <div className="flex w-full items-start justify-start md:mb-3 md:w-64">
              <p className="text-black">난이도</p>
            </div>
            <div className="flex w-full justify-center">
              <div className="grid grid-cols-2 justify-between gap-1 md:gap-3">
                <DifficultyBtn
                  classFilters={ClassFilters}
                  difficulty={'입문'}
                  handleClassDifficultyBtn={handleClassDifficultyBtn('입문')}
                />
                <DifficultyBtn
                  classFilters={ClassFilters}
                  difficulty={'초급'}
                  handleClassDifficultyBtn={handleClassDifficultyBtn('초급')}
                />
                <DifficultyBtn
                  classFilters={ClassFilters}
                  difficulty={'중급'}
                  handleClassDifficultyBtn={handleClassDifficultyBtn('중급')}
                />

                <DifficultyBtn
                  classFilters={ClassFilters}
                  difficulty={'고급'}
                  handleClassDifficultyBtn={handleClassDifficultyBtn('고급')}
                />
              </div>
            </div>
          </div>
          <div className="divider m-0 h-1 md:h-4"></div>
          <div className="flex w-full flex-col items-center justify-center">
            <div className="flex w-full items-start justify-start md:mb-3 md:w-64 md:items-start md:justify-start">
              <p className="text-black">금액</p>
            </div>
            <div className="flex w-full justify-center">
              <div className="grid grid-cols-1 justify-between gap-1 md:w-full md:grid-cols-2 md:gap-3">
                <PriceBtn
                  handlePriceFilter={handlePriceFilter(0, 19999)}
                  classFilters={ClassFilters}
                  minPrice={0}
                  maxPrice={19999}
                  filterText={'20,000원 미만'}
                />
                <PriceBtn
                  handlePriceFilter={handlePriceFilter(0, 49999)}
                  classFilters={ClassFilters}
                  minPrice={0}
                  maxPrice={49999}
                  filterText={'50,000원 미만'}
                />
                <PriceBtn
                  handlePriceFilter={handlePriceFilter(0, 99999)}
                  classFilters={ClassFilters}
                  minPrice={0}
                  maxPrice={99999}
                  filterText={'100,000원 미만'}
                />
                <PriceBtn
                  handlePriceFilter={handlePriceFilter(100000, 1000000000000000)}
                  classFilters={ClassFilters}
                  minPrice={100000}
                  maxPrice={1000000000000000}
                  filterText={'100,000원 이상'}
                />
              </div>
            </div>
          </div>
        </ul>
      </div>
      <button
        onClick={handleResetBtn}
        className="btn ml-4 h-11 w-12 p-0 text-sm hover:bg-white hover:text-dark-purple-color md:ml-12 md:w-16 md:text-base"
      >
        <p className="text-xs md:text-sm">초기화</p>
      </button>
    </div>
  );
};

export default SearchFilter;

'use client';
import { useCategoryFilterStore, useListFilterStore, useSearchStore } from '@/store/classFilterStore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FiAlignJustify } from 'react-icons/fi';
import { PriceBtn } from './listpageBtns';
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

  const checkAndCloseDropDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let targetEl = e.currentTarget;
    if (targetEl && targetEl.matches(':focus')) {
      setTimeout(function () {
        targetEl.blur();
      }, 0);
    }
  };

  return (
    <div className="flex w-full items-start justify-start pt-5">
      <div className="dropdown dropdown-bottom z-30 h-9 w-9 md:h-12 md:w-12">
        <div tabIndex={0} onMouseDown={(e) => checkAndCloseDropDown(e)} role="button" className="btn ">
          <FiAlignJustify role="button" className="swap-off fill-current" size={30} color="#6C5FF7"></FiAlignJustify>
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] flex w-fit flex-col items-center justify-center  gap-2.5 rounded-md border border-solid border-button-focus-color bg-pale-purple p-1 shadow-xl md:p-8"
        >
          <div className="flex w-full flex-col items-center justify-center">
            <div className="mb-3 flex w-64 items-start justify-start">
              <p className="mb-1 text-black">클래스 타입</p>
            </div>
            <div className="flex w-full justify-center gap-4">
              <button
                onClick={() => handleClassTypeBtn('온라인 클래스')}
                className={` w-24  rounded-2xl border-[1px] border-solid border-point-purple  py-1 ${
                  ClassFilters.selectedClassType === '온라인 클래스'
                    ? 'bg-point-purple text-white'
                    : 'bg-pale-purple transition-all hover:bg-button-disable-color'
                }`}
              >
                온라인
              </button>
              <button
                onClick={() => handleClassTypeBtn('오프라인 클래스')}
                className={` w-24  rounded-2xl border-[1px] border-solid border-point-purple  py-1 ${
                  ClassFilters.selectedClassType === '오프라인 클래스'
                    ? 'bg-point-purple text-white'
                    : 'bg-pale-purple transition-all hover:bg-button-disable-color'
                }`}
              >
                오프라인
              </button>
            </div>
          </div>
          <div className="divider m-0"></div>
          <div>
            <div className="flex  w-full flex-col items-center justify-center">
              <div className="mb-3 flex w-64 flex-col items-start justify-start">
                <p className="text-black">지역</p>
              </div>
              <select
                className="select select-primary w-1/2 md:w-full"
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
          <div className=" flex w-full items-center justify-start gap-4  ">
            <div className="flex  justify-start">
              <p className="text-black">요일</p>
            </div>
            <button
              onClick={() => handleClassDayClick('평일')}
              className={`w-16 rounded-2xl border-[1px] border-solid border-point-purple  py-1 ${
                ClassFilters.selectedDayType === '평일'
                  ? 'bg-point-purple text-white'
                  : 'bg-pale-purple transition-all hover:bg-button-disable-color'
              }`}
            >
              평일
            </button>
            <button
              onClick={() => handleClassDayClick('주말')}
              className={`w-16 rounded-2xl border-[1px] border-solid border-point-purple  py-1 ${
                ClassFilters.selectedDayType === '주말'
                  ? 'bg-point-purple text-white'
                  : 'bg-pale-purple transition-all hover:bg-button-disable-color'
              }`}
            >
              주말
            </button>
          </div>
          <div className="divider m-0"></div>
          <div className="w-full items-center justify-center">
            <div className="mb-3 flex w-64 items-start justify-start">
              <p className="text-black">난이도</p>
            </div>
            <div className="flex w-full justify-center">
              <div className="grid w-3/4 grid-cols-2 justify-between gap-3">
                <button
                  onClick={() => handleClassDifficultyBtn('입문')}
                  className={`rounded-2xl border-[1px] border-solid border-point-purple py-1  ${
                    ClassFilters.selectedDifficulty === '입문'
                      ? 'bg-point-purple text-white'
                      : 'bg-pale-purple transition-all hover:bg-button-disable-color'
                  }`}
                >
                  입문
                </button>
                <button
                  onClick={() => handleClassDifficultyBtn('초급')}
                  className={`rounded-2xl border-[1px] border-solid border-point-purple py-1 transition-all hover:bg-button-disable-color   ${
                    ClassFilters.selectedDifficulty === '초급'
                      ? 'bg-point-purple text-white'
                      : 'bg-pale-purple transition-all hover:bg-button-disable-color'
                  }`}
                >
                  초급
                </button>
                <button
                  onClick={() => handleClassDifficultyBtn('중급')}
                  className={`rounded-2xl border-[1px] border-solid border-point-purple py-1  ${
                    ClassFilters.selectedDifficulty === '중급'
                      ? 'bg-point-purple text-white'
                      : 'bg-pale-purple transition-all hover:bg-button-disable-color'
                  }`}
                >
                  중급
                </button>
                <button
                  onClick={() => handleClassDifficultyBtn('고급')}
                  className={`rounded-2xl border-[1px] border-solid border-point-purple py-1  ${
                    ClassFilters.selectedDifficulty === '고급'
                      ? 'bg-point-purple text-white'
                      : 'bg-pale-purple transition-all hover:bg-button-disable-color'
                  }`}
                >
                  고급
                </button>
              </div>
            </div>
          </div>
          <div className="divider m-0"></div>
          <div className="w-full items-center justify-center">
            <div className="mb-3 flex w-64 items-start justify-start">
              <p className="text-black">금액</p>
            </div>
            <div className="flex w-full justify-center">
              <div className="grid w-full grid-cols-2 justify-between gap-3">
                <PriceBtn classFilters={ClassFilters} minPrice={0} maxPrice={19999} filterText={'20,000원 미만'} />
                <PriceBtn classFilters={ClassFilters} minPrice={0} maxPrice={49999} filterText={'50,000원 미만'} />
                <PriceBtn classFilters={ClassFilters} minPrice={0} maxPrice={99999} filterText={'100,000원 미만'} />
                <PriceBtn
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
      <button onClick={handleResetBtn} className="w-17 btn ml-12 h-12">
        초기화
      </button>
    </div>
  );
};

export default SearchFilter;

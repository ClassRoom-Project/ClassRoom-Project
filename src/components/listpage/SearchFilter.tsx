'use client';
import { FiAlignJustify } from 'react-icons/fi';
import React, { useState } from 'react';
import { useCategoryFilterStore, useListFilterStore } from '@/store/classFilterStore';
import { useSearchStore } from '@/store/classFilterStore';
import { useRouter, useSearchParams } from 'next/navigation';
const SearchFilter = () => {
  const { setSelectedCategory } = useCategoryFilterStore();
  const { ClassFilters, setClassFilters } = useListFilterStore();
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const { setSelectedTitle } = useSearchStore();
  const router = useRouter();

  const handleDropdown = () => {
    setIsOpenCategory(!isOpenCategory);
  };
  //초기화 버튼 핸들러
  const handleResetBtn = () => {
    setSelectedCategory('');
    setClassFilters({
      selectedClassType: '',
      selectedLocation: null,
      selectedDifficulty: null,
      selectedPrice: null
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

  return (
    <div className="flex w-full items-start justify-start p-5">
      <div className="dropdown dropdown-bottom w-12 h-12">
        <div tabIndex={0} onClick={handleDropdown} role="button" className="btn ">
          <FiAlignJustify size={30} color="#6C5FF7">
            검색필터
          </FiAlignJustify>
        </div>

        {isOpenCategory ? (
          <ul
            tabIndex={0}
            className={`dropdown-content justify-center flex flex-col items-center z-[1] menu shadow bg-disable-color border-border-color border-solid border-[1px] w-[400px] h-[650px] `}
          >
            <div className="border-b-[1px] flex flex-col items-center justify-center w-80 h-[125px] border-solid border-gray-400">
              <div className="flex mb-3 items-start w-72 justify-start">
                <p className="text-text-color">클래스 타입</p>
              </div>
              <div className="flex">
                <button
                  onClick={() => handleClassTypeBtn('온라인 클래스')}
                  className={`p-2 font-bold border-solid border-main-color border-[1px] rounded-2xl mx-3 w-24 ${
                    ClassFilters.selectedClassType === '온라인 클래스' ? 'bg-button-focus-color' : 'bg-white'
                  }`}
                >
                  온라인
                </button>
                <button
                  onClick={() => handleClassTypeBtn('오프라인 클래스')}
                  className={`p-2 font-bold rounded-2xl border-solid border-main-color border-[1px] mx-3 w-24 ${
                    ClassFilters.selectedClassType === '오프라인 클래스' ? 'bg-button-focus-color' : 'bg-white'
                  }`}
                >
                  오프라인
                </button>
              </div>
            </div>
            <div>
              <div className="border-b-[1px] border-solid border-gray-400 mt-2 w-80 h-[125px] flex flex-col justify-center items-center">
                <div className="flex flex-col items-start w-72 mb-3 justify-start">
                  <p className="text-text-color">지역</p>
                </div>
                <select
                  className="select select-primary w-72"
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
            <div className="flex flex-col w-80 mt-9 h-[125px] border-b-[1px] border-solid border-gray-400 justify-center items-center">
              <div className="flex items-start w-72 justify-start">
                <p className="text-text-color">난이도</p>
              </div>
              <div className="p-2">
                <button
                  onClick={() => handleClassDifficultyBtn('입문')}
                  className={`p-2 font-bold rounded-2xl border-solid border-point-color border-[1px] mx-3 w-24 ${
                    ClassFilters.selectedDifficulty === '입문' ? 'bg-button-focus-color' : 'bg-white'
                  }`}
                >
                  입문
                </button>
                <button
                  onClick={() => handleClassDifficultyBtn('초급')}
                  className={`p-2 font-bold rounded-2xl border-solid border-point-color border-[1px] mx-3 w-24 ${
                    ClassFilters.selectedDifficulty === '초급' ? 'bg-button-focus-color' : 'bg-white'
                  }`}
                >
                  초급
                </button>
              </div>
              <div className="p-2">
                <button
                  onClick={() => handleClassDifficultyBtn('중급')}
                  className={`p-2 font-bold rounded-2xl border-solid border-point-color border-[1px] mx-3 w-24 ${
                    ClassFilters.selectedDifficulty === '중급' ? 'bg-button-focus-color' : 'bg-white'
                  }`}
                >
                  중급
                </button>
                <button
                  onClick={() => handleClassDifficultyBtn('고급')}
                  className={`p-2 font-bold rounded-2xl border-solid border-point-color border-[1px] mx-3 w-24 ${
                    ClassFilters.selectedDifficulty === '고급' ? 'bg-button-focus-color' : 'bg-white'
                  }`}
                >
                  고급
                </button>
              </div>
            </div>
            <div>
              <div className="flex my-9 w-72 h-[125px] flex-col justify-center items-center">
                <div className="flex items-start mb-3 w-72 justify-start">
                  <p className="text-text-color">금액</p>
                </div>
                <div className="flex flex-col items-center w-72 justify-start">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => handlePriceFilter(0, 19999)}
                      className={`p-2 font-bold rounded-2xl border-solid border-point-color border-[1px] mx-3 w-30 ${
                        isPriceSelected(0, 19999) ? 'bg-button-focus-color' : 'bg-white'
                      }`}
                    >
                      20,000원 미만
                    </button>
                    <button
                      onClick={() => handlePriceFilter(0, 49999)}
                      className={`p-2 font-bold rounded-2xl border-solid border-point-color border-[1px] mx-3 w-30 ${
                        isPriceSelected(0, 49999) ? 'bg-button-focus-color' : 'bg-white'
                      }`}
                    >
                      50,000원 미만
                    </button>
                  </div>
                  <div className="flex items-center mt-4 justify-center">
                    <button
                      onClick={() => handlePriceFilter(0, 99999)}
                      className={`p-2 font-bold rounded-2xl border-solid border-point-color border-[1px] mx-2 w-30 ${
                        isPriceSelected(0, 99999) ? 'bg-button-focus-color' : 'bg-white'
                      }`}
                    >
                      100,000원 미만
                    </button>
                    <button
                      onClick={() => handlePriceFilter(100000, 1000000000000000)}
                      className={`p-2 font-bold rounded-2xl border-solid border-point-color border-[1px] mx-2 w-30 ${
                        isPriceSelected(100000, 1000000000000000) ? 'bg-button-focus-color' : 'bg-white'
                      }`}
                    >
                      100,000원 이상
                    </button>
                  </div>
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

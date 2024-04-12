'use client';
import { FiAlignJustify } from 'react-icons/fi';
import React, { useState } from 'react';
import { useCategoryFilterStore, useListFilterStore } from '@/store/classFilterStore';
import { convertTimeTo12HourClock } from '@/utils/convertTimeTo12HourClock';

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
      selectedTime: [],
      selectedDifficulty: null,
      selectedPrice: null
    });
  };
  const handleClassTypeBtn = (classType: string) => {
    setClassFilters({ ...ClassFilters, selectedClassType: classType });
  };
  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocation = event.target.value;
    setClassFilters({ ...ClassFilters, selectedLocation });
  };
  const handleClassDifficultyBtn = (classDifficulty: string) => {
    setClassFilters({ ...ClassFilters, selectedDifficulty: classDifficulty });
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
            className="dropdown-content justify-center flex flex-col items-center z-[1] menu shadow bg-white border-gray-300 border-solid border-[1px] w-[360px] h-[500px]"
          >
            <div className="border-b-[1px] flex items-center justify-center w-80 border-solid border-gray-400">
              <button
                onClick={() => handleClassTypeBtn('온라인 클래스')}
                className={`p-2 font-bold rounded-2xl mx-3 w-24 ${
                  ClassFilters.selectedClassType === '온라인 클래스' ? 'bg-purple-600' : 'bg-white'
                }`}
              >
                온라인
              </button>
              <button
                onClick={() => handleClassTypeBtn('오프라인 클래스')}
                className={`p-2 font-bold rounded-2xl mx-3 w-24 ${
                  ClassFilters.selectedClassType === '오프라인 클래스' ? 'bg-purple-600' : 'bg-white'
                }`}
              >
                오프라인
              </button>
            </div>
            <div>
              <div className="border-b-[1px] border-solid border-gray-400 w-80 flex flex-col justify-center items-center">
                <div className="flex items-start w-72 justify-start">
                  <p>지역</p>
                </div>
                <select className="select select-primary w-72" onChange={handleLocationChange}>
                  <option disabled selected>
                    지역을 선택하세요
                  </option>
                  <option value={'서울'}>서울</option>
                  <option value={'경기'}>경기</option>
                  <option value={'인천'}>인천</option>
                  <option value={'충남'}>충남</option>
                  <option value={'충북'}>충북</option>
                  <option value={'강원'}>강원</option>
                  <option value={'경북'}>경북</option>
                  <option value={'경남'}>경남</option>
                  <option value={'전북'}>전북</option>
                  <option value={'전남'}>전남</option>
                  <option value={'제주특별자치도'}>제주</option>
                </select>
              </div>
            </div>
            <div className="border-b-[1px] flex items-center justify-center flex-col border-solid w-80 border-gray-400">
              <div className="flex items-start w-72 justify-start">
                <p>시간</p>
              </div>
              <div>
                <button
                  onClick={() => handleAMPMClick('AM')}
                  className={`p-2 font-bold rounded-2xl mx-3 w-24 ${
                    ClassFilters.selectedTime?.some((time) => convertTimeTo12HourClock(time).includes('AM'))
                      ? 'bg-purple-600'
                      : 'bg-white'
                  }`}
                >
                  오전
                </button>
                <button
                  onClick={() => handleAMPMClick('PM')}
                  className={`p-2 font-bold rounded-2xl mx-3 w-24 ${
                    ClassFilters.selectedTime?.some((time) => convertTimeTo12HourClock(time).includes('PM'))
                      ? 'bg-purple-600'
                      : 'bg-white'
                  }`}
                >
                  오후
                </button>
              </div>
            </div>
            <div className="flex flex-col w-80 border-b-[1px] border-solid border-gray-400 justify-center items-center">
              <div className="flex items-start w-72 justify-start">
                <p>난이도</p>
              </div>
              <div className="p-2">
                <button
                  onClick={() => handleClassDifficultyBtn('입문')}
                  className={`p-2 font-bold rounded-2xl mx-3 w-24 ${
                    ClassFilters.selectedDifficulty === '입문' ? 'bg-purple-600' : 'bg-white'
                  }`}
                >
                  입문
                </button>
                <button
                  onClick={() => handleClassDifficultyBtn('초급')}
                  className={`p-2 font-bold rounded-2xl mx-3 w-24 ${
                    ClassFilters.selectedDifficulty === '초급' ? 'bg-purple-600' : 'bg-white'
                  }`}
                >
                  초급
                </button>
              </div>
              <div className="p-2">
                <button
                  onClick={() => handleClassDifficultyBtn('중급')}
                  className={`p-2 font-bold rounded-2xl mx-3 w-24 ${
                    ClassFilters.selectedDifficulty === '중급' ? 'bg-purple-600' : 'bg-white'
                  }`}
                >
                  중급
                </button>
                <button
                  onClick={() => handleClassDifficultyBtn('고급')}
                  className={`p-2 font-bold rounded-2xl mx-3 w-24 ${
                    ClassFilters.selectedDifficulty === '고급' ? 'bg-purple-600' : 'bg-white'
                  }`}
                >
                  고급
                </button>
              </div>
            </div>
            <div>
              <div className="flex w-72 flex-col justify-center items-center">
                <div className="flex items-start w-72 justify-start">
                  <p>금액</p>
                </div>
                <div className="flex items-center w-72 justify-start">
                  <input
                    type="text"
                    placeholder="최소 가격"
                    className="input input-bordered input-primary w-full min-w-[60px]"
                  />
                  {''}
                  <p>~</p>
                  {''}
                  <input
                    type="text"
                    placeholder="최대 가격"
                    className="input input-bordered input-primary w-full min-w-[60px]"
                  />
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

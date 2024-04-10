'use client';
import { FiAlignJustify } from 'react-icons/fi';
import React, { useState } from 'react';

const Categories = () => {
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  const handleDropdown = () => {
    setIsOpenCategory(!isOpenCategory);
  };
  return (
    <div className="flex p-5">
      <div className="dropdown p-5 dropdown-bottom w-12 h-12">
        <div tabIndex={0} onClick={handleDropdown} role="button" className="btn ">
          <FiAlignJustify size={30} color="#5373FF">
            카테고리
          </FiAlignJustify>
        </div>

        {isOpenCategory ? (
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-white border-gray-300 border-solid border-[1px] w-52"
          >
            <div>class_type</div>
            <div>location</div>
            <div>time</div>
            <div>difficulty</div>
            <div>price</div>
            <div>검색하기,초기화 버튼</div>
          </ul>
        ) : (
          <></>
        )}
      </div>
      <button className="btn ml-12 m-5 w-17 h-12">초기화</button>
    </div>
  );
};

export default Categories;

'use client';

import React, { useState } from 'react';
import { SearchClass } from './categories/SearchClass';

const Category = () => {
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  const handleDropdown = () => {
    setIsOpenCategory(!isOpenCategory);
  };
  return (
    <div className="dropdown p-5 dropdown-bottom">
      <div tabIndex={0} onClick={handleDropdown} role="button" className="btn m-1">
        카테고리
      </div>
      {isOpenCategory ? (
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-white border-gray-300 border-solid border-[1px] w-52"
        >
          <SearchClass />
          <div>지역</div>
          <div>카테고리</div>
          <div>요일</div>
          <div>난이도</div>
          <div>오전 오후</div>
          <div>가격</div>
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Category;

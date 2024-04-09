'use client';

import React, { useState } from 'react';

const Categories = () => {
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
          <div>클래스 타입</div>
          <div>지역</div>
          <div>카테고리</div>
          <div>요일</div>
          <div>시간</div>
          <div>난이도</div>
          <div>금액</div>
          <div>검색하기,초기화 버튼</div>
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Categories;

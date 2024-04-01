import React from 'react';

const Category = () => {
  return (
    <div className="dropdown dropdown-right">
      <div tabIndex={0} role="button" className="btn m-1">
        카테고리
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-white border-gray-300 border-solid border-[1px] w-52"
      >
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </div>
  );
};

export default Category;

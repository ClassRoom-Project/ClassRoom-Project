import React, { PropsWithChildren } from 'react';
import Category from './Category';

const BorderLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="fixed p-3 top-0 border-gray-300 border-solid border-[1px] bottom-0 flex flex-col justify-between items-center left-0 w-[100px] z-50">
        <div className="mt-[100px]">
          <Category />
          <div>Home</div>
          <div>chat</div>
          <div>create</div>
          <div>mypage</div>
        </div>
        <div>
          <div>convert</div>
          <div>logout</div>
        </div>
      </div>

      <div className="flex-1 ml-[100px]">{children}</div>
    </>
  );
};

export default BorderLayout;

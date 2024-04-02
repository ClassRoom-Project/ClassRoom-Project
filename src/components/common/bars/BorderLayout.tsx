import React, { PropsWithChildren } from 'react';
import Category from './Category';
import Link from 'next/link';
const BorderLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="fixed p-3 top-0 border-gray-300 border-solid border-[1px] bottom-0 flex flex-col justify-between items-center left-0 w-[100px] z-50">
        <div className="mt-[5vh] flex flex-col">
          <Category />
          <Link href={'http://localhost:3000/'} className="p-5">
            Home
          </Link>
          <Link href={'http://localhost:3000/chat'} className="p-5">
            chat
          </Link>
          <Link href={'http://localhost:3000/mypage'} className="p-5">
            mypage
          </Link>
          <Link href={'http://localhost:3000/register'} className="p-5">
            create
          </Link>
        </div>
        <div>
          <div className="p-5">convert</div>
          <div className="p-5">logout</div>
        </div>
      </div>

      <div className="flex-1 ml-[100px]">{children}</div>
    </>
  );
};

export default BorderLayout;

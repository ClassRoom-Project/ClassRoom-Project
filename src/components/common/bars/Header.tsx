'use client';

import LoginState from '@/components/login/LoginState';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { SearchClass } from './categories/SearchClass';

const Header = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="flex p-[15px] justify-between items-center h-[60px] border-b-[1px] border-solid border-gray-300">
        <Link href="/">Logo</Link>
        <div className="flex items-center justify-center ml-60">
          <SearchClass />
        </div>
        <div className="flex justify-center items-center"></div>
        <LoginState />
      </div>
      {children}
    </>
  );
};

export default Header;

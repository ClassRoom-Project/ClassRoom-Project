'use client';

import LoginState from '@/components/login/LoginState';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { LuBell } from 'react-icons/lu';
import { SearchClass } from './categories/SearchClass';

const Header = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="flex p-[15px]  justify-between items-center h-[60px] border-b-[1px] border-solid border-gray-300">
        <Link href={'/'}>Logo</Link>
        <SearchClass />
        <div className="flex justify-center items-center">
          <div className="mr-[10px]">
            <LuBell size={30} />
          </div>
        </div>
        <LoginState />
      </div>
      {children}
    </>
  );
};

export default Header;

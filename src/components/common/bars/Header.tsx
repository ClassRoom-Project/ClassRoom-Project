import Image from 'next/image';
import React, { PropsWithChildren } from 'react';
import defaultImage from '../../../../public/profile-image.png';
import Link from 'next/link';
import LoginState from '@/components/login/LoginState';
import { SearchClass } from './categories/SearchClass';

const Header = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="flex p-[15px]  justify-between items-center h-[60px] border-b-[1px] border-solid border-gray-300">
        <Link href={'/'}>Logo</Link>
        <SearchClass />
        <div className="flex justify-center items-center">
          <div className="mr-[10px]">alarm</div>
          <Link href={'/mypage'}>
            <Image src={defaultImage} alt="Profile image" className="mr-[5px] h-[50px] w-[50px]" />
          </Link>
        </div>
        <LoginState />
      </div>
      {children}
    </>
  );
};

export default Header;

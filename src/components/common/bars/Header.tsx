'use client';

import Image from 'next/image';
import React, { PropsWithChildren } from 'react';
import defaultImage from '../../../../public/profile-image.png';
import Link from 'next/link';
import LoginState from '@/components/login/LoginState';
import { SearchClass } from './categories/SearchClass';
import { useUserStore } from '@/store/UserInfoStore';
import { LuBell } from 'react-icons/lu';

const Header = ({ children }: PropsWithChildren) => {
  const { userInfo } = useUserStore();

  return (
    <>
      <div className="flex p-[15px]  justify-between items-center h-[60px] border-b-[1px] border-solid border-gray-300">
        <Link href={'http://localhost:3000/'}>Logo</Link>
        <SearchClass />
        <div className="flex justify-center items-center">
          <div className="mr-[10px]">
            <LuBell size={30} />
          </div>
          <p className="p-4">{userInfo?.nickname} 님</p>
          <Link href={'http://localhost:3000/mypage'}>
            <img
              src={userInfo?.profile_image}
              alt="Profile image"
              className="mr-[5px] rounded-full"
              width={50}
              height={50}
            />
          </Link>
        </div>
        <LoginState />
      </div>
      {children}
    </>
  );
};

export default Header;

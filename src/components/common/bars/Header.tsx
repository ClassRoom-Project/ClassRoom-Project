'use client';

import Image from 'next/image';
import React, { PropsWithChildren } from 'react';
import Link from 'next/link';
import LoginState from '@/components/login/LoginState';
import { SearchClass } from './categories/SearchClass';
import { LuBell } from 'react-icons/lu';

import basicProfileImage from '../../../../public/profile-image.png';
import { useUserStore } from '@/store/userInfoStore';

const Header = ({ children }: PropsWithChildren) => {
  const { userInfo } = useUserStore();

  // 프로필 이미지가 없을 때, 기본 프로필 이미지 보여주기
  const profileImage = userInfo?.profile_image ? userInfo?.profile_image : basicProfileImage;
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
            <Image
              src={profileImage}
              alt="Profile image"
              className="mr-[5px] rounded-full"
              width={50}
              height={50}
              unoptimized={true}
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

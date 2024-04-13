'use client';

import LoginState from '@/components/login/LoginState';
import { userInfoStore } from '@/store/mypage/userInfoStore';
import { useUserRoleStore } from '@/store/mypage/userRoleStore';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren, Suspense } from 'react';
import { LuBell } from 'react-icons/lu';
import basicProfileImage from '../../../../public/profile-image.png';
import { SearchClass } from './categories/SearchClass';
import Logo from '../../../../public/loginLogo.png';
const Header = ({ children }: PropsWithChildren) => {
  const { userInfo } = userInfoStore();

  const { isTeacher } = useUserRoleStore();

  // 수강생인지 강사인지 명시적으로 보여주기
  const roleName = isTeacher === true ? '강사' : '회원';
  // console.log('roleName', roleName);

  // 프로필 이미지가 없을 때, 기본 프로필 이미지 보여주기
  const profileImage = userInfo?.profile_image ? userInfo?.profile_image : basicProfileImage;

  return (
    <>
      <div className="flex p-[15px] justify-between items-center h-[60px] border-b-[1px] border-solid border-gray-300">
        <Link href="/">
          <Image className="rounded-full" src={Logo} alt="클룸 로고" width={50} height={50} />
        </Link>
        <div className="flex items-center justify-center ml-60">
          <SearchClass />
        </div>
        <div className="flex justify-center items-center"></div>
        <div className="flex items-center">
          <div className="mr-[10px]">
            <LuBell size={30} />
          </div>
          {/*todo : 비로그인 시 삭제*/}
          <p className="p-4">
            {userInfo?.nickname} <span className="text-main-color font-bold">{roleName}님</span>
          </p>
          {/*todo : 드랍다운으로 변경*/}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="w-12 h-12 rounded-full  m-1">
              <Image
                src={profileImage}
                alt="Profile image"
                className="rounded-full"
                width={60}
                height={60}
                unoptimized={true}
              />
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <div className="border-gray-400 borderb-[1px] border-solid w-52 mb-2">
                <Link href={'/mypage'}>마이페이지</Link>
              </div>
              <div>
                <Suspense fallback={<div>Logout</div>}>
                  <LoginState />
                </Suspense>
              </div>
            </ul>
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

export default Header;

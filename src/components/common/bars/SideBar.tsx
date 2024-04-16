'use client';

import ChatButton from '@/components/chatRooms/ChatButton';
import MyPageBtn from '@/components/mypage/MyPageBtn';
import CreateBtn from '@/components/register/CreateBtn';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { HiOutlineHome } from 'react-icons/hi2';
import ConvertBtn from './ConvertBtn';

const SideBar = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="fixed p-3 bottom-0 top-0 bg-background-color border-solid   flex flex-col justify-between items-center left-0 w-[100px] z-50">
        <div className="mt-[5vh] flex flex-col text-black items-center">
          <Link
            href="/"
            className="p-4  flex flex-col items-center hover:text-main-color transition ease-in text-icon-color"
          >
            <HiOutlineHome className=" font-light text-4xl" />
            <p className="">홈</p>
          </Link>
          <ChatButton />
          <CreateBtn />

          <MyPageBtn />
          {/* 예약 페이지 확인을 위한 임시 링크 */}
        </div>
        <div>
          {/* 수강생/강사 전환 버튼입니다. */}
          <ConvertBtn />
        </div>
      </div>

      <div className="flex-1 ml-[100px]">{children}</div>
    </>
  );
};

export default SideBar;

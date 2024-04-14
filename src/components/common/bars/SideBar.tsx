'use client';

import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { FiHome } from 'react-icons/fi';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { SlNote } from 'react-icons/sl';
import ConvertBtn from './ConvertBtn';
import ChatButton from '@/components/chatRooms/ChatButton';
import { useRouter } from 'next/navigation';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import MyPageBtn from '@/components/mypage/MyPageBtn';

const SideBar = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="fixed p-3 top-0 bg-disable-color  border-solid  bottom-0 flex flex-col justify-between items-center left-0 w-[100px] z-50">
        <div className="mt-[5vh] flex flex-col text-black items-center">
          <Link href="/" className="p-4  flex flex-col items-center">
            <FiHome size={30} className="hover:text-main-color" />
            HOME
          </Link>
          <ChatButton />
          <Link href="/register" className="p-4 flex flex-col items-center">
            <SlNote size={30} className="hover:text-main-color" />
            CREATE
          </Link>
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

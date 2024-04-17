'use client';

import ChatButton from '@/components/chatRooms/ChatButton';
import MyPageBtn from '@/components/mypage/MyPageBtn';
import CreateBtn from '@/components/register/CreateBtn';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { FiHome } from 'react-icons/fi';
import ConvertBtn from './ConvertBtn';
import { useUserRoleStore } from '@/store/mypage/userRoleStore';

const SideBar = ({ children }: PropsWithChildren) => {
  const { isTeacher } = useUserRoleStore();
  return (
    <>
      <div className="fixed p-3 top-0 bg-background-color border-solid  bottom-0 flex flex-col justify-between items-center left-0 w-[100px] z-50">
        <div className="mt-[5vh] flex flex-col text-black items-center">
          <Link href="/" className="p-4  flex flex-col items-center hover:text-main-color transition ease-in">
            <FiHome size={30} />
            HOME
          </Link>
          <ChatButton />
          {/* 강사 일때만 클래스 등록하기 버튼 띄우기 */}
          {isTeacher ? <CreateBtn /> : ''}
          <MyPageBtn />
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

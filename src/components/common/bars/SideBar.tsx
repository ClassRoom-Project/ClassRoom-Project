'use client';

import ChatButton from '@/components/chatRooms/ChatButton';
import MyPageBtn from '@/components/mypage/MyPageBtn';
import CreateBtn from '@/components/register/CreateBtn';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { HiOutlineHome } from 'react-icons/hi2';
import ConvertBtn from './ConvertBtn';
import { useModalStore } from '@/store/modalstore';
import { AlertModal } from '../AlertModal';
import { useUserRoleStore } from '@/store/mypage/userRoleStore';

const SideBar = ({ children }: PropsWithChildren) => {
  const { isTeacher } = useUserRoleStore();
  const { isOpen, toggleModal } = useModalStore();

  return (
    <>
      <div className="z-30 fixed flex flex-row items-center justify-between inset-x-0 bottom-0 h-16 bg-border-color text-sm md:border-t md:p-3 md:overflow-hidden md:pr-4 md:bottom-0 md:top-0 md:left-0 md:w-[100px] md:flex-col md:z-50 md:mt-none md:h-full md:bg-background-color sm:flex-row sm:w-full sm:justify-between sm:right-0 sm:bottom-0 sm:left-0">
        <div className="w-full flex justify-around items-center h-10 md:flex-col md:mt-16 md:gap-10 mb:bg-background-color">
          <Link
            href="/"
            className=" flex flex-col items-center text-background-color hover:text-main-color transition ease-in md:text-icon-color"
          >
            <HiOutlineHome className="text-4xl sm:text-4xl md:text-4xl" />
            <p className="hidden sm:flex md:sm:flex">홈</p>
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

      <div className="md:flex-1 md:ml-[100px]">{children}</div>
      {/* <AlertModal />
      <button className="bg-red-500 ml-52 w-40 h-40" onClick={toggleModal}>
        모달 버튼
      </button> */}
    </>
  );
};

export default SideBar;

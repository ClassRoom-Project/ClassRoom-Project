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
      <div className="md:mt-none fixed inset-x-0 bottom-0 z-50 flex h-16 flex-row items-center justify-between bg-border-color text-sm sm:bottom-0 sm:left-0 sm:right-0 sm:w-full sm:flex-row sm:justify-between md:bottom-0 md:left-0 md:top-0 md:z-50 md:h-full md:w-[100px] md:flex-col md:overflow-hidden md:border-t md:bg-background-color md:p-3 md:pr-4">
        <div className="mb:bg-background-color flex h-10 w-full items-center md:mt-16 md:flex-col md:justify-normal md:gap-10">
          <Link
            href="/"
            className=" flex w-full flex-col items-center text-background-color transition ease-in hover:text-main-color md:text-icon-color"
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
      <div className="md:ml-[100px] md:flex-1 md:pb-0">{children}</div>
      {/* <AlertModal />
      <button className="bg-red-500 ml-52 w-40 h-40" onClick={toggleModal}>
        모달 버튼
      </button> */}
    </>
  );
};

export default SideBar;

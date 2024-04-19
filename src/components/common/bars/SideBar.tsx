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
      <div className="fixed flex flex-row items-center justify-between z-[9999] inset-x-0 bottom-0 bg-background-color text-sm md:border-t md:p-3 md:overflow-hidden md:pr-4 md:bottom-0 md:top-0 md:left-0 md:w-[100px] md:flex-col md:z-50 sm:flex-row sm:w-full sm:justify-between sm:z-50 sm:right-0 sm:bottom-0 sm:left-0 lg:flex-col">
        {/* <div className="fixed p-3 overflow-hidden pr-4 bottom-0 top-0 bg-background-color border-solid   flex flex-col justify-between items-center left-0 w-[100px] z-50"> */}
        <div className="w-full flex justify-around items-center h-10 text-black md:flex-col">
          <Link
            href="/"
            className="md:py-4 flex flex-col items-center hover:text-main-color transition ease-in text-icon-color"
          >
            <HiOutlineHome className="text-4xl sm:text-4xl md:text-4xl" />
            <p className=" hidden sm:flex md:sm:flex">홈</p>
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

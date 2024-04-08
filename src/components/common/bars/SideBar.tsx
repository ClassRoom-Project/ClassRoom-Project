'use client';

import { useLoginStore } from '@/store/login/LoginUserIdStore';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { FiHome } from 'react-icons/fi';
import { GoPerson } from 'react-icons/go';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { SlNote } from 'react-icons/sl';
import ConvertBtn from './ConvertBtn';

const SideBar = ({ children }: PropsWithChildren) => {
  const { loginUserId } = useLoginStore();
  return (
    <>
      <div className="fixed p-3 top-0 bg-[#5373FF]  border-solid  bottom-0 flex flex-col justify-between items-center left-0 w-[100px] z-50">
        <div className="mt-[5vh] flex flex-col text-white items-center">
          <Link href="/" className="p-4  flex flex-col items-center">
            <FiHome size={30} />
            HOME
          </Link>
          <Link href="/chat" className="p-4 flex flex-col items-center">
            <IoChatbubbleEllipsesOutline size={30} />
            CHAT
          </Link>
          <Link href="/register" className="p-4 flex flex-col items-center">
            <SlNote size={30} />
            CREATE
          </Link>
          <Link href="/mypage" className="p-4 flex flex-col items-center">
            <GoPerson size={30} />
            MYPAGE
          </Link>

          <Link href="/hello">로그인</Link>
          {/* 예약 페이지 확인을 위한 임시 링크 */}
          <Link href="/reserve?classId=c3d4e5f6-0000-4aeb-bcf5-6fa40fc0b0e3">예약하기(임시)</Link>
          <Link href="/messages" prefetch={false}>
            채팅
          </Link>
        </div>
        <div>
          {/* 수강생/강사 전환 버튼입니다. (로그인 상태일 때만 보임) */}
          {loginUserId && <ConvertBtn />}
        </div>
      </div>

      <div className="flex-1 ml-[100px]">{children}</div>
    </>
  );
};

export default SideBar;

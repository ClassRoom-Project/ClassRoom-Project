'use client';

import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { FiHome } from 'react-icons/fi';
import { GoPerson } from 'react-icons/go';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { SlNote } from 'react-icons/sl';
import ConvertBtn from './ConvertBtn';
import ChatButton from '@/components/chatRooms/ChatButton';
import { useRouter } from 'next/navigation';
import { useLoginStore } from '@/store/login/loginUserIdStore';

const SideBar = ({ children }: PropsWithChildren) => {
  // const { loginUserId } = useLoginStore();
  // const router = useRouter();

  // // 임시로 넣어놓고 => mypage에서 접근제한 걸기
  // const handleMyPageIconOnClick = () => {
  //   if (loginUserId) {
  //     router.push('/mypage');
  //   } else {
  //     const confirm = window.confirm('로그인 후 이용이 가능합니다. 로그인 페이지로 이동 하시겠습니까?');
  //     if (confirm) {
  //       router.push('/hello');
  //     }
  //   }
  // };
  return (
    <>
      <div className="fixed p-3 top-0 bg-[#5373FF]  border-solid  bottom-0 flex flex-col justify-between items-center left-0 w-[100px] z-50">
        <div className="mt-[5vh] flex flex-col text-white items-center">
          <Link href="/" className="p-4  flex flex-col items-center">
            <FiHome size={30} />
            HOME
          </Link>
          <ChatButton />
          <Link href="/register" className="p-4 flex flex-col items-center">
            <SlNote size={30} />
            CREATE
          </Link>
          <Link href="/mypage" className="p-4 flex flex-col items-center cursor-pointer">
            <GoPerson size={30} />
            MYPAGE
          </Link>
          {/* 예약 페이지 확인을 위한 임시 링크 */}
          <Link href="/reserve?classId=d162d609-b1dc-41c4-b8c5-7998cb0b58ca">예약하기(임시)</Link>
          <Link href="/messages" prefetch={false}>
            채팅
          </Link>
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

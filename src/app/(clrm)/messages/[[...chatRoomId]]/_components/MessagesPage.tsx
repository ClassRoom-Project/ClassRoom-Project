'use client';

import { useReadChatRooms } from '@/hooks/useChatRoom/useNewChatRoom';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useSearchParams } from 'next/navigation';
import ChatPreview from './ChatPreview';
import ChatMessages from './ChatMessages';
import Link from 'next/link';
import { IoLogoSnapchat } from 'react-icons/io';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '클룸 채팅페이지',
  description: '클래스를 등록한 선생님에게 1:1 실시간 문의를 하고 답변을 받을 수 있습니다.'
};

export default function MessagesPage() {
  const { loginUserId } = useLoginStore();
  const { chatroomsInfo } = useReadChatRooms(loginUserId!);
  const searchParams = useSearchParams();
  const currentChatRoomId = searchParams.get('chatId');
  const otherId = searchParams.get('otherId');
  const title = searchParams.get('title');
  const toClassId = searchParams.get('toClassId');
  const fromUserId = searchParams.get('fromUserId');
  const mainImage = searchParams.get('mainImage');

  const firstSectionClasses = `flex flex-col w-full h-full lg:w-2/5 xl:w-2/5 2xl:w-2/6 3xl:w-1/5 ${
    currentChatRoomId ? 'hidden md:hidden lg:block' : 'block'
  }`;
  const secondSectionClasses = `flex h-full flex-col w-full lg:w-3/5 xl:w-3/5 2xl:w-4/6 3xl:w-4/5 border-l border-[#CAC6FC ] ${
    currentChatRoomId ? 'block' : 'hidden md:hidden lg:block'
  }`;

  if (!chatroomsInfo || chatroomsInfo.length === 0) {
    return (
      <div className="responsiveHeight flex max-h-full  flex-col">
        <div className="flex h-full flex-col items-center justify-center">
          <IoLogoSnapchat className=" text-9xl text-button-focus-color " />
          <p className="py-10 text-2xl">채팅 목록이 없습니다.</p>
          <Link
            href="/list"
            className="rounded-lg bg-button-default-color px-4 py-2 text-xl text-white hover:bg-button-hover-color"
          >
            클래스 둘러보기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="responsiveHeight flex max-h-full w-full flex-col md:flex-row lg:flex-row">
      <section className={`${firstSectionClasses} mb-16 md:mb-0 md:overflow-scroll md:overflow-x-hidden `}>
        {chatroomsInfo.map(({ chatId, toClassId, fromUserId, image, teacherUserId, title, makeClassUserId }) => (
          <ChatPreview
            key={chatId}
            chatId={chatId}
            otherId={loginUserId === teacherUserId ? fromUserId : teacherUserId}
            toClassId={toClassId}
            fromUserId={fromUserId}
            title={title}
            image={image}
            makeClassUserId={makeClassUserId}
            loginUserId={loginUserId}
          />
        ))}
      </section>
      <section className={secondSectionClasses}>
        {!currentChatRoomId ? (
          <div className="flex h-full items-center justify-center text-disable-color">
            <p>대화를 선택해주세요</p>
          </div>
        ) : (
          <ChatMessages
            chatId={currentChatRoomId}
            otherId={otherId!}
            title={title!}
            toClassId={toClassId!}
            fromUserId={fromUserId!}
            mainImage={mainImage}
          />
        )}
      </section>
    </div>
  );
}

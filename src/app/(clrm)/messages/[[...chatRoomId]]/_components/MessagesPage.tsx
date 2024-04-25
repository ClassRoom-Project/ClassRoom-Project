'use client';

import { useReadChatRooms } from '@/hooks/useChatRoom/useNewChatRoom';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useSearchParams } from 'next/navigation';
import ChatPreview from './ChatPreview';
import ChatMessages from './ChatMessages';
import Link from 'next/link';
import { IoLogoSnapchat } from 'react-icons/io';

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

  const firstSectionClasses = `flex flex-col w-full h-full lg:w-2/5 lg:w-2/5 ${
    currentChatRoomId ? 'hidden sm:hidden md:block' : 'block'
  }`;
  const secondSectionClasses = `flex h-full flex-col w-full lg:w-3/5 border-l border-gray-500 ${
    currentChatRoomId ? 'block' : 'hidden sm:hidden md:block'
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
    <div className="responsiveHeight flex max-h-full flex-col md:flex-row lg:flex-row">
      <section className={`${firstSectionClasses} overflow-scroll overflow-x-hidden`}>
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

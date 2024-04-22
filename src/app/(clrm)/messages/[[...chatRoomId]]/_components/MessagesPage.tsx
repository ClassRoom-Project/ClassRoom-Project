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
      <div className="flex flex-col max-h-full  responsiveHeight">
        <div className="flex flex-col justify-center items-center h-full">
          <IoLogoSnapchat className=" text-button-focus-color text-9xl " />
          <p className="text-2xl py-10">채팅 목록이 없습니다.</p>
          <Link
            href="/list"
            className="bg-button-default-color px-4 py-2 rounded-full text-white text-xl hover:bg-button-hover-color"
          >
            클래스 둘러보기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-h-full md:flex-row lg:flex-row responsiveHeight">
      <section className={firstSectionClasses}>
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
          <div className="text-disable-color h-full flex justify-center items-center">
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

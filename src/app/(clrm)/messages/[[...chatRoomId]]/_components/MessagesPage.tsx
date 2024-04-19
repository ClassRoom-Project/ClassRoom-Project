'use client';

import { useReadChatRooms } from '@/hooks/useChatRoom/useNewChatRoom';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useSearchParams } from 'next/navigation';
import { Virtuoso } from 'react-virtuoso';
import ChatPreview from './ChatPreview';
import ChatMessages from './ChatMessages';

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

  const firstSectionClasses = `flex flex-col w-full h-full md:w-2/5 lg:w-2/5 ${
    currentChatRoomId ? 'hidden md:hidden lg:block' : 'block'
  }`;
  const secondSectionClasses = `flex h-full flex-col w-full lg:w-3/5 border-l border-gray-500 ${
    currentChatRoomId ? 'block' : 'hidden md:hidden lg:block'
  }`;

  if (!chatroomsInfo || chatroomsInfo.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>채팅 목록이 없습니다.</p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col max-h-full  md:flex-row lg:flex-row mb-16 md:mb-0"
      style={{
        height: 'calc(100vh - 80px)'
      }}
    >
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

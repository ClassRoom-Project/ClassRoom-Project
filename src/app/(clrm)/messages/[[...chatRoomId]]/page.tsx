'use client';

import ChatPreview from './_components/ChatPreview';
import { useSearchParams } from 'next/navigation';
import { useReadChatRooms } from '@/hooks/useChatRoom/useNewChatRoom';
import { ChatRoom } from '@/types/chat/chatTypes';

export default function MessagesPage() {
  const { chatroomsInfo } = useReadChatRooms();

  console.log(chatroomsInfo);

  return (
    <div className="w-full">
      <div>
        <div className="flex bg-white border-x border-border-color">
          <section
            className="w-1/3 h-full flex overflow-scroll"
            style={{
              minHeight: 'calc(100vh - 60px)',
              maxHeight: 'calc(100vh - 60px)'
            }}
          >
            {!chatroomsInfo ? (
              <div className="flex justify-center items-center flex-1">
                <a>채팅 목록이 없습니다.</a>
              </div>
            ) : (
              <div className="flex flex-col flex-1 w-full">
                {chatroomsInfo.map(
                  ({
                    chatId,
                    createdAt,
                    toClassId,
                    fromUserId,
                    teacherUserId,
                    title,
                    makeClassUserId,
                    nickName,
                    profileImg
                  }: ChatRoom) => (
                    <ChatPreview
                      key={chatId}
                      chatId={chatId}
                      createdAt={createdAt}
                      toClassId={toClassId}
                      fromUserId={fromUserId}
                      teacherUserId={teacherUserId}
                      title={title}
                      makeClassUserId={makeClassUserId}
                      nickName={nickName}
                      profileImg={profileImg}
                    />
                  )
                )}
              </div>
            )}
          </section>
          <section className="w-2/3">
            <div className="flex justify-center items-center flex-1">
              <a>채팅 내용이 없습니다.</a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

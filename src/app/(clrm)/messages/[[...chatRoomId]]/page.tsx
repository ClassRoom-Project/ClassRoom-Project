'use client';

import ChatPreview from './_components/ChatPreview';
import { useReadChatRooms } from '@/hooks/useChatRoom/useNewChatRoom';
import { ChatRoom } from '@/types/chat/chatTypes';
import { useLoginStore } from '@/store/login/LoginUserIdStore';
import { useRouter, useSearchParams } from 'next/navigation';

export default function MessagesPage() {
  const { chatroomsInfo } = useReadChatRooms();
  // const router = useRouter();

  // const chatRoomId = router.query.chatId ?? '';
  const searchParams = useSearchParams();
  const currentChatRoomId = searchParams.get('chatId');

  return (
    <div className="w-full">
      <div>
        <div className="flex bg-white border-x border-border-color">
          <section
            className="w-2/5 h-full flex overflow-scroll"
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
                  ({ chatId, createdAt, toClassId, fromUserId, teacherUserId, title, makeClassUserId }: ChatRoom) => (
                    <ChatPreview
                      key={chatId}
                      chatId={chatId}
                      createdAt={createdAt}
                      toClassId={toClassId}
                      fromUserId={fromUserId}
                      teacherUserId={teacherUserId}
                      title={title}
                      makeClassUserId={makeClassUserId}
                    />
                  )
                )}
              </div>
            )}
          </section>
          <section className="w-3/5">
            <div className="flex justify-center items-center flex-1">
              {!currentChatRoomId ? (
                <a
                  className=" text-gray-500"
                  style={{
                    minHeight: 'calc(100vh - 60px)',
                    maxHeight: 'calc(100vh - 60px)'
                  }}
                >
                  대화를선택해주세요
                </a>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

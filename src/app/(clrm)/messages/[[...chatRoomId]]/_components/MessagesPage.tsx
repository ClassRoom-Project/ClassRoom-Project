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

  return (
    <div className="w-full" style={{ height: 'calc(100vh - 60px)' }}>
      <div>
        <div className="flex flex-1 bg-white border-x border-border-color ">
          <section className="w-2/5 flex flex-col flex-1">
            {!chatroomsInfo ? (
              <div className="flex justify-center items-center flex-1">
                <a>채팅 목록이 없습니다.</a>
              </div>
            ) : (
              <div className="flex flex-col flex-1 w-full">
                <Virtuoso
                  className="h-full overflow-y-auto"
                  data={chatroomsInfo}
                  itemContent={(_, { chatId, toClassId, fromUserId, teacherUserId, title, makeClassUserId }) => (
                    <ChatPreview
                      key={chatId}
                      chatId={chatId}
                      otherId={loginUserId === teacherUserId ? fromUserId : teacherUserId}
                      toClassId={toClassId}
                      fromUserId={fromUserId}
                      title={title}
                      makeClassUserId={makeClassUserId}
                      loginUserId={loginUserId}
                    />
                  )}
                />
              </div>
            )}
          </section>
          <section
            className="w-3/5 border-l border-gray-500 flex flex-col "
            style={{
              minHeight: 'calc(100vh - 60px)',
              maxHeight: 'calc(100vh - 60px)'
            }}
          >
            {!currentChatRoomId ? (
              <div className=" text-disable-color h-full flex justify-center items-center">
                <p>대화를선택해주세요</p>
              </div>
            ) : (
              <ChatMessages
                chatId={currentChatRoomId}
                otherId={otherId!}
                title={title!}
                toClassId={toClassId!}
                fromUserId={fromUserId!}
              />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

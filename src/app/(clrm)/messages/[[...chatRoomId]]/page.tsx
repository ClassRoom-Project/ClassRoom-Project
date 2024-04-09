'use client';

import { useLoginStore } from '@/store/login/loginUserIdStore';
import ChatPreview from './_components/ChatPreview';

export default function MessagesPage() {
  const { loginUserId } = useLoginStore();

  const dummyData = [
    {
      chatId: '채팅방1',
      createdAt: '2024.04.03',
      toClassId: 'd567cc44-bc77-47f9-9a86-6edc78c47cee',
      fromUserId: 'd162d609-b1dc-41c4-b8c5-7998cb0b58castring;',
      toClassUserId: '223e4567-e89b-12d3-a456-426614174002'
    },
    {
      chatId: '채팅방2',
      createdAt: '2024.04.04',
      toClassId: '5c03c4b9-9f6c-4867-8c8b-7b6e133037d0',
      fromUserId: 'd162d609-b1dc-41c4-b8c5-7998cb0b58castring;',
      toClassUserId: '223e4567-e89b-12d3-a456-426614174002'
    },
    {
      chatId: '채팅방3',
      createdAt: '2024.04.05',
      toClassId: '55c68b20-bc6a-4c95-9f7a-415d4f00596e',
      fromUserId: 'd162d609-b1dc-41c4-b8c5-7998cb0b58castring;',
      toClassUserId: '21ac1fb5-7898-4e1a-94ec-e64770ae9407'
    },
    {
      chatId: '채팅방4',
      createdAt: '2024.04.06',
      toClassId: '1861b3e5-e93e-473b-8dda-1e84df212caa',
      fromUserId: 'd162d609-b1dc-41c4-b8c5-7998cb0b58castring;',
      toClassUserId: '223e4567-e89b-12d3-a456-426614174002'
    },
    {
      chatId: '채팅방5',
      createdAt: '2024.04.08',
      toClassId: '9335e676-0c77-4f7a-9b29-63cb4df446f1',
      fromUserId: 'd162d609-b1dc-41c4-b8c5-7998cb0b58castring;',
      toClassUserId: '423e4567-e89b-12d3-a456-426614174004'
    }
  ];

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
            {dummyData.length === 0 ? (
              <div className="flex justify-center items-center flex-1">
                <a>채팅 목록이 없습니다.</a>
              </div>
            ) : (
              <div className="flex flex-col flex-1 w-full">
                {dummyData.map(({ chatId, fromUserId, toClassId, createdAt, toClassUserId }) => (
                  <ChatPreview
                    key={chatId}
                    chatId={chatId}
                    fromUserId={fromUserId}
                    toClassId={toClassId}
                    createdAt={createdAt}
                    toClassUserId={toClassUserId}
                  />
                ))}
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

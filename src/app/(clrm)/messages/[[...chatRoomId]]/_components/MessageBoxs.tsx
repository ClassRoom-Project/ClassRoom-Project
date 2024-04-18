'use client';

import {
  useDeleteMessage,
  useReadChatRoomMessages,
  useReadMakeClassUserInfo
} from '@/hooks/useChatRoom/useNewChatRoom';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { ChatMessage, MessagesBoxsType } from '@/types/chat/chatTypes';
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useEffect, useRef } from 'react';
import { supabase } from '@/app/api/supabase/supabase';
import { useQueryClient } from '@tanstack/react-query';
import defaultimage from '../../../../../assets/images/profile-image.png';
import { deleteRoom } from '@/components/common/Toastify';
import LoadingSpinner from '@/components/common/LoadingSpinner';

dayjs.locale('ko');

export default function MessageBoxs({ toClassId, title, chatId, otherId, studentName, mainImage }: MessagesBoxsType) {
  const { loginUserId } = useLoginStore();
  const { MakeClassUserInfo } = useReadMakeClassUserInfo(otherId);
  const { readChatRoomMessages, isLoading } = useReadChatRoomMessages(chatId, loginUserId!);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const { deleteMessageMutate } = useDeleteMessage();
  const queryClient = useQueryClient();

  useEffect(() => {
    const subscribeChat = supabase
      .channel(`test${chatId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `chat_id=eq.${chatId}`
        },
        (payload) => {
          queryClient.setQueryData<ChatMessage[]>(['chatMessage', chatId], (oldMessages = []) => {
            const newMessage = payload.new as ChatMessage;
            const isMessageExist = oldMessages.some((message) => message.messages_id === newMessage.messages_id);
            if (!isMessageExist) {
              return [...oldMessages, newMessage];
            } else {
              return oldMessages.map((msg) => (msg.messages_id === newMessage.messages_id ? newMessage : msg));
            }
          });

          queryClient.invalidateQueries({ queryKey: ['lastMessage', chatId] });
          queryClient.invalidateQueries({ queryKey: ['countMessage', chatId] });
          queryClient.invalidateQueries({ queryKey: ['countMessageAll', loginUserId] });
        }
      )
      .subscribe();

    return () => {
      subscribeChat.unsubscribe();
    };
  }, [chatId, loginUserId, queryClient]);

  const handleMessageDelete = (messageId: number) => {
    deleteMessageMutate(messageId);
    deleteRoom();
  };

  //새로운 메시지 들어오는 경우 자동으로 스크롤 하단으로 이동
  useEffect(() => {
    const scrollToBottom = () => {
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    scrollToBottom();
  }, [readChatRoomMessages]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-auto px-3">
        <LoadingSpinner />
      </div>
    );
  }

  //무한스크롤
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-col justify-center items-center h-auto px-3">
        <div className=" flex flex-row h-36 mt-5 rounded-md w-3/5 sm:text-xs md:text-sm text-button-hover-color justify-center items-center border border-border-color mb-16 overflow-hidden">
          <div className=" relative h-full w-1/3 p-2">
            <Image
              src={mainImage!}
              alt="mainImage"
              layout="fill"
              objectFit="cover"
              className=" object-cover w-full h-full"
            />
          </div>
          <div className="flex h-36 flex-col items-center justify-center w-2/3 p-2">
            <p className="whitespace-nowrap flex flex-col items-center justify-center text-center">
              안녕하세요 {studentName} 수강생님! <br /> &quot;{title}&quot; 원데이 클래스에 궁금하신 <br />
              사항이 있으시면 문의 주시길 바랍니다!
            </p>

            <Link
              href={`/list/detail/${toClassId}`}
              className="flex sm:w-3/4 mb:w-3/4 lg:w-1/4 whitespace-nowrap mt-4 rounded-3xl h-8 items-center justify-center text-xs p-2 text-white bg-button-default-color hover:bg-button-hover-color"
            >
              클래스 보러가기
            </Link>
          </div>
        </div>
        {readChatRoomMessages?.map((message, index) => (
          <div
            key={index}
            className={`flex w-full text-sm items-start px-4 ${
              message.create_by === loginUserId ? 'justify-end' : 'justify-start'
            }`}
          >
            <div>
              {message.create_by !== loginUserId && (
                <div className="mr-2 flex flex-row items-center text-xs gap-1">
                  <div className="w-12 h-12">
                    <Image
                      src={MakeClassUserInfo?.profile_image || defaultimage}
                      height={40}
                      width={40}
                      alt="Profile"
                      className="w-full h-full border border-black rounded-full object-cover"
                    />
                  </div>
                  <p className=" font-semibold">{MakeClassUserInfo?.nickname}</p>
                </div>
              )}
              <div
                className={`flex flex-row items-center py-4 px-4 ${
                  message.create_by === loginUserId ? 'flex flex-row' : 'flex-row-reverse'
                }`}
              >
                <div>
                  <p className=" text-gray-400 text-xs px-4">{dayjs(message.created_at).format('A hh:mm')}</p>
                </div>
                {message.create_by === loginUserId ? (
                  <button onClick={() => handleMessageDelete(message.messages_id)}>삭제</button>
                ) : (
                  ''
                )}
                {message.messages ? (
                  <div className="">
                    {message.messages && (
                      <p
                        className={`max-w-md p-2 rounded-lg flex items-center ${
                          message.create_by === loginUserId ? 'bg-background-color' : ' bg-gray-200 '
                        }`}
                      >
                        {message.messages}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className=" relative" style={{ width: '180px', height: '200px' }}>
                    {message.images &&
                      JSON.parse(message.images).map((imgUrl: string, imgIndex: number) => (
                        <div key={imgIndex} className="image-container">
                          <Image
                            src={imgUrl}
                            layout="fill"
                            unoptimized
                            objectFit="cover"
                            alt={`Photo ${imgIndex + 1}`}
                          />
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div ref={endOfMessagesRef} />
    </div>
  );
}

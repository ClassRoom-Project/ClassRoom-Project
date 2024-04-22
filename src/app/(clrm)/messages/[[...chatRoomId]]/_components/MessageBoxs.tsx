'use client';

import {
  useDeleteMessage,
  useReadChatRoomMessages,
  useReadLastMessages,
  useReadMakeClassUserInfo
} from '@/hooks/useChatRoom/useNewChatRoom';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { ChatMessage, MessagesBoxsType } from '@/types/chat/chatTypes';
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/app/api/supabase/supabase';
import { useQueryClient } from '@tanstack/react-query';
import defaultimage from '../../../../../assets/images/profile-image.png';
import { deleteMessage } from '@/components/common/Toastify';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import mediumZoom from 'medium-zoom';

dayjs.locale('ko');

export default function MessageBoxs({ toClassId, title, chatId, otherId, studentName, mainImage }: MessagesBoxsType) {
  const { loginUserId } = useLoginStore();
  const { MakeClassUserInfo } = useReadMakeClassUserInfo(otherId);
  const { readChatRoomMessages, isLoading } = useReadChatRoomMessages(chatId, loginUserId!);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const { deleteMessageMutate } = useDeleteMessage();
  const { readLastMessages } = useReadLastMessages(chatId);
  const queryClient = useQueryClient();
  const [stateLoading, setStateLoading] = useState(false);
  //Dom요소나 컴포넌트의 직접적인 접근을 가능하게 해줌Ref
  const zoom = mediumZoom({ background: '#000' });

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
            console.log('oldMessages', oldMessages);
            const newMessage = payload.new as ChatMessage;
            console.log('newMessage', newMessage);
            const isMessageExist = oldMessages.some((message) => message.messages_id === newMessage.messages_id);
            if (!isMessageExist) {
              console.log('얍');
              return [...oldMessages, newMessage];
            } else {
              console.log('메롱');
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
    setStateLoading(true);
    deleteMessageMutate(messageId);
    setStateLoading(false);
    deleteMessage();
  };

  //새로운 메시지 들어오는 경우 자동으로 스크롤 하단으로 이동
  useEffect(() => {
    const scrollToBottom = () => {
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    scrollToBottom();
  }, [readLastMessages]);

  //medium-zoom
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    zoom.attach(e.currentTarget);
  };

  //무한스크롤
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-auto px-3">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto">
      {isLoading && (
        <div className="fixed z-50 inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}
      <div className="flex flex-col justify-center items-center px-3">
        <div className="text-xs w-full flex flex-row h-36 mt-5 rounded-md xl:w-3/5 sm:text-xs md:text-sm text-button-hover-color justify-center items-center border border-border-color mb-16 overflow-hidden">
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
            <p className="text-xs flex flex-col items-center justify-center text-center lg:text-sm">
              안녕하세요 {studentName} 수강생님! <br /> &quot;{title}&quot; 원데이 클래스에 궁금하신 사항이 있으시면
              문의 주시길 바랍니다!
            </p>

            <Link
              href={`/list/detail/${toClassId}`}
              className="flex w-3/4 whitespace-nowrap mt-4 rounded-3xl h-8 items-center justify-center text-xs p-2 text-white bg-button-default-color hover:bg-button-hover-color"
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
                  <div className="w-8 h-8 lg:w-12 lg:h-12">
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
                className={`text-xs flex flex-row items-center py-4 px-4 lg:text-md ${
                  message.create_by === loginUserId ? 'flex flex-row' : 'flex-row-reverse'
                }`}
              >
                <div>
                  <p className="text-gray-400 text-xs px-4 whitespace-nowrap">
                    {dayjs(message.created_at).format('A hh:mm')}
                  </p>
                </div>
                {message.create_by === loginUserId ? (
                  <button onClick={() => handleMessageDelete(message.messages_id)} className="whitespace-nowrap">
                    삭제
                  </button>
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
                            // 이미지가 완전히 업로드 되고 플레이스홀더가 제거되면 호출되는 콜백함수!!
                            //img 요소를 참조하는 대상을 가진 event라는 하나의 인수로 호출
                            onLoad={handleImageLoad}
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

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
  const { deleteMessageMutate } = useDeleteMessage();
  const queryClient = useQueryClient();
  const [stateLoading, setStateLoading] = useState(false);
  //Dom요소나 컴포넌트의 직접적인 접근을 가능하게 해줌Ref
  const zoom = mediumZoom({ background: '#000' });
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

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
    setStateLoading(true);
    deleteMessageMutate(messageId);
    setStateLoading(false);
    deleteMessage();
  };

  //새로운 메시지 들어오는 경우 자동으로 스크롤 하단으로 이동
  useEffect(() => {
    let timerId: NodeJS.Timeout | number | undefined;

    const scrollToBottom = () => {
      timerId = setTimeout(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    };

    if (readChatRoomMessages && readChatRoomMessages.length > 0) {
      scrollToBottom();
    }

    //언마운트 시 타이머 취소
    //setTimeout 사용하는 경우 clearTimeout을 이용해 꼭 초기화 해주어야함
    return () => clearTimeout(timerId);
  }, [readChatRoomMessages]);

  //medium-zoom
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    zoom.attach(e.currentTarget);
  };

  //무한스크롤

  if (isLoading) {
    return (
      <div className="flex h-auto flex-col items-center justify-center px-3">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <LoadingSpinner />
        </div>
      )}
      <div className="flex flex-col items-center justify-center px-3">
        <div className="mb-16 mt-5 flex h-36 w-full flex-row items-center justify-center overflow-hidden rounded-md border border-border-color text-xs text-button-hover-color sm:text-xs md:text-sm xl:w-3/5">
          <div className=" relative h-full w-1/3 p-2">
            <Image
              src={mainImage!}
              alt="mainImage"
              layout="fill"
              style={{ objectFit: 'cover' }}
              className=" h-full w-full object-cover"
            />
          </div>
          <div className="flex h-36 w-2/3 flex-col items-center justify-center p-2">
            <p className="flex flex-col items-center justify-center text-center text-xs lg:text-sm">
              안녕하세요 {studentName} 수강생님! <br /> &quot;{title}&quot; 원데이 클래스에 궁금하신 사항이 있으시면
              문의 주시길 바랍니다!
            </p>

            <Link
              href={`/list/detail/${toClassId}`}
              className="mt-4 flex h-8 w-3/4 items-center justify-center whitespace-nowrap rounded-3xl bg-button-default-color p-2 text-xs text-white hover:bg-button-hover-color"
            >
              클래스 보러가기
            </Link>
          </div>
        </div>
        {readChatRoomMessages?.map((message, index) => (
          <div
            key={index}
            className={`flex w-full items-start px-4 text-sm ${
              message.create_by === loginUserId ? 'justify-end' : 'justify-start'
            }`}
          >
            <div>
              {message.create_by !== loginUserId && (
                <div className="mr-2 flex flex-row items-center gap-1 text-xs">
                  <div className="h-8 w-8 lg:h-12 lg:w-12">
                    <Image
                      src={MakeClassUserInfo?.profile_image || defaultimage}
                      height={40}
                      width={40}
                      alt="Profile"
                      className="h-full w-full rounded-full border border-black object-cover"
                    />
                  </div>
                  <p className=" font-semibold">{MakeClassUserInfo?.nickname}</p>
                </div>
              )}
              <div
                className={`lg:text-md flex flex-row items-center px-4 py-4 text-xs ${
                  message.create_by === loginUserId ? 'flex flex-row' : 'flex-row-reverse'
                }`}
              >
                <div>
                  <p className="whitespace-nowrap px-4 text-xs text-gray-400">
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
                        className={`flex max-w-md items-center rounded-lg p-2 ${
                          message.create_by === loginUserId ? 'bg-background-color' : ' bg-gray-200 '
                        }`}
                      >
                        {message.messages}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="relative h-24 w-24 md:h-36 md:w-36">
                    {message.images &&
                      JSON.parse(message.images).map((imgUrl: string, imgIndex: number) => (
                        <div key={imgIndex} className="image-container">
                          <Image
                            src={imgUrl}
                            layout="fill"
                            unoptimized
                            style={{ objectFit: 'cover' }}
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

//무한스크롤 테스트 코드
// 'use client';

// import {
//   useDeleteMessage,
//   useReadChatRoomMessages,
//   useReadMakeClassUserInfo
// } from '@/hooks/useChatRoom/useNewChatRoom';
// import { useLoginStore } from '@/store/login/loginUserIdStore';
// import { ChatMessage, InfiniteChatMessage, MessagesBoxsType } from '@/types/chat/chatTypes';
// import Image from 'next/image';
// import Link from 'next/link';
// import dayjs from 'dayjs';
// import 'dayjs/locale/ko';
// import React, { useEffect, useRef } from 'react';
// import { supabase } from '@/app/api/supabase/supabase';
// import { useQueryClient } from '@tanstack/react-query';
// import defaultimage from '../../../../../assets/images/profile-image.png';
// import { deleteMessage } from '@/components/common/Toastify';
// import LoadingSpinner from '@/components/common/LoadingSpinner';
// import mediumZoom from 'medium-zoom';

// dayjs.locale('ko');

// export default function MessageBoxs({ toClassId, title, chatId, otherId, studentName, mainImage }: MessagesBoxsType) {
//   const { loginUserId } = useLoginStore();
//   const { MakeClassUserInfo } = useReadMakeClassUserInfo(otherId);
//   const { readChatRoomMessages, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, isFetching } =
//     useReadChatRoomMessages(chatId, loginUserId!);
//   const { deleteMessageMutate } = useDeleteMessage();
//   const queryClient = useQueryClient();
//   //Dom요소나 컴포넌트의 직접적인 접근을 가능하게 해줌Ref
//   const zoom = mediumZoom({ background: '#000' });
//   const endOfMessagesRef = useRef<HTMLDivElement>(null);
//   const targetRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const subscribeChat = supabase
//       .channel(`test${chatId}`)
//       .on(
//         'postgres_changes',
//         {
//           event: 'INSERT',
//           schema: 'public',
//           table: 'chat_messages',
//           filter: `chat_id=eq.${chatId}`
//         },
//         (payload) => {
//           queryClient.setQueryData<ChatMessage[]>(['chatMessage', chatId], (oldMessages = []) => {
//             const newMessage = payload.new as ChatMessage;
//             console.log('oldMessages', oldMessages);
//             const isMessageExist = oldMessages.some((message) => message.messages_id === newMessage.messages_id);
//             if (!isMessageExist) {
//               return [...oldMessages, newMessage];
//             } else {
//               return oldMessages.map((msg) => (msg.messages_id === newMessage.messages_id ? newMessage : msg));
//             }
//           });

//           queryClient.invalidateQueries({ queryKey: ['lastMessage', chatId] });
//           queryClient.invalidateQueries({ queryKey: ['countMessage', chatId] });
//           queryClient.invalidateQueries({ queryKey: ['countMessageAll', loginUserId] });
//         }
//       )
//       .subscribe();

//     return () => {
//       subscribeChat.unsubscribe();
//     };
//   }, [chatId, loginUserId, queryClient]);

//   useEffect(() => {
//     if (!targetRef.current) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         const [entry] = entries;
//         // 사용자가 상단으로 스크롤하여 요소가 보이기 시작하면 hasNextPage가 true이고, isFetchingNextPage가 false일 때 다음 페이지를 불러옵니다.
//         if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
//           fetchNextPage();
//         }
//       },
//       {
//         rootMargin: '100px 0px 0px 0px', // 페이지 상단에서 100px 아래 위치에서 콜백이 실행되도록 설정
//         threshold: 1.0 // 요소가 완전히 보일 때 콜백이 실행됩니다.
//       }
//     );
//     observer.observe(targetRef.current);

//     return () => observer.disconnect();
//   }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

//   const handleMessageDelete = (messageId: number) => {
//     deleteMessageMutate(messageId);
//     deleteMessage();
//   };

//   //새로운 메시지 들어오는 경우 자동으로 스크롤 하단으로 이동
//   useEffect(() => {
//     const scrollToBottom = () => {
//       if (!endOfMessagesRef.current) return;

//       // 스크롤 가능한 높이와 뷰포트 높이의 합이 전체 콘텐츠 높이보다 크거나 같으면 사용자가 맨 아래에 있다고 판단
//       const isAtBottom =
//         endOfMessagesRef.current.scrollHeight - endOfMessagesRef.current.scrollTop <=
//         endOfMessagesRef.current.clientHeight + 100;

//       if (isAtBottom) {
//         endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
//       }
//     };

//     if (readChatRoomMessages && readChatRoomMessages.pages.length > 0) {
//       scrollToBottom();
//     }
//   }, [readChatRoomMessages]);

//   //medium-zoom
//   const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
//     zoom.attach(e.currentTarget);
//   };

//   //무한스크롤

//   if (isLoading) {
//     return (
//       <div className="flex h-auto flex-col items-center justify-center px-3">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen overflow-y-auto">
//       {isLoading && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
//           <LoadingSpinner />
//         </div>
//       )}
//       <div className="flex flex-col items-center justify-center px-3">
//         <div className="mb-16 mt-5 flex h-36 w-full flex-row items-center justify-center overflow-hidden rounded-md border border-border-color text-xs text-button-hover-color sm:text-xs md:text-sm xl:w-3/5">
//           <div className=" relative h-full w-1/3 p-2">
//             <Image
//               src={mainImage!}
//               alt="mainImage"
//               layout="fill"
//               style={{ objectFit: 'cover' }}
//               className=" h-full w-full object-cover"
//             />
//           </div>
//           <div className="flex h-36 w-2/3 flex-col items-center justify-center p-2">
//             <p className="flex flex-col items-center justify-center text-center text-xs lg:text-sm">
//               안녕하세요 {studentName} 수강생님! <br /> &quot;{title}&quot; 원데이 클래스에 궁금하신 사항이 있으시면
//               문의 주시길 바랍니다!
//             </p>

//             <Link
//               href={`/list/detail/${toClassId}`}
//               className="mt-4 flex h-8 w-3/4 items-center justify-center whitespace-nowrap rounded-3xl bg-button-default-color p-2 text-xs text-white hover:bg-button-hover-color"
//             >
//               클래스 보러가기
//             </Link>
//           </div>
//           <div ref={targetRef}></div>
//           {isFetching && !isFetchingNextPage && <p>로딩중입니다!</p>}
//         </div>
//         {readChatRoomMessages?.pages.map((page, pageIndex: number) => (
//           <React.Fragment key={pageIndex}>
//             {page.map((message: InfiniteChatMessage, messageIndex: number) => (
//               <div
//                 key={messageIndex}
//                 className={`flex w-full items-start px-4 text-sm ${
//                   message.create_by === loginUserId ? 'justify-end' : 'justify-start'
//                 }`}
//               >
//                 <div>
//                   {message.create_by !== loginUserId && (
//                     <div className="mr-2 flex flex-row items-center gap-1 text-xs">
//                       <div className="h-8 w-8 lg:h-12 lg:w-12">
//                         <Image
//                           src={MakeClassUserInfo?.profile_image || defaultimage}
//                           height={40}
//                           width={40}
//                           alt="Profile"
//                           className="h-full w-full rounded-full border border-black object-cover"
//                         />
//                       </div>
//                       <p className="font-semibold">{MakeClassUserInfo?.nickname}</p>
//                     </div>
//                   )}
//                   <div
//                     className={`lg:text-md flex flex-row items-center px-4 py-4 text-xs ${
//                       message.create_by === loginUserId ? 'flex flex-row' : 'flex-row-reverse'
//                     }`}
//                   >
//                     <div>
//                       <p className="whitespace-nowrap px-4 text-xs text-gray-400">
//                         {dayjs(message.created_at).format('A hh:mm')}
//                       </p>
//                     </div>
//                     {message.create_by === loginUserId && (
//                       <button onClick={() => handleMessageDelete(message.messages_id)} className="whitespace-nowrap">
//                         삭제
//                       </button>
//                     )}
//                     {message.messages ? (
//                       <div>
//                         <p
//                           className={`flex max-w-md items-center rounded-lg p-2 ${
//                             message.create_by === loginUserId ? 'bg-background-color' : ' bg-gray-200 '
//                           }`}
//                         >
//                           {message.messages}
//                         </p>
//                       </div>
//                     ) : (
//                       <div className="relative h-24 w-24 md:h-36 md:w-36">
//                         {message.images &&
//                           JSON.parse(message.images).map((imgUrl: string, imgIndex: number) => (
//                             <div key={imgIndex} className="image-container">
//                               <Image
//                                 src={imgUrl}
//                                 layout="fill"
//                                 unoptimized
//                                 style={{ objectFit: 'cover' }}
//                                 alt={`Photo ${imgIndex + 1}`}
//                                 onLoad={handleImageLoad}
//                               />
//                             </div>
//                           ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </React.Fragment>
//         ))}
//       </div>
//       <div ref={endOfMessagesRef} />
//     </div>
//   );
// }

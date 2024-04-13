'use client';

import { useReadChatRoomMessages, useReadMakeClassUserInfo } from '@/hooks/useChatRoom/useNewChatRoom';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { MessagesBoxsType } from '@/types/chat/chatTypes';
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export default function MessageBoxs({ toClassId, title, fromUserId, chatId, otherId, studentName }: MessagesBoxsType) {
  const { loginUserId } = useLoginStore();
  const { MakeClassUserInfo } = useReadMakeClassUserInfo(otherId);
  const { readChatRoomMessages } = useReadChatRoomMessages(chatId, loginUserId!);

  return (
    <div className="flex-1 overflow-scroll">
      <div className="flex flex-col justify-center items-center h-full px-3">
        <div className="bg-gray-100 rounded-md w-3/5 flex flex-col sm:text-xs md:text-sm justify-center items-center border border-gray-200 p-3 mb-16">
          <p>
            안녕하세요 {studentName} 수강생님! <br /> &quot;{title}&quot; 원데이 클래스에 궁금하신 사항이 있으시면 문의
            주시길 바랍니다!
          </p>
          <Link
            href={`/list/detail/${toClassId}`}
            className="mt-2 rounded-3xl text-xs p-2 text-white bg-button-default-color hover:bg-button-hover-color"
          >
            클래스 보러가기
          </Link>
        </div>
        {readChatRoomMessages?.map((message, index) => (
          <div
            key={index}
            className={`flex w-full text-sm items-start ${
              message.create_by === loginUserId ? 'justify-end' : 'justify-start'
            }`}
          >
            <div>
              {message.create_by !== loginUserId && (
                <div className="mr-2 flex flex-row items-center text-xs gap-1">
                  <Image
                    src={MakeClassUserInfo?.profile_image || '/default-profile.png'}
                    height={40}
                    width={40}
                    alt="Profile"
                    className="rounded-full border border-black"
                  />
                  <p className=" font-semibold">{MakeClassUserInfo?.nickname}</p>
                </div>
              )}
              <div
                className={`flex flex-row items-center py-4 ${
                  message.create_by === loginUserId ? 'flex flex-row' : 'flex-row-reverse '
                }`}
              >
                <div>
                  <p className=" text-gray-400 text-xs mr-2">{dayjs(message.created_at).format('A hh:mm')}</p>
                </div>
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
                  <div className=" relative" style={{ width: '130px', height: '150px' }}>
                    {message.images &&
                      JSON.parse(message.images).map((imgUrl: string, imgIndex: number) => (
                        <div key={imgIndex} className="image-container">
                          <Image src={`${imgUrl}`} width={100} height={100} alt={`Photo ${imgIndex + 1}`} />
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

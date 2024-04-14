import {
  useReadChatRoomMessages,
  useReadCheckMessages,
  useReadLastMessages,
  useReadMakeClassUserInfo
} from '@/hooks/useChatRoom/useNewChatRoom';
import Image from 'next/image';
import Link from 'next/link';
import ProfileImage from '@/assets/images/profile-image.png';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useLoginStore } from '@/store/login/loginUserIdStore';

dayjs.locale('ko');

//데이터 불러오기,

export default function ChatPreview({ chatId, toClassId, title, fromUserId, otherId }: any) {
  const { loginUserId } = useLoginStore();
  const { MakeClassUserInfo } = useReadMakeClassUserInfo(otherId);
  const { readLastMessages } = useReadLastMessages(chatId);
  const { readLastChekcMessages } = useReadCheckMessages(chatId, loginUserId!);

  // useEffect(() => {
  //   const lastMessage = async () => await readLastMessages;
  //   const notReadCount = async () => await readLastChekcMessages;
  // }, [readLastMessages, readLastChekcMessages]);

  return (
    <Link
      href={`/messages?fromUserId=${fromUserId}&chatId=${chatId}&otherId=${otherId}&title=${title}&toClassId=${toClassId}`}
      prefetch={false}
      shallow
    >
      <div className="flex py-4 hover:bg-[#E3E1FC] mt-2 mb-2 px-2 relative">
        {readLastChekcMessages === 0 ? (
          ''
        ) : (
          <div className="flex items-center justify-center bg-main-color rounded-full h-7 w-7 absolute right-6 bottom-12">
            <div className="text-white">{readLastChekcMessages}</div>
          </div>
        )}
        <div className="mx-3">
          <Image
            unoptimized
            src={MakeClassUserInfo?.profile_image ?? ProfileImage}
            alt="profileImg"
            width={41}
            height={41}
            className="border border-black rounded-full"
          />
        </div>
        <div className="flex flex-col mx-3 flex-1 w-0">
          <p className="sm:text-sm md:text-base font-bold text-nowrap">{MakeClassUserInfo?.nickname}</p>
          <div className="flex flex-row justify-between">
            <div>
              {!readLastMessages ? (
                <p className="sm:text-sm text-gray-500">메시지가 없습니다</p>
              ) : (
                <div>
                  {readLastMessages?.messages ? (
                    <p className="sm:text-sm text-gray-500">{readLastMessages.messages}</p>
                  ) : (
                    <p className="sm:text-sm text-gray-500">이미지</p>
                  )}
                </div>
              )}
            </div>
            <div className="text-xs text-gray-400">{dayjs(readLastMessages?.createdAt).format('A hh:mm')}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-11/12 border-b-2" />
      </div>
    </Link>
  );
}

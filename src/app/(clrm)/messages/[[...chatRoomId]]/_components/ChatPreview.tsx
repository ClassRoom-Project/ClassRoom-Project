'use client';

import ProfileImage from '@/assets/images/profile-image.png';
import {
  useReadCheckMessages,
  useReadLastMessages,
  useReadMakeClassUserInfo
} from '@/hooks/useChatRoom/useNewChatRoom';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { ChatPreviewType } from '@/types/chat/chatTypes';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import Image from 'next/image';
import Link from 'next/link';

dayjs.locale('ko');

export default function ChatPreview({ chatId, toClassId, title, image, fromUserId, otherId }: ChatPreviewType) {
  const { loginUserId } = useLoginStore();
  const { MakeClassUserInfo } = useReadMakeClassUserInfo(otherId);
  const { readLastMessages } = useReadLastMessages(chatId);
  const { readleftChekcMessages } = useReadCheckMessages(chatId, loginUserId!);
  const mainImage = image && image.length > 0 ? image[0] : '';

  return (
    <Link
      href={`/messages?fromUserId=${fromUserId}&chatId=${chatId}&otherId=${otherId}&title=${title}&toClassId=${toClassId}&mainImage=${mainImage}`}
      prefetch={false}
      shallow
    >
      <div className="relative mx-2 mb-2 mt-2 flex py-4 ">
        {readleftChekcMessages === 0 ? (
          ''
        ) : (
          <div className="absolute bottom-12 right-6 flex h-5 w-5 items-center justify-center rounded-full bg-main-color">
            <div className="text-white">{readleftChekcMessages}</div>
          </div>
        )}
        <div className="mr-3 h-8 w-8 lg:h-12 lg:w-12">
          <Image
            src={MakeClassUserInfo?.profile_image ?? ProfileImage}
            alt="profileImg"
            width={40}
            height={40}
            className="h-full w-full rounded-full border border-black object-cover"
          />
        </div>
        <div className="mx-3 flex w-0 flex-1 flex-col text-xs">
          <div className="w-40">
            <p className=" truncate text-nowrap font-bold">{MakeClassUserInfo?.nickname}</p>
          </div>
          <div className="flex flex-row justify-between">
            <div>
              {!readLastMessages ? (
                <p className="whitespace-nowrap text-gray-500">메시지가 없습니다</p>
              ) : (
                <div className="w-40">
                  {readLastMessages?.messages ? (
                    <p className=" truncate text-gray-500">{readLastMessages.messages}</p>
                  ) : (
                    <p className="text-gray-500 ">이미지</p>
                  )}
                </div>
              )}
            </div>
            <div className="whitespace-nowrap text-xs text-gray-400">
              {dayjs(readLastMessages?.createdAt).format('A hh:mm')}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full border-b-2  md:mr-1" />
      </div>
    </Link>
  );
}

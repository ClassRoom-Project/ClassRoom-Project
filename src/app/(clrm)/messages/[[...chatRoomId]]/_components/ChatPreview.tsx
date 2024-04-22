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
      <div className="flex py-4 mt-2 mb-2 relative">
        {readleftChekcMessages === 0 ? (
          ''
        ) : (
          <div className="flex items-center justify-center bg-main-color rounded-full h-5 w-5 absolute right-6 bottom-12">
            <div className="text-white">{readleftChekcMessages}</div>
          </div>
        )}
        <div className="w-8 h-8 mr-3 lg:w-12 lg:h-12">
          <Image
            src={MakeClassUserInfo?.profile_image ?? ProfileImage}
            alt="profileImg"
            width={40}
            height={40}
            className="w-full h-full border border-black rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col mx-3 flex-1 w-0 text-xs">
          <div className="w-40">
            <p className=" font-bold text-nowrap truncate">{MakeClassUserInfo?.nickname}</p>
          </div>
          <div className="flex flex-row justify-between">
            <div>
              {!readLastMessages ? (
                <p className="whitespace-nowrap text-gray-500">메시지가 없습니다</p>
              ) : (
                <div className="w-40">
                  {readLastMessages?.messages ? (
                    <p className=" text-gray-500 truncate">{readLastMessages.messages}</p>
                  ) : (
                    <p className="text-gray-500 ">이미지</p>
                  )}
                </div>
              )}
            </div>
            <div className="text-xs whitespace-nowrap text-gray-400">
              {dayjs(readLastMessages?.createdAt).format('A hh:mm')}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full border-b-2 mr-1" />
      </div>
    </Link>
  );
}

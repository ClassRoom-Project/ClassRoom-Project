import { useReadMakeClassUserInfo } from '@/hooks/useChatRoom/useNewChatRoom';
import Link from 'next/link';

interface MessagesBoxsType {
  toClassId: string;
  title: string;
  fromUserId: string;
  chatId: string;
  otherId: string;
}

export default function MessageBoxs({ toClassId, title, fromUserId, chatId, otherId }: MessagesBoxsType) {
  const { MakeClassUserInfo } = useReadMakeClassUserInfo(fromUserId);

  return (
    <div className="flex-1 overflow-scroll">
      <div className="flex flex-col justify-center items-center h-full ">
        <div className="bg-gray-100 rounded-md w-3/5  flex flex-col sm:text-xs md:text-sm justify-center items-center border border-gray-200 p-3">
          <p>
            안녕하세요 {MakeClassUserInfo?.nickname} 수강생님! <br /> "{title}" 원데이 클래스에 궁금하신 사항이 있으시면
            문의 주시길 바랍니다!
          </p>
          <Link
            href={`/list/detail/${toClassId}`}
            className="mt-2 rounded-3xl text-xs p-2 text-white bg-button-default-color hover:bg-button-hover-color"
          >
            클래스 보러가기
          </Link>
        </div>
      </div>
    </div>
  );
}

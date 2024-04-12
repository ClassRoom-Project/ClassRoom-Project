import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useCreateNewMessage, useReadMakeClassUserInfo } from '@/hooks/useChatRoom/useNewChatRoom';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { ChatMessagesType } from '@/types/chat/chatTypes';
import { BsSend } from 'react-icons/bs';
import ChatImageModal from './ChatImageModal';
import MessageBoxs from './MessageBoxs';

export default function ChatMessages({ fromUserId, chatId, otherId, title, toClassId }: ChatMessagesType) {
  const { loginUserId } = useLoginStore();
  const { createNewMessageMutate } = useCreateNewMessage();
  const { MakeClassUserInfo } = useReadMakeClassUserInfo(fromUserId);

  const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get('message') as string;

    if (!loginUserId) {
      console.error('loginUserId is null');
      return;
    }

    createNewMessageMutate({ message, loginUserId, chatId });
    (e.target as HTMLFormElement).reset();
  };

  const studentName = MakeClassUserInfo?.nickname;

  if (!chatId) {
    return (
      <div className="h-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col w-full">
      <div className="border-b border-grey-100 p-2 sticky top-0 w-full bg-[#EFEFFF]">
        <p className="sm:text-sm md:text-lg font-bold ">클래스명: {title}</p>
      </div>
      <MessageBoxs
        toClassId={toClassId}
        title={title}
        fromUserId={fromUserId}
        chatId={chatId}
        otherId={otherId}
        studentName={studentName!}
      />
      <div className="w-full flex justify-center items-center bg-white py-8 ">
        <form onSubmit={handleSubmitMessage} className="rounded-md border px-4 py-2 w-4/5 flex">
          <input
            type="text"
            name="message"
            autoComplete="off"
            placeholder="메시지를 입력하세요"
            className="outline-0 bg-transparent flex-1"
          />
          <BsSend className="text-xl text-gray-400 " />
        </form>
      </div>
      <ChatImageModal chatId={chatId} />
    </div>
  );
}

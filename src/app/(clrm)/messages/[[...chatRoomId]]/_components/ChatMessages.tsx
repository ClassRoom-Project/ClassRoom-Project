import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useLoginStore } from '@/store/login/LoginUserIdStore';

interface ChatMessagesType {
  chatId: string;
  loginUserId: string;
  otherId: string;
  title: string;
}

export default function ChatMessages({ chatId, loginUserId, otherId, title }: ChatMessagesType) {
  if (!chatId) {
    return (
      <div className="h-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="border-b border-grey-100 p-2 sticky top-0 bg-white">
        <p className="sm:text-sm md:text-lg font-bold">{title}</p>
      </div>
    </div>
  );
}

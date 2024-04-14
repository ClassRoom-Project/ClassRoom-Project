'use client';
import { useReadCheckMessageAll } from '@/hooks/useChatRoom/useNewChatRoom';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useRouter } from 'next/navigation';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';

export default function ChatButton() {
  const { loginUserId } = useLoginStore();
  const router = useRouter();
  const { readLeftChekcMessageAll } = useReadCheckMessageAll(loginUserId!);
  console.log('readLeftChekcMessageAll', readLeftChekcMessageAll);

  const handleClick = () => {
    if (!loginUserId) {
      const confirm = window.confirm('로그인 후 이용이 가능합니다. 로그인 페이지로 이동 하시겠습니까?');
      if (confirm) {
        router.push('/hello');
      }
    } else {
      router.replace('/messages');
    }
  };

  return (
    <div className="relative">
      <button onClick={handleClick} className="p-4 flex flex-col items-center hover:text-main-color transition ease-in">
        <IoChatbubbleEllipsesOutline className="text-4xl" />
        CHAT
      </button>
      {readLeftChekcMessageAll ? (
        <div className="flex items-center justify-center bg-main-color rounded-full h-5 w-5 absolute right-3 bottom-14">
          <div className="text-white">{readLeftChekcMessageAll}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

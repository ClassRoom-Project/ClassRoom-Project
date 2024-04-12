import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useRouter } from 'next/navigation';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';

export default function ChatButton() {
  const { loginUserId } = useLoginStore();
  const router = useRouter();

  const handleClick = () => {
    if (!loginUserId) {
      alert('로그인이 필요한 기능입니다.');
      return;
    } else {
      router.replace('/messages');
    }
  };

  return (
    <button onClick={handleClick} className="p-4 flex flex-col items-center">
      <IoChatbubbleEllipsesOutline size={30} />
      CHAT
    </button>
  );
}

import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useRouter } from 'next/navigation';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';

export default function ChatButton() {
  const { loginUserId } = useLoginStore();
  const router = useRouter();

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
    <button onClick={handleClick} className="p-4 flex flex-col items-center hover:text-main-color transition ease-in">
      <IoChatbubbleEllipsesOutline size={30} />
      CHAT
    </button>
  );
}

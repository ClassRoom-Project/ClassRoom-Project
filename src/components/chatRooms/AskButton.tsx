'use client';

import { useCreateNewRoom } from '@/hooks/useChatRoom/useNewChatRoom';
import { useLoginStore } from '@/store/login/LoginUserIdStore';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function AskButton({ classId }: { classId: string }) {
  const router = useRouter();
  const { loginUserId } = useLoginStore();
  const { createNewRoomMutate } = useCreateNewRoom();

  const onhandleClick = () => {
    if (!loginUserId) {
      console.log('로그인해');
      alert('로그인이 필요한 기능입니다.');
      return;
    }
    createNewRoomMutate(
      {
        toClassId: classId,
        fromUserId: loginUserId
      },
      {
        onSuccess: () => {
          router.replace('/messages');
        },
        onError: (error: any) => {
          console.error(error);
        }
      }
    );
  };

  return (
    <button
      onClick={onhandleClick}
      className="flex justify-center items-center rounded-2xl w-20 border-[#5373FF] border-solid border-[1px] h-9 ml-3"
    >
      문의하기
    </button>
  );
}

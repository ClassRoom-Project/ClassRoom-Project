'use client';

import { useCreateNewRoom } from '@/hooks/useChatRoom/useNewChatRoom';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useRouter } from 'next/navigation';

export default function AskButton({
  classId,
  makeClassUserId,
  buttonStyle
}: {
  classId: string;
  makeClassUserId: string;
  buttonStyle: string;
}) {
  const router = useRouter();
  const { loginUserId } = useLoginStore();
  const { createNewRoomMutate } = useCreateNewRoom();

  const onhandleClick = () => {
    if (!loginUserId) {
      console.log('로그인해');
      alert('로그인이 필요한 기능입니다.');
      return;
    } else if (loginUserId === makeClassUserId) {
      alert('직접 개설한 클래스에는 문의할 수 없습니다.');
      return;
    }
    createNewRoomMutate(
      {
        toClassId: classId,
        fromUserId: loginUserId,
        teacherUserId: makeClassUserId
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
    <button onClick={onhandleClick} className={buttonStyle}>
      문의하기
    </button>
  );
}

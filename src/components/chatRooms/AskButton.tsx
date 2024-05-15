'use client';

import { useCreateNewRoom, useReadChatRooms } from '@/hooks/useChatRoom/useNewChatRoom';
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
  const { chatroomsInfo } = useReadChatRooms(loginUserId!);

  const onhandleClick = () => {
    if (!loginUserId) {
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
          const chatroom = chatroomsInfo?.find(
            ({ fromUserId, teacherUserId, toClassId }) =>
              (fromUserId === loginUserId || teacherUserId === loginUserId) && toClassId === classId
          );

          if (chatroom) {
            const { fromUserId, teacherUserId, chatId, title, toClassId, image } = chatroom;
            const otherId = loginUserId === teacherUserId ? fromUserId : teacherUserId;
            const mainImage = image && image.length > 0 ? image[0] : '';
            router.replace(
              `/messages?fromUserId=${fromUserId}&chatId=${chatId}&otherId=${otherId}&title=${title}&toClassId=${toClassId}&mainImage=${mainImage}`
            );
          }
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

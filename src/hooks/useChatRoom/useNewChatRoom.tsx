import { createChatRoom, getChatRooms } from '@/app/api/chatRooms/getChatRooms';
import { useLoginStore } from '@/store/login/LoginUserIdStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

//채팅방 목록 읽어오기
export function useReadChatRooms() {
  const { loginUserId } = useLoginStore();
  const { data: chatroomsInfo } = useQuery({
    queryKey: ['chatRooms', loginUserId],
    queryFn: () => getChatRooms(loginUserId as string),
    enabled: !!loginUserId
  });
  return { chatroomsInfo };
}

//채팅방 생성하기
export function useCreateNewRoom() {
  const queryClient = useQueryClient();

  const { mutate: createNewRoomMutate } = useMutation({
    mutationFn: async ({
      toClassId,
      fromUserId,
      teacherUserId
    }: {
      toClassId: string;
      fromUserId: string;
      teacherUserId: string;
    }) => {
      await createChatRoom({ toClassId, fromUserId, teacherUserId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatRooms'] });
    }
  });

  return { createNewRoomMutate };
}

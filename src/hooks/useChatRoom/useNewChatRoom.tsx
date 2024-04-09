import { createChatRoom } from '@/app/api/chatRooms/getChatRooms';
import { CreateNewChatRoom } from '@/types/chat/chatTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateNewRoom() {
  const queryClient = useQueryClient();

  const { mutate: createNewRoomMutate } = useMutation<
    CreateNewChatRoom,
    Error,
    { toClassId: string; fromUserId: string }
  >({
    mutationFn: async ({ toClassId, fromUserId }) => {
      //supabase에서 생성에 실패할 경우 null 처리 될 수 있으므로 없는 경우를 함께 만들어주어야함
      const result = await createChatRoom(toClassId, fromUserId);
      if (!result) {
        throw new Error('Failed to create chat room');
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatRooms'] });
    }
  });

  return { createNewRoomMutate };
}

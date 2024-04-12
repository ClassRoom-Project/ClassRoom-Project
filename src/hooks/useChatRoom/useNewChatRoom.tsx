import {
  createChatRoom,
  createNewMessages,
  createNewMessagesPhoto,
  getChatMessages,
  getChatRooms,
  getMakeClassUser
} from '@/app/api/chatRooms/getChatRooms';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { SendNewMessageType, SendNewPhotoMessageType } from '@/types/chat/chatTypes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

//채팅방 목록 읽어오기
export function useReadChatRooms(loginUserId: string) {
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

// 상대방 프로필, 닉네임 가져오기
export function useReadMakeClassUserInfo(otherUserId: string) {
  const { data: MakeClassUserInfo } = useQuery({
    queryKey: ['MakeClassUser', otherUserId],
    queryFn: () => getMakeClassUser(otherUserId as string),
    enabled: !!otherUserId
  });
  return { MakeClassUserInfo };
}

//채팅방 메시지 보내기
export function useCreateNewMessage() {
  const queryClient = useQueryClient();

  const { mutate: createNewMessageMutate } = useMutation({
    mutationFn: async ({ chatId, message, loginUserId }: SendNewMessageType) => {
      console.log('chatId', chatId);

      console.log('message', message);
      console.log('create_by', loginUserId);

      await createNewMessages({ chatId, loginUserId, message });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatMessage'] });
    }
  });

  return { createNewMessageMutate };
}

//채팅방 이미지 보내기
export function useCreateNewPhotoMessage() {
  const queryClient = useQueryClient();

  const { mutate: createNewPhotoMessageMutate } = useMutation({
    mutationFn: async ({ chatId, photos, loginUserId }: SendNewPhotoMessageType) => {
      console.log('chatId', chatId);

      console.log('message', photos);
      console.log('create_by', loginUserId);

      await createNewMessagesPhoto({ chatId, loginUserId, photos });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatMessage'] });
    }
  });

  return { createNewPhotoMessageMutate };
}

//채팅내용 가져오기
export function useReadChatRoomMessages(chatId: string) {
  const { data: readChatRoomMessages } = useQuery({
    queryKey: ['chatMessage', chatId],
    queryFn: () => getChatMessages(chatId as string),
    enabled: !!chatId
  });
  return { readChatRoomMessages };
}

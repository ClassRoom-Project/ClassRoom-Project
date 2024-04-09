import { supabase } from '../supabase/supabase';
import { ChatRoomType, CreateNewChatRoom } from '@/types/chat/chatTypes';

//선생님 채팅방 목록 불러오기
// export const getChatRoomsForTeacher = async (userId: string): Promise<ChatRoomType[]> => {
//   const { data: chatRooms, error } = await supabase //
//     .from('chat_rooms')
//     .select(`*, messages: chat_messages(created_at)`)
//     .eq('toUserId', userId)
//     .order('created_at', { ascending: false });

//   if (error || !chatRooms) throw error;
//   return chatRooms;
// };

// //수강생 채팅방 목록 불러오기
// const getChatRoomsForStudent = async (userId: string): Promise<ChatRoomType[]> => {
//   const { data: chatRooms, error } = await supabase
//     .from('chat_rooms')
//     .select(`*, messages: chat_messages(created_at)`)
//     .eq('fromUserId', userId)
//     .order('created_at', { ascending: false });

//   if (error || !chatRooms) throw error;
//   return chatRooms;
// };

//채팅방 생성
//생성에 실패할 경우 null 처리를 할 수 있기 때문에 null 인 경우를 설정해주어야함
export const createChatRoom = async (toClassId: string, fromUserId: string): Promise<CreateNewChatRoom | null> => {
  const { data: chatRooms, error } = await supabase //
    .from('chat_rooms')
    .insert({
      to_class_id: toClassId,
      from_user_id: fromUserId
    });
  if (error) throw error;
  return chatRooms || null;
};

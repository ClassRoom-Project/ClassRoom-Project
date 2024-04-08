import { supabase } from '../supabase/supabase';
import { ChatRoomType } from '@/types/chat/chatTypes';

//선생님 채팅방 목록 불러오기
export const getChatRoomsForTeacher = async (userId: string): Promise<ChatRoomType[]> => {
  const { data: chatRooms, error } = await supabase //
    .from('chat_rooms')
    .select(`*, messages: chat_messages(created_at)`)
    .eq('toUserId', userId)
    .order('created_at', { ascending: false });

  if (error || !chatRooms) throw error;
  return chatRooms;
};

//수강생 채팅방 목록 불러오기
const getChatRoomsForStudent = async (userId: string): Promise<ChatRoomType[]> => {
  const { data: chatRooms, error } = await supabase
    .from('chat_rooms')
    .select(`*, messages: chat_messages(created_at)`)
    .eq('fromUserId', userId)
    .order('created_at', { ascending: false });

  if (error || !chatRooms) throw error;
  return chatRooms;
};

// export const getChatRoomsWithUserInfo = async (userId: string): Promise<ChatRoomType[]> => {
//   const { data: chatRooms, error } = await supabase
//     .from('chat_rooms')
//     .select(
//       `
//       *,
//       toUserId:users!public_chat_rooms_to_user_id_fkey(user_id, nickname, profile_image),
//       fromUserId:users!public_chatrooms_formUserId_fkey(user_id, nickname, profile_image),
//       messages: chat_messages(created_at)
//     `
//     )
//     .or(`toUserId.eq.${userId},fromUserId.eq.${userId}`)
//     .order('created_at', { ascending: false });

//   if (error || !chatRooms) throw error;
//   return chatRooms;
// };

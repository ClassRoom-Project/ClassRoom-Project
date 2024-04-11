import { ChatRoom, ChatRoomFromDB, CreateNewChatRoomType, MakeClassUserInfoType } from '@/types/chat/chatTypes';
import { supabase } from '../supabase/supabase';

//채팅방 생성
export const createChatRoom = async ({
  toClassId,
  fromUserId,
  teacherUserId
}: CreateNewChatRoomType): Promise<CreateNewChatRoomType | undefined> => {
  const { data: existingRooms, error: searchError } = await supabase

    .from('chat_rooms')
    .select('*')
    .eq('to_class_id', toClassId)
    .eq('from_user_id', fromUserId);

  if (searchError) {
    console.error('검색 중 에러 발생:', searchError);
    return;
  }

  if (existingRooms.length === 0) {
    // 존재하지 않는 경우, 새로운 채팅방을 삽입
    const { data: insertedData, error } = await supabase
      .from('chat_rooms')
      .insert([
        {
          to_class_id: toClassId,
          from_user_id: fromUserId,
          teacher_user_id: teacherUserId
        }
      ])
      .single(); // 단일 행 삽입 결과를 받습니다.123234
    if (error) {
      console.error('삽입 중 에러 발생:', error);
      throw error;
    }

    console.log('삽입 성공:', insertedData);
    return insertedData; // 삽입된 새로운 행의 데이터를 반환합니다.
  } else console.log('이미 방이있어요');
};

//방 정보 가져오기
export const getChatRooms = async (loginUserId: string): Promise<any> => {
  const { data, error } = await supabase
    .from('chat_rooms')
    .select(
      `
      chat_id, created_at, to_class_id, from_user_id, teacher_user_id,
      class!inner(title, user_id, users!inner(nickname, profile_image))
    `
    )
    .or(`from_user_id.eq.${loginUserId},teacher_user_id.eq.${loginUserId}`);

  if (error) {
    console.error('못가져와', error);
    throw error;
  }

  // console.log(data);
  const transformedData = data!.map((chatRoom: any) => {
    const chatRoomTyped = {
      chatId: chatRoom.chat_id,
      createdAt: chatRoom.created_at,
      toClassId: chatRoom.to_class_id,
      fromUserId: chatRoom.from_user_id,
      teacherUserId: chatRoom.teacher_user_id,
      title: chatRoom.class.title,
      makeClassUserId: chatRoom.class.user_id,
      nickName: chatRoom.class.users.nickname,
      profileImg: chatRoom.class.users.profile_image
    };

    return chatRoomTyped;
  });

  return transformedData;
};

//채팅방 들어갈 정보 (nickname, profileImage)
export const getMakeClassUser = async (classUserId: string): Promise<MakeClassUserInfoType | null> => {
  const { data: makeClassUserInfo, error } = await supabase
    .rpc('get_make_class_user_info', { class_user_id: classUserId }) // 함수명과 매개변수 명시
    .single(); // 단일 결과를 반환하도록 요청

  if (error) {
    console.error('Failed to get makeClassUserInfo', error);
    throw error;
  }

  // RPC 호출은 기본적으로 단일 객체를 반환
  return makeClassUserInfo as MakeClassUserInfoType;
};

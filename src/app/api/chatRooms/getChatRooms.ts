import {
  ChatMessageType,
  ChatRoom,
  ChatRoomFromDB,
  CreateNewChatRoomType,
  GetChatRoomMessagesType,
  GetLastMessageType,
  MakeClassUserInfoType,
  PushImageType,
  SendNewMessageType
} from '@/types/chat/chatTypes';
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
    console.error(searchError);
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

    return insertedData;
  }
};

//방 정보 가져오기
export const getChatRooms = async (loginUserId: string): Promise<ChatRoom[]> => {
  const { data, error } = await supabase
    .from('chat_rooms')
    .select(
      `
      chat_id, created_at, to_class_id, from_user_id, teacher_user_id,
      class!inner(title,image, user_id, users!inner(nickname, profile_image))
    `
    )
    .or(`from_user_id.eq.${loginUserId},teacher_user_id.eq.${loginUserId}`);

  if (error) {
    throw error;
  }

  const transformedData = data!.map((test) => {
    //타입추론 우회하기
    const chatRoom = test as any as ChatRoomFromDB;
    const chatRoomTyped = {
      chatId: chatRoom.chat_id,
      createdAt: chatRoom.created_at,
      toClassId: chatRoom.to_class_id,
      fromUserId: chatRoom.from_user_id,
      teacherUserId: chatRoom.teacher_user_id,
      title: chatRoom.class.title,
      image: chatRoom.class.image,
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

//채팅 텍스트 넣기
export const createNewMessages = async ({
  chatId,
  message,
  loginUserId
}: SendNewMessageType): Promise<SendNewMessageType | undefined> => {
  const { data: newChat, error } = await supabase

    .from('chat_messages')
    .insert([
      {
        chat_id: chatId,
        messages: message,
        create_by: loginUserId,
        check: false
      }
    ])
    .single();
  if (error) {
    console.error('삽입 중 에러 발생:', error);
    throw error;
  }
  return newChat;
};

// Supabase에 파일을 업로드하고, 업로드된 파일의 URL을 반환하는 함수
export const uploadPhotosToSupabase = async (files: File[]) => {
  const urls = [];
  for (const file of files) {
    const randomUUID = crypto.randomUUID();
    const filePath = `messageImage/${randomUUID}`;

    const { data, error } = await supabase.storage.from('chatImages').upload(filePath, file);
    if (error) {
      console.error('Error uploading file:', error);
      continue;
    }
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/chatImages/${data.path}`;
    urls.push(url);
  }
  return urls;
};

// 채팅 이미지 넣기
export const createNewMessagesPhoto = async ({ chatId, photos, loginUserId }: PushImageType) => {
  // 배열 초기화
  const results: ChatMessageType[] = [];

  // 초기화된 배열 반복 실행
  for (const photo of photos) {
    const { data: newChat, error } = await supabase
      .from('chat_messages')
      .insert({
        chat_id: chatId,
        images: [photo],
        create_by: loginUserId
      })
      .single();

    if (error) {
      console.error('삽입 중 에러 발생:', error);
      continue;
    }

    results.push(newChat);
  }
  return results;
};

//메시지 내용 가져오기
export const getChatMessages = async (
  chatId: string,
  loginUserId: string,
  cursorDate?: string
): Promise<GetChatRoomMessagesType[]> => {
  let query = supabase
    .from('chat_messages')
    .select('created_at, create_by, messages, images, messages_id')
    .eq('chat_id', chatId)
    .order('created_at', { ascending: false })
    .limit(20);

  if (cursorDate) {
    query.lt('created_at', cursorDate);
  }

  const { data, error } = await query;

  await updateCheckMessage(chatId, loginUserId);

  if (error) {
    throw error;
  }

  return data;
};

//메시지 읽음 처리
const updateCheckMessage = async (chatId: string, loginUserId: string): Promise<void> => {
  if (!loginUserId) {
    return;
  }

  const { error } = await supabase
    .from('chat_messages')
    .update({ check: true })
    .neq('create_by', loginUserId)
    .eq('chat_id', chatId);

  if (error) {
    throw error;
  }
};

// 마지막 메시지 가져오기
export const getLastChatMessage = async (chatId: string): Promise<GetLastMessageType | undefined> => {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('created_at, messages, images')
    .order('created_at', { ascending: false })
    .eq('chat_id', chatId)
    .limit(1)
    .single();

  const lastMessages = {
    createdAt: data?.created_at,
    messages: data?.messages,
    images: data?.images
  };

  if (error) {
    throw error;
  }

  return lastMessages;
};

//읽지 않은 방채팅 개수 가져오기
export const readCheckMessages = async (chatId: string, loginUserId: string): Promise<number | null> => {
  const { error, count } = await supabase
    .from('chat_messages')
    .select('', { count: 'exact' })
    .eq('chat_id', chatId)
    .eq('check', false)
    .neq('create_by', loginUserId);

  if (error) {
    throw error;
  }

  return count;
};

export const readCheckMessagesAll = async (loginUserId: string): Promise<number | null> => {
  //로그인한 사용자가 참여한 채팅방 목록 조회
  const { data: chatRooms, error: roomsError } = await supabase
    .from('chat_rooms')
    .select('chat_id')
    .or(`from_user_id.eq.${loginUserId},teacher_user_id.eq.${loginUserId}`);

  if (roomsError) {
    throw roomsError;
  }

  const chatIds = chatRooms.map((room) => room.chat_id);

  const { count, error: messagesError } = await supabase
    .from('chat_messages')
    .select('', { count: 'exact' })
    .in('chat_id', chatIds)
    .eq('check', false)
    .neq('create_by', loginUserId);

  if (messagesError) {
    throw messagesError;
  }

  return count;
};

// 채팅 방 삭제
export const deleteRoom = async (chatId: string) => {
  const { error } = await supabase //
    .from('chat_rooms')
    .delete()
    .eq('chat_id', chatId);

  if (error) {
    console.error('failed to deleteRoom', error);
    return;
  }
};

// 메시지 일부 삭제
export const deleteMessage = async (messagesId: number) => {
  const { error } = await supabase //
    .from('chat_messages')
    .delete()
    .eq('messages_id', messagesId);

  if (error) {
    console.error('failed to deleteRoom', error);
    return;
  }
};

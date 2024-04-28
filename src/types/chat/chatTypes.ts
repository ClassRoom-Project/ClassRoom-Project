export interface ChatRoomsType {
  chatId: string;
  createdAt: string;
  toClassId: string;
  fromUserId: string;
  teacherUserId: string;
  class: {
    title: string;
    userId: string;
    users: {
      nickname: string;
      profile_image: string;
    }[];
  }[];
}

export interface CreateNewChatRoomType {
  toClassId: string;
  fromUserId: string;
  teacherUserId: string;
}

export interface User {
  nickName: string;
  profileImg: string;
}

export interface Class {
  title: string;
  makeClassUserId: string;
  users: User; // users가 배열이 아니라 단일 객체라고 가정
}

export interface ChatRoom {
  chatId: string;
  createdAt: string;
  toClassId: string;
  fromUserId: string;
  teacherUserId: string;
  title: string;
  image: string[];
  makeClassUserId: string;
  nickName: string;
  profileImg: string;
}

export interface ChatPreviewType {
  chatId: string;
  toClassId: string;
  fromUserId: string;
  otherId: string;
  title: string;
  image: string[];
  makeClassUserId: string;
  loginUserId: string;
}

export interface ChatRoomFromDB {
  chat_id: string;
  created_at: string;
  to_class_id: string;
  from_user_id: string;
  teacher_user_id: string;
  class: {
    title: string;
    user_id: string;
    image: string[];
    users: {
      nickname: string;
      profile_image: string;
    };
  };
}

export interface ChatMessagesType {
  chatId: string;
  otherId: string;
  title: string;
  toClassId: string;
  fromUserId: string;
  mainImage: string | null;
}

export interface MakeClassUserInfoType {
  nickname: string;
  profile_image: string;
}

export interface SendNewMessageType {
  chatId: string;
  message: string;
  loginUserId: string;
}

export interface SendNewPhotoMessageType {
  chatId: string;
  photos: string[];
  loginUserId: string;
}

export interface GetChatRoomMessagesType {
  created_at: string;
  create_by: string;
  messages: string;
  images: string;
  messages_id: number;
}

export interface MessagesBoxsType {
  toClassId: string;
  title: string;
  fromUserId: string;
  chatId: string;
  otherId: string;
  studentName: string;
  mainImage: string | null;
}

export interface GetLastMessageType {
  messages: string;
  images: string;
  createdAt: string;
}

export interface PushImageType {
  chatId: string;
  photos: string[];
  loginUserId: string;
}

export interface ChatMessageType {
  chat_id: string;
  images: string[];
  create_by: string;
}

export interface ChatImageeModalType {
  chatId: string;
  closeModal: (value: boolean) => void;
}

export interface ChatMessage {
  chat_id: string;
  check: boolean;
  create_by: string;
  created_at: string;
  images: string | null;
  messages: string | null;
  messages_id: number;
}

export interface InfiniteChatMessage {
  created_at: string;
  create_by: string;
  messages: string;
  images: string;
  messages_id: number;
}

export type Message = InfiniteChatMessage[];

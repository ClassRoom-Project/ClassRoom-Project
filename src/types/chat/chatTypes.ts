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
  makeClassUserId: string;
  nickName: string;
  profileImg: string;
}
export interface ChatRoomFromDB {
  chat_id: any;
  created_at: any;
  to_class_id: any;
  from_user_id: any;
  teacher_user_id: any;
  class: {
    title: any;
    user_id: any;
    users: {
      nickname: any;
      profile_image: any;
    };
  };
}

export interface ChatMessagesType {
  chatId: string;
  otherId: string;
  title: string;
  toClassId: string;
  fromUserId: string;
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
  photo: string;
  loginUserId: string;
}

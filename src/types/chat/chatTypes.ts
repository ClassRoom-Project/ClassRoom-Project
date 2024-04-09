export interface ChatRoomType {
  chatId: string;
  createdAt: string;
  toClassId: string;
  fromUserId: string;
  toClassUserId: string;
}

export interface CreateNewChatRoom {
  toClassId: string;
  fromUserId: string;
}

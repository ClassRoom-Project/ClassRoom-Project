import { ChatRoomType } from '@/types/chat/chatTypes';

//데이터 불러오기,

export default function ChatPreview({ chatId, fromUserId, toClassId, createdAt, toClassUserId }: ChatRoomType) {
  return <div>{toClassUserId}</div>;
}

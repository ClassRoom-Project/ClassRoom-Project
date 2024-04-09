import { ChatRoomType } from '@/types/chat/chatTypes';
import { useEffect, useState } from 'react';

//데이터 불러오기,

export default function ChatPreview({ chatId, fromUserId, toClassId, createdAt, toClassUserId }: ChatRoomType) {
  //   const [class, setClass] = useState()

  // useEffect(() => {
  //   async () => {

  //   }
  // },[])

  return <div>{toClassUserId}</div>;
}

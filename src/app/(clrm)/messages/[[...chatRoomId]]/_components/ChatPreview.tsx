import Image from 'next/image';
import { useEffect, useState } from 'react';

//데이터 불러오기,

export default function ChatPreview({
  // chatId,
  // createdAt,
  // toClassId,
  // fromUserId,
  // teacherUserId,
  // title,
  // makeClassUserId,
  nickName,
  profileImg
}: any) {
  //   const [class, setClass] = useState()

  // useEffect(() => {
  //   async () => {

  //   }
  // },[])

  return (
    <div className="flex py-4 hover:bg-[#E3E1FC] border-b-2">
      <div className="mx-3">
        <img src={profileImg} alt="profileImg" width={50} height={50} className="border border-black rounded-full" />
      </div>
      <div className="flex flex-col mx-3 flex-1">
        <p className=" md:text-lg sm:text-sm font-bold">{nickName}</p>
        <p className="sm:text-sm text-gray-500">메시지</p>
      </div>
    </div>
  );
}

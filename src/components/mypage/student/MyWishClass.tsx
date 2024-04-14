import React from 'react';
import MyWishClassItem from './MyWishClassItem';
import { useQuery } from '@tanstack/react-query';
import { getMyWishClass } from '@/app/api/mypage/my-class-api';
import { useLoginStore } from '@/store/login/loginUserIdStore';

const MyWishClass = () => {
  const { loginUserId } = useLoginStore();
  const { data: myWishClassList, isPending } = useQuery({
    queryKey: ['wish', loginUserId],
    queryFn: () => getMyWishClass(loginUserId),
    enabled: !!loginUserId
  });

  if (isPending) {
    return <div> 로딩중 ... </div>;
  }

  if (!Array.isArray(myWishClassList) || myWishClassList.length === 0) {
    return <div> 즐겨찾기한 클래스가 없습니다.</div>;
  }

  return (
    <div className="flex flex-col align-center w-[1080px]">
      <ul>
        {myWishClassList.map((classItem) => (
          <MyWishClassItem key={classItem.wish_id} classItem={classItem} />
        ))}
      </ul>
    </div>
  );
};

export default MyWishClass;

import React from 'react';
import MyWishClassItem from './MyWishClassItem';
import { useQuery } from '@tanstack/react-query';
import { getMyWishClass } from '@/app/api/mypage/my-class-api';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { QueryKeys } from '@/constants/QueryKeys';

const MyWishClass = () => {
  const { loginUserId } = useLoginStore();
  const { data: myWishClassList, isPending } = useQuery({
    queryKey: [QueryKeys.WISH_CHECK, loginUserId],
    queryFn: () => getMyWishClass(loginUserId),
    enabled: !!loginUserId
  });

  if (isPending) {
    return <div> 로딩중 ... </div>;
  }

  if (!myWishClassList || myWishClassList.length === 0) {
    return <div> 즐겨찾기한 클래스가 없습니다.</div>;
  }

  return (
    <ul className="flex flex-col align-center max-w-screen-xl">
      {myWishClassList.map((classItem) => (
        <MyWishClassItem key={classItem.class_id} classItem={classItem} />
      ))}
    </ul>
  );
};

export default MyWishClass;

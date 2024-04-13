'use client';

import fetchMyClasses from '@/app/api/mypage/fetchMyClasses';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useQuery } from '@tanstack/react-query';
import MyReservedClassItem from './MyReservedClassItem';

const MyReservedClass = () => {
  const { loginUserId } = useLoginStore();

  const { data: reservedClasses, isPending } = useQuery({
    queryKey: ['reserve'],
    queryFn: () => fetchMyClasses(loginUserId),
    enabled: !!loginUserId
  });
  // console.log('reservedClasses', reservedClasses);

  if (isPending) {
    return <div> 로딩중 ... </div>;
  }

  if (!reservedClasses || reservedClasses.length === 0) {
    return <div> 내가 예약한 클래스가 없습니다.</div>;
  }

  return (
    <div className="w-[1080px] ">
      <ul>
        {reservedClasses.map((classItem) => (
          <MyReservedClassItem key={classItem.reserve_id} classItem={classItem} />
        ))}
      </ul>
    </div>
  );
};

export default MyReservedClass;

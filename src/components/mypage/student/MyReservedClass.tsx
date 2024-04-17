'use client';

import fetchMyClasses from '@/app/api/mypage/fetchMyClasses';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useQuery } from '@tanstack/react-query';
import MyReservedClassItem from './MyReservedClassItem';

const MyReservedClass = () => {
  const { loginUserId } = useLoginStore();

  // 예약한 클래스 정보 불러오기
  const { data: reservedClasses, isPending } = useQuery({
    queryKey: ['reserve'],
    queryFn: () => fetchMyClasses(loginUserId),
    enabled: !!loginUserId
  });

  if (isPending) {
    return <div> 로딩중 ... </div>;
  }

  if (!reservedClasses || reservedClasses.length === 0) {
    return <div> 내가 예약한 클래스가 없습니다.</div>;
  }

  return (
    <div className="flex flex-col align-center max-w-screen-xl">
      <ul>
        {reservedClasses.map((classItem) => (
          <MyReservedClassItem key={classItem.reserve_id} classItem={classItem} />
        ))}
      </ul>
    </div>
  );
};

export default MyReservedClass;

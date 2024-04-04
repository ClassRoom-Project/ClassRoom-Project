'use client';
import { userId } from '@/app/(clrm)/mypage/page';
import fetchMyClasses from '@/app/api/mypage/fetchMyClasses';
import { useQuery } from '@tanstack/react-query';
import MyReservedClassItem from './MyReservedClassItem';

const MyReservedClass = () => {
  const { data: reservedClasses, isPending } = useQuery({
    queryKey: ['reserve'],
    queryFn: () => fetchMyClasses(userId)
  });
  // console.log('reservedClasses', reservedClasses);

  if (isPending) {
    return <div> 로딩중 ... </div>;
  }

  if (!reservedClasses) {
    return <div> 내가 예약한 클래스가 없습니다.</div>;
  }

  return (
    <div className="w-[1280px] ">
      <ul>
        {reservedClasses.map((classItem) => (
          <MyReservedClassItem key={classItem.reserve_id} classItem={classItem} />
        ))}
      </ul>
    </div>
  );
};

export default MyReservedClass;

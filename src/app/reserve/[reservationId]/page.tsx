import { fetchReserveClassInfo } from '@/app/api/supabase/fetchClassInfo';
import { fetchReserveInfo } from '@/app/api/supabase/fetchReserveInfo';
import NavigationButtons from '@/components/reserve/reservationComplete/NavigationButtons';
import React from 'react';

const reservationCompletePage = async ({ params }: { params: { reservationId: string } }) => {
  const reservationId = decodeURIComponent(params.reservationId);

  const completedReserveInfo = await fetchReserveInfo(reservationId);

  if (!completedReserveInfo) {
    return <div>예약 완료 정보를 불러오는 도중 문제가 발생했습니다.</div>;
  }
  const reservedClassInfo = await fetchReserveClassInfo({ classId: completedReserveInfo?.class_id });

  const reserveInfoLabels = [
    {
      title: '클래스명',
      description: `${reservedClassInfo?.title}` // api 수정 후 클래스명으로 변경
    },
    {
      title: '이용 일자',
      description: `${completedReserveInfo?.reserve_date}`
    },
    {
      title: '이용 회차',
      description: `${completedReserveInfo?.reserve_time.slice(0, 5)}`
    },
    {
      title: '이용 인원',
      description: `${completedReserveInfo?.reserve_quantity}명`
    },
    {
      title: '이용 금액',
      description: `${completedReserveInfo?.reserve_price.toLocaleString('ko-KR')}원`
    }
  ];

  return (
    <div className="w-full h-full">
      <h1 className="text-xl">예약 완료</h1>
      <div className="w-full h-full bg-gray-200 p-6 flex flex-col justify-between items-center">
        <h1 className="text-xl text-center mb-20">예약이 정상적으로 처리되었습니다..</h1>
        <div className="flex flex-col w-1/3 gap-6 mb-20">
          {reserveInfoLabels.map((item, index) => (
            <div key={index} className="flex w-full justify-between gap-4">
              <span className="w-20 text-right">{item.title}</span>
              <span className="w-52 text-center">{item.description}</span>
            </div>
          ))}
        </div>
        <NavigationButtons />
      </div>
    </div>
  );
};

export default reservationCompletePage;

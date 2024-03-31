import { fetchReserveInfo } from '@/api/supabase/fetchReserveInfo';
import NavigationButtons from '@/components/reserve/reservationComplete/NavigationButtons';
import React from 'react';

const reservationCompletePage = async ({ params }: { params: { reservationId: string } }) => {
  const reservationId = decodeURIComponent(params.reservationId);
  console.log(reservationId);

  const reserveInfos = await fetchReserveInfo();
  // console.log(reserveInfos);

  const findCurrentReserveInfo = reserveInfos?.find((item) => item.reserveId === reservationId);
  console.log(findCurrentReserveInfo);

  const reserveInfoLabels = [
    {
      title: '클래스명',
      description: '[요리] 쫀득쫀득 스모어쿠키'
    },
    {
      title: '이용 일자',
      description: '2024-03-26'
    },
    {
      title: '이용 회차',
      description: '16:00 (1회차)'
    },
    {
      title: '이용 인원',
      description: '1 명'
    },
    {
      title: '이용 금액',
      description: '50,000원'
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

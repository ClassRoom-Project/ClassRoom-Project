import React from 'react';
import { fetchReservationDetails } from '@/app/api/reserve/fetchReserveInfo';
import { convertTimeTo12HourClock } from '@/utils/convertTimeTo12HourClock';
import NavigationButtons from '@/components/reserve/reservationComplete/NavigationButtons';

const reservationCompletePage = async ({ params }: { params: { reservationId: string } }) => {
  const reservationId = decodeURIComponent(params.reservationId);
  const reservationDetails = await fetchReservationDetails(reservationId);

  if (!reservationDetails) {
    return <div>예약 완료 정보를 불러오는 도중 문제가 발생했습니다.</div>;
  }

  const { class: classDetails, reserveDate, reserveTime, reserveQuantity, reservePrice } = reservationDetails;

  const reserveInfoLabels = [
    {
      title: '클래스명',
      description: `${classDetails.title}`
    },
    {
      title: '이용 일자',
      description: `${reserveDate}`
    },
    {
      title: '이용 회차',
      description: `${convertTimeTo12HourClock(reserveTime.slice(0, 5))}`
    },
    {
      title: '이용 인원',
      description: `${reserveQuantity}명`
    },
    {
      title: '이용 금액',
      description: `${reservePrice.toLocaleString('ko-KR')}원`
    }
  ];

  return (
    <div className="w-full h-full">
      <h1 className="text-xl">예약 완료</h1>
      <div className="w-full h-full bg-gray-200 p-6 flex flex-col justify-between items-center">
        <h1 className="text-xl text-center mb-20">예약이 정상적으로 처리되었습니다..</h1>
        <div className="flex flex-col w-1/3 gap-6 mb-20">
          {reserveInfoLabels.map(({ title, description }) => (
            <div key={title} className="flex w-full justify-between gap-4">
              <p className="w-20 text-right">{title}</p>
              <p className="w-52 text-center">{description}</p>
            </div>
          ))}
        </div>
        <NavigationButtons />
      </div>
    </div>
  );
};

export default reservationCompletePage;

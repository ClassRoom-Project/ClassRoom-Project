'use client';

import { insertNewReservation } from '@/app/api/reserve/submitReservation';
import NavigationButtons from '@/components/reserve/reservationComplete/NavigationButtons';
import { useReserveStore } from '@/store/reserveClassStore';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ReservationCompletePage = ({ params }: { params: { reservationCompleted: string } }) => {
  const reservationId = decodeURIComponent(params.reservationCompleted);
  console.log(reservationId);

  const { setReserveInfo, reserveInfo } = useReserveStore();

  // const reservationDetails = await fetchReservationDetails(reservationId);
  // 일단 페이먼트키 들어왔을때 if한번 걸고
  // 예약정보 넘겨서 완료되면 데이터 들어오고 그동안 스피너 보여주고

  const [isConfirmed, setIsConfirmed] = useState(false);
  const searchParams = useSearchParams();
  const paymentKey = searchParams.get('paymentKey');
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');

  useEffect(() => {
    const submitReservation = async () => {
      const reservationId = await insertNewReservation(reserveInfo);
    };
  });

  // if (!reservationDetails) {
  //   return <div>예약 완료 정보를 불러오는 도중 문제가 발생했습니다.</div>;
  // }

  /* 테이블 reserve_date, reserve_time이 null이 되었기 때문에 오류 방지를 위해 임시 주석처리 */

  // const { class: classDetails, reserveDate, reserveTime, reserveQuantity, reservePrice } = reservationDetails;

  // const reserveInfoLabels = [
  //   {
  //     title: '클래스명',
  //     description: `${classDetails.title}`
  //   },
  //   {
  //     title: '이용 일자',
  //     description: `${reserveDate}`
  //   },
  //   {
  //     title: '이용 회차',
  //     description: `${convertTimeTo12HourClock(reserveTime.slice(0, 5))}`
  //   },
  //   {
  //     title: '이용 인원',
  //     description: `${reserveQuantity}명`
  //   },
  //   {
  //     title: '이용 금액',
  //     description: `${reservePrice.toLocaleString('ko-KR')}원`
  //   }
  // ];

  return (
    <div className="w-full h-full">
      <h1 className="text-xl">예약 완료</h1>
      <div className="w-full h-full bg-gray-200 p-6 flex flex-col justify-between items-center">
        <h1 className="text-xl text-center mb-20">예약이 정상적으로 처리되었습니다..</h1>
        <div className="flex flex-col w-1/3 gap-6 mb-20">
          {/* <div>{`${reservationDetails.class.title} `}</div>
          <div>{`time_id = ${reservationDetails.timeId}`}</div>
          <div>{`reserve_price = ${reservationDetails.reservePrice} `}</div> */}
          {/* {reserveInfoLabels.map(({ title, description }) => (
            <div key={title} className="flex w-full justify-between gap-4">
              <p className="w-20 text-right">{title}</p>
              <p className="w-52 text-center">{description}</p>
            </div>
          ))} */}
        </div>
        <NavigationButtons />
      </div>
    </div>
  );
};

export default ReservationCompletePage;

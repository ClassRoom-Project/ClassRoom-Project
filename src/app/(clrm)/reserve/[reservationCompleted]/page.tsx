'use client';

import { fetchReservationDetails } from '@/app/api/reserve/fetchReservationDetails';
import { insertNewReservation } from '@/app/api/reserve/submitReservation';
import NavigationButtons from '@/components/reserve/reservationComplete/NavigationButtons';
import { useReserveStore } from '@/store/reserveClassStore';
import { DBReserveInfo, ReserveInfo, reservationDetailsType, reservationDetailsType2 } from '@/types/reserve';
import { convertTimeTo12HourClock } from '@/utils/convertTimeTo12HourClock';
import { useEffect, useState } from 'react';

const ReservationCompletePage = () => {
  const [reservationRequest, setReservationRequest] = useState<ReserveInfo>();
  const [reservationResponse, setReservationResponse] = useState<reservationDetailsType2>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storageData = window.localStorage.getItem('reservationInfo');
      const reserveInfo: ReserveInfo = storageData ? JSON.parse(storageData) : {}; // null 처리
      setReservationRequest(reserveInfo);
    }
  }, []);

  useEffect(() => {
    if (reservationRequest) {
      const submitReservation = async () => {
        const reservationId = await insertNewReservation(reservationRequest);

        if (reservationId) {
          const reservationResponse = await fetchReservationDetails(reservationId);
          setReservationResponse(reservationResponse);
        }
      };
      submitReservation();
    }
  }, [reservationRequest]);

  console.log(reservationResponse);

  // if (reservationResponse) {
  //   const { class: classDetails, reserveQuantity, reservePrice } = reservationResponse;
  // }

  const reserveInfoLabels = [
    {
      title: '클래스명',
      description: `${reservationResponse?.class.title}`
    },
    {
      title: '이용 일자',
      description: `${reservationResponse?.timeId}`
    },
    {
      title: '이용 시간',
      description: `...`
    },
    // {
    //   title: '이용 일자',
    //   description: `${reservationResponse?.timeId}`
    // },
    // {
    //   title: '이용 회차',
    //   description: `${convertTimeTo12HourClock(reservationResponse.)}`
    // },
    {
      title: '이용 인원',
      description: `${reservationResponse?.reserveQuantity}명`
    },
    {
      title: '이용 금액',
      description: `${reservationResponse?.reservePrice.toLocaleString('ko-KR')}원`
    }
  ];

  return (
    <div className="w-full h-full">
      <h1 className="text-xl">예약 완료</h1>
      <div className="w-full h-full bg-gray-200 p-6 flex flex-col justify-between items-center">
        <h1 className="text-xl text-center mb-20">예약이 정상적으로 처리되었습니다..</h1>
        <div className="flex flex-col w-1/3 gap-6 mb-20">
          {/* <div>{`${reservationDetails.class.title} `}</div>
          <div>{`time_id = ${reservationDetails.timeId}`}</div>
          <div>{`reserve_price = ${reservationDetails.reservePrice} `}</div>  */}
          {reservationResponse
            ? reserveInfoLabels.map(({ title, description }) => (
                <div key={title} className="flex w-full justify-between gap-4">
                  <p className="w-20 text-right">{title}</p>
                  <p className="w-52 text-center">{description}</p>
                </div>
              ))
            : ' 로딩중.. 스피너 추가 예정..'}
        </div>
        <NavigationButtons />
      </div>
    </div>
  );
};

export default ReservationCompletePage;

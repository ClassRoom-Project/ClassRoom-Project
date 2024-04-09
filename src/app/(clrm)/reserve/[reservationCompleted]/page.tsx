'use client';

import { fetchReservationDetails } from '@/app/api/reserve/fetchReservationDetails';
import { insertNewReservation } from '@/app/api/reserve/submitReservation';
import NavigationButtons from '@/components/reserve/reservationComplete/NavigationButtons';
import { useReserveStore } from '@/store/reserveClassStore';
import { DBReserveInfo, ReservationDetailsType, ReserveInfo } from '@/types/reserve';
import { convertTimeTo12HourClock } from '@/utils/convertTimeTo12HourClock';
import { useEffect, useState } from 'react';

const ReservationCompletePage = () => {
  const [reservationRequest, setReservationRequest] = useState<ReserveInfo>();
  const [reservationResponse, setReservationResponse] = useState<ReservationDetailsType>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 로컬 스토리지에서 예약 정보 가져와서 set
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

  if (!reservationResponse) {
    //TODO: 화면 중앙으로 배치
    return <div className="border-gray-300 h-16 w-16 animate-spin rounded-full border-[8px] border-t-violet-400"></div>;
  }

  //TODO: 구조분해할당
  const { class: classDetails, time: timeInfo, reserveQuantity, reservePrice } = reservationResponse;

  const reserveInfoLabels = [
    {
      title: '클래스명',
      description: `${classDetails.title}`
    },
    {
      title: '이용 일자',
      description: `${timeInfo.date.day}`
    },
    {
      title: '이용 시간',
      description: `${convertTimeTo12HourClock(timeInfo.times)}`
    },
    {
      title: '소요 시간',
      description: `${classDetails.totalTime}시간`
    },
    {
      title: '위치',
      description: `${classDetails.location}`
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

  const LoadingSpinner = () => {
    return <div className="border-gray-300 h-16 w-16 animate-spin rounded-full border-[8px] border-t-violet-400"></div>;
  };

  return (
    <div className="w-full h-full">
      <h1 className="text-xl">예약 완료</h1>
      <div className="w-full h-full bg-gray-200 p-6 flex flex-col justify-between items-center">
        {reservationResponse ? (
          <>
            <h1 className="text-xl text-center mb-20">예약이 정상적으로 처리되었습니다.</h1>
            <div className="flex flex-col w-1/3 gap-6 mb-20">
              {reserveInfoLabels.map(({ title, description }) => (
                <div key={title} className="flex w-full justify-between gap-4">
                  <p className="w-20 text-right">{title}</p>
                  <p className="w-52 text-center">{description}</p>
                </div>
              ))}
            </div>
            <NavigationButtons />
          </>
        ) : (
          <div>예약 실패</div>
        )}
      </div>
    </div>
  );
};

export default ReservationCompletePage;

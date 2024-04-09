'use client';

import { fetchReservationDetails } from '@/app/api/reserve/fetchReservationDetails';
import { insertNewReservation } from '@/app/api/reserve/submitReservation';
import { alreadyReserved } from '@/components/common/Toastify';
import NavigationButtons from '@/components/reserve/reservationComplete/NavigationButtons';
import { useFetchReservationDetail } from '@/hooks/useReserve/useFetchReservationDetail';
import { useReserveStore } from '@/store/reserveClassStore';
import { DBReserveInfo, ReservationDetailsType, ReserveInfo } from '@/types/reserve';
import { convertTimeTo12HourClock } from '@/utils/convertTimeTo12HourClock';
import { useEffect, useState } from 'react';

const ReservationCompletePage = () => {
  const [reservationRequest, setReservationRequest] = useState<ReserveInfo>();
  const [reservationResponse, setReservationResponse] = useState<ReservationDetailsType>();
  const [reserveId, setReserveId] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 로컬 스토리지에서 예약 정보 가져와서 set
      const storageData = window.localStorage.getItem('reservationInfo');
      const reserveInfo: ReserveInfo = storageData ? JSON.parse(storageData) : {}; // null 처리
      setReservationRequest(reserveInfo);
    }
  }, []);

  const { reservationDetails, isError, isLoading } = useFetchReservationDetail(reserveId);
  console.log(reservationDetails);

  useEffect(() => {
    if (reservationRequest) {
      const submitReservation = async () => {
        const responseReserveId = await insertNewReservation(reservationRequest);
        if (responseReserveId) {
          setReserveId(responseReserveId);
        }
      };
      submitReservation();
    }
  }, [reservationRequest]);

  console.log(reservationResponse);

  if (isError) {
    alreadyReserved();
    return;
  }

  const reserveInfoLabels = [
    {
      title: '클래스명',
      description: `${reservationDetails?.class.title}`
    },
    {
      title: '이용 일자',
      description: `${reservationDetails?.time.date.day}`
    },
    // {
    //   title: '이용 시간',
    //   description: `${convertTimeTo12HourClock(reservationDetails?.time.times ?  )}`
    // },
    {
      title: '소요 시간',
      description: `${reservationDetails?.class.totalTime}시간`
    },
    {
      title: '위치',
      description: `${reservationDetails?.class.location}`
    },
    {
      title: '이용 인원',
      description: `${reservationDetails?.reserveQuantity}명`
    },
    {
      title: '이용 금액',
      description: `${reservationDetails?.reservePrice.toLocaleString('ko-KR')}원`
    }
  ];

  const LoadingSpinner = () => {
    return <div className="border-gray-300 h-16 w-16 animate-spin rounded-full border-[8px] border-t-violet-400"></div>;
  };

  return (
    <div className="w-full h-full">
      <h1 className="text-xl">예약 완료</h1>
      <div className="w-full h-full bg-gray-200 p-6 flex flex-col justify-between items-center">
        {isLoading ? (
          <div className="border-gray-300 h-16 w-16 animate-spin rounded-full border-[8px] border-t-violet-400"></div>
        ) : reservationDetails ? (
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
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ReservationCompletePage;

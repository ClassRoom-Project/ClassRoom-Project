'use client';

import { insertNewReservation } from '@/app/api/reserve/insertNewReservation';
import { invalidReserve } from '@/components/common/Toastify';
import NavigationButtons from '@/components/reserve/reservationComplete/NavigationButtons';
import { useFetchReservationDetail } from '@/hooks/useReserve/useFetchReservationDetail';
import { ReserveInfo } from '@/types/reserve';
import { convertTimeTo12HourClock } from '@/utils/convertTimeTo12HourClock';
import { useEffect, useState } from 'react';

const ReservationCompletePage = () => {
  const [reservationRequest, setReservationRequest] = useState<ReserveInfo>();
  const [reserveId, setReserveId] = useState('');
  const [isInvalidRequest, setIsInvalidRequest] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 로컬 스토리지에서 예약 정보 가져와서 set
      const storageData = window.localStorage.getItem('reservationInfo');
      const reserveInfo: ReserveInfo = storageData ? JSON.parse(storageData) : null; // null 처리
      setReservationRequest(reserveInfo);
    }
  }, []);

  useEffect(() => {
    if (reservationRequest) {
      const submitReservation = async () => {
        // db에 예약 정보  insert
        const responseReserveId = await insertNewReservation(reservationRequest);
        if (responseReserveId) {
          setReserveId(responseReserveId);
        }
      };
      submitReservation();
    } else {
      // 요청 인자가 없으면 에러 메세지 출력을 위한 state set
      setIsInvalidRequest(true);
    }
  }, [reservationRequest]);

  // 응답 받은 예약 id로 예약 정보 불러오기
  const { reservationDetails, isError, isLoading } = useFetchReservationDetail(reserveId);

  if (isError) {
    console.log(isError);
    invalidReserve();
    return;
  }

  let reserveInfoLabels = [{ title: '', description: '' }];
  if (reservationDetails) {
    const { class: classInfo, time: dateInfo, reserveQuantity, reservePrice } = reservationDetails;
    reserveInfoLabels = [
      {
        title: '클래스명',
        description: `${classInfo.title}`
      },
      {
        title: '이용 일자',
        description: `${dateInfo.date.day}`
      },
      {
        title: '이용 시간',
        description: `${reservationDetails && convertTimeTo12HourClock(dateInfo.times)}`
      },
      {
        title: '소요 시간',
        description: `${classInfo.totalTime}시간`
      },
      {
        title: '위치',
        description: `${classInfo.location}`
      },
      {
        title: '이용 인원',
        description: `${reserveQuantity}명`
      },
      {
        title: '이용 금액',
        description: `${reservePrice.toLocaleString()}원`
      }
    ];
  }

  return (
    <div className="w-full h-100vh-header  box-border  bg-light-purple flex justify-center items-center flex-col text-gray-600">
      <h1 className="text-xl">예약 완료</h1>
      <div className="w-full p-6 flex flex-col justify-between items-center">
        {!isLoading && reservationDetails ? (
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
        ) : isInvalidRequest && !reservationRequest ? (
          <div>예약 도중 오류 발생!!!</div>
        ) : (
          <div className="flex justify-center flex-col items-center gap-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p>잠시만 기다려주세요..</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationCompletePage;

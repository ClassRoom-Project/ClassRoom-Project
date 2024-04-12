'use client';

import { insertNewReservation } from '@/app/api/reserve/insertNewReservation';
import { ReserveInfo } from '@/types/reserve';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const CheckPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryOrderId = searchParams.get('orderId');
  const storageOrderId = typeof window !== 'undefined' && window.localStorage.getItem('orderId');
  const [reserveId, setReserveId] = useState('');
  const [reservationRequest, setReservationRequest] = useState<ReserveInfo>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 로컬 스토리지에서 예약 정보 가져와서 set
      const storageData = window.localStorage.getItem('reservationInfo');
      const reserveInfo: ReserveInfo = storageData ? JSON.parse(storageData) : null; // null 처리
      setReservationRequest(reserveInfo);
    }
  }, []);

  //TODO: 여기서 한번더 남은자리 체크해도 좋을듯
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
      //  setIsInvalidRequest(true);
    }
  }, [reservationRequest]);

  useEffect(() => {
    if (queryOrderId === storageOrderId) {
      console.log('여기다');
      if (reserveId) {
        // router.replace(`/reserve/success/${reserveId}`);
      }
    }
  }, [reserveId]);

  return (
    <div className="flex justify-center flex-col items-center gap-4 w-full items-center">
      <span className="loading loading-spinner loading-xl bg-gray-400"></span>
      <p>잠시만 기다려주세요..</p>
    </div>
  );
};

export default CheckPage;

'use client';

import { insertNewReservation } from '@/app/api/reserve/insertNewReservation';
import { ReserveInfo } from '@/types/reserve';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const CheckPage = () => {
  const searchParams = useSearchParams();
  const queryOrderId = searchParams.get('orderId');
  const storageOrderId = typeof window !== 'undefined' && window.localStorage.getItem('orderId');
  console.log(queryOrderId, storageOrderId);
  const [reserveId, setReserveId] = useState('');
  const [isLoaidng, setIsLoaidng] = useState(true);

  const [reservationRequest, setReservationRequest] = useState<ReserveInfo>();

  const router = useRouter();

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
          setIsLoaidng(false);
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
        router.push(`/reserve/success/${reserveId}`);
      }
    }
  }, [reserveId]);

  return <div>CheckPage</div>;
};

export default CheckPage;

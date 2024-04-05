'use client';

import { PaymentWidgetInstance, loadPaymentWidget } from '@tosspayments/payment-widget-sdk';

import { convertTimeTo12HourClock } from '@/utils/convertTimeTo12HourClock';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { fetchReservationDetails } from '@/app/api/reserve/fetchReservationDetails';

export default async function PaymentPageasync({ params }: { params: { reservationId: string } }) {
  const clientKey = process.env.TOSS_CLIENT_KEY as string;
  const customerKey = crypto.randomUUID();
  const reservationId = decodeURIComponent(params.reservationId);
  const reservationDetails = await fetchReservationDetails(reservationId);
  const { data: paymentWidget } = usePaymentWidget(clientKey, customerKey);

  const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance['renderPaymentMethods']> | null>(null);
  const [paymentMethodsWidgetReady, isPaymentMethodsWidgetReady] = useState(false);

  if (!reservationDetails) {
    return <div>결제정보를 불러오지 못했습니다. 다시 시도해주세요.</div>;
  }

  const { class: classDetails, reserveDate, reserveTime, reserveQuantity, reservePrice } = reservationDetails;

  const price = reservePrice;
  const totalPerson = `${reserveQuantity}명`;
  const classTitle = `${classDetails.title}`;
  const goToClassDate = `${reserveDate}`;
  const useClassTime = `${convertTimeTo12HourClock(reserveTime.slice(0, 5))}`;
  const reservedId = reservationId;

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    //결제위젯 렌더링
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      '#payment-widget',
      { value: price },
      { variantKey: 'DEFAULT' }
    );

    //이용약관 렌더링
    paymentWidget.renderAgreement('#agreement', {
      variantKey: 'AGREEMENT'
    });

    //결제 UI 렌더링 완료 이벤트
    paymentMethodsWidget.on('ready', () => {
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
      isPaymentMethodsWidgetReady(true);
    });
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    // 금액 업데이트
    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  return (
    <div className="max-w-2xl mx-auto px-4 my-20">
      <div id="payment-widget" className="full" />
      <div id="agreement" className="full" />
      <button type="button">결제하기</button>
    </div>
  );
}
function usePaymentWidget(clientKey: string, customerKey: string) {
  return useQuery({
    queryKey: ['payment-widget', clientKey, customerKey],
    queryFn: () => {
      return loadPaymentWidget(clientKey, customerKey);
    }
  });
}

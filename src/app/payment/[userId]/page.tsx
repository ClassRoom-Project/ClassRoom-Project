'use client';

import { PaymentWidgetInstance, loadPaymentWidget } from '@tosspayments/payment-widget-sdk';
import { convertTimeTo12HourClock } from '@/utils/convertTimeTo12HourClock';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { fetchReservationDetails } from '@/app/api/reserve/fetchReservationDetails';
import { usePaymentWidget } from '@/hooks/usePayment/usePayment';
import { useLoginStore } from '@/store/login/LoginUserIdStore';

const clientKey = process.env.TOSS_CLIENT_KEY as string;

export default async function PaymentPageasync({ params }: { params: { reservationId: string } }) {
  const reservationId = decodeURIComponent(params.reservationId);
  const customerKey = reservationId;
  const reservationDetails = await fetchReservationDetails(reservationId);
  const { data: paymentWidget } = usePaymentWidget(clientKey, customerKey);
  const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance['renderPaymentMethods']> | null>(null);
  const [paymentMethodsWidgetReady, isPaymentMethodsWidgetReady] = useState(false);
  const { loginUserId } = useLoginStore();
  const userEmail = sessionStorage.getItem('userEmail');

  if (!reservationDetails) {
    return <div>결제정보를 불러오지 못했습니다. 다시 시도해주세요.</div>;
  }

  const { class: classDetails, reserveDate, reserveTime, reserveQuantity, reservePrice } = reservationDetails;

  const price = reservePrice;
  const totalPerson = `${reserveQuantity}명`;
  const classTitle = `${classDetails.title}`;
  const goToClassDate = `${reserveDate}`;
  const useClassTime = `${convertTimeTo12HourClock(reserveTime.slice(0, 5))}`;

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
  }, [paymentWidget]);

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
      <div className="flex flex-col gap-2 mt-4">
        <h1 className="text-lg md:text-2xl font-semibold text-point-color">확인 및 결제</h1>
        <p className="text-grey-600 mb-4">
          결제 수단을 선택하고 결제를 진행해주세요. 환불금은 예약 취소 후 2-3일 내에 결제한 카드로 입금됩니다. 아래
          버튼을 눌러 예약을 결제하세요.
        </p>
        {(paymentWidget === null || paymentMethodsWidgetRef === null) && ''}
        <div id="payment-widget" className="full" />
        <div id="agreement" className="full" />
        <button
          type="button"
          className="mt-8 bg-pale-color hover:bg-point-color text-white rounded-md px-5 py-2"
          onClick={async () => {
            try {
              await paymentWidget?.requestPayment({
                orderId: loginUserId as string,
                orderName: `${classTitle}__${goToClassDate}${useClassTime}_${totalPerson}명`,
                customerEmail: userEmail as string,
                //여기에 예약확인 페이지로 넘기기
                successUrl: `${window.location.origin}/success`,
                //fail 시 보여줄 페이지 만들기
                failUrl: `${window.location.origin}/fail?orderId=${loginUserId}`
              });
            } catch (error: any) {
              console.log('faild to paymentWidget', error);
            }
          }}
        >
          결제하기
        </button>
      </div>
    </div>
  );
}

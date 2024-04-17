'use client';

import { useReserveStore } from '@/store/reserveClassStore';
import { PaymentWidgetInstance, loadPaymentWidget } from '@tosspayments/payment-widget-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useAsync } from 'react-use';

const clientKey = 'test_ck_QbgMGZzorzKxLWD9qNkk8l5E1em4' as string;

export default function PaymentPageasync() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customerKey = searchParams.get('customerKey');
  const price = parseInt(searchParams.get('price') || '', 10) || 0;
  const orderId = searchParams.get('orderId');
  const classId = searchParams.get('classId') || crypto.randomUUID();
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance['renderPaymentMethods']> | null>(null);
  const title = searchParams.get('title');
  const { reserveInfo } = useReserveStore();

  useAsync(async () => {
    if (customerKey === 'null' || !customerKey) {
      alert('유저 정보가 존재하지 않습니다. 로그인 상태를 확인해주세요.');
      router.replace(`/`);
      return;
    }
    //초기화
    const paymentWidget = await loadPaymentWidget(clientKey, customerKey);
    if (!loadPaymentWidget) {
      return console.log('요청실패');
    }

    //결제위젯 렌더링
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      '#payment-widget',
      { value: price },
      { variantKey: 'DEFAULT' }
    );

    //이용약관 렌더링
    paymentWidget.renderAgreement('#agreement');

    paymentWidgetRef.current = paymentWidget;
    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;
    if (paymentMethodsWidget == null) {
      return;
    }

    //금액 업데이트
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
        {/* {(paymentWidget === null || paymentMethodsWidgetRef === null) && ''} */}
        <div id="payment-widget" className="w-full" />
        <div id="agreement" className="w-full" />
        <button
          type="button"
          className="mt-8 bg-pale-color hover:bg-point-color text-white rounded-md px-5 py-2"
          onClick={async () => {
            if (customerKey === 'null' || !customerKey) {
              alert('유저 정보가 존재하지 않습니다. 로그인 상태를 확인해주세요.');
              router.replace('/');
            }
            const paymentWidget = paymentWidgetRef.current;
            try {
              await paymentWidget?.requestPayment({
                orderId: orderId as string,
                orderName: title as string,
                // 라우트 핸들러로 예약 정보 전송
                successUrl: `${window.location.origin}/api/payment?classId=${reserveInfo.classId}&reserveQuantity=${reserveInfo.reserveQuantity}&timeId=${reserveInfo.timeId}&userId=${reserveInfo.userId}`,
                //fail 시 보여줄 페이지 만들기
                failUrl: `${window.location.origin}/fail?orderId=${orderId}`
              });
            } catch (error: any) {
              console.log('failed to paymentWidget', error);
            }
          }}
        >
          결제하기
        </button>
      </div>
    </div>
  );
}

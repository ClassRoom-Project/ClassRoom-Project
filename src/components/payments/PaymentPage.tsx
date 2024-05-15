'use client';

import { useReserveStore } from '@/store/reserveClassStore';
import { PaymentWidgetInstance, loadPaymentWidget } from '@tosspayments/payment-widget-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useAsync } from 'react-use';

const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm' as string;

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
    <div className=" responsiveHeight mx-auto my-20 flex max-w-2xl items-center justify-center px-4">
      <div className="mt-4 flex flex-col  gap-2">
        <h1 className="flex w-full justify-center text-lg font-semibold text-button-default-color md:text-2xl">
          확인 및 결제
        </h1>
        <p className="text-grey-600 mb-4">
          결제 수단을 선택하고 결제를 진행해주세요. 환불금은 예약 취소 후 2-3일 내에 결제한 카드로 입금됩니다. 아래
          버튼을 눌러 예약을 결제하세요.
        </p>

        {/* {(paymentWidget === null || paymentMethodsWidgetRef === null) && ''} */}

        <div id="payment-widget" className="w-full" />
        <div id="agreement" className="w-full" />
        <div className="flex w-full items-center justify-center">
          <p className=" text-red-600">
            모바일의 경우 테스트 결제가 진행되지 않습니다. PC버전에서 시도해주시면 감사하겠습니다!
          </p>
        </div>
        <button
          type="button"
          className="hover:button-hover-color mt-8 rounded-md bg-button-default-color px-5 py-2 text-white"
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
                failUrl: `${window.location.origin}/fail?orderId=${orderId}&classId=${classId}`
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

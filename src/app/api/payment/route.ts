import { redirect } from 'next/dist/server/api-utils';
import { insertNewReservation } from '../reserve/insertNewReservation';
import { NextRequest, NextResponse } from 'next/server';

//http get 요청처리, request 객체를 인자로 받음
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const orderId = searchParams.get('orderId');
  const paymentKey = searchParams.get('paymentKey');
  const amount = searchParams.get('amount');
  const reserveQuantity = searchParams.get('reserveQuantity');
  const timeId = searchParams.get('timeId');
  const userId = searchParams.get('userId');
  const classId = searchParams.get('classId');

  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    console.log('NEXT_PUBLIC_BASE_URL is undefined');
    return;
  }

  //params로 값을 받을 때 하나라도 없으면 결제 실패페이지로 리다이렉트 오류처리를 위한 필수 검증
  if (!orderId || !classId || !amount || !reserveQuantity || !timeId || !userId) {
    // 값이 없으면 실패 페이지로 리다이렉트
    return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/reserve/fail`));
  }

  //tosspayment api에 결제를 확인하는 post 요청.
  //요청 헤더에는 인증, 컨텐츠 유형 설정
  const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    body: JSON.stringify({ orderId: orderId, amount: amount, paymentKey: paymentKey }),
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.TOSS_SECRET_KEY}:`).toString('base64')}`,
      'Content-Type': 'application/json'
    }
  });

  //tosspayment api 응답을 json 형태로 파싱
  const res = await response.json();

  //결제 성공 시 예약 데이터를 데이터베이스에 저장
  if (response.ok) {
    try {
      await insertNewReservation({
        reserveId: res.orderId,
        classId,
        reservePrice: res.totalAmount,
        reserveQuantity: Number(reserveQuantity),
        timeId,
        userId
      });

      //성공 시 예약 성공 페이지로 리다이렉트
      //NextResponse.redirect는 서버 측에서 클라이언트를 다른 페이지로 안내할 때 주로 사용
      return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/reserve/success/${res.orderId}`));
    } catch (error) {
      console.log('라우트 핸들러의 insertNewReservation 오류 => ', error);
      //실패 시 실패 페이지로 리다이렉트
      return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/reserve/fail`));
    }
  } else {
    //실패 시
    return NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/reserve/fail?code=${res.code}&statusText=${res.message}`)
    );
  }
}

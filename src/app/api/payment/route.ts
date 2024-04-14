import { redirect } from 'next/dist/server/api-utils';
import { insertNewReservation } from '../reserve/insertNewReservation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const orderId = searchParams.get('orderId');
  const paymentKey = searchParams.get('paymentKey');
  const amount = searchParams.get('amount');
  const reserveQuantity = searchParams.get('reserveQuantity');
  const timeId = searchParams.get('timeId');
  const userId = searchParams.get('userId');
  const classId = searchParams.get('classId');

  // 값이 없으면 실패 페이지로 리다이렉트
  if (!orderId || !classId || !amount || !reserveQuantity || !timeId || !userId) {
    return NextResponse.redirect(new URL(`http://localhost:3000/reserve/fail`));
  }

  const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    body: JSON.stringify({ orderId: orderId, amount: amount, paymentKey: paymentKey }),
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.TOSS_SECRET_KEY}:`).toString('base64')}`,
      'Content-Type': 'application/json'
    }
  });

  // console.log(response);

  const res = await response.json();

  //TODO: 페이먼트키 추가
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

      //TODO: 배포 주소로 변경
      return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/reserve/success/${res.orderId}`));
    } catch (error) {
      console.log('라우트 핸들러의 insertNewReservation 오류 => ', error);
      return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/reserve/fail`));
    }
  } else {
    return NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/reserve/fail?code=${res.code}&statusText=${res.message}`)
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { insertNewReservation } from '../reserve/insertNewReservation';

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

  if (!orderId || !classId || !amount || !reserveQuantity || !timeId || !userId) {
    // 값이 없으면 실패 페이지로 리다이렉트
    return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/reserve/fail`));
  }

  const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    body: JSON.stringify({ orderId: orderId, amount: amount, paymentKey: paymentKey }),
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.TOSS_SECRET_KEY}:`).toString('base64')}`,
      'Content-Type': 'application/json'
    }
  });

  const res = await response.json();

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

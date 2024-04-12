import { redirect } from 'next/dist/server/api-utils';
import { insertNewReservation } from '../reserve/insertNewReservation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const paymentType = searchParams.get('paymentType');
  const orderId = searchParams.get('orderId');
  const paymentKey = searchParams.get('paymentKey');
  const amount = searchParams.get('amount');
  const reserveQuantity = searchParams.get('reserveQuantity');
  const timeId = searchParams.get('timeId');
  const userId = searchParams.get('userId');
  const classId = searchParams.get('classId');

  // 값이 없으면 실패 페이지로 리다이렉트
  if (!orderId || !classId || !amount || !reserveQuantity || !timeId || !userId) {
    console.log('🚀 ~ GET ~ orderId:', orderId);
    console.log('🚀 ~ GET ~ classId:', classId);
    console.log('🚀 ~ GET ~ amount:', amount);
    console.log('🚀 ~ reserveQuantity:', reserveQuantity);
    console.log('🚀 ~ timeId:', timeId);
    console.log('🚀 ~ userId:', userId);
    // console.log('🚀 ~ GET ~ paymentKey:', paymentKey);

    return NextResponse.redirect(new URL(`http://localhost:3000/reserve/fail`));
  }

  // #region
  // console.log('🚀 ~ reserveQuantity:', reserveQuantity);
  // console.log('🚀 ~ timeId:', timeId);
  // console.log('🚀 ~ userId:', userId);
  // console.log('🚀 ~ GET ~ orderId:', orderId);
  // console.log('🚀 ~ GET ~ amount:', amount);
  // console.log('🚀 ~ GET ~ paymentKey:', paymentKey);
  // #endregion

  const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    body: JSON.stringify({ orderId: orderId, amount: amount, paymentKey: paymentKey }),
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.TOSS_SECRET_KEY}:`).toString('base64')}`,
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  //TODO: 페이먼트키 추가
  if (response.ok) {
    try {
      await insertNewReservation({
        reserveId: data.orderId,
        classId,
        reservePrice: data.totalAmount,
        reserveQuantity: Number(reserveQuantity),
        timeId,
        userId
      });

      //TODO: 배포 주소로 변경
      return NextResponse.redirect(new URL(`http://localhost:3000/reserve/success/${data.orderId}`));
    } catch (error) {
      console.log('라우트 핸들러의 insertNewReservation 오류 => ', error);
      return NextResponse.redirect(new URL(`http://localhost:3000/reserve/fail`));
    }
  }
}

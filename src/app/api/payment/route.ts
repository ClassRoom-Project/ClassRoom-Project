import { redirect } from 'next/dist/server/api-utils';
import { insertNewReservation } from '../reserve/insertNewReservation';
import { NextRequest, NextResponse } from 'next/server';

type RedirectEntry = {
  destination: string;
  permanent: boolean;
};

export async function GET(request: NextRequest) {
  // console.log(request);
  const { searchParams } = new URL(request.url);

  const paymentType = searchParams.get('paymentType');
  const orderId = searchParams.get('orderId');
  const paymentKey = searchParams.get('paymentKey');
  const amount = searchParams.get('amount');

  // console.log('🚀 ~ GET ~ orderId:', orderId);
  // console.log('🚀 ~ GET ~ amount:', amount);
  // console.log('🚀 ~ GET ~ paymentKey:', paymentKey);

  const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    body: JSON.stringify({ orderId: orderId, amount: amount, paymentKey: paymentKey }),
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.TOSS_SECRET_KEY}:`).toString('base64')}`,
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  // console.log(data);

  return NextResponse.redirect(new URL(`http://localhost:3000/reserve/success/${data.orderId}`));
}

'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import failIcon from '../../assets/images/failIcon.gif';

import { CgCloseO } from 'react-icons/cg';
import Image from 'next/image';

export default function PaymentFailPage() {
  const searchParams = useSearchParams();
  const classId = searchParams.get('classId') || crypto.randomUUID();

  return (
    <main className="flex justify-center items-center w-full h-[calc(100vh-80px)] ">
      <div className="flex flex-col justify-center items-center w-full h-5/6 sm:w-2/4 md:w-2/4 bg-background-color gap-10">
        <div className="flex flex-col bg-white rounded-md justify-center items-center w-9/12 sm:w-2/4 md:w-4/5 h-4/5  gap-10">
          {/* <p>{`주문번호: (${orderId})`}</p> */}
          <p className="text-xs font-bold  md:text-base whitespace-nowrap flex flex-col items-center justify-center text-center">
            결제처리에 실패하여 회원님의 <br />
            클래스 예약하기를 완료하지 못했습니다!
          </p>
          {/* <CgCloseO className="text-7xl sm:7xl md:text-8xl" /> */}
          <Image width={100} height={100} src={failIcon} alt="failIcon" />
          <Link
            href="/"
            className="text-xs md:text-base whitespace-nowrap btn bg-main-color text-white rounded-md w-9/12 sm:w-2/3 md:w-2/4"
          >
            홈페이지로 돌아가기
          </Link>
          <Link
            href={`/reserve?classId=${classId}`}
            className="text-xs md:text-base whitespace-nowrap btn bg-gray-200 rounded-md  w-9/12 sm:w-2/3 md:w-2/4 "
          >
            예약페이지로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}

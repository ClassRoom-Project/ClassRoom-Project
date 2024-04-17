'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';

import { CgCloseO } from 'react-icons/cg';

export default function FailPage() {
  const searchParams = useSearchParams();
  const classId = searchParams.get('classId') || crypto.randomUUID();
  const orderId = searchParams.get('orderId');

  return (
    <main className="flex justify-center items-center w-full h-[calc(100vh-80px)]">
      <div className="flex flex-col justify-center items-center h-full w-2/3 sm:w-2/4 md:w-2/4 bg-[#F1F1F1] gap-10">
        {/* <p>{`주문번호: (${orderId})`}</p> */}
        <p className="text-xs  md:text-base whitespace-nowrap flex flex-col items-center justify-center text-center">
          결제처리에 실패하여 회원님의 <br />
          클래스 예약하기를 완료하지 못했습니다!
        </p>
        <CgCloseO className="text-7xl sm:7xl md:text-8xl" />
        <Link
          href="/"
          className="text-xs md:text-base whitespace-nowrap btn rounded-none border border-gray-500 w-9/12 sm:w-2/3 md:w-2/4  bg-transparent"
        >
          홈페이지로 돌아가기
        </Link>
        <Link
          href={`/reserve?classId=${classId}`}
          className="text-xs md:text-base whitespace-nowrap btn rounded-none border border-gray-500 w-9/12 sm:w-2/3 md:w-2/4  bg-transparent"
        >
          예약페이지로 돌아가기
        </Link>
      </div>
    </main>
  );
}

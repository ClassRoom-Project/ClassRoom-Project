'use client';

import { checkIsReserved } from '@/app/api/reserve/checkIsReserved';
import { useLoginStore } from '@/store/login/LoginUserIdStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React from 'react';
import { ToastContainer } from 'react-toastify';
import { alreadyReserved } from '../common/Toastify';

//Todo :  href chat ID, 받아서 입력할것
const ClassDetailBtn = ({ classId }: { classId: string }) => {
  const { loginUserId } = useLoginStore();

  const router = useRouter();
  const handleApplyClick = async () => {
    if (!loginUserId) {
      if (window.confirm('로그인이 필요합니다. 로그인하시겠습니까?')) {
        //TODO: 모달창으로 바꾸기
        router.push(`/hello`);
      }
      return;
    }

    const isReserved = await checkIsReserved({ userId: loginUserId, classId });
    if (isReserved) {
      alreadyReserved();
      return;
    } else router.push(`/reserve?classId=${classId}`);
  };

  return (
    <div className="w-[350px] flex justify-center items-center mt-20">
      <ToastContainer />
      <button
        onClick={handleApplyClick}
        className="flex justify-center items-center rounded-2xl w-20 h-9 bg-[#5373FF] text-white mr-3"
      >
        신청하기
      </button>
      <Link
        href={'/message'}
        className="flex justify-center items-center rounded-2xl w-20 border-[#5373FF] border-solid border-[1px] h-9 ml-3"
      >
        문의하기
      </Link>
    </div>
  );
};

export default ClassDetailBtn;

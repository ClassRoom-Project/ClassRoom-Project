'use client';

import { checkIsReserved } from '@/app/api/reserve/checkIsReserved';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React from 'react';

import AskButton from '../chatRooms/AskButton';

import { ToastContainer } from 'react-toastify';
import { alreadyReserved } from '../common/Toastify';

//TODO - href chat ID, 받아서 입력할것
const ClassDetailBtn = ({ classId, makeClassUserId }: { classId: string; makeClassUserId: string }) => {
  const { loginUserId } = useLoginStore();

  const router = useRouter();
  const handleApplyClick = async () => {
    if (!loginUserId) {
      router.push(`/reserve?classId=${classId}`);
    } else {
      const isReserved = await checkIsReserved({ userId: loginUserId, classId });
      if (isReserved) {
        alreadyReserved();
        return;
      } else router.push(`/reserve?classId=${classId}`);
    }
  };

  return (
    <div className="w-[400px] gap-3 flex justify-center items-center">
      <AskButton
        classId={classId}
        makeClassUserId={makeClassUserId}
        buttonStyle="flex justify-center items-center rounded-md w-20 border-[#5373FF] border-solid border-[1px] h-9 ml-3 hover:bg-disable-color"
      />
      <button
        onClick={handleApplyClick}
        className="flex justify-center items-center rounded-md w-20 h-9 bg-[#6C5FF7] text-white mr-3 hover:bg-button-hover-color"
      >
        신청하기
      </button>
    </div>
  );
};

export default ClassDetailBtn;

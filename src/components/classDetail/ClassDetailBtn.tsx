import Link from 'next/link';
import React from 'react';
import AskButton from '../chatRooms/AskButton';

//Todo :  href chat ID, 받아서 입력할것
const ClassDetailBtn = ({ classId }: { classId: string }) => {
  return (
    <div className="w-[350px] flex justify-center items-center mt-20">
      <Link
        href={`/reserve?classId=${classId}`}
        className="flex justify-center items-center rounded-2xl w-20 h-9 bg-[#5373FF] text-white mr-3"
      >
        신청하기
      </Link>
      <AskButton classId={classId} />
    </div>
  );
};

export default ClassDetailBtn;

import Link from 'next/link';
import React from 'react';

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

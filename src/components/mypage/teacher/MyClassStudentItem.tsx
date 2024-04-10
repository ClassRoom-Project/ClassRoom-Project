import { MyClassStudentInfoType } from '@/types/class';
import Image from 'next/image';
import React from 'react';

const MyClassStudentItem = ({ student }: { student: MyClassStudentInfoType }) => {
  return (
    <li className="flex items-center gap-4 border-y border-y-light-gray p-4 ">
      <Image
        src={student.profile_image}
        alt="프로필 이미지"
        width={50}
        height={50}
        className="rounded-full"
        unoptimized={true}
      />
      <p>닉네임 : {student.nickname}</p>
      <p>이메일 : {student.email}</p>
      <p>예약 인원 : {student.reserve_quantity}</p>
      <p>예약 금액 : {student.reserve_price}</p>
      <button className="btn">1:1 채팅</button>
    </li>
  );
};

export default MyClassStudentItem;

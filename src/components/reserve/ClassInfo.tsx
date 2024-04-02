import useReserveStore from '@/store/reserveClassStore';
import { ReserveClassType } from '@/types/class';
import Image from 'next/image';
import React, { useEffect } from 'react';

const ClassInfo = ({ classInfo }: { classInfo: ReserveClassType }) => {
  return (
    <div className="p-2 gap-2 w-full flex h-28 border border-solid border-black">
      <Image // 이미지 자체를 조건부 렌더링
        width={100}
        height={100}
        src={classInfo?.image[0] ? classInfo?.image[0] : 'default image'} // dafault 이미지도 나중에 추가필요
        alt="Class Thumbnail Image"
        unoptimized={true} // 추후 수정 필요
      />
      <div className="flex flex-col">
        <span>{`[${classInfo?.category}] ${classInfo?.title}`}</span>
        <span>{classInfo?.location}</span>
        <span>{classInfo?.price.toLocaleString('ko-KR')}원</span>
      </div>
    </div>
  );
};

export default ClassInfo;

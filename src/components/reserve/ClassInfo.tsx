import { ReserveClassType } from '@/types/class';
import Image from 'next/image';
import React from 'react';
import defaultClassImage from '../../../public/favicon.ico.png';

const ClassInfo = ({ classInfo }: { classInfo: ReserveClassType }) => {
  return (
    <div className="p-2 gap-2 w-full flex h-28 border border-solid border-black">
      {classInfo?.image[0] ? (
        <Image
          width={100}
          height={100}
          src={classInfo?.image[0]}
          alt="Class Thumbnail Image"
          unoptimized={true} // 추후 수정 필요
        />
      ) : (
        <Image width={100} height={100} src={defaultClassImage} alt="Class Thumbnail Image" />
      )}
      <div className="flex flex-col">
        <p>{`[${classInfo?.category}] ${classInfo?.title}`}</p>
        <p>{classInfo?.location}</p>
        <p>{classInfo?.price.toLocaleString('ko-KR')}원</p>
      </div>
    </div>
  );
};

export default ClassInfo;

import Image from 'next/image';
import React from 'react';
import { ClassAllType } from '@/types/class';
import Link from 'next/link';
const ClassCard = ({ classInfos }: { classInfos: ClassAllType }) => {
  return classInfos ? (
    <Link href={`/list/${classInfos.class_id}`}>
      <div className="card w-[250px] h-[300px] bg-base-100 shadow-xl m-1 rounded-lg overflow-hidden">
        <figure className="w-full h-2/5 bg-gray-200">
          <Image
            width={300}
            height={140}
            src={classInfos.image && classInfos.image.length > 0 ? classInfos.image[0] : 'no image'}
            alt="클래스 이미지"
            layout="responsive"
            objectFit="cover"
            unoptimized={true}
          />
        </figure>
        <div className="card-body p-4 flex flex-col justify-between">
          <div className="text-xs bg-black overflow-hidden w-[200px] text-white py-1 px-2 inline-block rounded">
            {classInfos.location}
          </div>

          <p className="text-lg font-semibold">{classInfos.title}</p>
          <p className="text-sm text-gray-600">{classInfos.description}</p>
          <div className="mt-2 text-md font-bold">{`${classInfos.price.toLocaleString()}원`}</div>
        </div>
      </div>
    </Link>
  ) : (
    <div className="text-center">Data Loading...</div>
  );
};

export default ClassCard;

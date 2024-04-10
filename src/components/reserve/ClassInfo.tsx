import { ReserveClassType } from '@/types/class';
import Image from 'next/image';
import React from 'react';
import defaultClassImage from '../../../public/favicon.ico.png';
import { LuClock } from 'react-icons/lu';
import { PiCurrencyKrw } from 'react-icons/pi';
import { GrLocation } from 'react-icons/gr';
import { MdOutlineCategory } from 'react-icons/md';
import { RiUserLocationLine } from 'react-icons/ri';
import { HiOutlineCube } from 'react-icons/hi2';

const ClassInfo = ({ classInfo }: { classInfo: ReserveClassType }) => {
  const classInfoLabels = [
    {
      title: (
        <div className="flex items-center gap-1">
          {<RiUserLocationLine className="text-gray-400" />} {`클래스 유형`}
        </div>
      ),
      description: `${classInfo.classType}`
    },
    {
      title: (
        <div className="flex items-center gap-1">
          {<MdOutlineCategory className="text-gray-400" />} {`카테고리`}
        </div>
      ),
      description: `${classInfo.category}`
    },
    {
      title: (
        <div className="flex items-center gap-1">
          {<HiOutlineCube className="text-gray-400" />} {`난이도`}
        </div>
      ),
      description: `${classInfo.difficulty}`
    },
    {
      title: (
        <div className="flex items-center gap-1">
          {<LuClock className="text-gray-400" />} {`소요 시간`}
        </div>
      ),
      description: `${classInfo.totalTime}시간`
    },
    {
      title: (
        <div className="flex items-center gap-1">
          {<GrLocation size={18} className="text-gray-400" />} {`위치`}
        </div>
      ),
      description: `${classInfo.location}`
    },
    {
      title: (
        <div className="flex items-center gap-1">
          {<PiCurrencyKrw className="text-gray-400" />} {`1인당 수강 금액`}
        </div>
      ),
      description: `${classInfo.price.toLocaleString()}원`
    }
  ];

  return (
    <div className="p-6 bg-white mb-4 rounded-md   ">
      <h1 className="font-bold text-lg mb-1">선택하신 클래스</h1>
      <div className="w-full relative h-[210px] mb-2 ">
        <Image
          className="rounded-lg"
          fill={true}
          src={classInfo.image}
          alt={classInfo.title}
          unoptimized={true} // 추후 수정 필요
        />
      </div>
      <div className="px-2 flex-col flex gap-1">
        <h1 className="font-bold text-xl mb-2">{classInfo.title}</h1>
        <div className="flex flex-col gap-1">
          {classInfoLabels.map(({ title, description }) => {
            return (
              <div key={description} className="flex items-center gap-2 text-gray-500">
                <div className="font-bold ">{title}</div>
                <p className="font-normal">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClassInfo;

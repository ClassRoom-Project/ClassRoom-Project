'use client';

import { BiBookAlt } from 'react-icons/bi';
import { GiLevelEndFlag } from 'react-icons/gi';
import { BiSolidCategory } from 'react-icons/bi';
import { FaWonSign } from 'react-icons/fa6';
import { MdOutlinePersonAddAlt1 } from 'react-icons/md';
import { IoMdTime } from 'react-icons/io';
import { useEffect } from 'react';
import { useDetailClassInfoStore } from '@/store/classInfoStore';
import { detailClassInfo } from '@/app/api/classdetail/detailClassInfo';
import { ClassInfoBox } from './ClassInfoBox';
import { RiHashtag } from 'react-icons/ri';

//태그들 모아놓은 컴포넌트
const ClassInfos = ({ classId }: { classId: string }) => {
  const { classInfo, setClassInfo } = useDetailClassInfoStore();
  //해당 classId에 해당하는 데이터를 불러오기
  useEffect(() => {
    const getClassInfos = async () => {
      const infos = await detailClassInfo(classId);
      if (infos) {
        setClassInfo(infos);
      } else {
        return null;
      }
    };
    getClassInfos();
  }, [setClassInfo, classId]);

  return (
    <div className="w-[350px] p-4 flex flex-col border-gray-400 border-solid border-b-[1px] justify-center items-center">
      <div className="w-[350px] flex justify-between">
        <div className="rounded-2xl border-main-color border-solid border-[1px] p-1 flex justify-center items-center">
          <IoMdTime className="text-main-color" /> 총 {classInfo?.total_time}시간
        </div>
        <div>
          <div className="rounded-2xl border-main-color border-solid border-[1px] p-1 flex justify-center items-center">
            <BiSolidCategory className="text-main-color" />
            {classInfo?.category}
          </div>
        </div>
        <div className="rounded-2xl border-main-color border-solid border-[1px] p-1 flex justify-center items-center">
          <GiLevelEndFlag className="text-main-color" />
          {classInfo?.difficulty}
        </div>
      </div>
      <div className="w-[350px] flex justify-between py-4">
        <div className="rounded-2xl border-main-color border-solid border-[1px] p-1 flex justify-center items-center">
          <RiHashtag className="text-main-color" />
          {classInfo?.hashtag}
        </div>
        <div className="rounded-2xl border-main-color border-solid border-[1px] p-1 flex justify-center items-center">
          <FaWonSign className="text-main-color" />
          {classInfo?.price}원
        </div>
        <div className="rounded-2xl border-main-color border-solid border-[1px] p-1 flex justify-center items-center">
          <BiBookAlt className="text-main-color" />
          {classInfo?.class_type}
        </div>
      </div>
      <div className="w-[250px] justify-start">
        <div className="rounded-2xl border-main-color border-solid border-[1px] p-1 flex justify-center items-center">
          <MdOutlinePersonAddAlt1 className="text-main-color" />
          수용가능인원 : 최소 {classInfo?.min_people} - 최대 {classInfo?.quantity} 명
        </div>
      </div>
    </div>
  );
};

export default ClassInfos;

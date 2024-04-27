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
  console.log('-------', classInfo?.hashtag);
  const hashtagString = classInfo?.hashtag.map((tag, index) => {
    return (
      <div key={`${tag}-${index}`} className="flex items-center justify-center">
        <RiHashtag className="text-main-color" />
        <p>{tag}</p>
      </div>
    );
  });

  return (
    <div className="relative flex w-[400px] flex-col items-center justify-center  border-b-[1px] border-solid border-gray-400 px-2 py-4">
      <div className="flex w-full items-center justify-between ">
        <div className="flex max-w-full flex-wrap items-center justify-center rounded-2xl border-[1px] border-solid border-main-color bg-white px-2 py-1">
          {hashtagString}
        </div>
        <div>
          <div className="flex max-w-full items-center justify-center rounded-2xl border-[1px] border-solid border-main-color  bg-white px-2 py-1">
            <BiSolidCategory className="text-main-color" />
            <p>{classInfo?.category}</p>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-between py-2">
        <div className="flex items-center justify-center rounded-2xl border-[1px] border-solid border-main-color  bg-white px-2 py-1">
          <IoMdTime className="text-main-color" />
          <p>총 {classInfo?.total_time}시간</p>
        </div>
        <div className="mx-auto flex items-center justify-center rounded-2xl border-[1px] border-solid  border-main-color bg-white px-2 py-1">
          <GiLevelEndFlag className="text-main-color" />
          <p>{classInfo?.difficulty}</p>
        </div>

        <div className="flex items-center justify-center rounded-2xl border-[1px] border-solid border-main-color bg-white px-2 py-1">
          <BiBookAlt className="text-main-color" />
          <p>{classInfo?.class_type}</p>
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-center rounded-2xl border-[1px] border-solid border-main-color bg-white px-2 py-1">
          <MdOutlinePersonAddAlt1 className="text-main-color" />
          <p>
            인원 : 최소 {classInfo?.min_people} - 최대 {classInfo?.quantity} 명
          </p>
        </div>
        <div className="flex items-center justify-center rounded-2xl border-[1px] border-solid border-main-color bg-white px-2 py-1">
          <FaWonSign className="text-main-color" />
          <p>{classInfo?.price.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
};

export default ClassInfos;

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
  const hashtagString = classInfo?.hashtag.map((tag) => {
    return (
      <div key={classInfo.class_id} className="flex justify-center items-center">
        <RiHashtag className="text-main-color" />
        <p>{tag}</p>
      </div>
    );
  });

  return (
    <div className="w-[400px] py-4 flex flex-col px-2  border-gray-400 border-solid border-b-[1px] justify-center items-center">
      <div className="flex items-center w-full justify-between ">
        <div className="rounded-2xl flex-wrap bg-white border-main-color border-solid border-[1px] py-1 px-2 flex justify-center items-center">
          {hashtagString}
        </div>
        <div>
          <div className="rounded-2xl bg-white border-main-color border-solid border-[1px] py-1 px-2  flex justify-center items-center">
            <BiSolidCategory className="text-main-color" />
            <p>{classInfo?.category}</p>
          </div>
        </div>
      </div>
      <div className="flex py-2 items-center w-full justify-between">
        <div className="rounded-2xl border-main-color bg-white border-solid border-[1px] py-1 px-2  flex justify-center items-center">
          <IoMdTime className="text-main-color" />
          <p>총 {classInfo?.total_time}시간</p>
        </div>
        <div className="rounded-2xl border-main-color mx-auto bg-white border-solid border-[1px] py-1  px-2 flex justify-center items-center">
          <GiLevelEndFlag className="text-main-color" />
          <p>{classInfo?.difficulty}</p>
        </div>

        <div className="rounded-2xl border-main-color bg-white border-solid border-[1px] py-1 px-2 flex justify-center items-center">
          <BiBookAlt className="text-main-color" />
          <p>{classInfo?.class_type}</p>
        </div>
      </div>
      <div className="flex items-center w-full justify-between">
        <div className="rounded-2xl border-main-color bg-white border-solid border-[1px] py-1 px-2 flex justify-center items-center">
          <MdOutlinePersonAddAlt1 className="text-main-color" />
          <p>
            인원 : 최소 {classInfo?.min_people} - 최대 {classInfo?.quantity} 명
          </p>
        </div>
        <div className="rounded-2xl border-main-color bg-white border-solid border-[1px] py-1 px-2 flex justify-center items-center">
          <FaWonSign className="text-main-color" />
          <p>{classInfo?.price.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
};

export default ClassInfos;

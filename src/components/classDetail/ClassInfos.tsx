'use client';

import { useEffect } from 'react';
import { useDetailClassInfoStore } from '@/store/classInfoStore';
import { detailClassInfo } from '@/app/api/classdetail/detailClassInfo';
import { ClassInfoBox } from './ClassInfoBox';

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
  }, []);

  return (
    <div className="w-[350px] p-4 flex flex-col border-gray-400 border-solid border-b-[1px] justify-center items-center">
      <div className="w-[350px] flex justify-between">
        <div className="rounded-2xl border-[#5373FF] border-solid border-[1px] p-1 flex justify-center items-center">
          총 {classInfo?.total_time}시간
        </div>
        <ClassInfoBox classInfos={classInfo?.category} />
        <ClassInfoBox classInfos={classInfo?.difficulty} />
      </div>
      <div className="w-[350px] flex justify-between py-4">
        <div className="rounded-2xl border-[#5373FF] border-solid border-[1px] p-1 flex justify-center items-center">
          #{classInfo?.hashtag}
        </div>
        <ClassInfoBox classInfos={classInfo?.price} />
        <ClassInfoBox classInfos={classInfo?.class_type} />
      </div>
      <div className="w-[250px] justify-start">
        <div className="rounded-2xl border-[#5373FF] border-solid border-[1px] p-1 flex justify-center items-center">
          수용가능인원 : 최소 {classInfo?.min_people} - 최대 {classInfo?.max_people} 명
        </div>
      </div>
    </div>
  );
};

export default ClassInfos;

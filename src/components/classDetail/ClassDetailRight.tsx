'use client';

import { ListDetailClassInfo } from '@/types/class';
import ClassInfos from './ClassInfos';
import ClassDetailBtn from './ClassDetailBtn';
import ClassDetailDayPicker from './ClassDetailDayPicker';
import { Suspense } from 'react';

//오른쪽 컴포넌트
const ClassDetailRight = ({ classData }: { classData: ListDetailClassInfo | null }) => {
  return (
    <div className="flex flex-col p-5 ml-4 shadow-md justify-start items-center w-[600px] rounded-lg h-[1000px] bg-light-purple">
      <div className="flex items-center mt-2 justify-center h-9 w-[400px]">
        <p className=" text-[#6C5FF7]">{classData?.title}</p>
      </div>
      <div className="w-[400px] min-h-64 overflow-y-scroll border-gray-400 border-solid border-b mt-2">
        <p>{classData?.description}</p>
      </div>
      <div className="w-[400px] h-36 mt-2">
        {classData?.class_id ? <ClassInfos classId={classData.class_id} /> : null}
      </div>
      <div className="w-[400px] min-h-[400px] mt-14 flex justify-center items-center ">
        <Suspense>{classData?.class_id ? <ClassDetailDayPicker classDate={classData.date} /> : null}</Suspense>
      </div>

      <div className="w-[400px] h-36 mt-4">
        {classData?.class_id ? (
          <ClassDetailBtn classId={classData.class_id} makeClassUserId={classData.user_id} />
        ) : null}
      </div>
    </div>
  );
};

export default ClassDetailRight;

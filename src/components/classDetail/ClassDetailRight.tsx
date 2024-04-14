'use client';

import { ListDetailClassInfo } from '@/types/class';
import ClassInfos from './ClassInfos';
import ClassDetailBtn from './ClassDetailBtn';
import ClassDetailDayPicker from './ClassDetailDayPicker';

//오른쪽 컴포넌트
const ClassDetailRight = ({ classData }: { classData: ListDetailClassInfo | null }) => {
  console.log('클래스 데이터', classData?.date);
  return (
    <div className="flex flex-col p-5 ml-4 justify-center items-center w-[500px] rounded-lg h-[1000px] bg-light-purple">
      <div className="flex items-center mt-2 justify-center h-9 w-[350px]">
        <p className=" text-[#6C5FF7]">{classData?.title}</p>
      </div>
      <div className="w-[350px] h-[450px] overflow-hidden border-gray-400 border-solid border-b mt-2">
        <p>{classData?.description}</p>
      </div>
      <div className="w-[350px] h-36 mt-2">
        {classData?.class_id ? <ClassInfos classId={classData.class_id} /> : null}
      </div>
      <div className="w-[300px] h-[300px] mt-12 flex justify-center items-center ">
        {classData?.class_id ? <ClassDetailDayPicker classDate={classData.date} /> : null}
      </div>

      <div className="w-[350px] h-36 mt-10">
        {classData?.class_id ? (
          <ClassDetailBtn classId={classData.class_id} makeClassUserId={classData.user_id} />
        ) : null}
      </div>
    </div>
  );
};

export default ClassDetailRight;

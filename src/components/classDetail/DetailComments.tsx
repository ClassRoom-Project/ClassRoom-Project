import React from 'react';
import CreateComments from './CreateComments';
import ShowComments from './ShowComments';
import { ListDetailClassInfo } from '@/types/class';

const DetailComments = ({ classData }: { classData: ListDetailClassInfo | null }) => {
  return (
    <div className="w-full rounded-md bg-pale-purple px-4 lg:w-[80%] lg:min-w-[900px]">
      <div className="mt-9 flex w-full flex-col items-center justify-center ">
        <p className="mb-4 w-full text-lg lg:text-xl">후기 작성하기</p>
        <CreateComments classData={classData} />
        <ShowComments classId={classData?.class_id} />
      </div>
    </div>
  );
};

export default DetailComments;

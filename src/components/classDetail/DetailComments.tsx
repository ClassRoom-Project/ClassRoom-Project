import React from 'react';
import CreateComments from './CreateComments';
import ShowComments from './ShowComments';
import { ListDetailClassInfo } from '@/types/class';

const DetailComments = ({ classData }: { classData: ListDetailClassInfo | null }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center mt-9">
      <CreateComments classData={classData} />
      <ShowComments classId={classData?.class_id} />
    </div>
  );
};

export default DetailComments;

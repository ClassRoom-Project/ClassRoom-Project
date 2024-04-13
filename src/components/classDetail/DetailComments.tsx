import React from 'react';
import CreateComments from './CreateComments';
import ShowComments from './ShowComments';

//Todo: 댓글 부분 추가
const DetailComments = ({ classId }: { classId: string | undefined }) => {
  return (
    <div className="w-[1024px] mt-9">
      <CreateComments classId={classId} />
      <ShowComments classId={classId} />
    </div>
  );
};

export default DetailComments;

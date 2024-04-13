import React from 'react';
import CreateComments from './CreateComments';
import ShowComments from './ShowComments';

//Todo: 댓글 부분 추가
const DetailComments = () => {
  return (
    <div className="w-[1024px] mt-9">
      <CreateComments />
      <ShowComments />
    </div>
  );
};

export default DetailComments;

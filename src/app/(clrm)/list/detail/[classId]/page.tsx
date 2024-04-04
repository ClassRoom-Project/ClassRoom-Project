import React from 'react';
import { detailClassIDForParams, detailClassInfo } from '@/app/api/classdetail/detailClassInfo';

export const generateStaticParams = async () => {
  const classId = await detailClassIDForParams();

  const paths = classId.map((classItem) => ({
    params: { id: classItem.class_id }
  }));
  return paths;
};

const page = () => {
  return <div>page</div>;
};

export default page;

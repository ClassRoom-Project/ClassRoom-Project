import React from 'react';
import { detailClassIDForProps } from '@/app/api/classdetail/detailClassInfo';

export async function generateStaticParams() {
  const classId = await detailClassIDForProps();

  const paths = classId.map((classItem) => ({
    params: { id: classItem.class_id }
  }));
  return paths;
}

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <div></div>;
};

export default page;

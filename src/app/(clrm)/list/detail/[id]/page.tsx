import React from 'react';
import { detailClassIDForParams } from '@/app/api/classdetail/detailClassInfo';

export async function generateStaticParams() {
  const classId = await detailClassIDForParams();

  const paths = classId.map((classItem) => ({
    params: { id: classItem.class_id }
  }));
  return paths;
}

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <div>페이지 연결 성공</div>;
};

export default page;

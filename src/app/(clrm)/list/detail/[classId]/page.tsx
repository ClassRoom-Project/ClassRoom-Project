import React from 'react';
import { detailClassInfo } from '@/app/api/classdetail/detailClassInfo';
const page = async ({ params }: { params: { classId: string } }) => {
  const classId = decodeURIComponent(params.classId);

  const ClassAllInfo = await detailClassInfo(classId);

  if (!ClassAllInfo) {
    <div>클래스 정보를 불러오기에 실패했습니다</div>;
    console.log('클래스정보 ->', ClassAllInfo);
  }

  return <div>DetailPage</div>;
};

export default page;

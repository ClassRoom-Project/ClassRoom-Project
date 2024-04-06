import React from 'react';
import { detailClassInfo } from '@/app/api/classdetail/detailClassInfo';
import ClassDetailLeft from '@/components/classDetail/ClassDetailLeft';
import { getDetailUserInfo } from '@/app/api/classdetail/detailUserInfo';

//ssr
export async function loader({ params }: { params: { id: string } }) {
  const classData = await detailClassInfo(params.id);

  return {
    data: classData
  };
}
const page = async ({ params }: { params: { id: string } }) => {
  const classData = await detailClassInfo(params.id);
  const userData = await getDetailUserInfo();
  return (
    <div>
      <ClassDetailLeft classData={classData} userData={userData} />
    </div>
  );
};

export default page;

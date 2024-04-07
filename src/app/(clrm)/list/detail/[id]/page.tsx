import React from 'react';
import { detailClassInfo } from '@/app/api/classdetail/detailClassInfo';
import ClassDetailLeft from '@/components/classDetail/ClassDetailLeft';
import ClassDetailRight from '@/components/classDetail/ClassDetailRight';
import { getDetailUserInfo } from '@/app/api/classdetail/detailUserInfo';
import DetailComments from '@/components/classDetail/DetailComments';

//ssr
export async function loader({ params }: { params: { id: string } }) {
  const classData = await detailClassInfo(params.id);

  return {
    data: classData
  };
}
const page = async ({ params }: { params: { id: string } }) => {
  const classData = await detailClassInfo(params.id);
  const userData = await getDetailUserInfo(classData?.user_id);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center items-center">
        <ClassDetailLeft classData={classData} userData={userData} />
        <ClassDetailRight classData={classData} />
      </div>
      <DetailComments />
    </div>
  );
};

export default page;

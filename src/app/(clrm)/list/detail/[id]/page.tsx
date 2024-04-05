import React from 'react';
import { detailClassInfo } from '@/app/api/classdetail/detailClassInfo';
import MapImage from '@/components/classDetail/MapImage';
//ssr 구현
export async function loader({ params }: { params: { id: string } }) {
  const classData = await detailClassInfo(params.id);

  return {
    data: classData
  };
}
const page = async ({ params }: { params: { id: string } }) => {
  const classData = await detailClassInfo(params.id);
  return (
    <div>
      <MapImage classData={classData} />
    </div>
  );
};

export default page;

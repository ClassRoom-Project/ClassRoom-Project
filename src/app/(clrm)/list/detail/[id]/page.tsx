import { detailClassIdOnly, detailClassInfo } from '@/app/api/classdetail/detailClassInfo';
import { getDetailUserInfo } from '@/app/api/classdetail/detailUserInfo';
import ClassDetailContainer from '@/components/classDetail/ClassDetailContainer';
import ClassImageAndSummary from '@/components/classDetail/ClassImageAndSummary';
import DetailComments from '@/components/classDetail/DetailComments';
import MapComponent from '@/components/classDetail/MapComponent';
import Link from 'next/link';
import { GrLocation } from 'react-icons/gr';
import { IoIosArrowBack } from 'react-icons/io';

export const revalidate = 600;
export async function generateStaticParams() {
  //데이터 불러오는 로직
  const classId = await detailClassIdOnly();
  //params 내려주기
  const paths = classId.map((classItem) => ({
    params: { id: classItem.class_id }
  }));
  return paths;
}
const page = async ({ params }: { params: { id: string } }) => {
  const classData = await detailClassInfo(params.id);
  const userData = await getDetailUserInfo(classData?.user_id);

  return (
    <div className=" flex flex-col items-center">
      <div className="m-0 p-2 w-full  flex items-center bg-white text-text-dark-gray">
        <Link href={`/`} className="flex justify-center items-center">
          <IoIosArrowBack size={18} />
          뒤로가기
        </Link>
      </div>
      <ClassImageAndSummary classData={classData} userData={userData} />
      <div className="w-full p-6 px-40 flex flex-col justify-center items-center">
        <ClassDetailContainer classTitle={classData?.title} classDescription={classData?.description} />
        {classData?.detail_location && (
          <div className=" w-3/5 h-[380px">
            <MapComponent location={classData?.location} detailLocation={classData?.detail_location} />
          </div>
        )}
        <div className="w-full bg-pale-purple">
          <DetailComments classData={classData} />
        </div>
      </div>
    </div>
    // <div className="flex flex-col justify-center items-center">
    //   <div className="flex flex-col justify-center items-center p-5 xl:flex xl:flex-row">
    //     <ClassDetailRight classData={classData} />
    //   </div>
    //   <DetailComments classData={classData} />
    // </div>
  );
};
export default page;

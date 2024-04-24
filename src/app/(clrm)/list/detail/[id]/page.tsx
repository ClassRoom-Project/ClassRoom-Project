import { detailClassIdOnly, detailClassInfo } from '@/app/api/classdetail/detailClassInfo';
import { getDetailUserInfo } from '@/app/api/classdetail/detailUserInfo';
import ClassDetailContainer from '@/components/classDetail/ClassDetailContainer';
import ClassImageAndSummary from '@/components/classDetail/ClassImageCarousel';
import ClassSummary from '@/components/classDetail/ClassSummary';
import DetailComments from '@/components/classDetail/DetailComments';
import MapComponent from '@/components/classDetail/MapComponent';
import Image from 'next/image';
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
      <div className="m-0 flex w-full  items-center bg-white p-2 text-text-dark-gray">
        <Link href={`/`} className="flex items-center justify-center">
          <IoIosArrowBack size={18} />
          뒤로가기
        </Link>
      </div>
      <div className="flex w-full justify-between gap-12 bg-pale-purple p-6">
        <ClassImageAndSummary classData={classData} />
        <ClassSummary classData={classData} userData={userData} />
      </div>

      <div className="flex w-full  flex-col items-center justify-center p-6">
        <ClassDetailContainer classTitle={classData?.title} classDescription={classData?.description} />
        {classData?.detail_location && (
          <div className=" h-[380px w-3/5">
            <MapComponent location={classData?.location} detailLocation={classData?.detail_location} />
          </div>
        )}
        <div className="w-full rounded-md bg-pale-purple px-4">
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

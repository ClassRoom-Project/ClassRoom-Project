import { detailClassIdOnly, detailClassInfo } from '@/app/api/classdetail/detailClassInfo';
import { getDetailUserInfo } from '@/app/api/classdetail/detailUserInfo';
import ClassDetailLeft from '@/components/classDetail/ClassDetailLeft';
import ClassDetailRight from '@/components/classDetail/ClassDetailRight';
import ClassImageAndSummary from '@/components/classDetail/ClassImageAndSummary';
import DetailComments from '@/components/classDetail/DetailComments';
import Link from 'next/link';
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
    <div className="bg-gray-400 flex flex-col items-center">
      <div className="m-0 p-2 w-full  flex items-center bg-white text-text-dark-gray">
        <Link href={`/`} className="flex justify-center items-center">
          <IoIosArrowBack size={18} />
          뒤로가기
        </Link>
      </div>
      <ClassImageAndSummary classData={classData} userData={userData} />
      {/* <ClassDetailLeft classData={classData} userData={userData} /> */}
      <div className="w-full p-6">상세설명</div>
      <div className="border border-solid border-black w-3/5 h-[380px]">지도</div>
      <div>
        후기 컨테이너
        <div>후기 작성칸</div>
        <div>
          작성된 댓글들 컨테이너
          <div>댓글 하나하나</div>
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

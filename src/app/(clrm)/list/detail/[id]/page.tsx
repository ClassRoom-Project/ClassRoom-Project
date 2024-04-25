import { detailClassIdOnly, detailClassInfo } from '@/app/api/classdetail/detailClassInfo';
import { getDetailUserInfo } from '@/app/api/classdetail/detailUserInfo';
import ClassDetailLeft from '@/components/classDetail/ClassDetailLeft';
import ClassDetailRight from '@/components/classDetail/ClassDetailRight';
import DetailComments from '@/components/classDetail/DetailComments';

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
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center p-5 xl:flex xl:flex-row">
        <ClassDetailLeft classData={classData} userData={userData} />
        <ClassDetailRight classData={classData} />
      </div>
      <DetailComments classData={classData} />
    </div>
  );
};
export default page;

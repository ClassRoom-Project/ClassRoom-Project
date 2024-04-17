import { fetchReserveClassInfo } from '@/app/api/reserve/fetchReserveClassInfo';
import ClassInfo from '@/components/reserve/ClassInfo';
import ReservationScheduler from '@/components/reserve/ReservationScheduler';
import ReserveUserInfo from '@/components/reserve/ReserveUserInfo';
import SetQuantityAndPay from '@/components/reserve/SetQuantityAndPay';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';

export default async function ReservePage({ searchParams }: { searchParams: { classId: string } }) {
  const classId = searchParams.classId;
  const classInfo = await fetchReserveClassInfo(classId);

  return (
    <div className="min-h-100vh-header bg-light-purple min-w-100vw flex pb-6 flex-col">
      <Link
        href={`/list/detail/${classInfo.classId}`}
        className="bg-white px-2 py-2 flex items-center text-text-dark-gray"
      >
        <IoIosArrowBack size={18} />
        상세보기
      </Link>

      {classInfo ? (
        <div className="w-ful   box-border  bg-light-purple flex justify-center items-center flex-col text-gray-600 lg:flex-row ">
          <div className="flex box-border flex-col h-[800px] min-w-[400px] max-w-[400px] justify-between">
            <ClassInfo classInfo={classInfo} />
            <ReserveUserInfo />
          </div>
          <div className="lg:divider-horizontal" />
          <div className=" py-6 px-8 min-w-[400px] max-w-[400px] h-[800px] justify-between bg-white rounded-md  flex flex-col shadow">
            <ReservationScheduler classInfo={classInfo} />
            <SetQuantityAndPay classInfo={classInfo} />
          </div>
        </div>
      ) : (
        <p>클래스 정보를 불러오지 못했어요. 🥲</p>
      )}
    </div>
  );
}

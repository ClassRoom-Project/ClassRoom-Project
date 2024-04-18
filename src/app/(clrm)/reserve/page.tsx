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
    <div className=" min-w-100vw flex flex-col">
      <Link
        href={`/list/detail/${classInfo.classId}`}
        className="m-0  md:mx-10 lg:mx-16   bg-white px-2 py-2 flex items-center text-text-dark-gray "
      >
        <IoIosArrowBack size={18} />
        상세보기
      </Link>

      {classInfo ? (
        <div className="min-h-100vh-header-reserve m-0 box-border py-6 lg:min-w-fit md:mx-10 lg:mx-16 lg:px-8 bg-light-purple  flex justify-center items-center flex-col text-gray-600 lg:flex-row ">
          <div className="flex w-1/3 min-w-[350px] sm:w-2/3 lg:w-1/3 lg:min-w-[400px] box-border flex-col h-[780px]  justify-between">
            <ClassInfo classInfo={classInfo} />
            <ReserveUserInfo />
          </div>
          <div className="lg:divider-horizontal" />
          <div className=" md:mt-4 sm:mt-4 mt-4 lg:mt-0 py-4 sm:px-9 min-w-[350px] sm:w-2/3 lg:w-1/3 lg:min-w-[400px] w-1/3 h-[780px] justify-between bg-white rounded-md  flex flex-col shadow px-7">
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

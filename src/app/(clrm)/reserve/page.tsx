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
        className="mobile:m-0  md:mx-10 lg:mx-20 sm:mx-10  bg-white px-2 py-2 flex items-center text-text-dark-gray mx-20"
      >
        <IoIosArrowBack size={18} />
        상세보기
      </Link>

      {classInfo ? (
        <div className="mobile:m-0 box-border py-8 lg:min-w-fit md:mx-10 lg:mx-20 lg:px-8 bg-light-purple  sm:mx-10 flex justify-center items-center flex-col text-gray-600 lg:flex-row ">
          <div className="flex w-1/3 min-w-96 box-border flex-col h-[780px]  justify-between 2xl: ">
            <ClassInfo classInfo={classInfo} />
            <ReserveUserInfo />
          </div>
          <div className="lg:divider-horizontal" />
          <div className=" md:mt-4 sm:mt-4 mobile:mt-4 lg:mt-0 py-4 px-9 min-w-96 w-1/3 h-[780px] justify-between bg-white rounded-md  flex flex-col shadow">
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

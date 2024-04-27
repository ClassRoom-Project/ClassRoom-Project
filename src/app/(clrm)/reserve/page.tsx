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
    <div className="responsiveHeight h-screen">
      <div className="min-w-100vw flex flex-col">
        <div className="m-0 flex  items-center bg-white p-2 text-text-dark-gray">
          <Link href={`/list/detail/${classInfo.classId}`} className="flex items-center justify-center">
            <IoIosArrowBack size={18} />
            상세보기
          </Link>
        </div>

        {classInfo ? (
          <div className="m-0 mb-16 flex min-h-100vh-header-reserve flex-col items-center justify-center bg-light-purple pb-5 pt-6 text-gray-600 md:mb-0   md:px-4 md:py-6 lg:min-w-fit  lg:flex-row ">
            <div className="flex w-11/12 min-w-[350px] flex-col justify-between gap-4 sm:w-2/3 lg:h-[780px] lg:w-1/3 lg:min-w-[400px]   ">
              <ClassInfo classInfo={classInfo} />
              <ReserveUserInfo />
            </div>
            <div className="lg:divider-horizontal" />
            <div className="mt-4 flex h-[810px] w-11/12 min-w-[350px] flex-col justify-between rounded-md bg-white px-7 py-4 shadow sm:w-2/3 sm:px-9 lg:mt-0 lg:h-[780px] lg:w-1/3 lg:min-w-[400px]">
              <ReservationScheduler classInfo={classInfo} />
              <SetQuantityAndPay classInfo={classInfo} />
            </div>
          </div>
        ) : (
          <p>클래스 정보를 불러오지 못했어요. 🥲</p>
        )}
      </div>
    </div>
  );
}

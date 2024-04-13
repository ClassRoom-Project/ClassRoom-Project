import { newFetchReserveClassInfo } from '@/app/api/reserve/fetchReserveClassInfo';
import ClassInfo from '@/components/reserve/ClassInfo';
import CurrentReserveQuantity from '@/components/reserve/CurrentReserveQuantity';
import DateTimePicker from '@/components/reserve/DateTimePicker';
import PriceCalculator from '@/components/reserve/PriceCalculator';
import ReserveButton from '@/components/reserve/ReserveButton';
import ReserveUserInfo from '@/components/reserve/ReserveUserInfo';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';

export default async function ReservePage({ searchParams }: { searchParams: { classId: string } }) {
  const classId = searchParams.classId;
  const classInfo = await newFetchReserveClassInfo(classId);

  //TODO: 컴포넌트로 정리
  return (
    <div className="h-100vh-header bg-light-purple pt-1 pl-1">
      <Link
        href={`/list/detail/${classId}`}
        className="flex  items-center gap-0 btn btn-sm w-[130px] px-0 bg-white shadow text-gray-500 py-2 h-fit"
      >
        <IoIosArrowBack />
        클래스 상세보기
      </Link>
      <div className="w-full  box-border  bg-light-purple flex justify-center items-center flex-col text-gray-600">
        {classInfo ? (
          <div>
            <div className="flex flex-col w-full lg:flex-row ">
              <div className="flex box-border flex-col w-[400px] my-2">
                <ClassInfo classInfo={classInfo} />
                <ReserveUserInfo />
              </div>
              <div className="lg:divider-horizontal"></div>
              <div className=" py-6  px-12 w-[420px] bg-white rounded-md  justify-between flex flex-col items-center my-2 shadow">
                <p className="font-bold text-lg text-left w-full mb-1">수강일 선택하기</p>
                <DateTimePicker classDates={classInfo.dates} />
                <CurrentReserveQuantity classId={classInfo.classId} maxPeople={classInfo?.maxPeople} />
                <PriceCalculator price={classInfo.price} classId={classInfo.classId} maxPeople={classInfo.maxPeople} />
                <ReserveButton classId={classInfo.classId} maxPeople={classInfo.maxPeople} title={classInfo.title} />
              </div>
            </div>
          </div>
        ) : (
          <div>클래스 정보를 불러오지 못했어요. 🥲</div>
        )}
      </div>
    </div>
  );
}

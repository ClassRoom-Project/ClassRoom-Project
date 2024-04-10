import ClassInfo from '@/components/reserve/ClassInfo';
import DateTimePicker from '@/components/reserve/DateTimePicker';
import PriceCalculator from '@/components/reserve/PriceCalculator';
import ReserveButton from '@/components/reserve/ReserveButton';
import CurrentReserveQuantity from '@/components/reserve/CurrentReserveQuantity';
import { newFetchReserveClassInfo } from '@/app/api/reserve/fetchReserveClassInfo';

import Link from 'next/link';
import BackButton from '@/components/reserve/BackButton';
import { SlArrowLeft } from 'react-icons/sl';
import ReserveUserInfo from '@/components/reserve/ReserveUserInfo';

export default async function ReservePage({ searchParams }: { searchParams: { classId: string } }) {
  const classId = searchParams.classId;
  const classInfo = await newFetchReserveClassInfo(classId);

  return (
    <>
      <Link href={`/list/detail/${classId}`} className="flex  items-center text-lg gap-1">
        <SlArrowLeft />
        클래스 상세보기
      </Link>
      <div className="w-full box-border  bg-violet-100 flex justify-center items-center flex-col text-gray-600">
        {classInfo ? (
          <div className="flex h-full gap-10 justify-between bg-violet-200">
            {/* ------------------------------- 왼쪽 박스 --------------------------- */}
            <div className="flex box-border flex-col w-[400px] bg-gray-200 my-4">
              <ClassInfo classInfo={classInfo} />
              <ReserveUserInfo />
            </div>
            {/* --------------------------------- 오른쪽 박스 ---------------------------------------- */}
            <div className=" py-6  px-12 w-[400px] pb-12 bg-white rounded-md  flex flex-col items-center my-4">
              <p className="font-bold text-lg text-left w-full mb-2">수강요일 & 시간 선택하기</p>
              <DateTimePicker classDates={classInfo.dates} />
              <CurrentReserveQuantity classId={classInfo.classId} maxPeople={classInfo?.maxPeople} />
              <PriceCalculator price={classInfo.price} classId={classInfo.classId} maxPeople={classInfo.maxPeople} />
              <ReserveButton classId={classInfo.classId} maxPeople={classInfo.maxPeople} />
            </div>
          </div>
        ) : (
          <div>클래스 정보를 불러오지 못했어요. 🥲</div>
        )}
      </div>
    </>
  );
}

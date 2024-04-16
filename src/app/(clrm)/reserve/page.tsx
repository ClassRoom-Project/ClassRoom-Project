import { fetchReserveClassInfo } from '@/app/api/reserve/fetchReserveClassInfo';
import ClassInfo from '@/components/reserve/ClassInfo';
import CurrentReserveQuantity from '@/components/reserve/CurrentReserveQuantity';
import DateTimePicker from '@/components/reserve/DateTimePicker';
import PriceCalculator from '@/components/reserve/PriceCalculator';
import ReserveButton from '@/components/reserve/ReserveButton';
import ReserveContainer from '@/components/reserve/ClassAndUserInfo';
import ReserveUserInfo from '@/components/reserve/ReserveUserInfo';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';

export default async function ReservePage({ searchParams }: { searchParams: { classId: string } }) {
  const classId = searchParams.classId;
  const classInfo = await fetchReserveClassInfo(classId);

  return (
    <div className="min-h-100vh-header bg-light-purple flex py-6">
      {classInfo ? (
        <div className="w-full  box-border  bg-light-purple flex justify-center items-center flex-col text-gray-600 lg:flex-row ">
          <div className="flex box-border flex-col w-[400px]">
            <ClassInfo classInfo={classInfo} />
            <ReserveUserInfo />
          </div>
          <div className="lg:divider-horizontal"></div>
          <div className=" py-6  px-12 w-[400px] h-[804px] bg-white rounded-md  justify-between flex flex-col shadow">
            <p className="font-bold text-lg text-left w-full mb-1">수강일 선택하기</p>
            <DateTimePicker classDates={classInfo.dates} />
            <CurrentReserveQuantity classId={classInfo.classId} maxPeople={classInfo?.maxPeople} />
            <PriceCalculator price={classInfo.price} classId={classInfo.classId} maxPeople={classInfo.maxPeople} />
            <ReserveButton classId={classInfo.classId} maxPeople={classInfo.maxPeople} title={classInfo.title} />
          </div>
        </div>
      ) : (
        <p>클래스 정보를 불러오지 못했어요. 🥲</p>
      )}
    </div>
  );
}

import ClassInfo from '@/components/reserve/ClassInfo';
import DateTimePicker from '@/components/reserve/DateTimePicker';
import PriceCalculator from '@/components/reserve/PriceCalculator';
import ReserveButton from '@/components/reserve/ReserveButton';
import CurrentReserveQuantity from '@/components/reserve/CurrentReserveQuantity';
import { newFetchReserveClassInfo } from '@/app/api/reserve/fetchReserveClassInfo';
import ReserveUserInfo from '@/components/reserve/reserveUserInfo';

export default async function ReservePage({ searchParams }: { searchParams: { classId: string } }) {
  const classId = searchParams.classId;
  const classInfo = await newFetchReserveClassInfo(classId);

  return (
    <>
      <h1 className="text-xl">클래스 상세보기</h1>
      <div className="w-full min-h-screen  bg-violet-100 flex justify-center items-center flex-col text-gray-600">
        {classInfo ? (
          <div className="flex h-full gap-10 justify-between bg-violet-200">
            {/* ------------------------------- 왼쪽 박스 --------------------------- */}
            <div className="flex flex-col w-[500px] bg-gray-200">
              <ClassInfo classInfo={classInfo} />
              <ReserveUserInfo />
            </div>
            {/* --------------------------------- 오른쪽 박스 ---------------------------------------- */}
            <div className=" py-6 px-12 w-[480px] pb-12 bg-white rounded-md  border border-black border-solid flex flex-col items-center">
              <p className="font-bold text-lg text-left w-full mb-6">수강요일 & 시간 선택하기</p>
              <DateTimePicker classDates={classInfo.dates} />
              <CurrentReserveQuantity classId={classInfo.classId} maxPeople={classInfo?.maxPeople} />
              <PriceCalculator price={classInfo.price} classId={classInfo.classId} maxPeople={classInfo.maxPeople} />
              <ReserveButton classId={classInfo.classId} maxPeople={classInfo.maxPeople} />
              {/* <button >결제하기</button> */}
            </div>
          </div>
        ) : (
          <div>클래스 정보를 불러오지 못했어요. 🥲</div>
        )}
      </div>
    </>
  );
}

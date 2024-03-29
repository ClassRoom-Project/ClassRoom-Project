import { fetchClassInfoToReserve } from '@/api/supabase/fetchClassInfo';
import ClassInfo from '@/components/reserve/ClassInfo';
import DateTimePicker from '@/components/reserve/DateTimePicker';
import PriceCalculator from '@/components/reserve/PriceCalculator';
import ReserveButton from '@/components/reserve/ReserveButton';

export default async function ReservePage({ searchParams }: { searchParams: { cid: string } }) {
  const classId = searchParams.cid;
  const classInfo = await fetchClassInfoToReserve({ classId });

  // 필요한거 rid(자동생성), cid, reserve_price, reserve_date, reserve_time, reserve_image?
  return (
    <div className="w-[1600px] h-[800px]">
      <h1 className="text-xl">예약하기</h1>
      {classInfo && (
        <div className="flex w-full h-full bg-gray-200 p-6">
          <DateTimePicker />
          <div className="flex flex-col justify-between items-center w-full p-6">
            <ClassInfo classInfo={classInfo} />
            <PriceCalculator price={classInfo.price} />
            <ReserveButton />
          </div>
        </div>
      )}
    </div>
  );
}

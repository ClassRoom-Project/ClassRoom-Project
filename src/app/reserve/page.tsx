import ClassInfo from '@/components/reserve/ClassInfo';
import DateTimePicker from '@/components/reserve/DateTimePicker';
import QuantitySelector from '@/components/reserve/QuantitySelector';
import ReserveButton from '@/components/reserve/ReserveButton';
import { useSearchParams } from 'next/navigation';

export default function ReservePage() {
  // const searchParams = useSearchParams();
  // const classId = searchParams.get('cid');
  // console.log(searchParams.get('cid'));
  // a1b2c3d4-e5f6-4aeb-bcf5-6fa40fc0b0e1

  return (
    <div className="w-[1600px] h-[800px]">
      <h1 className="text-xl">예약하기</h1>
      <div className="flex w-full h-full bg-gray-200 p-6">
        <DateTimePicker />
        <div className="flex flex-col justify-between items-center w-full p-6">
          <ClassInfo classId={'a1b2c3d4-e5f6-4aeb-bcf5-6fa40fc0b0e1'} />
          <QuantitySelector />
          <ReserveButton />
        </div>
      </div>
    </div>
  );
}

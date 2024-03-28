import ClassInfo from '@/components/reserve/ClassInfo';
import DateTimePicker from '@/components/reserve/DateTimePicker';
import QuantitySelector from '@/components/reserve/QuantitySelector';
import ReserveButton from '@/components/reserve/ReserveButton';
import Image from 'next/image';

export default function ReservePage() {
  return (
    <div className="w-[1600px] h-[800px]">
      <h1 className="text-xl">예약하기</h1>
      <div className="flex w-full h-full bg-gray-200 p-6">
        <DateTimePicker />
        <div className="flex flex-col justify-between items-center w-full p-6">
          <ClassInfo />
          <QuantitySelector />
          <ReserveButton />
        </div>
      </div>
    </div>
  );
}

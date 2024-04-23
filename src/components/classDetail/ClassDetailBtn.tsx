'use client';

import { checkIsReserved } from '@/app/api/reserve/checkIsReserved';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useRouter } from 'next/navigation';
import AskButton from '../chatRooms/AskButton';
import { format } from 'date-fns';
import { alreadyReserved, closedClass } from '../common/Toastify';

//TODO - href chat ID, 받아서 입력할것
const ClassDetailBtn = ({
  classId,
  makeClassUserId,
  lastClassDay
}: {
  classId: string;
  makeClassUserId: string;
  lastClassDay: string;
}) => {
  const router = useRouter();
  const { loginUserId } = useLoginStore();

  const handleApplyClick = async () => {
    if (!loginUserId) {
      router.push(`/reserve?classId=${classId}`);
    } else {
      // 마지막 예약 가능 날짜가 현재보다 이전일 때 마감 toast
      if (lastClassDay < format(new Date(), 'yyyy-MM-dd')) {
        closedClass();
        return;
      }

      const isReserved = await checkIsReserved({ userId: loginUserId, classId });
      console.log(isReserved);

      if (isReserved) {
        alreadyReserved();
        return;
      } else router.push(`/reserve?classId=${classId}`);
    }
  };

  return (
    <div className="w-full gap-3 flex justify-center items-center">
      <AskButton
        classId={classId}
        makeClassUserId={makeClassUserId}
        buttonStyle="transition-all flex justify-center items-center rounded-md w-1/2 border-button-default-color border-solid border-[1px] h-12 hover:bg-disable-color"
      />
      <button
        onClick={handleApplyClick}
        className=" transition-all flex justify-center items-center rounded-md w-1/2 h-12 bg-button-default-color text-white  hover:bg-button-hover-color"
      >
        신청하기
      </button>
    </div>
  );
};

export default ClassDetailBtn;

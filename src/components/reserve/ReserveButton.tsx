'use client';

import { countReservationsByTimeId } from '@/app/api/reserve/countReservationsByTimeId';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useReserveStore } from '@/store/reserveClassStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { quantityWarning } from '../common/Toastify';
import { nanoid } from 'nanoid';

const ReserveButton = ({ classId, maxPeople }: { classId: string; maxPeople: number }) => {
  const router = useRouter();
  const { loginUserId } = useLoginStore();
  const { setReserveInfo, reserveInfo } = useReserveStore();

  console.log(loginUserId);

  useEffect(() => {
    setReserveInfo({ classId: classId, userId: loginUserId });
  }, [classId, setReserveInfo, loginUserId]);

  const handleReserveButtonClick = async () => {
    if (reserveInfo.reserveQuantity === 0) {
      quantityWarning();
      return;
    }

    // 예약 버튼을 눌렀을 때 count만 fetch해서 한번 더 체크
    const currentReservedQuantity = await countReservationsByTimeId(reserveInfo.timeId);

    if (currentReservedQuantity) {
      const currentRemainingQuantity = maxPeople - currentReservedQuantity;
      // 현재 남은 자리가 사용자가 선택한 인원수보다 적으면
      if (currentRemainingQuantity < reserveInfo.reserveQuantity) {
        alert('정원 초과로 인해 예약할 수 없습니다. ');
        router.refresh();
        return;
      }
    }

    router.replace(
      `/payment?orderId=${crypto.randomUUID()}&price=${reserveInfo.reservePrice}&classId=${reserveInfo.classId}`
    );
  };

  return (
    <>
      <ToastContainer />
      <button className="btn bg-point-purple text-white tracking-wide w-full" onClick={handleReserveButtonClick}>
        결제하자
      </button>
    </>
  );
};

export default ReserveButton;

'use client';

import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useReserveStore } from '@/store/reserveClassStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { quantityWarning } from '../common/Toastify';
import { sumReserveQuantityByTimeId } from '@/app/api/reserve/sumReserveQuantityByTimeId';

type ReserveButtonParams = {
  classId: string;
  title: string;
  maxPeople: number;
};

const ReserveButton = ({ classId, title, maxPeople }: ReserveButtonParams) => {
  const router = useRouter();
  const { loginUserId } = useLoginStore();
  const { setReserveInfo, reserveInfo } = useReserveStore();

  useEffect(() => {
    setReserveInfo({ classId, userId: loginUserId });
  }, [classId, setReserveInfo, loginUserId]);

  const handleReserveButtonClick = async () => {
    if (!loginUserId) {
      if (window.confirm('로그인이 필요합니다. 로그인하시겠습니까?')) {
        router.push('/hello');
        return;
      } else return;
    }

    if (reserveInfo.reserveQuantity === 0) {
      quantityWarning();
      return;
    }

    // 예약 버튼을 눌렀을 때 count만 fetch해서 한번 더 체크
    const currentReservedQuantity = await sumReserveQuantityByTimeId(reserveInfo.timeId);
    if (currentReservedQuantity) {
      const currentRemainingQuantity = maxPeople - currentReservedQuantity;
      if (currentRemainingQuantity < reserveInfo.reserveQuantity) {
        alert('정원 초과로 인해 예약할 수 없습니다. ');
        router.refresh();
        return;
      }
    }

    router.replace(
      `/payment?orderId=${crypto.randomUUID()}&price=${reserveInfo.reservePrice}&classId=${
        reserveInfo.classId
      }&title=${title}&customerKey=${reserveInfo.userId}`
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

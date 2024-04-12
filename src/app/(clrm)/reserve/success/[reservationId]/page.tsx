'use client';

import { invalidReserve } from '@/components/common/Toastify';
import NavigationButtons from '@/components/reserve/reservationComplete/NavigationButtons';
import { useFetchReservationDetail } from '@/hooks/useReserve/useFetchReservationDetail';
import { ReserveInfo } from '@/types/reserve';
import { convertTimeTo12HourClock } from '@/utils/convertTimeTo12HourClock';
import { useState } from 'react';
import { FiCheckCircle, FiWatch } from 'react-icons/fi';
import { LuClipboardEdit, LuClock } from 'react-icons/lu';
import { useSearchParams } from 'next/navigation';
import { FiCalendar, FiUserPlus } from 'react-icons/fi';
import { GrLocation } from 'react-icons/gr';
import { PiCurrencyKrw } from 'react-icons/pi';

type ReserveInfoLabels = {
  icon: React.ReactNode;
  title: string;
  description: string;
}[];

const ReservationCompletePage = ({ params }: { params: { reservationId: string } }) => {
  const reservationid = params.reservationId;
  // const [reservationRequest, setReservationRequest] = useState<ReserveInfo>();
  // const [isInvalidRequest, setIsInvalidRequest] = useState(false);

  // 라우트 핸들러에서 보내준  id로 예약 정보 불러오기
  const { reservationDetails, isError, isLoading } = useFetchReservationDetail(reservationid);

  if (isError) {
    console.log('에러낫어');
    console.log(isError);
    invalidReserve();
    return;
  }

  // #region
  let reserveInfoLabels: ReserveInfoLabels = [];
  if (reservationDetails) {
    const { class: classInfo, time: dateInfo, reserveQuantity, reservePrice } = reservationDetails;
    reserveInfoLabels = [
      {
        icon: <LuClipboardEdit size={20} color="#8074FF" />,
        title: '클래스명',
        description: `${classInfo.title}`
      },
      {
        icon: <FiCalendar size={20} color="#8074FF" />,
        title: '이용 일자',
        description: `${dateInfo.date.day}`
      },
      {
        icon: <FiWatch size={20} color="#8074FF" />,
        title: '이용 시간',
        description: `${reservationDetails && convertTimeTo12HourClock(dateInfo.times)}`
      },
      {
        icon: <LuClock size={20} color="#8074FF" />,
        title: '소요 시간',
        description: `${classInfo.totalTime}시간`
      },
      {
        icon: <GrLocation size={20} color="#8074FF" />,
        title: '위치',
        description: `${classInfo.location}`
      },
      {
        icon: <FiUserPlus size={20} color="#8074FF" />,
        title: '이용 인원',
        description: `${reserveQuantity}명`
      },
      {
        icon: <PiCurrencyKrw size={20} color="#8074FF" />,
        title: '결제하신 금액',
        description: `${reservePrice.toLocaleString()}원`
      }
    ];
  }
  // #endregion

  return (
    <div className="w-full h-100vh-header  box-border  bg-light-purple flex justify-center items-center flex-col text-gray-700">
      <div className="w-5/12 min-w-[600px]  justify-center min-h-[600px] bg-white shadow rounded-md items-center flex flex-col px-12 pt-12 pb-8">
        {!isLoading ? (
          <>
            <FiCheckCircle color="#38c557" className="mb-6" size={70} />
            <h1 className="text-2xl font-bold  text-center">클래스 예약이 정상적으로 처리되었습니다.</h1>
            <div className="divider mt-4 mb-6"></div>
            <div className="flex items-center w-full justify-center">
              <div className="flex flex-col gap-4 font-bold ml-16">
                {reserveInfoLabels.map(({ icon, title, description }) => (
                  <div key={title} className="flex gap-2 w-full">
                    <div className="flex flex-row gap-2 justify-center items-center">
                      <p className=" text-right">{icon}</p>
                      <p className="w-28">{title}</p>
                    </div>
                    <p className="text-left w-[250px] text-gray-600 font-normal">{description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="divider mb-4 mt-6"></div>
            <NavigationButtons />
          </>
        ) : isError ? (
          <div className="flex flex-col justify-center items-center">
            <p>예약을 완료하는 도중 오류가 발생했습니다. </p>
          </div>
        ) : (
          <div className="flex justify-center flex-col items-center gap-4">
            <span className="loading loading-spinner loading-lg bg-gray-400"></span>
            <p>잠시만 기다려주세요..</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationCompletePage;

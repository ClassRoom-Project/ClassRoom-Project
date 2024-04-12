'use client';

import { invalidReserve } from '@/components/common/Toastify';
import NavigationButtons from '@/components/reserve/reservationComplete/NavigationButtons';
import { useFetchReservationDetail } from '@/hooks/useReserve/useFetchReservationDetail';
import { ReservationDetailsType } from '@/types/reserve';
import { convertTimeTo12HourClock } from '@/utils/convertTimeTo12HourClock';
import { FiCalendar, FiCheckCircle, FiUserPlus, FiWatch } from 'react-icons/fi';
import { GrLocation } from 'react-icons/gr';
import { LuClipboardEdit, LuClock } from 'react-icons/lu';
import { PiCurrencyKrw } from 'react-icons/pi';

type ReserveInfoLabels = {
  icon: React.ReactNode;
  title: string;
  description: string;
}[];

const ReservationCompletePage = ({ params }: { params: { reservationId: string } }) => {
  const reservationid = params.reservationId;
  const { reservationDetails, isError, isLoading } = useFetchReservationDetail(reservationid);

  if (isError) {
    console.log(isError);
    invalidReserve();
    return;
  }

  // #region
  let reserveInfoLabels: ReserveInfoLabels = [];
  if (reservationDetails) {
    const {
      class: classInfo,
      time: dateInfo,
      reserveQuantity,
      reservePrice
    } = reservationDetails as ReservationDetailsType;
    reserveInfoLabels = [
      // {
      //   icon: <LuClipboardEdit size={20} color="#8074FF" />,
      //   title: '클래스명',
      //   description: `${classInfo.title}`
      // },
      // {
      //   icon: <LuClipboardEdit size={20} color="#8074FF" />,
      //   title: '클래스 타입',
      //   description: `${classInfo.classType}`
      // },
      {
        icon: <FiUserPlus size={20} color="#8074FF" />,
        title: '신청 인원',
        description: `${reserveQuantity}명`
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
      // {
      //   icon: <LuClock size={20} color="#8074FF" />,
      //   title: '소요 시간',
      //   description: `${classInfo.totalTime}시간`
      // },

      {
        icon: <GrLocation size={20} color="#8074FF" />,
        title: '위치',
        description: `${classInfo.location}`
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
            <div className="divider m-4"></div>
            <div className="flex flex-col items-center w-full justify-center">
              <div className="flex flex-col bg-base-200  w-1/2 rounded-lg   py-4 items-center mb-5 gap-2">
                <p className="text-xl font-bold">{reservationDetails?.class.title}</p>
                <div className="flex gap-4">
                  <p>{reservationDetails?.class.classType} 클래스</p>
                  <div className="flex justify-center items-center gap-1">
                    <LuClock size={20} color="#8074FF" /> 총 {reservationDetails?.class.totalTime}시간
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 font-bold ml-36">
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
            <div className="divider mb-4 mt-10"></div>
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

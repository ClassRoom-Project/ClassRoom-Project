'use client';

import React, { useEffect, useState } from 'react';
import { invalidReserve } from '@/components/common/Toastify';
import NavigationButtons from '@/components/reserve/reservationComplete/NavigationButtons';
import { useFetchReservationDetail } from '@/hooks/useReserve/useFetchReservationDetail';
import { ReservationDetailsType } from '@/types/reserve';
import { convertTimeTo12HourClock } from '@/utils/convertTimeTo12HourClock';
import { FiCalendar, FiCheckCircle, FiUserPlus, FiWatch } from 'react-icons/fi';
import { GrLocation } from 'react-icons/gr';
import { LuClock } from 'react-icons/lu';
import { PiCurrencyKrw } from 'react-icons/pi';
import { RiErrorWarningLine } from 'react-icons/ri';
import { insertNotice } from '@/app/api/reserve/insertNotice';

type ReserveInfoLabels = {
  icon: React.ReactNode;
  title: string;
  description: string;
}[];

const ReservationCompletePage = ({ params }: { params: { reservationId: string } }) => {
  const reservationid = params.reservationId;
  const { reservationDetails, isError, isLoading } = useFetchReservationDetail(reservationid);
  const [dataSaved, setDataSaved] = useState(false);

  useEffect(() => {
    if (!isLoading && !isError && reservationDetails && !dataSaved) {
      insertNotice(reservationDetails.userId, reservationDetails.classId, reservationDetails.class.title)
        .then((noticeData) => {
          setDataSaved(true);
        })
        .catch((error) => {
          console.error('Failed to save notification:', error);
        });
    }
  }, [isLoading, isError, reservationDetails, dataSaved]);

  if (isError) {
    invalidReserve();
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
      {
        icon: <FiUserPlus size={20} color="#8074FF" />,
        title: '신청 인원',
        description: `${reserveQuantity}명`
      },
      {
        icon: <FiCalendar size={20} color="#8074FF" />,
        title: '수강 일자',
        description: `${dateInfo.date.day}`
      },
      {
        icon: <FiWatch size={20} color="#8074FF" />,
        title: '수강 시간',
        description: `${reservationDetails && convertTimeTo12HourClock(dateInfo.times)}`
      },
      {
        icon: <LuClock size={20} color="#8074FF" />,
        title: '소요 시간',
        description: `총 ${classInfo.totalTime}시간`
      },
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
    <div className="responsiveHeight min-w-100vw m-0 lg:bg-400 flex flex-col">
      {!isLoading && !isError ? (
        <>
          <div className="w-full responsiveHeight py-2 bg-light-purple flex justify-center items-center flex-col text-gray-700">
            <div className="w-11/12 px-6 pt-12 pb-8 sm:px-12 md:w-4/5 lg:w-1/2 md:min-w-[500px] lg:min-w-[600px] flex flex-col justify-center items-center bg-white shadow rounded-md">
              <FiCheckCircle color="#38c557" className="mb-4 sm:mb-6 " size={70} />
              <h1 className="font-bold text-center text-xl lg:text-2xl">클래스 예약이 정상적으로 처리되었습니다.</h1>
              <div className="divider mx-0 my-2 sm:my-4"></div>
              <div className="flex flex-col items-center w-full justify-center">
                <div className="py-4 mb-5 gap-2 flex flex-col bg-base-200 text-sm sm:w-4/5 md:w-4/5 lg:w-8/12 rounded-lg  items-center ">
                  <p className=" font-bold text-center mx-4  text-base ">{reservationDetails?.class.title}</p>
                  <div className="flex gap-4">
                    <p>{reservationDetails?.class.classType} </p>
                    <div className="flex justify-center items-center gap-1"></div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 font-bold max-w-10/12 w-2/3 sm:w-8/12 md:w-2/3 truncate lg:w-[45%] lg:min-w-[290px] 2xl:max-w-[500px]">
                  {reserveInfoLabels.map(({ icon, title, description }) => (
                    <div key={title} className="flex gap-2 w-full">
                      <div className="flex flex-row gap-2 justify-center items-center">
                        <p className="text-right">{icon}</p>
                        <p className="hidden sm:flex flex-shrink-0 mr-2">{title}</p>
                      </div>
                      <p className={`text-left text-gray-600 font-normal text-sm sm:font-normal md:text-base truncate`}>
                        {description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="divider mt-4 mb-2"></div>
              <NavigationButtons />
            </div>
          </div>
        </>
      ) : isError ? (
        <div className="flex flex-col justify-center  items-center gap-4 responsiveHeight bg-light-purple">
          <RiErrorWarningLine size={100} color="#6C5FF7" />
          <p className="font-bold text-lg mt-5">예약을 완료하는 도중 오류가 발생했습니다. </p>
        </div>
      ) : (
        <div className="flex flex-col justify-center  items-center gap-4 responsiveHeight bg-light-purple">
          <span className="loading loading-spinner loading-lg bg-point-purple"></span>
          <p>잠시만 기다려주세요..</p>
        </div>
      )}
    </div>
  );
};

export default ReservationCompletePage;

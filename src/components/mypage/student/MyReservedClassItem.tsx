import { cancelReservation } from '@/app/api/mypage/fetchMyClasses';
import AskButton from '@/components/chatRooms/AskButton';
import { defaultWarning, successCancelReservation } from '@/components/common/Toastify';
import { ClassItem } from '@/types/register';
import { convertTimeTo12HourClock } from '@/utils/convertTimeTo12HourClock';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { FaRegCalendarCheck, FaRegClock } from 'react-icons/fa';
import { GoPeople } from 'react-icons/go';
import { GrLocation } from 'react-icons/gr';

const MyReservedClassItem = ({ classItem }: { classItem: ClassItem }) => {
  const queryClient = useQueryClient();

  // 예약한 클래스 취소 useMutation
  const { mutate: cancelReservaionMutation } = useMutation({
    mutationFn: (commentId: string) => cancelReservation(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reserve']
      });
    }
  });

  // 예약 취소
  const handleCancelReservation = async (reserve_id: string) => {
    if (window.confirm('정말 취소하시겠습니까?')) {
      try {
        await cancelReservaionMutation(reserve_id);
        successCancelReservation();
        // alert('예약이 취소되었습니다.');
      } catch (error) {
        console.error('예약 취소 중 오류 발생:', error);
        defaultWarning();
        // alert('예약 취소 중 오류가 발생했습니다.');
      }
    }
  };

  // 가격 콤마(,) 넣기
  const formattedPrice = classItem.reserve_price.toLocaleString();

  // 이미지 대표사진
  const mainImage = classItem.image && classItem.image.length > 0 ? classItem.image[0] : '이미지 없음';

  return (
    <li className="border-b-2 flex flex-col align-center gap-4 my-4 py-4 w-full md:flex-row justify-center items-center">
      <div className="flex gap-4 bg-pale-purple w-full flex-col md:flex-row items-center">
        <div className="md:w-[300px] md:h-[200px] w-3/5">
          <Image
            src={mainImage}
            alt="클래스 대표 사진"
            width={300}
            height={200}
            className="w-full h-full p-4"
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className="flex flex-col p-4 gap-4 w-full h-full">
          <section className="flex flex-col md:items-start">
            <div className="flex  gap-4 items-center">
              <p className="font-bold md:text-xl text-base text-dark-purple-color pb-4">{classItem.title}</p>
            </div>
            <div className="md:flex gap-4 md:py-4 md:flex-row flex-col">
              <div className="flex gap-4 py-1">
                <div className="flex items-center p-2 gap-2 border border-point-purple rounded-3xl">
                  <FaRegCalendarCheck color="#6C5FF7" className="md:size-5 size-4" />
                  <p className="md:text-base text-xs">날짜 : {classItem.day}</p>
                </div>
                <div className="flex items-center p-2 gap-2 border border-point-purple rounded-3xl ">
                  <FaRegClock color="#6C5FF7" className="md:size-5 size-4" />
                  <p className="md:text-base text-xs">시간 : {convertTimeTo12HourClock(classItem.times)}</p>
                </div>
              </div>
              <div className="flex gap-4 py-1">
                <div className="inline-flex items-center p-2 gap-2 border border-point-purple rounded-3xl ">
                  <GoPeople color="#6C5FF7" className="md:size-5 size-4" />
                  <p className="md:text-base text-xs">예약 인원 : {classItem.reserve_quantity}명</p>
                </div>
                <div className="inline-flex items-center p-2 gap-2 border border-point-purple rounded-3xl ">
                  <BiMoneyWithdraw color="#6C5FF7" className="md:size-5 size-4" />
                  <p className="md:text-base text-xs">이용 금액 : {formattedPrice}원</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4 py-1">
              <div className="inline-flex items-center p-2 gap-2 border border-point-purple rounded-3xl">
                <GrLocation color="#6C5FF7" className="md:size-5 size-4" />
                {classItem.location ? (
                  <p className="md:text-base text-xs">
                    위치 : {classItem.location} {classItem.detail_location}
                  </p>
                ) : (
                  <p className="md:text-base text-xs">위치 정보가 없습니다.</p>
                )}
              </div>
            </div>
          </section>
          <section className="flex md:justify-end justify-center gap-4 md:gap-4 p-2 md:right-4 items-center w-full">
            <AskButton
              classId={classItem.class_id}
              makeClassUserId={classItem.user_id}
              buttonStyle="btn md:w-36 w-1/3 hover:bg-transparent text-xs md:text-sm hover:text-text-dark-gray"
            />
            <button
              className="btn bg-dark-purple-color text-white md:w-36 w-1/3 whitespace-nowrap  hover:bg-transparent text-xs md:text-sm hover:text-dark-purple-color"
              onClick={() => handleCancelReservation(classItem.reserve_id)}
            >
              예약 취소하기
            </button>
            <div className="btn bg-point-purple text-white md:w-36 w-1/3 hover:bg-transparent whitespace-nowrap text-xs md:text-sm hover:text-point-purple">
              <Link href={`list/detail/${classItem.class_id}`}>클래스 보러가기</Link>
            </div>
          </section>
        </div>
      </div>
    </li>
  );
};

export default MyReservedClassItem;

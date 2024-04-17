import { cancelReservation } from '@/app/api/mypage/fetchMyClasses';
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
    <li className="border-b-2 border-b-border-color max-w-screen-xl w-[1080px]">
      <div className="flex gap-4 bg-pale-purple my-4 p-4">
        <div className="w-[300px] h-[200px]">
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
          <section>
            <div className="flex  gap-4 items-center">
              <p className="font-bold text-xl text-dark-purple-color">{classItem.title}</p>
            </div>
            <div className="flex gap-4 py-4">
              <div className="flex items-center p-2 gap-2 border border-point-purple rounded-3xl">
                <FaRegCalendarCheck color="#6C5FF7" size="20" />
                <span>날짜 : {classItem.day}</span>
              </div>
              <div className="flex items-center p-2 gap-2 border border-point-purple rounded-3xl ">
                <FaRegClock color="#6C5FF7" size="20" />
                <span>시간 : {convertTimeTo12HourClock(classItem.times)}</span>
              </div>
              <div className="inline-flex items-center p-2 gap-2 border border-point-purple rounded-3xl ">
                <GoPeople color="#6C5FF7" size="20" />
                <span>예약 인원 : {classItem.reserve_quantity}명</span>
              </div>
              <div className="inline-flex items-center p-2 gap-2 border border-point-purple rounded-3xl ">
                <BiMoneyWithdraw color="#6C5FF7" size="20" />
                <span>이용 금액 : {formattedPrice}원</span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="inline-flex items-center p-2 gap-2 border border-point-purple rounded-3xl">
                <GrLocation color="#6C5FF7" size="20" />
                {classItem.location ? (
                  <p>
                    위치 : {classItem.location} {classItem.detail_location}
                  </p>
                ) : (
                  <p>위치 정보가 없습니다.</p>
                )}
              </div>
            </div>
          </section>
          <section className="flex justify-end gap-4 pt-4 right-4">
            {/* <AskButton classId={classItem.class_id} makeClassUserId={classItem.}/> */}
            <button className="btn w-36 hover:bg-transparent hover:text-text-dark-gray">문의하기</button>
            <button
              className="btn  bg-dark-purple-color text-white w-36 hover:bg-transparent hover:text-dark-purple-color"
              onClick={() => handleCancelReservation(classItem.reserve_id)}
            >
              예약 취소하기
            </button>
            <Link href={`list/detail/${classItem.class_id}`}>
              <div className="btn bg-point-purple text-white w-36 hover:bg-transparent hover:text-point-purple">
                클래스 보러가기
              </div>
            </Link>
          </section>
        </div>
      </div>
    </li>
  );
};

export default MyReservedClassItem;

'use client';

import { getClassSingleInfo } from '@/app/api/mypage/my-class-api';
import { useUserRoleStore } from '@/store/mypage/userRoleStore';
import { convertTimeTo12HourClock } from '@/utils/convertTimeTo12HourClock';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { FaRegCalendarCheck, FaRegClock } from 'react-icons/fa';
import { GoPeople } from 'react-icons/go';
import { IoIosArrowBack } from 'react-icons/io';
import { LuClipboardEdit } from 'react-icons/lu';
import MyClassStudentList from './MyClassStudentList';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const MyClassStudentPage = () => {
  const { isTeacher } = useUserRoleStore();
  const param = useSearchParams();
  const timeId = param.get('timeId');
  const router = useRouter();

  // 수강생 전환 시, 마이페이지로 이동
  if (isTeacher === false) {
    router.push('/studentMypage');
  }

  const { data: classSingleInfo, isPending } = useQuery({
    queryKey: ['singleClass', timeId],
    queryFn: () => getClassSingleInfo(timeId)
  });
  console.log('classSingleInfo', classSingleInfo);

  if (isPending) {
    return (
      <div className="flex h-auto flex-col items-center justify-center gap-4">
        <LoadingSpinner />
        <p>잠시만 기다려주세요..</p>
      </div>
    );
  }

  if (!classSingleInfo || classSingleInfo.length === 0) {
    return <div>클래스 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="m-4 mb-24 flex w-full max-w-[1280px] flex-col gap-4 p-4 md:mb-0">
      <div className="flex w-full items-center border-y-2">
        <button className="flex  items-center text-gray-500" onClick={() => router.back()}>
          <IoIosArrowBack size={20} />
        </button>
        <p className="p-4 text-xl font-bold text-text-dark-gray"> 예약한 수강생 리스트</p>
      </div>
      <div className="flex flex-col text-text-dark-gray">
        <div className="flex items-center gap-2 p-2 ">
          <LuClipboardEdit color="#6C5FF7" size={20} className="hidden md:block" />
          <p className="flex gap-4 text-lg font-semibold">{classSingleInfo?.[0].title}</p>
        </div>
        <div className="flex flex-col gap-1 lg:flex-row lg:gap-8">
          <div className="flex items-center gap-2 p-2">
            <FaRegCalendarCheck color="#6C5FF7" size="20" />
            <p className="flex gap-4 text-base md:text-lg">
              <span className="font-bold ">날짜</span> {classSingleInfo?.[0].day}
            </p>
          </div>
          <div className="flex items-center gap-2 p-2">
            <FaRegClock color="#6C5FF7" size="20" />
            <p className="flex gap-4">
              <span className="font-bold ">시간</span> {convertTimeTo12HourClock(classSingleInfo?.[0].times)}
            </p>
          </div>
          <div className="flex items-center gap-2 p-2">
            <GoPeople color="#6C5FF7" size="20" />
            <div className="flex flex-col mobile:flex-row mobile:gap-10">
              <p className="flex gap-4">
                <span className="font-bold ">최소 인원</span> {String(classSingleInfo?.[0].min_people)}명
              </p>
              <p className="flex gap-4">
                <span className="font-bold ">최대 인원</span> {String(classSingleInfo?.[0].quantity)}명
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2">
            <BiMoneyWithdraw color="#6C5FF7" size="20" />
            <p className="flex gap-4">
              <span className="font-bold ">1인 금액</span> {String(classSingleInfo?.[0].price.toLocaleString())}원
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 text-xs sm:hidden md:mt-0">*옆으로 넘겨주세요.</div>
      <Suspense>
        <MyClassStudentList />
      </Suspense>
    </div>
  );
};

export default MyClassStudentPage;

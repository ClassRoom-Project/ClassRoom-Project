'use client';

import { deleteMyClass, getMyRegisteredClass } from '@/app/api/mypage/my-class-api';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { convertTimeTo12HourClock } from '@/utils/convertTimeTo12HourClock';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { BiCategoryAlt } from 'react-icons/bi';
import { FaRegCalendarCheck, FaRegClock } from 'react-icons/fa';
import { GoPersonAdd } from 'react-icons/go';
import { GrLocation } from 'react-icons/gr';
import NoImage from '@/assets/images/no_img.jpg';
import Pagination from '@/components/common/Pagination';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import MoveToTopBtn from '@/components/listpage/MoveToTopBtn';

const MyClass = () => {
  const { loginUserId } = useLoginStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  // 페이지네이션
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // 한 페이지당 보여줄 포스트의 개수

  const { data: myClassInfo, isPending } = useQuery({
    queryKey: ['class', loginUserId],
    queryFn: () => getMyRegisteredClass(loginUserId),
    enabled: !!loginUserId
  });

  // 클래스 삭제하기 : mutation
  const { mutate: deleteClassMutation } = useMutation({
    mutationFn: (classId: string) => deleteMyClass(classId, loginUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['class']
      });
    }
  });

  // 클래스 삭제하기
  const handleOnClickDeleteMyClass = (classId: string) => {
    const confirm = window.confirm('클래스가 삭제됩니다. 정말 삭제하시겠습니까?');
    if (confirm) {
      deleteClassMutation(classId);
    }
    return;
  };

  // 클래스 예약한 수강생 보러가기
  const handleOnClickGoToReservedStudentList = (timeId: string) => {
    router.push(`/myClassStudentList?timeId=${timeId}`);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); // 페이지 이동 시 스크롤 위치 맨 위로 초기화
    setCurrentPage(page && parseInt(page) > 0 ? parseInt(page) : 1); // 현재 페이지 업데이트
  }, [page, currentPage]);

  if (isPending) {
    return (
      <div className="flex h-auto flex-col  items-center justify-center gap-4">
        <LoadingSpinner />
        <p>잠시만 기다려주세요..</p>
      </div>
    );
  }

  if (!myClassInfo || myClassInfo.length === 0) {
    return <div>현재 등록한 클래스가 없습니다.</div>;
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = myClassInfo?.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <ul className="mb-24 flex w-full flex-col items-center justify-center gap-4 md:mb-0 md:justify-items-center md:p-4 lg:w-full">
      <p className="flex items-start text-xl font-bold text-dark-purple-color md:hidden ">내가 등록한 클래스</p>
      {currentPosts?.map((classInfo, classIndex) => (
        <li
          key={classIndex}
          className="align-center flex w-full flex-col gap-4 md:my-4 md:flex-row md:py-4 lg:max-w-[1280px]"
        >
          {/* 클래스 기본 정보 부분 */}
          <div className="collapse collapse-arrow cursor-pointer justify-center">
            <input type="checkbox" />
            <div className="flex flex-col items-center gap-4  md:collapse-title sm:w-full lg:w-full lg:flex-row">
              <div className="relative h-60 w-2/3 lg:w-80">
                <Image
                  src={classInfo?.image ? classInfo?.image : NoImage}
                  alt="클래스 대표 사진"
                  fill
                  className="h-full w-full object-cover p-4"
                />
              </div>
              <div className="m-4 flex flex-col md:gap-4">
                <p className="py-4 text-base font-bold text-dark-purple-color sm:text-lg md:text-xl">
                  {classInfo?.title}
                </p>
                <div className="flex flex-col md:flex-grow md:flex-row md:gap-4">
                  <div className="flex md:gap-4">
                    <div className="flex items-center gap-2 p-2 md:inline-flex md:rounded-3xl md:border md:border-point-purple">
                      <p className="text-sm sm:text-base">난이도 : {classInfo?.difficulty}</p>
                    </div>
                    <div className="flex items-center gap-2 p-2 md:rounded-3xl md:border md:border-point-purple">
                      <p className="text-sm sm:text-base">{classInfo?.class_type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 md:rounded-3xl md:border md:border-point-purple">
                    <BiCategoryAlt color="#6C5FF7" size="20" />
                    <p className="text-sm sm:text-base">카테고리 : {classInfo?.category}</p>
                  </div>
                  <div className="flex items-center gap-2 p-2 md:rounded-3xl md:border md:border-point-purple">
                    <GoPersonAdd color="#6C5FF7" size="20" />
                    <p className="text-sm sm:text-base">수강 인원수 : {classInfo?.quantity}명</p>
                  </div>
                </div>
                <div className="flex md:gap-4">
                  <div className="inline-flex items-center gap-2 p-2 md:rounded-3xl md:border md:border-point-purple">
                    <GrLocation color="#6C5FF7" size="20" />
                    {classInfo?.location ? (
                      <p className="flex-grow text-sm sm:text-base">
                        위치 : {classInfo?.location} {classInfo?.detail_location}
                      </p>
                    ) : (
                      <p>등록된 위치 정보가 없습니다.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* 클래스 날짜 및 시간 정보 */}
            <div className="flex-col md:collapse-content md:flex">
              {/* 클래스 날짜 표시 */}
              {classInfo?.dates?.map((date, dateIndex) => (
                <div
                  key={dateIndex}
                  className={`flex items-center justify-center md:gap-20 ${
                    dateIndex !== 0 ? 'border-b-2' : 'border-y-2'
                  }`}
                >
                  <div className="flex items-center gap-2 p-2 ">
                    <FaRegCalendarCheck color="#6C5FF7" size="20" />
                    <p className="flex flex-row gap-2 whitespace-nowrap text-xs sm:text-sm md:text-base">
                      <span className="hidden md:block">날짜 :</span> {date?.day}
                    </p>
                  </div>
                  <div>
                    {/* 클래스 시간 표시 */}
                    {date?.times?.map((time, timeIndex) => (
                      <div key={timeIndex} className="flex justify-between p-2 md:gap-20">
                        <div className="flex items-center gap-2 p-2">
                          <FaRegClock color="#6C5FF7" size="20" />
                          <p className="flex flex-row gap-2 whitespace-nowrap text-xs sm:text-sm md:text-base">
                            <span className="hidden md:block">시간 :</span> {convertTimeTo12HourClock(time?.times)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleOnClickGoToReservedStudentList(time.time_id)}
                          className="btn w-2/5 whitespace-nowrap text-xs md:w-36 md:text-base"
                        >
                          수강생 보기
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="m-4 flex justify-center gap-4 md:justify-end">
              <button
                onClick={() => handleOnClickDeleteMyClass(classInfo.class_id)}
                className="btn w-36 bg-dark-purple-color text-white hover:bg-transparent hover:text-dark-purple-color"
              >
                클래스 삭제하기
              </button>
              <Link href={`list/detail/${classInfo.class_id}`}>
                <button className="btn w-36 bg-point-purple text-white hover:bg-transparent hover:text-point-purple">
                  클래스 보러가기
                </button>
              </Link>
            </div>
          </div>
        </li>
      ))}
      <MoveToTopBtn />
      <Pagination
        totalItems={myClassInfo.length}
        itemCountPerPage={postsPerPage}
        pageCount={5}
        currentPage={page && parseInt(page) > 0 ? parseInt(page) : 1}
        key={page}
      />
    </ul>
  );
};

export default MyClass;

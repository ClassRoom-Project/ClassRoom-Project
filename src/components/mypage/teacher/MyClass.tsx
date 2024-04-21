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
import ClassInfo from '@/components/reserve/ClassInfo';

const MyClass = () => {
  const { loginUserId } = useLoginStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  // 페이지네이션
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2; // 한 페이지당 보여줄 포스트의 개수

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
    window.scrollTo(0, 0); // 페이지 이동 시 스크롤 위치 맨 위로 초기화
    setCurrentPage(page && parseInt(page) > 0 ? parseInt(page) : 1); // 현재 페이지 업데이트
  }, [page]);

  if (isPending) {
    return <div> 로딩중 ... </div>;
  }

  if (!myClassInfo || myClassInfo.length === 0) {
    return <div>현재 등록한 클래스가 없습니다.</div>;
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = myClassInfo.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <ul className="flex flex-col align-center ">
      {currentPosts?.map((classInfo, classIndex) => (
        <li key={classIndex} className="flex flex-col align-center gap-4 my-4 w-[1080px] py-4">
          {/* 클래스 기본 정보 부분 */}
          <div className="collapse collapse-arrow">
            <input type="checkbox" />
            <div className="flex collapse-title">
              <div className="w-[300px] h-[200px] ">
                <Image
                  src={classInfo?.image ? classInfo?.image : NoImage}
                  alt="클래스 대표 사진"
                  width={300}
                  height={200}
                  className="w-full h-full p-4"
                  style={{ objectFit: 'contain' }}
                  unoptimized={true}
                />
              </div>
              <div className="flex flex-col gap-4 m-4">
                <p className="font-bold text-xl text-dark-purple-color">{classInfo?.title}</p>
                <div className="flex gap-4">
                  <div className="flex items-center p-2 gap-2 border border-point-purple rounded-3xl ">
                    <p>난이도 : {classInfo?.difficulty}</p>
                  </div>
                  <div className="flex items-center p-2 gap-2 border border-point-purple rounded-3xl ">
                    <p>{classInfo?.class_type}</p>
                  </div>

                  <div className="flex items-center p-2 gap-2 border border-point-purple rounded-3xl ">
                    <BiCategoryAlt color="#6C5FF7" size="20" />
                    <p>카테고리 : {classInfo?.category}</p>
                  </div>
                  <div className="flex items-center p-2 gap-2 border border-point-purple rounded-3xl ">
                    <GoPersonAdd color="#6C5FF7" size="20" />
                    <p>수강 인원수 : {classInfo?.quantity}명</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="inline-flex items-center p-2 gap-2 border border-point-purple rounded-3xl">
                    <GrLocation color="#6C5FF7" size="20" />
                    {classInfo?.location ? (
                      <p className="flex-grow">
                        위치 : {classInfo?.location} {classInfo?.detail_location}
                      </p>
                    ) : (
                      <p>등록된 위치 정보가 없습니다.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 m-4 justify-end">
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
            {/* 클래스 날짜 및 시간 정보 */}
            <div className="flex flex-col collapse-content">
              {/* 클래스 날짜 표시 */}
              {classInfo?.dates?.map((date, dateIndex) => (
                <div key={dateIndex} className="flex gap-20 border-y-2 justify-center">
                  <div className="flex items-center p-2 gap-2 ">
                    <FaRegCalendarCheck color="#6C5FF7" size="20" />
                    <div className="flex flex-row gap-2">날짜 : {date?.day}</div>
                  </div>
                  <div>
                    {/* 클래스 시간 표시 */}
                    {date?.times?.map((time, timeIndex) => (
                      <div key={timeIndex} className="flex gap-20 p-2">
                        <div className="flex items-center p-2 gap-2">
                          <FaRegClock color="#6C5FF7" size="20" />
                          <div className="flex flex-row gap-2">시간 : {convertTimeTo12HourClock(time?.times)}</div>
                        </div>
                        <button onClick={() => handleOnClickGoToReservedStudentList(time.time_id)} className="btn w-36">
                          수강생 보기
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </li>
      ))}
      <Pagination
        totalItems={myClassInfo.length}
        itemCountPerPage={postsPerPage}
        pageCount={5}
        currentPage={page && parseInt(page) > 0 ? parseInt(page) : 1}
      />
    </ul>
  );
};

export default MyClass;

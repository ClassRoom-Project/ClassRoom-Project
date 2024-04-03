import { userId } from '@/app/(clrm)/mypage/page';
import { getMyRegisteredClass } from '@/app/api/mypage/my-class-api';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaRegCalendarCheck, FaRegClock } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';

const MyClass = () => {
  // const pathname = usePathname;
  const router = useRouter();

  const { data: myClassInfo, isPending } = useQuery({
    queryKey: ['class', userId],
    queryFn: () => getMyRegisteredClass()
  });
  console.log('myClassInfo', myClassInfo);

  // 클래스 삭제하기
  const handleOnClickDeleteMyClass = () => {
    // const confirm = window.confirm("")
    alert('클래스를 삭제하는 버튼입니다.');
  };

  // 클래스 예약한 수강생 보러가기
  const handleOnClickGoToReservedStudentList = () => {
    router.push('/mypage/myClassStudentList');
  };

  if (isPending) {
    return <div> 로딩중 ... </div>;
  }

  if (!myClassInfo) {
    return <div> 클래스 정보가 없습니다.</div>;
  }
  return (
    <ul className="flex flex-col">
      {myClassInfo.map((classInfo, index) => (
        <li key={index} className="flex gap-4">
          <div className="w-[300px] h-[200px]">
            <Image
              src={classInfo.image[0]}
              alt="클래스 대표 사진"
              width={300}
              height={200}
              className="w-full h-full p-4"
              style={{ objectFit: 'contain' }}
              unoptimized={true}
            />
          </div>
          {/* 클래스 정보 부분 */}
          <div className="flex flex-col p-4">
            <div className="">
              <p className="font-bold text-xl text-text-color">{classInfo.title}</p>
              <div className="flex gap-4 py-4">
                <div className="flex items-center p-2 gap-2 border border-point-color rounded-3xl">
                  <FaRegCalendarCheck color="#5373FF" size="20" />
                  <span>
                    날짜 :{' '}
                    {classInfo.date.map((date, index) => (
                      <React.Fragment key={index}>
                        {/* 배열 내 값이 2개 이상일 경우, ' ' 둘 사이 공백주기*/}
                        {index > 0 && ' '}
                        {date}
                      </React.Fragment>
                    ))}
                  </span>
                </div>
                <div className="flex items-center p-2 gap-2 border border-point-color rounded-3xl ">
                  <FaRegClock color="#5373FF" size="20" />
                  <span>
                    시간 :{' '}
                    {classInfo.time.map((time, index) => (
                      <React.Fragment key={index}>
                        {index > 0 && ' '}
                        {time}
                      </React.Fragment>
                    ))}
                  </span>
                </div>
              </div>
              <div className="inline-flex items-center p-2 gap-2 border border-point-color rounded-3xl ">
                <GrLocation color="#5373FF" size="20" />
                <span>위치 : {classInfo.location}</span>
              </div>
            </div>
            <div className="flex gap-4 m-4">
              <button onClick={handleOnClickGoToReservedStudentList} className="btn w-36">
                수강생 보기
              </button>
              <button onClick={handleOnClickDeleteMyClass} className="btn w-36 bg-point-color text-white">
                클래스 삭제하기
              </button>
              <Link href={`list/detail/${classInfo.class_id}`}>
                <button className="btn w-36 bg-pale-color text-white">클래스 보러가기</button>
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MyClass;

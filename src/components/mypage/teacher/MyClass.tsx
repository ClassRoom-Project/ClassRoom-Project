'use client';

import { getMyRegisteredClass } from '@/app/api/mypage/my-class-api';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useMyClassInfoStore } from '@/store/mypage/classInfoStore';
import { MyRegisteredClassType } from '@/types/class';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaRegCalendarCheck, FaRegClock } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';
import { GoPersonAdd } from 'react-icons/go';

const MyClass = () => {
  const { loginUserId } = useLoginStore();
  const { myClassSingleInfo, setMyClassSingleInfo } = useMyClassInfoStore();

  const router = useRouter();

  const { data: myClassInfo, isPending } = useQuery({
    queryKey: ['class', loginUserId],
    queryFn: () => getMyRegisteredClass(loginUserId)
  });
  // console.log('myClassInfo', myClassInfo);

  // 클래스 삭제하기
  const handleOnClickDeleteMyClass = () => {
    // const confirm = window.confirm("클래스를 정말 삭제하시겠습니까?")
    alert('클래스를 삭제하는 버튼입니다.');
  };

  // 클래스 예약한 수강생 보러가기
  const handleOnClickGoToReservedStudentList = (timeId: string, classInfo: MyRegisteredClassType | null) => {
    // console.log('classInfo 여기선 값을 받아오고 있음', classInfo);
    if (classInfo !== null) {
      setMyClassSingleInfo(classInfo);
    }
    router.push(`/mypage/myClassStudentList?timeId=${timeId}`);
  };

  const filteredClassInfo = myClassInfo?.map((classInfo) => ({
    ...classInfo,
    dates: classInfo.dates.filter((date) => date.times.some((time) => time.time_id))
  }));
  console.log('filteredClassInfo', filteredClassInfo);

  if (isPending) {
    return <div> 로딩중 ... </div>;
  }

  if (!myClassInfo || myClassInfo.length === 0) {
    return <div>현재 등록한 클래스가 없습니다.</div>;
  }

  return (
    <ul className="flex flex-col align-center ">
      {myClassInfo?.map((classInfo, classIndex) => (
        <li key={classIndex} className="flex flex-col align-center gap-4  my-4 max-w-[1080px] py-4">
          {/* 클래스 기본 정보 부분 */}
          <div className="flex">
            <div className="w-[300px] h-[200px] ">
              <Image
                src={classInfo.image}
                alt="클래스 대표 사진"
                width={300}
                height={200}
                className="w-full h-full p-4"
                style={{ objectFit: 'contain' }}
                unoptimized={true}
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="font-bold text-xl text-dark-purple-color">{classInfo.title}</p>
              <div className="flex gap-4">
                <div className="inline-flex items-center p-2 gap-2 border border-point-purple rounded-3xl ">
                  <p>{classInfo.class_type}</p>
                </div>
                <div className="inline-flex items-center p-2 gap-2 border border-point-purple rounded-3xl ">
                  <GrLocation color="#6C5FF7" size="20" />
                  <p>위치 : {classInfo.location}</p>
                </div>

                <div className="inline-flex items-center p-2 gap-2 border border-point-purple rounded-3xl ">
                  <GoPersonAdd color="#6C5FF7" size="20" />
                  <p>수강 인원수 : {classInfo.quantity}명</p>
                </div>
              </div>
              <div className="flex gap-4 m-4">
                <button onClick={handleOnClickDeleteMyClass} className="btn w-36 bg-dark-purple-color text-white">
                  클래스 삭제하기
                </button>
                <Link href={`list/detail/${classInfo.class_id}`}>
                  <button className="btn w-36 bg-point-purple text-white">클래스 보러가기</button>
                </Link>
              </div>
            </div>
          </div>

          {/* 클래스 날짜 및 시간 정보 */}
          <div className="flex flex-col p-4 gap-4">
            {/* 클래스 날짜 표시 */}
            {classInfo.dates.map((date, dateIndex) => (
              <div key={dateIndex} className="flex gap-4">
                <div className="flex items-center p-2 gap-2 ">
                  <FaRegCalendarCheck color="#6C5FF7" size="20" />
                  <div className="flex flex-row gap-2">날짜 :{date.day}</div>
                </div>
                <div>
                  {/* 클래스 시간 표시 */}
                  {date.times.map((time, timeIndex) => (
                    <div key={timeIndex} className="flex gap-4">
                      <div className="flex items-center p-2 gap-2">
                        <FaRegClock color="#6C5FF7" size="20" />
                        <div className="flex flex-row gap-2">시간 :{time.times}</div>
                      </div>
                      <button
                        onClick={() => handleOnClickGoToReservedStudentList(time.time_id, classInfo)}
                        className="btn w-36"
                      >
                        수강생 보기
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MyClass;

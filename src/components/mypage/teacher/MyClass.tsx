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

const MyClass = () => {
  const { loginUserId } = useLoginStore();
  const { myClassSingleInfo, setMyClassSingleInfo } = useMyClassInfoStore();

  const router = useRouter();

  const { data: myClassInfo, isPending } = useQuery({
    queryKey: ['class', loginUserId],
    queryFn: () => getMyRegisteredClass(loginUserId)
  });

  // 중복되는 값 제외하기
  const days: string[] | undefined = myClassInfo?.map((item) => item.day);
  const times: string[] | undefined = myClassInfo?.map((item) => item.times);

  const uniqueDays = Array.from(new Set(days));
  const uniqueTimes = Array.from(new Set(times));

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

  if (isPending) {
    return <div> 로딩중 ... </div>;
  }

  if (!myClassInfo || myClassInfo.length === 0) {
    return <div>현재 등록한 클래스가 없습니다.</div>;
  }

  return (
    <ul className="flex flex-col ">
      {myClassInfo.map((classInfo, index) => (
        <li key={index} className="flex gap-4  my-4 w-[1080px] border-b-2 py-4">
          <div className="w-[300px] h-[200px] ">
            <Image
              src={classInfo.image[0]}
              alt="클래스 대표 사진"
              width={300}
              height={200}
              className="w-full h-full p-4"
              style={{ objectFit: 'contain' }}
            />
          </div>
          {/* 클래스 정보 부분 */}
          <div className="flex flex-col p-4">
            <div className="">
              <p className="font-bold text-xl text-dark-purple-color">{classInfo.title}</p>
              <div className="flex gap-4 py-4">
                <div className="flex items-center p-2 gap-2 border border-point-purple rounded-3xl">
                  <FaRegCalendarCheck color="#6C5FF7" size="20" />
                  <div className="flex flex-row gap-2">날짜 :{classInfo.day}</div>
                </div>
                <div className="flex items-center p-2 gap-2 border border-point-purple rounded-3xl ">
                  <FaRegClock color="#6C5FF7" size="20" />
                  <div className="flex flex-row gap-2">시간 :{classInfo.times}</div>
                </div>
              </div>
              <div className="inline-flex items-center p-2 gap-2 border border-point-purple rounded-3xl ">
                <GrLocation color="#6C5FF7" size="20" />
                <p>위치 : {classInfo.location}</p>
              </div>
            </div>
            <div className="flex gap-4 m-4">
              <button
                onClick={() => handleOnClickGoToReservedStudentList(classInfo.time_id, classInfo)}
                className="btn w-36"
              >
                수강생 보기
              </button>
              <button onClick={handleOnClickDeleteMyClass} className="btn w-36 bg-dark-purple-color text-white">
                클래스 삭제하기
              </button>
              <Link href={`list/detail/${classInfo.class_id}`}>
                <button className="btn w-36 bg-point-purple text-white">클래스 보러가기</button>
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MyClass;

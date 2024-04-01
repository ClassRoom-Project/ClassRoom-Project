import { getMyRegistedClass } from '@/app/api/mypage/my-class-api';
import { userId } from '@/app/mypage/page';
import { GoToClassPost } from '@/components/common/mypage/buttons';
import { ClassAllType } from '@/types/class';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

type MyRegistedClassType = ClassAllType[];

const MyClass = () => {
  // const pathname = usePathname;
  const router = useRouter();

  const { data: myClassInfo, isPending }: { data: MyRegistedClassType | undefined; isPending: boolean } = useQuery({
    queryKey: ['class', userId],
    queryFn: () => getMyRegistedClass()
  });
  if (isPending) {
    return <div> 로딩중 ... </div>;
  }

  if (!myClassInfo) {
    return <div> 유저 정보가 없습니다.</div>;
  }

  // 클래스 삭제하기
  const handleOnClickDeleteMyClass = () => {
    alert('클래스를 삭제합니다.');
  };

  // 클래스 예약한 수강생 보러가기
  const handleOnClickGoToReservedStudentList = () => {
    router.push('/mypage/myClassStudentList');
  };

  return (
    <ul className="flex flex-col">
      {myClassInfo.map((classInfo, index) => (
        <li key={index} className="flex gap-4">
          <div className="w-[300px] h-[200px]">
            <img
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
            <div>
              <p>클래스 : {classInfo.title}</p>
              <div className="flex gap-4">
                <span>날짜 : {classInfo.date}</span>
                <span>시간 : {classInfo.time}</span>
              </div>
              <p>
                위치 : {classInfo.location} &nbsp;
                {classInfo.detailLocation}
              </p>
            </div>
            <div className="flex gap-4 m-4">
              <button
                onClick={handleOnClickDeleteMyClass}
                className="border rounded-xl p-4 w-[150px]  bg-rose-500 text-white"
              >
                클래스 삭제하기
              </button>
              <button onClick={handleOnClickGoToReservedStudentList} className="border rounded-xl p-4 w-[150px]">
                수강생 보기
              </button>
              <button
                onClick={() => {
                  router.push(`list/detail/${classInfo.class_id}`);
                }}
                className="border rounded-xl p-4 w-[150px]"
              >
                클래스 보러가기
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MyClass;

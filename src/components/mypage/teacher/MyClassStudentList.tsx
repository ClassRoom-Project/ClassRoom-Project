import { getMyClassStudentInfo } from '@/app/api/mypage/my-class-api';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import ClassStudentItem from './MyClassStudentItem';
import { useMyClassInfoStore } from '@/store/mypage/classInfoStore';
import { FaRegClock, FaRegCalendarCheck } from 'react-icons/fa';
import { LuClipboardEdit } from 'react-icons/lu';

const MyClassStudentList = () => {
  const param = useSearchParams();
  const timeId = param.get('timeId');
  // 클래스 정보 한 번 더 보여주기?
  const { myClassSingleInfo } = useMyClassInfoStore();
  console.log('여긴 값 들어옴?', myClassSingleInfo);

  const { data: myClassStudentInfo, isPending } = useQuery({
    queryKey: ['reserve', timeId],
    queryFn: () => getMyClassStudentInfo(timeId)
  });
  // console.log('myClassStudentInfo', myClassStudentInfo);

  // 시간 초 빼기
  const formattedTime = myClassSingleInfo?.times.substring(0, 5);

  if (isPending) {
    return <div> 로딩중 ... </div>;
  }

  if (!myClassStudentInfo || myClassStudentInfo.length === 0) {
    return <div>현재 예약한 수강생이 없습니다.</div>;
  }

  return (
    <div className="m-4 p-4 flex flex-col gap-4">
      <p className="font-bold text-text-purple-color text-xl"> 예약한 수강생 리스트</p>
      <div className="flex flex-col text-text-dark-gray">
        <div className="inline-flex items-center p-2 gap-2 ">
          <LuClipboardEdit color="#6C5FF7" size="20" />
          <p className="flex gap-4">
            <span className="font-bold ">클래스</span> {myClassSingleInfo?.title}
          </p>
        </div>
        <div className="flex gap-8">
          <div className="flex items-center p-2 gap-2">
            <FaRegCalendarCheck color="#6C5FF7" size="20" />
            <p className="flex gap-4">
              <span className="font-bold ">날짜</span> {myClassSingleInfo?.day}
            </p>
          </div>
          <div className="flex items-center p-2 gap-2">
            <FaRegClock color="#6C5FF7" size="20" />
            <p className="flex gap-4">
              <span className="font-bold ">시간</span> {formattedTime}
            </p>
          </div>
        </div>
      </div>
      <ul className="flex flex-col gap-4">
        {myClassStudentInfo.map((student) => (
          <ClassStudentItem key={student.user_id} student={student} />
        ))}
      </ul>
    </div>
  );
};

export default MyClassStudentList;

import { getMyClassStudentInfo } from '@/app/api/mypage/my-class-api';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import ClassStudentItem from './MyClassStudentItem';
import { useMyClassInfoStore } from '@/store/mypage/classInfoStore';

const MyClassStudentList = () => {
  const param = useSearchParams();
  const timeId = param.get('timeId');
  const { myClassInfo } = useMyClassInfoStore();
  console.log('myClassInfo', myClassInfo);

  const { data: myClassStudentInfo, isPending } = useQuery({
    queryKey: ['reserve', timeId],
    queryFn: () => getMyClassStudentInfo(timeId)
  });
  // console.log('myClassStudentInfo', myClassStudentInfo);

  if (isPending) {
    return <div> 로딩중 ... </div>;
  }

  if (!myClassStudentInfo || myClassStudentInfo.length === 0) {
    return <div>현재 예약한 수강생이 없습니다.</div>;
  }
  return (
    <div>
      <p> 예약한 수강생 리스트</p>
      <ul className="flex flex-col gap-4">
        {myClassStudentInfo.map((student) => (
          <ClassStudentItem key={student.user_id} student={student} />
        ))}
      </ul>
    </div>
  );
};

export default MyClassStudentList;

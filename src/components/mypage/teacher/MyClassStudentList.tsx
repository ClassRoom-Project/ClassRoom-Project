import { getMyClassStudentInfo } from '@/app/api/mypage/my-class-api';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import ClassStudentItem from './MyClassStudentItem';
import { useMyClassInfoStore } from '@/store/mypage/classInfoStore';

const MyClassStudentList = () => {
  const param = useSearchParams();
  const timeId = param.get('timeId');
  // 클래스 정보 한 번 더 보여주기?
  // const { myClassSingleInfo } = useMyClassInfoStore();
  // console.log('classInfo', myClassSingleInfo);

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
    <div className="m-4 p-4">
      <p className="font-bold text-text-purple-color text-xl"> 예약한 수강생 리스트</p>
      <ul className="flex flex-col gap-4">
        {myClassStudentInfo.map((student) => (
          <ClassStudentItem key={student.user_id} student={student} />
        ))}
      </ul>
    </div>
  );
};

export default MyClassStudentList;

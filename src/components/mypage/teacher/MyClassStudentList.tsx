import { getMyClassStudentInfo } from '@/app/api/mypage/my-class-api';
import { useMyClassInfoStore } from '@/store/mypage/myClassInfoStore';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { FaRegCalendarCheck, FaRegClock } from 'react-icons/fa';
import { LuClipboardEdit } from 'react-icons/lu';

const MyClassStudentList = () => {
  const param = useSearchParams();
  const timeId = param.get('timeId');
  // 클래스 정보 한 번 더 보여주기?
  const { myClassSingleInfo } = useMyClassInfoStore();
  // console.log('여긴 값 들어옴?', myClassSingleInfo);

  const { data: myClassStudentInfo, isPending } = useQuery({
    queryKey: ['reserve', timeId],
    queryFn: () => getMyClassStudentInfo(timeId)
  });
  // console.log('myClassStudentInfo', myClassStudentInfo);

  // 시간 초 빼기
  // const formattedTime = myClassSingleInfo?.times.substring(0, 5);

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
            <p className="flex gap-4">{/* <span className="font-bold ">날짜</span> {myClassSingleInfo?.day} */}</p>
          </div>
          <div className="flex items-center p-2 gap-2">
            <FaRegClock color="#6C5FF7" size="20" />
            <p className="flex gap-4">{/* <span className="font-bold ">시간</span> {formattedTime} */}</p>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>닉네임</th>
              <th>이메일</th>
              <th>예약 인원</th>
              <th>예약 금액</th>
              <th>채팅 보내기</th>
            </tr>
          </thead>
          <tbody>
            {myClassStudentInfo.map((student) => (
              <tr key={student.user_id}>
                {/* 각 요소에 고유한 키를 제공해야 함 */}
                <th className="flex gap-4 items-center">
                  {student.nickname}
                  <Image
                    src={student.profile_image}
                    alt="프로필 이미지"
                    width={50}
                    height={50}
                    className="rounded-full"
                    unoptimized={true}
                  />
                </th>
                <td>{student.email}</td>
                <td>{student.reserve_quantity}명</td>
                <td>{student.reserve_price.toLocaleString()}원</td>
                <td>
                  <button className="btn">1:1 채팅</button>
                </td>{' '}
                {/* 버튼을 <td> 안에 넣어야 함 */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <ul className="flex flex-col gap-4">
       
      </ul> */}
    </div>
  );
};

export default MyClassStudentList;

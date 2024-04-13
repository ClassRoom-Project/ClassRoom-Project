import { getMyClassStudentInfo } from '@/app/api/mypage/my-class-api';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const MyClassStudentList = () => {
  const param = useSearchParams();
  const timeId = param.get('timeId');

  const { data: myClassStudentInfo, isPending } = useQuery({
    queryKey: ['reserve', timeId],
    queryFn: () => getMyClassStudentInfo(timeId)
  });
  if (isPending) {
    return <div> 로딩중 ... </div>;
  }

  if (!myClassStudentInfo || myClassStudentInfo.length === 0) {
    return <div>현재 예약한 수강생이 없습니다.</div>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="table">
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
              <td>{student.reserve_quantity.toLocaleString()}명</td>
              <td>{student.reserve_price.toLocaleString()}원</td>
              <td>
                <button className="btn">1:1 채팅</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyClassStudentList;

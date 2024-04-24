import { getMyClassStudentInfo } from '@/app/api/mypage/my-class-api';
import Pagination from '@/components/common/Pagination';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const MyClassStudentList = () => {
  const param = useSearchParams();
  const timeId = param.get('timeId');

  // 페이지네이션
  const page = param.get('page');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; // 한 페이지당 보여줄 포스트의 개수

  const { data: myClassStudentInfo, isPending } = useQuery({
    queryKey: ['reserve', timeId],
    queryFn: () => getMyClassStudentInfo(timeId)
  });

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 이동 시 스크롤 위치 맨 위로 초기화
    setCurrentPage(page && parseInt(page) > 0 ? parseInt(page) : 1); // 현재 페이지 업데이트
  }, [page]);

  if (isPending) {
    return <div> 로딩중 ... </div>;
  }

  if (!myClassStudentInfo || myClassStudentInfo.length === 0) {
    return <div>현재 예약한 수강생이 없습니다.</div>;
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = myClassStudentInfo.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="overflow-x-auto">
      <table className="table ">
        <thead>
          <tr className=" bg-light-purple text-point-purple">
            <th>닉네임</th>
            <th>이메일</th>
            <th>예약 인원</th>
            <th>예약 금액</th>
            {/* <th>채팅 보내기</th> */}
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((student) => (
            <tr key={student.user_id}>
              <th className="flex gap-4 items-center whitespace-nowrap">
                <div className="w-12 h-12">
                  <Image
                    src={student.profile_image}
                    alt="프로필 이미지"
                    width={50}
                    height={50}
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                {student.nickname}
              </th>
              <td>{student.email}</td>
              <td>{student.reserve_quantity.toLocaleString()}명</td>
              <td className="whitespace-nowrap">{student.reserve_price.toLocaleString()}원</td>
              {/* <td>
                <button className="btn">1:1 채팅</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={myClassStudentInfo.length}
        itemCountPerPage={postsPerPage}
        pageCount={5}
        currentPage={page && parseInt(page) > 0 ? parseInt(page) : 1}
      />
    </div>
  );
};

export default MyClassStudentList;

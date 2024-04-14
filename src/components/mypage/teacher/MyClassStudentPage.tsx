import { getClassSingleInfo } from '@/app/api/mypage/my-class-api';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { FaRegCalendarCheck, FaRegClock } from 'react-icons/fa';
import { LuClipboardEdit } from 'react-icons/lu';
import MyClassStudentList from './MyClassStudentList';
import { convertTimeTo12HourClock } from '@/utils/convertTimeTo12HourClock';
import { GoPeople } from 'react-icons/go';
import { BiMoneyWithdraw } from 'react-icons/bi';

const MyClassStudentPage = () => {
  const param = useSearchParams();
  const timeId = param.get('timeId');

  const { data: classSingleInfo, isPending } = useQuery({
    queryKey: ['class', timeId],
    queryFn: () => getClassSingleInfo(timeId)
  });

  if (isPending) {
    return <div> 로딩중 ... </div>;
  }

  if (!classSingleInfo || classSingleInfo.length === 0) {
    return <div>클래스 정보를 불러올 수 없습니다.</div>;
  }
  return (
    <div className="m-4 p-4 flex flex-col gap-4">
      <p className="font-bold text-text-purple-color text-xl"> 예약한 수강생 리스트</p>
      <div className="flex flex-col text-text-dark-gray">
        <div className="inline-flex items-center p-2 gap-2 ">
          <LuClipboardEdit color="#6C5FF7" size="20" />
          <p className="flex gap-4">
            <span className="font-bold ">클래스</span> {classSingleInfo?.[0].title}
          </p>
        </div>
        <div className="flex gap-8">
          <div className="flex items-center p-2 gap-2">
            <FaRegCalendarCheck color="#6C5FF7" size="20" />
            <p className="flex gap-4">
              <span className="font-bold ">날짜</span> {classSingleInfo?.[0].day}
            </p>
          </div>
          <div className="flex items-center p-2 gap-2">
            <FaRegClock color="#6C5FF7" size="20" />
            <p className="flex gap-4">
              <span className="font-bold ">시간</span> {convertTimeTo12HourClock(classSingleInfo?.[0].times)}
            </p>
          </div>
          <div className="flex items-center p-2 gap-2">
            <GoPeople color="#6C5FF7" size="20" />
            <div className="flex gap-10">
              <p className="flex gap-4">
                <span className="font-bold ">최소 인원</span> {String(classSingleInfo?.[0].min_people)}명
              </p>
              <p className="flex gap-4">
                <span className="font-bold ">최대 인원</span> {String(classSingleInfo?.[0].max_people)}명
              </p>
            </div>
          </div>
          <div className="flex items-center p-2 gap-2">
            <BiMoneyWithdraw color="#6C5FF7" size="20" />
            <p className="flex gap-4">
              <span className="font-bold ">1인 금액</span> {String(classSingleInfo?.[0].price.toLocaleString())}원
            </p>
          </div>
        </div>
      </div>
      <Suspense>
        <MyClassStudentList />
      </Suspense>
    </div>
  );
};

export default MyClassStudentPage;

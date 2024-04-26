'use client';

import { detailClassInfo } from '@/app/api/classdetail/detailClassInfo';
import { getDetailUserInfo } from '@/app/api/classdetail/detailUserInfo';
import ClassDetailContainer from '@/components/classDetail/ClassDetailContainer';
import ClassImageCarousel from '@/components/classDetail/ClassImageCarousel';
import ClassSummary from '@/components/classDetail/ClassSummary';
import DetailComments from '@/components/classDetail/DetailComments';
import MapComponent from '@/components/classDetail/MapComponent';
import MoveToTopBtn from '@/components/listpage/MoveToTopBtn';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';

const DetailPage = ({ params }: { params: { id: string } }) => {
  const {
    isPending: classDataPending,
    isError: classDataIsError,
    data: classData,
    error: classDataError
  } = useQuery({
    queryKey: ['classDetail'],
    queryFn: () => detailClassInfo(params.id)
  });
  const {
    isPending: userDataPending,
    isError: userDataIsError,
    data: userData,
    error: userDataError
  } = useQuery({
    queryKey: ['userClassDetail'],
    queryFn: () => getDetailUserInfo(classData?.user_id),
    enabled: !!classData?.user_id
  });

  if (userDataPending || classDataPending) {
    return <LoadingSpinner />;
  }
  if (userDataIsError || classDataIsError) {
    console.log('Error', userDataError, classDataError);
    return <div>Error</div>;
  }
  return (
    <div className=" responsiveHeight mx-auto flex h-screen max-w-[1920px] flex-col items-center">
      <div className="m-0 flex w-full  items-center bg-white p-2 text-text-dark-gray">
        <Link href={`/`} className="md:text-md flex items-center justify-center text-sm">
          <IoIosArrowBack size={18} />
          뒤로가기
        </Link>
      </div>
      <div className="flex w-full flex-col justify-center gap-2 bg-pale-purple p-6  lg:min-w-[900px] lg:flex-row lg:gap-12">
        <ClassImageCarousel classData={classData || null} />
        <ClassSummary classData={classData || null} userData={userData || null} />
      </div>

      <div className="flex w-full  flex-col items-center justify-center px-6 pb-24 pt-2 lg:p-6 ">
        <ClassDetailContainer classTitle={classData?.title} classDescription={classData?.description} />
        {classData?.location && (
          <MapComponent location={classData?.location} detailLocation={classData?.detail_location} />
        )}
        <DetailComments classData={classData || null} />
      </div>
      <MoveToTopBtn />
    </div>
  );
};
export default DetailPage;

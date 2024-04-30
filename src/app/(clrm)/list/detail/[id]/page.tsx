import { detailClassInfo } from '@/app/api/classdetail/detailClassInfo';
import { getDetailUserInfo } from '@/app/api/classdetail/detailUserInfo';
import ClassDetailContainer from '@/components/classDetail/ClassDetailContainer';
import ClassImageCarousel from '@/components/classDetail/ClassImageCarousel';
import ClassSummary from '@/components/classDetail/ClassSummary';
import DetailComments from '@/components/classDetail/DetailComments';
import MapComponent from '@/components/classDetail/MapComponent';
import BackButton from '@/components/common/BackButton';
import MoveToTopBtn from '@/components/listpage/MoveToTopBtn';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { id: string };
};
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const id = params.id;

  const classData = await detailClassInfo(params.id);

  const previousImages = (await parent).openGraph?.images || [];

  let images = previousImages;
  if (classData?.image) {
    const newImages = Array.isArray(classData.image) ? classData.image : [classData.image];
    images = [...newImages.map((url) => ({ url: url })), ...images];
  }
  return {
    title: classData?.title || 'clroom',
    description: classData?.description || 'clroom',
    openGraph: {
      images: images
    }
  };
}

const DetailPage = async ({ params }: Props) => {
  const classData = await detailClassInfo(params.id);
  const userData = await getDetailUserInfo(classData?.user_id);

  return (
    <div className=" responsiveHeight relative mx-auto flex h-screen max-w-[1920px] flex-col items-center">
      <div className=" m-0 flex w-full   items-center bg-white p-2 text-text-dark-gray ">
        <BackButton />
      </div>
      <div className=" relative flex w-full flex-col justify-center gap-2 bg-pale-purple  p-6 lg:min-w-[950px] lg:flex-row lg:gap-12">
        <ClassImageCarousel classData={classData} />
        <ClassSummary classData={classData} userData={userData} />
      </div>

      <div className="flex w-full  flex-col items-center justify-center px-7 pb-24 pt-2  ">
        <ClassDetailContainer classTitle={classData?.title} classDescription={classData?.description} />
        {classData?.location && (
          <MapComponent location={classData?.location} detailLocation={classData?.detail_location} />
        )}
        <DetailComments classData={classData} />
      </div>
      <MoveToTopBtn />
    </div>
  );
};

export default DetailPage;

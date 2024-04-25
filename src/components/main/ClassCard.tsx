import { ClassAllType } from '@/types/class';
import Image from 'next/image';
import Link from 'next/link';
import ListPageWishButton from '../listpage/ListPageWishButton';
import { FaLocationDot } from 'react-icons/fa6';
import noImage from '@/assets/images/clroom_no_img_purple.png';
import LoadingSpinner from '@/components/common/LoadingSpinner';
//TODO - 주소 글자 넘칠 경우 해결 , 온라인일 경우 주소가 필요없으므로 주소 대체할 것 구현 필요
const ClassCard = ({ classInfos }: { classInfos: ClassAllType }) => {
  // 주소 괄호 제외
  const formattedLocation = classInfos.location.replace(/\s*\([^)]*\)\s*/, '');

  const hashtagString = classInfos.hashtag.map((tag) => `#${tag}`).join(' ');

  return classInfos ? (
    <div className="card w-32  rounded-xl bg-base-100 md:mx-0 md:w-64">
      <Link href={`/list/detail/${classInfos.class_id}`} className="">
        <figure className="relative h-28 w-full rounded-xl bg-gray-200 md:h-40">
          <Image
            // width={250}
            // height={200}
            fill={true}
            src={classInfos.image && classInfos.image.length > 0 ? classInfos.image[0] : noImage}
            alt="클래스 이미지"
            // layout="responsive"
            objectFit="cover"
            unoptimized
          />
        </figure>
        <div className="flex flex-col justify-between py-1">
          {classInfos.location ? (
            <div className="flex items-center justify-start">
              <FaLocationDot color="#6C5FF7" className="text-sm md:text-base" />
              <p className="h-5 flex-grow items-center overflow-hidden  rounded-3xl p-1 text-xs md:h-7 md:text-sm">
                {formattedLocation}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-start">
              <FaLocationDot color="#6C5FF7" className="text-sm md:text-base" />
              <p className="h-5 flex-grow items-center overflow-hidden  rounded-3xl p-1 text-xs md:h-7 md:text-sm">
                온라인 클래스
              </p>
            </div>
          )}
          <p className="h-16 overflow-hidden py-1 text-xs font-semibold md:text-base">{classInfos.title}</p>
          <p className="h-5 overflow-hidden py-1 text-xs text-dark-purple-color md:h-7 md:text-sm">{hashtagString}</p>
        </div>
      </Link>
      <div className="flex justify-between pb-4">
        <div className="overflow-hidden text-sm font-bold md:text-base">{`${classInfos.price.toLocaleString()}원`}</div>
        {classInfos.wish && <ListPageWishButton classId={classInfos.class_id} wishInfo={classInfos.wish} />}
      </div>
    </div>
  ) : (
    <LoadingSpinner />
  );
};

export default ClassCard;

import { ClassAllType } from '@/types/class';
import Image from 'next/image';
import Link from 'next/link';
import ListPageWishButton from '../listpage/ListPageWishButton';
import { FaLocationDot } from 'react-icons/fa6';

//TODO - 주소 글자 넘칠 경우 해결 , 온라인일 경우 주소가 필요없으므로 주소 대체할 것 구현 필요
const ClassCard = ({ classInfos }: { classInfos: ClassAllType }) => {
  // 주소 괄호 제외
  const formattedLocation = classInfos.location.replace(/\s*\([^)]*\)\s*/, '');

  const hashtagString = classInfos.hashtag.map((tag) => `#${tag}`).join(' ');

  return classInfos ? (
    <div className="card w-32  bg-base-100 rounded-xl md:mx-0 md:w-64">
      <Link href={`/list/detail/${classInfos.class_id}`} className="">
        <figure className="w-full h-28 rounded-xl bg-gray-200 relative md:h-40">
          <Image
            // width={250}
            // height={200}
            fill={true}
            src={classInfos.image && classInfos.image.length > 0 ? classInfos.image[0] : 'no image'}
            alt="클래스 이미지"
            // layout="responsive"
            objectFit="cover"
            unoptimized
          />
        </figure>
        <div className="py-1 flex flex-col justify-between">
          {classInfos.location ? (
            <div className="flex justify-start items-center">
              <FaLocationDot color="#6C5FF7" className="text-sm md:text-base" />
              <p className="text-xs h-5 flex-grow items-center  p-1 overflow-hidden rounded-3xl md:text-sm md:h-7">
                {formattedLocation}
              </p>
            </div>
          ) : (
            <div className="flex justify-start items-center">
              <FaLocationDot color="#6C5FF7" className="text-sm md:text-base" />
              <p className="text-xs h-5 flex-grow items-center  p-1 overflow-hidden rounded-3xl md:text-sm md:h-7">
                온라인 클래스
              </p>
            </div>
          )}
          <p className="py-1 text-sm h-16 overflow-hidden md:font-semibold md:text-base">{classInfos.title}</p>
          <p className="py-1 text-xs h-5 overflow-hidden text-dark-purple-color md:text-sm md:h-7">{hashtagString}</p>
        </div>
      </Link>
      <div className="flex justify-between pb-4">
        <div className="text-sm font-bold overflow-hidden md:text-base">{`${classInfos.price.toLocaleString()}원`}</div>
        {classInfos.wish && <ListPageWishButton classId={classInfos.class_id} wishInfo={classInfos.wish} />}
      </div>
    </div>
  ) : (
    <div className="text-center">Data Loading...</div>
  );
};

export default ClassCard;

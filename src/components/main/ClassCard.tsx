import { ClassAllType } from '@/types/class';
import Image from 'next/image';
import Link from 'next/link';
import ListPageWishButton from '../listpage/ListPageWishButton';
import { FaLocationDot } from 'react-icons/fa6';

//TODO - 주소 글자 넘칠 경우 해결 , 온라인일 경우 주소가 필요없으므로 주소 대체할 것 구현 필요
const ClassCard = ({ classInfos }: { classInfos: ClassAllType }) => {
  // 주소 괄호 제외
  const formattedLocation = classInfos.location.replace(/\s*\([^)]*\)\s*/, '');

  return classInfos ? (
    <div className="card w-[250px] h-[350px] bg-base-100 m-1 rounded-xl overflow-hidden">
      <Link href={`/list/detail/${classInfos.class_id}`} className="">
        <figure className="w-full h-40 rounded-xl bg-gray-200 relative">
          <Image
            // width={250}
            // height={200}
            fill={true}
            src={classInfos.image && classInfos.image.length > 0 ? classInfos.image[0] : 'no image'}
            alt="클래스 이미지"
            // layout="responsive"
            objectFit="cover"
            unoptimized={true}
          />
        </figure>
        <div className="card-body p-4 flex flex-col justify-between">
          {classInfos.location ? (
            <div className="flex justify-start items-center">
              <FaLocationDot color="#6C5FF7" size="25" />
              <p className="text-sm flex-grow items-center h-7 p-1 overflow-hidden rounded-3xl">{formattedLocation}</p>
            </div>
          ) : (
            <div className="flex justify-start items-center">
              <FaLocationDot color="#6C5FF7" size="25" />
              <p className="text-sm font-bold flex-grow items-center h-7 p-1 overflow-hidden rounded-3xl">
                온라인 클래스
              </p>
            </div>
          )}

          <p className="text-md h-12 overflow-hidden font-semibold">{classInfos.title}</p>
          {/*해시태그 고정시키기*/}
          <p className="text-sm h-4 overflow-hidden text-dark-purple-color">#{classInfos.hashtag}</p>
        </div>
      </Link>
      <div className="flex justify-between px-4 pb-4">
        <div className="text-md font-bold overflow-hidden">{`${classInfos.price.toLocaleString()}원`}</div>
        {classInfos.wish && <ListPageWishButton classId={classInfos.class_id} wishInfo={classInfos.wish} />}
      </div>
    </div>
  ) : (
    <div className="text-center">Data Loading...</div>
  );
};

export default ClassCard;

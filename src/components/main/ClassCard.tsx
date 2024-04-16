import { ClassAllType } from '@/types/class';
import Image from 'next/image';
import Link from 'next/link';
import ListPageWishButton from '../listpage/ListPageWishButton';
import { GrLocation } from 'react-icons/gr';

//TODO - 주소 글자 넘칠 경우 해결 , 온라인일 경우 주소가 필요없으므로 주소 대체할 것 구현 필요
const ClassCard = ({ classInfos }: { classInfos: ClassAllType }) => {
  // 주소 괄호 제외
  const formattedLocation = classInfos.location.replace(/\s*\([^)]*\)\s*/, '');

  return classInfos ? (
    <div className="card w-[250px] h-[350px] bg-base-100 shadow-xl m-1 rounded-lg overflow-hidden">
      <Link href={`/list/detail/${classInfos.class_id}`} className="">
        <figure className="w-full h-[150px] bg-gray-200 relative">
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
          <div className="flex gap-1 justify-start items-center">
            <GrLocation color="#6C5FF7" size="25" />
            <div className="flex justify-start items-center">
              <p className="text-sm flex-grow items-center p-2 gap-2 h-7 overflow-hidden rounded-3xl">
                {formattedLocation}
              </p>
            </div>
          </div>
          <p className="text-md h-12 overflow-hidden font-semibold">{classInfos.title}</p>
          {/*해시태그 고정시키기*/}
          <p className="text-sm h-7 overflow-hidden text-dark-purple-color">#{classInfos.hashtag}</p>
        </div>
      </Link>
      <div className="flex justify-between px-4 pb-4 mt-auto">
        <div className="text-md font-bold overflow-hidden">{`${classInfos.price.toLocaleString()}원`}</div>
        {classInfos.wish && <ListPageWishButton classId={classInfos.class_id} wishInfo={classInfos.wish} />}
      </div>
    </div>
  ) : (
    <div className="text-center">Data Loading...</div>
  );
};

export default ClassCard;

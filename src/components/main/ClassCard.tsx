import { ClassAllType } from '@/types/class';
import Image from 'next/image';
import Link from 'next/link';
import ListPageWishButton from '../listpage/ListPageWishButton';

const ClassCard = ({ classInfos }: { classInfos: ClassAllType }) => {
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
          <div className="text-xs justify-center items-center bg-black h-10 overflow-hidden w-[200px] text-white py-1 px-2 inline-block rounded">
            {classInfos.location}
          </div>
          <p className="text-md h-12 overflow-hidden font-semibold">{classInfos.title}</p>
          {/*해시태그 고정시키기*/}
          <p className="text-sm text-[#5373FF]">#{classInfos.hashtag}</p>
        </div>
      </Link>
      <div className="flex justify-between px-4 pb-4 mt-auto">
        <div className="text-md font-bold">{`${classInfos.price.toLocaleString()}원`}</div>
        {classInfos.wish && <ListPageWishButton classId={classInfos.class_id} wishInfo={classInfos.wish} />}
      </div>
    </div>
  ) : (
    <div className="text-center">Data Loading...</div>
  );
};

export default ClassCard;

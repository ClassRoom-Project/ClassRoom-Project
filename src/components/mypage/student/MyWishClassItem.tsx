import AskButton from '@/components/chatRooms/AskButton';
import { MyWishClassType } from '@/types/class';
import Image from 'next/image';
import Link from 'next/link';
import { BiCategoryAlt } from 'react-icons/bi';
import { GoPersonAdd } from 'react-icons/go';
import { GrLocation } from 'react-icons/gr';
import NoImage from '@/assets/images/clroom_no_img_purple.png';
import MyPageWishButton from './MyPageWishButton';

const MyWishClassItem = ({ classItem }: { classItem: MyWishClassType }) => {
  // 이미지 대표사진
  const mainImage = classItem.image && classItem.image.length > 0 ? classItem.image[0] : NoImage;

  return (
    <li className="align-center flex w-full flex-col items-center justify-center border-b-2 md:my-4 md:flex-row md:gap-4 md:py-4 lg:max-w-[1280px]">
      <div className="flex w-full flex-col items-center bg-pale-purple md:gap-4 lg:flex-row">
        <div className="relative h-52 w-72 md:mt-8 lg:mx-8 lg:w-1/3">
          <Image
            src={mainImage}
            alt="클래스 대표 사진"
            fill={true}
            sizes="288px"
            className="p-4 md:p-0"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="flex h-full w-full flex-col gap-4 p-4">
          <div className="flex items-center justify-center gap-4 md:pb-4 lg:justify-start lg:pb-0 lg:pt-8">
            <p className="text-base font-bold text-dark-purple-color sm:text-xl ">{classItem.title}</p>
            {classItem && (
              <MyPageWishButton key={classItem.class_id} classId={classItem.class_id} classItem={classItem} />
            )}
          </div>
          <section className="flex flex-col lg:items-start">
            <div className="flex-col gap-4 md:flex md:flex-row">
              <div className="flex gap-4 py-1">
                <div className="flex items-center gap-2 p-2 md:rounded-3xl md:border md:border-point-purple ">
                  <p className="whitespace-nowrap text-xs sm:text-sm md:text-base">난이도 : {classItem?.difficulty}</p>
                </div>
                <div className="flex items-center gap-2 p-2 md:rounded-3xl md:border md:border-point-purple ">
                  <p className="whitespace-nowrap text-xs sm:text-sm md:text-base">{classItem?.class_type}</p>
                </div>
              </div>
              <div className="flex flex-col py-1 md:flex-row md:gap-4">
                <div className="flex items-center gap-2 p-2 md:rounded-3xl md:border md:border-point-purple ">
                  <BiCategoryAlt color="#6C5FF7" size="20" />
                  <p className="whitespace-nowrap text-xs sm:text-sm md:text-base">카테고리 : {classItem?.category}</p>
                </div>
                <div className="flex items-center gap-2 p-2 md:rounded-3xl md:border md:border-point-purple ">
                  <GoPersonAdd color="#6C5FF7" size="20" />
                  <p className="whitespace-nowrap text-xs sm:text-sm md:text-base">
                    수강 인원수 : {String(classItem?.quantity)}명
                  </p>
                </div>
              </div>
            </div>
            <div className="flex md:gap-4 md:py-1">
              <div className="inline-flex items-center gap-2 p-2 md:rounded-3xl md:border md:border-point-purple ">
                <GrLocation color="#6C5FF7" size="20" />
                {classItem.location ? (
                  <p className="text-xs sm:text-sm md:text-base">
                    위치 : {classItem.location} {classItem.detail_location}
                  </p>
                ) : (
                  <p className="whitespace-nowrap text-xs sm:text-sm md:text-base">위치 정보가 없습니다.</p>
                )}
              </div>
            </div>
          </section>
          <section className="flex w-full items-center justify-center gap-4 p-2 md:right-4 md:justify-end md:gap-4">
            <AskButton
              classId={classItem.class_id}
              makeClassUserId={classItem.user_id}
              buttonStyle="btn md:w-36 w-1/3 hover:bg-transparent text-xs md:text-sm hover:text-text-dark-gray"
            />
            <div className="btn w-1/3 whitespace-nowrap bg-dark-purple-color text-xs text-white hover:bg-transparent hover:text-dark-purple-color md:w-36 md:text-sm">
              <Link href={`reserve?classId=${classItem.class_id}`}>클래스 신청하기</Link>
            </div>
            <div className="btn w-1/3 whitespace-nowrap bg-point-purple text-xs text-white hover:bg-transparent hover:text-point-purple md:w-36 md:text-sm">
              <Link href={`list/detail/${classItem.class_id}`}>클래스 상세보기</Link>
            </div>
          </section>
        </div>
      </div>
    </li>
  );
};

export default MyWishClassItem;

import DetailWishButton from '@/components/classDetail/DetailWishButton';
import { MyWishClassType } from '@/types/class';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiCategoryAlt } from 'react-icons/bi';
import { GoPersonAdd } from 'react-icons/go';
import { GrLocation } from 'react-icons/gr';

const MyWishClassItem = ({ classItem }: { classItem: MyWishClassType }) => {
  // const [isWishedState, setIsWishedState] = useState<boolean>(false);
  // const handleWishChange = (isWished: boolean) => {
  //   setIsWishedState(isWished);
  // };
  // console.log('classItem', classItem);

  // 이미지 대표사진
  const mainImage = classItem.image && classItem.image.length > 0 ? classItem.image[0] : '이미지 없음';

  return (
    <li className="border-b-2 border-b-border-color max-w-screen-xl w-[1080px] ">
      <div className="flex gap-4  bg-pale-purple my-4 p-4">
        <div className="w-[300px] h-[200px]">
          <Image
            src={mainImage}
            alt="클래스 대표 사진"
            width={300}
            height={200}
            className="w-full h-full p-4"
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className="flex flex-col p-4 gap-4 h-full w-full">
          <section>
            <div className="flex  gap-4 items-center">
              <p className="font-bold text-xl text-dark-purple-color">{classItem.title}</p>
              <DetailWishButton classId={classItem.class_id} />
            </div>
            <div className="flex gap-4 py-4">
              <div className="flex items-center p-2 gap-2 border border-point-purple rounded-3xl ">
                <p>난이도 : {classItem?.difficulty}</p>
              </div>
              <div className="flex items-center p-2 gap-2 border border-point-purple rounded-3xl ">
                <p>{classItem?.class_type}</p>
              </div>

              <div className="flex items-center p-2 gap-2 border border-point-purple rounded-3xl ">
                <BiCategoryAlt color="#6C5FF7" size="20" />
                <p>카테고리 : {classItem?.category}</p>
              </div>
              <div className="flex items-center p-2 gap-2 border border-point-purple rounded-3xl ">
                <GoPersonAdd color="#6C5FF7" size="20" />
                <p>수강 인원수 : {String(classItem?.quantity)}명</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="inline-flex items-center p-2 gap-2 border border-point-purple rounded-3xl ">
                <GrLocation color="#6C5FF7" size="20" />
                {classItem.location ? (
                  <p>
                    위치 : {classItem.location} {classItem.detail_location}
                  </p>
                ) : (
                  <p>위치 정보가 없습니다.</p>
                )}
              </div>
            </div>
          </section>
          <section className="flex justify-end gap-4 pt-4 right-4">
            {/* <AskButton classId={classItem.class_id} makeClassUserId={classItem.}/> */}
            <button className="btn w-36">문의하기</button>
            <Link href={`reserve?classId=${classItem.class_id}`}>
              <div className="btn bg-dark-purple-color text-white w-36">클래스 신청하기</div>
            </Link>
            <Link href={`list/detail/${classItem.class_id}`}>
              <div className="btn bg-point-purple text-white w-36">클래스 보러가기</div>
            </Link>
          </section>
        </div>
      </div>
    </li>
  );
};

export default MyWishClassItem;

import { ListDetailClassInfo } from '@/types/class';
import { DetailUserInfoType } from '@/types/user';
import Image from 'next/image';
import { FiCalendar, FiUsers } from 'react-icons/fi';
import { GrLocation } from 'react-icons/gr';
import { LuClock, LuDot } from 'react-icons/lu';
import { PiCubeDuotone, PiCurrencyKrw } from 'react-icons/pi';
import { RiHashtag, RiUserLocationLine } from 'react-icons/ri';
import defaultProfileImageSrc from '../../assets/images/profile-image.png';
import ClassDetailBtn from './ClassDetailBtn';

const ClassSummary = ({
  classData,
  userData
}: {
  classData: ListDetailClassInfo | null;
  userData: DetailUserInfoType | null;
}) => {
  // 해시태그 배열 생성
  const hashtagString = classData?.hashtag.map((tag) => {
    return (
      <div key={tag} className="mr-1.5 flex  items-center text-gray-400">
        <RiHashtag color="#BAB4FD" />
        <p>{tag}</p>
      </div>
    );
  });

  // 예약 가능 날짜 배열 생성
  const classDaysElements = classData?.date.map((dateInfo) => {
    const day = dateInfo.day.slice(5).split('-').join('.');
    return <div key={dateInfo.date_id}>{day} </div>;
  });

  const classInfoLabels = [
    {
      icon: <RiUserLocationLine className="text-main-color" />,
      title: `클래스 유형`,
      description: `${classData?.class_type}`
    },
    {
      icon: <PiCubeDuotone className="text-main-color" />,
      title: `난이도`,
      description: `${classData?.difficulty}`
    },

    {
      icon: <LuClock className="text-main-color" />,
      title: '소요 시간',
      description: `${classData?.total_time}시간`
    },

    {
      icon: <FiUsers className="text-main-color" />,
      title: '정원',
      description: (
        <div>
          최소 {classData?.min_people}명 ~ 최대 {classData?.quantity}명
        </div>
      )
    },
    {
      icon: <GrLocation className="text-main-color" />,
      title: '위치',
      description: classData?.location ? classData?.location : '온라인 클래스'
    },
    {
      icon: <FiCalendar className="text-main-color" />,
      title: '예약 가능 날짜',
      description: classDaysElements
    },

    {
      icon: <PiCurrencyKrw className="text-main-color" />,
      title: '수강 금액',
      description: classData?.price === 0 ? '무료' : `${classData?.price.toLocaleString()}원`
    }
  ];

  return (
    <div className="mt-4 w-full px-4 md:px-0 lg:w-[40%] lg:min-w-[400px]">
      <div className=" mb-4 flex h-8 items-center gap-2">
        <div className="relative h-8 w-8 overflow-hidden rounded-full">
          {userData?.profile_image ? (
            <Image
              fill={true}
              src={userData.profile_image}
              alt="profileImage"
              sizes="32px"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <Image
              fill={true}
              src={defaultProfileImageSrc}
              alt="profileImage"
              sizes="32px"
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>
        <p>
          <span className="font-bold">{classData?.users.teacher_name}</span> 강사님
        </p>
      </div>
      <div className="flex flex-col gap-4 text-text-dark-gray">
        <div className="text-xl font-bold">{classData?.title}</div>
        <div className="text-sm md:text-base">
          <div className="mb-0.5 flex items-center  ">
            <span>카테고리</span>
            <LuDot color="gray" />
            {classData?.category}
          </div>
          <div className=" flex overflow-x-auto whitespace-nowrap scrollbar-hide sm:flex-wrap sm:overflow-visible sm:whitespace-normal ">
            {hashtagString}
          </div>
        </div>
        <div className="flex flex-col gap-5 text-lg">
          {classInfoLabels.map(({ icon, title, description }) => {
            return (
              <div key={title} className="flex items-center gap-2 text-text-dark-gray">
                <div className="mt-0.5 self-start font-bold md:mt-1.5">{icon}</div>
                <div className={'mr-1 hidden shrink-0 self-start font-bold md:block '}>{title}</div>
                <div className="flex flex-wrap  gap-2 text-sm font-normal md:text-base">{description}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-10 w-full">
        {classData?.class_id ? (
          <ClassDetailBtn
            classId={classData.class_id}
            makeClassUserId={classData.user_id}
            lastClassDay={classData.date[classData.date.length - 1].day}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ClassSummary;

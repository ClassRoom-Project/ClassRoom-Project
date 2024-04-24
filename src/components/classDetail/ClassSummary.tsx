import { ListDetailClassInfo } from '@/types/class';
import { DetailUserInfoType } from '@/types/user';
import Image from 'next/image';
import { FiCalendar, FiUsers } from 'react-icons/fi';
import { GrLocation } from 'react-icons/gr';
import { HiOutlineCube } from 'react-icons/hi2';
import { LuClock } from 'react-icons/lu';
import { PiCurrencyKrw } from 'react-icons/pi';
import { RiHashtag, RiUserLocationLine } from 'react-icons/ri';
import ClassDetailBtn from './ClassDetailBtn';
import defaultProfileImageSrc from '../../assets/images/profile-image.png';

const ClassSummary = ({
  classData,
  userData
}: {
  classData: ListDetailClassInfo | null;
  userData: DetailUserInfoType | null;
}) => {
  const hashtagString = classData?.hashtag.map((tag) => {
    return (
      <div key={tag} className="flex items-center text-gray-400">
        <RiHashtag />
        <p>{tag}</p>
      </div>
    );
  });

  // 예약 가능 날짜 배열 생성
  const classDaysElements = classData?.date.map((dateInfo) => {
    const day = dateInfo.day.slice(5);
    return <div key={dateInfo.date_id}>{day}</div>;
  });

  const classInfoLabels = [
    {
      icon: <RiUserLocationLine className="text-main-color" />,
      title: `클래스 유형`,
      description: `${classData?.class_type}`
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
      description: `${classData?.price.toLocaleString()}원`
    }
  ];

  return (
    <div className="mt-4 w-[45%]">
      <div className="tems-center mb-4 mr-2 flex h-8 gap-2">
        <div className="relative h-8 w-8">
          <Image
            fill={true}
            className="h-full w-full rounded-full object-cover"
            src={userData?.profile_image ? userData.profile_image : defaultProfileImageSrc}
            alt="profileImage"
          />
        </div>
        <p>{classData?.users.teacher_name}</p>
      </div>
      <div className="flex flex-col gap-4 text-text-dark-gray">
        <div className="text-xl font-bold">{classData?.title}</div>
        <div>
          <div className="mb-0.5">카테고리 : {classData?.category}</div>
          <div className="flex gap-2">{hashtagString}</div>
        </div>
        <div className="flex flex-col gap-5 text-lg">
          {classInfoLabels.map(({ icon, title, description }) => {
            return (
              <div key={title} className="flex items-center gap-2 text-text-dark-gray">
                <div className="font-bold ">{icon}</div>
                <div className={'mr-1 shrink-0 font-bold'}>{title}</div>
                <div className="flex gap-2 font-normal">{description}</div>
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

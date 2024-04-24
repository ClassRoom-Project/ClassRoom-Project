'use client';

import { ListDetailClassInfo } from '@/types/class';
import { DetailUserInfoType } from '@/types/user';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { GrLocation } from 'react-icons/gr';
import { HiOutlineCube } from 'react-icons/hi2';
import { LuClock } from 'react-icons/lu';
import { PiCurrencyKrw } from 'react-icons/pi';
import { RiHashtag, RiUserLocationLine } from 'react-icons/ri';
import ClassDetailBtn from './ClassDetailBtn';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import './embla.css';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import noImage from '../../assets/images/clroom_no_img_purple.png';

const ClassImageAndSummary = ({
  classData,
  userData
}: {
  classData: ListDetailClassInfo | null;
  userData: DetailUserInfoType | null;
}) => {
  const defaultImageSrc = '/noimage.png';
  const defaultProfileImageSrc = '/기본프로필사진.png';
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 5000 })]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  // 메인 이미지를 스테이트로 변경 -> 메인이미지 바꾸기
  const [mainImageSrc, setMainImageSrc] = useState(classData?.image[0] || defaultImageSrc);

  // 이미지 선택시 해당이미지가 메인이미지로 바뀌는 로직, Todo : 컴포넌트로 리팩토링 예정
  const handleThumbnailClick = (imageSrc: string) => {
    setMainImageSrc(imageSrc);
  };

  const hashtagString = classData?.hashtag.map((tag) => {
    return (
      <div key={tag} className="flex items-center text-gray-400">
        <RiHashtag />
        <p>{tag}</p>
      </div>
    );
  });

  const classInfoLabels = [
    {
      icon: <RiUserLocationLine className="text-main-color" />,
      title: `클래스 유형`,
      description: `${classData?.class_type}`
    },
    {
      icon: <HiOutlineCube className="text-main-color" />,
      title: '난이도',
      description: classData?.difficulty
    },
    {
      icon: <LuClock className="text-main-color" />,
      title: '소요 시간',
      description: `${classData?.total_time}시간`
    },
    {
      icon: <GrLocation className="text-main-color" />,
      title: '위치',
      description: classData?.location ? classData?.location : '온라인 클래스'
    },
    {
      icon: <GrLocation className="text-main-color" />,
      title: '정원',
      description: (
        <div>
          최소 {classData?.min_people}명 ~ 최대 {classData?.quantity}명
        </div>
      )
    },
    {
      icon: <PiCurrencyKrw className="text-main-color" />,
      title: '수강 금액',
      description: `${classData?.price.toLocaleString()}원`
    }
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  console.log(classData?.image);

  return (
    <div className="flex w-full justify-center bg-pale-purple">
      <div className="flex w-full  justify-between gap-12 p-6">
        <div className="w-[50%]  ">
          <section className="embla">
            <div className="embla__viewport rounded-2xl" ref={emblaRef}>
              <div className="embla__container">
                {classData && classData.image.length !== 0 ? (
                  classData?.image.map((image, index) => (
                    <div className="embla__slide" key={index}>
                      <div className="embla__slide__inner">
                        <Image
                          fill={true}
                          className="embla-slide-img h-full w-full rounded-md object-cover"
                          src={image}
                          alt={classData.title}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="relative h-full w-full">
                    <Image
                      fill
                      className="embla-slide-img h-full w-full rounded-md object-cover"
                      src={noImage}
                      alt="clroom no Image"
                    />
                  </div>
                )}
              </div>
              <div className="embla__controls">
                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
              </div>

              <div className="embla__dots">
                {scrollSnaps.map((_, index) => (
                  <DotButton
                    key={index}
                    onClick={() => onDotButtonClick(index)}
                    className={'embla__dot'.concat(index === selectedIndex ? ' embla__dot--selected' : '')}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>

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
              <div className="mb-2">카테고리 : {classData?.category}</div>
              <div className="flex gap-2">{hashtagString}</div>
            </div>
            <div className="flex flex-col gap-5 text-lg">
              {classInfoLabels.map(({ icon, title, description }) => {
                return (
                  <div key={title} className="flex items-center gap-2 text-text-dark-gray">
                    <div className="font-bold ">{icon}</div>
                    <div className={'mr-1 shrink-0 font-bold'}>{title}</div>
                    <div className="truncate font-normal">{description}</div>
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
      </div>
    </div>
  );
};

export default ClassImageAndSummary;

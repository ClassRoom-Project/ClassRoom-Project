'use client';
//yarn add embla-carousel
//yarn add embla-carousel-autoplay
import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import ClassCard from './ClassCard';
import { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useLatestClassInfoStore } from '@/store/classInfoStore';
import { getLatestClassInfo } from '@/app/api/mainpage/getClassAllInfo';
import './emblaCarousel.css';

const DeadlineClass = () => {
  const { LatestClassInfos, setLatestClassInfos } = useLatestClassInfoStore();
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 3000 })]);

  //카드들이 제대로 나오지 않는 경우가 있는 경우 방지
  useEffect(() => {
    if (embla && LatestClassInfos.length > 0) {
      embla.reInit();
    }
  }, [embla, LatestClassInfos]);

  useEffect(() => {
    const fetchClassInfo = async () => {
      const infos = await getLatestClassInfo();
      setLatestClassInfos(infos);
    };

    fetchClassInfo();
  }, [setLatestClassInfos]);

  console.log(LatestClassInfos);
  return (
    <div className="w-full flex flex-col">
      <p className="text-text-color px-2 borderb-[1px] pb-5 border-solid border-border-color">예약순</p>
      <div className="embla w-full overflow-hidden" ref={emblaRef}>
        <div className="embla__container">
          {LatestClassInfos.map((infos) => (
            <div className="embla__slide" key={infos.class_id}>
              <ClassCard classInfos={infos} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeadlineClass;

'use client';
//yarn add embla-carousel
//yarn add embla-carousel-autoplay
import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import ClassCard from './ClassCard';
import { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useClassInfoStore } from '@/store/classInfoStore';
import { getClassAllInfo } from '@/app/api/mainpage/getClassAllInfo';
import './emblaCarousel.css';

const BestClass = () => {
  const { classInfos, setClassInfos } = useClassInfoStore();
  const [emblaRef, embla] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);

  //카드들이 제대로 나오지 않는 경우가 있는 경우 방지

  useEffect(() => {
    if (embla && classInfos.length > 0) {
      embla.reInit();
    }
  }, [embla, classInfos]);

  useEffect(() => {
    const fetchClassInfo = async () => {
      const infos = await getClassAllInfo();
      setClassInfos(infos);
    };

    fetchClassInfo();
  }, [setClassInfos]);

  return (
    <div className="w-full flex flex-col">
      <p className="text-text-color borderb-[1px] pb-5 border-solid border-border-color">인기순</p>
      <div className="embla w-full overflow-hidden" ref={emblaRef}>
        <div className="embla__container">
          {classInfos.map((infos) => (
            <div className="embla__slide" key={infos.class_id}>
              <ClassCard classInfos={infos} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestClass;

'use client';
//yarn add embla-carousel
//yarn add embla-carousel-autoplay
import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import ClassCard from './ClassCard';
import { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useBestClassInfoStore } from '@/store/classInfoStore';
import { getBestClassInfo } from '@/app/api/mainpage/getClassAllInfo';
import './emblaCarousel.css';

const BestClass = () => {
  const { BestClassInfos, setBestClassInfos } = useBestClassInfoStore();
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 3000 })]);

  //카드들이 제대로 나오지 않는 경우가 있는 경우 방지

  useEffect(() => {
    if (embla && BestClassInfos.length > 0) {
      embla.reInit();
    }
  }, [embla, BestClassInfos]);

  useEffect(() => {
    const fetchClassInfo = async () => {
      const infos = await getBestClassInfo();
      setBestClassInfos(infos);
    };

    fetchClassInfo();
  }, [setBestClassInfos]);

  return (
    <div className="w-full flex relative flex-col">
      <div className="ml-2 w-full ">
        <p className="px-2 text-xl pb-1">클룸 인기 클래스 🏆</p>
      </div>
      <div className="embla w-full mt-2 overflow-hidden" ref={emblaRef}>
        <div className="embla__container">
          {BestClassInfos.map((infos) => (
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

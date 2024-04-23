'use client';
//yarn add embla-carousel
//yarn add embla-carousel-autoplay
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import ClassCard from './ClassCard';
import { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useClassInfoStore } from '@/store/classInfoStore';
import './emblaCarousel.css';

const BestClass = () => {
  const { classInfos } = useClassInfoStore();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);

  return (
    <div className="w-full">
      <p className="text-text-color borderb-[1px] border-solid border-border-color">인기순</p>
      <div className="embla w-full overflow-hidden" ref={emblaRef}>
        <div className="embla__container">
          {classInfos.map((info) => (
            <div className="embla__slide" key={info.class_id}>
              <ClassCard classInfos={info} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestClass;

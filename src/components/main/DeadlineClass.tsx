'use client';

//yarn add embla-carousel-autoplay
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import ClassCard from './ClassCard';
import { EmblaOptionsType } from 'embla-carousel';
import { useClassInfoStore } from '@/store/classInfoStore';
import './emblaCarousel.css';

const DeadlineClass = () => {
  const { classInfos } = useClassInfoStore();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  return (
    <div className="w-full mr-auto ml-auto">
      <p className="text-text-color borderb-[1px] border-solid border-border-color">마감임박</p>
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

export default DeadlineClass;

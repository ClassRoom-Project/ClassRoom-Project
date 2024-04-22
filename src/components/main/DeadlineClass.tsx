'use client';

import React, { PropsWithChildren, useEffect } from 'react';
import ClassCard from './ClassCard';
import { useClassInfoStore } from '@/store/classInfoStore';
import { getClassAllInfo } from '@/app/api/mainpage/getClassAllInfo';
// yarn add --dev @types/react-slick
// yarn add react-slick
// yarn add slick-carousel
// flex 와 slick은 절때 사용금지
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { settings } from './ClassSlick';

const DeadlineClass = () => {
  const { classInfos, setClassInfos } = useClassInfoStore();

  useEffect(() => {
    const getClassInfos = async () => {
      const infos = await getClassAllInfo();
      //남은수량순
      [...infos].sort((a, b) => a.quantity - b.quantity);
      setClassInfos(infos);
    };
    getClassInfos();
  }, [setClassInfos]);

  return (
    <div className="w-full mr-auto ml-auto">
      <p className="text-text-color">마감임박</p>
      <div className="slider-container w-full">
        <Slider {...settings}>
          {classInfos.map((info) => (
            <ClassCard key={info.class_id} classInfos={info} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default DeadlineClass;

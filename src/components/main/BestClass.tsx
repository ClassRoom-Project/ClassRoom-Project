'use client';

import React, { useEffect } from 'react';
import ClassCard from './ClassCard';
import { useClassInfoStore } from '@/store/ClassInfoStore';
import { fetchClassInfos } from '@/api/supabase/fetchClassInfo';
// yarn add --dev @types/react-slick
// yarn add react-slick
// yarn add slick-carousel
// flex 와 slick은 절때 사용금지
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BestClass = () => {
  const { classInfos, setClassInfos } = useClassInfoStore();
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 1000,
    cssEase: 'linear'
  };

  useEffect(() => {
    const getClassInfos = async () => {
      const infos = await fetchClassInfos();
      setClassInfos(infos);
    };
    getClassInfos();
  }, []);

  return (
    <div>
      <p>BestClass</p>
      <div className="slider-container w-[85vw]">
        <Slider {...settings}>
          {classInfos.map((info, classId) => (
            <ClassCard key={classId} classInfos={info} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BestClass;

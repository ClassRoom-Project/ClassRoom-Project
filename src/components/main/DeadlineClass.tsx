'use client';

import React, { PropsWithChildren, useEffect } from 'react';
import ClassCard from './ClassCard';
import { useClassInfoStore } from '@/store/ClassInfoStore';
import { getClassAllInfo } from '@/app/api/supabase/fetchClassInfo';
// yarn add --dev @types/react-slick
// yarn add react-slick
// yarn add slick-carousel
// flex 와 slick은 절때 사용금지
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SlickArrowProps } from '@/types/reactSlick';

function SampleNextArrow(props: SlickArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        width: '20px',
        height: '20px',
        display: 'block',
        borderRadius: '50%',
        background: 'black'
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: SlickArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        width: '20px',
        height: '20px',
        display: 'block',
        borderRadius: '50%',
        background: 'black'
      }}
      onClick={onClick}
    />
  );
}
const DeadlineClass = () => {
  const { classInfos, setClassInfos } = useClassInfoStore();
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 4000,
    cssEase: 'linear',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  useEffect(() => {
    const getClassInfos = async () => {
      const infos = await getClassAllInfo();
      //남은수량순
      [...infos].sort((a, b) => a.quantity - b.quantity);
      setClassInfos(infos);
    };
    getClassInfos();
  }, []);

  return (
    <div className="mr-auto ml-auto">
      <p>마감 임박</p>
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

export default DeadlineClass;

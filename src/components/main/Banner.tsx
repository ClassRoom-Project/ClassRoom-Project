'use client';
import Ellipse from '@/assets/images/Ellipse.png';
import banner1 from '@/assets/images/bannerImage1.png';
import bannerPersimmon from '@/assets/images/bannerPersimmon.png';
import candle from '@/assets/images/candle.png';
import clRoomTextLogo from '@/assets/images/clRoomTextLogo.png';
import lightPurpleGraphic2 from '@/assets/images/lightPurpleGraphic2.png';
import orangeStar from '@/assets/images/orangeStar.png';
import purpleFlower from '@/assets/images/purpleFlower.png';
import soap from '@/assets/images/soap.png';
import yellowStar from '@/assets/images/yellowStar.png';
import Image from 'next/image';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

export const Banner = () => {
  const [current, setCurrent] = useState(0);
  const totalSlides = 4;

  const handlePrev = () => {
    const newIndex = (current - 1 + totalSlides) % totalSlides;
    setCurrent(newIndex);
  };

  const handleNext = useCallback(() => {
    const newIndex = (current + 1) % totalSlides;
    setCurrent(newIndex);
  }, [current, totalSlides]);

  useEffect(() => {
    const items = document.querySelectorAll('[data-carousel-item]');
    items.forEach((item, index) => {
      const bannerItem = item as HTMLElement;
      if (index === current) {
        bannerItem.style.display = 'block';
      } else {
        bannerItem.style.display = 'none';
      }
    });
  }, [current]);

  // 배너 자동으로 넘기기
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     handleNext();
  //   }, 10000);

  //   //clearInterval 사용해서 타이머 초기화!
  //   return () => clearInterval(interval);
  // }, [handleNext]);

  return (
    <>
      <div id="default-carousel" className="relative mt-2  w-full md:ml-0" data-carousel="slide">
        <div className="h-40 w-full items-center justify-center overflow-hidden rounded-lg md:h-60 xl:h-80">
          {/* 첫번째 배너 */}
          <article data-carousel-item data-index="0">
            <div className="relative flex h-60 flex-row items-center  justify-center bg-[#FFBA33] lg:h-80">
              <div className="h-full w-full">
                <Image
                  width={500}
                  height={500}
                  priority={true}
                  src={bannerPersimmon}
                  alt="banner2"
                  style={{ objectFit: 'contain' }}
                  className="absolute left-12 top-10 w-56 mobile:left-16 mobile:top-10 sm:left-32 sm:top-10 md:left-14 md:top-20 md:w-64 lg:left-32 lg:top-12 xl:left-28 xl:w-96 2xl:-top-10 2xl:left-40 2xl:w-[450px]"
                />
              </div>
              <div className="z-20 flex w-full flex-col items-center gap-2 pb-20 pr-12 md:h-1/2 md:w-1/2 md:pr-20 lg:w-1/2 lg:pb-52 lg:pr-20 xl:w-1/2 xl:gap-8 xl:pb-0 xl:pr-32 xl:pt-6 2xl:pr-80">
                <div className="flex flex-col items-end justify-end">
                  <div className="flex flex-col items-end xl:flex-row xl:gap-2">
                    <p className="whitespace-nowrap text-sm font-bold text-[#522700] md:flex lg:text-2xl xl:text-3xl xl:font-bold 2xl:text-4xl">
                      강사로 등록하여
                    </p>
                    <p className="whitespace-nowrap text-sm font-bold text-[#522700] md:flex lg:text-2xl xl:text-3xl xl:font-bold 2xl:text-4xl">
                      나만의 클래스를 오픈해보세요!
                    </p>
                  </div>
                  <p className="mt-1 whitespace-nowrap text-xs mobile:text-sm lg:text-lg xl:hidden">
                    손쉬운 등록으로 나만의 클래스 열기
                  </p>
                </div>
                <Link //
                  href="/register"
                  className=" whitespace-nowrap rounded-full bg-[#FFE2A9] px-6 py-2 text-xs font-medium text-[#7C633E] lg:text-lg xl:px-10 xl:py-4 xl:text-4xl"
                >
                  나만의 클래스 등록하기
                </Link>
              </div>
            </div>
          </article>

          {/* 연보라 배너 */}
          <article className="" data-carousel-item data-index="1">
            <div className="relative flex h-80 flex-row bg-light-purple duration-700 ease-in-out  ">
              {/* 꽃이미지 */}
              <div className=" absolute left-4 top-2 z-20 hidden w-[150px] sm:left-24 sm:top-5  sm:block sm:w-[200px]  md:left-12  md:top-12 md:w-[220px]  lg:left-20 lg:top-6 lg:w-[380px] xl:left-28 xl:top-10 xl:w-[432px] 2xl:left-40 2xl:top-8">
                <Image style={{ objectFit: 'cover' }} priority={true} src={purpleFlower} alt="bannerFlowerImage" />
              </div>

              {/* 이상한도형 */}
              <div className="absolute left-1 top-[-60px] w-[350px] sm:left-12 sm:top-[-120px]  sm:w-[380px] md:left-[140px] md:top-[-100px]  md:w-[400px] lg:left-[350px] lg:top-[-160px] lg:w-[500px] xl:w-[700px] ">
                <Image src={lightPurpleGraphic2} priority={true} alt="graphic" />
              </div>

              <div className=" absolute top-8 z-30 flex w-full flex-col  items-center justify-end gap-2 sm:right-28 sm:w-fit md:right-20  md:top-16 md:items-end  md:gap-5  lg:right-24 lg:top-[50px] lg:text-base xl:right-36 xl:top-32 xl:flex-row xl:items-center 2xl:right-32">
                {/* 클룸 텍스트 로고 */}
                <div className=" w-[80px] flex-shrink-0 sm:w-[70px] md:w-[70px] lg:w-[100px] xl:w-[130px]">
                  <Image
                    style={{ objectFit: 'cover' }}
                    priority={true}
                    quality={100}
                    src={clRoomTextLogo}
                    alt="bannerClroomTextLogo"
                  />
                </div>

                {/* 텍스트 */}
                <div className=" flex flex-col text-center text-sm font-bold text-point-purple  md:text-right  md:text-lg lg:text-lg xl:text-left xl:text-4xl ">
                  <p className="hidden lg:block">클룸을 통해서</p>
                  <p className=" hidden lg:block">다양한 원데이 클래스를 체험해보세요!</p>
                  <p className="lg:hidden">다양한 원데이 </p>
                  <p className="lg:hidden">클래스를 체험해보세요!</p>
                </div>
              </div>
            </div>
          </article>

          {/* 그라데이션 배너  */}
          <article data-carousel-item data-index="1">
            <div className="relative flex h-40 flex-row bg-gradient-gra1 duration-700 ease-in-out md:h-60 xl:h-80">
              <div className="h-full w-full">
                <Image //
                  width={300}
                  height={300}
                  src={banner1}
                  priority={true}
                  alt="banner1"
                  style={{ objectFit: 'contain' }}
                  className="absolute -top-10 left-6 w-72 mobile:-top-10 mobile:left-16 md:-top-0 md:left-24 xl:-top-10 xl:left-32 xl:w-[450px] 2xl:-top-10  2xl:left-56 2xl:w-[500px]"
                />
              </div>
              <div className="z-20 flex w-full flex-col items-end">
                <div className="flex flex-col items-end gap-2 whitespace-nowrap pr-10 pt-28 text-xs font-bold text-white mobile:pr-14 md:pt-40 md:text-sm lg:text-base xl:pr-32 xl:pt-56 xl:text-2xl 2xl:pr-40 2xl:pt-48 2xl:text-4xl">
                  <p>당신의 호기심과 열정을 위한 원데이 클래스 체험!</p>
                  <p>함께하면서 새로운 기술을 배우고, 창의적인 활동에 도전하세요!</p>
                </div>
              </div>
            </div>
          </article>

          {/* 남색 배너 */}
          <article className="" data-carousel-item data-index="1">
            <div className="relative flex h-80 flex-row bg-[#26234D] duration-700 ease-in-out">
              {/* 큰 이미지 */}
              <div className="  absolute left-4 top-2 z-20 hidden w-[150px] sm:left-48 sm:top-[-20px]  sm:block  sm:w-[160px]  md:left-36 md:top-[-30px] md:hidden  md:w-[180px] lg:left-52  lg:top-[-30px] lg:block lg:w-[200px] xl:left-96 xl:top-[-50px] xl:w-[300px]">
                <Image
                  style={{ objectFit: 'cover' }}
                  priority={true}
                  quality={100}
                  src={candle}
                  alt="bannerCandleImage"
                />
              </div>
              {/* 작은 이미지 */}
              <div className=" absolute left-4 top-2 z-20 hidden sm:left-16 sm:top-20 sm:block  sm:w-[100px]  md:left-12 md:top-40  md:hidden  md:w-[220px] lg:left-20  lg:top-32 lg:block lg:w-[150px] xl:left-32 xl:top-[100px] xl:w-[200px]">
                <Image style={{ objectFit: 'cover' }} priority={true} quality={100} src={soap} alt="bannerSoapImage" />
              </div>
              {/*  오른쪽 별 */}
              <div className=" absolute  right-16  top-8 z-20   w-[30px]  md:w-[50px]   lg:right-[60px] lg:top-10  lg:w-[40px] xl:right-44 xl:top-16">
                <Image
                  style={{ objectFit: 'cover' }}
                  priority={true}
                  quality={100}
                  src={yellowStar}
                  alt="bannerYellowStar"
                />
              </div>
              {/* 왼쪽 별 */}
              <div className=" absolute left-20 top-[60px]  z-20 w-[28px] sm:left-auto sm:right-[230px] sm:top-16   md:left-28 md:top-24  md:w-[40px] lg:left-auto   lg:right-[310px] lg:top-24    xl:right-[510px]     xl:top-32  xl:w-[50px]">
                <Image
                  style={{ objectFit: 'cover' }}
                  priority={true}
                  quality={100}
                  src={yellowStar}
                  alt="bannerYellowStar"
                />
              </div>
              {/* 아래 별 */}
              <div className=" absolute right-24 top-[120px]  z-20 w-[20px] sm:right-20 sm:top-32  sm:w-[20px] md:right-[130px] md:top-48 md:w-[30px] lg:right-[68px]   lg:top-44 xl:right-36 xl:top-60  xl:w-[35px]">
                <Image
                  style={{ objectFit: 'cover' }}
                  priority={true}
                  quality={100}
                  src={orangeStar}
                  alt="bannerOrangeStar"
                />
              </div>

              {/* Ellipse */}
              <div className=" absolute right-24 top-20 z-20  w-[10px] sm:left-32  sm:right-auto sm:top-[60px]  sm:w-[16px] md:left-auto md:right-32 md:top-28 md:w-[18px] lg:left-[390px]   lg:top-36 lg:w-[25px] xl:left-[660px] xl:top-52  xl:w-[30px]">
                <Image style={{ objectFit: 'cover' }} priority={true} quality={100} src={Ellipse} alt="bannerEllipse" />
              </div>
              <div className=" absolute left-12 top-28  z-20 w-[15px] sm:left-[160px] sm:top-[85px]  sm:w-[7px] md:left-[80px] md:top-12 md:w-[15px] lg:left-[350px]    lg:top-44 lg:w-[14px] xl:left-[600px] xl:top-64  xl:w-[16px]">
                <Image style={{ objectFit: 'cover' }} priority={true} quality={100} src={Ellipse} alt="bannerEllipse" />
              </div>
              <div className=" absolute left-20 top-32  z-20 w-[7px]  sm:hidden">
                <Image style={{ objectFit: 'cover' }} priority={true} quality={100} src={Ellipse} alt="bannerEllipse" />
              </div>

              <div className=" absolute top-9 z-30 flex w-full flex-col  items-center justify-center gap-2 sm:right-24 sm:top-[38px] sm:w-fit sm:items-center md:right-0 md:top-[60px] md:w-full md:items-center md:gap-5 lg:right-24  lg:top-16  lg:w-fit   xl:right-44 xl:top-[84px]  xl:flex-row xl:items-center ">
                {/* 텍스트 */}
                <div className=" flex flex-col gap-2 text-center text-base font-bold text-white md:text-3xl xl:text-5xl ">
                  <p className="">클룸을 통해서</p>
                  <p className="">취미와 역량을</p>
                  <p className="">한 단계 업그레이드!</p>
                </div>
              </div>
            </div>
          </article>
        </div>
        <button
          type="button"
          className="group absolute  top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none sm:start-0"
          data-carousel-prev
          onClick={handlePrev}
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-white">
            <svg
              className="h-4 w-4 text-white rtl:rotate-180 dark:text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="group absolute end-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 "
          data-carousel-next
          onClick={handleNext}
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-white">
            <svg
              className="h-4 w-4 text-white rtl:rotate-180 dark:text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </span>
        </button>
      </div>
    </>
  );
};

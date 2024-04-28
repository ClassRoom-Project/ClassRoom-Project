'use client';
import Image from 'next/image';
import banner1 from '@/assets/images/bannerImage1.png';
import banner2 from '@/assets/images/bannerCookie.png';
import clrmTextImage from '@/assets/images/loginTextImage.svg';
import bannerMeeting from '@/assets/images/bannerMeeting.png';
import bannerText from '@/assets/images/bannerText.svg';
import bannerFlower from '@/assets/images/bannerFlower.png';
import bannerPersimmon from '@/assets/images/bannerPersimmon.png';
import lightPurpleGraphic from '@/assets/images/lightPurpleGraphic.svg';
import lightPurpleGraphic2 from '@/assets/images/lightPurpleGraphic2.png';
import clRoomTextLogo from '@/assets/images/clRoomTextLogo.png';
import purpleFlower from '@/assets/images/purpleFlower.png';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

export const Banner = () => {
  const [current, setCurrent] = useState(0);
  // const totalSlides = 3;
  const totalSlides = 3;

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
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000);

    //clearInterval 사용해서 타이머 초기화!
    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <>
      <div id="default-carousel" className="relative mt-2  w-full md:ml-0" data-carousel="slide">
        <div className="h-40 w-full items-center justify-center overflow-hidden rounded-lg md:h-60 xl:h-80">
          {/* 첫번째 배너 */}
          <article data-carousel-item data-index="0">
            <div className="relative flex h-60 flex-row items-center  justify-center bg-[#FFBA33] lg:h-80">
              <div className=" h-full w-full">
                <Image
                  width={500}
                  height={500}
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
          {/* 두번째 배너 */}
          <article data-carousel-item data-index="1">
            <div className="relative flex h-40 flex-row bg-gradient-gra1 duration-700 ease-in-out md:h-60 xl:h-80">
              <div className=" h-full w-full">
                <Image //
                  width={300}
                  height={300}
                  src={banner1}
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
          {/* 세번째배너 */}
          {/* <article data-carousel-item data-index="2">
            <div className="relative flex h-60 flex-row items-center bg-button-focus-color duration-700 ease-in-out md:h-80 md:justify-center lg:justify-end">
              <div className="absolute left-0 flex h-full md:top-0 lg:h-auto">
                <Image width={900} height={900} src={bannerFlower} alt="banner3" />
              </div>
              <div className="z-20 flex w-full flex-col items-center xl:w-1/2">
                <div className="relative w-60 md:w-[170px] lg:w-[170px] xl:w-[200px] 2xl:w-[400px]">
                  <Image width={500} height={500} src={bannerText} alt="banner3" layout="responsive" />
                </div>
              </div>
            </div>
          </article> */}
          <article className="" data-carousel-item data-index="1">
            <div className="relative flex h-80 flex-row bg-light-purple duration-700 ease-in-out  ">
              {/* 꽃이미지 */}
              <div className=" absolute left-4 top-2 z-20 hidden w-[150px] sm:left-24 sm:top-5  sm:block sm:w-[200px]  md:left-12  md:top-12 md:w-[220px]  lg:left-20 lg:top-6 lg:w-[380px] xl:left-28 xl:top-10 xl:w-[432px] 2xl:left-40 2xl:top-8">
                <Image style={{ objectFit: 'cover' }} src={purpleFlower} alt="h"></Image>
              </div>

              {/* 이상한도형 */}
              <div className="absolute left-1 top-[-60px] w-[350px] sm:left-12 sm:top-[-120px]  sm:w-[380px] md:left-[140px] md:top-[-100px]  md:w-[400px] lg:left-[350px] lg:top-[-160px] lg:w-[500px] xl:w-[700px] ">
                <Image src={lightPurpleGraphic2} alt="h"></Image>
              </div>

              <div className=" absolute top-8 z-30 flex w-full flex-col  items-center justify-end gap-2 sm:right-28 sm:w-fit md:right-20  md:top-16 md:items-end  md:gap-5  lg:right-24 lg:top-[50px] lg:text-base xl:right-36 xl:top-32 xl:flex-row xl:items-center 2xl:right-44">
                {/* 클룸 텍스트 로고 */}
                <div className=" w-[80px] flex-shrink-0 sm:w-[70px] md:w-[70px] lg:w-[100px] xl:w-[130px]">
                  <Image style={{ objectFit: 'cover' }} quality={100} src={clRoomTextLogo} alt="h"></Image>
                </div>

                {/* 텍스트 */}
                <div className=" flex flex-col text-center text-sm font-bold text-point-purple  md:text-right  md:text-lg lg:text-lg xl:text-left xl:text-2xl  2xl:text-3xl ">
                  <p className="hidden lg:block">클룸을 통해서</p>
                  <p className=" hidden lg:block">다양한 원데이 클래스를 체험해보세요!</p>
                  <p className="lg:hidden">다양한 원데이 </p>
                  <p className="lg:hidden">클래스를 체험해보세요!</p>
                </div>
              </div>
            </div>
          </article>
        </div>
        <button
          type="button"
          className="group absolute  start-6 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none sm:start-0"
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

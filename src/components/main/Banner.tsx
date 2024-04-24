'use client';
import Image from 'next/image';
import banner1 from '@/assets/images/bannerImage1.png';
import banner2 from '@/assets/images/bannerCookie.png';
import clrmTextImage from '@/assets/images/loginTextImage.svg';
import bannerMeeting from '@/assets/images/bannerMeeting.png';
import bannerText from '@/assets/images/bannerText.svg';
import bannerFlower from '@/assets/images/bannerFlower.png';
import bannerPersimmon from '@/assets/images/bannerPersimmon.png';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

export const Banner = () => {
  const [current, setCurrent] = useState(0);
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

  // // 배너 자동으로 넘기기
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     handleNext();
  //   }, 10000);

  //   //clearInterval 사용해서 타이머 초기화!
  //   return () => clearInterval(interval);
  // }, [handleNext]);

  return (
    <>
      <div id="default-carousel" className="relative w-full  md:ml-0 mt-2" data-carousel="slide">
        <div className="h-40 w-full overflow-hidden rounded-lg md:h-60 xl:h-80 items-center justify-center">
          {/* 첫번째 배너 */}
          <article data-carousel-item data-index="0">
            <div className="relative flex flex-row items-center justify-center  h-60 lg:h-80 bg-[#FFBA33]">
              <div className=" w-full h-full">
                <Image
                  width={500}
                  height={500}
                  src={bannerPersimmon}
                  alt="banner2"
                  objectFit="contain"
                  className="absolute left-12 w-56 top-10 mobile:left-16 mobile:top-10 sm:left-32 sm:top-10 md:left-14 md:top-20 lg:left-32 lg:top-12 xl:left-40 xl:-top-2 2xl:left-80 2xl:-top-16 md:w-64 xl:w-96 2xl:w-[500px]"
                />
              </div>
              <div className="z-20 flex gap-2 xl:gap-8 flex-col items-center w-full pb-20 pr-12 md:w-1/2 md:h-1/2 md:pr-20 lg:w-1/2 lg:pb-52 lg:pr-20 xl:pb-0 xl:w-1/2 xl:pr-32 xl:pt-6 2xl:pr-80">
                <div className="flex flex-col items-end justify-end">
                  <div className="flex flex-col items-end xl:flex-row xl:gap-2">
                    <p className="text-[#522700] whitespace-nowrap font-bold xl:font-normal md:flex text-sm lg:text-2xl xl:text-3xl 2xl:text-4xl">
                      강사로 등록하여
                    </p>
                    <p className="text-[#522700] whitespace-nowrap font-bold xl:font-normal md:flex text-sm lg:text-2xl xl:text-3xl 2xl:text-4xl">
                      나만의 클래스를 오픈해보세요!
                    </p>
                  </div>
                  <p className="text-xs mobile:text-sm lg:text-lg xl:hidden whitespace-nowrap mt-1">
                    손쉬운 등록으로 나만의 클래스 열기
                  </p>
                </div>
                <Link //
                  href="/register"
                  className=" bg-[#FFE2A9] text-[#7C633E] whitespace-nowrap rounded-full px-6 py-2 text-xs lg:text-lg xl:text-4xl"
                >
                  나만의 클래스 등록하기
                </Link>
              </div>
            </div>
          </article>
          {/* 두번째 배너 */}
          <article data-carousel-item data-index="1">
            <div className="relative flex flex-row h-40 md:h-60 xl:h-80 duration-700 ease-in-out bg-gradient-gra1">
              <div className=" w-full h-full">
                <Image //
                  width={300}
                  height={300}
                  src={banner1}
                  alt="banner1"
                  objectFit="contain"
                  className="absolute left-6 -top-10 w-72 mobile:left-16 mobile:-top-10 md:left-24 md:-top-0 xl:left-32 xl:-top-10 2xl:left-56 2xl:-top-10  xl:w-[450px] 2xl:w-[500px]"
                />
              </div>
              <div className="z-20 flex flex-col w-full items-end">
                <div className="flex flex-col items-end pt-28 pr-10 mobile:pr-14 whitespace-nowrap text-white text-xs font-bold gap-2 md:pt-40 md:text-sm lg:text-base xl:pt-56 xl:pr-32 xl:text-2xl 2xl:pt-48 2xl:pr-40 2xl:text-4xl">
                  <p>당신의 호기심과 열정을 위한 원데이 클래스 체험!</p>
                  <p>함께하면서 새로운 기술을 배우고, 창의적인 활동에 도전하세요!</p>
                </div>
              </div>
            </div>
          </article>
          {/* 세번째배너 */}
          <article data-carousel-item data-index="2">
            <div className="relative flex flex-row h-60 items-center md:h-80 md:justify-center lg:justify-end duration-700 ease-in-out bg-button-focus-color">
              <div className="flex absolute left-0 md:top-0 h-full lg:h-auto">
                <Image width={900} height={900} src={bannerFlower} alt="banner3" />
              </div>
              <div className="z-20 flex flex-col items-center w-full xl:w-1/2">
                <div className="relative w-60 md:w-[170px] lg:w-[170px] xl:w-[200px] 2xl:w-[400px]">
                  <Image width={500} height={500} src={bannerText} alt="banner3" layout="responsive" />
                </div>
              </div>
            </div>
          </article>
        </div>
        <button
          type="button"
          className="absolute top-0  start-6 sm:start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
          onClick={handlePrev}
        >
          <span className="inline-flex items-center text-white justify-center w-10 h-10 rounded-full bg-transparent">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group "
          data-carousel-next
          onClick={handleNext}
        >
          <span className="inline-flex items-center text-white justify-center w-10 h-10 rounded-full bg-transparent">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </span>
        </button>
      </div>
    </>
  );
};

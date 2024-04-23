'use client';
import Image from 'next/image';
import banner1 from '@/assets/images/bannerImage1.png';
import banner2 from '@/assets/images/bannerCookie.png';
import clrmTextImage from '@/assets/images/loginTextImage.svg';
import bannerMeeting from '@/assets/images/bannerMeeting.png';
import bannerText from '@/assets/images/bannerText.svg';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export const Banner = () => {
  const [current, setCurrent] = useState(0);
  const totalSlides = 3;

  const handlePrev = () => {
    const newIndex = (current - 1 + totalSlides) % totalSlides;
    console.log('Prev index:', newIndex); // 로그를 찍어 확인
    setCurrent(newIndex);
  };

  const handleNext = () => {
    const newIndex = (current + 1) % totalSlides;
    setCurrent(newIndex);
  };

  useEffect(() => {
    const items = document.querySelectorAll('[data-carousel-item]');
    items.forEach((item, index) => {
      if (index === current) {
        item.style.display = 'block'; // 보이게 설정
      } else {
        item.style.display = 'none'; // 숨기기 설정
      }
    });
  }, [current]);

  return (
    <>
      <div id="default-carousel" className="relative w-full  md:ml-0 mt-6" data-carousel="slide">
        <div className="h-60 overflow-hidden rounded-lg md:h-80 ml-6 md:ml-0 md:mx-0">
          {/* 첫번째 배너 */}
          <div data-carousel-item data-index="0">
            <div className=" relative flex flex-row h-80 items-center justify-center duration-700 ease-in-out bg-button-press-color">
              <div className="flex m-auto absolute left-0 top-0 sm:left-20 2xl:left-80">
                <Image width={350} height={350} src={banner1} alt="banner1" />
              </div>
              <div className="z-20 flex flex-col lg:ml-auto lg:mr-20 2xl:mr-96 items-center">
                <Link
                  href="/register"
                  className="absolute right-50 bottom-24 bg-button-hover-color border-4 border-white text-white rounded-full px-4 py-2 2xl:px-8 2xl:py-4 lg:text-xl text-base 2xl:text-4xl md:relative md:right-auto md:bottom-auto"
                >
                  나만의 클래스 등록하기
                </Link>
                <p className="text-white hidden md:flex mt-4 lg:text-lg 2xl:text-2xl">
                  강사로 등록하여 나만의 클래스를 오픈해보세요!
                </p>
                <p className="text-white hidden md:flex mt-2 lg:text-lg 2xl:text-2xl">
                  클래스를 개설하고 관심있는 분야에서 전문가로 활동해보세요.
                </p>
              </div>
            </div>
          </div>
          {/* 두번째 배너 */}
          <div data-carousel-item data-index="1">
            <div className=" relative flex flex-row h-80 items-center md:justify-center lg:justify-end duration-700 ease-in-out bg-background-color">
              <div className="flex absolute left-0 md:top-0 h-full lg:h-auto">
                <Image width={900} height={900} src={banner2} alt="banner2" />
              </div>
              <div className="z-20 flex flex-col items-center w-full xl:w-1/2">
                <div className="relative sm:w-[140px] md:w-[170px] lg:w-[170px] xl:w-[200px] 2xl:w-[200px]">
                  <Image src={clrmTextImage} layout="responsive" width={300} height={300} alt="textLogo" />
                </div>
                <p className="text-black hidden md:flex mt-4 sm:text-xl  2xl:text-2xl">
                  다양한 원데이 클래스를 체험해보세요!
                </p>
              </div>
            </div>
          </div>
          {/* 세번째배너 */}
          <div data-carousel-item data-index="2">
            <div className=" relative flex flex-row h-60 md:h-80 items-center justify-center duration-700 ease-in-out bg-button-focus-color">
              <div className="m-auto absolute hidden left-0 top-0 md:left-20 lg:flex  2xl:left-60">
                <Image width={500} height={500} src={bannerMeeting} alt="banner3" />
              </div>
              <div className="z-20 flex flex-col lg:ml-auto lg:mr-20 2xl:mr-96 items-center">
                <div className="relative xl:w-[300px] 2xl:w-[500px]">
                  <Image width={500} height={500} src={bannerText} alt="banner3" layout="responsive" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="absolute top-0  start-6 sm:start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
          onClick={handlePrev}
        >
          <span className="inline-flex items-center text-white justify-center w-10 h-10 rounded-full bg-main-color hover:bg-button-hover-color ">
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
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
          onClick={handleNext}
        >
          <span className="inline-flex items-center text-white justify-center w-10 h-10 rounded-full bg-main-color hover:bg-button-hover-color ">
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

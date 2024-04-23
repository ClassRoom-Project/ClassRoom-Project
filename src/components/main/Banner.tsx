'use client';
import Image from 'next/image';
import banner1 from '@/assets/images/bannerImage1.png';
import banner2 from '@/assets/images/배너 디자인 7.png';
import banner3 from '@/assets/images/배너 디자인 8.png';
import Link from 'next/link';
import { useEffect } from 'react';

export const Banner = () => {
  useEffect(() => {
    const items = document.querySelectorAll('[data-carousel-item]');
    let current = 0; // 현재 활성화된 아이템 인덱스

    const updateCarousel = () => {
      items.forEach((item, index) => {
        item.classList.remove('block');
        item.classList.add('hidden'); // 모든 슬라이드를 숨깁니다.
        if (index === current) {
          item.classList.remove('hidden');
          item.classList.add('block'); // 현재 슬라이드만 보여줍니다.
        }
      });
    };

    const prevButton = document.querySelector('[data-carouselPrev]');
    const nextButton = document.querySelector('[data-carousel-next]');

    prevButton?.addEventListener('click', () => {
      current = (current - 1 + items.length) % items.length;
      updateCarousel();
    });

    nextButton?.addEventListener('click', () => {
      current = (current + 1) % items.length;
      updateCarousel();
    });

    updateCarousel(); // 초기 슬라이드 설정
  }, []);

  return (
    <>
      <div id="default-carousel" className="relative w-full ml-6 md:ml-0 mt-10" data-carousel="slide">
        <div className="h-60 overflow-hidden rounded-lg md:h-80">
          <div
            className=" relative flex flex-row h-80 items-center justify-center duration-700 ease-in-out bg-button-press-color"
            data-carousel-item
          >
            <div className="flex m-auto absolute left-0 top-0 lg:left-56 md:top-0">
              <Image width={350} height={350} src={banner1} alt="..." />
            </div>
            <div className="z-20 flex flex-col md:ml-auto md:mr-20 xl:mr-56 2xl:ml-72 items-center">
              <Link
                href="/register"
                className="absolute right-50 bottom-24 bg-button-hover-color border-4 border-white text-white rounded-full px-4 py-2 lg:px-8 lg:py-4 text-base lg:text-4xl md:relative md:right-auto md:bottom-auto"
              >
                나만의 클래스 등록하기
              </Link>
              <p className="text-white hidden md:flex mt-4 md:text:lg lg:text-2xl">
                강사로 등록하여 나만의 클래스를 오픈해보세요!
              </p>
              <p className="text-white hidden md:flex mt-2 md:text:lg lg:text-2xl">
                클래스를 개설하고 관심있는 분야에서 전문가로 활동해보세요.
              </p>
            </div>
          </div>

          <div
            className=" flex flex-row h-80 items-center justify-center duration-700 ease-in-out bg-button-press-color"
            data-carousel-item
          >
            <div className="flex m-auto ">
              <Image width={250} height={250} src={banner1} alt="..." />
            </div>
            <div className="flex flex-col m-auto items-center">
              <Link
                href="/register"
                className="bg-button-hover-color border-4 border-white text-white rounded-full px-8 py-4 text-4xl"
              >
                배너2
              </Link>
              <p className="text-white mt-4 text-2xl">강사로 등록하여 나만의 클래스를 오픈해보세요!</p>
              <p className="text-white mt-2 text-2xl">클래스를 개설하고 관심있는 분야에서 전문가로 활동해보세요.</p>
            </div>
          </div>

          <div
            className=" flex flex-row h-80 items-center justify-center duration-700 ease-in-out bg-button-press-color"
            data-carousel-item
          >
            <div className="flex m-auto ">
              <Image width={250} height={250} src={banner1} alt="..." />
            </div>
            <div className="flex flex-col m-auto items-center">
              <Link
                href="/register"
                className="bg-button-hover-color border-4 border-white text-white rounded-full px-8 py-4 text-4xl"
              >
                배너3
              </Link>
              <p className="text-white mt-4 text-2xl">강사로 등록하여 나만의 클래스를 오픈해보세요!</p>
              <p className="text-white mt-2 text-2xl">클래스를 개설하고 관심있는 분야에서 전문가로 활동해보세요.</p>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
        >
          <span className="inline-flex items-center text-white justify-center w-10 h-10 rounded-full bg-main-color dark:bg-main-color group-hover:bg-main-color dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
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
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
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

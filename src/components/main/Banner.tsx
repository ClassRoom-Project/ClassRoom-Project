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
      <div id="default-carousel" className="relative w-full md:ml-0" data-carousel="slide">
        <div className="h-60 overflow-hidden rounded-lg md:h-80">
          <div
            className=" relative flex h-80 flex-row items-center justify-center bg-button-press-color duration-700 ease-in-out"
            data-carousel-item
          >
            <div className="absolute left-0 top-0 m-auto flex md:left-28 md:top-0 2xl:left-80">
              <Image width={350} height={350} src={banner1} alt="..." />
            </div>
            <div className="z-20 flex flex-col items-center lg:ml-auto lg:mr-20 2xl:mr-96">
              <Link
                href="/register"
                className="right-50 absolute bottom-24 rounded-full border-4 border-white bg-button-hover-color px-4 py-2 text-base text-white md:relative md:bottom-auto md:right-auto lg:text-xl 2xl:px-8 2xl:py-4 2xl:text-4xl"
              >
                나만의 클래스 등록하기
              </Link>
              <p className="mt-4 hidden text-white md:flex lg:text-lg 2xl:text-2xl">
                강사로 등록하여 나만의 클래스를 오픈해보세요!
              </p>
              <p className="mt-2 hidden text-white md:flex lg:text-lg 2xl:text-2xl">
                클래스를 개설하고 관심있는 분야에서 전문가로 활동해보세요.
              </p>
            </div>
          </div>
          <div
            className=" flex h-80 flex-row items-center justify-center bg-button-press-color duration-700 ease-in-out"
            data-carousel-item
          >
            <div className="m-auto flex ">
              <Image width={250} height={250} src={banner1} alt="..." />
            </div>
            <div className="m-auto flex flex-col items-center">
              <Link
                href="/register"
                className="rounded-full border-4 border-white bg-button-hover-color px-8 py-4 text-4xl text-white"
              >
                배너2
              </Link>
              <p className="mt-4 text-2xl text-white">강사로 등록하여 나만의 클래스를 오픈해보세요!</p>
              <p className="mt-2 text-2xl text-white">클래스를 개설하고 관심있는 분야에서 전문가로 활동해보세요.</p>
            </div>
          </div>
          <div
            className=" flex h-80 flex-row items-center justify-center bg-button-press-color duration-700 ease-in-out"
            data-carousel-item
          >
            <div className="m-auto flex ">
              <Image width={250} height={250} src={banner1} alt="..." />
            </div>
            <div className="m-auto flex flex-col items-center">
              <Link
                href="/register"
                className="rounded-full border-4 border-white bg-button-hover-color px-8 py-4 text-4xl text-white"
              >
                배너3
              </Link>
              <p className="mt-4 text-2xl text-white">강사로 등록하여 나만의 클래스를 오픈해보세요!</p>
              <p className="mt-2 text-2xl text-white">클래스를 개설하고 관심있는 분야에서 전문가로 활동해보세요.</p>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="group absolute start-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
          data-carousel-prev
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-main-color text-white group-hover:bg-main-color group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-main-color dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
            <svg
              className="h-4 w-4 text-white rtl:rotate-180 dark:text-gray-800"
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
          className="group absolute end-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
          data-carousel-next
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
            <svg
              className="h-4 w-4 text-white rtl:rotate-180 dark:text-gray-800"
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

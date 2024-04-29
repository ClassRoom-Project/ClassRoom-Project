import Image from 'next/image';
import React from 'react';
import Logo from '@/assets/images/Group 1791.png';
import Link from 'next/link';
const MainFooter = () => {
  return (
    <div className="mt-20 h-full w-full border-t-[1px] border-solid border-gray-400 md:py-4">
      <div className="relative flex h-full items-center justify-center p-5">
        <div className="relative hidden md:block md:h-20 md:w-20">
          <Image
            sizes="80px"
            placeholder="empty"
            fill={true}
            src={Logo}
            alt="클래스 이미지"
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className="flex flex-grow flex-col gap-1 pr-3 md:pl-12">
          <div className="flex items-center justify-between text-xs md:text-sm lg:text-base">
            <p>버그 버스터즈</p>
            <p className="text-xs text-text-dark-gray">ⓒ Bug Busters</p>
          </div>
          <div className="text-xs md:text-sm lg:text-base">
            <Link href={'/bugBusters'} className="text-text-dark-gray hover:text-main-color">
              팀 소개
            </Link>
          </div>
          <div className="flex flex-col text-xs md:text-sm">
            <p className="text-text-dark-gray">
              클룸은 원데이 클래스 웹사이트입니다. 이 웹사이트를 통해 더 나은 경험과 성장을 경험하시길 바랍니다.
            </p>
            <p className="text-text-dark-gray">
              클룸은 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 상품, 상품정보, 거래에 관한 의무와 책임은
              판매자(강사)에게 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFooter;

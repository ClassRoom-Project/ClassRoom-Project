import Image from 'next/image';
import React from 'react';
import Logo from '@/assets/images/Group 1791.png';
import Link from 'next/link';
const MainFooter = () => {
  return (
    <div className="h-60 w-full bg-disable-color">
      <div className="relative flex h-full items-center justify-center p-5">
        <div className="relative h-40 w-40">
          <Image
            sizes="(max-width: 768px) 128px, 256px"
            placeholder="empty"
            fill={true}
            src={Logo}
            alt="클래스 이미지"
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className="flex flex-grow flex-col gap-3 pl-6 pr-3">
          <div className="flex items-center justify-between text-xs md:text-sm lg:text-base">
            <p>버그 버스터즈</p>
            <p className="text-text-dark-gray">ⓒ Bug Busters</p>
          </div>
          <div className="text-xs md:text-sm lg:text-base">
            <Link href={'/bugBusters'} className="text-text-dark-gray hover:text-white">
              팀 소개
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-xs md:text-sm lg:text-base">
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

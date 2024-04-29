import PersonalCard from '@/components/bugBusters/PersonalCard';
import React from 'react';
import TeaWon from '@/assets/images/여태원.png';
import Jiwon from '@/assets/images/서지원.png';
import HyunJin from '@/assets/images/김현진.png';
import Hyerin from '@/assets/images/임혜린.png';
import Miju from '@/assets/images/윤미주.png';
import Hyangji from '@/assets/images/임향지.png';
import bugBusters from '@/assets/images/버그버스터즈.png';
import Image from 'next/image';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'team description',
  description: 'bug busters personal cards'
};

const BugBustersPage = () => {
  return (
    <div className="responsiveHeight h-screen">
      <div className="flex flex-col items-center justify-center gap-5 overflow-y-auto">
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-xl text-text-dark-gray">팀 소개</p>
          <div className="flex gap-1 text-3xl font-semibold text-red-700">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image
                sizes="40px"
                placeholder="empty"
                fill={true}
                src={bugBusters}
                alt="bugBusters"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <p>버그 버스터즈</p>
          </div>
        </div>
        <div className="relative grid max-w-[1440px] grid-cols-1 gap-1 pb-20 md:grid-cols-2 md:gap-3 xl:grid-cols-3 xl:gap-5">
          {/* Todo - map 함수 쓰는 걸로 리팩토링!! */}
          <PersonalCard git={'https://github.com/anywhereim'} image={Miju} position={'개발자'} name={'윤미주'} />
          <PersonalCard git={'https://github.com/hyun0zin'} image={HyunJin} position={'개발자'} name={'김현진'} />
          <PersonalCard git={'https://github.com/limhyerin'} image={Hyerin} position={'개발자'} name={'임혜린'} />
          <PersonalCard git={'https://github.com/seopport'} image={Jiwon} position={'개발자'} name={'서지원'} />
          <PersonalCard git={'https://github.com/ccccliff'} image={TeaWon} position={'개발자'} name={'여태원'} />
          <PersonalCard
            git={'https://hyangjileem-design.webflow.io/'}
            image={Hyangji}
            position={'디자이너'}
            name={'임향지'}
          />
        </div>
      </div>
    </div>
  );
};

export default BugBustersPage;

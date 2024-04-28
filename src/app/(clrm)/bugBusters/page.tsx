import PersonalCard from '@/components/bugBusters/PersonalCard';
import React from 'react';
import example from '@/assets/images/profile-taewon.png';
const bugBustersPage = () => {
  return (
    <div className="responsiveHeight h-screen">
      <div className=" flex items-center justify-center overflow-y-auto">
        <div className="relative grid max-w-[1440px] grid-cols-1 gap-1 pb-20 md:grid-cols-2 md:gap-3 md:py-20 xl:grid-cols-3 xl:gap-5">
          <PersonalCard image={example} position={'개발자'} name={'윤미주'} />
          <PersonalCard image={example} position={'개발자'} name={'김현진'} />
          <PersonalCard image={example} position={'개발자'} name={'임혜린'} />
          <PersonalCard image={example} position={'개발자'} name={'서지원'} />
          <PersonalCard image={example} position={'개발자'} name={'여태원'} />
          <PersonalCard image={example} position={'디자이너'} name={'임향지'} />
        </div>
      </div>
    </div>
  );
};

export default bugBustersPage;

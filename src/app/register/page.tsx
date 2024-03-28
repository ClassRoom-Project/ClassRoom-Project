import React from 'react';
import Address from '@/components/register/Address';
import ClassContent from '@/components/register/ClassContent';
import ClassName from '@/components/register/ClassName';
import Personnel from '@/components/register/Personnel';
import Price from '@/components/register/Price';
import TimeSelect from '@/components/register/TimeSelect';

import Image from 'next/image';
import plus from '../../../public/plus.png';
import mainImage from '../../../public/mainImage.png';
import plusImage from '../../../public/plusImage.png';
import CategoryDropdown from '@/components/register/CategoryDropdown';

const page = () => {
  return (
    <div className='w-[1600px] h-[800px] p-4'>
      <div className='border p-4 flex flex-col item-center mt-4'>
        <CategoryDropdown />
        <ClassName />
        <ClassContent />
        <Personnel />
        <Price />
        <Address />
        <div>날짜</div>
        {/* 날짜 달력 api 사용 */}
        <TimeSelect />
      </div>
      <div className="mt-4 flex items-center space-x-4">
        <Image src={plus} alt="plus" className="h-[100px] w-[100px]" />
        <Image src={mainImage} alt="mainImage" className="h-[100px] w-[100px]" />
        <Image src={plusImage} alt="plusImage" className="h-[100px] w-[100px]" />
        <button>등록하기</button>
      </div>
    </div>
  )
}

export default page
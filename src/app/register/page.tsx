import Address from '@/components/register/Address';
import ClassContent from '@/components/register/ClassContent';
import ClassName from '@/components/register/ClassName';
import Personnel from '@/components/register/Personnel';
import Price from '@/components/register/Price';
import TimeSelect from '@/components/register/TimeSelect';
import React from 'react';

const page = () => {
  return (
    <div className='w-[1600px] h-[800px] p-4'>
      <div className='flex justify-end space-x-4'>
        <div>알림</div>
        <div>프로필</div>
      </div>
      <div className='border p-4 flex flex-col item-center mt-4'>
        <ClassName />
        <ClassContent />
        <Personnel />
        <Price />
        <Address />
        <div>날짜</div>
        {/* 날짜 달력 api 사용 */}
        <TimeSelect />
      </div>
      <div className="mt-4">
        <div>이미지 추가 버튼</div>
        <div>이미지</div>
        <button>등록하기</button>
      </div>
    </div>
  )
}

export default page
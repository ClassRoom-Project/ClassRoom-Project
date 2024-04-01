import React from 'react';
import Address from '@/components/register/Address';
import ClassContent from '@/components/register/ClassContent';
import ClassName from '@/components/register/ClassName';
import Personnel from '@/components/register/Personnel';
import Price from '@/components/register/Price';
import TimeSelect from '@/components/register/TimeSelect';
import Category from '@/components/register/Category';
import MinMaxNumber from '@/components/register/MinMaxNumber';
import Calendar from '@/components/register/Calendar';
// import ImageUpload from '@/components/register/ImageUpload';

const RegisterPage = () => {
  return (
    <div className='p-4'>
      <div className='border p-4 flex flex-col item-center mt-4'>
        <Category />
        <ClassName />
        <ClassContent />
        <Personnel />
        <MinMaxNumber />
        <Price />
        <Address />
        <Calendar />
        <TimeSelect />
      </div>
      {/* 이미지 업로드하는 부분인데
      업로드 해결중이여서 일단 전체 주석처리 했습니다 */}
      {/* <ImageUpload /> */}
    </div>
  )
}

export default RegisterPage
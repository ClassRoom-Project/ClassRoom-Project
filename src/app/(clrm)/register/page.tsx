import React from 'react';
import Address from '@/components/register/Address';
import ClassContent from '@/components/register/ClassContent';
import ClassTitle from '@/components/register/ClassTitle';
import Personnel from '@/components/register/Personnel';
import Price from '@/components/register/Price';
import TimeSelect from '@/components/register/TimeSelect';
import Category from '@/components/register/Category';
import MinMaxNumber from '@/components/register/MinMaxNumber';
import ClassTypeDiff from '@/components/register/ClassTypeDiff';
import ImageUpload from '@/components/register/ImageUpload';
import TotalTime from '@/components/register/TotalTime';

const RegisterPage = () => {
  return (
    <div className='p-4'>
      <div className='border p-4'>
        <div className='max-w-md mx-auto sm:max-w-lg lg:max-w-xl'>
          <p>클래스 기본정보 입력란</p>
          <ClassTypeDiff />
          <Category />
          <ClassTitle />
          <ClassContent />
          <Personnel />
          <MinMaxNumber />
          <TotalTime />
          <Price />
          <Address />
          <TimeSelect />
        </div>
      </div>
      <div className="flex justify-between items-center pt-2 max-w-md mx-auto sm:max-w-lg lg:max-w-xl">
        <ImageUpload />
      </div>
    </div>
  );
};

export default RegisterPage;

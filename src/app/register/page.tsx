import React from 'react';
import Address from '@/components/register/Address';
import ClassContent from '@/components/register/ClassContent';
import ClassTitle from '@/components/register/ClassTitle';
import Personnel from '@/components/register/Personnel';
import Price from '@/components/register/Price';
import TimeSelect from '@/components/register/TimeSelect';
import Category from '@/components/register/Category';
import MinMaxNumber from '@/components/register/MinMaxNumber';
import Calendar from '@/components/register/Calendar';
import ClassTypeDiff from '@/components/register/ClassTypeDiff';
import ImageUpload from '@/components/register/ImageUpload';
import TotalTime from '@/components/register/TotalTime';

const RegisterPage = () => {
  return (
    <div className='p-4'>
      <div className='border p-4 flex flex-col item-center mt-4'>
        <Category />
        <ClassTitle />
        <ClassContent />
        <Personnel />
        <MinMaxNumber />
        <ClassTypeDiff />
        <TotalTime />
        <Price />
        <Address />
        <Calendar />
        <TimeSelect />
      </div>
      <div className="flex justify-between items-center pt-2">
        <ImageUpload />
      </div>
    </div>
  )
}

export default RegisterPage
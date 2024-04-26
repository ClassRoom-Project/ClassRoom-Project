'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { SlArrowLeft } from 'react-icons/sl';

const BackButton = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="md:text-md flex items-center justify-center text-sm">
      <IoIosArrowBack size={18} />
      뒤로가기
    </button>
  );
};

export default BackButton;

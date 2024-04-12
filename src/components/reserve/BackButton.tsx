'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SlArrowLeft } from 'react-icons/sl';

const BackButton = () => {
  const router = useRouter();
  return (
    <button className="flex justify-center items-center text-lg gap-1" onClick={() => router.back()}>
      <SlArrowLeft />
    </button>
  );
};

export default BackButton;

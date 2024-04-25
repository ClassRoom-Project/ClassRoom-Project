'use client';

import React from 'react';
import { GoMoveToTop } from 'react-icons/go';

const MoveToTopBtn = () => {
  const handleMoveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
      <button
        onClick={handleMoveToTop}
        className="fixed bottom-20 right-4 z-[100] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-disable-color opacity-80 sm:right-16 md:bottom-4"
      >
        <GoMoveToTop className="text-main-color" />
      </button>
    </>
  );
};

export default MoveToTopBtn;

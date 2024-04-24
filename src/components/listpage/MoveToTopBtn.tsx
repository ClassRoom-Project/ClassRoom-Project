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
        className="fixed rounded-full w-10 h-10 bg-disable-color right-4 sm:right-16 bottom-20 md:bottom-4 cursor-pointer flex justify-center items-center z-[100]"
      >
        <GoMoveToTop className="text-main-color" />
      </button>
    </>
  );
};

export default MoveToTopBtn;

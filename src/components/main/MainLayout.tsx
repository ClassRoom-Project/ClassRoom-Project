import Image from 'next/image';
import React, { PropsWithChildren } from 'react';
import defaultImage from "../../../public/기본프로필사진.png"

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="flex  justify-between items-center h-[100px] border-b-[1px] border-solid border-gray-300">
        <div>Logo</div>
        <div className="flex">
          <div>alarm</div>
          <Image src={defaultImage} alt="Profile image" className="h-[50px] w-[50px]" />
        </div>
      </div>
      {children}
    </>
  );
};

export default MainLayout;

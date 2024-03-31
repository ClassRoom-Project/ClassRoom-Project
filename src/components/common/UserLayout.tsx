import Image from 'next/image';
import React, { PropsWithChildren } from 'react';
import defaultImage from '../../../public/기본프로필사진.png';

const UserLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="flex p-[15px]  justify-between items-center h-[60px] border-b-[1px] border-solid border-gray-300">
        <div>Logo</div>
        <div className="flex">
          <div className="mr-[10px]">alarm</div>
          <Image src={defaultImage} alt="Profile image" className="mr-[15px] h-[50px] w-[50px]" />
        </div>
      </div>
      {children}
    </>
  );
};

export default UserLayout;

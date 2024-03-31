import Image from 'next/image';
import React from 'react';

const ClassCard = () => {
  return (
    <div className="card w-[300px] h-[350px] bg-base-100 shadow-xl">
      <figure>
        <Image src="" alt="Shoes" width={100} height={100} />
      </figure>
      <div className="card-body flex flex-col justify-center items-start">
        <div className="bg-black rounded text-white">address</div>
        <div className="flex">
          <Image className=" rounded-full" src="" alt="" width={20} height={20} />
          <p className="ml-[20px]">title</p>
        </div>
        <div>description</div>
        <div>price</div>
      </div>
    </div>
  );
};

export default ClassCard;

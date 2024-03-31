import Image from 'next/image';
import React from 'react';

const ClassCard = () => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className=" border-b-1 border-solid border-gray-400">
        <Image src="" alt="Shoes" width={100} height={100} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;

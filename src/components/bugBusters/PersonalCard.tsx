import Image from 'next/image';
import React from 'react';
import type { StaticImageData } from 'next/image';
import Link from 'next/link';
interface PersonalCardProps {
  name: string;
  position: string;
  image: StaticImageData;
  git: string;
}
const PersonalCard: React.FC<PersonalCardProps> = ({ name, position, image, git }) => {
  return (
    <div className="relative flex h-[350px] w-80 flex-col items-center justify-center gap-3 p-1 md:h-[420px]">
      <div className="relative h-52 w-52 items-center justify-center rounded-full bg-disable-color md:h-72 md:w-72">
        <Image
          sizes="(max-width: 768px) 208px, 288px"
          placeholder="empty"
          fill={true}
          src={image}
          alt="클래스 이미지"
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="flex items-center justify-center gap-3">
        <p className="text-dark-purple-color">{position}</p>
        <p className="text-xl font-semibold text-dark-purple-color">{name}</p>
      </div>
      <Link className="text-sm text-text-dark-gray" href={`${git}`}>
        {git}
      </Link>
    </div>
  );
};

export default PersonalCard;

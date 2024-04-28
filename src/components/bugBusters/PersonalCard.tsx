import Image from 'next/image';
import React from 'react';
import type { StaticImageData } from 'next/image';
interface PersonalCardProps {
  name: string;
  position: string;
  image: StaticImageData;
}
const PersonalCard: React.FC<PersonalCardProps> = ({ name, position, image }) => {
  return (
    <div className="relative flex h-96 w-80 flex-col items-center justify-center gap-3 p-1">
      <div className="relative h-80 w-80 items-center justify-center rounded-full bg-disable-color">
        <Image
          sizes="300px"
          placeholder="empty"
          fill={true}
          src={image}
          alt="클래스 이미지"
          style={{ objectFit: 'contain' }}
        />
      </div>
      <p className="text-lg font-semibold text-dark-purple-color">{name}</p>
      <p className="text-dark-purple-color">{position}</p>
    </div>
  );
};

export default PersonalCard;

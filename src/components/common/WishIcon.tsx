import React from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';

export interface WishIconProps {
  handleWishClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isWished: boolean;
  wishCount: number | null | undefined;
}

const WishIcon = ({ handleWishClick, isWished, wishCount }: WishIconProps) => {
  return (
    <button onClick={(e) => handleWishClick(e)} className="flex flex gap-1 items-center justify-center text-sm ">
      <span>{isWished ? <GoHeartFill color="red" size={18} /> : <GoHeart color="dimgray" size={20} />}</span>
      <span>{wishCount}</span>
    </button>
  );
};

export default WishIcon;

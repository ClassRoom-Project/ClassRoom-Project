import React from 'react';
import { DetailCommentType } from '@/types/detailComment';
import Image from 'next/image';
import defaultProfile from '../../assets/images/profile-image.png';
import noImage from '@/assets/images/no_img.jpg';

const CommentsCard = ({ comment }: { comment: DetailCommentType }) => {
  const Stars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <input
        key={star}
        type="radio"
        name={comment.comment_id}
        className="mask bg-[#6C5FF7] mask-star-2"
        disabled
        checked={comment.star >= star}
      />
    ));
  };

  return (
    <div className="flex flex-col   rounded-lg p-4 w-full   mx-auto">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center gap-2">
          <Image
            src={comment.profile_image || defaultProfile}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full border"
          />
          <h5 className="text-lg font-bold  text-text-dart-gray">{comment.nickname}</h5>
        </div>
        <div className="rating rating-sm">{Stars()}</div>
      </div>

      <div className="flex w-full">
        <div className="w-full flex flex-col justify-between pl-8">
          <p className="text-gray-800 ml-5 mt-1 text-sm">{comment.content}</p>
          <div className="text-right text-gray-500 text-sm">{new Date(comment.create_at).toLocaleDateString()}</div>
        </div>
        <div className="flex items-center justify-center">
          {comment.comment_image && (
            <div className="w-28 h-28 items-center justify-center flex relative mr-5 xl:h-64 xl:w-64">
              <Image
                src={comment.comment_image}
                alt="uploaded image preview"
                fill
                className="h-full w-full object-cover rounded-[20px] border"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentsCard;

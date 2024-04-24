import React from 'react';
import { DetailCommentType } from '@/types/detailComment';
import Image from 'next/image';
import DefaultProfile from '../../assets/images/profile-image.png';
import noImage from '@/assets/images/no_img.jpg';

const CommentsCard = ({ comment }: { comment: DetailCommentType }) => {
  console.log(comment);
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
    <div className="flex  rounded-lg w-full p-5 gap-4 justify-between">
      <div className="w-full">
        {/* 프로필  */}
        <div className="flex items-center gap-2 mb-1">
          <div className="flex items-center justify-center gap-2">
            <Image
              src={comment.profile_image || DefaultProfile}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full border"
            />
            <h5 className="text-lg font-bold  text-text-dart-gray">{comment.nickname}</h5>
          </div>
          <div className="rating rating-sm">{Stars()}</div>
        </div>

        {/* 내용 */}
        <div className="flex gap-2 ml-12 min-h-36">
          <div className="w-full flex flex-col justify-between ">
            <p className="text-gray-800 ">{comment.content}</p>
            <div className="text-right text-gray-500 text-sm">{new Date(comment.create_at).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        {comment.comment_image ? (
          <div className="w-28 h-28 items-center justify-center flex relative xl:h-48 xl:w-48">
            <Image
              src={comment.comment_image}
              alt="uploaded image preview"
              fill
              className="h-full w-full object-cover rounded-[20px] border"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CommentsCard;

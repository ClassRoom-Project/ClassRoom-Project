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
        readOnly
        checked={comment.star >= star}
      />
    ));
  };
  return (
    <div className="bg-white flex mb-10 rounded-lg h-[300px] p-4 max-w-[1000px] w-full mt-5  mx-auto">
      <div className="flex items-center justify-center">
        <div className="w-28 h-28 items-center justify-center flex relative mr-5 xl:h-64 xl:w-64">
          {comment.comment_image ? (
            <Image
              src={comment.comment_image}
              alt="uploaded image preview"
              fill
              className="h-full w-full object-cover rounded-[20px] border"
            />
          ) : (
            <Image src={noImage} alt="no image" fill className="h-full w-full object-cover rounded-[20px] border" />
          )}
        </div>
      </div>
      <div className="flex flex-col justify-between py-5 flex-grow">
        <div>
          <div>
            <div className="flex justify-between">
              <div className="flex items-center justify-center mb-4">
                <Image
                  src={comment.profile_image || defaultProfile}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full border"
                  unoptimized={true}
                />
                <h5 className="text-lg font-bold ml-2 text-text-color">{comment.nickname}</h5>
                <p className="text-sm ml-2 text-gray-500">{comment.job}</p>
              </div>
              <div className="rating rating-sm">{Stars()}</div>
            </div>
          </div>
          <p className="text-gray-800 ml-5 mt-1 text-sm">{comment.content}</p>
        </div>
        <div className="flex justify-end items-center mt-4">
          <div className="text-right text-gray-500 text-xs">{new Date(comment.create_at).toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentsCard;

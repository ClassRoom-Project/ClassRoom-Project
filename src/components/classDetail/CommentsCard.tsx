import React from 'react';
import { DetailCommentType } from '@/types/detailComment';
import Image from 'next/image';
import defaultProfile from '../../assets/images/profile-image.png';

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
    <div className="bg-disable-color mb-5 rounded-lg p-4 shadow-xl max-w-[1000px] w-full mt-5 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="flex justify-center items-center">
            <div className="w-10 h-10 rounded-full  mr-3">
              <Image
                src={comment.profile_image || defaultProfile}
                alt="Profile"
                className="rounded-full"
                unoptimized={true}
                width={30}
                height={30}
              />
            </div>
            <h5 className="text-lg text-text-color font-bold">{comment.nickname}</h5>
            <p className="text-sm ml-2 text-white">{comment.job}</p>
          </div>
        </div>
        <div className="flex">
          <div className="rating rating-sm">{Stars()}</div>
        </div>
      </div>
      <div>
        <p className="text-gray-800 overflow-hidden w-[800px] h-28 text-sm">{comment.content}</p>
      </div>
      <div className="text-right text-gray-500 text-xs">{new Date(comment.create_at).toLocaleDateString()}</div>
    </div>
  );
};

export default CommentsCard;

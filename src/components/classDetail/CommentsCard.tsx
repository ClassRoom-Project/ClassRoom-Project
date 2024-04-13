import React from 'react';
import { DetailCommentType } from '@/types/detailComment';
import Image from 'next/image';

const CommentsCard = ({ comment }: { comment: DetailCommentType }) => {
  console.log('11111', comment);
  return (
    <div className="bg-white shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full mr-3">
            <Image src={comment.profile_image} alt="Profile" unoptimized={true} width={30} height={30} />
          </div>
          <div>
            <h5 className="text-lg font-bold">{comment.nickname}</h5>
            <p className="text-sm text-gray-600">{comment.job}</p>
          </div>
        </div>
        <div className="flex">
          <div className="rating rating-sm">
            <input type="radio" name="rating-9" className="rating-hidden" />
            <input type="radio" name="rating-9" className="mask mask-star-2" />
            <input type="radio" name="rating-9" className="mask mask-star-2" checked />
            <input type="radio" name="rating-9" className="mask mask-star-2" />
            <input type="radio" name="rating-9" className="mask mask-star-2" />
            <input type="radio" name="rating-9" className="mask mask-star-2" />
          </div>
        </div>
      </div>
      <div>
        <p className="text-gray-800 text-sm">{comment.content}</p>
      </div>
      <div className="text-right text-gray-500 text-xs">{new Date(comment.create_at).toLocaleDateString()}</div>
    </div>
  );
};

export default CommentsCard;

'use client';

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createDetailComment } from '@/app/api/classdetail/detailComment';

const CreateComments = ({ classId, userId }: { classId: string | undefined; userId: string | undefined }) => {
  const [content, setContent] = useState('');
  const [star, setStar] = useState<number | undefined>();

  const { mutate, isPending, isError, error } = useMutation(createDetailComment);

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleStarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStar(parseInt(event.target.value));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!content || !star) {
      alert('별점과 댓글을 모두 입력해주세요.');
      return;
    }
    mutate({ classId, userId, content, star });
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError && error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-w-full bg-white rounded-xl border-[#6C5FF7] border-[1px] border-solid p-4">
      <form onSubmit={handleSubmit}>
        <div className="rating rating-sm">
          {[1, 2, 3, 4, 5].map((num) => (
            <input
              key={num}
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-[#5373FF]"
              value={num}
              onChange={handleStarChange}
              checked={star === num}
            />
          ))}
        </div>
        <textarea
          className="w-full h-24 p-2 border rounded-md"
          placeholder="댓글을 입력해주세요."
          value={content}
          onChange={handleContentChange}
        ></textarea>
        <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          댓글 등록
        </button>
      </form>
    </div>
  );
};

export default CreateComments;

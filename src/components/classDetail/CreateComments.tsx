'use client';

import React, { useState } from 'react';
import { createDetailComment } from '@/app/api/classdetail/detailComment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { commentWarning, commentLoginWarning } from '../common/Toastify';
import { useSession } from 'next-auth/react';
import { getUserIdByEmail } from '@/app/api/userEmail/loginUserId';
import { getLoginUserType } from '@/types/authUser/authUserTypes';

//Todo : 예약한 사람만 댓글 입력가능하게 하기
const CreateComments = ({ classId }: { classId: string | undefined }) => {
  const [content, setContent] = useState('');
  const [star, setStar] = useState<number | undefined>();
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const email = session?.user?.email;
  const userId: Promise<getLoginUserType> | undefined = email ? getUserIdByEmail(email) : undefined;

  const { mutate, error, status } = useMutation({
    mutationKey: ['createDetailComment'],
    mutationFn: () => createDetailComment(classId, star, userId, content),
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries();
      setContent('');
      setStar(0);
    }
  });
  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleStarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStar(parseInt(event.target.value));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!content || !star) {
      commentWarning();
      return;
    }
    if (!userId) {
      commentLoginWarning();
      return;
    }
    mutate();
  };

  if (status == 'pending') {
    return <div>Loading...</div>;
  }

  if (status == 'error') {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <ToastContainer />
      <div className="w-[1000px] bg-white rounded-xl shadow-2xl border-solid p-4">
        <form onSubmit={handleSubmit}>
          <div className="rating rating-sm flex justify-end items-center">
            {[1, 2, 3, 4, 5].map((num) => (
              <input
                key={num}
                type="radio"
                name="rating"
                className="mask mask-star-2 mb-1 bg-[#5373FF]"
                value={num}
                onChange={handleStarChange}
                checked={star === num}
              />
            ))}
          </div>
          <textarea
            className="w-full h-24 p-2 border rounded-md"
            placeholder="후기을 입력해주세요."
            value={content}
            onChange={handleContentChange}
          ></textarea>
          <button type="submit" className="mt-2 bg-[#5373FF] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            후기 등록
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateComments;

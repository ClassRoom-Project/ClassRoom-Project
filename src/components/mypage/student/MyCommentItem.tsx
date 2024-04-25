import { updateMyComment } from '@/app/api/mypage/my-comments-api';
import Stars from '@/components/common/Stars';
import { noChangedNotify, successDeleteReservation } from '@/components/common/Toastify';
import { useDeleteComment } from '@/hooks/useEditComment';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { MyCommentType, NewCommentType } from '@/types/comments';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';

const MyCommentItem = ({ comment }: { comment: MyCommentType }) => {
  const { loginUserId } = useLoginStore();

  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(comment.content);

  const queryClient = useQueryClient();

  const commentId = comment.comment_id;

  // 후기 삭제 mutaion
  const { mutate: deleteCommentMutation } = useDeleteComment();

  // 후기 수정 mutation
  const { mutate: updateCommentMutation } = useMutation({
    mutationFn: ({ newContent, commentId }: NewCommentType) => updateMyComment({ newContent, commentId }, loginUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments']
      });
    }
  });

  const handleOnChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewContent(e.target.value);
  };

  // 수정 & 완료 버튼
  const handleOnClickEditBtn = (commentId: string) => {
    if (isEditing) {
      if (newContent !== comment.content) {
        const confirm = window.confirm('수정하시겠습니까?');
        if (confirm) {
          updateCommentMutation({ newContent, commentId });
          setIsEditing((prev) => !prev);
        }
        return;
      } else {
        noChangedNotify();
      }
    } else {
      setIsEditing((prev) => !prev);
    }
  };

  // 삭제 & 취소 버튼
  const handleOnClickDeleteCancleBtn = (commentId: string) => {
    if (isEditing) {
      const confirm = window.confirm('취소하시겠습니까?');
      if (confirm) {
        setNewContent(comment.content);
        setIsEditing((prev) => !prev);
      }
      return;
    } else {
      const confirm = window.confirm('삭제하시겠습니까?');
      if (confirm) {
        deleteCommentMutation(commentId);
        setIsEditing((prev) => !prev);
        successDeleteReservation();
      }
      return;
    }
  };

  // 날짜 포멧
  const formattedDate = new Date(comment.create_at).toLocaleDateString();
  const formattedTime = new Date(comment.create_at).toLocaleTimeString();

  // 별 표시하기
  const rating = comment.star;

  return (
    <li
      className="align-center flex w-full flex-col items-center justify-center border-b-2 md:my-4 md:flex-row md:gap-4 md:py-4 lg:max-w-[1280px]"
      key={comment.comment_id}
    >
      <div className="flex w-full flex-col items-center justify-center bg-pale-purple md:gap-4 lg:flex-row">
        <div className="relative h-52 w-72 lg:w-1/3 ">
          <Image src={comment.image[0]} alt="클래스 대표 사진" fill className="h-full w-full object-cover p-4" />
        </div>
        <div className="flex h-full w-full flex-col gap-4 p-4">
          <section className="flex flex-col gap-4 lg:flex-row lg:gap-10">
            <p className="whitespace-nowrap text-lg font-bold text-dark-purple-color sm:text-xl">{comment.title}</p>
            <p className="flex gap-4 whitespace-nowrap text-sm sm:text-base">
              <span>작성일 : {formattedDate}</span> <span>{formattedTime}</span>
            </p>
          </section>
          <div>
            <Stars rating={rating} />
          </div>
          <section className="flex w-full flex-col items-center pb-4 text-sm sm:text-base md:items-start">
            {isEditing ? (
              <textarea
                name=""
                placeholder="후기를 작성해봅시다"
                id=""
                className="textarea textarea-bordered h-full w-full md:w-4/5"
                value={newContent}
                onChange={handleOnChangeComment}
              />
            ) : (
              <p className="h-full w-full md:w-4/5">{comment.content}</p>
            )}
          </section>
          <section className="flex w-full items-center justify-center gap-4 p-2 md:gap-4 lg:right-4 lg:justify-end">
            <button
              onClick={() => handleOnClickEditBtn(commentId)}
              className="btn  w-1/3 text-xs hover:bg-transparent hover:text-text-dark-gray md:w-36 md:text-sm"
            >
              {isEditing ? '완료하기' : '수정하기'}
            </button>
            <button
              onClick={() => handleOnClickDeleteCancleBtn(commentId)}
              className="btn  w-1/3 bg-dark-purple-color  text-xs text-white hover:bg-transparent hover:text-dark-purple-color md:w-36 md:text-sm"
            >
              {isEditing ? '취소하기' : '삭제하기'}
            </button>

            <button className="btn w-1/3 whitespace-nowrap  bg-point-purple text-xs text-white hover:bg-transparent hover:text-point-purple md:w-36 md:text-sm">
              <Link href={`list/detail/${comment.class_id}`}>클래스 보러가기 </Link>
            </button>
          </section>
        </div>
      </div>
    </li>
  );
};

export default MyCommentItem;

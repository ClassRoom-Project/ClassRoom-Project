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
      className="border-b-2 flex flex-col align-center md:gap-4 md:my-4 md:py-4 w-full md:flex-row justify-center items-center lg:max-w-[1280px]"
      key={comment.comment_id}
    >
      <div className="flex md:gap-4 bg-pale-purple w-full flex-col lg:flex-row justify-center items-center">
        <div className="lg:w-1/3 w-2/3 h-60 relative ">
          <Image src={comment.image[0]} alt="클래스 대표 사진" fill className="w-full h-full p-4 object-cover" />
        </div>
        <div className="flex flex-col p-4 gap-4 w-full h-full">
          <section className="flex lg:gap-10 lg:flex-row flex-col gap-4">
            <p className="font-bold sm:text-xl text-lg whitespace-nowrap text-dark-purple-color">{comment.title}</p>
            <p className="flex gap-4 text-sm sm:text-base whitespace-nowrap">
              <span>작성일 : {formattedDate}</span> <span>{formattedTime}</span>
            </p>
          </section>
          <div>
            <Stars rating={rating} />
          </div>
          <section className="pb-4 flex flex-col items-center md:items-start w-full sm:text-base text-sm">
            {isEditing ? (
              <textarea
                name=""
                placeholder="후기를 작성해봅시다"
                id=""
                className="w-full md:w-4/5 h-full textarea textarea-bordered"
                value={newContent}
                onChange={handleOnChangeComment}
              />
            ) : (
              <p className="w-full md:w-4/5 h-full">{comment.content}</p>
            )}
          </section>
          <section className="flex lg:justify-end justify-center gap-4 md:gap-4 p-2 lg:right-4 items-center w-full">
            <button
              onClick={() => handleOnClickEditBtn(commentId)}
              className="btn  md:w-36 w-1/3 hover:bg-transparent text-xs md:text-sm hover:text-text-dark-gray"
            >
              {isEditing ? '완료하기' : '수정하기'}
            </button>
            <button
              onClick={() => handleOnClickDeleteCancleBtn(commentId)}
              className="btn  bg-dark-purple-color text-white  md:w-36 w-1/3 hover:bg-transparent text-xs md:text-sm hover:text-dark-purple-color"
            >
              {isEditing ? '취소하기' : '삭제하기'}
            </button>

            <button className="btn bg-point-purple text-white  md:w-36 w-1/3 whitespace-nowrap hover:bg-transparent text-xs md:text-sm hover:text-point-purple">
              <Link href={`list/detail/${comment.class_id}`}>클래스 보러가기 </Link>
            </button>
          </section>
        </div>
      </div>
    </li>
  );
};

export default MyCommentItem;

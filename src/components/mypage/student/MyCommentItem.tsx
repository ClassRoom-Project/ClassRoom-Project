import { updateMyComment } from '@/app/api/mypage/my-comments-api';
import Stars from '@/components/common/Stars';
import { noChangedNotify } from '@/components/common/Toastify';
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
  // const { star, setStar } = useRatingStore();
  // console.log('star', star);

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
        // alert('수정 사항이 없습니다.');
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
    <li className="p-4 flex gap-4 border-y border-y-border-color w-full" key={comment.comment_id}>
      <div className="w-[300px] h-[200px]">
        <Image
          src={comment.image[0]}
          alt="클래스 대표 사진"
          width={300}
          height={200}
          className="w-full h-full p-4"
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="p-4">
        <section className="flex gap-8">
          <p className="font-bold text-xl text-dark-purple-color">{comment.title}</p>
          <div className="flex gap-4">
            <p>
              작성일 : {formattedDate} {formattedTime}
            </p>
          </div>
        </section>
        <div className="pt-4">
          <p>{rating}</p>
          <Stars rating={rating} />
        </div>
        <section className="pt-4">
          {isEditing ? (
            <textarea
              name=""
              placeholder="후기를 작성해봅시다"
              id=""
              className="w-[500px] h-[100px] textarea textarea-bordered"
              value={newContent}
              onChange={handleOnChangeComment}
            />
          ) : (
            <p className="w-[500px] h-[100px] py-4-">{comment.content}</p>
          )}

          <div className="flex justify-end gap-4 ">
            {isEditing ? (
              <div>
                <button onClick={() => handleOnClickEditBtn(commentId)} className="btn w-36">
                  완료하기
                </button>{' '}
                <ToastContainer />
              </div>
            ) : (
              <button onClick={() => handleOnClickEditBtn(commentId)} className="btn w-36">
                수정하기
              </button>
            )}
            {isEditing ? (
              <button
                onClick={() => handleOnClickDeleteCancleBtn(commentId)}
                className="btn  bg-dark-purple-color text-white w-36"
              >
                취소하기
              </button>
            ) : (
              <button
                onClick={() => handleOnClickDeleteCancleBtn(commentId)}
                className="btn  bg-dark-purple-color text-white w-36"
              >
                삭제하기
              </button>
            )}
            <Link href={`list/detail/${comment.class_id}`}>
              <button className="btn bg-point-purple text-white w-36">클래스 보러가기</button>
            </Link>
          </div>
        </section>
      </div>
    </li>
  );
};

export default MyCommentItem;

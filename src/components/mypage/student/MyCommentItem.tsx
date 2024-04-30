import { updateMyComment } from '@/app/api/mypage/my-comments-api';
import Stars from '@/components/common/Stars';
import { noChangedNotify, noInfoNotify, successDeleteReservation } from '@/components/common/Toastify';
import { useDeleteComment } from '@/hooks/useEditComment';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { MyCommentType, NewCommentType } from '@/types/comments';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import NoImage from '@/assets/images/clroom_no_img_purple.png';

const MyCommentItem = ({ comment }: { comment: MyCommentType }) => {
  const { loginUserId } = useLoginStore();
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newStar, setNewStar] = useState(5);
  const queryClient = useQueryClient();
  const commentId = comment.comment_id;

  useEffect(() => {
    setNewContent(comment.content || '');
    setNewStar(comment.star || 5);
  }, [comment]);

  // 후기 삭제 mutaion
  const { mutate: deleteCommentMutation } = useDeleteComment();

  // 후기 수정 mutation
  const { mutate: updateCommentMutation } = useMutation({
    mutationFn: ({ newContent, newStar, commentId }: NewCommentType) =>
      updateMyComment({ newContent, newStar, commentId }, loginUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments']
      });
      setIsEditing(false);
    }
  });

  const handleOnChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value.trim();
    setNewContent(newContent);
  };
  const handleOnChangeStar = (rating: number) => {
    setNewStar(rating);
  };

  // console.log('newContent', newContent);
  // console.log('newStar', newStar);

  // 수정 & 완료 버튼
  const handleOnClickEditBtn = (commentId: string) => {
    if (isEditing) {
      const isCommentChanged = newContent !== comment?.content;
      // console.log('newContent', newContent);
      // console.log(comment.content);
      const isStarChanged = newStar !== comment?.star;
      // console.log('newStar', newStar);
      // console.log(comment.star);

      if (!newContent.trim()) {
        noInfoNotify();
        return;
      }

      // 수정 사항이 없는 경우
      if (!isCommentChanged) {
        noChangedNotify();
        return;
      } else {
        try {
          if (window.confirm('수정하시겠습니까?')) {
            updateCommentMutation({ newContent, newStar, commentId });
            setIsEditing((prev) => !prev);
          }
        } catch (error) {
          console.error('후기 수정하기 에러', error);
          return;
        }
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
      <div className="lg flex w-full flex-col items-center justify-center bg-pale-purple md:gap-4 lg:flex-row lg:justify-start">
        <div className="items-center justify-center">
          {comment.comment_image ? (
            <div className="relative mt-4 h-52 w-72 md:mt-8 lg:mx-8 lg:mt-0">
              <Image
                src={comment.comment_image}
                alt="클래스 대표 사진"
                fill={true}
                sizes="288px"
                className="p-4 md:p-0"
                style={{ objectFit: 'cover' }}
              />
            </div>
          ) : (
            <div className=" relative mt-4 hidden h-52 w-72 md:mt-8 lg:mx-8 lg:mt-0 lg:flex">
              <Image src={NoImage} alt="클래스 대표 사진" fill className="h-full w-full object-cover p-4 md:p-0 " />
            </div>
          )}
        </div>
        <div className="flex h-full w-full flex-col gap-4 p-4 lg:w-[960px]">
          <section className="flex flex-col gap-4 md:pb-4 lg:pb-0 lg:pt-8 xl:flex-row ">
            <div className="flex w-full justify-center gap-4 lg:justify-start">
              <p className="w-full text-base font-bold text-dark-purple-color sm:whitespace-nowrap sm:text-xl">
                {comment.title}
              </p>
            </div>
            <p className="flex gap-4 text-sm text-text-dark-gray sm:whitespace-nowrap sm:text-base">
              <span>작성일 : {formattedDate}</span> <span>{formattedTime}</span>
            </p>
          </section>
          <div className="py-2">
            {/* {isEditing ? (
              <div className="rating">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <input
                    key={rating}
                    type="radio"
                    name="rating-2"
                    className={`mask mask-star-2 mb-1 ${rating ? 'bg-main-color' : 'bg-button-focus-color'} `}
                    value={rating}
                    onChange={() => handleOnChangeStar(rating)}
                    checked={newStar === rating}
                  />
                ))}
              </div>
            ) : ( */}
            <div className="rating">
              {[1, 2, 3, 4, 5].map((rating) => (
                <input
                  key={rating}
                  type="radio"
                  name="rating-2"
                  className={`mask mask-star-2 mb-1 bg-main-color`}
                  checked={comment.star >= rating}
                  disabled
                />
              ))}
            </div>
            {/* )} */}
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
              onClick={() => handleOnClickDeleteCancleBtn(commentId)}
              className="btn  w-1/3 text-xs hover:bg-transparent hover:text-text-dark-gray md:w-36 md:text-sm"
            >
              {isEditing ? '취소하기' : '삭제하기'}
            </button>
            <button
              onClick={() => handleOnClickEditBtn(commentId)}
              className="btn w-1/3 whitespace-nowrap bg-dark-purple-color text-xs text-white  hover:bg-transparent hover:text-dark-purple-color md:w-36 md:text-sm"
            >
              {isEditing ? '완료하기' : '수정하기'}
            </button>
            <button className="btn w-1/3 whitespace-nowrap  bg-point-purple text-xs text-white hover:bg-transparent hover:text-point-purple md:w-36 md:text-sm">
              <Link href={`list/detail/${comment.class_id}`}>클래스 상세보기</Link>
            </button>
          </section>
        </div>
      </div>
    </li>
  );
};

export default MyCommentItem;

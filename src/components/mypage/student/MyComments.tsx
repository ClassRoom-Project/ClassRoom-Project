'use client';

import { fetchClassInfoOnComment, updateMyComments } from '@/app/api/mypage/my-comments-api';

import { userId } from '@/app/(clrm)/mypage/page';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { MouseEventHandler, useEffect, useState } from 'react';
import Image from 'next/image';

const MyComments = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [newContent, setNewContent] = useState('');

  const { data: myComments, isPending } = useQuery({
    queryKey: ['comments'],
    queryFn: () => fetchClassInfoOnComment(userId)
  });

  // console.log('myComments', myComments);

  // useEffect(
  //   (commentId: string) => {
  //     const eachComment = myComments?.find((comment) => comment.comment_id === commentId);
  //     if (eachComment) {
  //       setNewContent(eachComment.content);
  //     }
  //   },
  //   [myComments]
  // );

  const handleOnChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewContent(e.target.value);
  };

  // 수정하기 버튼 클릭
  const handleOnClickEditBtn = (commentId: string) => {
    setEditingCommentId(commentId);
  };

  // 후기 수정 완료 버튼 클리시
  const handleOnClickCompleteEditCommentBtn = (commentId: string) => {
    const editingComment = myComments?.find((comment) => comment.comment_id === commentId);
    if (!editingComment) {
      alert('해당 후기를 찾을 수 없습니다.');
      return;
    }

    if (editingComment.content === newContent) {
      alert('수정 사항이 없습니다.');
      return;
    }

    // 수정 사항이 있는 경우
    updateMyComments({ commentId, newContent });
    setEditingCommentId(null);
    setIsEditing(false);
    alert('후기 수정이 완료되었습니다.');
  };

  // 취소하기 버튼
  const handleOnClickCancleBtn = () => {
    setIsEditing(false);
    alert('후기 수정이 취소 되었습니다. ');
  };

  if (isPending) {
    return <div> 로딩중 ... </div>;
  }

  if (!myComments) {
    return <div> 내가 작성한 후기가 없습니다.</div>;
  }

  return (
    <ul className="flex flex-col flex-wrap">
      {myComments.map((comment, index) => (
        <li className="p-4 flex gap-4 border-y border-y-pale-color" key={index}>
          <div className="w-[300px] h-[200px]">
            {/* img 파일 불러오는 부분은 아직 수정 중입니다. */}
            <img
              src="https://d1x9f5mf11b8gz.cloudfront.net/class/20220308/ec9fa67b-0040-413d-ae8b-258d46df07c4.jpg"
              alt="클래스 대표 사진"
              width={300}
              height={200}
              className="w-full h-full p-4"
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className="p-4">
            <section className="flex gap-8">
              <p className="font-bold text-xl text-text-color">{comment.title}</p>
              <div className="flex gap-4">
                <span>작성 시간 : {comment.create_at}</span>
              </div>
            </section>
            <section className="pt-4">
              {isEditing ? (
                <textarea
                  name=""
                  placeholder="후기를 작성해봅시다"
                  id=""
                  className="w-[500px] h-[100px] textarea textarea-bordered"
                  value={comment.content}
                  onChange={handleOnChangeComment}
                />
              ) : (
                <p className="w-[500px] h-[100px] py-4-">{comment.content}</p>
              )}

              <div className="flex justify-end gap-4 ">
                {isEditing ? (
                  <button onClick={handleOnClickCompleteEditCommentBtn} className="btn">
                    완료
                  </button>
                ) : (
                  <button onClick={handleOnClickEditBtn} className="btn">
                    수정
                  </button>
                )}
                {isEditing ? (
                  <button className="btn  bg-point-color text-white" onClick={handleOnClickCancleBtn}>
                    취소
                  </button>
                ) : (
                  <button className="btn  bg-point-color text-white">삭제</button>
                )}
                <Link href={`list/detail/${comment.class_id}`}>
                  <button className="btn bg-[#A4BEFF] text-white w-[150px]">클래스 보러가기</button>
                </Link>
              </div>
            </section>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MyComments;

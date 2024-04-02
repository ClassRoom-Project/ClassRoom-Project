'use client';

import { getMyComments, updateMyComments } from '@/app/api/mypage/my-comments-api';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import MyClassImage from '../../../../public/class-sample-img.jpeg';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { comment } from 'postcss';
import { userId } from '@/app/(clrm)/mypage/page';

const MyComments = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState('');

  const { data: myComments, isPending } = useQuery({
    queryKey: ['comments', userId],
    queryFn: () => getMyComments()
  });

  console.log('myComments', myComments);

  // useEffect((commentId : string)=>{
  //   const eachComment = myComments?.find((comment) => comment.comment_id === commentId);
  // if(eachComment){
  //   setNewContent(eachComment.content)
  // }

  // },[myComments])

  const handleOnChangeComment = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewContent(e.target.value);
  };

  // 후기 수정하기
  const handleOnClickEditComment = () => {
    // const eachComment = myComments?.find((comment) => comment.comment_id === commentId);
    // if (!eachComment) {
    //   alert('해당 후기를 찾을 수 없습니다.');
    //   return;
    // }

    // const isCommentChanged = newContent !== myComments[0].content;
    // if (!isCommentChanged) {
    //   alert('수정 사항이 없습니다.');
    //   return;
    // }

    // 수정 사항이 있는 경우
    updateMyComments({ newContent });
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
    <ul className="flex flex-col">
      {myComments.map((comment, index) => (
        <li className="flex  gap-4" key={index}>
          <div className="w-[300px] h-[200px]">
            <Image
              src={MyClassImage}
              alt="클래스 대표 사진"
              width={300}
              height={200}
              className="w-full h-full p-4"
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* dummyData로 임시로 넣은 클래스 정보 부분입니다.*/}
          <div className=" p-4">
            <section className="flex gap-8">
              <p className="font-bold">맛있는 쿠키 만들기 클래스</p>
              <div className="flex gap-4">
                <span>2024-04-15</span>
                <time>15:00</time>
              </div>
            </section>

            <section className="p-4">
              {isEditing ? (
                <textarea
                  name=""
                  placeholder="후기를 작성해봅시다"
                  id=""
                  className="w-[500px] h-[100px] border"
                  value={comment.content}
                  onChange={handleOnChangeComment}
                />
              ) : (
                <p className="w-[500px] h-[100px] m-4">{comment.content}</p>
              )}

              <div className="flex justify-end gap-4 ">
                {isEditing ? (
                  <button onClick={handleOnClickEditComment} className="p-4 border rounded-xl w-[150px]">
                    수정 완료
                  </button>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="p-4 border rounded-xl w-[150px]">
                    수정하기
                  </button>
                )}
                {isEditing ? (
                  <button
                    className="border rounded-xl p-2 w-[150px]  bg-rose-500 text-white"
                    onClick={handleOnClickCancleBtn}
                  >
                    취소
                  </button>
                ) : (
                  <button className="border rounded-xl p-2 w-[150px]  bg-rose-500 text-white">삭제</button>
                )}
              </div>
            </section>
            <div className=" flex justify-end">
              <Link href={`list/detail/${comment.class_id}`}>
                <button className="border rounded-xl p-4 w-[150px]">클래스 보러가기</button>
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MyComments;

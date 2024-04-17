'use client';

import React, { useState } from 'react';
import { createDetailComment } from '@/app/api/classdetail/detailComment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { commentWarning, commentLoginWarning, commentStarWarning } from '../common/Toastify';
import { useSession } from 'next-auth/react';
import { getUserIdByEmail } from '@/app/api/userEmail/loginUserId';
import { ListDetailClassInfo } from '@/types/class';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { ImageFileWithPreview } from '@/types/register';
import { supabase } from '@/app/api/supabase/supabase';
import Image from 'next/image';
import noImage from '@/assets/images/no_img.jpg';

//Todo : 예약한 사람만 댓글 입력가능하게 하기 , 댓글 수정삭제 구현 ,사진 기능
const CreateComments = ({ classData }: { classData: ListDetailClassInfo | null }) => {
  const [content, setContent] = useState('');
  const [star, setStar] = useState<number | undefined>(undefined);
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { loginUserId } = useLoginStore();
  const [commentImage, setCommentImage] = useState<ImageFileWithPreview[]>([]);

  const email: string = session?.user?.email ?? '';
  const { data: userData } = useQuery({
    queryKey: ['getUserIdByEmail'],
    queryFn: () => getUserIdByEmail(email),
    enabled: !!email
  });

  const userId: string | undefined = userData?.user_id;

  // 파일 업로드시 업로드 형식에 맞지 않는 이름 변경!
  function cleanFileName(fileName: string) {
    return fileName.replace(/[^a-zA-Z0-9.]/g, '_');
  }

  // supabase storage에 등록한 이미지 업로드
  const uploadFile = async (file: File) => {
    const cleanName = cleanFileName(file.name);
    const filePath = `uploads/${classData?.class_id}_${cleanName}`;
    const { data, error } = await supabase.storage.from('commentsImages').upload(filePath, file);
    if (error) {
      return null;
    } else {
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/commentsImages/${data?.path}`;
      return url;
    }
  };
  const handleCommentImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {};
  const { mutate, error, status } = useMutation({
    mutationKey: ['createDetailComment'],
    mutationFn: () => createDetailComment(classData?.class_id, star, userId, content, commentImage),
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries();
      setContent('');
      setStar(0);
    }
  });

  //onchange Content
  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
  //onchange star
  const handleStarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStar(parseInt(event.target.value));
  };

  //후기 등록
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!content.trim() || content.trim().length < 10) {
      commentWarning();
      return;
    }
    if (!star) {
      commentStarWarning();
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
      {classData?.reserve?.some((reserve) => reserve.user_id === `${loginUserId}`) ? (
        <div className="w-[1000px] bg-disable-color rounded-xl shadow-2xl border-solid p-4">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="image-upload"
                className="border border-[#6C5FF7] bg-[#E3E1FC] text-black text-sm p-1 rounded-full hover:bg-[#CAC6FC] hover:border-[#6C5FF7] cursor-pointer"
              >
                사진추가
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleCommentImageChange}
                style={{ display: 'none' }}
              />
              <Image
                src={commentImage[0].preview || noImage}
                alt="uploaded"
                fill
                className="h-full w-full object-cover rounded-[20px] border"
              />
            </div>
            <div className="w-[600px] flex flex-col justify-center items-start">
              <div className="rating min-w-full rating-sm flex justify-end items-center">
                {[1, 2, 3, 4, 5].map((num) => (
                  <input
                    key={num}
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 mb-1 bg-[#6C5FF7]"
                    value={num}
                    onChange={handleStarChange}
                    checked={star === num}
                  />
                ))}
              </div>
              <textarea
                minLength={10}
                maxLength={100}
                className="w-full h-24 p-2 border rounded-md"
                placeholder="후기을 입력해주세요.(10자 이상)"
                value={content}
                onChange={handleContentChange}
              ></textarea>
              <button
                type="submit"
                className="mt-2 bg-[#6C5FF7] hover:bg-button-hover-color text-white font-bold py-2 px-4 rounded"
              >
                후기 등록
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default CreateComments;

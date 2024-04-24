'use client';

import React, { useState } from 'react';
import { createDetailComment } from '@/app/api/classdetail/detailComment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { commentWarning, commentLoginWarning, commentStarWarning } from '../common/Toastify';
import { useSession } from 'next-auth/react';
import { getUserIdByEmail } from '@/app/api/userEmail/loginUserId';
import { ListDetailClassInfo } from '@/types/class';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { ImageFileWithPreview } from '@/types/register';
import { supabase } from '@/app/api/supabase/supabase';
import Image from 'next/image';
import noImage from '@/assets/images/clroom_no_img_purple.png';

//Todo : 예약한 사람만 댓글 입력가능하게 하기 , 댓글 수정삭제 구현 ,사진 기능
const CreateComments = ({ classData }: { classData: ListDetailClassInfo | null }) => {
  const [content, setContent] = useState('');
  const [star, setStar] = useState<number | undefined>(undefined);
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { loginUserId } = useLoginStore();
  const [commentImage, setCommentImage] = useState<ImageFileWithPreview[]>([]);
  const [dataBaseImage, setDataBaseImage] = useState<string>('');
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
    console.log(file);
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

  const handleCommentImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const preview = URL.createObjectURL(file); // 선택된 파일(file)의 미리보기 임시 URL을 생성!
      const newImages = [...commentImage, { file, preview }];
      setCommentImage(newImages);
    }
  };
  const { mutate, error, status } = useMutation({
    mutationKey: ['createDetailComment'],
    mutationFn: () => createDetailComment(classData?.class_id, star, userId, content, dataBaseImage),
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries();
      setContent('');
      setStar(0);
      setCommentImage([]);
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
  const handleCommentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
    const imageUrls = [];

    for (const image of commentImage) {
      const url = await uploadFile(image.file);
      if (url) {
        imageUrls.push(url);
      }
    }
    setDataBaseImage(imageUrls[0]);
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
        <div className="w-[600px] mb-8 flex-col border border-solid border-button-focus-color flex justify-center items-center bg-disable-color rounded-xl shadow-md px-8 pt-6 pb-4 xl:w-full">
          <form onSubmit={handleCommentSubmit} className="flex justify-center items-center flex-col w-full">
            <div className="w-[400px] xl:w-full  flex items-end justify-between gap-4">
              <div className="w-[75%] flex flex-col">
                <div className="rating rating-sm flex justify-end items-center">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <input
                      key={num}
                      type="radio"
                      name="rating"
                      className="mask mask-star-2 mb-1 bg-main-color"
                      value={num}
                      onChange={handleStarChange}
                      checked={star === num}
                    />
                  ))}
                </div>
                <textarea
                  minLength={10}
                  maxLength={150}
                  className="w-full h-52 p-4 rounded-md resize-none border border-solid border-button-focus-color outline-none"
                  placeholder="후기를 입력해주세요. (10자 이상)"
                  value={content}
                  onChange={handleContentChange}
                ></textarea>
              </div>
              <div className="w-[25%]">
                <div className="flex items-center justify-end mb-1">
                  <label
                    htmlFor="image-upload"
                    className="text-text-dark-gray flex border border-button-press-color bg-[#E3E1FC] transition-all text-sm p-1 rounded-md w-fit px-2 justify-center items-center hover:bg-[#CAC6FC] hover:border-main-color cursor-pointer"
                  >
                    <p>사진 추가</p>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleCommentImageChange}
                    style={{ display: 'none' }}
                  />
                </div>
                <div className="w-full h-full rounded-md  items-center justify-center flex relative xl:h-52 border border-solid border-button-focus-color">
                  {commentImage.length > 0 ? (
                    <Image
                      src={commentImage[0].preview}
                      alt="uploaded image preview"
                      fill
                      className="h-full w-full object-cover rounded-md "
                    />
                  ) : (
                    <Image
                      src={noImage}
                      alt="no image"
                      fill
                      style={{ objectFit: 'cover' }}
                      className="h-full w-full object-cover rounded-md "
                    />
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 transition-all bg-main-color hover:bg-button-hover-color text-white py-2 px-6 rounded-md"
            >
              후기 등록
            </button>
          </form>
        </div>
      ) : (
        <div className="flex justify-center items-center h-40 w-[600px] rounded-lg bg-disable-color shadow-xl xl:w-full">
          클래스를 예약하신 분만 리뷰 등록이 가능합니다.
        </div>
      )}
    </>
  );
};

export default CreateComments;

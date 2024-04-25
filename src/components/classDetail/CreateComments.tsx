'use client';

import React, { useEffect, useState } from 'react';
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
    const filePath = `uploads/${crypto.randomUUID()}_${cleanName}`;
    const { data, error } = await supabase.storage.from('commentsImages').upload(filePath, file);
    if (error) {
      console.log(error, 'error');
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
      const newImages = [{ file, preview }];
      setCommentImage(newImages);
    }
  };

  const { mutate, error, status } = useMutation({
    mutationKey: ['createDetailComment'],
    mutationFn: createDetailComment,
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
    let imageUploadUrl = null;
    if (commentImage && commentImage.length > 0) {
      const newImage = await uploadFile(commentImage[0].file);
      imageUploadUrl = newImage;
    }
    mutate({
      classId: classData?.class_id,
      star: star,
      userId: userId,
      content: content,
      comment_image: imageUploadUrl
    });
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
        <div className="mb-8 flex w-[600px] flex-col items-center justify-center rounded-xl border border-solid border-button-focus-color bg-disable-color px-8 pb-4 pt-6 shadow-md xl:w-full">
          <form onSubmit={handleCommentSubmit} className="flex w-full flex-col items-center justify-center">
            <div className="flex w-[400px]  items-end justify-between gap-4 xl:w-full">
              <div className="flex w-[75%] flex-col">
                <div className="rating rating-sm flex items-center justify-end">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <input
                      key={num}
                      type="radio"
                      name="rating"
                      className={`mask mask-star-2 mb-1 ${star ? 'bg-main-color' : 'bg-button-focus-color'} `}
                      value={num}
                      onChange={handleStarChange}
                      checked={star === num}
                    />
                  ))}
                </div>
                <textarea
                  minLength={10}
                  maxLength={350}
                  className="h-52 w-full resize-none rounded-md border border-solid border-button-focus-color p-4 outline-none"
                  placeholder="후기를 입력해주세요. (10자 이상)"
                  value={content}
                  onChange={handleContentChange}
                ></textarea>
              </div>
              <div className="w-[25%]">
                <div className="mb-1 flex items-center justify-end">
                  <label
                    htmlFor="image-upload"
                    className="flex w-fit cursor-pointer items-center justify-center rounded-md border border-button-press-color bg-[#E3E1FC] p-1 px-2 text-sm text-text-dark-gray transition-all hover:border-main-color hover:bg-[#CAC6FC]"
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
                <div className="relative flex h-full  w-full items-center justify-center rounded-md border border-solid border-button-focus-color xl:h-52">
                  {commentImage.length > 0 ? (
                    <Image
                      src={commentImage[0].preview}
                      alt="uploaded image preview"
                      fill
                      className="h-full w-full rounded-md object-cover "
                    />
                  ) : (
                    <Image
                      src={noImage}
                      alt="no image"
                      fill
                      style={{ objectFit: 'cover' }}
                      className="h-full w-full rounded-md object-cover "
                    />
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 rounded-md bg-main-color px-6 py-2 text-white transition-all hover:bg-button-hover-color"
            >
              후기 등록
            </button>
          </form>
        </div>
      ) : (
        <div className="mb-4 flex h-40 w-[600px] items-center justify-center rounded-lg bg-disable-color shadow-xl xl:w-full">
          클래스를 예약하신 분만 리뷰 등록이 가능합니다.
        </div>
      )}
    </>
  );
};

export default CreateComments;

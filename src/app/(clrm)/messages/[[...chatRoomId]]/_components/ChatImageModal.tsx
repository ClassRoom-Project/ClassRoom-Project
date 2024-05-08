import { DragEvent, useRef, useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { useCreateNewPhotoMessage } from '@/hooks/useChatRoom/useNewChatRoom';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import Image from 'next/image';
import { uploadPhotosToSupabase } from '@/app/api/chatRooms/getChatRooms';
import { ChatImageeModalType } from '@/types/chat/chatTypes';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function ChatImageModal({ chatId, closeModal }: ChatImageeModalType) {
  const [photos, setPhotos] = useState<File[]>([]);
  const [showImage, setShowImage] = useState<string[]>([]);
  const [countError, setCountError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { createNewPhotoMessageMutate } = useCreateNewPhotoMessage();
  const { loginUserId } = useLoginStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    if (files && files.length > 0) {
      if (photos.length >= 5) {
        setCountError('사진은 최대 5개까지 업로드 가능합니다.');
        return;
      }

      const validFiles: File[] = [];
      const fileURLs: string[] = [];

      Array.from(files).forEach((file) => {
        if (file.size > maxFileSize) {
          setCountError('파일 크기가 5MB를 초과할 수 없습니다.');
          return;
        }

        if (validFiles.length < 5 - photos.length) {
          validFiles.push(file);
          fileURLs.push(URL.createObjectURL(file));

          setCountError('사진은 최대 5개까지 업로드 가능합니다.');
          return;
        }
      });

      setPhotos((prevPhotos) => [...prevPhotos, ...validFiles]);
      setShowImage((prevPhotos) => [...prevPhotos, ...fileURLs]);
      if (validFiles.length > 0) {
        setCountError('');
      }
    }
  };

  //드래그앤 드롭 참고 블로그 https://medium.com/@iamkjw/react-drag-drop%EC%9C%BC%EB%A1%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%88%9C%EC%84%9C-%EB%B3%80%EA%B2%BD%ED%95%98%EA%B8%B0-415e348e2855
  //드래그 시작 이벤트
  //드래그 시작 시 드래그한 이미지의 인덱스를 dataTransfer객체에 저장
  const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData('dragIndex', index.toString());
  };

  //드래그중인 이미지가 드롭 가능한 위치로 이동할 때 발생
  //브라우저는 드롭을 허용하지 않는다고 함!! preventDefault 매서드를 호출해서 허용 시켜줘야함
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  //드래그한 이미지를 적합한 드롭 영역에 놓을때 발생
  const handleOnDrop = (e: DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();

    const dragIndex = parseInt(e.dataTransfer.getData('dragIndex'));
    if (dragIndex === dropIndex) return;

    const updatedShowImages = [...showImage];
    const dragShowImage = updatedShowImages.splice(dragIndex, 1)[0];
    updatedShowImages.splice(dropIndex, 0, dragShowImage);
    setShowImage(updatedShowImages);

    const updatedPhotos = [...photos];
    const dragPhoto = updatedPhotos.splice(dragIndex, 1)[0];
    updatedPhotos.splice(dropIndex, 0, dragPhoto);
    setPhotos(updatedPhotos);
  };

  const handleDeletePhoto = (index: number) => {
    setIsLoading(true);
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
    setShowImage((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
    setIsLoading(false);
  };

  //테스트중
  // const handleAddClick = (index: number) => {
  //   if (index === showImage.length && photos.length < 5) {
  //     fileInputRef.current?.click();
  //   }
  // };

  const handleSendButton = async () => {
    setIsLoading(true);
    if (!loginUserId) {
      console.error('loginUserId is null');
      setIsLoading(false);
      return;
    }

    // 여기서 photos 배열에 저장된 File 객체들을 서버에 업로드하고,
    // 성공적으로 업로드된 파일의 URL을 반환
    const uploadedPhotoUrls = await uploadPhotosToSupabase(photos);

    createNewPhotoMessageMutate({ photos: uploadedPhotoUrls, chatId, loginUserId });

    // 상태 초기화
    setShowImage([]);
    setPhotos([]);
    closeModal(false);
  };

  const handleClose = () => {
    closeModal(false);
  };

  return (
    <div className="fixed inset-0 flex h-full w-full items-center justify-center bg-gray-300 bg-opacity-50 ">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <LoadingSpinner />
        </div>
      )}
      <div className=" sm:1/3 md:1/5 h-2/8 flex flex-col items-center justify-center rounded-xl bg-white px-1 md:w-auto">
        <div className="flex w-full flex-wrap items-center justify-center">
          {[...Array(5)].map((_, index) => {
            if (index < showImage.length) {
              // 이미지가 있는 경우
              return (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleOnDrop(e, index)}
                  className="mg-5 relative ml-2 mt-2 h-24 w-24 md:h-32 md:w-32"
                >
                  <Image
                    src={showImage[index]}
                    alt={`preview-${index}`}
                    fill
                    className="h-full w-full rounded-[20px] border object-cover "
                  />
                  <button onClick={() => handleDeletePhoto(index)} className="absolute right-1 top-1 text-lg">
                    <RiCloseCircleLine className="text-3xl text-button-default-color" />
                  </button>
                </div>
              );
            } else {
              // 이미지가 없는 빈 슬롯
              return (
                <label
                  key={index}
                  htmlFor="photos"
                  className=" mx-1 my-1 flex h-24 w-24 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-xs md:h-36 md:w-36"
                >
                  <input
                    type="file"
                    name="photos"
                    id="photos"
                    accept="image/*"
                    hidden
                    multiple
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  ></input>
                  클릭!
                </label>
              );
            }
          })}
        </div>
        {countError && <p className="mt-1 text-sm text-red-500">{countError}</p>}
        <div className="mb-2 mt-3 flex w-full flex-row items-center justify-center gap-10">
          <button
            onClick={handleClose}
            className="flex h-8 w-3/12 items-center justify-center rounded-lg bg-[#CAC6FC] text-sm hover:bg-button-hover-color md:w-2/12 lg:text-base"
          >
            취소
          </button>
          <button
            onClick={handleSendButton}
            type="submit"
            className="flex h-8 w-3/12 items-center justify-center rounded-lg bg-[#CAC6FC] text-sm hover:bg-button-hover-color hover:text-white md:w-2/12 lg:text-base"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}

import { DragEvent, useRef, useState } from 'react';
import { MdPhotoCamera } from 'react-icons/md';
import { RiCloseCircleLine } from 'react-icons/ri';
import { useCreateNewPhotoMessage } from '@/hooks/useChatRoom/useNewChatRoom';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import Image from 'next/image';
import { uploadPhotosToSupabase } from '@/app/api/chatRooms/getChatRooms';
import { BsSend } from 'react-icons/bs';
import { ChatImageeModalType } from '@/types/chat/chatTypes';

export default function ChatImageModal({ chatId, closeModal }: ChatImageeModalType) {
  const [photos, setPhotos] = useState<File[]>([]);
  const [showImage, setShowImage] = useState<string[]>([]);
  const [countError, setCountError] = useState('');
  const { createNewPhotoMessageMutate } = useCreateNewPhotoMessage();
  const { loginUserId } = useLoginStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      if (photos.length > 4) {
        setCountError('사진은 최대 5개까지 업로드 가능합니다.');
        return;
      }
      const selectedFiles = Array.from(e.target.files).slice(0, 5);
      setPhotos((prevPhotos) => [...prevPhotos, ...selectedFiles]);

      const newPhotosArray = selectedFiles.map((file) => URL.createObjectURL(file));
      setShowImage((prevPhotos) => [...prevPhotos, ...newPhotosArray]);
      setCountError('');
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
    setShowImage((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handleAddClick = (index: number) => {
    if (index === showImage.length && photos.length < 5) {
      fileInputRef.current?.click();
    }
  };

  const handleSendButton = async () => {
    if (!loginUserId) {
      console.error('loginUserId is null');
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
    <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center h-full w-full ">
      <div className=" px-1 flex flex-col md:w-auto sm:1/3 md:1/5 h-2/8 items-center justify-center bg-white rounded-xl">
        <label htmlFor="photo" className=" cursor-pointer">
          <MdPhotoCamera className="text-main-color text-2xl right-12 bottom-2 hover:text-button-hover-color" />
        </label>
        <input
          type="file"
          name="photo"
          id="photo"
          accept="image/*"
          hidden
          multiple
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        <div className="w-full flex flex-wrap items-center justify-center">
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
                  className="h-[142px] w-[142px] relative ml-2 mt-2 mg-5"
                >
                  <Image
                    src={showImage[index]}
                    alt={`preview-${index}`}
                    fill
                    className="h-full w-full object-cover rounded-[20px] border"
                  />
                  <button onClick={() => handleDeletePhoto(index)} className="absolute right-1 top-1 text-lg">
                    <RiCloseCircleLine className="text-button-default-color text-3xl" />
                  </button>
                </div>
              );
            } else {
              // 이미지가 없는 빈 슬롯
              return (
                <div
                  key={index}
                  className="h-[142px] w-[142px] ml-2 mt-2 border-2 border-dashed border-gray-300 rounded-[20px]"
                  onClick={() => handleAddClick(index)}
                ></div>
              );
            }
          })}
        </div>
        {countError && <p className="text-red-500 text-sm mt-1">{countError}</p>}
        <div className="flex flex-row gap-10 mt-3 w-full justify-center items-center mb-2">
          <button
            onClick={handleClose}
            className="bg-[#CAC6FC] rounded-lg w-1/12 h-8 flex items-center justify-center hover:bg-button-hover-color"
          >
            취소
          </button>
          <button
            onClick={handleSendButton}
            type="submit"
            className="bg-[#CAC6FC] rounded-lg w-1/12 h-8 flex items-center justify-center hover:bg-button-hover-color hover:text-white"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}

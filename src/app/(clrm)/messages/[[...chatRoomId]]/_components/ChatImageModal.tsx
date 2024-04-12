import { DragEvent, useState } from 'react';
import { MdPhotoCamera } from 'react-icons/md';
import { RiCloseCircleLine } from 'react-icons/ri';
import { useCreateNewPhotoMessage } from '@/hooks/useChatRoom/useNewChatRoom';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import Image from 'next/image';

export default function ChatImageModal({ chatId }: { chatId: string }) {
  console.log('chatId', chatId);

  const [photos, setPhotos] = useState<string[]>([]);
  const [countError, setCountError] = useState('');
  const { createNewPhotoMessageMutate } = useCreateNewPhotoMessage();
  const { loginUserId } = useLoginStore();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      if (photos.length > 4) {
        setCountError('사진은 최대 5개까지 업로드 가능합니다.');
        return;
      }
      const selectedFiles = Array.from(e.target.files).slice(0, 5);
      const newPhotosArray = selectedFiles.map((file) => URL.createObjectURL(file));
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotosArray]);
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

    const updatedPhotos = [...photos];
    const dragItem = updatedPhotos.splice(dragIndex, 1)[0];
    updatedPhotos.splice(dropIndex, 0, dragItem);
    setPhotos(updatedPhotos);
  };

  const handleDeletePhoto = (index: number) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handleSendButton = () => {
    if (!loginUserId) {
      console.error('loginUserId is null');
      return;
    }
    createNewPhotoMessageMutate({ photos, chatId, loginUserId });
    setPhotos([]);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <label htmlFor="photo" className=" cursor-pointer">
          <MdPhotoCamera className="text-main-color text-2xl right-12 bottom-2 hover:text-button-hover-color" />
        </label>

        <input type="file" name="photo" id="photo" accept="image/*" hidden multiple onChange={handleImageChange} />
        <div className="w-full flex flex-row">
          {photos.map((image, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleOnDrop(e, index)}
              style={{ margin: 5 }}
              className="relative"
            >
              <Image src={image} alt={`preview-${index}`} width={100} height={100} />
              <button onClick={() => handleDeletePhoto(index)} className="absolute right-1 top-1 text-lg">
                <RiCloseCircleLine className=" text-button-default-color text-xl" />
              </button>
            </div>
          ))}
        </div>
        <button onClick={handleSendButton}>전송</button>
      </div>
      {countError && <p className="text-red-500">{countError}</p>}
    </div>
  );
}

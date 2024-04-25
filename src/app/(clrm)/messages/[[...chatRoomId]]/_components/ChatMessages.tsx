'use client';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useCreateNewMessage, useDeleteRoom, useReadMakeClassUserInfo } from '@/hooks/useChatRoom/useNewChatRoom';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { ChatMessagesType } from '@/types/chat/chatTypes';
import ChatImageModal from './ChatImageModal';
import MessageBoxs from './MessageBoxs';
import { useState } from 'react';
import { deleteRoom } from '@/components/common/Toastify';
import { useRouter } from 'next/navigation';
//아이콘
import { MdPhotoCamera } from 'react-icons/md';
import { IoIosLogOut } from 'react-icons/io';
import { BsSend } from 'react-icons/bs';
import { TbArrowBack } from 'react-icons/tb';

export default function ChatMessages({ mainImage, fromUserId, chatId, otherId, title, toClassId }: ChatMessagesType) {
  const [imageModal, setImageModal] = useState(false);
  const { loginUserId } = useLoginStore();
  const { createNewMessageMutate } = useCreateNewMessage();
  const { MakeClassUserInfo } = useReadMakeClassUserInfo(fromUserId);
  const { deleteRoomMutate } = useDeleteRoom();
  const router = useRouter();

  const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get('message') as string;

    if (!loginUserId) {
      console.error('loginUserId is null');
      return;
    }

    const trimmedMessage = message.replace(/\s/g, '');
    if (trimmedMessage.length === 0) {
      return;
    }

    createNewMessageMutate({ message, loginUserId, chatId });
    (e.target as HTMLFormElement).reset();
  };

  const handleDelete = () => {
    const confirm = window.confirm('방을 나가시겠습니까?');
    if (confirm) {
      deleteRoomMutate(chatId);
      deleteRoom();
      router.replace('/messages');
      return;
    } else {
      return;
    }
  };

  const handleOpenModal = () => {
    setImageModal(true);
  };

  const handleBack = () => {
    router.replace('/messages');
  };

  const studentName = MakeClassUserInfo?.nickname;

  if (!chatId) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="border-grey-100 sticky top-0 flex w-full justify-between border-b bg-[#EFEFFF] p-4">
        <p className="text-sm font-bold md:text-lg">클래스명: {title}</p>
        <button onClick={handleDelete}>
          <IoIosLogOut className="text-2xl text-button-default-color hover:text-button-hover-color" />
        </button>
      </div>
      <button onClick={handleBack} className="flex flex-row items-center pl-2 pt-2 text-sm md:hidden">
        뒤로가기
        <TbArrowBack className="text-xl" />
      </button>
      <MessageBoxs
        toClassId={toClassId}
        title={title}
        fromUserId={fromUserId}
        chatId={chatId}
        otherId={otherId}
        studentName={studentName!}
        mainImage={mainImage}
      />
      <div className="flex w-full items-center justify-center border-t border-gray-300 bg-white py-8">
        <div className="relative flex h-14 w-full px-4 md:w-4/5 lg:h-16 lg:py-2">
          <form onSubmit={handleSubmitMessage} className="flex h-full w-full items-center rounded-md border px-2">
            <input
              type="text"
              name="message"
              autoComplete="off"
              placeholder="메시지를 입력하세요"
              className="flex-1 bg-transparent px-3 outline-0"
            />
            <div className="w-1/4">
              <button
                type="submit"
                className="absolute right-6 flex h-8 w-8 items-center justify-center rounded-lg bg-[#CAC6FC]"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
              >
                <BsSend className="text-xl text-main-color" />
              </button>
            </div>
          </form>
          <button
            className="absolute right-16 flex h-8 w-8 items-center justify-center rounded-lg bg-[#CAC6FC]"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
            onClick={handleOpenModal}
          >
            <MdPhotoCamera className="text-xl text-main-color" />
          </button>
        </div>
      </div>
      {imageModal && <ChatImageModal chatId={chatId} closeModal={setImageModal} />}
    </div>
  );
}

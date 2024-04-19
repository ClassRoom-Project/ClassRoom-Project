'use client';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useCreateNewMessage, useDeleteRoom, useReadMakeClassUserInfo } from '@/hooks/useChatRoom/useNewChatRoom';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { ChatMessagesType } from '@/types/chat/chatTypes';
import ChatImageModal from './ChatImageModal';
import MessageBoxs from './MessageBoxs';
import { useEffect, useState } from 'react';
import { supabase } from '@/app/api/supabase/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { deleteRoom } from '@/components/common/Toastify';
import { useRouter } from 'next/navigation';
//아이콘
import { MdPhotoCamera } from 'react-icons/md';
import { IoIosLogOut } from 'react-icons/io';
import { BsSend } from 'react-icons/bs';

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

  const studentName = MakeClassUserInfo?.nickname;

  if (!chatId) {
    return (
      <div className="h-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col w-full">
      <div className="flex justify-between border-b border-grey-100 p-4 sticky top-0 w-full bg-[#EFEFFF]">
        <p className="sm:text-sm md:text-lg font-bold ">클래스명: {title}</p>
        <button onClick={handleDelete}>
          <IoIosLogOut className="text-2xl text-button-default-color hover:text-button-hover-color" />
        </button>
      </div>
      <MessageBoxs
        toClassId={toClassId}
        title={title}
        fromUserId={fromUserId}
        chatId={chatId}
        otherId={otherId}
        studentName={studentName!}
        mainImage={mainImage}
      />
      <div className="w-full flex justify-center items-center bg-white py-8 border-t border-gray-300">
        <div className="px-4 py-2 w-4/5 h-16 flex relative ">
          <form onSubmit={handleSubmitMessage} className="rounded-md border w-full h-full items-center px-2  flex ">
            <input
              type="text"
              name="message"
              autoComplete="off"
              placeholder="메시지를 입력하세요"
              className="outline-0 bg-transparent flex-1 px-3"
            />
            <button type="submit" className="bg-[#CAC6FC] rounded-lg w-8 h-8 flex items-center justify-center">
              <BsSend className="text-xl text-main-color" />
            </button>
          </form>
          <button className="bg-[#CAC6FC] rounded-lg w-8 h-8 flex items-center justify-center mr-1 absolute right-16 bottom-4">
            <MdPhotoCamera className="text-xl text-main-color" onClick={handleOpenModal} />
          </button>
        </div>
      </div>
      {imageModal && <ChatImageModal chatId={chatId} closeModal={setImageModal} />}
    </div>
  );
}

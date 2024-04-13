"use client";
import React, { useState, useEffect } from 'react'
import { supabase } from '@/app/api/supabase/supabase';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useRouter } from 'next/navigation';

import { LuBell } from 'react-icons/lu';
import { GoBellFill } from "react-icons/go";

interface Notification {
  notice_id: string;
  user_id: string;
  notice: string;
  created_at: string;
  isread: boolean;
  class_id: string
}

const NotificationComponent = () => {
  const { loginUserId } = useLoginStore();
  const [isBellFilled, setIsBellFilled] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', loginUserId)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setNotifications(data);
      } else {
        console.error('알림 데이터를 가져오는데 실패했습니다.', error);
      }
    };

    fetchNotifications();
  }, [loginUserId]);

  const toggleBellIcon = () => {
    setIsBellFilled(!isBellFilled);
  };

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isread) {
      // 알림 읽음 처리
      const { error } = await supabase
        .from('notifications')
        .update({ isread: true })
        .eq('notice_id', notification.notice_id);

      if (error) {
        console.error('알림 읽음 처리 실패', error);
      } else {
        setNotifications(prevNotifications =>
          prevNotifications.map(notif => 
            notif.notice_id === notification.notice_id ? {...notif, isread: true} : notif
          )
        );
      }
    }
    // 클래스 페이지로 이동
    router.push(`/list/detail/${notification.class_id}`);
  };

  return (
    <div className="mr-2.5 relative">
      {isBellFilled || notifications.some(notif => !notif.isread) ? (
        <GoBellFill size={30} onClick={toggleBellIcon} className="cursor-pointer" />
      ) : (
        <LuBell size={30} onClick={toggleBellIcon} className="cursor-pointer" />
      )}
      {isBellFilled && (
        <div className="absolute right-[-8px] mt-2 w-60 bg-white shadow-lg rounded-md z-10">
          <div className="px-4 py-2 font-bold border-b border-gray-200">알림</div>
          {notifications.map((notification, index) => (
            <div key={index} className={`px-4 py-2 border-b border-gray-200 last:border-b-0 flex items-center cursor-pointer hover:bg-gray-100 ${notification.isread ? 'bg-gray-300' : ''}`} onClick={() => handleNotificationClick(notification)}>
              <span className="h-5 w-5 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
              <span className='text-sm'>{notification.notice}</span>
            </div>
          ))}
        </div>
      )}
      <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
        {notifications.filter(notification => !notification.isread).length}
      </span>
    </div>
  );
}

export default NotificationComponent

"use client";
import React, { useState, useEffect, useRef } from 'react'
import { supabase } from '@/app/api/supabase/supabase';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useRouter } from 'next/navigation';
import { Notification } from '@/types/notice';

import { LuBell } from 'react-icons/lu';
import { GoBellFill } from "react-icons/go";

const NotificationComponent = () => {
  const { loginUserId } = useLoginStore();
  const [isBellFilled, setIsBellFilled] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const router = useRouter();
  const notificationRef = useRef<HTMLDivElement>(null);
  const lastIconClickTimeRef = useRef<Date | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', loginUserId)
        .order('created_at', { ascending: false });
    
      if (!error && data) {
        const unreadNotifications = data.filter(n => !n.isread);
        setNotifications(unreadNotifications);
        setIsBellFilled(unreadNotifications.length > 0);
      } else {
        console.error('알림 데이터를 가져오는데 실패했습니다.', error);
      }
    };
    
    fetchNotifications();
  }, [loginUserId]);

  const toggleBellIcon = () => {
    setIsBellFilled(!isBellFilled);
    setIsNotificationOpen(prevState => !prevState);
    lastIconClickTimeRef.current = new Date(); // 아이콘 클릭 시간 기록
  };

  // 바깥 영역 클릭시 알림창 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const timeSinceLastIconClick = lastIconClickTimeRef.current ? new Date().getTime() - lastIconClickTimeRef.current.getTime() : null;
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node) &&
        (!timeSinceLastIconClick || timeSinceLastIconClick > 200)
      ) {
        setIsNotificationOpen(false);
      }
    };
  
    if (isNotificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationOpen, notifications]);

  // 알림 클릭시
  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isread) {
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
    router.push(`/list/detail/${notification.class_id}`);
  };

  return (
    <div className="mr-2.5 relative" ref={notificationRef}>
      {(isBellFilled || notifications.some(notif => !notif.isread)) ? (
        <GoBellFill size={30} onClick={toggleBellIcon} className="cursor-pointer" />
      ) : (
        <LuBell size={30} onClick={toggleBellIcon} className="cursor-pointer" />
      )}
      {isNotificationOpen && (
        <div className="absolute mt-2 w-80 bg-white shadow-lg rounded-md z-10">
          <div className="px-4 py-2 font-bold border-b border-gray-200">알림</div>
          <div className="max-h-60 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div 
                  key={index} 
                  className={`px-4 py-3 cursor-pointer flex items-center hover:bg-[#EFEFEF] ${notification.isread ? 'bg-gray-300' : ''} ${index !== notifications.length - 1 ? 'border-b border-gray-200' : ''}`} onClick={() => handleNotificationClick(notification)}>
                    <span className="h-4 w-4 bg-[#7D95FF] rounded-full mr-2 flex-shrink-0"></span>
                    <span className='text-sm'>{notification.notice}</span>
                </div>
              ))
            ) : (
              <div className="px-4 py-10 text-center text-sm">알림이 없습니다.</div>
            )}
          </div>
        </div>
      )}
      {notifications.filter(notification => !notification.isread).length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {notifications.filter(notification => !notification.isread).length}
        </span>
      )}
    </div>
  );
}


export default NotificationComponent

import React, { useRef, useEffect } from 'react';
import { supabase } from '@/app/api/supabase/supabase';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useRouter } from 'next/navigation';
import { Notification } from '@/types/notice';
import { useQuery } from '@tanstack/react-query';
import { LuBell } from 'react-icons/lu';
import { GoBellFill } from "react-icons/go";

const NotificationComponent = () => {
  const { loginUserId } = useLoginStore();
  const router = useRouter();
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const lastIconClickTimeRef = useRef<Date | null>(null);

  const { data: notifications = [], refetch } = useQuery({
    queryKey: ['notifications', loginUserId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', loginUserId)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    enabled: !!loginUserId,
    refetchInterval: 10000,
  });

  const unreadNotificationsCount = notifications.filter(notification => !notification.isread).length;

  const toggleBellIcon = () => {
    setIsNotificationOpen(prevState => !prevState);
    lastIconClickTimeRef.current = new Date();
  };

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

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isread) {
      const { error } = await supabase
        .from('notifications')
        .update({ isread: true })
        .eq('notice_id', notification.notice_id);

      if (error) {
        console.error('Failed to mark notification as read', error);
      } else {
        refetch();
      }
    }
    router.push(`/list/detail/${notification.class_id}`);
  };

  return (
    <div className="mr-2.5 relative" ref={notificationRef}>
      {(unreadNotificationsCount > 0) ? (
        <GoBellFill size={30} onClick={toggleBellIcon} className="cursor-pointer" />
      ) : (
        <LuBell size={30} onClick={toggleBellIcon} className="cursor-pointer" />
      )}
      {isNotificationOpen && (
        <div className="absolute right-[-8px] mt-2 w-80 bg-white shadow-lg rounded-md z-10">
          <div className="px-4 py-2 font-bold border-b border-gray-200">알림</div>
          <div className="max-h-60 overflow-y-auto">
            {notifications.filter(notification => !notification.isread).length > 0 ? (
              notifications.filter(notification => !notification.isread).map((notification, index) => (
                <div 
                  key={index} 
                  className={`px-4 py-3 cursor-pointer flex items-center hover:bg-[#EFEFEF] ${notification.isread ? 'bg-gray-300' : ''}`} 
                  onClick={() => handleNotificationClick(notification)}
                >
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
};

export default NotificationComponent;

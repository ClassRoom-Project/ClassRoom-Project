import React, { useRef, useEffect } from 'react';
import { supabase } from '@/app/api/supabase/supabase';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useRouter } from 'next/navigation';
import { Notification } from '@/types/notice';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LuBell } from 'react-icons/lu';
import { GoBellFill } from "react-icons/go";

const NotificationComponent = () => {
  const { loginUserId } = useLoginStore();
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const lastIconClickTimeRef = useRef<Date | null>(null);

  const router = useRouter();
  const queryClient = useQueryClient();

  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     await queryClient.invalidateQueries({
  //       queryKey: ['notifications', loginUserId],
  //     }); 
  //     const params = new URLSearchParams(window.location.search);
  //     const notificationParam = params.get('notification');
  //     if (notificationParam && notificationParam === 'true') {
  //       // 새로운 알림을 가져오는 함수를 직접 호출하지 않고,
  //       // 다음 줄에서 선언된 useQuery의 결과로부터 refetch를 사용합니다.
  //     }
  //   };

  //   fetchNotifications();
  // // refetch를 의존성 배열에서 제거합니다.
  // }, [queryClient, loginUserId]);

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
  });

  const unreadNotificationsCount = notifications.filter(notification => !notification.isread).length;

  useEffect(() => {
    // URL에서 'notification=true' 파라미터 확인
    const params = new URLSearchParams(window.location.search);
    if (params.get('notification') === 'true') {
      refetch(); // 조건이 만족하는 경우 refetch 호출
    }
  }, [refetch]);

  const toggleBellIcon = () => {
    setIsNotificationOpen(prevState => !prevState);
    lastIconClickTimeRef.current = new Date();
    if (!isNotificationOpen) {
      refetch(); // 알림 아이콘을 클릭하여 알림을 열 때 새로고침
    }
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

  // const handleNotificationClick = async (notification: Notification) => {
  //   if (!notification.isread) {
  //     const { error } = await supabase
  //       .from('notifications')
  //       .update({ isread: true })
  //       .eq('notice_id', notification.notice_id);

  //     if (error) {
  //       console.error('error', error);
  //     } else {
  //       refetch();
  //     }
  //   }
  //   router.push(`/list/detail/${notification.class_id}`);
  // };

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isread) {
      await supabase
        .from('notifications')
        .update({ isread: true })
        .eq('notice_id', notification.notice_id);

      refetch(); // 알림을 읽음 처리 후 새로고침
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
                className={`px-4 py-3 cursor-pointer flex items-center hover:bg-[#EFEFEF] 
                ${notification.isread ? 'bg-gray-300' : ''}
                ${index !== notifications.filter(notification => !notification.isread).length - 1 ? 'border-b border-gray-200' : ''}`}
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

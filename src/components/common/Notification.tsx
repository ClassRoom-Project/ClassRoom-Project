import React, { useRef, useEffect } from 'react';
import { supabase } from '@/app/api/supabase/supabase';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useRouter } from 'next/navigation';
import { Notification } from '@/types/notice';
import { useQuery } from '@tanstack/react-query';
import { LuBell } from 'react-icons/lu';
import { GoBellFill } from 'react-icons/go';

const NotificationComponent = () => {
  const { loginUserId } = useLoginStore(); // 로그인한 사용자의 ID
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const lastIconClickTimeRef = useRef<Date | null>(null);

  const router = useRouter();

  // 알림 데이터를 불러옴. 로그인한 사용자 ID를 기반으로 쿼리
  const { data: notifications = [], refetch } = useQuery({
    queryKey: ['notifications', loginUserId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', loginUserId)
        .order('created_at', { ascending: false }); // 내림차순 정렬(최신 알림 상단으로)

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    enabled: !!loginUserId
  });

  // isread값을 통해 읽지 않은 알림 수 계산
  const unreadNotificationsCount = notifications.filter((notification) => !notification.isread).length;

  // 알림 아이콘을 클릭시 알림 창 토글
  const toggleBellIcon = () => {
    setIsNotificationOpen((prevState) => !prevState);
    lastIconClickTimeRef.current = new Date();
    if (!isNotificationOpen) {
      refetch();
    }
  };

  // 알림창 바깥쪽 클릭시 알림창 닫기 구현
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const timeSinceLastIconClick = lastIconClickTimeRef.current
        ? new Date().getTime() - lastIconClickTimeRef.current.getTime()
        : null;
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node) &&
        (!timeSinceLastIconClick || timeSinceLastIconClick > 200)
      ) {
        setIsNotificationOpen(false);
      }
    };

    if (isNotificationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationOpen, notifications]);

  // 알림 클릭 핸들러
  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isread) {
      await supabase.from('notifications').update({ isread: true }).eq('notice_id', notification.notice_id);
      refetch(); // 알림 상태 업데이트 후 데이터 다시 가져오기
    }
    router.push(`/list/detail/${notification.class_id}`); // 해당 디테일 페이지로 이동
  };

  return (
    <div className="relative mr-2.5" ref={notificationRef}>
      {unreadNotificationsCount > 0 ? (
        <GoBellFill size={30} onClick={toggleBellIcon} className="cursor-pointer" />
      ) : (
        <LuBell size={30} onClick={toggleBellIcon} className="cursor-pointer" />
      )}
      {isNotificationOpen && (
        <div className="absolute right-[-8px] z-10 mt-2 w-64 rounded-md bg-white shadow-lg md:w-80">
          <div className="border-b border-gray-200 px-4 py-2 font-bold">알림</div>
          <div className="max-h-60 overflow-y-auto">
            {notifications.filter((notification) => !notification.isread).length > 0 ? (
              notifications
                .filter((notification) => !notification.isread)
                .map((notification, index) => (
                  <div
                    key={index}
                    className={`flex cursor-pointer items-center px-4 py-3 hover:bg-[#EFEFEF] 
                ${notification.isread ? 'bg-gray-300' : ''}
                ${
                  index !== notifications.filter((notification) => !notification.isread).length - 1
                    ? 'border-b border-gray-200'
                    : ''
                }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <span className="mr-2 h-4 w-4 flex-shrink-0 rounded-full bg-[#7D95FF]"></span>
                    <span className="text-sm">{notification.notice}</span>
                  </div>
                ))
            ) : (
              <div className="px-4 py-10 text-center text-sm">알림이 없습니다.</div>
            )}
          </div>
        </div>
      )}
      {notifications.filter((notification) => !notification.isread).length > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {notifications.filter((notification) => !notification.isread).length}
        </span>
      )}
    </div>
  );
};

export default NotificationComponent;

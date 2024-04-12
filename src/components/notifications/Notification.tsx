// import { useEffect, useState } from 'react';
// import { supabase } from '@/app/api/supabase/supabase';
// import { useLoginStore } from '@/store/login/loginUserIdStore';
// import { LuBell } from 'react-icons/lu';

// interface Notification {
//   notice_id: string;
//   user_id: string;
//   class_id: string;
//   notice: string;
//   is_read: boolean;
//   created_at: string;
// }

// const Notifications = () => {
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     const { loginUserId } = useLoginStore();
//     const userId = loginUserId;

//     if (!userId) return;

//     supabase
//       .from('notifications')
//       .select('*')
//       .eq('user_id', userId)
//       .then(({ data, error }) => {
//         if (error) {
//           console.error('Error fetching notifications', error);
//         } else {
//           setNotifications(data);
//         }
//       });

//     const subscription = supabase
//       .from('notifications')
//       .on('INSERT', (payload) => {
//         if (payload.new.user_id === userId) {
//           setNotifications((prev) => [...prev, payload.new]);
//         }
//       })
//       .subscribe();

//     return () => {
//       supabase.removeSubscription(subscription);
//     };
//   }, []);

//   const toggleNotifications = () => setIsOpen(!isOpen);

//   return (
//     <div>
//       <div className="mr-[10px]">
//             <LuBell size={30} />
//           </div>{' '}
//       <button onClick={toggleNotifications}>알림</button>
//       {isOpen && (
//         <div>
//           {notifications.map((notification) => (
//             <div key={notification.notice_id}>
//               <p>{notification.notice}</p>
//               {/* 추가적인 알림 정보 표시 */}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Notifications;

import { getUserRole } from '@/app/api/mypage/user-api';
import { useUserRoleStore } from '@/store/mypage/userRoleStore';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

// export default function useSetSessionStorage() {
//   const { data: session } = useSession();

//   useEffect(() => {
//     const userEmail = session?.user?.email ?? null;
//     if (userEmail) {
//       sessionStorage.setItem('userEmail', userEmail);
//     }
//   }, [session]);
//   return;
// }

export default function useSetSessionStorage() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    const userEmail = session?.user?.email ?? null;

    if (userEmail) {
      sessionStorage.setItem('userEmail', userEmail);
    }

    // supabase에서 isTeacher 값 불러오기
    const fetchUserRole = async () => {
      if (!userEmail) {
        console.error('이메일 값을 받아오지 못합니다.');
        return;
      }
      try {
        const userRole = await getUserRole(userEmail);
        // console.log('로그인하는 user의 role', userRole);
        const isTeacher = userRole?.isTeacher ?? false;
        useUserRoleStore.setState({ isTeacher });
      } catch (error) {
        console.error('Failed to fetch user role', error);
      }
    };
    fetchUserRole();
  }, [session]);
  return;
}

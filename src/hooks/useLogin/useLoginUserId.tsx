import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useReadLoginUserId } from './useSetEmailToApi';
import { useEffect } from 'react';

export default function useLoginUserId({ userEmail }: { userEmail: string | null }) {
  const { data: userData, isError } = useReadLoginUserId(userEmail);
  const setUserId = useLoginStore((state) => state.setLoginUserId);

  useEffect(() => {
    if (userData && userData.user_id) {
      setUserId(userData.user_id);
    }
  }, [userData, setUserId]);

  if (isError) return console.log('Faild to get userId from Store');
  return;
}

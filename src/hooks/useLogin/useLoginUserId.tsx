import { useReadLoginUserId } from './useSetEmailToApi';
import { useEffect } from 'react';
import { useLoginStore } from '@/store/login/LoginUserIdStore';

export default function useLoginUserId() {
  const userEmail = sessionStorage.getItem('userEmail');
  const { data: userData, isError } = useReadLoginUserId(userEmail);
  const setUserId = useLoginStore((state) => state.setLoginUserId);

  useEffect(() => {
    if (userData && userData.user_id) {
      setUserId(userData.user_id);
    }
  }, [userData]);

  if (isError) return console.log('Faild to get userId from Store');
  return;
}

import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSession, useSession } from 'next-auth/react';

import useNewUserStore from '@/store/authStore/store';
import { SessionUserType } from '@/types/authUser/authUserTypes';

// 세션 데이터를 가져오는 함수
const fetchSessionData = async (): Promise<SessionUserType> => {
  const session = await getSession();
  console.log('가져와?', session);
  if (!session || !session.user?.email) throw new Error('세션에서 이메일을 찾을 수 없습니다.');

  const { setEmail, setNickname, setProfileImage } = useNewUserStore();

  setEmail(session.user.email);
  setNickname(session.user.name || '');
  setProfileImage(session.user.image || '');

  // 세션 데이터 반환
  return {
    email: session.user.email,
    name: session.user.name!,
    image: session.user.image || null
  };
};

import { PostgrestMaybeSingleResponse } from '@supabase/supabase-js';
import { supabase } from './supabase/supabase';
import { UserType } from '@/types/user';
import { userId } from '@/app/mypage/page';

// User가 선생님인지 수강생인지 구분 : teacher 값 불러오기
export const getUserRole = async ({ userId }: { userId: string }) => {
  const { data: userRole, error }: PostgrestMaybeSingleResponse<UserType> = await supabase
    .from('user')
    .select('teacher')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error(error);
  }

  return userRole;
};

// User 정보 불러오기
export const getUserInfo = async () => {
  const { data: userInfo, error }: PostgrestMaybeSingleResponse<UserType> = await supabase
    .from('user')
    .select('nickname, email, password, profile_image')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error(error);
  }

  return userInfo;
};

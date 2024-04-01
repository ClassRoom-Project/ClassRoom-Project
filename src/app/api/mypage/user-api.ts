import { PostgrestMaybeSingleResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';
import { UpdateUserInfoType, UserType } from '@/types/user';
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

// User 정보 수정하기 : supabase에 update
export const updateUserInfo = async ({ newEmail, newNickname, newPassword }: UpdateUserInfoType) => {
  const { data, error } = await supabase
    .from('user')
    .update({ email: newEmail, nickname: newNickname, password: newPassword })
    .eq('user_id', userId);
  if (error) {
    console.error(error);
  }
  return data;
};

// User nickname 중복 확인하기
export const checkUserNickname = async ({ newNickname }: Pick<UpdateUserInfoType, 'newNickname'>) => {
  const { data, error } = await supabase
    .from('user')
    .select('nickname')
    .not('user_id', 'eq', userId)
    .eq('nickname', newNickname);
  if (error) {
    console.error(error.message);
    return false;
  }
  // console.log('data', data);
  return data.length > 0;
};

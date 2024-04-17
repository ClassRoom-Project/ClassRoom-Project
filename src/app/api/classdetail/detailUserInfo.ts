import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';
import { DetailUserInfoType } from '@/types/user';

export const getDetailUserInfo = async (userId: string | undefined) => {
  const { data: userInfos, error }: PostgrestSingleResponse<DetailUserInfoType> = await supabase
    .from('users')
    .select('user_id,nickname,profile_image,email')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.log('클래스 아이디 가져오기 오류 -->', error);
  }
  return userInfos;
};

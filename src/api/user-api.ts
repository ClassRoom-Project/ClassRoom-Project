import { userId } from '@/hooks/mypage/useGetUserInfo';
import { supabase } from './supabase/supabase';
import { UserType } from '@/types/user';

export const getUser = async (): Promise<UserType> => {
  const { data, error } = await supabase.from('user').select('*').eq('user_id', userId).single();
  // console.log('data', data);
  // console.log('data', typeof data);

  if (error) {
    console.error(error);
  }
  // console.log(data);
  return data;
};

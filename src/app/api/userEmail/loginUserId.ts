import { getLoginUserType } from '@/types/authUser/authUserTypes';
import { supabase } from '../supabase/supabase';

export const getUserIdByEmail = async (email: string): Promise<getLoginUserType> => {
  const { data, error } = await supabase //
    //테이블 이름
    .from('users')
    // 컬럼
    .select('user_id')
    //필터
    .eq('email', email as string)
    .single();
  if (error || !data) throw error;
  return data;
};

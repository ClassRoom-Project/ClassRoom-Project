import { PostgrestResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';
import { ClassItem } from '@/types/register';

export async function fetchMyClasses(userId: string) {
  const { data, error }: PostgrestResponse<ClassItem> = await supabase.rpc('fetch_my_reserved_classes', {
    p_user_id: userId
  });

  if (error) {
    console.error(error);
    return [];
  }
  return data;
}

// 예약 취소 함수
export async function cancelReservation(reserve_id: string) {
  const { data, error } = await supabase.from('reserve').delete().match({ reserve_id: reserve_id });

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export default fetchMyClasses;

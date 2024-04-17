import { PostgrestResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';
import { ClassItem } from '@/types/register';

export async function fetchMyClasses(loginUserId: string | null) {
  const { data, error }: PostgrestResponse<ClassItem> = await supabase.rpc(
    'fetch_my_reserved_classes_with_date_and_time',
    {
      p_user_id: loginUserId as string
    }
  );

  if (error) {
    console.error(error);
    return [];
  }
  return data;
}

// 예약 취소 함수
export async function cancelReservation(reserveId: string) {
  const { data, error } = await supabase.from('reserve').delete().match({ reserve_id: reserveId });

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export default fetchMyClasses;

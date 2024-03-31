import { ClassType } from '@/types';
import { PostgrestResponse } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { ReserveInfo } from '@/types/reserve';

export const fetchReserveInfo = async () => {
  const { data: reserveInfo, error }: PostgrestResponse<ReserveInfo> = await supabase.from('reserve').select('*');

  if (error) {
    console.error('예약 정보 불러오기 오류 => ', error);
    return;
  }

  return reserveInfo;
};

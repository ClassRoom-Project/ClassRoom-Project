import { supabase } from '../supabase/supabase';

export const fetchReserveCount = async (classId: string) => {
  const { data: reserveQuantity, error } = await supabase
    .from('class')
    .select('reserved_count')
    .eq('class_id', classId)
    .single();

  if (error) {
    console.error('fetchReserveCount 오류 발생 => ', error);
    return;
  }

  return reserveQuantity.reserved_count;
};

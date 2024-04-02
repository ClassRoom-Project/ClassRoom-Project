import { supabase } from '../supabase/supabase';

// class 테이블의 예약 인원수(reserved_count) 조회 api
// class info에서 불러오니 필요없을듯
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

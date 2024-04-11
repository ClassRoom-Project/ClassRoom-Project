import { supabase } from '../supabase/supabase';

// reserve 테이블에서 time_id로 예약 수 카운트
export const countReservationsByTimeId = async (timeId: string) => {
  const { count, error } = await supabase
    .from('reserve')
    .select('*', { count: 'exact', head: true })
    .eq('time_id', timeId);

  if (error) {
    console.log('countReservationsByTimeId 오류 => ', error);
    return;
  }

  return count;
};

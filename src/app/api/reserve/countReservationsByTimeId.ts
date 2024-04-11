import { supabase } from '../supabase/supabase';

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

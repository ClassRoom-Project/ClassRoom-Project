import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';

export const sumReserveQuantityByTimeId = async (timeId: string) => {
  const { data: currentReservedCount, error }: PostgrestSingleResponse<number> = await supabase.rpc(
    'sum_reserve_quantity_by_time_id',
    {
      target_time_id: timeId
    }
  );

  if (error) {
    console.log('sumReserveQuantityByTimeId 오류 =>', error);
    throw new Error('Server error occurred');
  }

  return currentReservedCount;
};

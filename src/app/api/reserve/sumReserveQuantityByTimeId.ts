import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';

// time_id가 같은 행의 reserve_quantity를 sum하여 반환
export const sumReserveQuantityByTimeId = async (timeId: string) => {
  const { data: currentReservedCount, error }: PostgrestSingleResponse<number> = await supabase.rpc(
    'sum_reserve_quantity_by_time_id',
    {
      target_time_id: timeId
    }
  );

  if (error) {
    console.log('sumReserveQuantityByTimeId 오류 =>', error);
    throw new Error('sumReserveQuantityByTimeId error occurred');
  }

  return currentReservedCount;
};

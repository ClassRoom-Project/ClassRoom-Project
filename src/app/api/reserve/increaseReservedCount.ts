import { supabase } from '../supabase/supabase';

export const increaseReservedCount = async ({ classId, quantity }: { classId: string; quantity: number }) => {
  const { data, error } = await supabase.rpc('increase_reserved_count', { _quantity: quantity, _class_id: classId });

  if (error) {
    console.log('increaseReservedCount 오류 발생', error);
  }
};

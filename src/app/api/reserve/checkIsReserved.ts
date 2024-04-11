import { supabase } from '../supabase/supabase';

// 예약한 클래스인지 확인
export const checkIsReserved = async ({ userId, classId }: { userId: string; classId: string }) => {
  const { data, error } = await supabase
    .from('reserve')
    .select('user_id')
    .eq('user_id', userId)
    .eq('class_id', classId);

  if (error) {
    console.log('checkIsReserved 오류 => ', error);
    return;
  }

  return data.length > 0;
};

import { supabase } from '../supabase/supabase';

// class 테이블의 reserved_user_id 배열 조회
export const fetchReservedUserIds = async ({ classId }: { classId: string }) => {
  const { data: reservedUserList, error: fetchError } = await supabase
    .from('class')
    .select('reserved_user_id')
    .eq('class_id', classId)
    .single();

  if (fetchError) {
    console.log('예약한 유저 리스트 조회 중 오류 발생 =>', fetchError);
    return;
  }

  return reservedUserList.reserved_user_id;
};

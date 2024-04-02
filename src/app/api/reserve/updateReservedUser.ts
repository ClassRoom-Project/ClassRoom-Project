import { supabase } from '../supabase/supabase';

// class 테이블의 reserved_user_id 에 예약한 유저 아이디 리스트를 업데이트하는 api
export const updateReservedUser = ({ userId, classId }: { userId: string; classId: string }) => {
  // class 테이블의 reserved_user_id 배열 조회
  const addReservedUserIds = async ({ classId }: { classId: string }) => {
    const { data: reservedUserList, error } = await supabase
      .from('class')
      .select('reserved_user_id')
      .eq('class_id', classId)
      .single();

    if (error) {
      console.log('예약한 유저 리스트 조회 중 오류 발생 =>', error);
      return;
    }

    // 기존 reserved_user_id 리스트에 예약한 유저 아이디를 추가
    // 리스트 값이 null일때 not iteration 에러 해결 필요
    const { error: addError } = await supabase
      .from('class')
      .update([{ reserved_user_id: [...reservedUserList.reserved_user_id, userId] }]) //reservedUserList : {reserved_user_id: Array(3)}
      .eq('class_id', classId)
      .select();

    if (addError) {
      console.log('예약한 유저리스트 업데이트 오류 발생 =>', error);
      return;
    }
  };

  addReservedUserIds({ classId });
};

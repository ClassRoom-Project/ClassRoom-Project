import { supabase } from '../supabase/supabase';
import { fetchReservedUserIds } from './fetchReservedUserIds';

// TODO: sql query로 바로 배열에 추가하도록 수정 필요
// class 테이블의 reserved_user_id 에 예약한 유저 아이디 리스트를 업데이트하는 api
export const updateReservedUserList = async ({ userId, classId }: { userId: string; classId: string }) => {
  // 기존 reserved_user_id 리스트 조회
  const reservedUserList = await fetchReservedUserIds({ classId });

  // 기존 reserved_user_id 리스트에 예약한 유저 아이디를 추가
  const { error } = await supabase
    .from('class')
    .upsert({
      // upsert: 새 행이 없는 경우 새 행을 삽입 / 있는 경우 업데이트
      class_id: classId, // classId가 일치하는 행이 있으면
      reserved_user_id: [userId] // reserved_user_id를 업데이트
    })
    .eq('class_id', classId)
    .select();

  if (error) {
    console.log('예약한 유저리스트 업데이트 오류 발생 =>', error);
    return;
  }
};

// .update([
//   {
//     reserved_user_id: reservedUserList ? [...reservedUserList, userId] : [userId]
//   } // 리스트 값이 null일때 처리를 위해 삼항 연산자 사용
// ])

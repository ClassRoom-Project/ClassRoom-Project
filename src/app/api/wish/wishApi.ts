import { supabase } from '../supabase/supabase';

// 찜하기 - 위시리스트에 추가
export const addWish = async ({ userId, classId }: { userId: string | undefined; classId: string }) => {
  const { error } = await supabase.from('wish').insert([{ user_id: userId, class_id: classId }]);
  console.log('addWish 실행');
  if (error) {
    console.error('addWish 에러 => ', error);
    return;
  }
};

// 찜 여부 체크
export const checkIsWished = async ({ userId, classId }: { userId: string | null; classId: string | undefined }) => {
  if (!userId || !classId) {
    return;
  }

  const { data: wishId, error } = await supabase
    .from('wish')
    .select('wish_id')
    .eq('user_id', userId)
    .eq('class_id', classId);

  if (error) {
    console.error('checkIsWished => ', error);
    return;
  }

  return wishId.length > 0;
};

// 찜 취소하기 - 위시리스트에서 삭제
export const cancelWish = async ({ userId, classId }: { userId: string | undefined; classId: string }) => {
  console.log('classId', classId);
  const { error } = await supabase.from('wish').delete().eq('user_id', userId).eq('class_id', classId);

  console.log('cancelWish 실행');

  if (error) {
    console.error('cancelWish 오류 => ', error);
    return;
  }
};

// 디테일 페이지에서 찜 정보 가져오기
export const countWish = async (classId: string | undefined) => {
  //TODO: undefined 안오게 수정 필요
  if (!classId) {
    return;
  }
  const { count, error } = await supabase
    .from('wish')
    .select('*', { count: 'exact', head: true })
    .eq('class_id', classId);

  if (error) {
    throw new Error(error.message);
  }

  console.log(count);

  return count;
};

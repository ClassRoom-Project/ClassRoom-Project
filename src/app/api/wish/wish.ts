import { supabase } from '../supabase/supabase';

export const addWish = async ({ userId, classId }: { userId: string | undefined; classId: string }) => {
  const { error } = await supabase.from('wish').insert([{ user_id: userId, class_id: classId }]);

  if (error) {
    console.error('addWish 에러 => ', error);
    return alert('스크랩을 추가하는 동안 오류가 발생했습니다.');
  }
};

// 스크랩 체크
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

import { supabase } from '../supabase/supabase';

export const addWish = async ({ userId, classId }: { userId: string | undefined; classId: string }) => {
  const { error } = await supabase.from('wish').insert([{ user_id: userId, class_id: classId }]);

  if (error) {
    console.error('addWish 에러 => ', error);
    return alert('스크랩을 추가하는 동안 오류가 발생했습니다.');
  }
};

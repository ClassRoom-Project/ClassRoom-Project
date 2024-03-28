import { supabase } from './supabase';

export const fetchClassInfo = async ({ classId }: { classId: string | null }) => {
  const { data, error } = await supabase.from('class').select('*');

  if (error) {
    console.error('클래스 정보 불러오기 오류 => ', error);
    return alert('클래스를 불러오는 동안 오류가 발생했습니다.');
  }
  return data;
};

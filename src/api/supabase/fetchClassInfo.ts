import { supabase } from './supabase';

// SSR..?
export const revalidate = 0;

export const fetchClassInfoToReserve = async ({ classId }: { classId: string | null }) => {
  const { data, error } = await supabase
    .from('class')
    .select('category, title, location, price')
    .eq('class_id', classId);

  if (error) {
    console.error('클래스 정보 불러오기 오류 => ', error);
    return alert('클래스를 불러오는 동안 오류가 발생했습니다.');
  }
  return data;
};

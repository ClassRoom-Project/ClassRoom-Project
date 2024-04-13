import { supabase } from '../supabase/supabase';

//댓글 불러오기 api
export const detailComment = async (classId: string) => {
  const { data: comments, error } = await supabase.from('comments').select('*').eq('class_id', classId);

  if (error) {
    console.error('댓글 불러오기 오류 --> ', error);
    return null;
  }

  return comments;
};

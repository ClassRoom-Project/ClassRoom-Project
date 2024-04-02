import { userId } from '@/app/mypage/page';
import { supabase } from '../supabase/supabase';
import { PostgrestResponse } from '@supabase/supabase-js';
import { MyCommentType, newCommentType } from '@/types/comments';

// 내가 쓴 후기 불러오기
export const getMyComments = async () => {
  const { data: myComments, error }: PostgrestResponse<MyCommentType> = await supabase
    .from('comments')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error(error);
  }
  // console.log('myComments', myComments);
  return myComments;
};

// 후기 수정하기 : update
export const updateMyComments = async ({ newContent }: newCommentType) => {
  const { data, error } = await supabase.from('comments').update({ content: newContent }).eq('user_id', userId);

  if (error) {
    console.error(error);
  }

  return data;
};

// 후기 삭제하기 : delete

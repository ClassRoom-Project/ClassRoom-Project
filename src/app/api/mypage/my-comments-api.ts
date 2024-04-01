import { userId } from '@/app/mypage/page';
import { supabase } from '../supabase/supabase';
import { PostgrestResponse } from '@supabase/supabase-js';
import { MyCommentType } from '@/types/comments';

export const getMyComments = async () => {
  const { data: myComments, error }: PostgrestResponse<MyCommentType> = await supabase
    .from('comments')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error(error);
  }
  console.log('myComments', myComments);
  return myComments;
};

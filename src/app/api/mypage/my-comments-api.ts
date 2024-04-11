import { MyCommentType, NewCommentType } from '@/types/comments';
import { PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';

// 후기를 작성한 클래스 정보 불러오기 : db join
export const fetchClassInfoOnComment = async (loginUserId: string | null) => {
  const { data, error }: PostgrestResponse<MyCommentType> = await supabase.rpc('fetch_class_info_on_comment_new_new', {
    p_user_id: loginUserId as string
  });

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};

// 후기 삭제하기 : delete
export const deleteMyComment = async (commentId: string, loginUserId: string | null) => {
  const { data, error } = await supabase
    .from('comments')
    .delete()
    .eq('user_id', loginUserId as string)
    .eq('comment_id', commentId)
    .select();

  if (error) {
    console.error(error);
    throw error;
  }
  return data;
};

// 후기 수정하기 : update
export const updateMyComment = async ({ newContent, commentId }: NewCommentType, loginUserId: string | null) => {
  const { data, error }: PostgrestSingleResponse<null> = await supabase
    .from('comments')
    .update({ content: newContent })
    .eq('user_id', loginUserId as string)
    .eq('comment_id', commentId);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};

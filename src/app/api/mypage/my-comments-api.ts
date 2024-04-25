import { MyCommentType, NewCommentType } from '@/types/comments';
import { PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';

// 후기를 작성한 클래스 정보 불러오기 : db join
export const fetchClassInfoOnComment = async (loginUserId: string | null) => {
  const { data, error }: PostgrestResponse<MyCommentType> = await supabase.rpc('class_info_with_comment_info', {
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
export const updateMyComment = async (
  { newContent, newStar, commentId }: NewCommentType,
  loginUserId: string | null
) => {
  const { data, error }: PostgrestSingleResponse<null> = await supabase
    .from('comments')
    .update({ content: newContent, star: newStar })
    .eq('user_id', loginUserId as string)
    .eq('comment_id', commentId)
    .order('create_at', { ascending: true });

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};

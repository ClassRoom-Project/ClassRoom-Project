import { supabase } from '../supabase/supabase';
import { PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js';
import { MyCommentType, NewCommentType } from '@/types/comments';
import { userId } from '@/app/(clrm)/mypage/page';

// 후기를 작성한 클래스 정보 불러오기 : db join
export const fetchClassInfoOnComment = async (userId: string) => {
  const { data, error }: PostgrestResponse<MyCommentType> = await supabase.rpc('fetch_class_info_on_comment_new', {
    p_user_id: userId
  });

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};

// 후기 삭제하기 : delete
export const deleteMyComment = async (commentId: string) => {
  const { data, error } = await supabase
    .from('comments')
    .delete()
    .eq('user_id', userId)
    .eq('comment_id', commentId)
    .select();

  if (error) {
    console.error(error);
    throw error;
  }
  return data;
};

// 후기 수정하기 : update
export const updateMyComment = async ({ newContent, commentId }: NewCommentType) => {
  const { data, error }: PostgrestSingleResponse<null> = await supabase
    .from('comments')
    .update({ content: newContent })
    .eq('user_id', userId)
    .eq('comment_id', commentId);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};

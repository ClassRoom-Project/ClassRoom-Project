import { getLoginUserType } from '@/types/authUser/authUserTypes';
import { supabase } from '../supabase/supabase';
import { comment } from 'postcss';

//댓글 불러오기 api, rpc로 쿼리문 작성해야된다 이렇게하니까 안나온다 데이터가
export const getDetailComment = async (classId: string | undefined, page = 1, limit_val = 5) => {
  const { data: comments, error } = await supabase.rpc('get_comments_with_user_info', {
    input_class_id: classId,
    page: page,
    limit_val: limit_val
  });

  if (error) {
    console.error('댓글 불러오기 오류 -->', error);
    return null;
  }

  return comments;
};
//댓글 작성하기

export const createDetailComment = async (
  classId: string | undefined,
  star: number | undefined,
  userId: string | undefined,
  content: string | undefined,
  commentImage: string | undefined
) => {
  const { data: comments, error } = await supabase.from('comments').insert([
    {
      class_id: classId,
      user_id: userId,
      content: content,
      star: star,
      create_at: new Date(),
      commentImage: commentImage
    }
  ]);

  if (error) {
    console.error('댓글 작성 오류 --> ', error);
    return null;
  }

  return comments;
};

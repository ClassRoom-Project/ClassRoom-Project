import { supabase } from '../supabase/supabase';
import { PostgrestResponse } from '@supabase/supabase-js';
import { MyCommentType, NewCommentType } from '@/types/comments';
import { userId } from '@/app/(clrm)/mypage/page';

// 내가 쓴 후기 불러오기
// export const getMyComments = async () => {
//   const { data: myComments, error }: PostgrestResponse<MyCommentType> = await supabase
//     .from('comments')
//     .select('*')
//     .eq('user_id', userId);

//   if (error) {
//     console.error(error);
//   }
//   // console.log('myComments', myComments);
//   return myComments;
// };

// 후기를 작성한 클래스 정보 불러오기 : db join
export const fetchClassInfoOnComment = async (userId: string) => {
  const { data, error }: PostgrestResponse<MyCommentType> = await supabase.rpc('fetch_class_info_on_comment', {
    p_user_id: userId
  });

  if (error) {
    console.error(error);
    throw error;
  }
  console.log('data', data);
  return data;
};

// 후기 수정하기 : update
export const updateMyComments = async ({ newContent }: NewCommentType) => {
  // supabase type 지정 postgrest 이런거!!
  const { data, error } = await supabase.from('comments').update({ content: newContent }).eq('user_id', userId);

  if (error) {
    console.error(error);
  }

  return data;
};

// 후기 삭제하기 : delete

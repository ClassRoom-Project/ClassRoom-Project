import { PostgrestMaybeSingleResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';
import { UpdateTeacherInfoType, UpdateUserInfoType, UserType } from '@/types/user';
import { userId } from '@/app/mypage/page';

// User가 선생님인지 수강생인지 구분 : teacher 값 불러오기
export const getUserRole = async ({ userId }: { userId: string }) => {
  const { data: userRole, error }: PostgrestMaybeSingleResponse<UserType> = await supabase
    .from('user')
    .select('teacher')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error(error);
  }

  return userRole;
};

// User(선생님/수강생) 정보 불러오기
export const getUserInfo = async () => {
  const { data: userInfo, error }: PostgrestMaybeSingleResponse<UserType> = await supabase
    .from('user')
    .select('nickname, email, password, profile_image')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error(error);
  }

  return userInfo;
};

// User(선생님/수강생) 정보 수정하기 : supabase에 update
export const updateUserInfo = async ({ newNickname }: UpdateUserInfoType) => {
  const { data, error } = await supabase.from('user').update({ nickname: newNickname }).eq('user_id', userId);
  if (error) {
    console.error(error);
  }
  return data;
};

// User(선생님/수강생) nickname 중복 확인하기
export const checkUserNickname = async ({ newNickname }: Pick<UpdateUserInfoType, 'newNickname'>) => {
  const { data, error } = await supabase
    .from('user')
    .select('nickname')
    .not('user_id', 'eq', userId)
    .eq('nickname', newNickname);
  if (error) {
    console.error(error.message);
    return false;
  }

  return data.length > 0;
};

// 선생님 정보 불러오기
// User(선생님/수강생) 정보 불러오기
export const getTeacherInfo = async () => {
  const { data: teacherInfo, error }: PostgrestMaybeSingleResponse<UserType> = await supabase
    .from('user')
    .select('job, field')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error(error);
  }
  console.log('teacherInfo', teacherInfo);
  return teacherInfo;
};

// 선생님 정보(직업, 분야, 은행, 계좌) update : supabase에 update
export const updateTeacherInfo = async ({
  newSelectedJob,
  newSelectedField,
  selectedBank,
  account
}: UpdateTeacherInfoType) => {
  const { data, error } = await supabase
    .from('user')
    .update({ job: newSelectedJob, field: newSelectedField, bank: selectedBank, account: account })
    .eq('user_id', userId);
  if (error) {
    console.error(error);
  }
  return data;
};

import { PostgrestMaybeSingleResponse, PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';
import { UpdateTeacherInfoType, UpdateUserInfoType, UserInfoType, UserType } from '@/types/user';
import { userId } from '@/app/(clrm)/mypage/page';
import { useUserStore } from '@/store/UserInfoStore';

// User가 선생님인지 수강생인지 구분 : isTeacher 값 불러오기
export const getUserRole = async () => {
  // console.log('getUserRole 함수 호출 시작');
  const { data: userRole, error }: PostgrestMaybeSingleResponse<UserType> = await supabase
    .from('users')
    .select('isTeacher')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error(error);
  }
  // console.log('getUserRole 함수 호출 종료');
  // console.log('userRole', userRole);
  return userRole;
};

// User(선생님/수강생) 정보 불러오기
export const getUserInfo = async () => {
  const { data: userInfo, error }: PostgrestMaybeSingleResponse<UserInfoType> = await supabase
    .from('users')
    .select('nickname, email, profile_image')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error(error);
  }

  // zustand에 상태 업데이트
  if (userInfo) {
    useUserStore.getState().setUserInfo(userInfo);
  }

  return userInfo;
};

// User(선생님/수강생) 정보 수정하기 : supabase에 update
export const updateUserInfo = async ({ newNickname, newProfileImage }: UpdateUserInfoType) => {
  const { data, error } = await supabase
    .from('users')
    .update({ nickname: newNickname, profile_image: newProfileImage })
    .eq('user_id', userId);
  if (error) {
    console.error(error);
  }
  return data;
};

// User(선생님/수강생) nickname 중복 확인하기
export const checkUserNickname = async ({ newNickname }: Pick<UpdateUserInfoType, 'newNickname'>) => {
  const { data, error } = await supabase
    .from('users')
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
    .from('users')
    .select('job, field, bank, account')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error(error);
  }

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
    .from('users')
    .update({ job: newSelectedJob, field: newSelectedField, bank: selectedBank, account: account })
    .eq('user_id', userId);
  if (error) {
    console.error(error);
  }
  return data;
};

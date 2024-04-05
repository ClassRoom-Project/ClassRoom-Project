import { useUserStore } from '@/store/UserInfoStore';
import {
  InsertTeacherInfo,
  TeacherInfoType,
  UpdateTeacherInfoType,
  UpdateUserInfoType,
  UserInfoType,
  UserRoleType
} from '@/types/user';
import { PostgrestMaybeSingleResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';

// User가 선생님인지 수강생인지 구분 : isTeacher 값 불러오기
export const getUserRole = async (loginUserId: string | null) => {
  const { data: userRole, error }: PostgrestMaybeSingleResponse<UserRoleType> = await supabase
    .from('users')
    .select('isTeacher')
    .eq('user_id', loginUserId)
    .single();

  if (error) {
    console.error(error);
  }
  return userRole;
};

// User(선생님/수강생) 정보 불러오기
export const getUserInfo = async (loginUserId: string | null) => {
  const { data: userInfo, error }: PostgrestMaybeSingleResponse<UserInfoType> = await supabase
    .from('users')
    .select('nickname, email, profile_image')
    .eq('user_id', loginUserId)
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
export const updateUserInfo = async (
  { newNickname, newProfileImage }: UpdateUserInfoType,
  loginUserId: string | null
) => {
  const { data, error } = await supabase
    .from('users')
    .update({ nickname: newNickname, profile_image: newProfileImage })
    .eq('user_id', loginUserId);
  if (error) {
    console.error(error);
  }
  return data;
};

// User(선생님/수강생) nickname 중복 확인하기
export const checkUserNickname = async (
  { newNickname }: Pick<UpdateUserInfoType, 'newNickname'>,
  loginUserId: string | null
) => {
  const { data, error } = await supabase
    .from('users')
    .select('nickname')
    .not('user_id', 'eq', loginUserId)
    .eq('nickname', newNickname);
  if (error) {
    console.error(error.message);
    return false;
  }

  return data.length > 0;
};

// 선생님 정보 불러오기
// User(선생님/수강생) 정보 불러오기
export const getTeacherInfo = async (loginUserId: string | null) => {
  const { data: teacherInfo, error }: PostgrestMaybeSingleResponse<TeacherInfoType> = await supabase
    .from('users')
    .select('job, field, bank, account')
    .eq('user_id', loginUserId)
    .single();

  if (error) {
    console.error(error);
  }

  return teacherInfo;
};

// 선생님 정보 등록하기(수강생 마이페이지) : insert
export const insertTeacherInfo = async (
  { selectedJob, selectedField, selectedBank, userAccount }: InsertTeacherInfo,
  loginUserId: string | null
) => {
  const { data, error }: PostgrestMaybeSingleResponse<InsertTeacherInfo> = await supabase
    .from('users')
    .insert([{ job: selectedJob, field: selectedField, bank: selectedBank, account: userAccount }])
    .eq('user_id', loginUserId);
  if (error) {
    console.error(error);
  }
  return data;
};

// 선생님 정보 수정하기 (강사 마이페이지) :update
export const updateTeacherInfo = async (
  { newSelectedJob, newSelectedField, newSelectedBank, newAccount }: UpdateTeacherInfoType,
  loginUserId: string | null
) => {
  const { data, error }: PostgrestMaybeSingleResponse<UpdateTeacherInfoType> = await supabase
    .from('users')
    .update({ job: newSelectedJob, field: newSelectedField, bank: newSelectedBank, account: newAccount })
    .eq('user_id', loginUserId);
  if (error) {
    console.error(error);
  }
  return data;
};

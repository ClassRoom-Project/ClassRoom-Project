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
export const getUserRole = async (email: string | null): Promise<{ isTeacher: boolean } | null> => {
  const { data: userRole, error }: PostgrestMaybeSingleResponse<UserRoleType | null> = await supabase
    .from('users')
    .select('isTeacher')
    .eq('email', email as string)
    .single();

  if (error) {
    console.error(error);
  }
  return userRole;
};

// User Role(선생님인지 수강생인지) 상태 supabase에 업데이트하기
export const updateUserRole = async (isTeacher: boolean | null, loginUserId: string | null) => {
  const { data, error } = await supabase
    .from('users')
    .update({ isTeacher: !isTeacher })
    .eq('user_id', loginUserId as string);

  if (error) {
    console.error(error);
  }
  return data;
};

// User(선생님/수강생) 정보 불러오기
export const getUserInfo = async ({ userId }: { userId: string }) => {
  const { data: userInfo, error }: PostgrestMaybeSingleResponse<UserInfoType> = await supabase
    .from('users')
    .select('nickname, email, profile_image, isTeacher')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('getUserInfo api error =>', error);
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
    .eq('user_id', loginUserId as string);
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
    .not('user_id', 'eq', loginUserId as string)
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
    .select('job, field, bank, account, teacher_name, teacher_number')
    .eq('user_id', loginUserId as string)
    .single();

  if (error) {
    console.error(error);
  }

  return teacherInfo;
};

// 선생님 정보 수정하기 (강사 마이페이지) :update
export const updateTeacherInfo = async (
  {
    newSelectedJob,
    newSelectedField,
    newSelectedBank,
    newAccount,
    newTeacherName,
    newTeacherNumber
  }: UpdateTeacherInfoType,
  loginUserId: string | null
) => {
  const { data, error }: PostgrestMaybeSingleResponse<UpdateTeacherInfoType> = await supabase
    .from('users')
    .update({
      job: newSelectedJob,
      field: newSelectedField,
      bank: newSelectedBank,
      account: newAccount,
      teacher_name: newTeacherName,
      teacher_number: newTeacherNumber
    })
    .eq('user_id', loginUserId as string);
  if (error) {
    console.error(error);
  }
  return data;
};

// 선생님 정보 초기 등록하기 (수강생 마이페이지에서) : update
export const addTeacherInfo = async (
  { selectedJob, selectedField, selectedBank, userAccount, teacherName, teacherNumber }: InsertTeacherInfo,
  loginUserId: string | null
) => {
  const { data, error } = await supabase
    .from('users')
    .update([
      {
        job: selectedJob,
        field: selectedField,
        bank: selectedBank,
        account: userAccount,
        teacher_name: teacherName,
        teacher_number: teacherNumber,
        isTeacher: true
      }
    ])
    .eq('user_id', loginUserId as string);
  if (error) {
    console.error(error);
  }
};

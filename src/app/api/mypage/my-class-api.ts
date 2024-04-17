import { supabase } from '@/app/api/supabase/supabase';
import { MyClassSingleInfoType, MyClassStudentInfoType, MyRegisteredClassType, MyWishClassType } from '@/types/class';
import { PostgrestResponse } from '@supabase/supabase-js';

export const getMyRegisteredClass = async (loginUserId: string | null) => {
  const { data: myClassInfo, error }: PostgrestResponse<MyRegisteredClassType> = await supabase.rpc(
    'fetch_my_class_info_new',
    { _user_id: loginUserId as string }
  );

  if (error) {
    console.error(error);
  }

  return myClassInfo;
};

// 내가 등록한 클래스 삭제하기 : delete
export const deleteMyClass = async (classId: string, loginUserId: string | null) => {
  const { data, error } = await supabase
    .from('class')
    .delete()
    .eq('user_id', loginUserId as string)
    .eq('class_id', classId)
    .select();

  if (error) {
    console.error(error);
    throw error;
  }
  return data;
};

// myClass 예약한 수강생 정보 불러오기
export const getMyClassStudentInfo = async (timeId: string | null) => {
  const { data: myClassStudentInfo, error }: PostgrestResponse<MyClassStudentInfoType> = await supabase.rpc(
    'fetch_class_student_info_new_new',
    { p_time_id: timeId }
  );
  if (error) {
    console.error('getMyClassStudentInfo error', error);
  }

  return myClassStudentInfo;
};

// 특정 class 정보 불러오기 : timeId 기준
export const getClassSingleInfo = async (timeId: string | null) => {
  const { data: classSingleInfo, error }: PostgrestResponse<MyClassSingleInfoType> = await supabase.rpc(
    'fetch_my_single_class_info_test',
    { p_time_id: timeId }
  );
  if (error) {
    console.error(error);
  }

  return classSingleInfo;
};

// 마이 클래스 위시리스트
export async function getMyWishClass(loginUserId: string | null) {
  const { data, error }: PostgrestResponse<MyWishClassType> = await supabase.rpc('fetch_my_wish_class_new', {
    p_user_id: loginUserId as string
  });

  if (error) {
    console.error(error);
    return;
  }
  return data;
}

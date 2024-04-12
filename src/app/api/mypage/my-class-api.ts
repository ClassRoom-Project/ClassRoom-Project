import { supabase } from '@/app/api/supabase/supabase';
import { MyClassStudentInfoType, MyRegisteredClassType } from '@/types/class';
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

export const getMyClassStudentInfo = async (timeId: string | null) => {
  const { data: myClassStudentInfo, error }: PostgrestResponse<MyClassStudentInfoType> = await supabase.rpc(
    'fetch_class_student_info',
    { p_time_id: timeId }
  );
  if (error) {
    console.error(error);
  }

  return myClassStudentInfo;
};

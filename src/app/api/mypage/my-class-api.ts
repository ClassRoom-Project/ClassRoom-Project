import { supabase } from '@/app/api/supabase/supabase';
import { MyRegisteredClassType } from '@/types/class';
import { PostgrestResponse } from '@supabase/supabase-js';

export const getMyRegisteredClass = async (loginUserId: string | null) => {
  const { data: myClassInfo, error }: PostgrestResponse<MyRegisteredClassType> = await supabase.rpc(
    'fetch_class_info_with_date_time',
    { p_user_id: loginUserId as string }
  );

  if (error) {
    console.error(error);
  }

  return myClassInfo;
};

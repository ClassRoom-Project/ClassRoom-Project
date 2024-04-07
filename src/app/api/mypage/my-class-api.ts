import { supabase } from '@/app/api/supabase/supabase';
import { MyRegisteredClassType } from '@/types/class';
import { PostgrestResponse } from '@supabase/supabase-js';

export const getMyRegisteredClass = async (loginUserId: string | null) => {
  const { data: myClassInfo, error }: PostgrestResponse<MyRegisteredClassType> = await supabase
    .from('class')
    .select('user_id, class_id, title, location,detail_location, date, time, image, active')
    .eq('user_id', loginUserId as string);

  if (error) {
    console.error(error);
  }

  return myClassInfo;
};

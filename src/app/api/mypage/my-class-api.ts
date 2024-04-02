import { PostgrestResponse } from '@supabase/supabase-js';
import { MyRegisteredClassType } from '@/types/class';
import { supabase } from '@/app/api/supabase/supabase';
import { userId } from '@/app/(clrm)/mypage/page';

export const getMyRegisteredClass = async () => {
  const { data: myClassInfo, error }: PostgrestResponse<MyRegisteredClassType> = await supabase
    .from('class')
    .select('user_id, class_id, title, location,detailLocation, date, time, image, active')
    .eq('user_id', userId);

  if (error) {
    console.error(error);
  }

  return myClassInfo;
};

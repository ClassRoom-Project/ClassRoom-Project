import { userId } from '@/app/mypage/page';

import { PostgrestResponse } from '@supabase/supabase-js';
import { MyRegistedClassType } from '@/types/class';
import { supabase } from '@/app/api/supabase/supabase';

export const getMyRegistedClass = async () => {
  const { data: myClassInfo, error }: PostgrestResponse<MyRegistedClassType> = await supabase
    .from('class')
    .select('user_id, class_id, title, location,detailLocation, date, time, image')
    .eq('user_id', userId);

  if (error) {
    console.error(error);
  }

  return myClassInfo;
};

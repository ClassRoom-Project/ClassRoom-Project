'use client';
import { supabase } from '../supabase/supabase';

export const insertNotice = async (userId: string, classId: string, classTitle: string, queryClient: any) => {
  const { data: existingData, error: existingError } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .eq('class_id', classId)
    .maybeSingle();

  if (existingError) {
    console.error('Error: ', existingError);
    return;
  }

  // 이미 동일한 알림이 존재하는 경우
  if (existingData) {
    console.log('이미 동일한 알림이 존재합니다.');
    return;
  }

  const noticeId = crypto.randomUUID();
  const notice = `신청하신 "${classTitle}" 클래스 결제 신청이 완료되었습니다.`;
  const { data: noticeData, error: noticeError } = await supabase
    .from('notifications')
    .insert([
      { notice_id: noticeId, user_id: userId, class_id: classId, notice: notice, isread: false, created_at: new Date() }
    ]);

  if (noticeError) {
    console.error('Error: ', noticeError);
    return;
  } else {
    queryClient.invalidateQueries({
      queryKey: ['notifications', userId]
    });
  }

  return noticeData;
};

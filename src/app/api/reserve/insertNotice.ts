'use client';
import { supabase } from '../supabase/supabase';

export const insertNotice = async (userId: string, classId: string, classTitle: string, queryClient: any) => {
  const { data: existingData, error: existingError } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .eq('class_id', classId)
    .maybeSingle(); // userId와 classId에 대한 기존 알림이 있는지 확인

  if (existingError) {
    console.error('Error: ', existingError);
    return;
  }

  // 이미 동일한 알림이 존재하는 경우
  if (existingData) {
    return;
  }

  // 기존 알림이 없는 경우, 새로운 알림 생성
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
      queryKey: ['notifications', userId] // queryClient를 사용하여 최신 상태로 업데이트
    });
  }

  return noticeData;
};

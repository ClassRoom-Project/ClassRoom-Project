'use client';
import { supabase } from '../supabase/supabase';

export const insertNotice = async (userId: string, classId: string, classTitle: string, queryClient: any) => {
  // 기존에 동일한 userId와 classId를 가진 알림이 있는지 확인
  const { data: existingData, error: existingError } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .eq('class_id', classId)
    .maybeSingle(); // maybeSingle을 사용하여 단일 레코드 또는 null 반환

  // 오류 처리
  if (existingError) {
    console.error('Error: ', existingError);
    return;
  }

  // 이미 동일한 알림이 존재하는 경우, 추가 작업 없이 종료
  if (existingData) {
    console.log('이미 동일한 알림이 존재합니다.');
    return;
  }

  // 새 알림 생성
  const noticeId = crypto.randomUUID();
  const notice = `신청하신 "${classTitle}" 클래스 결제 신청이 완료되었습니다.`;
  const { data: noticeData, error: noticeError } = await supabase
    .from('notifications')
    .insert([
      { notice_id: noticeId, user_id: userId, class_id: classId, notice: notice, isread: false, created_at: new Date() }
    ]);

  // 오류 처리
  if (noticeError) {
    console.error('Error: ', noticeError);
    return;
  } else {
    // 캐시 무효화
    queryClient.invalidateQueries({
      queryKey: ['notifications', userId]
    });
  }

  return noticeData;
};

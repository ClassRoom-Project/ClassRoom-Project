import { supabase } from '../supabase/supabase';

export const insertNotice = async (userId : string, classId: string, classTitle:string) => {
    const { data: existingNotificationData, error: existingNotificationError } = await supabase.from('notifications')
        .select('*')
        .eq('user_id', userId)
        .eq('class_id', classId);
    
    if (existingNotificationError) {
        console.error('Error checking existing notification', existingNotificationError);
    }

    if (existingNotificationData && existingNotificationData.length > 0) {
        console.log('Notification already exists for this user and class');
        return;
    }

    const noticeId = crypto.randomUUID();
    const notice = `신청하신 "${classTitle}" 클래스 결제 신청이 완료되었습니다.`;
    const { data:noticeData, error:noticeError } = await supabase.from('notifications')
        .insert([
          { notice_id: noticeId, user_id: userId, class_id: classId, notice: notice, isread: false, created_at: new Date() }
        ]);
    if (noticeError) {
        console.error('Error creating notification', noticeError);
    }
  
    return noticeData;
};
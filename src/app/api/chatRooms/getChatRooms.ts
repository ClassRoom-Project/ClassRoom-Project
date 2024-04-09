import { CreateNewChatRoom } from '@/types/chat/chatTypes';
import { supabase } from '../supabase/supabase';

export const createChatRoom = async ({
  toClassId,
  fromUserId,
  teacherUserId
}: CreateNewChatRoom): Promise<CreateNewChatRoom | undefined> => {
  const { data: existingRooms, error: searchError } = await supabase

    .from('chat_rooms')
    .select('*')
    .eq('to_class_id', toClassId)
    .eq('from_user_id', fromUserId);

  if (searchError) {
    console.error('검색 중 에러 발생:', searchError);
    return;
  }

  if (existingRooms.length === 0) {
    // 존재하지 않는 경우, 새로운 채팅방을 삽입
    const { data: insertedData, error } = await supabase
      .from('chat_rooms')
      .insert([
        {
          to_class_id: toClassId,
          from_user_id: fromUserId,
          teacher_user_id: teacherUserId
        }
      ])
      .single(); // 단일 행 삽입 결과를 받습니다.123234
    if (error) {
      console.error('삽입 중 에러 발생:', error);
      throw error;
    }

    console.log('삽입 성공:', insertedData);
    return insertedData; // 삽입된 새로운 행의 데이터를 반환합니다.
  } else console.log('이미 방이있어요');
};

// 클래스에서 타이틀가져오고 클래스id로 클래스테이블에서 user_id, user_id로 유저테이블 조인해서 닉네임이랑 프로필이미지
const testFetch = async (classId: string) => {
  const { data, error } = await supabase.from('class').select('').eq('class_id', classId);
};

export const getChatRooms = async () => {};

// 예약 정보 조회 api
// reserve 테이블과 class 테이블을 class_id로 inner조인하고, class 테이블에서 title, total_time, location만 선택하여 결과에 포함
// time 테이블을 time_id로 조인
// time테이블에서 time_id가 일치하는 레코드의 date_id로 date 테이블 inner조인하고, date 테이블에서 day만 선택하여 결과에 포함
// export const fetchReservationDetails = async (reserveId: string) => {
//   const { data, error }: PostgrestSingleResponse<DBReservationDetailsType> = await supabase
//     .from('reserve')
//     .select(
//       `
//         class_id, reserve_quantity, reserve_price, time_id, user_id,
//         class!inner(title, total_time, location),
//         time (time_id, times, date_id, date!inner(day))
//   `
//       //이너조인 같은 클래스 아이디 찾아들어가서 값가져오기
//     )
//     .eq('reserve_id', reserveId)
//     .single();

//   if (error) {
//     console.log('fetchReservationDetails error =>', error);
//     return;
//   }

//   const reservationDetails = {
//     classId: data.class_id,
//     reserveQuantity: data.reserve_quantity,
//     reservePrice: data.reserve_price,
//     timeId: data.time_id,
//     userId: data.user_id,
//     class: {
//       title: data.class.title,
//       totalTime: data.class.total_time,
//       location: data.class.location,
//       classId: data.class.class_id
//     },
//     time: {
//       date: { day: data.time.date.day },
//       times: data.time.times,
//       dateId: data.time.date_id,
//       timeId: data.time.time_id
//     }
//   };

//   return reservationDetails;
// };

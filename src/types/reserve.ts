// store에서 사용하기 위한 타입
export type ReserveInfo = {
  classId: string;
  userId: string;
  reservePrice: number;
  reserveQuantity: number;
  timeId: string;
};

// export type DBReserveInfo = {
//   reserve_id: string;
//   class_id: string;
//   user_id: string;
//   reserve_price: number;
//   reserve_quantity: number;
//   time_id: string;
// };

export type ReserveStoreType = {
  reserveInfo: ReserveInfo;
  setReserveInfo: ({}) => void;
};

export interface CurrentReservedCountStoreType {
  currentReservedCount: number | null | undefined;
  setCurrentReservedCount: (currentReservedCount: number | null | undefined) => void;
}

// DB에서 받아온 예약 정보 타입
export interface DBReservationDetailsType {
  class_id: string;
  userId: string;
  reserve_quantity: number;
  reserve_price: number;
  time_id: string;
  user_id: string;
  class: {
    class_id: string;
    title: string;
    total_time: string;
    location: string;
  };
  time: {
    date: { day: string };
    times: string;
    date_id: string;
    time_id: string;
  };
}
export interface ReservationDetailsType {
  classId: string;
  userId: string;
  reserveQuantity: number;
  reservePrice: number;
  timeId: string;
  class: {
    classId: string;
    title: string;
    totalTime: string;
    location: string;
  };
  time: {
    date: { day: string };
    times: string;
    dateId: string;
    timeId: string;
  };
}

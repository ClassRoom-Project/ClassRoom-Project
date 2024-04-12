// store에서 사용하기 위한 타입
export type ReserveInfo = {
  reserveId: string;
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
  reserve_quantity: number;
  reserve_price: number;
  userId: string;
  time_id: string;
  user_id: string;
  class: {
    title: string;
    total_time: string;
    location: string;
    class_type: string;
  };
  time: {
    date: { day: string };
    times: string;
  };
}
export interface ReservationDetailsType {
  classId: string;
  reserveQuantity: number;
  reservePrice: number;
  userId: string;
  timeId: string;
  class: {
    title: string;
    totalTime: string;
    location: string;
    classType: string;
  };
  time: {
    date: { day: string };
    times: string;
  };
}

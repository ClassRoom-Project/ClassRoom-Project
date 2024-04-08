// store에서 사용하기 위한 타입
export type ReserveInfo = {
  classId: string;
  userId: string;
  reservePrice: number;
  reserveQuantity: number;
  timeId: string;
};

export type DBReserveInfo = {
  class_id: string;
  user_id: string;
  reserve_price: number;
  reserve_quantity: number;
  time_id: string;
};

export type ReserveStoreType = {
  reserveInfo: ReserveInfo;
  setReserveInfo: ({}) => void;
};

// DB에서 받아온 예약 정보 타입
export interface reservationDetailsType {
  class_id: string;
  reserve_date: string;
  reserve_time: string;
  userId: string;
  reserve_quantity: number;
  reserve_price: number;
  time_id: string;
  user_id: string;
  class: {
    class_id: string;
    title: string;
  };
}

export interface CurrentReservedStoreType {
  currentReservedCount: number | null | undefined;
  setCurrentReservedCount: (currentReservedCount: number | null | undefined) => void;
}

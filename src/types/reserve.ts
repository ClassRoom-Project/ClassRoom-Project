// store에서 사용하기 위한 타입
export type ReserveInfo = {
  classId: string;
  userId: string;
  reservePrice: number;
  reserveQuantity: number;
  reserveDate: string;
  reserveTime: string;
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
  reserve_quantity: number;
  reserve_price: number;
  time_id: string;
  class: {
    class_id: string;
    title: string;
  };
}

export type ReserveInfo = {
  reserveId: string;
  classId: string;
  userId: string;
  reservePrice: number;
  reserveQuantity: number;
  reserveDate: string;
  reserveTime: string;
};

export type DBReserveInfo = {
  reserve_id: string;
  class_id: string;
  user_id: string;
  reserve_price: number;
  reserve_quantity: number;
  reserve_date: string;
  reserve_time: string;
};

export type ReserveStoreType = {
  reserveInfo: Omit<ReserveInfo, 'reserveId'>;
  setReserveInfo: ({}) => void;
};

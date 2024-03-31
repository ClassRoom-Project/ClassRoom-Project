export type ReserveInfo = {
  reserveId: string;
  classId: string;
  userId: string;
  reservePrice: number;
  reserveQuantity: number;
  reserveDate: string;
  reserveTime: string;
};

export type ReserveStoreType = {
  reserveInfo: Omit<ReserveInfo, 'reserveId'>;
  setReserveInfo: ({}) => void;
};

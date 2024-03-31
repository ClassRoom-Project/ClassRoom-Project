export type DateTypePiece = Date | null;
export type DateType = DateTypePiece | [DateTypePiece, DateTypePiece];

export type ClassType = {
  class_id: string;
  category: string;
  title: string;
  location: string;
  price: number;
  image: string;
  max_ppl: number;
};

export type ReserveInfo = {
  classId: string;
  userId: string;
  reservePrice: number;
  reserveQuantity: number;
  reserveDate: string;
  reserveTime: string;
};

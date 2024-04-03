export interface ClassItem {
  reserve_id: string;
  image: string[];
  title: string;
  reserve_date: string;
  reserved_at: string;
  class_id: string;
  detail_location: string;
  location: string;
  reserve_price: number;
  reserve_quantity: number;
  reserve_time: string;
}

export interface ClassRegister {
  class_id?: string;
  user_id?: string;
  category: string;
  subCategory: string;
  classTitle: string;
  classContent: string;
  address: string;
  detailAddress: string;
  maxNumber: number;
  minNumber: number;
  price: number;
  personnel: number;
  difficulty: string;
  selectDay: string[];
  selectedTime: string[];
  classType: string;
  // image: string[];
  totalTime: number;

  setCategory: (category: string) => void;
  setSubCategory: (subCategory: string) => void;
  setAddress: (address: string) => void;
  setDetailAddress: (detailAddress: string) => void;
  setSelectDay: (selectDay: string[]) => void;
  setClassContent: (classContent: string) => void;
  setClassTitle: (classTitle: string) => void;
  setClassType: (classType: string) => void;
  setDifficulty: (difficulty: string) => void;
  setMinNumber: (minNumber: number) => void;
  setMaxNumber: (maxNumber: number) => void;
  setPersonnel: (personnel: number) => void;
  setPrice: (price: number) => void;
  setSelectedTime: (selectedTime: string[]) => void;
  setTotalTime: (totalTime: number) => void;
  // setImage: (image: string[]) => void;
}

export interface AddressData {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
}

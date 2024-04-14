export interface ClassItem {
  reserve_id: string;
  image: string[];
  title: string;
  day: string;
  reserved_at: string;
  class_id: string;
  detail_location: string;
  location: string;
  reserve_price: number;
  reserve_quantity: number;
  times: string;
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
  selectDay: Date[];
  selectedTime: string[];
  classType: string;
  image?: string[];
  totalTime: number;
  // registrationComplete: boolean;
  // classIdval: string;

  setCategory: (category: string) => void;
  setSubCategory: (subCategory: string) => void;
  setAddress: (address: string) => void;
  setDetailAddress: (detailAddress: string) => void;
  setSelectDay: (selectDay: Date[]) => void;
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
  // setRegistrationComplete: (registrationComplete: boolean) => void;
  // setClassIdval: (classIdval: string) => void;
  // setImage: (image: string[]) => void;
}

export interface AddressData {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
}

export interface ImageFileWithPreview {
  file: File;
  preview: string;
}
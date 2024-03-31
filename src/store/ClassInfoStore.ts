import { create } from 'zustand';
import { ClassAllType } from '@/types/class';
export const defaultClassInfo = {
  class_id: '',
  user_id: '',
  category: '',
  hashtag: '',
  title: '',
  description: '',
  max_ppl: 0,
  min_ppl: 0,
  price: 0,
  location: '',
  date: [],
  time: [],
  quantity: 0,
  image: [],
  detailLocation: '',
  total_time: 0,
  class_type: '',
  difficulty: '',
  active: true
};

export type ClassStoreType = {
  classInfo: ClassAllType;
  setClassInfo: (getInfo: ClassAllType) => void;
};

export const useClassInfoStore = create<ClassStoreType>((set) => ({
  classInfo: defaultClassInfo,

  setClassInfo: (getInfo: ClassAllType) => {
    set(() => ({
      classInfo: getInfo
    }));
  }
}));

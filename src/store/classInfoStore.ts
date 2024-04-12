import { ClassAllType } from '@/types/class';
import { create } from 'zustand';

//class 정보들 각각 배열에 담는 로직임다
export type ClassStoreType = {
  classInfos: ClassAllType[];
  setClassInfos: (classInfos: ClassAllType[]) => void;
};
export type DetailClassStoreType = {
  classInfo: ClassAllType | null;
  setClassInfo: (classInfo: ClassAllType | null) => void;
};
export const useClassInfoStore = create<ClassStoreType>((set) => ({
  classInfos: [],

  setClassInfos: (getclassInfos) => {
    set(() => ({
      classInfos: getclassInfos
    }));
  }
}));

export const useDetailClassInfoStore = create<DetailClassStoreType>((set) => ({
  classInfo: null,
  setClassInfo: (classInfo) => {
    set(() => ({ classInfo }));
  }
}));

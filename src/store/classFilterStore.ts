import { create } from 'zustand';

type ClassFilterStore = {
  selectedCategory: string;
  setCategory: (category: string) => void;
};

export const useClassFilterStore = create<ClassFilterStore>((set) => ({
  selectedCategory: '',
  setCategory: (category: string) => set(() => ({ selectedCategory: category }))
}));

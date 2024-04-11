import { create } from 'zustand';

type ClassFilterStore = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

export const useClassFilterStore = create<ClassFilterStore>((set) => ({
  selectedCategory: '',
  setSelectedCategory: (category: string) => set(() => ({ selectedCategory: category }))
}));

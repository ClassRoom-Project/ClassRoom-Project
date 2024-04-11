import { create } from 'zustand';

type CategoryFilterStore = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

export const useCategoryFilterStore = create<CategoryFilterStore>((set) => ({
  selectedCategory: '',
  setSelectedCategory: (category: string) => set(() => ({ selectedCategory: category }))
}));

type ListFilterStore = {
  ClassFilters: {};
  setClassFilters: (filters: {}) => void;
};

export const useListFilterStore = create<ListFilterStore>((set) => ({
  ClassFilters: {
    selectedClassType: '',
    selectedLocation: null,
    selectedAMPM: null,
    selectedDifficulty: null,
    selectedPrice: null
  },
  setClassFilters: (filters: {}) =>
    set(() => ({
      ClassFilters: filters
    }))
}));

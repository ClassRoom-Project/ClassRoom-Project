import { create } from 'zustand';

type ClassFilterStore = {
  selectedCategory: string;
  setCategory: (category: string) => void;
};

export const useClassFilterStore = create<ClassFilterStore>((set) => ({
  selectedCategory: '',
  setCategory: (category: string) => set(() => ({ selectedCategory: category }))
}));

type FilterState = {
  classType: string | null;
  location: string | null;
  time: string[] | null;
  difficulty: string | null;
  priceRange: { min: number; max: number } | null;
  setFilter: (filterName: keyof FilterState, value: any) => void;
  resetFilters: () => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  classType: null,
  location: null,
  time: null,
  difficulty: null,
  priceRange: null,
  setFilter: (filterName, value) =>
    set((state) => ({
      ...state,
      [filterName]: value
    })),
  resetFilters: () =>
    set(() => ({
      classType: null,
      location: null,
      time: null,
      difficulty: null,
      priceRange: null
    }))
}));
